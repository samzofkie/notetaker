import Compiler from "./Compiler.js";

function htmlWrap(s) {
  return "<!DOCTYPE html>\n<html>\n<body>\n" + s + "</body>\n</html>";
}

const test_groups = {
  "html structure": [
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
  ],
  header: [
    {
      name: "simple header",
      input: "# This should be a header\n",
      output: "<h1>This should be a header</h1>\n"
    },
    {
      name: "unterminated header",
      input: "# This should be a header",
      output: "<h1>This should be a header</h1>\n"
    },
    {
      name: "header before paragraph",
      input: "# This should be a header.\nBut this should be a paragraph.",
      output:
        "<h1>This should be a header.</h1>\n<p>But this should be a paragraph.</p>\n"
    },
    {
      name: "header after paragraph",
      input: "This is a normal line\n# This should be a header\n",
      output: "<p>This is a normal line</p>\n<h1>This should be a header</h1>\n"
    },
    {
      name: "double header",
      input: "# This should be a header # As should this",
      output: "<h1>This should be a header # As should this</h1>\n"
    }
  ],
  underline: [
    {
      name: "underlined word",
      input: "__word__",
      output: "<p><u>word</u></p>\n"
    },
    {
      name: "underlined amongst normal",
      input: "one __underlined__ word",
      output: "<p>one <u>underlined</u> word</p>\n"
    },
    {
      name: "multi paragraph underline",
      input: "first __line\nsecond__ line",
      output: "<p>first <u>line</p>\n<p>second</u> line</p>\n"
    },
    {
      name: "underlined header",
      input: "# __UNDERLINED HEADER!\nDOESN'T END TILL HERE__!",
      output:
        "<h1><u>UNDERLINED HEADER!</h1>\n<p>DOESN'T END TILL HERE</u>!</p>\n"
    },
    {
      name: "unterminated header",
      input: "__oops\n",
      output: "<p><u>oops</p>\n</u>"
    }
  ],
  code: [
    {
      name: "code word",
      input: "`word`",
      output: "<p><code>word</code></p>\n"
    },
    {
      name: "code amongst words",
      input: "these `code` words",
      output: "<p>these <code>code</code> words</p>\n"
    },
    {
      name: "yes code in header",
      input: "# This is a `code` header\n",
      output: "<h1>This is a <code>code</code> header</h1>\n"
    },
    {
      name: "no header in code",
      input: "code `goes # into` header\n",
      output: "<p>code <code>goes # into</code> header</p>\n"
    },
    {
      name: "code goes out of header",
      input: "# Header `code\nheaders over but still` code",
      output:
        "<h1>Header <code>code</h1>\n<p>headers over but still</code> code</p>\n"
    },
    {
      name: "no underline in code",
      input: "code `goes __into` underline__",
      output: "<p>code <code>goes __into</code> underline<u></p>\n</u>"
    },
    {
      name: "code trumps underline",
      input: "__code goes `out of__ underline` okay",
      output: "<p><u>code goes </u><code>out of__ underline</code> okay</p>\n"
    }
  ],
  "code block": [
    {
      name: "code block",
      input: "\n`code block`",
      output: "<pre>code block</pre>\n"
    },
    {
      name: "indentation",
      input: "\n`this  is  in  \n    a code block`",
      output: "<pre>this  is  in  \n    a code block</pre>\n"
    },
    {
      name: "paragraph before block",
      input: "a fine paragraph\n`and a fine code block`",
      output: "<p>a fine paragraph</p>\n<pre>and a fine code block</pre>\n"
    },
    {
      name: "block before paragraph",
      input: "\n`but a simple\n  block`\ntext",
      output: "<pre>but a simple\n  block</pre>\n<p>text</p>\n"
    },
    {
      name: "header in code block",
      input: "\n`here we are in a # code\n  block`",
      output: "<pre>here we are in a # code\n  block</pre>\n"
    },
    {
      name: "unfinished block",
      input: "\n`oops",
      output: "<pre>oops</pre>\n"
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
      output: "<p><code>&lt</code></p>\n"
    },
    {
      name: "greater than in code block",
      input: "\n`>`",
      output: "<pre>&gt</pre>\n"
    }
  ],
  bullets: [
    {
      name: "one bullet",
      input: "\n* bullet\n",
      output: "<ul><li>bullet</li>\n</ul>\n"
    },
    {
      name: "two bullets",
      input: "\n* one\n* two\n",
      output: "<ul><li>one</li>\n<li>two</li>\n</ul>\n"
    },
    {
      name: "paragraph before bullet",
      input: "Paragraph\n* Bullet 1\n* Bullet 2\n",
      output:
        "<p>Paragraph</p>\n<ul><li>Bullet 1</li>\n<li>Bullet 2</li>\n</ul>\n"
    },
    {
      name: "unfinished bullet",
      input: "\n* Bullet",
      output: "<ul><li>Bullet</li>\n</ul>\n"
    },
    {
      name: "code in bullet",
      input: "\n* Bullet w `code`\n",
      output: "<ul><li>Bullet w <code>code</code></li>\n</ul>\n"
    }
  ]
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
