import React, { useEffect, useRef, useState } from "react";

interface PixelSpeechBubbleProps {
  pixelSize?: number;
  padding?: number;
  textColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  tailPosition?: "left" | "middle" | "right";
  maxWidth?: number;
  width?: number;
  height?: number;
  children: React.ReactNode;
}

const PixelSpeechBubble: React.FC<PixelSpeechBubbleProps> = ({
  pixelSize = 4,
  padding = 4,
  textColor = "black",
  backgroundColor = "white",
  borderColor = "black",
  tailPosition = "middle",
  maxWidth = 500,
  width,
  height,
  children,
}) => {
  const [dimensions, setDimensions] = useState({
    width: width || 500,
    height: height || 100,
  });
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current && !width && !height) {
      const { offsetWidth, offsetHeight } = textRef.current;
      const pixelPadding = padding * pixelSize;
      setDimensions({
        width:
          Math.ceil((offsetWidth + pixelPadding * 2) / pixelSize) * pixelSize,
        height:
          Math.ceil((offsetHeight + pixelPadding * 2) / pixelSize) * pixelSize,
      });
    }
  }, [children, padding, pixelSize, maxWidth, width, height]);

  const tailHeight = pixelSize * 3;
  const totalHeight = dimensions.height + tailHeight;

  const createCornerPixels = (
    x: number,
    y: number,
    type: "topLeft" | "topRight" | "bottomLeft" | "bottomRight"
  ) => {
    const pixels: JSX.Element[] = [];

    const cornerPatterns = {
      topLeft: [
        [0, 0, 1],
        [0, 1, 1],
        [1, 1, 0],
      ],
      topRight: [
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 1],
      ],
      bottomLeft: [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 1],
      ],
      bottomRight: [
        [0, 1, 1],
        [1, 1, 0],
        [1, 0, 0],
      ],
    };

    const pattern = cornerPatterns[type];
    pattern.forEach((row, i) => {
      row.forEach((pixel, j) => {
        if (pixel) {
          pixels.push(
            <rect
              key={`${type}-${i}-${j}`}
              x={x + j * pixelSize}
              y={y + i * pixelSize}
              width={pixelSize}
              height={pixelSize}
              fill={borderColor}
            />
          );
        }
      });
    });
    return pixels;
  };

  const getTailPath = () => {
    const tailBase = dimensions.width / 2;
    const tailOffset =
      tailPosition === "left"
        ? -tailBase / 2
        : tailPosition === "right"
        ? tailBase / 2
        : 0;
    return `M ${tailBase - pixelSize * 2 + tailOffset} ${dimensions.height}
            L ${tailBase + tailOffset} ${dimensions.height + tailHeight}
            L ${tailBase + pixelSize * 2 + tailOffset} ${dimensions.height}
            Z`;
  };

  const getTailBorderPath = () => {
    const tailBase = dimensions.width / 2;
    const tailOffset =
      tailPosition === "left"
        ? -tailBase / 2
        : tailPosition === "right"
        ? tailBase / 2
        : 0;
    return `M ${tailBase - pixelSize * 2 + tailOffset} ${dimensions.height}
            L ${tailBase + tailOffset} ${dimensions.height + tailHeight}
            L ${tailBase + pixelSize * 2 + tailOffset} ${dimensions.height}`;
  };

  return (
    <div
      className="relative inline-block"
      style={{ width: dimensions.width + 2 + "px" }}
    >
      <svg
        width={dimensions.width + 2}
        height={totalHeight + 2}
        className="pixel-speech-bubble"
        viewBox={`0 0 ${dimensions.width + 2} ${totalHeight + 2}`}
        preserveAspectRatio="xMinYMin meet"
      >
        <g transform="translate(1, 1)">
          <rect
            x={pixelSize * 2}
            y={0}
            width={dimensions.width - pixelSize * 4}
            height={dimensions.height}
            fill={backgroundColor}
          />

          <rect
            x={0}
            y={pixelSize * 2}
            width={dimensions.width}
            height={dimensions.height - pixelSize * 4}
            fill={backgroundColor}
          />

          {Array.from({
            length: Math.floor((dimensions.width - pixelSize * 4) / pixelSize),
          }).map((_, i) => (
            <rect
              key={`top-${i}`}
              x={pixelSize * (i + 2)}
              y={0}
              width={pixelSize}
              height={pixelSize}
              fill={borderColor}
            />
          ))}

          {Array.from({
            length: Math.floor((dimensions.width - pixelSize * 4) / pixelSize),
          }).map((_, i) => (
            <rect
              key={`bottom-${i}`}
              x={pixelSize * (i + 2)}
              y={dimensions.height - pixelSize}
              width={pixelSize}
              height={pixelSize}
              fill={borderColor}
            />
          ))}

          {Array.from({
            length: Math.floor((dimensions.height - pixelSize * 4) / pixelSize),
          }).map((_, i) => (
            <rect
              key={`left-${i}`}
              x={0}
              y={pixelSize * (i + 2)}
              width={pixelSize}
              height={pixelSize}
              fill={borderColor}
            />
          ))}

          {Array.from({
            length: Math.floor((dimensions.height - pixelSize * 4) / pixelSize),
          }).map((_, i) => (
            <rect
              key={`right-${i}`}
              x={dimensions.width - pixelSize}
              y={pixelSize * (i + 2)}
              width={pixelSize}
              height={pixelSize}
              fill={borderColor}
            />
          ))}

          {createCornerPixels(0, 0, "topLeft")}
          {createCornerPixels(dimensions.width - pixelSize * 3, 0, "topRight")}
          {createCornerPixels(
            0,
            dimensions.height - pixelSize * 3,
            "bottomLeft"
          )}
          {createCornerPixels(
            dimensions.width - pixelSize * 3,
            dimensions.height - pixelSize * 3,
            "bottomRight"
          )}

          <path d={getTailPath()} fill={backgroundColor} />

          <path
            d={getTailBorderPath()}
            stroke={borderColor}
            strokeWidth={pixelSize}
            fill="none"
            strokeLinecap="square"
          />

          <foreignObject
            x={padding * pixelSize}
            y={padding * pixelSize}
            width={dimensions.width - padding * pixelSize * 2}
            height={dimensions.height - padding * pixelSize * 2}
          >
            <div
              ref={textRef}
              className="flex items-center justify-center h-full break-words"
              style={{
                color: textColor,
                zIndex: 1,
                maxWidth: maxWidth + "px",
                wordWrap: "break-word",
              }}
            >
              {children}
            </div>
          </foreignObject>
        </g>
      </svg>
    </div>
  );
};

export default PixelSpeechBubble;
