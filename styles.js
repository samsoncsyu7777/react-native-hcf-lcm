import {
  StyleSheet,
} from "react-native";
import {
  widthPercentageToDP as wp2dp,
  heightPercentageToDP as hp2dp,
} from 'react-native-responsive-screen';
import theme from "./Theme";
import constants from "./Constants";

const breakpoint = constants.breakpoint;

const styles = StyleSheet.create({
  centerRow: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: 'wrap',
  },
  commonText: {
    fontSize: wp2dp('100%') < breakpoint? wp2dp('4%'): wp2dp('2%'),
    margin: wp2dp('0.5%'),
  },
  divisionColomn: {
    margin: wp2dp('2%'),
    width: wp2dp('100%') < breakpoint? wp2dp('40%'): wp2dp('30%'),
  },
  divisionInsideColumn: {
    width: wp2dp('100%') < breakpoint? wp2dp('40%'): wp2dp('30%'),
  },
  divisionInsideWideColumn: {
    width: wp2dp('100%') < breakpoint? wp2dp('40%'): wp2dp('40%'),
  },
  divisionRow: {
    flexDirection: "row",
    flexWrap: 'wrap',
    justifyContent: "flex-end",
  },
  factorsRows: {
    flexDirection: "row",
    flexWrap: 'wrap',
    alignItems: "center",
    width: wp2dp('100%') < breakpoint? wp2dp('95%'): wp2dp('80%'),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  multiplesRows: {
    flexDirection: "row",
    flexWrap: 'wrap',
    width: wp2dp('100%') < breakpoint? wp2dp('95%'): wp2dp('80%'),
  },
  card: {
    borderRadius: 0,
  },
  completeButton: {
    height: wp2dp('100%') < breakpoint? wp2dp('6%'): wp2dp('3%'),
    width: wp2dp('100%') < breakpoint? wp2dp('14%'): wp2dp('7%'),
    fontSize: wp2dp('100%') < breakpoint? wp2dp('2%'): wp2dp('1%'),
    margin: wp2dp('0.5%'),
  },
  completeButton2: {

  },
});

export default styles;