"use client";
import React, { useEffect, useState } from "react";
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/YZ2AG5NGPJN
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import data from "@/app/data.json";
import Link from "next/link";
// import { IoArrowBackOutline } from "react-icons/io5";
import { useToast } from "@/hooks/use-toast";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { toast } = useToast();
  const [id, setId] = useState<string | null>(null);
  const [filteredUser, setFilteredUser] = useState<{
    id: number;
    firstName?: string;
    lastName?: string;
    email?: string;
  } | null>(null);

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;
      setId(resolvedParams.id);

      const user = data.find((user) => user.id === Number(resolvedParams.id));
      setFilteredUser(user || null);
    };

    fetchParams();
  }, [params]);

  if (!id) {
    return <div>Loading...</div>;
  }

  return (
    <div className="m-5">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <CardTitle>Edit User {id}</CardTitle>
            <Link href="/users">
              <Button>Cancel</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              placeholder="First Name"
              required
              autoComplete="off"
              defaultValue={filteredUser?.firstName || ""}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              placeholder="Last Name"
              required
              autoComplete="off"
              defaultValue={filteredUser?.lastName || ""}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              autoComplete="off"
              defaultValue={filteredUser?.email || ""}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={() => {
              toast({
                title: "User updated successfully✅",
                description: "Check user page",
              });
            }}
          >
            Update User
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
