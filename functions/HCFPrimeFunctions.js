export function calculateFactors(getInteger, primeNumbers) {
  var tmpInteger = getInteger;
  var factorsArray = [];
  var inputsArray = [];
  var i;
  for (i = 0; i * i < primeNumbers.length; i++) {
    if (primeNumbers.includes(tmpInteger)) {
      factorsArray.push(tmpInteger);
      inputsArray.push(null);
      i = primeNumbers.length;
    }
    var j;
    for (j = 0; j < getInteger; j++) {
      if ((tmpInteger % primeNumbers[i]) == 0 ) {
        tmpInteger = tmpInteger / primeNumbers[i];
        factorsArray.push(primeNumbers[i]);
        inputsArray.push(null);
      } else {
        j = getInteger;
      }
    }
  }
  return { factorsArray, inputsArray };
}

export function calculateResults(getFirstFactorsArray, getSecondFactorsArray) {
  var tmpSecondFactorsArray = [...getSecondFactorsArray];
  var factorsArray = [];
  var inputsArray = [];
  getFirstFactorsArray.forEach(factor => {
    if (tmpSecondFactorsArray.includes(factor)) {
      factorsArray.push(factor);
      inputsArray.push(null);
      delete tmpSecondFactorsArray[tmpSecondFactorsArray.indexOf(factor)];
    }
  });
  if (factorsArray.length == 0) {
    factorsArray.push(1);
    inputsArray.push(null);
  }
  return { factorsArray, inputsArray };
}