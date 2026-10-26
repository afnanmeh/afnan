"use client";

import { useEffect, useId, useRef, useState } from "react";
import { themes } from "./Themes";

export function ThemePicker({ themeIndex, onSelect }: {
  themeIndex: number;
  onSelect: (index: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);

  return (
    <div className="theme-picker" ref={root} onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
    }}>
      <button
        ref={trigger}
        className="theme-picker-trigger"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={`Change theme. Current theme: ${themes[themeIndex].name}`}
        onClick={() => setOpen((current) => !current)}
      >
        <span className="theme-picker-dots" aria-hidden="true">
          {["#c99cbd", "#a3c29a", "#a996ca"].map((color) => <i key={color} style={{ background: color }} />)}
        </span>
        <span><span className="theme-picker-verb">Change </span>theme</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="m3 4.5 3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="theme-picker-panel" id={panelId} role="group" aria-label="Choose a color theme">
          <p>Make yourself at home.</p>
          <span className="theme-picker-hint">Pick a color. Feel the change.</span>
          <div className="theme-picker-options">
            {themes.map((theme, index) => (
              <button key={theme.id} aria-pressed={index === themeIndex} onClick={() => {
                onSelect(index);
                setOpen(false);
                trigger.current?.focus();
              }}>
                <span className="theme-picker-swatch" style={{ background: `linear-gradient(135deg, ${theme.top}, ${theme.id === "black" ? theme.bottom : theme.ribbon})`, color: theme.ink }} aria-hidden="true">
                  {index === themeIndex && <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="m4 8 2.5 2.5L12 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                </span>
                {theme.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
