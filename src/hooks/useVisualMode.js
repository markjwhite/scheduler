import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (!replace) {
      setHistory((prev) => [...prev, newMode]);
    }

    setMode(newMode);
  }

  function back() {
    if (history.length > 1) {
      let updatedHist = [...history];
      updatedHist.pop();

      setHistory(updatedHist);
      setMode(updatedHist[updatedHist.length - 1]);
    }
  }

  return { mode, transition, back };
}
