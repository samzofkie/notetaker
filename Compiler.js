export default class Compiler {
  constructor() {}

  compile(input) {
    this.input = input;
    this.inParagraph = false;

    this.output = "<!DOCTYPE html>\n<html>\n<body>\n";

    for (this.index = 0; this.index < this.input.length; this.index++) {
      this.currChar = this.input[this.index];
      if (this.currChar === "\n") this.handleNewline();
      else this.handleCharacter();
    }
    this.closeOpenTags();
    
    return this.output;
  }

  closeOpenTags() {
    if (this.inParagraph) this.output += "</p>\n";
    this.output += "</body>\n</html>";
  }

  handleCharacter() {
    if (!this.inParagraph) {
      this.output += "<p>";
      this.inParagraph = true;
    }
    this.output += this.currChar;
  }

  handleNewline() {
    if (this.inParagraph) {
      this.output += "</p>\n";
      this.inParagraph = false;
    }
  }
}

/*export default class Compiler {
  constructor() {
    this.inHeader = false;
    this.inUnderline = false;
    this.inCode = false;
    this.inCodeBlock = false;
    this.inList = false;
  }

  compile(input) {
    this.input = input;
    this.output = "";
    for (this.index = 0; this.index < this.input.length; this.index++) {
      let current = this.input[this.index];
      let currentTwo = current + this.nextCharacter();
      if (currentTwo === "# ") this.handleHeader();
      else if (currentTwo === "__") this.handleUnderline();
      else if (current === "`") this.handleCode();
      else if (current === "*") this.handleBullet();
      else if (current === "\n") this.handleNewline();
      else if (current === "<") this.output += "&lt";
      else if (current === ">") this.output += "&gt";
      else this.output += this.input[this.index];
    }
    if (this.inHeader)
      this.output += "</h1>";
    return this.output;
  }

  nextCharacter() {
    return this.input[this.index + 1];
  }

  nextTwoCharacters() {
    return this.input.slice(this.index + 1, this.index + 3);
  }

  previousCharacter() {
    return this.input[this.index - 1];
  }

  handleHeader() {
    if (this.inCode || this.inCodeBlock) this.output += "#";
    else {
      this.output += "<h1>";
      this.inHeader = true;
      this.index++;
    }
  }

  handleUnderline() {
    if (this.inCode || this.inCodeBlock) this.output += "__";
    else {
      this.output += this.inUnderline ? "</u>" : "<u>";
      this.inUnderline = !this.inUnderline;
    }
    this.index++;
  }

  handleCode() {
    if (this.inUnderline) {
      this.output += "</u>";
      this.inUnderline = false;
    }
    if (this.previousCharacter() === "\n" || this.inCodeBlock) {
      this.output += this.inCodeBlock ? "</pre>" : "<pre>";
      this.inCode = !this.inCodeBlock;
    } else {
      this.output += this.inCode ? "</code>" : "<code>";
      this.inCode = !this.inCode;
    }
  }

  handleBullet() {
    if (this.previousCharacter() != "\n" || this.nextCharacter() != " ") return;
    if (!this.inList) {
      this.output += "<ul>";
      this.inList = true;
    }
    this.output += "<li>";
    this.index++;
  }

  handleNewline() {
    if (this.inHeader) {
      this.output += "</h1>";
      this.inHeader = false;
    }
    else if (this.inList) {
      this.output += "</li>";
      if (this.nextTwoCharacters != "* ") {
        this.ouput += "</ul>";
        this.inList = false;
      }
    }
    else if (
      this.previousCharacter() != "`" &&
      this.nextCharacter() != "`" &&
      this.nextTwoCharacters() != "* " &&
      !this.inCode &&
      !this.inCodeBlock
    ) {
      this.output += "<br>";
    }
    this.output += "\n";
  }
} */
