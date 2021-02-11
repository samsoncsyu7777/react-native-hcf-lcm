export function calculateFactors(getInteger) {
  var factorsArray = [];
  var inputsArray = [];
  var i;
  for (i = 1; i * i <= getInteger; i++) {
    if (getInteger % i == 0) {
      factorsArray.push(i);
      inputsArray.push(null);
    }
  }
  for (i = factorsArray.length - 1; i >= 0; i--) {
    if (getInteger != factorsArray[i] ** 2) {
      factorsArray.push(getInteger / factorsArray[i]);
      inputsArray.push(null);
    }
  }
  return { factorsArray, inputsArray };
}

export function calculateResults(getFirstFactorsArray, getSecondFactorsArray) {
  var factorsArray = [];
  var inputsArray = [];
  getFirstFactorsArray.forEach(factor => {
    if (getSecondFactorsArray.includes(factor)) {
      factorsArray.push(factor);
      inputsArray.push(null);
    }
  });
  return { factorsArray, inputsArray };
}