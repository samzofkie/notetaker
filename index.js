import React, { useState } from "react";
import { createRoot } from "react-dom/client";

import Compile from "./Compiler.js";

function MyApp() {
  const [note, setNote] = useState("");

  function Render() {
    console.log(Compile(note));
  }

  return (
    <>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        id={"notearea"}
      />
      <button onClick={Render} id={"renderbutton"}>
        {"<Ctrl + Enter> to render"}
      </button>
      <iframe id={"iframeoutput"} title={"Rendered HTML output"} />
    </>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<MyApp />);
