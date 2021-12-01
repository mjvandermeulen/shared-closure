let syntaxLitHigh = false;
let exampleCode = "";

const root = document.querySelector(":root");

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
}

function displaySampleCode() {
  // TODO play with promises here.
  const myRequest = new Request("code/sharedClosure.js");
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
  inps = document
    .querySelectorAll("#challenge .method-addOne input")
    .forEach((inp) => {
      console.log("here");
      inp.value = 1;
    });
  requestSwitchState("addOne", "checking");
};

window.onresize = () => {
  measureAnswerHeight();
};

//MDN: document.body.onload https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
