"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
// import { IoArrowBackOutline } from "react-icons/io5";
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
      if (res.status === 200) {
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
    setCoinData((prev) => (prev ? { ...prev, [name]: value } : null));
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
              className="mt-1 block w-full rounded-md shadow-sm p-2  sm:text-sm"
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
              className="mt-1 block w-full  rounded-md shadow-sm p-2 sm:text-sm"
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
              className="mt-1 block w-full rounded-md shadow-sm p-2 sm:text-sm"
              value={coinData?.price || ""}
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
              className="mt-1 block w-full rounded-md shadow-sm p-2 sm:text-sm"
              value={coinData?.discountedPrice || ""}
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
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 sm:text-sm"
              value={coinData?.coinAmount || ""}
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
              <Button>
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
