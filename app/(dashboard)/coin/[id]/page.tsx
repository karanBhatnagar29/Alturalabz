/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Use `useParams` hook for dynamic route params
import axios from "axios";

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

  console.log("Coin Data:", getCoin);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="container mx-auto max-w-7xl bg-white rounded-lg shadow-lg p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="flex items-center justify-center">
            <img
              src="../images/coin.png"
              alt="Product"
              className="w-full max-w-md rounded-lg shadow-md object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col items-center lg:items-start justify-center">
            {/* Product Title */}

            <h1 className="text-5xl font-bold text-gray-800">
              {getCoin?.name}
            </h1>

            {/* Price */}
            <div className="flex items-center mt-4">
              <p className="text-2xl font-bold text-gray-800">
                {getCoin?.discountedPrice}
              </p>
              <p className="text-gray-500 line-through ml-3">
                {getCoin?.price}
              </p>
            </div>

            {/* Product Details */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-800">Details</h3>
              <ul className="mt-2 text-gray-600">
                <li>{getCoin?.appleSku}</li>
                <li>{getCoin?.googleSku}</li>
              </ul>
            </div>
            {/* Product Description */}

            <div className="mt-10">
              <h2 className="text-2xl font-bold text-gray-800">
                Product Description
              </h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                {getCoin?.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
