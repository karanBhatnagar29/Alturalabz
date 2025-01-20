"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface User {
    email: string;
    password: string;
  }

  interface LoginData {
    email: string;
    password: string;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginData: LoginData = {
      email: user.email,
      password: user.password,
    };
    if (
      loginData.email == "admin@alturalabz" &&
      loginData.password == "cdalturalabz"
    ) {
      router.push("/main");
    } else {
      alert("Enter correct email and password");
    }
    console.log(loginData);
  };

  // console.log(user);
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="mx-auto max-w-sm ">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Enter your email and password to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                  value={user.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2 mb-2 ">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={user.password}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                {/* <Link href="/main"> */}
                <Button type="submit" className="w-full">
                  Login
                </Button>
                {/* </Link> */}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
export default Page;
