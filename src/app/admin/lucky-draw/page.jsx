"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/app/admin/components/header/page";
import SideBar from "@/app/admin/components/sidebar/SideBar";
import Table from "@/app/admin/components/luckydrawTable/luckyDrawTable";
import Pagination from "../components/pagination/Pagination";
import Link from "next/link";
import Spinner from "../components/luckyDrawSpinner/Spinner";

const Page = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [cardLoading, setCardLoading] = useState(null);
  const [isClose, setisClose] = useState(false);

  const handleCardClick = (type) => {
    setCardLoading(type);
  };
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

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const products = [
    {
      username: "Ali",
      email: "abcd1234@gmail.com",
      lucky: "Gold",
    },
    {
      username: "Rafy",
      email: "abcd1234@gmail.com",
      lucky: "Diamond",
    },
    {
      username: "Abbas",
      email: "abcd1234@gmail.com",
      lucky: "Gold",
    },
    {
      username: "Qasim",
      email: "abcd1234@gmail.com",
      lucky: "Gold",
    },
    {
      username: "Hussnain",
      email: "abcd1234@gmail.com",
      lucky: "Silver",
    },
  ];

  // cards data
  const cardData = [
    "Gold",
    "Silver",
    "Royal",
    "Star",
    "Diamond",
    "Total Users",
  ];
  const section = "Lucky Draw";
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
          <p className="text-[12px] md:text-xl md:font-semibold ml-4 md:ml-64 lg:ml-64 p-5">
            Lucky Draw
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

      <div className="sm:ml-64">
        {/* <Header appear={false} title={"All Users"} /> */}
        <div className="p-6 bg-white">
          <div className="mx-auto bg-white">
            {/* <div className="flex flex-col sm:flex-row gap-4 w-full pt-1 justify-end items-center">
              
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-[5px] w-full border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-[#FF9100] text-sm"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <Link href="/admin/lucky_draw/packages">
                <button className="p-2 bg-[#22405c] text-white rounded-md w-[80px]">➕ Add</button>
              </Link>
            </div> */}

            {/* Table of items */}
            {/* <Table products={products} /> */}
            {/* <Pagination/> */}
            <div className="p-3 mx-auto mt-5">
              <div className="flex justify-center items-center p-2">
                <div className="flex flex-wrap justify-center items-center gap-4">
                  {cardData.map((type, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleCardClick(type)}
                      className="flex flex-col justify-center items-center bg-[#F6F1DE] rounded-md min-w-[300px] min-h-[200px]"
                    >
                      {type === "Total Users" ? (
                        <Link href="/admin/lucky-draw/total-users">
                          <p className="text-2xl font-bold">{type}</p>
                        </Link>
                      ) : (
                        <Link
                          href={`/admin/lucky-draw/find-person/${type.toLowerCase()}`}
                        >
                          <p className="text-2xl font-bold">{type}</p>
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
