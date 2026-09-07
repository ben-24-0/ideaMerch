import { useEffect, useState } from "react";
import "./PixelLoader.css";

import duckSprite from "../../assets/sprite/sprite.png";

const MESSAGES = [
  "WAKING UP THE DATABASE...",
  "COUNTING KEYCHAINS...",
  "UNTANGLING LANYARDS...",
  "FINDING THE GOOD STUFF...",
  "ALMOST THERE...",
];

export default function PixelLoader({ message }) {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    if (message) return;

    const interval = setInterval(() => {
      setMsgIndex((current) => (current + 1) % MESSAGES.length);
    }, 1600);

    return () => clearInterval(interval);
  }, [message]);

  return (
    <div className="pixel-loader-page">
      <div className="pixel-loader">

        <div className="pixel-loader__stage">
                      <div
            className="pixel-loader__duck"
            style={{
              backgroundImage: `url(${duckSprite})`,
            }}
          />
                    <div className="pixel-loader__ground" />
        </div>

        <p className="pixel-loader__text">
          {message ?? MESSAGES[msgIndex]}
        </p>

      </div>
    </div>
  );
}