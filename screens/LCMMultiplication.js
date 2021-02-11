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
import { calculateMultiples, calculateResults } from "../functions/LCMFunctions";
import styles from "../styles";

//×÷👍👍🏻
export const LCMMultiplication = ({ languageIndex, topic, learningTool }) => {
  const [inputIntegersArray, setInputIntegersArray] = useState([null, null]);
  const [inputIntegerFocusedIndex, setInputIntegerFocusedIndex] = useState(0);
  const [openAlert, setOpenAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showMultipleRows, setShowMultipleRows] = useState(false);
  const [firstMultiplesArray, setFirstMultiplesArray] = useState([]);
  const [secondMultiplesArray, setSecondMultiplesArray] = useState([]);
  const [firstInputsArray, setFirstInputsArray] = useState([]);
  const [secondInputsArray, setSecondInputsArray] = useState([]);
  const [firstArrayFocusedIndex, setFirstArrayFocusedIndex] = useState(0);
  const [secondArrayFocusedIndex, setSecondArrayFocusedIndex] = useState(0);
  const [numberOfArraysCorrect, setNumberOfArraysCorrect] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [severity, setSeverity] = useState("error");
  const numberOfArrays = 2;
  const [commonMultiplesArray, setCommonMultiplesArray] = useState([]);
  const [commonInputsArray, setCommonInputsArray] = useState([]);
  const [commonArrayFocusedIndex, setCommonArrayFocusedIndex] = useState(0);
  const [lcmResultArray, setLcmResultArray] = useState([null]);
  const [lcmInputArray, setLcmInputArray] = useState([null]);
  const [lcmArrayFocusedIndex, setLcmArrayFocusedIndex] = useState(0);
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
    "", "", "L.C.M.(Least Common Multiple) of ", "L.C.M.(Multiple moins commun) sur "
  ];

  const questionTextRight = [
    "的L.C.M.(最小公倍數)", "的L.C.M(最小公倍数)", "", ""
  ];

  const multipleTextLeft = [
    "", "", "Multiples of ", "Multiples de "
  ];

  const multipleTextRight = [
    "的倍數", "的倍数", "", ""
  ];

  const commonMultipleTextLeft = [
    "", "", "Common multiples of ", "Multiples communs de "
  ];

  const commonMultipleTextRight = [
    "的公倍數", "的公倍数", "", ""
  ];

  const commonMultipleHint = [
    "由小至大找出相同的倍數。", 
    "由小至大找出相同的倍数。", 
    "Find the common multiples from small to large.", 
    "Trouvez les multiples communs de petit à grand."
  ];

  const lcmHint = [
    "在上行的公倍數中找出最小的一個。", 
    "在上行的公倍数中找出最小的一个。", 
    "Find the smallest one among the common multiples.", 
    "Trouvez le plus petit parmi les multiples communs."
  ];

  const tryText = [
    "嘗試 ", "尝试 ", "Try ", "Essayer "
  ];

  const multiplesCorrectTextLeft = [
    "你成功列出", "你成功列出", "You successfully listed the multiples of ", "Vous avez répertorié avec succès les multiples de "
  ];

  const multiplesCorrectTextRight = [
    "的倍數。", "的倍数。", ".", "."
  ];

  const commonMultiplesCorrectText = [
    "你成功列出所有公倍數。", 
    "你成功列出所有公倍数。", 
    "You successfully list all common multiples.", 
    "Vous avez réussi à répertorier tous les multiples communs."
  ];

  const lcmCorrectText = [
    "做得好!你求得正確的L.C.M.。", 
    "做得好!你求得正确的L.C.M.。", 
    "Well done! You got the right L.C.M..", 
    "Bien joué! Vous avez le bon L.C.M.."
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
          setShowMultipleRows(false);
          setShowResult(false);
          break;
        case "firstMultiple":
          checkAnswer(index, tmpValue, firstMultiplesArray, setFirstArrayFocusedIndex);
          break;
        case "secondMultiple":
          checkAnswer(index, tmpValue, secondMultiplesArray, setSecondArrayFocusedIndex);
          break;
        case "commonMultiple":
          checkAnswer(index, tmpValue, commonMultiplesArray, setCommonArrayFocusedIndex, groupType);
          break;
        case "lcm":
          checkAnswer(index, tmpValue, lcmResultArray, setLcmArrayFocusedIndex, groupType);
          break;
      }
    }
  };

  function checkAnswer(index, value, multiplesArray, setAnswerFocusedIndex, groupType) {
    if (value == multiplesArray[index]) {
      if (groupType == "lcm") {
        setErrorMessage("👍🏻" + lcmCorrectText[languageIndex]);
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        setSeverity("success");
        setAnswerFocusedIndex(-1);
      } else if (index == multiplesArray.length - 1) {
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        setSeverity("success");
        setAnswerFocusedIndex(-1);
        if (groupType == "commonMultiple") {
          setErrorMessage("👍🏻" + commonMultiplesCorrectText[languageIndex]);
        } else {
          setErrorMessage("👍🏻" + multiplesCorrectTextLeft[languageIndex] + multiplesArray[multiplesArray.length - 1] + multiplesCorrectTextRight[languageIndex]);
          if (numberOfArraysCorrect == numberOfArrays - 1) {
            setShowResult(true);
          } else {
            setNumberOfArraysCorrect(numberOfArraysCorrect + 1);
          }
        }
      } else {
        setAnswerFocusedIndex(index + 1);
      }
    } else {
      setOpenAlert(false);
      if (value > 0) {
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        setSeverity("error");
        if (groupType == "lcm") {
          setErrorMessage(lcmHint[languageIndex]);
        } else if (groupType == "commonMultiple") {
          setErrorMessage(commonMultipleHint[languageIndex]);
        } else if (index == 0) {
          var tryIntegerString = multiplesArray[0] + " ";
          setErrorMessage(tryText[languageIndex] + tryIntegerString);
        } else {
          var tryIntegerString = multiplesArray[index - 1] + "+" + multiplesArray[0];
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
      setShowMultipleRows(false);
      setTimeout(() => {
        setShowMultipleRows(true);
      }, timeDelay);
      setFirstArrayFocusedIndex(0);
      setSecondArrayFocusedIndex(0);
      setNumberOfArraysCorrect(0);
      setShowResult(false);
      setCommonArrayFocusedIndex(0);
      setLcmInputArray([null]);
      setLcmArrayFocusedIndex(0);
      var { multiplesArray, inputsArray } = calculateMultiples(inputIntegersArray[0], inputIntegersArray[1]);
      setFirstMultiplesArray(multiplesArray);
      setFirstInputsArray(inputsArray);
      var multiplesArray0 = multiplesArray;
      var { multiplesArray, inputsArray } = calculateMultiples(inputIntegersArray[1], inputIntegersArray[0]);
      setSecondMultiplesArray(multiplesArray);
      setSecondInputsArray(inputsArray);
      var multiplesArray1 = multiplesArray;
      var { multiplesArray, inputsArray } = calculateResults(multiplesArray0, multiplesArray1);
      setCommonMultiplesArray(multiplesArray);
      setCommonInputsArray(inputsArray);
      setLcmResultArray([multiplesArray[0]]);
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
        showMultipleRows && <View>
          <View style={styles.centerRow}>
            <View style={styles.multiplesRows}>
              <Text style={styles.commonText}>
                {multipleTextLeft[languageIndex]}&nbsp;{inputIntegersArray[0]}&nbsp;{multipleTextRight[languageIndex]}&nbsp;:
              </Text>
              {
                firstInputsArray.map((multiple, index) => {
                  return <View key={index} style={styles.row}>
                    <MyInput
                      index={index}
                      setInputValue={setFirstInputsArray}
                      focusedIndex={firstArrayFocusedIndex}
                      inputsArray={firstInputsArray}
                      clickable={false}
                      groupType="firstMultiple"
                      handleChange={handleChange}
                    />
                    <Text style={styles.commonText}>{(firstInputsArray.length - 1 > index) ? "," : ",..."}</Text>
                  </View>
                })
              }
            </View>
          </View>
          <View style={styles.centerRow}>
            <View style={styles.multiplesRows}>
              <Text style={styles.commonText}>
                {multipleTextLeft[languageIndex]}&nbsp;{inputIntegersArray[1]}&nbsp;{multipleTextRight[languageIndex]}&nbsp;:
              </Text>
              {
                secondInputsArray.map((multiple, index) => {
                  return <View key={index} style={styles.row}>
                    <MyInput
                      index={index}
                      setInputValue={setSecondInputsArray}
                      focusedIndex={secondArrayFocusedIndex}
                      inputsArray={secondInputsArray}
                      clickable={false}
                      groupType="secondMultiple"
                      handleChange={handleChange}
                    />
                    <Text style={styles.commonText}>{(secondInputsArray.length - 1 > index) ? "," : ",..."}</Text>
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
            <View style={styles.multiplesRows}>
              <Card style={styles.card} >
                <View style={styles.multiplesRows}>
                  <Text style={styles.commonText}>
                    {commonMultipleTextLeft[languageIndex]}&nbsp;{inputIntegersArray[0]},&nbsp;{inputIntegersArray[1]}{commonMultipleTextRight[languageIndex]}&nbsp;:
                  </Text>
                  {
                    commonInputsArray.map((multiple, index) => {
                      return <View key={index} style={styles.row}>
                      <MyInput
                          index={index}
                          setInputValue={setCommonInputsArray}
                          focusedIndex={commonArrayFocusedIndex}
                          inputsArray={commonInputsArray}
                          clickable={false}
                          groupType="commonMultiple"
                          handleChange={handleChange}
                        />
                        <Text style={styles.commonText}>{(commonInputsArray.length - 1 > index) ? "," : ",..."}</Text>
                      </View>
                    })
                  }
                </View>
                <View style={styles.multiplesRows}>
                  <Text style={styles.commonText}>
                    {questionTextLeft[languageIndex]}&nbsp;{inputIntegersArray[0]},&nbsp;{inputIntegersArray[1]}{questionTextRight[languageIndex]}&nbsp;:
                  </Text>
                  <MyInput
                    index={0}
                    setInputValue={setLcmInputArray}
                    focusedIndex={lcmArrayFocusedIndex}
                    inputsArray={lcmInputArray}
                    clickable={false}
                    groupType="lcm"
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
