import { Colors, Constants, Fonts } from "@/constants";
import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
    box: {
      alignItems: 'center',
      height: Constants.height * 0.76,
      justifyContent: 'center',
    },
    txt: {
      color: Colors.black,
      fontFamily: Fonts.Regular,
      fontSize: Constants.wp(4), // Scales dynamically
    },
  });