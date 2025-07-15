import { Colors, Dimens, Fonts } from "@/constants";
import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
    iconTextStyle: {
      alignSelf: 'flex-start',
      color: Colors.white,
      fontFamily: Fonts.Bold,
      fontSize: Dimens.f16,
      paddingLeft: 16,
      textAlign: 'left',
      width: '100%',
    },
    iconViewStyle: {
      alignItems: 'center',
      backgroundColor: Colors.transparentWhite,
      borderRadius: 25,
      height: '100%',
      justifyContent: 'center',
      position: 'absolute',
      right: 0,
      width: 50,
    },
    textStyle: {
      color: Colors.white,
      fontFamily: Fonts.Bold,
      fontSize: Dimens.f16,
    },
  });
  