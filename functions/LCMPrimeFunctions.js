export function calculateResults(getFirstFactorsArray, getSecondFactorsArray) {
  var factorsArray = [];
  var inputsArray = [];
  var firstArrayIndex = 0;
  var secondArrayIndex = 0;
  var i;
  for (i = 0; i < getFirstFactorsArray.length + getSecondFactorsArray.length; i++) {
    if (getFirstFactorsArray[firstArrayIndex] == getSecondFactorsArray[secondArrayIndex]) {
      factorsArray.push(getFirstFactorsArray[firstArrayIndex]);
      inputsArray.push(null);
      firstArrayIndex += 1;
      secondArrayIndex += 1;
    } else if (getFirstFactorsArray[firstArrayIndex] > getSecondFactorsArray[secondArrayIndex]) {
      factorsArray.push(getSecondFactorsArray[secondArrayIndex]);
      inputsArray.push(null);
      secondArrayIndex += 1;
    } else if (getFirstFactorsArray[firstArrayIndex] < getSecondFactorsArray[secondArrayIndex]) {
      factorsArray.push(getFirstFactorsArray[firstArrayIndex]);
      inputsArray.push(null);
      firstArrayIndex += 1;
    }
    if (firstArrayIndex == getFirstFactorsArray.length && secondArrayIndex == getSecondFactorsArray.length) {
      i = getFirstFactorsArray.length + getSecondFactorsArray.length;
    } else if (firstArrayIndex == getFirstFactorsArray.length) {
      var j;
      for (j = secondArrayIndex; j < getSecondFactorsArray.length; j++) {
        factorsArray.push(getSecondFactorsArray[j]);
        inputsArray.push(null);
      }
      i = getFirstFactorsArray.length + getSecondFactorsArray.length;
    } else if (secondArrayIndex == getSecondFactorsArray.length) {
      var j;
      for (j = firstArrayIndex; j < getFirstFactorsArray.length; j++) {
        factorsArray.push(getFirstFactorsArray[j]);
        inputsArray.push(null);
      }
      i = getFirstFactorsArray.length + getSecondFactorsArray.length;
    }
  }
  return { factorsArray, inputsArray };
}