/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

const Page = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    discountedPrice: "",
    coinAmount: "",
    description: "",
    img: "",
  });

  const router = useRouter();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = "https://monetary-backend.workuplift.com/v1/coin-bundle";
    try {
      const res = await axios.post(url, formData);
      if (res.status === 200) {
        toast({
          title: "Success!",
          description: "Coin added successfully!",
        });
        router.push("/coin");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <main className="p-8 container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left Section: Image Upload */}
      <div className="border-2 rounded-lg p-8 flex flex-col items-center justify-center">
        <img
          src={formData.img || "../images/coin.png"}
          alt="Product Preview"
          className="w-50 h-40 object-cover rounded-full border-4 border-gray-600 shadow-md"
        />
        <Button className="mt-6 hover:bg-blue-700 transition duration-300">
          Upload Image
        </Button>
      </div>

      {/* Right Section: Form */}
      <div className="border-2 rounded-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name */}
          <div>
            <label htmlFor="product-name" className="block font-medium mb-1">
              Product Name
            </label>
            <input
              type="text"
              id="product-name"
              name="name"
              placeholder="Enter product name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full p-3  rounded-lg border border-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="block font-medium mb-1">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Enter product price"
              value={formData.price}
              onChange={handleInputChange}
              required
              className="w-full p-3  rounded-lg border border-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Discounted Price */}
          <div>
            <label htmlFor="discountedPrice" className="block font-medium mb-1">
              Discounted Price
            </label>
            <input
              type="number"
              id="discountedPrice"
              name="discountedPrice"
              placeholder="Enter discounted price"
              value={formData.discountedPrice}
              onChange={handleInputChange}
              required
              className="w-full p-3  rounded-lg border border-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Coin Amount */}
          <div>
            <label htmlFor="coinAmount" className="block font-medium mb-1">
              Coin Amount
            </label>
            <input
              type="number"
              id="coinAmount"
              name="coinAmount"
              placeholder="Enter coin amount"
              value={formData.coinAmount}
              onChange={handleInputChange}
              required
              className="w-full p-3  rounded-lg border border-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block font-medium mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              placeholder="Enter product description"
              value={formData.description}
              onChange={handleInputChange}
              required
              className="w-full p-3  rounded-lg border border-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            ></textarea>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center">
            <Link href="/coin">
              <Button className=" hover:bg-red-600 transition duration-300">
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              className=" hover:bg-green-700 transition duration-300"
            >
              Add Product
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Page;
