/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FaEye } from "react-icons/fa";

interface CoinData {
  name: string;
  price: number;
  discountedPrice: number;
  coinAmount: number;
  id: number;
}

const Page = () => {
  const [coinData, setCoinData] = useState<CoinData[]>([]);

  const getData = async () => {
    const url = "https://monetary-backend.workuplift.com/v1/coin-bundle";
    try {
      const res = await axios.get(url);
      if (res.status === 200) {
        setCoinData(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="flex items-center mt-5 justify-between mb-5 px-4">
        <h1 className="text-2xl font-semibold">Coins List</h1>
        <Link href="/coin/add">
          <Button className="hover:bg-green-700 transition duration-300">
            Add Coin
          </Button>
        </Link>
      </div>

      <div className="px-4 py-2">
        <div className="shadow-lg rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="p-4 text-left">#</TableHead>
                  <TableHead className="p-4 text-left">Image</TableHead>
                  <TableHead className="p-4 text-left">Name</TableHead>
                  <TableHead className="p-4 text-left">Price</TableHead>
                  <TableHead className="p-4 text-left">
                    Discount Price
                  </TableHead>
                  <TableHead className="p-4 text-left">Total Coins</TableHead>
                  <TableHead className="p-4 text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {coinData.length > 0 ? (
                  coinData.map((curElem) => (
                    <TableRow key={curElem.id}>
                      {/* Serial Number */}
                      <TableCell className="p-4">#{curElem.id}</TableCell>
                      {/* Image */}
                      <TableCell className="p-4">
                        <Link href={`/coin/${curElem.id}`}>
                          <img
                            className="coin-image w-12 h-12 rounded-full border"
                            src="./images/coin.png"
                            alt="Digital currency image"
                          />
                        </Link>
                      </TableCell>
                      {/* Name */}
                      <TableCell className="p-4 font-medium">
                        {curElem.name}
                      </TableCell>
                      {/* Price */}
                      <TableCell className="p-4">${curElem.price}</TableCell>
                      {/* Discounted Price */}
                      <TableCell className="p-4">
                        ${curElem.discountedPrice}
                      </TableCell>
                      {/* Total Coins */}
                      <TableCell className="p-4">
                        {curElem.coinAmount}
                      </TableCell>
                      {/* Action */}
                      <TableCell className="p-4 text-right">
                        <Link href={`/coin/${curElem.id}`}>
                          <Button
                            variant="outline"
                            className="hover:bg-green-600 text-green-600 border-green-600"
                          >
                            <FaEye />
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="p-4 text-center">
                      <div className="flex justify-center items-center h-32">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-solid"></div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
