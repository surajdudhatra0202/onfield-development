import { Colors, Dimens, Fonts } from "@/constants";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      marginVertical: 10,
      width: '100%',
    },
    eye: {
      right: 30,
    },
    inputText: {
      color: Colors.black,
      fontFamily: Fonts.Regular,
      fontSize: Dimens.f14,
      height: '100%',
      width: '100%',
    },
    inputWrapper: {
      flexDirection: 'row',
      paddingLeft: 6,
    },
    padding6: {
      padding: 6,
    },
  });