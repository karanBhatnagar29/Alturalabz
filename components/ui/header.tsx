import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";

const Header = () => {
  return (
    <div className="w-full z-20 -ml-1">
      <div className="bg-white px-10 py-4 flex items-center justify-between w-full">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Logo */}
          <div className="text-2xl font-bold text-black-600">Dashboard</div>

          {/* Search Bar */}
          <div className="hidden md:block">
            <input
              type="text"
              placeholder="Search..."
              className="border border-gray-300 rounded-md py-2 px-4 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-10">
          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-4">
            <a
              href="#"
              className="text-gray-600 hover:text-indigo-600 transition duration-200"
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-indigo-600 transition duration-200"
            >
              Reports
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-indigo-600 transition duration-200"
            >
              Settings
            </a>
          </nav>

          {/* Notification Icon */}
          <button className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-gray-600 hover:text-indigo-600 transition duration-200"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 17h5l-1.405-1.405M9 17H4l1.405-1.405M6 12H6m6-3a9 9 0 11-3.555 17.671M9 7a3 3 0 100-6 3 3 0 000 6z"
              />
            </svg>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </button>

          {/* Profile Dropdown */}
          <div className="relative flex items-center justify-center gap-2">
            <button className=" flex items-center justify-center gap-1">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <span className="hidden md:block text-gray-600 font-medium">
                John Doe
              </span>
            </button>
            <Switch />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
