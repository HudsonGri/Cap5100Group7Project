"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Terminal, HelpCircle } from "lucide-react";
import { LoadingSpinner } from "@/components/loading-spinner";
import background from '@/components/overview.jpg';

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
          //width={960} 
          //height={528}
          layout="fill"
          objectFit="cover"
          className="background"
          //fill={true}
        />

        <div style={{position:"absolute", bottom: 100, right: 700}}>
        <Link href="/demogame">
        <Button className="h-9 px-4 py-2" onClick={handleLevel} disabled={false}>
            Level 1
        </Button>
        <Button className="h-9 px-4 py-2" onClick={handleLevel} disabled={true}>
            Level 2
        </Button>
        </Link>
        <Image
            src="/game/level_objects/AB_terminals.png"
            alt="terminals"
            //layout="fill"
            width={100}
            height={100}
            objectFit="scale-down"
            className=""
            />
        </div>

        <div style={{position:"absolute", bottom: 50, right: 100}}>
        <Link href="/demogame">
        <Button className="h-9 px-4 py-2" onClick={handleLevel} disabled={true}>
            Level 3
        </Button>
        </Link>
        <Image
            src="/game/level_objects/C_storage lockers.png"
            alt="terminals"
            //layout="fill"
            width={50}
            height={50}
            objectFit="scale-down"
            className=""
            />
        </div>

        <div style={{position:"absolute", bottom: 500, right: 500}}>
        <Link href="/demogame">
        <Button className="h-9 px-4 py-2" onClick={handleLevel} disabled={true}>
            Level 4
        </Button>
        </Link>
        <Image
            src="/game/level_objects/D_temperature control.png"
            alt="terminals"
            //layout="fill"
            width={20}
            height={20}
            objectFit="scale-down"
            className=""
            />
        </div>

        <div style={{position:"absolute", bottom: 350, right: 700}}>
        <Link href="/demogame">
        <Button className="h-9 px-4 py-2" onClick={handleLevel} disabled={true}>
            Level 5
        </Button>
        </Link>
        <Image
            src="/game/level_objects/E_labeling machine.png"
            alt="terminals"
            //layout="fill"
            width={350}
            height={350}
            objectFit="scale-down"
            className=""
            />
        </div>

        <div style={{position:"absolute", bottom: 350, right: 200}}>
        <Link href="/demogame">
        <Button className="h-9 px-4 py-2" onClick={handleLevel} disabled={true}>
            Level 6
        </Button>
        </Link>
        <Image
            src="/game/level_objects/F_alarm system.png"
            alt="terminals"
            //layout="fill"
            width={100}
            height={100}
            objectFit="scale-down"
            className=""
            />
        </div>

        <div style={{position:"absolute", bottom: 200, right: 400}}>
        <Link href="/demogame">
        <Button className="h-9 px-4 py-2" onClick={handleLevel} disabled={true}>
            Level 7
        </Button>
        </Link>
        <Image
            src="/game/level_objects/G_sorting machine.png"
            alt="terminals"
            //layout="fill"
            width={100}
            height={100}
            objectFit="scale-down"
            className=""
            />
        </div>

        <div style={{position:"absolute", bottom: 100, right: 1000}}>
        <Link href="/demogame">
        <Button className="h-9 px-4 py-2" onClick={handleLevel} disabled={true}>
            Level 8
        </Button>
        </Link>
        <Image
            src="/game/level_objects/I_plant monitor.png"
            alt="terminals"
            //layout="fill"
            width={200}
            height={200}
            objectFit="scale-down"
            className=""
            />
        </div>

        <div style={{position:"absolute", bottom: 350, right: 1100}}>
        <Link href="/demogame">
        <Button className="h-9 px-4 py-2" onClick={handleLevel} disabled={true}>
            Level 9
        </Button>
        </Link>
        <Image
            src="/game/level_objects/J_modular device rack.png"
            alt="terminals"
            //layout="fill"
            width={75}
            height={75}
            objectFit="scale-down"
            className=""
            />
        </div>

        </div>        
    );
}