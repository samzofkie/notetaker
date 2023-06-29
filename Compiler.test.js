import Compiler from "./Compiler.js";

function htmlWrap(s) {
  return "<!DOCTYPE html>\n<html>\n<body>\n" + s + "</body>\n</html>";
}

const test_groups = {
  html_structure: [
    {
      name: "empty string",
      input: "",
      output: ""
    }
  ],
  paragraphs: [
    {
      name: "single word",
      input: "word",
      output: "<p>word</p>\n"
    },
    {
      name: "a few words",
      input: "a few words",
      output: "<p>a few words</p>\n"
    },
    {
      name: "new paragraph",
      input: "i want a new paragraph\nnow",
      output: "<p>i want a new paragraph</p>\n<p>now</p>\n"
    },
    {
      name: "double newline",
      input: "this is a paragraph\n\nand another one",
      output: "<p>this is a paragraph</p>\n<p>and another one</p>\n"
    }
  ]
  /*header: [
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
      input: "\n`here we are in a # code\n  block`",
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
  ],
  comparison_operators: [
    {
      name: "less than",
      input: "<",
      output: "&lt"
    },
    {
      name: "greater than",
      input: ">",
      output: "&gt"
    },
    {
      name: "less than in code",
      input: "`<`",
      output: "<code>&lt</code>"
    },
    {
      name: "greater than in code block",
      input: "\n`>`",
      output: "\n<pre>&gt</pre>"
    }
  ],
  bullets: [
    {
      name: "single bullet no end",
      input: "\n* bullet",
      output: "\n<ul><li>bullet</li></ul>"
    },
    {
      name: "two bullets",
      input: "\n* one\n* two\n",
      output: "\n<ul><li>one</li>\n<li>two</li></ul>"
    }
  ] */
};

let compiler = new Compiler();

for (let group in test_groups)
  describe(group, () => {
    for (let test_case of test_groups[group])
      test(test_case.name, () => {
        expect(compiler.compile(test_case.input)).toBe(
          htmlWrap(test_case.output)
        );
      });
  });
