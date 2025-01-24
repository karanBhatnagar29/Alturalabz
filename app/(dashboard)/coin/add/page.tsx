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
    price: Number(""),
    discountedPrice: Number(""),
    coinAmount: Number(""),
    description: "",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const router = useRouter();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Debugging: Log form data
    console.log("Submitting form data:", formData);

    // Validate required fields
    if (!formData.name || !formData.price || !formData.coinAmount) {
      toast({
        title: "Error!",
        description: "Name, Price, and Coin Amount are required fields.",
        variant: "destructive",
      });
      return;
    }

    const url = "https://monetary-backend.workuplift.com/v1/coin-bundle";
    const formDataObj = {
      name: formData.name,
      price: Number(formData.price),
      discountedPrice: Number(formData.discountedPrice),
      coinAmount: Number(formData.coinAmount),
      description: formData.description,
      img: { imagePreview },
    };

    // Add image file if present

    try {
      const res = await axios.post(url, formDataObj);
      console.log(res.status);
      if (res.status === 200 || 201) {
        toast({
          title: "Success!",
          description: "Coin added successfully!",
          variant: "default",
        });
        router.push("/coin");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error adding product:",
          error.response?.data || error.message
        );
      } else {
        console.error("Error adding product:", error);
      }
      toast({
        title: "Error!",
        description: "Failed to add coin. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <main className="p-8 container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left Section: Image Upload */}
      <div className="border-2 rounded-lg p-8 flex flex-col items-center justify-center">
        <img
          src={imagePreview || "../images/coin.png"}
          alt="Product Preview"
          className="w-50 h-40 object-cover rounded-full border-4 border-gray-600 shadow-md"
        />
        <label
          htmlFor="img"
          className="cursor-pointer bg-black text-white mt-4 px-4 py-2 rounded-md shadow hover:bg-blue-600 transition duration-300"
        >
          Upload File
        </label>
        <input
          id="img"
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
        <span id="file-name" className="text-gray-600 text-sm">
          {imagePreview ? "File selected" : "No file selected"}
        </span>
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
              className="w-full p-3 rounded-lg border border-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
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
              className="w-full p-3 rounded-lg border border-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
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
              className="w-full p-3 rounded-lg border border-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
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
              className="w-full p-3 rounded-lg border border-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
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
              className="w-full p-3 rounded-lg border border-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            ></textarea>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center">
            <Link href="/coin">
              <Button className="hover:bg-red-600 transition duration-300">
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              className="hover:bg-green-700 transition duration-300"
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
