import React, { useState } from "react";
import { createRoot } from "react-dom/client";

import Compiler from "./Compiler.js";

// TODO
// * tab key
// * html download button
// * incremental rendering
// * font / color syntax
// * indentation
// * adjust iframe view to textarea cursor position
// * text stored in between refreshes

const exampleString =
  "# Header\nNormal text\nLine breaks __underlined__ `code doesn't do # header or __underline__`\n`code block if u start on a new line\n  code block respects\n    indentation   and   white   space __# `\n* bullet\n* points";

let compiler = new Compiler();

function MyApp() {
  const [note, setNote] = useState(exampleString);

  return (
    <>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        spellCheck={false}
        id={"notearea"}
      />
      <iframe
        srcDoc={compiler.compile(note)}
        id={"iframeoutput"}
        title={"Rendered HTML output"}
      />
    </>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<MyApp />);
