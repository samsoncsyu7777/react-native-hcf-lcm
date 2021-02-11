export function calculateMultiples(getInteger1, getInteger2) {
  var multiplesArray = [];
  var inputsArray = [];
  var lcm = 0;
  var i;
  for (i = 1; i <= 100; i++) {
    if (lcm != 0 && (getInteger1 * i > lcm * 3 || i > 15)) {
      return { multiplesArray, inputsArray };
    } else {
      multiplesArray.push(getInteger1 * i);
      inputsArray.push(null);
      if (getInteger1 * i % getInteger2 == 0 && lcm == 0) {
        lcm = getInteger1 * i;
      }
    }
  }
}

export function calculateResults(getFirstMultiplesArray, getSecondMultiplesArray) {
  var multiplesArray = [];
  var inputsArray = [];
  getFirstMultiplesArray.forEach(multiple => {
    if (getSecondMultiplesArray.includes(multiple)) {
      multiplesArray.push(multiple);
      inputsArray.push(null);
    }
  });
  return { multiplesArray, inputsArray };
}