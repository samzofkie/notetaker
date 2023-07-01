import React, { useState } from "react";
import { createRoot } from "react-dom/client";

import Compiler from "./Compiler.js";

// TODO
// * html download button
// * incremental rendering
// * font / color syntax
// * indentation
// * adjust iframe view to textarea cursor position
// * text stored in between refreshes

const exampleString =
  "# Header\nNormal text\nLine breaks __underlined__ `code doesn't do # header or __underline__`\n`code block if u start on a new line\n  code block respects\n    indentation   and   white   space __# `\n* bullet\n* points";

function handleTextareaTab(e) {
  if (e.key == "Tab") {
    e.preventDefault();
    var start = e.target.selectionStart;
    var end = e.target.selectionEnd;

    // set textarea value to: text before caret + tab + text after caret
    e.target.value =
      e.target.value.substring(0, start) + "  " + e.target.value.substring(end);

    // put caret at right position again
    e.target.selectionStart = e.target.selectionEnd = start + 2;
  }
}

function MyApp() {
  const [note, setNote] = useState(exampleString);

  let compiler = new Compiler();

  return (
    <>
      <textarea
        value={note}
        onKeyDown={handleTextareaTab}
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
