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

// change to methods **** = {
const results = {
  addOne: {
    name: "Count 1",
    list: [], // change to answers: [] ****
    function: count1,
  },
  addFive: {
    name: "Count 5",
    list: [],
    function: count5,
  },
  addDotOne: {
    name: "Count Dot 1",
    list: [],
    function: add.byOnes,
  },
  addDotFive: {
    name: "Count Dot 5",
    list: [],
    function: add.byFives,
  },
};

const numResults = 3;

for (let i = 0; i < numResults; i++) {
  for (const [_, result] of Object.entries(results)) {
    result.list.push(result.function());
  }
}
