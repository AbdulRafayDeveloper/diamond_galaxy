"use client";
import { id } from "date-fns/locale";
import Header from "../components/header/page";
import SideBar from "../components/sidebar/SideBar";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

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

  const section = "My Team";

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const [levelsData, setLevelsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReferralData = async () => {
      try {
        setLoading(true); // Start loading

        const token = Cookies.get("token");
        const res = await axios.get("/api/frontend/my-team", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const referralLevels = res?.data?.data || {};

        const updatedLevels = Array.from({ length: 7 }, (_, index) => {
          const levelKey = `level${index + 1}`;
          const count = referralLevels[levelKey] || 0;
          return {
            id: `0${index + 1}`,
            level: `Level ${index + 1}`,
            discription: `${count} Team Member${count !== 1 ? "s" : ""}`,
          };
        });

        setLevelsData(updatedLevels);
      } catch (err) {
        console.error("Failed to fetch referral data:", err);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchReferralData();
  }, []);

  return (
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
            My Team
          </p>

          {/* Header component */}
          <div className="ml-auto">
            <Header appear={true} />
          </div>
        </div>
        <aside
          ref={sidebarRef}
          id="separator-sidebar"
          className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } sm:translate-x-0`}
          aria-label="Sidebar"
        >
          <SideBar section={section} />
        </aside>
      </div>

      <div className="md:ml-64">
        <div className="bg-white">
          <div className="p-2">
            <div className="bg-[#F6F1DE]  p-2 rounded-md">
              <div className="flex justify-center items-center text-center mt-4">
                <p className="text-3xl font-thick text-md">User Levels</p>
              </div>
              <div className="mt-5 min-h-[200px] flex items-center justify-center">
                {loading ? (
                  <div className="flex flex-col items-center justify-center text-gray-500 text-sm">
                    <div className="w-8 h-8 border-4 border-gray-300 border-t-[#22405c] rounded-full animate-spin mb-2"></div>
                    Loading...
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 p-4 gap-5 w-full">
                    {levelsData.map((el, idx) => (
                      <div
                        key={idx}
                        className="bg-[#22405c] text-white p-2 rounded-md"
                      >
                        <h1 className="text-lg font-bold">{el.level}</h1>
                        <p className="text-sm">{el.discription}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
