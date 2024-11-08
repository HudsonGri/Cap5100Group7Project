"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Overworld() {
  const [levelComplete, setLevelComplete] = useState(false);

  const handleLevel = () => {
    setLevelComplete(true);
  };

  return (
    <div>
      <Image
        src="/game/overworld background.png"
        alt="Overworld Background"
        layout="fill"
        objectFit="cover"
        className="background"
      />

      <div style={{ position: "absolute", bottom: 100, right: 700 }}>
        <Link href="/game/1">
          <div className="relative">
            <Image
              src="/game/level_objects/AB_terminals.png"
              alt="terminals"
              width={100}
              height={100}
              className="cursor-pointer"
            />
            <div className="absolute top-0 left-0 w-full text-center font-bold text-white">
              <div className="bg-zinc-800/70 rounded mx-auto inline-block px-2">
                Level 1
              </div>
            </div>
          </div>
        </Link>
      </div>

      <div style={{ position: "absolute", bottom: 50, right: 100 }}>
        <Link href="/game/2">
          <div className="relative">
            <Image
              src="/game/level_objects/C_storage lockers.png"
              alt="storage lockers"
              width={50}
              height={50}
              className="cursor-pointer"
            />
            <div className="absolute top-0 left-0 w-full text-center font-bold text-white">
              <div className="bg-zinc-800/70 rounded mx-auto inline-block px-2">
                Level 2
              </div>
            </div>
          </div>
        </Link>
      </div>

      <div style={{ position: "absolute", bottom: 500, right: 500 }}>
        <Link href="/demogame">
          <div className="relative">
            <Image
              src="/game/level_objects/D_temperature control.png"
              alt="temperature control"
              width={20}
              height={20}
              className="cursor-pointer"
            />
            <div className="absolute top-0 left-0 w-full text-center font-bold text-white">
              <div className="bg-zinc-800/70 rounded mx-auto inline-block px-2">
                Level 3
              </div>
            </div>
          </div>
        </Link>
      </div>

      <div style={{ position: "absolute", bottom: 350, right: 700 }}>
        <Link href="/demogame">
          <div className="relative">
            <Image
              src="/game/level_objects/E_labeling machine.png"
              alt="labeling machine"
              width={350}
              height={350}
              className="cursor-pointer"
            />
            <div className="absolute top-0 left-0 w-full text-center font-bold text-white">
              <div className="bg-zinc-800/70 rounded mx-auto inline-block px-2">
                Level 4
              </div>
            </div>
          </div>
        </Link>
      </div>

      <div style={{ position: "absolute", bottom: 350, right: 200 }}>
        <Link href="/demogame">
          <div className="relative">
            <Image
              src="/game/level_objects/F_alarm system.png"
              alt="alarm system"
              width={100}
              height={100}
              className="cursor-pointer"
            />
            <div className="absolute top-0 left-0 w-full text-center font-bold text-white">
              <div className="bg-zinc-800/70 rounded mx-auto inline-block px-2">
                Level 5
              </div>
            </div>
          </div>
        </Link>
      </div>

      <div style={{ position: "absolute", bottom: 200, right: 400 }}>
        <Link href="/demogame">
          <div className="relative">
            <Image
              src="/game/level_objects/G_sorting machine.png"
              alt="sorting machine"
              width={100}
              height={100}
              className="cursor-pointer"
            />
            <div className="absolute top-0 left-0 w-full text-center font-bold text-white">
              <div className="bg-zinc-800/70 rounded mx-auto inline-block px-2">
                Level 6
              </div>
            </div>
          </div>
        </Link>
      </div>

      <div style={{ position: "absolute", bottom: 100, right: 1000 }}>
        <Link href="/demogame">
          <div className="relative">
            <Image
              src="/game/level_objects/I_plant monitor.png"
              alt="plant monitor"
              width={200}
              height={200}
              className="cursor-pointer"
            />
            <div className="absolute top-0 left-0 w-full text-center font-bold text-white">
              <div className="bg-zinc-800/70 rounded mx-auto inline-block px-2">
                Level 7
              </div>
            </div>
          </div>
        </Link>
      </div>

      <div style={{ position: "absolute", bottom: 350, right: 1100 }}>
        <Link href="/demogame">
          <div className="relative">
            <Image
              src="/game/level_objects/J_modular device rack.png"
              alt="device rack"
              width={75}
              height={75}
              className="cursor-pointer"
            />
            <div className="absolute top-0 left-0 w-full text-center font-bold text-white">
              <div className="bg-zinc-800/70 rounded mx-auto inline-block px-2">
                Level 8
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
