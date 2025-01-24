"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

const Page = ({ params }: { params: Promise<{ id: number }> }) => {
  const { toast } = useToast();
  const router = useRouter();
  const [id, setId] = useState<number | null>(null);
  const [resData, setResData] = useState({});

  interface CoinData {
    name: string;
    description: string;
    price: number;
    img: string;
    discountedPrice: number;
    coinAmount: number;
  }

  const [coinData, setCoinData] = useState<CoinData | null>(null);

  useEffect(() => {
    const unwrapParams = async () => {
      const unwrappedParams = await params;
      setId(unwrappedParams.id);
    };

    unwrapParams();
  }, [params]);

  const getCoinData = async () => {
    if (id === null) return;
    const url = `https://monetary-backend.workuplift.com/v1/coin-bundle/${id}`;
    try {
      const res = await axios.get(url);
      if (res.status === 200 || 201) {
        setCoinData(res.data.data);
      } else {
        <div>loading.....</div>;
      }
    } catch (error) {
      console.error("Error fetching coin data:", error);
    }
  };

  useEffect(() => {
    getCoinData();
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setCoinData((prev) => {
      if (!prev) return null;

      // Convert numeric fields to numbers
      const numericFields = ["price", "discountedPrice", "coinAmount"];
      const updatedValue = numericFields.includes(name) ? Number(value) : value;

      return { ...prev, [name]: updatedValue };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !coinData) return;

    const url = `https://monetary-backend.workuplift.com/v1/coin-bundle/${id}`;
    try {
      const res = await axios.put(url, coinData);
      console.log("Data updated successfully:", res.data);
      setResData(res.data);
      router.push("/coin");
    } catch (error) {
      console.error("Error updating data:", error);
      alert("Failed to update the product.");
    }
  };

  return (
    <div className=" flex items-center justify-center">
      <div className="w-full h-screen  shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name */}
          <div>
            <label htmlFor="name" className="block  font-medium ">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full p-3 rounded-lg border border-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter product name"
              value={coinData?.name || ""}
              onChange={handleInputChange}
            />
          </div>

          {/* Product Description */}
          <div>
            <label htmlFor="description" className="block font-medium ">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              className="w-full p-3 rounded-lg border border-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 "
              placeholder="Enter product description"
              value={coinData?.description || ""}
              onChange={handleInputChange}
            ></textarea>
          </div>

          {/* Product Price */}
          <div>
            <label htmlFor="price" className="block  font-medium">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              className="w-full p-3 rounded-lg border border-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 "
              value={Number(coinData?.price) || 0}
              onChange={handleInputChange}
            />
          </div>

          {/* Discounted Price */}
          <div>
            <label htmlFor="discountedPrice" className="block font-medium ">
              Discounted Price
            </label>
            <input
              type="number"
              id="discountedPrice"
              name="discountedPrice"
              className="w-full p-3 rounded-lg border border-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={Number(coinData?.discountedPrice) || 0}
              onChange={handleInputChange}
            />
          </div>

          {/* Coin Amount */}
          <div>
            <label htmlFor="coinAmount" className="block font-medium ">
              Coin Amount
            </label>
            <input
              type="number"
              id="coinAmount"
              name="coinAmount"
              className="w-full p-3 rounded-lg border border-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 "
              value={Number(coinData?.coinAmount) || 0}
              onChange={handleInputChange}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-2">
            <Button
              type="submit"
              onClick={() => {
                if (resData)
                  toast({
                    title: "Changes saved successfully✅",
                    description: "Check coin page",
                  });
              }}
            >
              Update
            </Button>
            <Link href="/coin">
              <Button className="hover:bg-red-600 transition duration-300">
                {/* <IoArrowBackOutline /> */}
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
