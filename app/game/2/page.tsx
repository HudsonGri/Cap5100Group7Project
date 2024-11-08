"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import CodeEditorSection from "@/components/CodeEditorSection";
import PyDialogue from "@/components/PyDialogue";
import HintsAccordion from "@/components/HintsAccordian";
import IdCard from "@/components/IdCard";
import { levels, Level } from "@/levels";
import { useRouter } from "next/navigation";

export default function Game() {
  const router = useRouter();
  const level: Level = levels[1];
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [code, setCode] = useState(level.codeTemplate);
  const [output, setOutput] = useState("");
  const [failureMessage, setFailureMessage] = useState("");
  const [levelDone, setLevelDone] = useState(false);
  const [variables, setVariables] = useState({});
  const [isRunning, setIsRunning] = useState(false);
  const [isDialogueDone, setIsDialogueDone] = useState(false);

  const currentStep = level.dialogue.steps[currentStepIndex];
  React.useEffect(() => {
    if (isDialogueDone) {
      if (!currentStep.expectedOutput) {
        setTimeout(() => {
          setCurrentStepIndex((prev) =>
            prev + 1 < level.dialogue.steps.length ? prev + 1 : prev
          );
          setLevelDone(currentStepIndex + 1 >= level.dialogue.steps.length);
          setIsDialogueDone(false);
        }, 2000);
      }
    }
  }, [
    isDialogueDone,
    currentStep,
    currentStepIndex,
    level.dialogue.steps.length,
  ]);

  React.useEffect(() => {
    if (levelDone) {
      setTimeout(() => {
        router.push("/overworld");
      }, 5000);
    }
  }, [levelDone, router]);

  const updateVariables = (newVars) => {
    setVariables((prev) => ({
      ...prev,
      ...newVars,
    }));
  };

  const runCode = async () => {
    setIsRunning(true);
    setFailureMessage(""); // Clear failure message when running new code
    try {
      const response = await fetch(
        "https://interpret-api.onrender.com/execute_code",
        //"http://localhost:8000/execute_code",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        }
      );

      const result = await response.json();

      // Include full result output
      setOutput(result);

      if (
        result.variables &&
        currentStep.expectedOutput &&
        currentStep.expectedOutput.variables &&
        Object.keys(currentStep.expectedOutput.variables).every((key) => {
          return (
            result.variables[key] !== undefined &&
            typeof result.variables[key] ===
              currentStep.expectedOutput.variables[key]
          );
        })
      ) {
        if (result.variables) {
          updateVariables(result.variables);
        }
        setTimeout(() => {
          setCurrentStepIndex((prev) =>
            prev + 1 < level.dialogue.steps.length ? prev + 1 : prev
          );
          setLevelDone(currentStepIndex + 1 >= level.dialogue.steps.length);
        }, 2000);
      } else {
        console.log("else");
        setFailureMessage(
          "Oops, your output doesn't match the expected output. Check hints or click the help icon for guidance."
        );
      }
    } catch (error) {
      console.error(error);
      setOutput("An error occurred while running the code.");
    }
    setIsRunning(false);
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
        {Object.keys(variables).length > 0 && (
          <div
            id="id-card"
            className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md overflow-hidden"
          >
            <IdCard
              name={variables.name}
              age={variables.age}
              height={variables.height}
              weight={variables.weight}
              weight_pounds={variables.weight_pounds}
              isLabMember={variables.is_lab_member}
              body_temperature={variables.body_temperature}
              body_temperature_fahrenheit={
                variables.body_temperature_fahrenheit
              }
            />
          </div>
        )}

        <PyDialogue
          text={currentStep.text}
          dialogue={level.dialogue}
          stepIndex={currentStepIndex}
          key={currentStepIndex}
          onDialogueDone={() => setIsDialogueDone(true)}
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
            failureMessage={failureMessage}
            isRunning={isRunning}
            currentStep={currentStep}
          />
          <HintsAccordion hints={currentStep.hints || level.hints} />
        </aside>
      </ScrollArea>
    </main>
  );
}
