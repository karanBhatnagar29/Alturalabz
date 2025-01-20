import React from "react";
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
const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const filteredUser = data.find((user) => user.id === Number(id));
  console.log(filteredUser);
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Edit User {id}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" placeholder="First Name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" placeholder="Last Name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Update User</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default page;
