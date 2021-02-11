import React from "react";
import {
  widthPercentageToDP as wp2dp,
  heightPercentageToDP as hp2dp,
} from 'react-native-responsive-screen';
import {
  StyleSheet,
  TextInput,
} from "react-native";
import theme from "../Theme";
import constants from "../Constants";

const breakpoint = constants.breakpoint;

const styles = StyleSheet.create({
  myInputText: {
    width: wp2dp('100%') < breakpoint? wp2dp('12%'): wp2dp('6%'),
    height: wp2dp('100%') < breakpoint? wp2dp('4.8%'): wp2dp('2.4%'),
    fontSize: wp2dp('100%') < breakpoint? wp2dp('4%'): wp2dp('2%'),
    margin: wp2dp('0.5%'),
    textAlign: "right",
    paddingRight: wp2dp('2%'),
  },
});

export const MyInput = ({ index, setInputValue, focusedIndex, inputsArray, setFocusedIndex, clickable, groupType, handleChange, highlighted }) => {

  const inputClick = (e) => {
    if (clickable) {
      setFocusedIndex(index);
    }
  }

  var bgColor = highlighted? theme.colors.myYellow: (index == focusedIndex) ? theme.colors.myPink : theme.colors.myWhite;

  return (
      <TextInput
        style={[{ backgroundColor: bgColor }, styles.myInputText]}
        placeholder={(groupType == "inputInteger")? "1~99": ""}
        value={inputsArray[index] == null || isNaN(inputsArray[index])? "": inputsArray[index] + ""}
        maxLength={3}
        keyboardType="decimal-pad"
        editable={(index == focusedIndex || clickable) ? true : false}
        onFocus={e => { inputClick(e) }}
        onChangeText={e => { handleChange(e, focusedIndex, index, inputsArray, setInputValue, groupType, clickable) }}
      />
  )
}

