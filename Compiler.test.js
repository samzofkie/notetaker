import Compile from "./Compiler.js";

const translations = [
  { name: "compile empty string", input: "", output: "" },
  { name: "compile word", input: "word", output: "word" },
  { name: "compile words", input: "words", output: "words" },

  // Header
  {
    name: "header only",
    input: "# This should be a header\n",
    output: "<h1>This should be a header</h1>\n"
  },
  {
    name: "unterminated header",
    input: "# This should be a header",
    output: "<h1>This should be a header</h1>"
  },
  {
    name: "header with subtext",
    input: "# This should be a header\nBut not this",
    output: "<h1>This should be a header</h1>\nBut not this"
  },
  {
    name: "header with text before",
    input: "This is a normal line\n# This should be a header\n",
    output: "This is a normal line<br>\n<h1>This should be a header</h1>\n"
  },
  {
    name: "double header",
    input: "# This should be a header\n# As should this",
    output: "<h1>This should be a header</h1>\n<h1>As should this</h1>"
  },

  // Line break
  {
    name: "normal text line break",
    input: "this is\nnormal",
    output: "this is<br>\nnormal"
  },
  {
    name: "double line break",
    input: "there should be\n\ntwo lines between this",
    output: "there should be<br>\n<br>\ntwo lines between this"
  },
  {
    name: "header line break",
    input: "# header\n\ntext",
    output: "<h1>header</h1>\n<br>\ntext"
  },

  // Underline
  { name: "underlined word", input: "__word__", output: "<u>word</u>" },
  {
    name: "underlined amongst normal",
    input: "one __underlined__ word",
    output: "one <u>underlined</u> word"
  },
  {
    name: "multi line underline",
    input: "first __line\nsecond__ line",
    output: "first <u>line<br>\nsecond</u> line"
  },
  {
    name: "underlined header",
    input: "# __UNDERLINED HEADER!\nDOESN'T END TILL HERE__!",
    output: "<h1><u>UNDERLINED HEADER!</h1>\nDOESN'T END TILL HERE</u>!"
  }
];

for (let t of translations) {
  test(t.name, () => {
    expect(Compile(t.input)).toBe(t.output);
  });
}
