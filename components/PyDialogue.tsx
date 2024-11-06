import React, { useEffect, useRef } from "react";
import TypewriterText from "@/components/TypewriterText";
import Image from "next/image";

interface PyDialogueProps {
  text: string;
}

const PyDialogue: React.FC<PyDialogueProps> = ({ text }) => {
  const dialogueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dialogueRef.current) {
      dialogueRef.current.scrollTop = dialogueRef.current.scrollHeight;
    }
  }, [text]);

  return (
    <div
      className="absolute bottom-0 left-0 right-0 h-40 bg-zinc-900 flex items-center px-4 overflow-y-auto"
      ref={dialogueRef}
    >
      <div className="w-16 h-16 rounded-full border-2 border-zinc-500 overflow-hidden flex-shrink-0">
        <Image
          src="/game/py-avatar.png"
          alt="Avatar"
          width={64}
          height={64}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="text-white text-lg p-4 h-3/4">
        <TypewriterText text={text} />
      </div>
    </div>
  );
};

export default PyDialogue;
