"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function RoomsPage() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const [rooms, setRooms] = useState<any[]>([]);
  const [newRoom, setNewRoom] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  // 🔹 Ambil user & rooms dari Supabase
  useEffect(() => {
    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      setUser(user);

      const { data: roomsData, error } = await supabase
        .from("rooms")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) console.error("Error fetch rooms:", error);
      else setRooms(roomsData || []);

      setLoading(false);
    }

    load();
  }, [supabase, router]);

  // 🔹 Buat room baru
  async function createRoom(e: React.FormEvent) {
    e.preventDefault();

    if (!newRoom.trim()) return;

    const { data, error } = await supabase
      .from("rooms")
      .insert([{ name: newRoom, host: user.id }]) // ✅ pakai host
      .select();

    if (error) {
      console.error("Error creating room:", error);
      return;
    }

    setRooms((prev) => [data![0], ...prev]);
    setNewRoom("");
  }

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🎬 Nobarkan Rooms</h1>

      {/* Form buat room */}
      <form onSubmit={createRoom} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Nama room baru..."
          value={newRoom}
          onChange={(e) => setNewRoom(e.target.value)}
          className="flex-1 px-3 py-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Buat
        </button>
      </form>

      {/* List rooms */}
      <ul className="space-y-2">
        {rooms.map((room) => (
          <li
            key={room.id}
            className="p-3 border rounded hover:bg-gray-50 cursor-pointer"
            onClick={() => router.push(`/rooms/${room.id}`)}
          >
            <p className="font-medium">{room.name}</p>
            <p className="text-sm text-gray-500">
              Host: {room.host} • {new Date(room.created_at).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
