import React, { useState } from "react";
import { createRoot } from "react-dom/client";

import Compiler from "./Compiler.js";

// TODO
// * incremental rendering
// * font / color syntax
// * adjust iframe view to textarea cursor position
// * text stored in between refreshes

const exampleString =
  "# Header\nNormal text\nLine breaks __underlined__ `code doesn't do # header or __underline__`\n`code block if u start on a new line\n  code block respects\n    indentation   and   white   space __# `\n* bullet\n* points";

function handleTextareaTab(e) {
  if (e.key == "Tab") {
    e.preventDefault();
    var start = e.target.selectionStart;
    var end = e.target.selectionEnd;

    e.target.value =
      e.target.value.substring(0, start) + "  " + e.target.value.substring(end);

    e.target.selectionStart = e.target.selectionEnd = start + 2;
  }
}

function downloadHtmlFile() {
  let element = document.createElement('a');
  let htmlText = document.getElementById("iframeoutput").srcdoc;
  console.log(htmlText);
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(htmlText));
  element.setAttribute('download', "test.html");

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}


function scrollIFrame() {
  let iFrame = document.getElementById("iframeoutput");
  let iFrameScrollingElement = iFrame.contentWindow.document.scrollingElement;
  
  let inputArea = document.getElementById("notearea");
  let totalNoteTextLength = inputArea.value.length;
  let ratio = inputArea.selectionStart / inputArea.value.length;
  
  iFrameScrollingElement.scrollTop = iFrameScrollingElement.scrollTopMax * ratio;
}


window.onload = (e) => {
  document.getElementById("notearea").addEventListener("click", scrollIFrame);
  document.getElementById("iframeoutput").addEventListener("load", scrollIFrame);
};



function MyApp() {
  const [note, setNote] = useState(exampleString);

  let compiler = new Compiler();

  return (
    <>
      <textarea
        value={note}
        onKeyDown={handleTextareaTab}
        onChange={(e) => {setNote(e.target.value); scrollIFrame();}}
        spellCheck={false}
        id={"notearea"}
      />
      <iframe
        srcDoc={compiler.compile(note)}
        id={"iframeoutput"}
        title={"Rendered HTML output"}
      />
      <button id={"download-button"} onClick={downloadHtmlFile}>Download HTML</button>
    </>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<MyApp />);
