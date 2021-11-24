let syntaxLitHigh = false;
let exampleCode = "";
const root = document.querySelector(":root");
// NEW GRID CODE

function answer(method) {
  rs = getComputedStyle(root);
  answerHeight = rs.getPropertyValue("--answer-height");

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
  const ansWrappers = document.querySelectorAll("#challenge .ans-wrapper");
  // https://developer.mozilla.org/en-US/docs/Web/API/Element/clientWidth
  const ansElement = ansWrappers[0].children[0];
  const wrapperHeight = ansElement.offsetHeight;
  const style = window.getComputedStyle(ansElement);
  mTop = parseFloat(style.marginTop);
  mBottom = parseFloat(style.marginBottom);
  const newHeight = (wrapperHeight + mTop + mBottom) * 2;
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

function createResultsButtonsOLD() {
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
  loadAndInsertExampleCode();
  createResultsButtonsOLD();
  measureAnswerHeight();
};

window.onresize = () => {
  measureAnswerHeight();
};
