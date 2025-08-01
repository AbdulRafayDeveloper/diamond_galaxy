"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Link from "next/link";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`/api/forget-password`, { email });

      console.log("Response:", response);
      console.log("Response Data:", response.data);
      const { otpToken, set_Email } = response.data.data;
      console.log(response.data.data);

      console.log("Status:", response.status);

      if (response.data.status === 200) {
        if (set_Email) {
          Cookies.set("set_Email", true, {
            expires: 1,
          });
        }
        toast.success(response.data.message || "Email sent successfully.");
        setLoading(false);
        router.push(`/auth/forget-password/verify-otp?token=${otpToken}`);
      } else {
        toast.error(
          response.data.message || "Failed to send email. Please try again."
        );
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log("Error sending email:", error);
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="min-h-screen flex flex-col items-center justify-center">
        {/* Background Image */}
        <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center"></div>
        <main className="w-full max-w-lg p-8  relative z-10 bg-white bg-opacity-50">
          {/* Title */}
          <div className="text-center mb-2">
            <h1 className="text-[#22405c] font-bold text-4xl sm:text-5xl lg:text-6xl">
              Forget Password?
            </h1>
            <p className="text-black font-normal text-base sm:text-lg lg:text-xl lg:pb-2 pt-6">
              Enter your email address to reset your password.
            </p>
          </div>

          {/* Form Section */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-lg shadow-md p-3 xl:p-12 md:p-9"
          >
            <div>
              <div className="relative w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-4 fill-gray-300"
                >
                  <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                </svg>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  placeholder="Enter the email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#F3F3F3] w-full text-gray-900 text-xs placeholder-gray-400 rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 pl-12"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white border bg-[#22405c]  font-medium rounded-lg text-sm px-5 py-2.5 text-center  ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#22405c]"
              }`}
            >
              {loading ? (
                <div className="flex justify-center items-center space-x-2">
                  <span className="text-sm">Please Wait </span>
                  <div className="w-4 h-4 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                "Submit"
              )}
            </button>
            <div className="mt-4">
              <p className="md:text-sm text-[12px] text-gray-600">
                Remember your password?{" "}
                <Link
                  href="../../../auth/signin"
                  className="text-[10px] font-semibold text-[#A0A0A0CC]"
                >
                  Login here
                </Link>
              </p>
            </div>
          </form>

          {/* Footer Links */}
        </main>
      </div>
    </>
  );
};

export default Page;
