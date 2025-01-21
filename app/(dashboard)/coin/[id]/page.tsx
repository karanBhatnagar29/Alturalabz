/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Use `useParams` hook for dynamic route params
import axios from "axios";
import { Button } from "@/components/ui/button";
import { FaDollarSign } from "react-icons/fa";

interface GetCoin {
  name: string;
  price: number;
  discountedPrice: number;
  coinAmount: number;
  appleSku: string;
  googleSku: string;
  description: string;
}

const Page = () => {
  const params = useParams(); // Retrieve dynamic params
  const id = params?.id; // Safely access `id`
  const [getCoin, setGetCoin] = useState<GetCoin | null>(null);

  useEffect(() => {
    const getCoinData = async () => {
      if (!id) return; // Ensure `id` is available
      try {
        const url = `https://monetary-backend.workuplift.com/v1/coin-bundle/${id}`;
        const res = await axios.get(url);
        setGetCoin(res.data.data);
      } catch (error) {
        console.error("Failed to fetch coin data:", error);
      }
    };

    getCoinData();
  }, [id]); // Add `id` as a dependency

  return (
    <div className="p-6  m-5 rounded-xl border-2">
      <div className="flex items-center justify-between mb-6">
        {/* Coin Image and Action Buttons */}
        <img
          src="/images/coin.png"
          alt={getCoin?.name}
          className="w-16 h-16 object-cover rounded-full border-4 "
        />
        <div className="flex items-center gap-4">
          <Button className=" hover:bg-blue-600 transition-all duration-300">
            Edit
          </Button>
          <Button className="bg-red-500 text-white hover:bg-red-600 transition-all duration-300">
            Delete
          </Button>
        </div>
      </div>

      {/* Coin Price Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        <div className="flex items-center justify-center gap-3  p-4 rounded-xl border-2">
          <FaDollarSign className="text-xl text-green-500" />
          <div className="text-lg">
            <span className="font-semibold">Current Price</span>
            <p className="text-2xl font-bold text-green-600">
              {getCoin?.discountedPrice}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-3  p-4 rounded-xl border-2">
          <FaDollarSign className="text-xl text-orange-500" />
          <div className="text-lg">
            <span className="font-semibold ">Original Price</span>
            <p className="text-2xl font-bold text-orange-600">
              {getCoin?.price}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-3  p-4 rounded-xl border-2">
          <FaDollarSign className="text-xl text-gray-500" />
          <div className="text-lg">
            <span className="font-semibold ">Coin Amount</span>
            <p className="text-2xl font-bold">{getCoin?.coinAmount}</p>
          </div>
        </div>
      </div>

      {/* Additional Information Section */}
      <p className="text-2xl font-semibold mb-4">Additional Information</p>
      <div className="space-y-4 text-lg ">
        <p>
          <strong>Name:</strong> {getCoin?.name}
        </p>
        <p>
          <strong>Price:</strong> {getCoin?.price}
        </p>
        <p>
          <strong>Discounted Price:</strong> {getCoin?.discountedPrice}
        </p>
        <p>
          <strong>Coin Amount:</strong> {getCoin?.coinAmount}
        </p>
        <p>
          <strong>Description:</strong> {getCoin?.description}
        </p>
      </div>
    </div>
  );
};

export default Page;
