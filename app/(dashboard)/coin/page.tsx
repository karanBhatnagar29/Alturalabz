/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

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
        setCoinData(res.data.data); // set the data in the state
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
      <div className="flex items-center justify-between mb-5 px-4">
        <h1 className="text-2xl font-semibold text-gray-800">Coins List</h1>
        <Link href="/coin/add">
          <Button className="bg-blue-600 text-white hover:bg-blue-700 transition duration-300">
            Add Coin
          </Button>
        </Link>
      </div>

      <div className="overflow-x-auto px-4 py-2">
        <Table className="min-w-full divide-y shadow-lg rounded-lg bg-white">
          <TableCaption className="text-lg font-medium text-gray-600">
            List of Coins
          </TableCaption>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="p-4 text-gray-600">Image</TableHead>
              <TableHead className="p-4 text-gray-600">Name</TableHead>
              <TableHead className="p-4 text-gray-600">Price</TableHead>
              <TableHead className="p-4 text-gray-600">
                Discount Price
              </TableHead>
              <TableHead className="p-4 text-gray-600">Total Coins</TableHead>
              <TableHead className="p-4 text-gray-600 text-right">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {coinData.length > 0 ? (
              coinData.map((curElem) => (
                <TableRow
                  key={curElem.id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <TableCell className="p-4">
                    <Link href={`/coin/${curElem.id}`}>
                      <img
                        className="coin-image w-12 h-12 rounded-full border border-gray-300"
                        src="./images/coin.png"
                        alt="Digital currency image"
                      />
                    </Link>
                  </TableCell>
                  <TableCell className="font-medium p-4">
                    {curElem.name}
                  </TableCell>
                  <TableCell className="p-4 text-gray-700">
                    {curElem.price}
                  </TableCell>
                  <TableCell className="p-4 text-gray-700">
                    {curElem.discountedPrice}
                  </TableCell>
                  <TableCell className="p-4 text-gray-700">
                    {curElem.coinAmount}
                  </TableCell>
                  <TableCell className="text-right p-4 flex items-center justify-end gap-2">
                    <Link href={`/coin/update/${curElem.id}`}>
                      <Button className="bg-yellow-500 text-white hover:bg-yellow-600 transition duration-300">
                        Edit
                      </Button>
                    </Link>
                    <Link href={`/coin/${curElem.id}`}>
                      <Button className="bg-green-500 text-white hover:bg-green-600 transition duration-300">
                        View
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="p-4 text-center">
                  <div className="flex justify-center items-center h-32">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-solid"></div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default Page;
