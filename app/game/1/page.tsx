"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Terminal from "@/components/Terminal";
import CodeEditorSection from "@/components/CodeEditorSection";
import PyDialogue from "@/components/PyDialogue";
import HintsAccordion from "@/components/HintsAccordian";
import { levels, Level } from "@/levels";
import { useRouter } from "next/navigation";

export default function Game() {
  const router = useRouter();
  const level: Level = levels[0];
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [code, setCode] = useState(level.codeTemplate);
  const [output, setOutput] = useState("");
  const [terminalOutput, setTerminalOutput] = useState("");
  const [levelDone, setLevelDone] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const currentStep = level.dialogue.steps[currentStepIndex];

  const runCode = async () => {
    try {
      setIsRunning(true);
      const response = await fetch(
        //"http://localhost:8000/execute_code",
        "https://interpret-api.onrender.com/execute_code",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
          credentials: "include",
        }
      );

      const result = await response.json();
      setOutput(result);
      const resProcessed =
        result.output || result.detail || result.message || "No output";

      if (
        currentStep.expectedOutput &&
        resProcessed.trim() === currentStep.expectedOutput.output
      ) {
        setTerminalOutput(currentStep.expectedOutput.output);
        setTimeout(() => {
          setCurrentStepIndex((prev) =>
            prev + 1 < level.dialogue.steps.length ? prev + 1 : prev
          );
          setLevelDone(currentStepIndex + 1 >= level.dialogue.steps.length - 1);
        }, 2000);
      } else {
        setTerminalOutput(
          "Your output doesn't match what's expected. Check the console output and try again!"
        );
      }
    } catch (error) {
      console.error(error);
      setOutput("An error occurred while running the code.");
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <main className="flex h-screen bg-zinc-900 dark">
      <div className="relative flex-grow">
        <Image
          src="/game/terminal.png"
          alt="Game Background"
          layout="fill"
          objectFit="cover"
          className="object-right blur-md"
        />
        <div
          id="terminal"
          className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md overflow-hidden"
        >
          <Terminal input={terminalOutput} />
        </div>

        <PyDialogue
          text={currentStep.text}
          dialogue={level.dialogue}
          stepIndex={currentStepIndex}
          key={currentStepIndex}
        />
      </div>

      <ScrollArea className="w-2/5 border-l border-zinc-700 bg-zinc-900">
        <aside className="p-6 flex flex-col space-y-6">
          <Card className="bg-zinc-800/50 border-zinc-700">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-zinc-100">
                Level {level.number}: {level.title}
              </CardTitle>
            </CardHeader>
          </Card>

          <CodeEditorSection
            code={code}
            onCodeChange={setCode}
            onRunCode={runCode}
            codeOutput={output}
            isEditorLoading={false}
            isDisabled={levelDone}
            failureMessage={""}
            currentStep={currentStep}
            isRunning={isRunning}
          />
          <HintsAccordion hints={currentStep.hints || level.hints} />
        </aside>
      </ScrollArea>
    </main>
  );
}
