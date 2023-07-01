export default class Compiler {
  constructor() {}

  compile(input) {
    this.input = input;
    this.inHeader = false;
    this.inUnderline = false;
    this.inCode = false;
    this.inCodeBlock = false;
    this.inList = false;
    this.inParagraph = false;
    this.output = "<!DOCTYPE html>\n<html>\n";
    this.index = 0;

    let fontPattern = /font\([^)]+\)\n/i;
    let backgroundColorPattern = /background\([^)]+\)\n/i;
    let textColorPattern = /textcolor\([^)]+\)\n/i;

    let fontDefinition = this.input.match(fontPattern);
    let backgroundColorDefinition = this.input.match(backgroundColorPattern);
    let textColorDefinition = this.input.match(textColorPattern);

    function trimParenthesisSyntax(s) {
      return s[0].split("(")[1].split(")")[0];
    }

    if (fontDefinition || backgroundColorDefinition || textColorDefinition) {
      this.output += "<head\n>";

      if (fontDefinition) {
        this.input = this.input.replace(fontDefinition[0], "");
        let fontFamilyName = trimParenthesisSyntax(fontDefinition);
        this.output +=
          '<link rel="stylesheet"' +
          'href="https://fonts.googleapis.com/css2?family=' +
          fontFamilyName.replaceAll(" ", "+") +
          '" >\n' +
          "<style>\nbody {\nfont-family: " +
          fontFamilyName +
          ";\n";
      } else this.output += "<style>\nbody {\n\n";

      if (backgroundColorDefinition) {
        this.input = this.input.replace(backgroundColorDefinition[0], "");
        let backgroundColorName = trimParenthesisSyntax(
          backgroundColorDefinition
        );
        this.output += "background-color: " + backgroundColorName + ";\n";
      }

      if (textColorDefinition) {
        this.input = this.input.replace(textColorDefinition[0], "");
        let textColorName = trimParenthesisSyntax(textColorDefinition);
        this.output += "color: " + textColorName + ";\n";
      }

      this.output += "}\n</style>";
    }

    /*if (fontDefinition) {
      this.input = this.input.replace(fontDefinition[0], "");
      let fontFamilyName = fontDefinition[0].split("(")[1].split(")")[0];
      this.output +=
        '<head>\n<link rel="stylesheet"' +
        'href="https://fonts.googleapis.com/css2?family=' +
        fontFamilyName.replaceAll(" ", "+") +
        '" >\n' +
        "<style>body {font-family: " +
        fontFamilyName +
        "</style>\n</head>\n";
    }*/

    this.output += "<body>\n";

    for (; this.index < this.input.length; this.index++) {
      this.currChar = this.input[this.index];
      switch (this.currChar) {
        case "#":
          this.handleHeader();
          break;
        case "_":
          this.handleUnderline();
          break;
        case "`":
          this.handleCode();
          break;
        case "*":
          this.handleBullet();
          break;
        case "\n":
          this.handleNewline();
          break;
        case "<":
          this.output += "&lt";
          break;
        case ">":
          this.output += "&gt";
          break;
        default:
          this.handleCharacter();
          break;
      }
    }
    this.closeOpenTags();
    return this.output;
  }

  nextCharacter() {
    return this.input[this.index + 1];
  }

  previousCharacter() {
    return this.input[this.index - 1];
  }

  ensureInTextTag() {
    if (
      !this.inHeader &&
      !this.inParagraph &&
      !this.inCodeBlock &&
      !this.inList
    ) {
      this.output += "<p>";
      this.inParagraph = true;
    }
  }

  handleHeader() {
    if (
      this.nextCharacter() === " " &&
      !this.inHeader &&
      !this.inCode &&
      !this.inCodeBlock
    ) {
      this.output += "<h1>";
      this.inHeader = true;
      this.index++;
    } else this.handleCharacter();
  }

  handleUnderline() {
    if (this.nextCharacter() === "_" && !this.inCode && !this.inCodeBlock) {
      this.ensureInTextTag();
      this.output += this.inUnderline ? "</u>" : "<u>";
      this.inUnderline = !this.inUnderline;
      this.index++;
    } else this.handleCharacter();
  }

  handleCode() {
    if (this.inUnderline) {
      this.output += "</u>";
      this.inUnderline = false;
    }
    if (this.previousCharacter() === "\n" || this.inCodeBlock) {
      this.output += this.inCodeBlock ? "</pre>\n" : "<pre>";
      this.inCodeBlock = !this.inCodeBlock;
    } else {
      this.ensureInTextTag();
      this.output += this.inCode ? "</code>" : "<code>";
      this.inCode = !this.inCode;
    }
  }

  handleBullet() {
    if (this.previousCharacter() === "\n" && this.nextCharacter() === " ") {
      if (!this.inList) {
        this.output += "<ul>";
        this.inList = true;
      }
      this.output += "<li>";
      this.index++;
    } else this.handleCharacter();
  }

  handleNewline() {
    if (this.inHeader) {
      this.output += "</h1>\n";
      this.inHeader = false;
    } else if (this.inParagraph) {
      this.output += "</p>\n";
      this.inParagraph = false;
    } else if (this.inCodeBlock) {
      this.output += "\n";
    } else if (this.inList) {
      this.output += "</li>\n";
      if (
        !(this.nextCharacter() === "*" && this.input[this.index + 2] === " ")
      ) {
        this.output += "</ul>\n";
        this.inList = false;
      }
    }
  }

  handleCharacter() {
    this.ensureInTextTag();
    this.output += this.currChar;
  }

  closeOpenTags() {
    if (this.inParagraph) {
      this.output += "</p>\n";
      this.inParagraph = false;
    }
    if (this.inUnderline) {
      this.output += "</u>";
      this.inUnderline = false;
    }
    if (this.inHeader) {
      this.output += "</h1>\n";
      this.inHeader = false;
    }
    if (this.inCode) {
      this.output += "</code>";
      this.inCodeBlock = false;
    }
    if (this.inCodeBlock) {
      this.output += "</pre>\n";
      this.inCodeBlock = false;
    }
    if (this.inList) {
      this.output += "</li>\n</ul>\n";
      this.inList = false;
    }
    this.output += "</body>\n</html>";
  }
}
