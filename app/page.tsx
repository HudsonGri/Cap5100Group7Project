"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export default function Home() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(
    Cookies.get("userId") || null
  );

  useEffect(() => {
    if (!userId) {
      fetch("https://interpret-api.onrender.com/generate_id", {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          Cookies.set("userId", data.id, { expires: 365 });
          setUserId(data.id);
        });
    }
  }, [userId]); // Added 'userId' to the dependency array

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-700 to-black">
      <div className="max-w-2xl w-full px-12 py-10 bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 hover:border-white/30 transition-all">
        <div className="text-center mb-2">
          <h1 className="text-5xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-zinc-200 to-zinc-400">
            Interactive Python Educational Game
          </h1>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-xl font-medium text-white/90 mb-6">Created By</h2>
          <div className="flex justify-center gap-8 text-zinc-300/80">
            <span className="hover:text-white transition-colors">
              Hudson Griffith
            </span>
            <span className="hover:text-white transition-colors">
              Guangyan An
            </span>
            <span className="hover:text-white transition-colors">
              Audrey DeHoog
            </span>
            <span className="hover:text-white transition-colors">
              Rohan Josh
            </span>
          </div>
          {userId && (
            <div className="mt-4 text-zinc-300/80">
              Your ID: <span className="font-bold">{userId}</span>
            </div>
          )}
        </div>

        <Button
          className="w-full py-6 text-lg font-semibold bg-zinc-900 hover:bg-zinc-800 text-white transition-all rounded-xl shadow-xl border border-zinc-700 hover:border-zinc-600"
          onClick={() => router.push("/overworld")}
        >
          Begin Game
        </Button>
      </div>
    </div>
  );
}
