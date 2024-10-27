"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
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

const CodeEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

const PixelSpeechBubble = dynamic(
  () => import("@/components/PixelSpeechBubble"),
  { ssr: false }
);

const TypewriterText = ({ text, onComplete }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const isSpeakingRef = useRef(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      isSpeakingRef.current = true;
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      isSpeakingRef.current = false;
      if (onComplete) {
        onComplete();
      }
    }
  }, [currentIndex, text, onComplete]);

  return <span>{displayedText}</span>;
};

export default function Game() {
  const [level, setLevel] = useState({
    number: 1,
    title: "Welcome to Python!",
    description:
      "In this level, you'll learn to use Python's `print()` function to display text on the screen. The `print()` function is one of the most basic and useful commands in Python.",
    hints: [
      "Remember to use parentheses () after print",
      "String literals in Python can use either single quotes '' or double quotes \"\"",
      "Don't forget the exclamation mark!",
      'The print statement should look like: print("Your message here")',
    ],
    dialogue: {
      initial:
        "Hey there, new programmer! I'm Professor Py, and I'll be your guide. Let's start with something simple - I need you to print a greeting message that says \"Hello Py!\"",
      success:
        "Great job! You've mastered the print function. Now let's try something a bit more challenging!",
    },
  });

  const [code, setCode] = useState("# Type your Python code here");
  const [output, setOutput] = useState("");
  const [isEditorLoading, setIsEditorLoading] = useState(true);
  const [showUserBubble, setShowUserBubble] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [dialogueComplete, setDialogueComplete] = useState(false);
  const [levelStarted, setLevelStarted] = useState(false);
  const [levelDone, setLevelDone] = useState(false);
  const isSpeakingRef = useRef(false);

  const handleEditorChange = (value) => {
    setCode(value);
  };

  const runCode = () => {
    if (code.trim() === 'print("Hello Py!")') {
      setOutput("Success: You printed 'Hello Py!'");
      setShowUserBubble(true);
      setTimeout(() => {
        setShowSuccessMessage(true);
        isSpeakingRef.current = true;
      }, 1500);
    } else {
      setOutput("Error: Try again. Make sure your code prints 'Hello Py!'");
    }
  };

  const startLevel = () => {
    setLevelStarted(true);
    isSpeakingRef.current = true;
  };

  useEffect(() => {
    if (levelDone) {
      isSpeakingRef.current = false;
    }
  }, [levelDone]);

  return (
    <main className="flex h-screen bg-zinc-900 dark">
      <div className="relative flex-grow">
        <Image
          src="/game/bg.png"
          alt="Game Background"
          layout="fill"
          objectFit="cover"
          className="object-right"
        />
        {!levelStarted && (
          <div className="absolute inset-0 bg-black opacity-50" />
        )}
        {!levelStarted && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Button className="py-6 px-8 text-2xl" onClick={startLevel}>
              Start Level
            </Button>
          </div>
        )}
        {levelStarted && (
          <AnimatePresence>
            <motion.div
              className="absolute bottom-1/3 right-0 flex flex-col items-center justify-center space-y-4 pr-10"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <PixelSpeechBubble tailPosition="left">
                <TypewriterText
                  text={level.dialogue.initial}
                  onComplete={() => {
                    setDialogueComplete(true);
                    isSpeakingRef.current = false;
                  }}
                />
              </PixelSpeechBubble>

              {showUserBubble ? (
                <motion.div
                  className="flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <PixelSpeechBubble tailPosition="right">
                    <TypewriterText text="Hello Py!" onComplete={() => {}} />
                  </PixelSpeechBubble>
                </motion.div>
              ) : (
                <div className="flex items-center justify-center opacity-0">
                  <PixelSpeechBubble tailPosition="left">
                    <TypewriterText text="Hello Py!" onComplete={() => {}} />
                  </PixelSpeechBubble>
                </div>
              )}

              {showSuccessMessage ? (
                <motion.div
                  className="flex items-center justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <PixelSpeechBubble tailPosition="left">
                    <TypewriterText
                      text={level.dialogue.success}
                      onComplete={() => {
                        isSpeakingRef.current = false;
                        setLevelDone(true);
                      }}
                    />
                  </PixelSpeechBubble>
                </motion.div>
              ) : (
                <div className="flex items-center justify-center opacity-0">
                  <PixelSpeechBubble tailPosition="left">
                    <TypewriterText text="Hello Py!" onComplete={() => {}} />
                  </PixelSpeechBubble>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
        {isSpeakingRef.current && !levelDone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 0.4 }}
          >
            <Image
              src="/game/mouth.png"
              alt="Speaking Mouth"
              layout="fill"
              objectFit="cover"
              className="object-right"
            />
          </motion.div>
        )}
      </div>

      <ScrollArea className="w-1/3 border-l border-zinc-700">
        <aside className="p-6 flex flex-col space-y-6">
          <Card className="bg-zinc-800/50 border-zinc-700">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-zinc-100">
                Level {level.number}: {level.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ReactMarkdown className="text-zinc-300 prose prose-invert">
                {level.description}
              </ReactMarkdown>
            </CardContent>
          </Card>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="hints" className="border-zinc-700">
              <AccordionTrigger className="text-xl font-bold text-zinc-100">
                <div className="flex items-center">
                  <HelpCircle className="w-5 h-5 mr-2" />
                  Hints
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-none space-y-2">
                  {level.hints.map((hint, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-zinc-300"
                    >
                      <span className="text-blue-400">•</span>
                      {hint}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Card className="bg-zinc-800/50 border-zinc-700">
            <CardContent className="pt-6 relative min-h-[200px]">
              {isEditorLoading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-zinc-800/50">
                  <LoadingSpinner />
                </div>
              ) : null}
              <CodeEditor
                className="rounded-md overflow-hidden"
                height="200px"
                defaultLanguage="python"
                theme="vs-dark"
                value={code}
                onChange={handleEditorChange}
                onMount={() => setIsEditorLoading(false)}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  scrollBeyondLastLine: false,
                }}
              />
            </CardContent>
          </Card>

          <Button
            className="w-full py-6 text-lg font-semibold bg-blue-600 hover:bg-blue-700"
            onClick={runCode}
            disabled={
              !dialogueComplete || isEditorLoading || !levelStarted || levelDone
            }
          >
            Run Code
          </Button>

          <Card className="bg-zinc-800/50 border-zinc-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold text-zinc-100 flex items-center gap-2">
                <Terminal className="w-5 h-5" />
                Console Output
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-zinc-100 font-mono text-sm whitespace-pre-wrap">
                {output}
              </pre>
            </CardContent>
          </Card>
        </aside>
      </ScrollArea>
    </main>
  );
}
