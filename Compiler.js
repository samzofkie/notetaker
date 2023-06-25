function Compile(input) {
  let output = "";
  let inHeader = false,
    inUnderline = false;
  for (let i = 0; i < input.length; i++) {
    if (input.slice(i, i + 2) === "# ") {
      output += "<h1>";
      i++;
      inHeader = true;
    } else if (input.slice(i, i + 2) === "__") {
      output += inUnderline ? "</u>" : "<u>";
      i++;
      inUnderline = !inUnderline;
    } else if (input[i] === "\n") {
      if (inHeader) {
        output += "</h1>";
        inHeader = false;
      } else {
        output += "<br>";
      }
      output += "\n";
    } else {
      output += input[i];
    }
  }
  if (inHeader) output += "</h1>";
  return output;
}

export default Compile;
