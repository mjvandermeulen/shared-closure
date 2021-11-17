let syntaxLitHigh = false;
let exampleCode = "";

function count() {
  let counter = 0;

  function plusOne() {
    counter++;
    return counter;
  }

  function plusFive() {
    counter = counter + 5;
    return counter;
  }

  return {
    byOnes: plusOne,
    byFives: plusFive,
  };
}

const count1 = count().byOnes;
const count5 = count().byFives;

const add = count();

const methods = {
  addOne: {
    name: "Count 1",
    list: [],
    function: count1,
  },
  addFive: {
    name: "Count 5",
    list: [],
    function: count5,
  },
};

for (let i = 0; i < 3; i++) {
  for (const [_, method] of Object.entries(methods)) {
    method.list.push(method.function());
  }
}

function showResult(key) {
  s = document.getElementById(key);
  s.innerHTML = methods[key].list;
}

function createResultsButtons() {
  for (const [key, method] of Object.entries(methods)) {
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
