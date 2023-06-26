function handleHeader(input, state) {
  state.output += "<h1>";
  state.inHeader = true;
  state.index++;
}

function handleUnderline(input, state) {
  state.output += state.inUnderline ? "</u>" : "<u>";
  state.inUnderline = !state.inUnderline;
  state.index++;
}

function handleNewline(input, state) {
  if (state.inHeader) {
    state.output += "</h1>";
    state.inHeader = false;
  } else {
    state.output += "<br>";
  }
  state.output += "\n";
}

function Compile(input) {
  let state = {
    inHeader: false,
    inUnderline: false,
    output: "",
    index: 0
  };

  for (; state.index < input.length; state.index++) {
    if (input.slice(state.index, state.index + 2) === "# ")
      handleHeader(input, state);
    else if (input.slice(state.index, state.index + 2) === "__")
      handleUnderline(input, state);
    else if (input[state.index] === "\n") handleNewline(input, state);
    else state.output += input[state.index];
  }
  if (state.inHeader) state.output += "</h1>";
  return state.output;
}

export default Compile;
