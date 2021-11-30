function changeButtonText(methodKey, text) {
  document.querySelector(
    `#challenge .method-${methodKey} button.check`
  ).textContent = text;
}

function showAnswers(methodKey, show) {
  const ansWrappers = document.querySelectorAll(
    `#challenge .method-${methodKey} .ans.wrapper`
  );

  if (show) {
    ansWrappers.forEach((wrapper) => {
      wrapper.classList.remove("collapsed");
    });
  } else {
    ansWrappers.forEach((wrapper) => {
      wrapper.classList.add("collapsed");
    });
  }
}

function checkAnswers(methodKey, show) {
  // **** inp-1 numbering not needed
  const inpDivs = document.querySelectorAll(
    `#challenge .method-${methodKey} .inp`
  );

  for (let i = 0; i < inpDivs.length; i++) {
    const input = inpDivs[i].getElementsByTagName("input")[0];
    if (show) {
      if (input.value == results[methodKey].list[i]) {
        inpDivs[i].classList.add("correct");
        inpDivs[i].classList.remove("incorrect");
      } else {
        inpDivs[i].classList.add("incorrect");
        inpDivs[i].classList.remove("correct");
      }
    } else {
      inpDivs[i].classList.remove("incorrect");
      inpDivs[i].classList.remove("correct");
    }
  }
}

function showValidationError(methodKey, show) {
  const valEl = document.querySelector(
    `#challenge .method-${methodKey} .validation-error`
  );

  if (show) {
    valEl.classList.remove("collapsed");
  } else {
    valEl.classList.add("collapsed");
  }
}

function matchState(methodKey) {
  console.log("Match State: " + results[methodKey].state);
  switch (results[methodKey].state) {
    case "base":
      showValidationError(methodKey, false);
      checkAnswers(methodKey, false); // called by matchState
      changeButtonText(methodKey, "Check");
      showAnswers(methodKey, false);
      break;
    case "validation-error":
      showValidationError(methodKey, true);
      checkAnswers(methodKey, false); // called by matchState
      changeButtonText(methodKey, "OK");
      showAnswers(methodKey, false);
      break;
    case "checked":
      showValidationError(methodKey, false);
      checkAnswers(methodKey, true); // called by matchState
      changeButtonText(methodKey, "Show");
      showAnswers(methodKey, false);
      break;
    case "showing":
      showValidationError(methodKey, false);
      changeButtonText(methodKey, "Hide");
      checkAnswers(methodKey, true);
      showAnswers(methodKey, true);
      console.log("showing case " + methodKey);
      break;
    default:
      console.log("no default implemented yet ****");
      break;
  }
}

function validateInputs(methodKey) {
  let allValid = true;
  const inpDivs = document.querySelectorAll(`
    #challenge .method-${methodKey} .inp
    `);

  for (let i = 0; i < inpDivs.length; i++) {
    const input = inpDivs[i].getElementsByTagName("input")[0];
    if (!input.value) {
      allValid = false;
    }
  }
  return allValid;
}

function requestSwitchState(methodKey, reqState, force = false) {
  console.log(
    "request Switch State: " + results[methodKey].state + " -> " + reqState
  );
  if (force) {
    results[methodKey].state = reqState;
  } else {
    switch (reqState) {
      case "base":
        if (
          !(
            results[methodKey].state === "validation-error" &&
            !validateInputs(methodKey)
          )
        ) {
          results[methodKey].state = "base";
        }
        break;
      case "validation-error": // should never happen...
        results[methodKey].state = "validation-error";
        break;
      case "checked":
        if (validateInputs(methodKey)) {
          results[methodKey].state = "checked";
        } else {
          results[methodKey].state = "validation-error";
        }
        break;
      case "showing":
        // validateIputs is quite redundant: input changes change state to base.
        if (
          validateInputs(methodKey) &&
          results[methodKey].state == "checked"
        ) {
          results[methodKey].state = "showing";
        }
        break;
      default:
        break;
    }
  }
  // you could check if state has changed... **** before matching
  matchState(methodKey);
}

function handleInputChange(event, methodKey, i) {
  // **** cleanup. event needed?
  requestSwitchState(methodKey, "base");
}

function handleCheckClick(event, methodKey) {
  // **** cleanup. event needed?
  if (results[methodKey].state === "validation-error") {
    requestSwitchState(methodKey, "base", true);
  } else if (results[methodKey].state === "checked") {
    requestSwitchState(methodKey, "showing");
  } else {
    requestSwitchState(methodKey, "checked");
  }
}
