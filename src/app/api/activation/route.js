import { NextResponse } from "next/server";
import connectDB from "@/app/config/db";
import serverSideUserValidation from "@/app/helper/serverSideUserValidation";
import serverSideValidations from "@/app/helper/serverSideValidations";

import { Users } from "@/app/config/Models/Users/users";
import { activateCommissions } from "@/app/config/Models/Activate-Commission/activateCommission";
import { ActivatedLevel } from "@/app/config/Models/My-Team/Activated-Levels/activated-levels";
import { Commissions } from "@/app/config/Models/Commission/commission";
import { Transaction } from "@/app/config/Models/Transaction/transaction";

import {
  successResponse,
  badRequestResponse,
  serverErrorResponse,
} from "@/app/helper/apiResponseHelpers";

export async function GET(req) {
  try {
    await connectDB();

    const token = serverSideValidations.checkTokenValidationStyle(req);
    const user = await serverSideUserValidation.validateUserByToken(token);
    if (!user || !user._id) {
      return badRequestResponse("Unauthorized. Invalid or missing token.");
    }

    const freshUser = await Users.findById(user._id);

    // check that if he already activated his account
    if (freshUser.is_activated) {
      return badRequestResponse("Account is already activated.");
    }

    const commissionSettings = await activateCommissions.findOne();
    if (!commissionSettings) {
      return badRequestResponse("Commission settings not found.");
    }

    const price = commissionSettings.price;
    const companyPercent = commissionSettings.commission;

    if (freshUser.accountBalance < price) {
      return badRequestResponse(
        `Insufficient balance. Required: ${price}, Available: ${freshUser.accountBalance}`
      );
    }

    freshUser.accountBalance -= price;
    await freshUser.save();

    await Transaction.create({
      userId: freshUser._id,
      senderId: null,
      type: "activation",
      amount: price,
      description: `Account activation fee deducted`,
      postbalance: freshUser.accountBalance,
    });

    const companyAmount = (companyPercent / 100) * price;
    const distributable = price - companyAmount;

    const baseCommission = new Commissions({
      user_id: user._id,
      request_id: null,
      amount: companyAmount,
      originalAmount: price,
      rate: companyPercent / 100,
      source: "activation",
    });

    const levelSettings = await ActivatedLevel.findOne();
    const companyExtraPercent =
      levelSettings?.companyPercentage ||
      parseFloat(process.env.COMPANY_COMMISSION || "10");

    const companyExtraAmount = (companyExtraPercent / 100) * distributable;

    // Build list of actual available uplines
    let uplines = [];
    let currentRef = freshUser.referrerId;

    while (currentRef && uplines.length < 7) {
      const refUser = await Users.findById(currentRef);
      if (!refUser) break;
      uplines.push(refUser);
      currentRef = refUser.referrerId;
    }

    // Load level percentages dynamically
    const levelPercents = [
      levelSettings?.level1 ??
        parseFloat(process.env.ACTIVATE_LEVEL_ONE || "0"),
      levelSettings?.level2 ??
        parseFloat(process.env.ACTIVATE_LEVEL_TWO || "0"),
      levelSettings?.level3 ??
        parseFloat(process.env.ACTIVATE_LEVEL_THREE || "0"),
      levelSettings?.level4 ??
        parseFloat(process.env.ACTIVATE_LEVEL_FOUR || "0"),
      levelSettings?.level5 ??
        parseFloat(process.env.ACTIVATE_LEVEL_FIVE || "0"),
      levelSettings?.level6 ??
        parseFloat(process.env.ACTIVATE_LEVEL_SIX || "0"),
      levelSettings?.level7 ??
        parseFloat(process.env.ACTIVATE_LEVEL_SEVEN || "0"),
    ];

    let levelTracker = 0;
    let distributedTo = [];

    // Distribute from furthest upline as Level 1
    const reversedUplines = [...uplines].reverse();
    for (let i = 0; i < reversedUplines.length; i++) {
      const recipient = reversedUplines[i];
      const levelPercent = levelPercents[levelTracker++] || 0;
      const amount = (levelPercent / 100) * distributable;

      recipient.accountBalance += amount;
      await recipient.save();

      await Transaction.create({
        userId: recipient._id,
        senderId: freshUser._id,
        type: "commission",
        amount,
        description: `Level ${i + 1} activation commission`,
        postbalance: recipient.accountBalance,
      });

      distributedTo.push({
        level: i + 1,
        user: recipient._id,
        amount,
      });
    }

    for (; levelTracker < 7; levelTracker++) {
      const missingPercent = levelPercents[levelTracker] || 0;
      const amount = (missingPercent / 100) * distributable;
      baseCommission.amount += amount;
    }

    baseCommission.amount += companyExtraAmount;
    await baseCommission.save();

    freshUser.is_activated = true;
    await freshUser.save();

    return successResponse("Commission distributed successfully.", {
      deductedFrom: freshUser._id,
      total: price,
      distributedTo,
      company: {
        companyAmount,
        companyExtraAmount,
        retainedFromMissingLevels:
          baseCommission.amount - companyAmount - companyExtraAmount,
      },
    });
  } catch (error) {
    console.log("Error in GET /api/distribute-activation-commission:", error);
    return serverErrorResponse("Internal server error.");
  }
}
