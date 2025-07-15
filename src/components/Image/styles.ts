import { Colors, Constants } from "@/constants";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 12,
      paddingTop: 12,
    },
    image: {
      borderRadius: 45,
      borderWidth: 1,
      height: 45,
      width: 45,
    },
    imageGredStyle: {
      borderRadius: 12,
      height: '100%',
      width: '100%',
    },
    imageWrapper: {
      borderRadius: 12,
      height: 110,
      margin: 6,
      overflow: 'hidden',
      position: 'relative',
      width: Constants.width/3.5,
    },
    removeButton: {
      backgroundColor: Colors.lightBlack,
      borderRadius: 12,
      padding: 2,
      position: 'absolute',
      right: 4,
      top: 4,
    },
  });