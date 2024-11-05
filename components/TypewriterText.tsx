import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

interface TypewriterTextProps {
  text: string;
  onComplete?: () => void;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  onComplete,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const isSpeakingRef = useRef(false);
  const isTesting = process.env.NEXT_PUBLIC_TESTING === "true";

  useEffect(() => {
    if (text && currentIndex < text.length) {
      isSpeakingRef.current = true;
      const timer = setTimeout(
        () => {
          setDisplayedText((prev) => prev + text[currentIndex]);
          setCurrentIndex((prev) => prev + 1);
        },
        text[currentIndex - 1]?.match(/[.!?]/)
          ? isTesting
            ? 100
            : 400
          : isTesting
          ? 5
          : 25
      );
      return () => clearTimeout(timer);
    } else {
      isSpeakingRef.current = false;
      if (onComplete) {
        onComplete();
      }
    }
  }, [currentIndex, text, onComplete, isTesting]);

  return <ReactMarkdown>{displayedText}</ReactMarkdown>;
};

export default TypewriterText;
