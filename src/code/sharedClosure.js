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

const c1 = count().byOnes;
const c5 = count().byFives;
const c = count();

const c1Answers = [];
const c5Answers = [];
const cByOnesAnswers = [];
const cByFivesAnswers = [];

const numResults = 3;
for (i = 0; i < numResults; i++) {
  c1Answers.push(c1());
  c5Answers.push(c5());
  cByOnesAnswers.push(c.byOnes());
  cByFivesAnswers.push(c.byFives());
}

// The grid above will show the answer arrays,
// after you try to fill in the correct answers
// yourself first.

// move out of sharedClosure, to "STATE"?
// change results to methods ****
// TODO POSSIBLY IN THE FUTURE: **** great enum with typescript
// valid values of state:
// "base"
// "validation-error" does this disappear immediately on "editing"?
// "checked"
// "showing"
const results = {
  addOne: {
    name: "c1()",
    list: c1Answers, // change list to answers: [] ****
    state: "base",
  },
  addFive: {
    name: "c5()",
    list: c5Answers,
    state: "base",
  },
  addDotOne: {
    name: "c.byOnes()",
    list: cByOnesAnswers,
    state: "base",
  },
  addDotFive: {
    name: "c.byFives()",
    list: cByFivesAnswers,
    state: "base",
  },
};
