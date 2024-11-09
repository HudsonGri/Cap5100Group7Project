"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const Terminal = ({ input }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showLoadingBar, setShowLoadingBar] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    if (input) {
      setShowLoadingBar(true);
      setDisplayText("");
      setCurrentIndex(0);
      setLoadingProgress(0);

      const loadingInterval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(loadingInterval);
            setShowLoadingBar(false);
            return 100;
          }
          return prev + 5;
        });
      }, 50);

      return () => clearInterval(loadingInterval);
    }
  }, [input]);

  useEffect(() => {
    if (!showLoadingBar && input && currentIndex < input.length) {
      const typingTimer = setTimeout(() => {
        setDisplayText((prev) => prev + input[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 50);

      return () => clearTimeout(typingTimer);
    }
  }, [currentIndex, input, showLoadingBar]);

  return (
    <div className="relative w-[500px] h-[500px]">
      <div className="absolute w-[400px] h-[360px] bg-black/90 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-48">
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-3/4">
          {showLoadingBar && (
            <div className="w-full h-2 bg-gray-700 rounded">
              <div
                className="h-full bg-green-500 rounded transition-all duration-200"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
          )}

          <div className="font-mono text-green-500 mt-4 whitespace-pre-wrap">
            {displayText}
          </div>
        </div>
      </div>
      <Image
        src="/game/level1/terminal.png"
        alt="Overlay with hole"
        className="absolute top-0 left-0 object-cover pixelated"
        style={{ imageRendering: "pixelated" }}
        width={500}
        height={400}
      />
    </div>
  );
};

export default Terminal;
