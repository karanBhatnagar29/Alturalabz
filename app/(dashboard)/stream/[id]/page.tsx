import React from "react";
import { Users, Clock, Radio, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface StreamObject {
  streamId: string;
  streamCode: string;
  publisherId: number;
  publisherName: string;
  image: string | null;
}

interface Stream {
  id: string;
  title: string;
  createdAt: string;
  createdBy: number;
  status: string;
  streamType: string;
  tags: string[];
  viewerCount: number;
  myStreamObject: StreamObject;
  updatedAt: string;
  moderationActions: { action: string; timestamp: string }[];
}

function App() {
  const stream: Stream = {
    createdAt: "2025-01-23T06:02:32.786Z",
    createdBy: 32,
    id: "6791db78aad30e9f9862d976",
    moderationActions: [],
    myStreamObject: {
      streamId: "Qo07ZFlDoI2FaMDs3357720670891924",
      streamCode: "9b1ce536-3aeb-472c-8ea2-f7d07ce6e101",
      publisherId: 32,
      publisherName: "Arvind Joshi",
      image: null,
    },
    status: "live",
    streamType: "public",
    tags: ["HR", "PM", "S"],
    title: "Come in Party Battle",
    updatedAt: "2025-01-23T06:02:32.786Z",
    viewerCount: 46,
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <>
      <div className="text-end mr-16">
        <Link href="/stream">
          <Button>Back</Button>
        </Link>
      </div>
      <div className="flex items-start mt-10 justify-center min-h-screen gap-10 px-4">
        {/* Stream Card */}
        <div className="max-w-2xl w-full rounded-2xl shadow-2xl border-2 border-white overflow-hidden transform transition-all hover:scale-[1.02]">
          <div className="relative h-56 bg-gradient-to-r from-violet-600 to-blue-500 p-8">
            <div className="absolute top-8 right-8">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-red-500 text-white shadow-lg animate-pulse">
                LIVE
              </span>
            </div>
            <div className="absolute bottom-8 left-8 right-8">
              <h1 className="text-4xl font-bold text-white mb-3 leading-tight">
                {stream.title}
              </h1>
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-white" />
                <span className="font-medium text-white">
                  {stream.myStreamObject.publisherName}
                </span>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-gray-500" />
                <div>
                  <p className="text-xl">{stream.viewerCount}</p>
                  <p className="text-sm text-gray-400">Viewers</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-400">Started</p>
                  <p className="text-sm">{formatDate(stream.createdAt)}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Link2 className="w-5 h-5 text-gray-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-400">Stream ID</p>
                  <p className="text-sm font-mono truncate">
                    {stream.myStreamObject.streamId}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Stream Code</p>
                <div className="p-3 bg-gray-100 text-black rounded-lg font-mono text-sm">
                  {stream.myStreamObject.streamCode}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {stream.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-violet-500 to-violet-600 text-white shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TV Component */}
        <div className="relative w-96 h-64 bg-gray-900 rounded-2xl shadow-lg border-4 border-gray-700 flex items-center justify-center">
          <div className="absolute inset-1 bg-black rounded-xl flex items-center justify-center">
            <h1 className="text-2xl text-white font-bold">Live Broadcast</h1>
          </div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-gray-700 w-20 h-3 rounded-b-lg"></div>
        </div>
      </div>
    </>
  );
}

export default App;
