import React from "react";
import {
  Button, 
} from 'react-native-paper';
import {
  widthPercentageToDP as wp2dp,
  heightPercentageToDP as hp2dp,
} from 'react-native-responsive-screen';
import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import theme from "../Theme";
import constants from "../Constants";
import { MyInput } from "./InputComponents";

const breakpoint = constants.breakpoint;

const styles = StyleSheet.create({
  centerRowOrColumn: {
    flexDirection: wp2dp('100%') < breakpoint? "column": "row",
    justifyContent: "center",
  },
  centerRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  commonText: {
    fontSize: wp2dp('100%') < breakpoint? wp2dp('4%'): wp2dp('2%'),
    margin: wp2dp('0.5%'),
    textAlign: "center",
  },
  okButton: {
    alignSelf: "center",
  },
});

export const MyQuestion = (props) => {
  const { 
    questionTextLeft,
    setInputIntegersArray,
    inputIntegerFocusedIndex,
    inputIntegersArray,
    setInputIntegerFocusedIndex,
    handleChange,
    questionTextRight,
    okClick
   } = props; 

  return (
    <View style={styles.centerRowOrColumn}>
        {questionTextLeft != "" && <Text style={styles.commonText}>{questionTextLeft}</Text>}
        <View style={styles.centerRow}>
        {
          inputIntegersArray.map((input, index) => {
            return <View key={index} style={styles.centerRow}>
              <MyInput                
                index={index}
                setInputValue={setInputIntegersArray}
                focusedIndex={inputIntegerFocusedIndex}
                inputsArray={inputIntegersArray}
                clickable={true}
                setFocusedIndex={setInputIntegerFocusedIndex}
                groupType="inputInteger"
                handleChange={handleChange}
              />
              {(inputIntegersArray.length - 1 > index) && <Text style={styles.commonText}>,</Text>}
            </View>
          })
        }
        </View>
        { questionTextRight != "" && <Text style={styles.commonText}>{questionTextRight}</Text>}
        <Button
          style={styles.okButton}
          mode="contained"
          color={theme.colors.blue}
          onPress={okClick}
        >OK</Button>
      </View>
  )
}