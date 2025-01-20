/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import data from "@/app/data.json";
import Link from "next/link";

const USERS_PER_PAGE = 7; // Number of users per page

export default function Component() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  // Filter data based on search query
  const filteredData = data.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.mobile.includes(searchQuery)
  );

  // Calculate total pages based on filtered data
  const totalPages = Math.ceil(filteredData.length / USERS_PER_PAGE);

  // Get current page data
  const paginatedData = filteredData.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

  // Handle pagination
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="min-h-screen  py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto rounded-lg shadow-md p-6">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-xl font-bold ">User List</h1>
            <p className="text-sm">Auto-updates in 2 min</p>
          </div>
          {/* Search Input */}
          <div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, or mobile"
              className="px-4 py-2 rounded-md border"
            />
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y ">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium">
                  User No.
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium ">
                  Name of User
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium ">
                  Date
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium ">
                  Email
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium">
                  Mobile Number
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium">
                  Status{" "}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y ">
              {paginatedData.map((curUser) => (
                <tr key={curUser.id} className="cursor-pointer">
                  <td className="px-4 py-3 text-sm ">#{curUser.id}</td>
                  <td className="px-4 py-3 text-sm flex items-center space-x-3">
                    <Link
                      href={`/users/${curUser.id}`}
                      className="flex items-center space-x-3"
                    >
                      <img
                        src={curUser.avatar}
                        alt="Avatar"
                        className="w-8 h-8 rounded-full"
                      />
                      <span>{curUser.name}</span>
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-sm">{curUser.date}</td>
                  <td className="px-4 py-3 text-sm ">{curUser.email}</td>
                  <td className="px-4 py-3 text-sm ">{curUser.mobile}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100  text-green-800">
                      Online
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md ${
              currentPage === 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-gray-800 text-white hover:bg-gray-700"
            }`}
          >
            Previous
          </button>
          <div className="text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </div>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-gray-800 text-white hover:bg-gray-700"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
