import React, { useState, useEffect } from "react";
import {
  Card,
} from 'react-native-paper';
import {
  Text,
  View,
} from "react-native";
import { MyInput } from "../components/InputComponents";
import { AlertSnackbar } from "../components/AlertComponents";
import { MyFrame } from "../components/HeadingComponents";
import { MyQuestion } from "../components/QuestionComponents";
import { calculateFactors, calculateResults } from "../functions/HCFFunctions";
import styles from "../styles";

//×÷👍👍🏻
export const HCFFactorization = ({ languageIndex, topic, learningTool }) => {
  const [inputIntegersArray, setInputIntegersArray] = useState([null, null]);
  const [inputIntegerFocusedIndex, setInputIntegerFocusedIndex] = useState(0);
  const [openAlert, setOpenAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showFactorRows, setShowFactorRows] = useState(false);
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
    "", "", "Factors of ", "Facteurs de "
  ];

  const factorTextRight = [
    "的因數", "的因数", "", ""
  ];

  const commonFactorTextLeft = [
    "", "", "Common factors of ", "Facteurs communs de "
  ];

  const commonFactorTextRight = [
    "的公因數", "的公因数", "", ""
  ];

  const commonFactorHint = [
    "由小至大找出相同的因數。",
    "由小至大找出相同的因数。",
    "Find the common factors from small to large.",
    "Trouvez les facteurs communs de petit à grand."
  ];

  const hcfHint = [
    "在上行的公因數中找出最大的一個。",
    "在上行的公因数中找出最大的一个。",
    "Find the largest one among the common factors.",
    "Trouvez le plus grand parmi les facteurs communs."
  ];

  const tryText = [
    "嘗試 ", "尝试 ", "Try ", "Essayer "
  ];

  const factorsCorrectTextLeft = [
    "你成功列出", "你成功列出", "You successfully listed the factors of ", "Vous avez répertorié avec succès les facteurs de "
  ];

  const factorsCorrectTextRight = [
    "的因數。", "的因数。", ".", "."
  ];

  const commonFactorsCorrectText = [
    "你成功列出所有公因數。",
    "你成功列出所有公因数。",
    "You successfully list all common factors.",
    "Vous avez réussi à répertorier tous les facteurs communs."
  ];

  const hcfCorrectText = [
    "做得好!你求得正確的H.C.F.。",
    "做得好!你求得正确的H.C.F.。",
    "Well done! You got the right H.C.F..",
    "Bien joué! Vous avez le bon H.C.F.."
  ];

  useEffect(() => {

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
          setShowFactorRows(false);
          setShowResult(false);
          break;
        case "firstFactor":
          checkAnswer(index, tmpValue, firstFactorsArray, setFirstArrayFocusedIndex);
          break;
        case "secondFactor":
          checkAnswer(index, tmpValue, secondFactorsArray, setSecondArrayFocusedIndex);
          break;
        case "commonFactor":
          checkAnswer(index, tmpValue, commonFactorsArray, setCommonArrayFocusedIndex, groupType);
          break;
        case "hcf":
          checkAnswer(index, tmpValue, hcfResultArray, setHcfArrayFocusedIndex, groupType);
          break;

      }
    }
  };

  function checkAnswer(index, value, factorsArray, setAnswerFocusedIndex, groupType) {
    if (value == factorsArray[index]) {
      if (groupType == "hcf") {
        setErrorMessage("👍🏻" + hcfCorrectText[languageIndex]);
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        setSeverity("success");
        setAnswerFocusedIndex(-1);
      } else if (groupType == "commonFactor") {
        if (index == factorsArray.length - 1) {
          setErrorMessage("👍🏻" + commonFactorsCorrectText[languageIndex]);
          setTimeout(() => {
            setOpenAlert(true);
          }, timeDelay);
          setSeverity("success");
          setAnswerFocusedIndex(-1);
        } else {
          setAnswerFocusedIndex(index + 1);
        }
      } else if (index == Math.round((factorsArray.length - 1) / 2)) {
        setErrorMessage("👍🏻" + factorsCorrectTextLeft[languageIndex] + factorsArray[factorsArray.length - 1] + factorsCorrectTextRight[languageIndex]);
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        setSeverity("success");
        setAnswerFocusedIndex(-1);
        if (numberOfArraysCorrect == numberOfArrays - 1) {
          setShowResult(true);
        } else {
          setNumberOfArraysCorrect(numberOfArraysCorrect + 1);
        }
      } else {
        if (index < Math.round((factorsArray.length - 1) / 2)) {
          setAnswerFocusedIndex(factorsArray.length - index - 1);
        } else if (index > Math.round((factorsArray.length - 1) / 2)) {
          setAnswerFocusedIndex(factorsArray.length - index);
        }
      }
    } else {
      setOpenAlert(false);
      if (value > 0) {
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        setSeverity("error");
        if (groupType == "hcf") {
          setErrorMessage(hcfHint[languageIndex]);
        } else if (groupType == "commonFactor") {
          setErrorMessage(commonFactorHint[languageIndex]);
        } else if (index < Math.round((factorsArray.length - 1) / 2)) {
          var tryInteger = index == 0 ? 0 : factorsArray[index - 1];
          var tryIntegerString = (tryInteger + 1) + ", " + (tryInteger + 2) + ", " + (tryInteger + 3) + ",... ×?=" + factorsArray[factorsArray.length - 1];
          setErrorMessage(tryText[languageIndex] + tryIntegerString)
        } else if (index > Math.round((factorsArray.length - 2) / 2)) {
          var tryIntegerString = factorsArray[factorsArray.length - 1] + "÷" + factorsArray[factorsArray.length - index - 1];
          setErrorMessage(tryText[languageIndex] + tryIntegerString);
        } else {
          var tryIntegerString = "A×A=" + factorsArray[factorsArray.length - 1] + ", A=?";
          setErrorMessage(tryText[languageIndex] + tryIntegerString);
        }
      }
    }
  }

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
      setShowFactorRows(false);
      setTimeout(() => {
        setShowFactorRows(true);
      }, timeDelay);
      setFirstArrayFocusedIndex(0);
      setSecondArrayFocusedIndex(0);
      setNumberOfArraysCorrect(0);
      setShowResult(false);
      setCommonArrayFocusedIndex(0);
      setHcfInputArray([null]);
      setHcfArrayFocusedIndex(0);
      var { factorsArray, inputsArray } = calculateFactors(inputIntegersArray[0]);
      setFirstFactorsArray(factorsArray);
      setFirstInputsArray(inputsArray);
      var factorsArray0 = factorsArray;
      var { factorsArray, inputsArray } = calculateFactors(inputIntegersArray[1]);
      setSecondFactorsArray(factorsArray);
      setSecondInputsArray(inputsArray);
      var factorsArray1 = factorsArray;
      var { factorsArray, inputsArray } = calculateResults(factorsArray0, factorsArray1);
      setCommonFactorsArray(factorsArray);
      setCommonInputsArray(inputsArray);
      setHcfResultArray([factorsArray[factorsArray.length - 1]]);
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
        showFactorRows && <View>
          <View style={styles.centerRow}>
            <View style={styles.factorsRows}>
              <Text style={styles.commonText}>
                {factorTextLeft[languageIndex]}&nbsp;{inputIntegersArray[0]}&nbsp;{factorTextRight[languageIndex]}&nbsp;:
              </Text>
              {
                firstInputsArray.map((factor, index) => {
                  return <View key={index} style={styles.row}>
                    <MyInput
                      index={index}
                      setInputValue={setFirstInputsArray}
                      focusedIndex={firstArrayFocusedIndex}
                      inputsArray={firstInputsArray}
                      clickable={false}
                      groupType="firstFactor"
                      handleChange={handleChange}
                    />
                    {(firstInputsArray.length - 1 > index) && <Text style={styles.commonText}>,</Text>}
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
                    <MyInput
                      index={index}
                      setInputValue={setSecondInputsArray}
                      focusedIndex={secondArrayFocusedIndex}
                      inputsArray={secondInputsArray}
                      clickable={false}
                      groupType="secondFactor"
                      handleChange={handleChange}
                    />
                    {(secondInputsArray.length - 1 > index) && <Text style={styles.commonText}>,</Text>}
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
                      <MyInput
                          index={index}
                          setInputValue={setCommonInputsArray}
                          focusedIndex={commonArrayFocusedIndex}
                          inputsArray={commonInputsArray}
                          clickable={false}
                          groupType="commonFactor"
                          handleChange={handleChange}
                        />
                        {(commonInputsArray.length - 1 > index) && <Text style={styles.commonText}>,</Text>}
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
