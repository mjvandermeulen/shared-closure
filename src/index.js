let syntaxLitHigh = false;
let exampleCode = "";
const root = document.querySelector(":root");
// NEW GRID CODE

function nameDiv(methodKey) {
  const d = document.createElement("div");
  d.classList.add("cell");
  const content = document.createTextNode(results[methodKey].name);
  d.appendChild(content);

  return d;
}

function inputCell(i) {
  const d = document.createElement("div");
  d.innerHTML = `
    <input type="text" value="?" />
  `;
  d.classList.add("inp", `inp-${i}`, "cell");

  return d;
}

function answerWrapper(methodKey, i) {
  const d = document.createElement("div");
  d.innerHTML = `
    <div class="cell">${results[methodKey].list[i]}
  `;
  d.classList.add("ans", "wrapper");

  return d;
}

function handleCheck(methodKey) {
  console.log("Check clicked. methodKey: " + methodKey);
}

function checkButton(methodKey) {
  const b = document.createElement("button");
  b.classList.add("check", `check-${methodKey}`, "cell");
  b.onclick = () => {
    handleCheck(methodKey);
  };
  const c = document.createTextNode("Check");
  b.appendChild(c);

  return b;
}

function methodRow(methodKey) {
  const method = results[methodKey];
  const row = document.createElement("div");
  row.classList.add("method", `method-${methodKey}`);
  row.appendChild(nameDiv(methodKey));
  for (let i = 0; i < method.list.length; i++) {
    // left off HERE ******** change to
    row.appendChild(inputCell(i));
    row.appendChild(answerWrapper(methodKey, i));
  }
  row.appendChild(checkButton(methodKey));

  return row;
}

function createChallenges() {
  parent = document.getElementById("challenge");
  for (const methodKey in results) {
    console.log("result: " + results[methodKey].name);
    console.log("methodKey: " + methodKey);
    parent.appendChild(methodRow(methodKey));
  }
}

function answer(method) {
  // LEARN. How to read CCS var()s
  rs = getComputedStyle(root);
  answerHeight = rs.getPropertyValue("--answer-height"); // NEW GRID CODE
  const ansWrappers = document.querySelectorAll(
    `#challenge .method-${method}.ans-wrapper`
  );
  const answersCollapsed = ansWrappers[0].classList.contains("ans-collapsed");
  console.log(answerHeight + "answerHeight");

  ansWrappers.forEach((wrapper) => {
    if (answersCollapsed) {
      wrapper.classList.remove("ans-collapsed");
      wrapper.children[0].style.transform = "translateY(0)";
    } else {
      wrapper.classList.add("ans-collapsed");
      wrapper.children[0].style.transform = `translateY(${-answerHeight}px)`;
    }
  });
}

function measureAnswerHeight() {
  // assume all wrappers are similar in the whole grid
  // **** better: measure all wrappers and return the max height.
  const ansWrappers = document.querySelectorAll(`#challenge .ans-wrapper`);
  // https://developer.mozilla.org/en-US/docs/Web/API/Element/clientWidth
  const ansElement = ansWrappers[0].children[0];
  const wrapperHeight = ansElement.offsetHeight;
  const style = window.getComputedStyle(ansElement);
  // LEARN ****
  // https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle
  mTop = parseFloat(style.getPropertyValue("margin-top"));
  mBottom = parseFloat(style.getPropertyValue("margin-bottom"));
  const newHeight = wrapperHeight + mTop + mBottom;
  root.style.setProperty("--answer-height", newHeight);
  console.log(
    "answer height set to " + wrapperHeight + mTop + mBottom + "======"
  );
}

// END NEW GRID CODE

function showResult(key) {
  s = document.getElementById(key);
  s.innerHTML = results[key].list;
}

// ******* cleanup

let showRes = false;

function show(result) {
  showRes = !showRes;
  if (result == "res1") {
    resDivs = document.querySelectorAll("div#test");
    resDivs.forEach((element) => {
      element.style.maxHeight = showRes ? "100px" : "0";
    });
  }
}

function insertCode() {
  const codeBlock = document.getElementById("code");
  codeBlock.textContent = exampleCode; // not innerHTML!!! text needs to be escaped.
}

function displaySampleCode() {
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
  displaySampleCode();
  createChallenges();
  measureAnswerHeight(); // ***** I think this works here
  // since the inserting of code is synchronous
};

window.onresize = () => {
  measureAnswerHeight();
};

//MDN: document.body.onload https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
