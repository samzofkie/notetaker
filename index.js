document.onkeyup = function(e) {
  if (e.ctrlKey && e.which == 13) {
    Render();
  }
};

var markdownInput = document.getElementById("notesarea");
var iframeOutput = document.getElementById("textoutput");

function Parser(markdown) {
  let outputHtml = "";
  let codeTagParity = 0, 
      preTagParity = 0, 
      underlineTagParity = 0; 
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
   
    } else if (markdown[i] == "\n") {
      outputHtml += "<br>";

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

function Render() {
  iframeOutput.srcdoc = Parser(markdownInput.value);
}
