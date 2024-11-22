import { FC, useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Scroll } from "lucide-react";

interface ChambersProps {
  logs: string[];
  temp_array: [string, string];
  flicker?: boolean;
}

const Chambers: FC<ChambersProps> = ({ logs, temp_array, flicker = false }) => {
  const imageRef = useRef<HTMLDivElement>(null);
  const [logPosition, setLogPosition] = useState({ left: 0, top: 0 });
  const [showFlicker, setShowFlicker] = useState(false);
  const [showLogPosition, setShowLogPosition] = useState(false);

  useEffect(() => {
    const updateLogPosition = () => {
      if (imageRef.current) {
        const imageRect = imageRef.current.getBoundingClientRect();
        const imageWidth = imageRect.width;

        setLogPosition({
          left: imageWidth * 0.64,
          top: imageWidth * 0.22,
        });
        setShowLogPosition(true);
      }
    };

    updateLogPosition();
    window.addEventListener("resize", updateLogPosition);
    return () => window.removeEventListener("resize", updateLogPosition);
  }, []);

  useEffect(() => {
    if (flicker) {
      const interval = setInterval(() => {
        setShowFlicker(Math.random() > 0.7);
      }, 300);
      return () => clearInterval(interval);
    } else {
      setShowFlicker(false);
    }
  }, [flicker]);

  return (
    <div className="flex relative w-full max-w-[800px] mx-auto">
      <div className="w-2/3 relative min-w-[300px]">
        {showLogPosition && (
          <div
            className="absolute bg-black p-2 z-0 flex items-center justify-center text-xl"
            style={{
              left: `${logPosition.left}px`,
              top: `${logPosition.top}px`,
              width: "21%",
              height: "50%",
              position: "absolute",
            }}
          >
            <span className="p-1">
              {temp_array[0]}
              <br />
              {temp_array[1]}
            </span>
          </div>
        )}
        <div ref={imageRef} className="relative">
          <div className="relative">
            <Image
              src={
                showFlicker
                  ? "/game/level4/gas2-flicker.png"
                  : "/game/level4/gas2.png"
              }
              alt="Main image"
              width={500}
              height={500}
              className="w-full h-auto relative z-10"
            />
          </div>
        </div>
      </div>

      <div className="w-1/2 ml-10 flex flex-col bg-black/80 rounded-lg min-w-[250px] font-mono">
        <div className="flex items-center justify-center border-b border-green-500/30 py-2">
          <Scroll className="h-5 w-5 text-green-500 mr-2" />
          <span className="text-green-500 text-lg">Session Logs</span>
        </div>
        <div className="text-lg max-w-full px-4 py-2 text-green-500 opacity-80">
          {logs.map((log, index) => (
            <div key={index}>{`> ${log}`}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chambers;
