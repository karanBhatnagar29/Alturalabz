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
      // console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="flex items-end justify-end">
        <Link href="/coin/add">
          <Button className="m-5">Add Coin</Button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <Table className="min-w-full divide-y shadow">
          <TableCaption>List of Coins</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Discount Price</TableHead>
              <TableHead>Total Coins</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coinData.length > 0 ? (
              coinData.map((curElem) => (
                <TableRow key={curElem.id}>
                  <TableCell>
                    <Link href={`/coin/${curElem.id}`}>
                      <img
                        className="coin-image w-10 h-10"
                        src="./images/coin.png"
                        alt="Digital currency image"
                        width="10%"
                      />
                    </Link>
                  </TableCell>
                  <TableCell className="font-medium">{curElem.name}</TableCell>
                  <TableCell>{curElem.price}</TableCell>
                  <TableCell>{curElem.discountedPrice}</TableCell>
                  <TableCell>{curElem.coinAmount}</TableCell>
                  <TableCell className="text-right flex items-center justify-end gap-2">
                    <Link href={`/coin/update/${curElem.id}`}>
                      <Button>Edit</Button>
                    </Link>
                    <Link href={`/coin/${curElem.id}`}>
                      <Button>View</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="w-full h-screen text-center">
                  <div className="flex justify-center items-center min-h-screen">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
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
