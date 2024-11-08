import React from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Terminal, CircleHelp } from "lucide-react";
import { LoadingSpinner } from "@/components/loading-spinner";
import { motion, AnimatePresence } from "framer-motion";

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
}) => {
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
        disabled={isDisabled}
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
          <div className="bg-black rounded-md p-4 relative">
            <AnimatePresence>
              {codeOutput.error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2, delay: 0.5 }}
                  className="absolute top-2 right-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 p-2 cursor-pointer"
                >
                  <CircleHelp className="w-4 h-4 text-white" />
                </motion.div>
              )}
            </AnimatePresence>
            <pre className="font-mono text-sm whitespace-pre-wrap">
              {formatOutput(codeOutput.output)}
            </pre>
          </div>
          {failureMessage && (
            <div className="mt-4 text-base">{failureMessage}</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CodeEditorSection;
