import React, { useState } from "react";
import { createRoot } from "react-dom/client";

import Compile from "./Compiler.js";

function MyApp() {
  const [note, setNote] = useState("");

  return (
    <>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        spellCheck={false}
        id={"notearea"}
      />
      <iframe
        srcDoc={Compile(note)}
        id={"iframeoutput"}
        title={"Rendered HTML output"}
      />
    </>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<MyApp />);
