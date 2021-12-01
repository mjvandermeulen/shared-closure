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

for (i = 0; i < 3; i++) {
  c1Answers.push(c1());
  c5Answers.push(c5());
  cByOnesAnswers.push(c.byOnes());
  cByFivesAnswers.push(c.byFives());
}
