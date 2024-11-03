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

        <div style={{position:"absolute", bottom: 150, right: 1000}}>
        <Link href="/demogame">
        <Button className="h-9 px-4 py-2" onClick={handleLevel} disabled={false}>
            Level 1
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

        </div>        
    );
}