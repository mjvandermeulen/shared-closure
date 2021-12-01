const INPUTPLACEHOLDER = "__";

function nameDiv(methodKey) {
  const d = document.createElement("div");
  d.classList.add("cell", "name");
  const content = document.createTextNode(results[methodKey].name);
  d.appendChild(content);

  return d;
}

function validationError() {
  const d = document.createElement("div");
  d.classList.add("collapsed", "validation-error", "wrapper");
  const content = document.createTextNode("Fill in all the boxes below");
  d.innerHTML = `
      <div class="cell">Fill in all the boxes below</div>
    `;
  return d;
}

function inputCell(methodKey, i) {
  const d = document.createElement("div");
  const inp = document.createElement("input");
  inp.type = "text";
  inp.placeholder = INPUTPLACEHOLDER;
  inp.onkeyup = (event) => {
    handleInputChange(event, methodKey, i);
  };
  d.appendChild(inp);
  d.classList.add("inp", `inp-${i}`, "cell");

  return d;
}

function answerWrapper(methodKey, i) {
  const d = document.createElement("div");
  d.innerHTML = `
      <div class="cell">${results[methodKey].list[i]}</div>
    `;
  d.classList.add("ans", "wrapper", "collapsed");

  return d;
}

function checkButton(methodKey) {
  const b = document.createElement("button");
  b.classList.add("check", `check-${methodKey}`, "cell");
  b.onclick = (event) => {
    handleCheckClick(event, methodKey);
  };
  const c = document.createTextNode("Check");
  b.appendChild(c);

  return b;
}

function methodRow(methodKey) {
  const method = results[methodKey];
  const row = document.createElement("div");
  row.classList.add("method", `method-${methodKey}`, "segment");
  row.appendChild(nameDiv(methodKey));
  row.appendChild(validationError());
  for (let i = 0; i < method.list.length; i++) {
    row.appendChild(inputCell(methodKey, i));
    row.appendChild(answerWrapper(methodKey, i));
  }
  row.appendChild(checkButton(methodKey));

  return row;
}

function createChallenges() {
  const parent = document.getElementById("challenge");
  for (const methodKey in results) {
    parent.appendChild(methodRow(methodKey));
  }
}

function insertCode() {
  const codeBlock = document.getElementById("code");
  codeBlock.textContent = exampleCode; // not innerHTML!!! text needs to be escaped. **** try textNode???
}
