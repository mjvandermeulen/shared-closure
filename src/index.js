let syntaxLitHigh = false;
let exampleCode = "";

function showResult(key) {
  s = document.getElementById(key);
  s.innerHTML = results[key].list;
}

function createResultsButtons() {
  for (const [key, method] of Object.entries(results)) {
    rl = document.getElementById("results");

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
