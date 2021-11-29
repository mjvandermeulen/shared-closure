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
const results = {
  addOne: {
    name: "c1()",
    list: c1Answers, // change list to answers: [] ****
    checked: false,
    showing: false,
  },
  addFive: {
    name: "c5()",
    list: c5Answers,
    checked: false,
    showing: false,
  },
  addDotOne: {
    name: "c.byOnes()",
    list: cByOnesAnswers,
    checked: false,
    showing: false,
  },
  addDotFive: {
    name: "c.byFives()",
    list: cByFivesAnswers,
    checked: false,
    showing: false,
  },
};
