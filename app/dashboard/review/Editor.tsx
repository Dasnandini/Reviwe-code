"use client";

import MonacoEditor from "@monaco-editor/react";
import React from "react";

export default function Editor({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <MonacoEditor
      height="100%"
      defaultLanguage="javascript"
      value={value}
      onChange={(nextValue) => onChange(nextValue || "")}
      theme="vs-light"
      options={{
        fontSize: 13,
        lineNumbers: "off",
        minimap: { enabled: false },
        overviewRulerBorder: false,
        renderLineHighlight: "none",
        scrollbar: { verticalScrollbarSize: 6, horizontalScrollbarSize: 6 },
        padding: { top: 18, bottom: 18 },
      }}
    />
  );
}
