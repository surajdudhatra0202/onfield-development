import { Colors, Constants } from "@/constants";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    ViewWrapper: {
      borderRadius: 8,
      
      height: '100%',
      width: Constants.wp(100),
    },
    modalBackground: {
      backgroundColor: Colors.lightBlack,
      flex: 1,
    },
  });