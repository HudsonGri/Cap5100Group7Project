import React from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Terminal } from "lucide-react";
import { LoadingSpinner } from "@/components/loading-spinner";

const CodeEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

const CodeEditorSection = ({
  code,
  onCodeChange,
  onRunCode,
  output,
  isEditorLoading,
  isDisabled,
  isRunning,
}) => {
  // Function to format the output with proper coloring
  const formatOutput = (outputText) => {
    return outputText.split("\n").map((line, index) => (
      <span key={index} className="block">
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
        {isRunning ? <LoadingSpinner className="mr-2" /> : null}
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
          <div className="bg-black rounded-md p-4 max-h-[300px] overflow-y-auto">
            <pre className="font-mono text-sm whitespace-pre-wrap">
              {formatOutput(output)}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CodeEditorSection;
