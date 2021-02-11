import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
} from 'react-native-paper';
import {
  Text,
  View,
} from "react-native";
import { MyInput } from "../components/InputComponents";
import { AlertSnackbar } from "../components/AlertComponents";
import { MyFrame } from "../components/HeadingComponents";
import { MyQuestion } from "../components/QuestionComponents";
import { calculateFactors, calculateResults } from "../functions/HCFPrimeFunctions";
import { getPrimeNumbers } from "../functions/PrimeNumbersFunctions";
import styles from "../styles";
import theme from "../Theme";

//×÷👍👍🏻
export const HCFPrimeFactorization = ({ languageIndex, topic, learningTool }) => {
  const [inputIntegersArray, setInputIntegersArray] = useState([null, null]);
  const [inputIntegerFocusedIndex, setInputIntegerFocusedIndex] = useState(0);
  const [openAlert, setOpenAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showDivisionColomns, setShowDivisionColomns] = useState(false);
  const [firstDivisorsArray, setFirstDivisorsArray] = useState([]);
  const [firstQuotientsArray, setFirstQuotientsArray] = useState([]);
  const [secondDivisorsArray, setSecondDivisorsArray] = useState([]);
  const [secondQuotientsArray, setSecondQuotientsArray] = useState([]);
  const [firstDivisorFocusedIndex, setFirstDivisorFocusedIndex] = useState(0);
  const [secondDivisorFocusedIndex, setSecondDivisorFocusedIndex] = useState(0);
  const [firstQuotientFocusedIndex, setFirstQuotientFocusedIndex] = useState(0);
  const [secondQuotientFocusedIndex, setSecondQuotientFocusedIndex] = useState(0);
  const [firstDivisionCompleted, setFirstDivisionCompleted] = useState(false);
  const [secondDivisionCompleted, setSecondDivisionCompleted] = useState(false);
  const [showFactorsColomns, setShowFactorsColomns] = useState(false);
  const [firstFactorsArray, setFirstFactorsArray] = useState([]);
  const [secondFactorsArray, setSecondFactorsArray] = useState([]);
  const [firstInputsArray, setFirstInputsArray] = useState([]);
  const [secondInputsArray, setSecondInputsArray] = useState([]);
  const [firstArrayFocusedIndex, setFirstArrayFocusedIndex] = useState(0);
  const [secondArrayFocusedIndex, setSecondArrayFocusedIndex] = useState(0);
  const [numberOfArraysCorrect, setNumberOfArraysCorrect] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [severity, setSeverity] = useState("error");
  const numberOfArrays = 2;
  const [commonFactorsArray, setCommonFactorsArray] = useState([]);
  const [commonInputsArray, setCommonInputsArray] = useState([]);
  const [commonArrayFocusedIndex, setCommonArrayFocusedIndex] = useState(0);
  const [hcfResultArray, setHcfResultArray] = useState([null]);
  const [hcfInputArray, setHcfInputArray] = useState([null]);
  const [hcfArrayFocusedIndex, setHcfArrayFocusedIndex] = useState(0);
  const [primeNumbers, setPrimeNumbers] = useState([]);
  const timeDelay = 200;

  const mustBeIntegerMessages = [
    "輸入的數必須是整數。",
    "输入的数必须是整数。",
    "The inputted numbers should be integers.",
    "Les nombres entrés doivent être des entiers."
  ];

  const mustBeInRangeMessage = [
    "輸入的數必須在1至99以內。",
    "输入的数必须在1至99以内。",
    "The inputted numbers should be in the range of 1 and 99.",
    "Les nombres saisis doivent être compris entre 1 et 99."
  ];

  const mustBeDifferentMessage = [
    "兩數必須不相同。",
    "两数必须不相同。",
    "The two integers should not be the same.",
    "Les deux nombres entiers ne devraient pas être identiques."
  ];

  const questionTextLeft = [
    "", "", "H.C.F./G.C.F.(Highest/Greatest Common Factor) of ", "H.C.F./G.C.F.(Facteur commun le plus élevé / le plus grand) sur "
  ];

  const questionTextRight = [
    "的H.C.F./G.C.F.(最大公因數)", "的H.C.F./G.C.F.(最大公因数)", "", ""
  ];

  const factorTextLeft = [
    "", "", "Prime factorization of ", "Factorisation prime de "
  ];

  const factorTextRight = [
    "的質因數分解", "的质因数分解", "", ""
  ];

  const mustBeAPrimeText = [
    "進行質因數分解時，你需要運用質數，例如2,3,5,7,...。",
    "进行质因数分解时，你需要运用质数，例如2,3,5,7,...。",
    "When performing prime factorization, you need to use prime numbers, such as 2,3,5,7,....",
    "Lors de la factorisation des nombres premiers, vous devez utiliser des nombres premiers, tels que 2,3,5,7,...."
  ];

  const mustBeAFactorTextLeft = [
    "這數必須是", "这数必须是", "This number must be a factor of ", "Ce nombre doit être un facteur de "
  ];

  const mustBeAFactorTextRight = [
    "的因數。", "的因数。", ".", "."
  ];

  const quotientIsAPrimeQuestionLeft = [
    "如果", "如果", "If ", "Si "
  ];

  const quotientIsAPrimeQuestionRight = [
    "是質數，請按", "是质数，请按", " is a prime number, please press ", " est un nombre premier, veuillez appuyer sur "
  ];

  const completeButtonText = [
    "完成", "完成", "Completed", "Terminé"
  ];

  const divisionCompletedText = [
    "這是質數，不能再被2,3,5,7,...整除。你完成這質因數分解的短除。",
    "这是质数，不能再被2,3,5,7,...整除。你完成这质因数分解的短除。",
    "This is a prime number and can no longer be divisible by 2,3,5,7,... You completed this short division of prime factorization.",
    "C'est un nombre premier et ne peut plus être divisible par 2,3,5,7,... Vous avez terminé cette courte division de la factorisation des nombres premiers."
  ];

  const divisionIncompleteHint = [
    "這數是一個合成數，仍可以被一些質數整除。",
    "这数是一个合成数，仍可以被一些质数整除。",
    "This number is a composite number, still divisible by some prime numbers.",
    "Ce nombre est un nombre composé, toujours divisible par quelques nombres premiers."
  ];

  const primeFactorHint = [
    "把上面的質因數(黃色方格)由小至大列寫出來。",
    "把上面的质因数(黄色方格)由小至大列写出来。",
    "Write down the prime factors above (yellow blocks) from small to large.",
    "Notez les facteurs premiers ci-dessus (blocs jaunes) de petit à grand."
  ];

  const commonFactorTextLeft = [
    "", "", "Common factors of ", "Facteurs communs de "
  ];

  const commonFactorTextRight = [
    "的共有因數", "的共有因数", "", ""
  ];

  const commonFactorHint = [
    "由小至大找出共有的質因數。",
    "由小至大找出共有的质因数。",
    "Find the common prime factors from small to large.",
    "Trouvez les facteurs premiers communs de petit à grand."
  ];

  const tryText = [
    "嘗試 ", "尝试 ", "Try ", "Essayer "
  ];

  const factorsCorrectTextLeft = [
    "你成功寫出", "你成功写出", "You successfully write the prime factorization of ", "Vous écrivez avec succès la factorisation première de "
  ];

  const factorsCorrectTextRight = [
    "的質因數分解。", "的质因数分解。", ".", "."
  ];

  const commonFactorsCorrectText = [
    "你成功寫出共有的質因數。",
    "你成功写出共有的质因数。",
    "You successfully write the common prime factors.",
    "Vous écrivez avec succès les facteurs premiers communs."
  ];

  const hcfHint = [
    "把上行共有的質因數乘起來。",
    "把上行共有的质因数乘起来。",
    "Multiply all the common prime factors above.",
    "Multipliez tous les facteurs premiers communs ci-dessus."
  ];

  const hcfOneHint = [
    "這H.C.F.比所有質數(2,3,5,7,...)小，不能從短除的結果中找出來。",
    "这H.C.F.比所有质数(2,3,5,7,...)小，不能从短除的结果中找出来。",
    "This H.C.F. is smaller than all prime numbers (2,3,5,7,...) and cannot be found from the result of short division.",
    "Ce H.C.F.est plus petit que tous les nombres premiers (2,3,5,7, ...) et ne peut être trouvé à partir du résultat d'une division courte."
  ];

  const hcfCorrectText = [
    "做得好!你求得正確的H.C.F.。",
    "做得好!你求得正确的H.C.F.。",
    "Well done! You got the right H.C.F..",
    "Bien joué! Vous avez le bon H.C.F.."
  ];

  useEffect(() => {
    setPrimeNumbers(getPrimeNumbers());
  }, []);

  const closeAlert = (e) => {
    setOpenAlert(false);
  };

  const handleChange = (e, focusedIndex, index, inputsArray, setInputValue, groupType, clickable) => {
    setOpenAlert(false);
    var tmpValue = parseInt(e);
    if (focusedIndex == index || clickable) {
      var tmpArray = [...inputsArray];
      tmpArray[index] = tmpValue;
      setInputValue(tmpArray);
      switch (groupType) {
        case "inputInteger":
          setShowDivisionColomns(false);
          setShowFactorsColomns(false);
          setShowResult(false);
          break;
        case "firstFactor":
          checkAnswer(index, tmpValue, firstFactorsArray, setFirstArrayFocusedIndex, groupType, inputIntegersArray[0]);
          break;
        case "secondFactor":
          checkAnswer(index, tmpValue, secondFactorsArray, setSecondArrayFocusedIndex, groupType, inputIntegersArray[1]);
          break;
        case "commonFactor":
          checkAnswer(index, tmpValue, commonFactorsArray, setCommonArrayFocusedIndex, groupType);
          break;
        case "hcf":
          checkAnswer(index, tmpValue, hcfResultArray, setHcfArrayFocusedIndex, groupType);
          break;
        case "firstDivisor":
          checkDivisor(index, tmpValue, firstQuotientsArray[index], setFirstDivisorFocusedIndex);
          break;
        case "secondDivisor":
          checkDivisor(index, tmpValue, secondQuotientsArray[index], setSecondDivisorFocusedIndex);
          break;
        case "firstQuotient":
          checkQuotient(index, tmpValue, firstDivisorsArray, firstQuotientsArray, setFirstDivisorsArray, setFirstQuotientsArray, setFirstQuotientFocusedIndex, firstDivisorFocusedIndex);
          break;
        case "secondQuotient":
          checkQuotient(index, tmpValue, secondDivisorsArray, secondQuotientsArray, setSecondDivisorsArray, setSecondQuotientsArray, setSecondQuotientFocusedIndex, secondDivisorFocusedIndex);
          break;
      }
    }
  };

  function checkDivisor(index, value, quotient, setAnswerFocusedIndex) {
    //correct divisor
    if (quotient % value == 0) {//} && value > 1 && value < quotient) {
      if (primeNumbers.includes(parseInt(value))) {
        setTimeout(() => {
          setAnswerFocusedIndex(index + 1);
        }, timeDelay);
      } else {
        //not a prime factor
        setOpenAlert(false);
        if (value > 0) {
          setTimeout(() => {
            setOpenAlert(true);
          }, timeDelay);
          setSeverity("error");
          setErrorMessage(mustBeAPrimeText[languageIndex]);
        }
      }
    } else {
      //not a factor
      setOpenAlert(false);
      if (value > 0) {
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        setSeverity("error");
        setErrorMessage(mustBeAFactorTextLeft[languageIndex] + quotient + mustBeAFactorTextRight[languageIndex]);
      }
    }
  }

  function checkQuotient(index, value, divisorsArray, quotientsArray, setDivisorsArray, setQuotientsArray, setAnswerFocusedIndex, divisorIndex) {
    if (divisorIndex == index && !primeNumbers.includes(quotientsArray[index - 1])) {
      //correct quotient
      if (value == quotientsArray[index - 1] / divisorsArray[index - 1]) {
        setTimeout(() => {
          var tmpDivisorsArray = [...divisorsArray];
          var tmpQuotientsArray = [...quotientsArray];
          tmpQuotientsArray[index] = parseInt(value);
          tmpDivisorsArray.push(null);
          tmpQuotientsArray.push(null);
          setDivisorsArray(tmpDivisorsArray);
          setQuotientsArray(tmpQuotientsArray);
          setAnswerFocusedIndex(index + 1);
        }, timeDelay);
      } else {
        //incorrect quotient
        setOpenAlert(false);
        if (value > 0) {
          setTimeout(() => {
            setOpenAlert(true);
          }, timeDelay);
          setSeverity("error");
          setErrorMessage(quotientsArray[index - 1] + " ÷ " + divisorsArray[index - 1] + " = ?");
        }
      }
    }
  }

  function checkAnswer(index, value, factorsArray, setAnswerFocusedIndex, groupType, inputInteger) {
    //correct factor
    if (value == factorsArray[index]) {
      if (groupType == "hcf") {
        setErrorMessage("👍🏻" + hcfCorrectText[languageIndex]);
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        setSeverity("success");
        setAnswerFocusedIndex(-1);
      } else if (["firstFactor", "secondFactor", "commonFactor"].includes(groupType)) {
        if (index == factorsArray.length - 1) {
          setTimeout(() => {
            setOpenAlert(true);
          }, timeDelay);
          setSeverity("success");
          setAnswerFocusedIndex(-1);
          if (groupType == "commonFactor") {
            setErrorMessage("👍🏻" + commonFactorsCorrectText[languageIndex]);
          } else {
            setErrorMessage("👍🏻" + factorsCorrectTextLeft[languageIndex] + inputInteger + factorsCorrectTextRight[languageIndex]);
            if (numberOfArraysCorrect == numberOfArrays - 1) {
              setShowResult(true);
            } else {
              setNumberOfArraysCorrect(numberOfArraysCorrect + 1);
            }
          }
        } else {
          setAnswerFocusedIndex(index + 1);
        }
      }
      //incorrect factor
    } else {
      setOpenAlert(false);
      if (value > 0) {
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        setSeverity("error");
        if (groupType == "hcf") {
          if (hcfResultArray[0] == 1) {
            setErrorMessage(hcfOneHint[languageIndex]);
          } else {
            setErrorMessage(hcfHint[languageIndex]);
          }
        } else if (groupType == "commonFactor") {
          if (hcfResultArray[0] == 1) {
            setErrorMessage(hcfOneHint[languageIndex]);
          } else {
            setErrorMessage(commonFactorHint[languageIndex]);
          }
        } else {
          setErrorMessage(primeFactorHint[languageIndex]);
        }
      }
    }
  }

  const completeClick = (e, quotient, setDivisionCompleted, anotherDivisionCompleted) => {
    if (primeNumbers.includes(quotient)) {
      setDivisionCompleted(true);
      setErrorMessage("👍🏻" + divisionCompletedText[languageIndex]);
      setSeverity("success");
      setTimeout(() => {
        setOpenAlert(true);
      }, timeDelay);
      if (anotherDivisionCompleted) {
        setShowFactorsColomns(true);
      }
    } else {
      setErrorMessage(divisionIncompleteHint[languageIndex]);
      setSeverity("error");
      setTimeout(() => {
        setOpenAlert(true);
      }, timeDelay);
    }
  };

  const okClick = (e) => {
    if (inputIntegersArray[0] != parseInt(inputIntegersArray[0]) || inputIntegersArray[1] != parseInt(inputIntegersArray[1])) {
      setErrorMessage(mustBeIntegerMessages[languageIndex]);
      setTimeout(() => {
        setOpenAlert(true);
      }, timeDelay);
    } else if (inputIntegersArray[0] < 1 || inputIntegersArray[0] > 99 || inputIntegersArray[1] < 1 || inputIntegersArray[1] > 99) {
      setErrorMessage(mustBeInRangeMessage[languageIndex]);
      setTimeout(() => {
        setOpenAlert(true);
      }, timeDelay);
    } else if (inputIntegersArray[0] == inputIntegersArray[1]) {
      setErrorMessage(mustBeDifferentMessage[languageIndex]);
      setTimeout(() => {
        setOpenAlert(true);
      }, timeDelay);
    } else {
      setOpenAlert(false);
      setShowDivisionColomns(false);
      setTimeout(() => {
        setShowDivisionColomns(true);
      }, timeDelay);
      setFirstDivisorsArray([null, null]);
      setFirstQuotientsArray([inputIntegersArray[0], null]);
      setSecondDivisorsArray([null, null]);
      setSecondQuotientsArray([inputIntegersArray[1], null]);
      setFirstDivisorFocusedIndex(0);
      setSecondDivisorFocusedIndex(0);
      setFirstQuotientFocusedIndex(1);
      setSecondQuotientFocusedIndex(1);
      setFirstDivisionCompleted(false);
      setSecondDivisionCompleted(false);
      setShowFactorsColomns(false);
      setFirstArrayFocusedIndex(0);
      setSecondArrayFocusedIndex(0);
      setNumberOfArraysCorrect(0);
      setShowResult(false);
      setCommonArrayFocusedIndex(0);
      setHcfInputArray([null]);
      setHcfArrayFocusedIndex(0);
      var { factorsArray, inputsArray } = calculateFactors(inputIntegersArray[0], primeNumbers);
      setFirstFactorsArray(factorsArray);
      setFirstInputsArray(inputsArray);
      var factorsArray0 = factorsArray;
      var { factorsArray, inputsArray } = calculateFactors(inputIntegersArray[1], primeNumbers);
      setSecondFactorsArray(factorsArray);
      setSecondInputsArray(inputsArray);
      var factorsArray1 = factorsArray;
      var { factorsArray, inputsArray } = calculateResults(factorsArray0, factorsArray1);
      setCommonFactorsArray(factorsArray);
      setCommonInputsArray(inputsArray);
      var tmpHcf = 1;
      var i;
      for (i = 0; i < factorsArray.length; i++) {
        tmpHcf *= factorsArray[i];
      }
      setHcfResultArray([tmpHcf]);
    }
  };

  return (
    <MyFrame topic={topic} learningTool={learningTool}>
      <MyQuestion
        questionTextLeft={questionTextLeft[languageIndex]}
        setInputIntegersArray={setInputIntegersArray}
        inputIntegerFocusedIndex={inputIntegerFocusedIndex}
        inputIntegersArray={inputIntegersArray}
        setInputIntegerFocusedIndex={setInputIntegerFocusedIndex}
        handleChange={handleChange}
        questionTextRight={questionTextRight[languageIndex]}
        okClick={okClick}
      />
      <AlertSnackbar
        open={openAlert}
        closeAlert={closeAlert}
        errorMessage={errorMessage}
        severity={severity}
      />
      {
        showDivisionColomns &&
        <View style={styles.centerRow}>
          <View style={styles.divisionColomn}>
            <View style={styles.divisionInsideColumn}>
              {
                firstDivisorsArray.map((divisor, index) => {
                  return <View key={index} style={styles.divisionRow}>
                    {
                      ((index < firstDivisorsArray.length - 2) || ((index == firstDivisorsArray.length - 2) && !firstDivisionCompleted)) &&
                      <View
                        border={0}
                      >
                        <MyInput
                          index={index}
                          setInputValue={setFirstDivisorsArray}
                          focusedIndex={firstDivisorFocusedIndex}
                          inputsArray={firstDivisorsArray}
                          clickable={false}
                          groupType="firstDivisor"
                          handleChange={handleChange}
                          highlighted={firstDivisionCompleted}
                        />
                      </View>
                    }
                    {
                      ((index < firstDivisorsArray.length - 1) || ((index == firstDivisorsArray.length - 1) && !firstDivisionCompleted)) &&
                      <View
                        style={{
                          borderBottomWidth: (index < firstDivisorsArray.length - 2) || (index == firstDivisorsArray.length - 2 && (!firstDivisionCompleted) || index == 0) ? 2 : 0,
                          borderLeftWidth: (index < firstDivisorsArray.length - 2) || (index == firstDivisorsArray.length - 2 && (!firstDivisionCompleted) || index == 0) ? 2 : 0
                        }}
                      >
                        <MyInput
                          index={index}
                          setInputValue={setFirstQuotientsArray}
                          focusedIndex={firstQuotientFocusedIndex}
                          inputsArray={firstQuotientsArray}
                          clickable={false}
                          groupType="firstQuotient"
                          handleChange={handleChange}
                          highlighted={(index == firstDivisorsArray.length - 2) && firstDivisionCompleted}
                        />
                      </View>
                    }
                  </View>
                })
              }
            </View>
            <View style={styles.centerRow}>
              <Text style={styles.commonText}>
                {quotientIsAPrimeQuestionLeft[languageIndex]}
                {firstQuotientsArray[firstQuotientFocusedIndex - 1]}
                {quotientIsAPrimeQuestionRight[languageIndex]}
              </Text>
              <Button
                style={styles.completeButton2}
                mode="contained"
                color={theme.colors.blue}
                onPress={e => { completeClick(e, firstQuotientsArray[firstQuotientFocusedIndex - 1], setFirstDivisionCompleted, secondDivisionCompleted) }}
              >
                {completeButtonText[languageIndex]}
              </Button>
            </View>
          </View>
          <View style={styles.divisionColomn}>
            <View style={styles.divisionInsideColumn}>
              {
                secondDivisorsArray.map((divisor, index) => {
                  return <View key={index} style={styles.divisionRow}>
                    {
                      ((index < secondDivisorsArray.length - 2) || ((index == secondDivisorsArray.length - 2) && !secondDivisionCompleted)) &&
                      <View
                        border={0}
                      >
                        <MyInput
                          index={index}
                          setInputValue={setSecondDivisorsArray}
                          focusedIndex={secondDivisorFocusedIndex}
                          inputsArray={secondDivisorsArray}
                          clickable={false}
                          groupType="secondDivisor"
                          handleChange={handleChange}
                          highlighted={secondDivisionCompleted}
                        />
                      </View>
                    }
                    {
                      ((index < secondDivisorsArray.length - 1) || ((index == secondDivisorsArray.length - 1) && !secondDivisionCompleted)) &&
                      <View
                        style={{
                          borderBottomWidth: (index < secondDivisorsArray.length - 2) || (index == secondDivisorsArray.length - 2 && (!secondDivisionCompleted) || index == 0) ? 2 : 0,
                          borderLeftWidth: (index < secondDivisorsArray.length - 2) || (index == secondDivisorsArray.length - 2 && (!secondDivisionCompleted) || index == 0) ? 2 : 0
                        }}
                      >
                        <MyInput
                          index={index}
                          setInputValue={setSecondQuotientsArray}
                          focusedIndex={secondQuotientFocusedIndex}
                          inputsArray={secondQuotientsArray}
                          clickable={false}
                          groupType="secondQuotient"
                          handleChange={handleChange}
                          highlighted={(index == secondDivisorsArray.length - 2) && secondDivisionCompleted}
                        />
                      </View>
                    }
                  </View>
                })
              }
            </View>
            <View style={styles.centerRow}>
              <Text style={styles.commonText}>
                {quotientIsAPrimeQuestionLeft[languageIndex]}
                {secondQuotientsArray[secondQuotientFocusedIndex - 1]}
                {quotientIsAPrimeQuestionRight[languageIndex]}
              </Text>
              <Button
                style={styles.completeButton2}
                mode="contained"
                color={theme.colors.blue}
                onPress={e => { completeClick(e, secondQuotientsArray[secondQuotientFocusedIndex - 1], setSecondDivisionCompleted, firstDivisionCompleted) }}
              >
                {completeButtonText[languageIndex]}
              </Button>
            </View>
          </View>
        </View>
      }
      {
        showFactorsColomns && <View>
          <View style={styles.centerRow}>
            <View style={styles.factorsRows}>
              <Text style={styles.commonText}>
                {factorTextLeft[languageIndex]}&nbsp;{inputIntegersArray[0]}&nbsp;{factorTextRight[languageIndex]}&nbsp;:
              </Text>
              {
                firstInputsArray.map((factor, index) => {
                  return <View key={index} style={styles.row}>
                    {(index > 0) && <Text style={styles.commonText}>×</Text>}
                    <MyInput
                      index={index}
                      setInputValue={setFirstInputsArray}
                      focusedIndex={firstArrayFocusedIndex}
                      inputsArray={firstInputsArray}
                      clickable={false}
                      groupType="firstFactor"
                      handleChange={handleChange}
                    />
                  </View>
                })
              }
            </View>
          </View>
          <View style={styles.centerRow}>
            <View style={styles.factorsRows}>
              <Text style={styles.commonText}>
                {factorTextLeft[languageIndex]}&nbsp;{inputIntegersArray[1]}&nbsp;{factorTextRight[languageIndex]}&nbsp;:
              </Text>
              {
                secondInputsArray.map((factor, index) => {
                  return <View key={index} style={styles.row}>
                    {(index > 0) && <Text style={styles.commonText}>×</Text>}
                    <MyInput
                      index={index}
                      setInputValue={setSecondInputsArray}
                      focusedIndex={secondArrayFocusedIndex}
                      inputsArray={secondInputsArray}
                      clickable={false}
                      groupType="secondFactor"
                      handleChange={handleChange}
                    />
                  </View>
                })
              }
            </View>
          </View>
        </View>
      }
      {
        showResult && <View >
          <View style={styles.centerRow}>
            <View style={styles.factorsRows}>
              <Card style={styles.card}>
                <View style={styles.factorsRows}>
                  <Text style={styles.commonText}>
                    {commonFactorTextLeft[languageIndex]}&nbsp;{inputIntegersArray[0]},&nbsp;{inputIntegersArray[1]}{commonFactorTextRight[languageIndex]}&nbsp;:
                  </Text>
                  {
                    commonInputsArray.map((factor, index) => {
                      return <View key={index} style={styles.row}>
                        {(index > 0) && <Text style={styles.commonText}>×</Text>}
                        <MyInput
                          index={index}
                          setInputValue={setCommonInputsArray}
                          focusedIndex={commonArrayFocusedIndex}
                          inputsArray={commonInputsArray}
                          clickable={false}
                          groupType="commonFactor"
                          handleChange={handleChange}
                        />
                      </View>
                    })
                  }
                </View>
                <View style={styles.factorsRows}>
                  <Text style={styles.commonText}>
                    {questionTextLeft[languageIndex]}&nbsp;{inputIntegersArray[0]},&nbsp;{inputIntegersArray[1]}{questionTextRight[languageIndex]}&nbsp;:
                  </Text>
                  <MyInput
                    index={0}
                    setInputValue={setHcfInputArray}
                    focusedIndex={hcfArrayFocusedIndex}
                    inputsArray={hcfInputArray}
                    clickable={false}
                    groupType="hcf"
                    handleChange={handleChange}
                  />
                </View>
              </Card>
            </View>
          </View>
        </View>
      }
    </MyFrame>
  );
}
