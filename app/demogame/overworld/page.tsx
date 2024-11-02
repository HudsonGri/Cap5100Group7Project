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
          src="/game/overview.jpg"
          alt="Overworld Background"
          layout="fill"
          objectFit="fill"
          className="object-right"
        />

        <div style={{position:"absolute", float: "right", bottom: 170, right:100}}>
            <Button className="py-6 px-8 text-2xl" onClick={handleLevel}>
        <Link href="/demogame">
        <Image
            src="/game/border.jpg"
            alt="demogame"
            layout="fill"
            objectFit="scale-down"
            className="object-right"
            />
        </Link>
            Level 1
        </Button>
        </div>
        
        </div>        
    );
}