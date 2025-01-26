"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface StreamData {
  status: string;
  title: string;
  publisherName: string;
  createdAt: string;
  createdBy: string;
  streamType: string;
  tags: string[];
  id: string;
  viewerCount: number;
  myStreamObject: { streamId: string };
}

const Page = () => {
  const [streamData, setStreamData] = useState<StreamData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems] = useState(100); // Fixed total count of items in your data
  const [itemsPerPage] = useState(7); // Number of items per page
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const getStreamData = async (page: number, limit: number) => {
    const url = `https://salsa-backend.workuplift.com/v1/streams?key=forYou&page=${page}&limit=${limit}`;

    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIyLCJpYXQiOjE3Mzc0NTgzMjAsImp0aSI6ImRiOGE4ZGRhLTMyM2EtNGFlYy1hMGRlLWM2ZTc4NDdhNjBiMyIsInJvbGVzIjpbInVzZXIiXSwiZXhwIjoxNzM4MDYzMTIwfQ.GnBndtyPw37ByPoTnBxrgbFpYi_vEOWZyp0KxbJ59Og"; // Ensure the token is stored securely
    if (!token) {
      return;
    }

    try {
      setIsLoading(true); // Set loading state to true before fetching
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`, // Use Bearer schema for token
        },
      });

      setStreamData(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false); // Set loading state to false after fetching
    }
  };

  useEffect(() => {
    getStreamData(currentPage, itemsPerPage);
  }, [currentPage]);

  // Calculate total pages based on fixed totalItems and itemsPerPage
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <div className="text-center">
            <div className="spinner-border animate-spin inline-block w-16 h-16 border-4 rounded-full border-blue-600 border-t-transparent"></div>
            <h2 className="mt-4 text-xl font-semibold text-gray-700">
              Loading, please wait...
            </h2>
          </div>
        </div>
      ) : (
        <div className="container mx-auto p-6">
          <div className="border-2 rounded-lg overflow-hidden">
            {/* Table Header */}
            <div className="p-4">
              <h2 className="text-xl font-semibold">User Information</h2>
              <p className="text-sm">Overview of all users</p>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm ">
                <thead className="text-xs uppercase font-medium">
                  <tr>
                    <th className="py-3 px-4 text-sm text-left">Profile</th>
                    <th className="py-3 px-4 text-sm text-start">ID</th>
                    <th className="py-3 px-4 text-sm text-center">Status</th>
                    <th className="py-3 px-4 text-center text-sm">
                      Stream Type
                    </th>
                    <th className="py-3 px-4 text-center text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {streamData.map((curElem) => (
                    <tr className="border-b transition-colors" key={curElem.id}>
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold">
                            {curElem.createdBy}
                          </div>
                          <div className="ml-4">
                            <p>
                              {new Date(curElem.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        {curElem.myStreamObject.streamId}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-medium">
                          {curElem.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-medium">
                          {curElem.streamType}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Link
                          href={`/stream/${curElem.myStreamObject.streamId}`}
                        >
                          <Button className="px-3 py-1 text-sm font-semibold rounded-lg transition">
                            View
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination Controls */}
          <div className="p-4 flex justify-center items-center">
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-600 transition disabled:opacity-50"
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-grey-600 transition disabled:opacity-50"
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
