"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

// For handling params in Next.js 13+ with React.use()
const Page = ({ params }: { params: Promise<{ id: number }> }) => {
  const [id, setId] = useState<number | null>(null);

  useEffect(() => {
    params.then((unwrappedParams) => {
      setId(unwrappedParams.id);
    });
  }, [params]);
  const [card, setCard] = useState({});

  const getStreamerData = async () => {
    // Corrected API URL formatting
    const url = `https://salsa-backend.workuplift.com/v1/streams?key=forYou&page=1&limit=20&id=${id}`;

    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIyLCJpYXQiOjE3Mzc0NTgzMjAsImp0aSI6ImRiOGE4ZGRhLTMyM2EtNGFlYy1hMGRlLWM2ZTc4NDdhNjBiMyIsInJvbGVzIjpbInVzZXIiXSwiZXhwIjoxNzM4MDYzMTIwfQ.GnBndtyPw37ByPoTnBxrgbFpYi_vEOWZyp0KxbJ59Og"; // Ensure the token is stored securely

    if (!token) {
      return;
    }

    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`, // Use Bearer schema for token
        },
      });

      setCard(res.data.data); // Set the fetched data
    } catch (error) {
      console.log(error);
    }
  };
  console.log(card);

  useEffect(() => {
    if (id) {
      getStreamerData(); // Fetch data when ID is available
    }
  }, [id]); // Run effect when 'id' changes

  return (
    <div>
      <h1>Streamer number {id}</h1>
      {/* You can display your `card` data here */}
    </div>
  );
};

export default Page;
