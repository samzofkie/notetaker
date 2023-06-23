export default function Compile(markdown) {
  let outputHtml = "";
  let codeTagParity = 0, 
      preTagParity = 0, 
      underlineTagParity = 0;
  let inAList = false;
  for (let i=0; i<markdown.length; i++) {
    
    if (markdown[i] == '#' && markdown[i+1] == ' ') {
      i++;
      outputHtml += "<h1>";
      while (i<markdown.length && markdown[i] != '\n') {
        outputHtml += markdown[i];
        i++;
      }
      outputHtml += "</h1>";

    } else if (markdown[i] == "_" && markdown[i+1] == "_") {
      if (underlineTagParity == 0)
        outputHtml += "<u>";
      else
        outputHtml += "</u>";
      i++;
      underlineTagParity = (underlineTagParity + 1) % 2;
    
    } else if (markdown[i] == "`") {
      if (markdown[i-1] == "\n") {
        outputHtml += "<pre>";
        preTagParity = 1;
      }
      if (codeTagParity == 0)
        outputHtml += "<code>"
      else {
        outputHtml += "</code>";
        if (preTagParity == 1) {
          outputHtml += "</pre>";
          preTagParity = 0;
        }
      }
      codeTagParity = (codeTagParity + 1) % 2;
      

    } else if (markdown[i] === "\n") {
      if (inAList) {
        outputHtml += "</li>";
        if (markdown[i+1] === "*") {
          outputHtml += "<li>";
          i++;
        } else {
          outputHtml += "</ul>";
          inAList = false;
        }
      } else { // not inAList
        if (markdown[i+1] === "*") {
          inAList = true;
          outputHtml += "<ul><li>";
          i++;
        } else if (codeTagParity === 1) {
          outputHtml += "<br>";
        }
      }

    } else if (markdown[i] == "<") {
      outputHtml += "&lt";

    } else if (markdown[i] == ">") {
      outputHtml += "&gt";

    } else {
      outputHtml += markdown[i];
    }
  }
  return outputHtml;
}

