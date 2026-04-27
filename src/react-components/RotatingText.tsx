import { useState, useEffect } from "react";

interface Props {
  items: string[];
  fontSize: string;
}

export default function RotatingText({ items, fontSize }: Props) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [erasing, setErasing] = useState(false);

  useEffect(() => {
    const word = items[index];

    if (!erasing && displayed.length < word.length) {
      const t = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 70);
      return () => clearTimeout(t);
    }
    if (!erasing && displayed.length === word.length) {
      const t = setTimeout(() => setErasing(true), 1600);
      return () => clearTimeout(t);
    }
    if (erasing && displayed.length > 0) {
      const t = setTimeout(() => setDisplayed(d => d.slice(0, -1)), 35);
      return () => clearTimeout(t);
    }
    if (erasing && displayed.length === 0) {
      setErasing(false);
      setIndex(i => (i + 1) % items.length);
    }
  }, [displayed, erasing, index, items]);

  return (
    <span
      style={{
        fontFamily: "'Space Mono', ui-monospace, monospace",
        fontSize: fontSize,
        letterSpacing: "0.04em",
        color: "#e8e4dc",
        fontWeight: 400,
        display: "inline-flex",
        alignItems: "center",
      }}
    >
      <span style={{ color: "rgba(232,228,220,0.4)", marginRight: 2 }}>[</span>
      {displayed}
      <span
        style={{
          display: "inline-block",
          width: "0.6ch",
          marginLeft: 1,
          animation: "ln-blink 0.9s step-end infinite",
        }}
      >
        ▋
      </span>
      <span style={{ color: "rgba(232,228,220,0.4)", marginLeft: 2 }}>]</span>
      <style>{`@keyframes ln-blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </span>
  );
}
