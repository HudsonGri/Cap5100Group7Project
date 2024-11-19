import { FC } from "react";
import Image from "next/image";

interface OverlayImageProps {
  overlayNumber: number;
}

const OverlayImage: FC<OverlayImageProps> = ({ overlayNumber }) => {
  const overlayWidths = [
    "17%", // Position 1
    "29%", // Position 2
    "35%", // Position 3
    "50%", // Position 4
    "66%", // Position 5
    "80%", // Position 6
    "100%", // Position 7
  ];

  return (
    <div className="relative">
      <Image
        src="/game/level3/base-cabinet.png"
        alt="Main image"
        width={500}
        height={500}
        className="w-full h-auto"
      />

      {overlayNumber >= 1 && overlayNumber <= 9 && (
        <div
          className={`absolute top-0 ${
            overlayNumber === 9 ? "right-0" : "left-0"
          } h-full`}
          style={{
            width:
              overlayNumber === 8
                ? "100%"
                : overlayNumber === 9
                ? "83%"
                : overlayWidths[overlayNumber - 1],
            overflow: "hidden",
          }}
        >
          <div className="relative w-full h-full">
            <Image
              src={
                overlayNumber === 8
                  ? "/game/level3/art-overlay-b.png"
                  : "/game/level3/art-overlay.png"
              }
              alt="Overlay sprite"
              fill
              className={`object-cover ${
                overlayNumber === 9 ? "object-right" : "object-left"
              }`}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default OverlayImage;
