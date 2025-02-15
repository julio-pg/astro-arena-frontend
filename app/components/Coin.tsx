/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from "react";

const Coin = () => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState<"Heads" | "Tails">("Heads");
  const [showResult, setShowResult] = useState(false);

  const handleFlip = () => {
    if (isFlipping) return;

    setIsFlipping(true);
    setShowResult(false);

    setTimeout(() => {
      const outcome = Math.random() < 0.5 ? "Heads" : "Tails";
      setResult(outcome);
      setShowResult(true);
      setIsFlipping(false);
    }, 800); // Animation duration
  };

  return (
    <div
      className={`w-24 h-24 rounded-full cursor-pointer transition-transform duration-800 absolute right-10 top-1/2 -translate-y-1/2  ${
        isFlipping ? "animate-flip" : ""
      }`}
      onClick={handleFlip}
    >
      {result === "Heads" && showResult ? (
        <img src="/assets/coin-face-mini.png" alt="face-coin" />
      ) : (
        <img src="/assets/back-coin-mini.png" alt="back-coin" />
      )}
    </div>
  );
};

export default Coin;
