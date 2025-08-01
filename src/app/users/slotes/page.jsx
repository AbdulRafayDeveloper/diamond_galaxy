"use client";
import { id } from "date-fns/locale";
import Header from "../components/header/page";
import SideBar from "../components/sidebar/SideBar";
import { useState, useRef, useEffect, use } from "react";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const Page = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);
  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (event) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsSidebarOpen(false);
    }
  };

  const section = "Slotes";

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const [formData, setFormData] = useState({});
  const [userSlots, setUserSlots] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/slot-commissions", {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });

        console.log(res);
        const slots = res.data?.data?.commissions?.slots || [];
        const slotsStatus = res.data?.data?.userSlots || null;

        console.log("Slots:", slots);
        console.log("Slots Status:", slotsStatus);

        const newFormData = {};
        slots.forEach((slot, index) => {
          const idx = index + 1;
          newFormData[`slot${idx}Price`] = slot.price;
          newFormData[`slot${idx}Commission`] = slot.commission;
        });

        setFormData(newFormData);
        // setUserSlots(slotsStatus);
        setUserSlots(slotsStatus ?? { active_slot: 1 });
      } catch (error) {
        console.error("Error fetching slot commissions:", error);
      }
    };
    fetchData();
  }, []);

  const handleSlotActivation = async (slotNumber) => {
    const confirmResult = await Swal.fire({
      title: `Activate Slot ${slotNumber}?`,
      text: "Are you sure you want to activate this slot?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#22405c",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, activate it!",
    });

    if (confirmResult.isConfirmed) {
      try {
        const res = await axios.get(
          "/api/slot",

          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );

        console.log("Activation response:", res.data);

        if (res.data.status === 200) {
          toast.success(`Slot ${slotNumber} activated successfully!`);
          window.location.reload(); // Reload to reflect changes
        } else {
          toast.error(res.data.message || "Activation failed.");
        }
      } catch (err) {
        toast.error(err.response?.data?.message || "Something went wrong!");
      }
    }
  };

  const slotesdata = [
    {
      id: 1,
      name: "1st Slot's",
      price: "7.5 $",
    },
    {
      id: 2,
      name: "2st Slot's",
      price: "10.5 $",
    },
    {
      id: 3,
      name: "3rd Slot's",
      price: "16 $",
    },
    {
      id: 4,
      name: "4th Slot's",
      price: "20 $",
    },
    {
      id: 5,
      name: "5th Slot's",
      price: "40 $",
    },
    {
      id: 6,
      name: "6th Slot's",
      price: "50 $",
    },
    {
      id: 7,
      name: "7th Slot's",
      price: "80 $",
    },
    {
      id: 8,
      name: "8th Slot's",
      price: "100 $",
    },
    {
      id: 9,
      name: "9th Slot's",
      price: "200 $",
    },
    {
      id: 10,
      name: "10th Slot's",
      price: "400 $",
    },
    {
      id: 11,
      name: "11th Slot's",
      price: "800 $",
    },
    {
      id: 12,
      name: "12th Slot's",
      price: "1000 $",
    },
  ];

  return (
    <>
      <ToastContainer />
      <div className="overflow-y-auto scrollbar-hidden">
        <div className="p-2 w-full">
          <div className="flex items-center justify-between">
            {/* Mobile: Show sidebar toggle */}
            <button
              ref={buttonRef}
              onClick={handleSidebarToggle}
              aria-controls="separator-sidebar"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                />
              </svg>
            </button>

            {/* Title */}
            <p className="text-[12px] md:text-xl md:font-semibold ml-4 md:ml-64 lg:ml-64">
              Slotes
            </p>

            {/* Header component */}
            <div className="ml-auto">
              <Header appear={true} />
            </div>
          </div>
          <aside
            ref={sidebarRef}
            id="separator-sidebar"
            className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
              } sm:translate-x-0`}
            aria-label="Sidebar"
          >
            <SideBar section={section} />
          </aside>
        </div>
        {/* body part */}
        <div className="md:ml-64">
          <div className="flex flex-wrap justify-center items-center p-2">
            {slotesdata.map((el, idx) => (
              <div
                key={idx}
                className="p-3 w-[310px] h-[240px] bg-[#F6F1DE] rounded-md shadow-md m-2"
              >
                <div className="flex flex-col justify-center items-center gap-5 p-8">
                  <div className="flex flex-col items-center border-b border-gray-400 gap-3">
                    <h1 className="text-xl">{el.name}</h1>
                    <p className="text-lg">
                      ${formData[`slot${idx + 1}Price`] ?? "N/A"}
                    </p>
                  </div>
                  <div className="flex flex-row gap-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      fill="#5CB338"
                      stroke="bg-green-600"
                      className="size-5"
                    >
                      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                    </svg>
                    <p className="text-[12px] md:text-md">
                      Tree Commission : $
                      {formData[`slot${idx + 1}Commission`] ?? "N/A"}
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320 512"
                      className="size-5"
                      fill="black"
                    >
                      <path d="M80 160c0-35.3 28.7-64 64-64l32 0c35.3 0 64 28.7 64 64l0 3.6c0 21.8-11.1 42.1-29.4 53.8l-42.2 27.1c-25.2 16.2-40.4 44.1-40.4 74l0 1.4c0 17.7 14.3 32 32 32s32-14.3 32-32l0-1.4c0-8.2 4.2-15.8 11-20.2l42.2-27.1c36.6-23.6 58.8-64.1 58.8-107.7l0-3.6c0-70.7-57.3-128-128-128l-32 0C73.3 32 16 89.3 16 160c0 17.7 14.3 32 32 32s32-14.3 32-32zm80 320a40 40 0 1 0 0-80 40 40 0 1 0 0 80z" />
                    </svg>
                  </div>
                  <div>
                    <button
                      disabled={idx + 1 !== userSlots?.active_slot}
                      onClick={() => handleSlotActivation(idx + 1)}
                      className={`p-1 text-white rounded-lg w-[300px] ${idx + 1 === userSlots?.active_slot
                        ? "bg-[#22405c]"
                        : "bg-gray-400 cursor-not-allowed"
                        }`}
                    >
                      {idx + 1 < userSlots?.active_slot
                        ? "Activated"
                        : "Activate"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
