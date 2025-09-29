"use client";

import { useState } from "react";
import { Button } from "../../../../components/button";
import { Input } from "../../../../components/input";

// === FEATURE: Icon (bisa ganti pake lucide-react)
import { Mic, MicOff, Video, VideoOff, Monitor, MessageSquare, PhoneOff } from "lucide-react";

export default function RoomPage({ params }: { params: { id: string } }) {
  // === FEATURE: State Kamera & Mic
  const [cameraOn, setCameraOn] = useState(true);
  const [micOn, setMicOn] = useState(true);

  // === FEATURE: State Chat Sidebar
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="flex h-screen bg-black text-white">
      {/* === FEATURE: MAIN VIDEO AREA === */}
      <div className="flex-1 flex flex-col items-center justify-center relative">
        <div className="bg-gray-900 rounded-lg flex items-center justify-center w-4/5 h-3/4">
          <span className="text-gray-400">[ Screen Share / Video Here ]</span>
        </div>

        {/* Thumbnail kamera kecil (bottom-right) */}
        {cameraOn && (
          <div className="absolute bottom-28 right-10 bg-gray-800 rounded-lg w-40 h-28 flex items-center justify-center">
            <span className="text-gray-400 text-sm">[ Camera View ]</span>
          </div>
        )}

        {/* === FEATURE: CONTROL BAR === */}
        <div className="absolute bottom-5 flex gap-4">
          {/* Mic */}
          <Button
            variant="secondary"
            size="icon"
            onClick={() => setMicOn(!micOn)}
            className="rounded-full w-12 h-12"
          >
            {micOn ? <Mic /> : <MicOff />}
          </Button>

          {/* Camera */}
          <Button
            variant="secondary"
            size="icon"
            onClick={() => setCameraOn(!cameraOn)}
            className="rounded-full w-12 h-12"
          >
            {cameraOn ? <Video /> : <VideoOff />}
          </Button>

          {/* Share Screen */}
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full w-12 h-12"
          >
            <Monitor />
          </Button>

          {/* Chat Toggle */}
          <Button
            variant="secondary"
            size="icon"
            onClick={() => setChatOpen(!chatOpen)}
            className="rounded-full w-12 h-12"
          >
            <MessageSquare />
          </Button>

          {/* Leave */}
          <Button
            variant="destructive"
            size="icon"
            className="rounded-full w-12 h-12"
          >
            <PhoneOff />
          </Button>
        </div>
      </div>

      {/* === FEATURE: CHAT SIDEBAR === */}
      {chatOpen && (
        <div className="w-80 bg-gray-900 border-l border-gray-700 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            <div className="text-sm text-gray-400">[ Chat messages... ]</div>
          </div>
          <div className="p-4 border-t border-gray-700 flex gap-2">
            <Input placeholder="Type message..." className="flex-1 bg-gray-800 border-gray-700" />
            <Button variant="secondary">Send</Button>
          </div>
        </div>
      )}
    </div>
  );
}
