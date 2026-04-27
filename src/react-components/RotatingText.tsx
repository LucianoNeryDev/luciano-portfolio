import { useState, useEffect } from "react";

interface Props {
  items: string[];
}

export default function RotatingText({ items }: Props) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex(i => (i + 1) % items.length);
        setVisible(true);
      }, 300);
    }, 2000);

    return () => clearInterval(interval);
  }, [items]);

  return (
    <span style={{
      opacity: visible ? 1 : 0,
      transition: "opacity 0.3s ease",
      color: "var(--accent)",
      fontWeight: 700,
    }}>
      {items[index]}
    </span>
  );
}