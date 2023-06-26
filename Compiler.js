function previousCharacter(input, state) {
  return input[state.index - 1];
}

function nextCharacter(input, state) {
  return input[state.index + 1];
}

function handleHeader(input, state) {
  if (state.inPre || state.inCode) state.output += "#";
  else {
    state.output += "<h1>";
    state.inHeader = true;
    state.index++;
  }
}

function handleUnderline(input, state) {
  if (state.inPre || state.inCode) state.output += "__";
  else {
    state.output += state.inUnderline ? "</u>" : "<u>";
    state.inUnderline = !state.inUnderline;
  }
  state.index++;
}

function handleNewline(input, state) {
  if (state.inHeader) {
    state.output += "</h1>";
    state.inHeader = false;
  } else if (
    previousCharacter(input, state) != "`" &&
    nextCharacter(input, state) != "`" &&
    !state.inCode &&
    !state.inPre
  ) {
    state.output += "<br>";
  }
  state.output += "\n";
}

function handleCode(input, state) {
  if (state.inUnderline) {
    state.output += "</u>";
    state.inUnderline = false;
  }
  if (input[state.index - 1] === "\n" || state.inPre) {
    state.output += state.inPre ? "</pre>" : "<pre>";
    state.inPre = !state.inPre;
  } else {
    state.output += state.inCode ? "</code>" : "<code>";
    state.inCode = !state.inCode;
  }
}

function Compile(input) {
  let state = {
    inHeader: false,
    inUnderline: false,
    inCode: false,
    inPre: false,
    output: "",
    index: 0
  };

  for (; state.index < input.length; state.index++) {
    if (input.slice(state.index, state.index + 2) === "# ")
      handleHeader(input, state);
    else if (input.slice(state.index, state.index + 2) === "__")
      handleUnderline(input, state);
    else if (input[state.index] === "`") handleCode(input, state);
    else if (input[state.index] === "\n") handleNewline(input, state);
    else if (input[state.index] === "<") state.output += "&lt";
    else if (input[state.index] === ">") state.output += "&gt";
    else state.output += input[state.index];
  }
  if (state.inHeader) state.output += "</h1>";
  return state.output;
}

export default Compile;
