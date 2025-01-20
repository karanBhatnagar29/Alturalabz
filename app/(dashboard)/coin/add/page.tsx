/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation"; // Import the useRouter hook

const Page = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    discountedPrice: "",
    coinAmount: "",
    description: "",
  });

  const router = useRouter(); // Initialize the router

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
        alert("Coin added successfully");
        router.push("/coin");
      }

      // Redirect to the coin page upon success
    } catch (error) {
      console.log("Error adding product:", error);
    }
  };

  return (
    <main className="p-6 container mx-auto grid grid-cols-1 md:grid-cols-[.5fr,1fr] gap-6">
      <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center">
        <img
          src="../images/coin.png"
          alt="coin image"
          className="max-w-full h-auto"
        />
        <Button className="mt-4">Upload Image</Button>
      </div>
      <div className="bg-white shadow rounded-lg p-6">
        <form onSubmit={handleSubmit} id="productForm" className="space-y-6">
          {/* Product Name */}
          <div>
            <label
              htmlFor="product-name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Product Name
            </label>
            <input
              type="text"
              id="product-name"
              name="name"
              placeholder="Enter product name"
              value={formData.name}
              required
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              onChange={handleInputChange}
            />
          </div>

          {/* Price */}
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Price
            </label>
            <input
              type="text"
              id="price"
              name="price"
              placeholder="Enter product price"
              required
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              onChange={handleInputChange}
              value={formData.price}
            />
          </div>

          {/* Discount */}
          <div>
            <label
              htmlFor="discountPrice"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Discount
            </label>
            <input
              type="text"
              name="discountedPrice"
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              id="discountPrice"
              value={formData.discountedPrice}
              onChange={handleInputChange}
              placeholder="Discounted Price"
            />
          </div>

          {/* Coin Amount */}
          <div>
            <label
              htmlFor="coinAmount"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Coin Amount
            </label>
            <input
              type="text"
              id="coinAmount"
              name="coinAmount"
              placeholder="Enter coin amount"
              required
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              onChange={handleInputChange}
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              placeholder="Enter product description"
              required
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={formData.description}
              onChange={handleInputChange}
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-right">
            <Button type="submit">Add Product</Button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Page;
