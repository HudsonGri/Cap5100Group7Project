import React, { useEffect, useRef } from "react";
import TypewriterText from "@/components/TypewriterText";
import { MessageSquareTextIcon } from "lucide-react";
import Markdown from "react-markdown";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DialogueStep {
  text: string;
}

interface Dialogue {
  steps: DialogueStep[];
}

interface PyDialogueProps {
  text: string;
  dialogue?: Dialogue;
  stepIndex: number;
  onDialogueDone?: () => void;
}

const PyDialogue: React.FC<PyDialogueProps> = ({
  text,
  dialogue,
  stepIndex,
  onDialogueDone,
}) => {
  const dialogueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dialogueRef.current) {
      dialogueRef.current.scrollTop = dialogueRef.current.scrollHeight;
    }
  }, [text]);

  return (
    <div
      className="absolute bottom-0 left-0 right-0 h-60 bg-zinc-900 flex items-center px-4 overflow-y-auto"
      ref={dialogueRef}
    >
      <div className="relative w-16 h-16 flex-shrink-0">
        <div className="rounded-full border-2 border-zinc-500 overflow-hidden">
          <Image
            src="/game/py-avatar.png"
            alt="Avatar"
            width={64}
            height={64}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="text-white text-xl p-4 h-1/2">
        <TypewriterText text={text} onComplete={onDialogueDone} />
      </div>
      {stepIndex > 0 && (
        <div className="absolute bottom-2 right-2">
          <Popover>
            <PopoverTrigger asChild>
              <div className="rounded-lg bg-zinc-800 hover:bg-zinc-700 p-2 cursor-pointer">
                <MessageSquareTextIcon className="w-4 h-4 text-white" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-80 max-h-96 overflow-y-auto bg-zinc-900 shadow-zl">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="text-xl leading-none">Chat History</h4>
                  <div className="space-y-2">
                    {dialogue?.steps
                      .slice(0, stepIndex + 1)
                      .map((step, index) => (
                        <div className="py-1" key={index}>
                          <div className="rounded overflow-hidden">
                            <p className="text-sm border-l-2 border-zinc-700 pl-2 bg-black/20">
                              <Markdown>{step.text}</Markdown>
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )}
    </div>
  );
};

export default PyDialogue;
