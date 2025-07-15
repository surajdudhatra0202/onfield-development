import { Colors } from "@/constants";
import c from "@/style";
import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  modalBackground: {
    alignItems: 'center',
    backgroundColor: Colors.whiteRGB30,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  textB: {
    top: 8,
    ...c.textMedium,
  },
});
