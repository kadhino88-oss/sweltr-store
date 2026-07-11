"use client";

import { useEffect, useState } from "react";

function fmt(s: number) {
  const h = String(Math.floor(s / 3600)).padStart(2, "0");
  const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
  const sec = String(s % 60).padStart(2, "0");
  return `${h}:${m}:${sec}`;
}

export default function CountdownTimer({ initialSeconds }: { initialSeconds: number }) {
  const [t, setT] = useState(initialSeconds);

  useEffect(() => {
    const id = setInterval(() => setT((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);

  return <span>Fenêtre d'expédition du jour : encore {fmt(t)}</span>;
}
