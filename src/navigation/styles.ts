import { StyleSheet } from 'react-native';
import { Colors } from '@constants';

const styles = StyleSheet.create({
  ImageHeightWidth: {
    height: 200,
    width: '100%',
  },
  freeTrialTextStyle: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 4,
    flex: 0.55,
    marginTop: -20,
    paddingTop: 18,
  },
  gap12: {
    gap: 12,
  },
  headerBelowStyle: {
    alignItems: 'center',
    backgroundColor: Colors.royal_blue,
    flex: 0.45,
    justifyContent: 'center',
  },
  imageViewStyle: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 13,
    height: 25,
    justifyContent: 'center',
    width: 25,
  },
});

export default styles;
