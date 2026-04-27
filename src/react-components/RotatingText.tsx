import { useState, useEffect } from "react";

interface Props {
  items: string[];
}

export default function RotatingText({ items }: Props) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [erasing, setErasing] = useState(false);

  useEffect(() => {
    const word = items[index];

    if (!erasing && displayed.length < word.length) {
      const t = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
      return () => clearTimeout(t);
    }

    if (!erasing && displayed.length === word.length) {
      const t = setTimeout(() => setErasing(true), 1500);
      return () => clearTimeout(t);
    }

    if (erasing && displayed.length > 0) {
      const t = setTimeout(() => setDisplayed(d => d.slice(0, -1)), 50);
      return () => clearTimeout(t);
    }

    if (erasing && displayed.length === 0) {
      setErasing(false);
      setIndex(i => (i + 1) % items.length);
    }
  }, [displayed, erasing, index, items]);

  return (
    <span style={{ color: "var(--color)", fontWeight: 700, fontFamily: "monospace" }}>
      {displayed}
      <span style={{ animation: "blink 0.7s step-end infinite", marginLeft: 1 }}>|</span>
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </span>
  );
}
