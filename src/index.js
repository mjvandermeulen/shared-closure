let syntaxLitHigh = false;
let exampleCode = "";

// ******* next lines need to be per method!!!
let answersChecked = false;
let answersShown = false;

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
    <input type="text" placeholder="___" />
  `;
  d.classList.add("inp", `inp-${i}`, "cell");

  return d;
}

function answerWrapper(methodKey, i) {
  const d = document.createElement("div");
  d.innerHTML = `
    <div class="cell">${results[methodKey].list[i]}
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
  const parent = document.getElementById("challenge");
  for (const methodKey in results) {
    parent.appendChild(methodRow(methodKey));
  }
}

function checkAnswers(methodKey) {
  // **** inp-1 numbering not needed
  const inpDivs = document.querySelectorAll(`
      #challenge .method-${methodKey} .inp
    `);

  for (let i = 0; i < inpDivs.length; i++) {
    const input = inpDivs[i].getElementsByTagName("input")[0];
    if (input.value == results[methodKey].list[i]) {
      inpDivs[i].classList.add("correct");
      inpDivs[i].classList.remove("incorrect");
    } else {
      inpDivs[i].classList.add("incorrect");
      inpDivs[i].classList.remove("correct");
    }
  }
}

function handleCheckClick(event, methodKey) {
  if (!answersChecked) {
    checkAnswers(methodKey);
    event.target.innerText = "Show";
    console.log(event.target);

    answersChecked = true;
  } else {
    // **** turn into show answers function
    const ansWrappers = document.querySelectorAll(
      `#challenge .method-${methodKey} .ans.wrapper`
    );
    ansWrappers.forEach((wrapper) => {
      wrapper.classList.toggle("collapsed");
    });
  }
}

function measureAnswerHeight() {
  // assume all wrappers are similar in the whole grid
  // **** better: measure all wrappers and return the max height.
  const ansWrappers = document.querySelectorAll(`#challenge .ans.wrapper`);
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
    "answer height set to " + (wrapperHeight + mTop + mBottom) + "   ======"
  );
}

// END NEW GRID CODE

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
