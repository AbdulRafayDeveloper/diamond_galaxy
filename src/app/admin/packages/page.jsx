"use client";
import Header from "@/app/admin/components/header/page";
import SideBar from "@/app/admin/components/sidebar/SideBar";
import { useState, useRef, useEffect } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";

const Page = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);
  const [showPackages, setShowPackages] = useState(false);
  const [formData, setFormData] = useState({
    basicTagline: "",
    basicPrice: "",
    basicPropertyCount: "",
    standardTagline: "",
    standardPrice: "",
    standardPropertyCount: "",
    premTagline: "",
    premPrice: "",
    premPropertyCount: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePackage = () => {
    setShowPackages(true);
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

  const section = "Packages";

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
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
            Packages
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
        {/* <Header appear={true} title={"Packages"} /> */}
        {!showPackages && (
          <div className="flex justify-center items-center min-h-[450px] ">
            <div className="">
              <div className=" rounded-xl bg-[#F9F9F9] p-2">
                <div className="flex flex-col justify-center items-center p-2 mb-5">
                  <div className="flex justify-center items-center">
                    <div className="relative m-4">
                      <img
                        src="/icons/ph_house-fill.png"
                        alt="add property"
                        className="w-[68px] h-[68px]"
                      />
                      <div className="absolute inset-0 z-50 ml-11 mt-4">
                        <img
                          src="/icons/Group.png"
                          className="h-[20px] w-[20px]"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="max-w-[250px]">
                    <p className="text-center text-md">
                      Create packages as per your requirements
                    </p>
                  </div>
                  <div className="flex mt-4">
                    <button
                      onClick={handlePackage}
                      className="bg-[#FB9105] text-white p-2 w-full sm:w-[450px] text-sm rounded-lg hover:bg-[#FB9105] shadow-lg"
                    >
                      <div className="flex flex-row justify-center items-center">
                        <img
                          src="/icons/material-symbols_add.png"
                          className="w-6 h-6 sm:w-8 sm:h-8"
                          alt=""
                        />
                        <p className="text-lg sm:text-[22.63px]">Add Package</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* show packages detail */}
        {showPackages && (
          <div className="p-4 max-w-8xl flex flex-col justify-center items-center ">
            <div className="bg-gray-100 p-2 rounded-md">
              <div className="flex flex-col justify-center items-center text-center p-5">
                <h1 className="text-4xl text-[#00288E] font-bold">
                  Create Packages
                </h1>
                <p>Set the price as per your requirement</p>
              </div>
              <div className="flex justify-center items-center p-4">
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 mt-4">
                  {/* Baisc */}
                  <div className="flex flex-col">
                    <div>
                      <button className="p-2 text-white bg-[#FF9202] md:w-[210px] lg:w-[220px] xl:min-w-[320px] w-[250px] rounded-md text-md font-bold">
                        Basic
                      </button>
                    </div>
                    <div className="bg-white mt-3 flex flex-col p-2 justify-center items-center text-center gap-7 w-[250px] md:w-[210px] lg:w-[220px] xl:min-w-[320px] h-[300px]">
                      <div>
                        <p>Tagline</p>
                        <input
                          type="text"
                          name="basicTagline"
                          value={formData.basicTagline}
                          onChange={handleChange}
                          className=" w-[180px] border border-gray-400 outline-none rounded-md"
                        />
                      </div>
                      <div>
                        <p>Price</p>
                        <input
                          type="number"
                          placeholder="$"
                          name="basicPrice"
                          value={formData.basicPrice}
                          onChange={handleChange}
                          className="w-[180px] border border-gray-400 outline-none rounded-md"
                        />
                      </div>
                      <div>
                        <p>Property Count</p>
                        <select
                          name="basicPropertyCount"
                          onChange={handleChange}
                          id=""
                          className="w-[180px] border border-gray-400 outline-none rounded-md"
                        >
                          <option value={formData.basicPropertyCount}></option>
                          <option value={formData.basicPropertyCount}>
                            option 2
                          </option>
                          <option value={formData.basicPropertyCount}>
                            option 3
                          </option>
                          <option value={formData.basicPropertyCount}>
                            option 4
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  {/* Standard */}
                  <div className="flex flex-col">
                    <div>
                      <button className="p-2 text-white bg-[#FF9202] md:w-[210px] lg:w-[220px] xl:min-w-[320px] w-[250px] rounded-md text-md font-bold">
                        Standard
                      </button>
                    </div>
                    <div className="bg-white mt-3 flex flex-col p-2 justify-center items-center text-center gap-7 w-[250px] md:w-[210px] lg:w-[220px] xl:min-w-[320px] h-[300px]">
                      <div>
                        <p>Tagline</p>
                        <input
                          type="text"
                          name="standardTagline"
                          value={formData.standardTagline}
                          onChange={handleChange}
                          className="w-[180px] border border-gray-400 outline-none rounded-md"
                        />
                      </div>
                      <div>
                        <p>Price</p>
                        <input
                          type="number"
                          placeholder="$"
                          name="standardPrice"
                          value={formData.standardPrice}
                          onChange={handleChange}
                          className="w-[180px] border border-gray-400 outline-none rounded-md"
                        />
                      </div>
                      <div>
                        <p>Property Count</p>
                        <select
                          name="standardPropertyCount"
                          onChange={handleChange}
                          id=""
                          className="w-[180px] border border-gray-400 outline-none rounded-md"
                        >
                          <option
                            value={formData.standardPropertyCount}
                          ></option>
                          <option value={formData.standardPropertyCount}>
                            option 2
                          </option>
                          <option value={formData.standardPropertyCount}>
                            option 3
                          </option>
                          <option value={formData.standardPropertyCount}>
                            option 4
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  {/* premium */}
                  <div className="flex flex-col">
                    <div>
                      <button className="p-2 text-white bg-[#FF9202] md:w-[210px] lg:w-[220px] xl:min-w-[320px] w-[250px] rounded-md text-md font-bold">
                        Premium
                      </button>
                    </div>
                    <div className="bg-white mt-3 flex flex-col p-2 justify-center items-center text-center gap-7 w-[250px] md:w-[210px] lg:w-[220px] xl:min-w-[320px] h-[300px]">
                      <div>
                        <p>Tagline</p>
                        <input
                          type="text"
                          name="premTagline"
                          value={formData.premTagline}
                          onChange={handleChange}
                          className="w-[180px] border border-gray-400 outline-none rounded-md"
                        />
                      </div>
                      <div>
                        <p>Price</p>
                        <input
                          type="number"
                          placeholder="$"
                          name="premPrice"
                          value={formData.premPrice}
                          onChange={handleChange}
                          className="w-[180px] border border-gray-400 outline-none rounded-md"
                        />
                      </div>
                      <div>
                        <p>Property Count</p>
                        <select
                          name="premPropertyCount"
                          onChange={handleChange}
                          id=""
                          className="w-[180px] border border-gray-400 outline-none rounded-md"
                        >
                          <option value={formData.premPropertyCount}></option>
                          <option value={formData.premPropertyCount}>
                            option 2
                          </option>
                          <option value={formData.premPropertyCount}>
                            option 3
                          </option>
                          <option value={formData.premPropertyCount}>
                            option 4
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded-lg"
                  // onClick={(e) => handleFormAction("cancel", e)}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="px-4 py-2 hover:bg-[#ed8701] bg-[#FF9100] text-white rounded-lg"
                  onClick={() => console.log(formData)}
                >
                  Save
                </button>
                {/* <Link
                href="/owner/appliance_management/appliance"
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Save
              </Link> */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
