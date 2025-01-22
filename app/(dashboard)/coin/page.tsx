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
      <div className="flex items-center mt-5 justify-between mb-5 px-4">
        <h1 className="text-2xl font-semibold">Coins List</h1>
        <Link href="/coin/add">
          <Button className="transition duration-300">Add Coin</Button>
        </Link>
      </div>

      <div className="px-4 py-2">
        <div className="shadow-lg rounded-lg border overflow-hidden">
          <Table>
            {/* <TableCaption className="text-lg font-medium">
              List of Coins
            </TableCaption> */}
            <TableHeader>
              <TableRow>
                <TableHead className="p-4">Image</TableHead>
                <TableHead className="p-4">Name</TableHead>
                <TableHead className="p-4">Price</TableHead>
                <TableHead className="p-4">Discount Price</TableHead>
                <TableHead className="p-4">Total Coins</TableHead>
                <TableHead className="p-4 text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
          </Table>
          <div
            className="overflow-y-auto max-h-96" // Scrollable container for rows
          >
            <Table>
              <TableBody>
                {coinData.length > 0 ? (
                  coinData.map((curElem) => (
                    <TableRow
                      key={curElem.id}
                      className="transition-colors duration-200"
                    >
                      <TableCell className="p-4">
                        <Link href={`/coin/${curElem.id}`}>
                          <img
                            className="coin-image w-12 h-12 rounded-full border"
                            src="./images/coin.png"
                            alt="Digital currency image"
                          />
                        </Link>
                      </TableCell>
                      <TableCell className="font-medium p-4">
                        {curElem.name}
                      </TableCell>
                      <TableCell className="p-4">{curElem.price}</TableCell>
                      <TableCell className="p-4">
                        {curElem.discountedPrice}
                      </TableCell>
                      <TableCell className="p-4">
                        {curElem.coinAmount}
                      </TableCell>
                      <TableCell className="text-right p-4 flex items-center justify-end gap-2">
                        <Link href={`/coin/${curElem.id}`}>
                          <Button className="bg-green-500 hover:bg-green-600 transition duration-300">
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
        </div>
      </div>
    </>
  );
};

export default Page;
