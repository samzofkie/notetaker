import Compile from "./Compiler.js";

const test_groups = {
  basic_text: [
    { name: "compile empty string", input: "", output: "" },
    { name: "compile word", input: "word", output: "word" },
    { name: "compile words", input: "words", output: "words" }
  ],

  header: [
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
    }
  ],

  line_break: [
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
    }
  ],

  underline: [
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
  ],

  code: [
    { name: "code word", input: "`word`", output: "<code>word</code>" },
    {
      name: "code amongst words",
      input: "these `code` words",
      output: "these <code>code</code> words"
    },
    {
      name: "code header",
      input: "# This is a `code` header\n",
      output: "<h1>This is a <code>code</code> header</h1>\n"
    },
    {
      name: "code goes into header",
      input: "code `goes # into` header\n",
      output: "code <code>goes # into</code> header<br>\n"
    },
    {
      name: "code goes out of header",
      input: "# Header `code\nheaders over but still` code",
      output: "<h1>Header <code>code</h1>\nheaders over but still</code> code"
    },
    {
      name: "code goes into underline",
      input: "code `goes __into` underline__",
      output: "code <code>goes __into</code> underline<u>"
    },
    {
      name: "code goes out of underline",
      input: "__code goes `out of__ underline` okay",
      output: "<u>code goes </u><code>out of__ underline</code> okay"
    },
    {
      name: "code block",
      input: "word\n`code block`",
      output: "word\n<pre>code block</pre>"
    },
    {
      name: "code block indentation",
      input: "\n`this  is  in  \n    a code block`",
      output: "\n<pre>this  is  in  \n    a code block</pre>"
    },
    {
      name: "code block no br",
      input: "\n`but a simple\n  block`\ntext",
      output: "\n<pre>but a simple\n  block</pre>\ntext"
    },
    {
      name: "header in code block",
      input: "\n`here we are in a # code\n  block</pre>",
      output: "\n<pre>here we are in a # code\n  block</pre>"
    },
    {
      name: "unfinished code",
      input: "`oops",
      output: "<code>oops"
    },
    {
      name: "unfinished code block",
      input: "\n`oops",
      output: "\n<pre>oops"
    }
  ]
};

for (let group in test_groups)
  describe(group, () => {
    for (let test_case of test_groups[group])
      test(test_case.name, () => {
        expect(Compile(test_case.input)).toBe(test_case.output);
      });
  });
