import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Terminal, CircleHelp, BrainCircuit } from "lucide-react";
import { LoadingSpinner } from "@/components/loading-spinner";
import { motion, AnimatePresence } from "framer-motion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import ReactMarkdown from "react-markdown";

const CodeEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

const CodeEditorSection = ({
  code,
  onCodeChange,
  onRunCode,
  codeOutput,
  isEditorLoading,
  isDisabled,
  failureMessage,
  currentStep,
  isRunning,
}) => {
  const [helpResponse, setHelpResponse] = useState("");
  const [isLoadingHelp, setIsLoadingHelp] = useState(false);

  // Function to format the output with proper coloring
  const formatOutput = (outputText) => {
    if (!outputText) return null;
    return outputText.split("\n").map((line, index) => (
      <span
        key={index}
        className={`block ${codeOutput.error ? "text-red-500" : ""}`}
      >
        {line}
      </span>
    ));
  };

  const handleHelpClick = async () => {
    try {
      setIsLoadingHelp(true);
      const response = await fetch(
        //"http://localhost:8000/llm",
        "https://interpret-api.onrender.com/llm",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            expected_code: currentStep?.expectedOutput?.expectedCode,
            user_code: code,
            error: codeOutput.output,
          }),
        }
      );
      const data = await response.json();
      setHelpResponse(data.response);
    } catch (error) {
      console.error("Error calling LLM API:", error);
      setHelpResponse("Sorry, there was an error getting help.");
    } finally {
      setIsLoadingHelp(false);
    }
  };

  // Handle code import from current step
  React.useEffect(() => {
    if (currentStep?.codeImport) {
      onCodeChange((prevCode) => {
        return prevCode
          ? `${prevCode}\n${currentStep.codeImport}`
          : currentStep.codeImport;
      });
    }
  }, [currentStep, onCodeChange]);

  return (
    <div className="flex flex-col space-y-6">
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
            onChange={onCodeChange}
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
        onClick={onRunCode}
        disabled={
          !currentStep.expectedOutput ||
          currentStep.expectedOutput?.expectedCode === code ||
          isDisabled ||
          isRunning
        }
      >
        {isRunning ? (
          <span className="flex items-center gap-2">
            <LoadingSpinner /> Run Code
          </span>
        ) : (
          "Run Code"
        )}
      </Button>

      <Card className="bg-zinc-800/50 border-zinc-700">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold text-zinc-100 flex items-center gap-2">
            <Terminal className="w-5 h-5" />
            Console Output
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-black rounded-md p-4 relative">
            <AnimatePresence>
              {codeOutput.error && (
                <Popover>
                  <PopoverTrigger asChild>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2, delay: 0.5 }}
                      className="absolute top-2 right-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 p-2 cursor-pointer"
                      onClick={handleHelpClick}
                    >
                      <CircleHelp className="w-4 h-4 text-white" />
                    </motion.div>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-96 p-4 bg-zinc-900 border border-zinc-700 shadow-xl rounded-xl"
                    align="end"
                    side="top"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 pb-2 border-b border-zinc-700">
                        <BrainCircuit className="w-4 h-4 text-blue-400" />
                        <h4 className="font-semibold text-zinc-100">
                          Additional Help
                        </h4>
                      </div>
                      {isLoadingHelp ? (
                        <div className="space-y-3">
                          <Skeleton className="h-4 w-[90%] bg-zinc-800" />
                          <Skeleton className="h-4 w-[75%] bg-zinc-800" />
                          <Skeleton className="h-4 w-[85%] bg-zinc-800" />
                          <Skeleton className="h-4 w-[80%] bg-zinc-800" />
                        </div>
                      ) : (
                        <div className="text-sm leading-relaxed text-zinc-300 prose prose-invert max-w-none">
                          <ReactMarkdown>{helpResponse}</ReactMarkdown>
                        </div>
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </AnimatePresence>
            <pre className="font-mono text-sm whitespace-pre-wrap max-h-[200px] overflow-y-auto">
              {formatOutput(codeOutput.output)}
            </pre>
          </div>
          {failureMessage && (
            <div className="mt-4 text-base text-orange-400">
              {failureMessage}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CodeEditorSection;
