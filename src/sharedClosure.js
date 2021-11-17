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

const results = {
  addOne: {
    name: "Count 1",
    list: [],
    function: count1,
  },
  addFive: {
    name: "Count 5",
    list: [],
    function: count5,
  },
};

const numResults = 3;

for (let i = 0; i < numResults; i++) {
  for (const [_, result] of Object.entries(results)) {
    result.list.push(result.function());
  }
}
