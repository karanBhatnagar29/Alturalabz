/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation"; // Import the useRouter hook
import { IoArrowBackOutline } from "react-icons/io5";
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
      <div className="border-gray-300 shadow rounded-lg p-6 flex flex-col items-center">
        <img
          src="../images/coin.png"
          alt="coin image"
          className="max-w-full h-auto"
        />
        <Button className="mt-4">Upload Image</Button>
      </div>
      <div className=" shadow rounded-lg p-6">
        <form onSubmit={handleSubmit} id="productForm" className="space-y-6">
          {/* Product Name */}
          <div>
            <label htmlFor="product-name" className="block font-medium ">
              Product Name
            </label>
            <input
              type="text"
              id="product-name"
              name="name"
              placeholder="Enter product name"
              value={formData.name}
              required
              className="w-full rounded-lg shadow-sm p-2"
              onChange={handleInputChange}
            />
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="block font-medium ">
              Price
            </label>
            <input
              type="text"
              id="price"
              name="price"
              placeholder="Enter product price"
              required
              className="w-full p-2 rounded-lg shadow-sm "
              onChange={handleInputChange}
              value={formData.price}
            />
          </div>

          {/* Discount */}
          <div>
            <label htmlFor="discountPrice" className="block  font-medium ">
              Discount
            </label>
            <input
              type="text"
              name="discountedPrice"
              className="w-full p-2 rounded-lg shadow-sm "
              id="discountPrice"
              value={formData.discountedPrice}
              onChange={handleInputChange}
              placeholder="Discounted Price"
            />
          </div>

          {/* Coin Amount */}
          <div>
            <label htmlFor="coinAmount" className="block  font-medium mb-2">
              Coin Amount
            </label>
            <input
              type="text"
              id="coinAmount"
              name="coinAmount"
              placeholder="Enter coin amount"
              required
              className="w-full p-2 rounded-lg shadow-sm "
              onChange={handleInputChange}
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block font-medium ">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              placeholder="Enter product description"
              required
              className="w-full p-2 rounded-lg shadow-sm "
              value={formData.description}
              onChange={handleInputChange}
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className=" flex items-center justify-end gap-2">
            <Button
              type="submit"
              onClick={() => {
                toast({
                  title: "Coin Added successfully✅ ",
                  description: "Check Coin Page",
                });
              }}
            >
              Add Coin
            </Button>
            <Link href="/coin">
              <Button>
                <IoArrowBackOutline />
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Page;
