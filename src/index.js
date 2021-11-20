let syntaxLitHigh = false;
let exampleCode = "";

// NEW GRID CODE

function answer(method) {
  document
    .querySelectorAll(`#challenge .method-${method}.ans-wrapper`)
    .forEach((el) => {
      el.classList.toggle("ans-collapsed");
    });
}

// END NEW GRID CODE

function showResult(key) {
  s = document.getElementById(key);
  s.innerHTML = results[key].list;
}

// ******* cleanup

let showRes = false;

function show(result) {
  console.log("show called");
  showRes = !showRes;
  if (result == "res1") {
    resDivs = document.querySelectorAll("div#test");
    resDivs.forEach((element) => {
      element.style.maxHeight = showRes ? "100px" : "0";
    });
  }
}

function createResultsButtons() {
  for (const [key, method] of Object.entries(results)) {
    rl = document.getElementById("OLDRESULTS");

    li = document.createElement("li");
    li.innerHTML = `
    <li>
      <button onClick="showResult('${key}')">show ${method.name}</button>
      <span id="${key}"/>
    </li>`;
    rl.appendChild(li);
  }
}

function insertCode() {
  const codeBlock = document.getElementById("code");
  codeBlock.textContent = exampleCode; // not innerHTML!!! text needs to be escaped.
}

function loadAndInsertExampleCode() {
  // TODO play with promises here.
  const myRequest = new Request("sharedClosure.js");
  return fetch(myRequest).then(function (response) {
    return response.text().then(function (text) {
      exampleCode = text;
      insertCode();
    });
  });
}

function toggleSyntaxHighlighting() {
  syntaxLitHigh = !syntaxLitHigh;
  if (syntaxLitHigh) {
    Prism.highlightAll();
  } else {
    insertCode();
  }
}

window.onload = () => {
  createResultsButtons();
  loadAndInsertExampleCode();
};
