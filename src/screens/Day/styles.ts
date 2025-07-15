import { StyleSheet } from 'react-native';
import { Colors, Dimens, Fonts } from '@constants';

const styles = StyleSheet.create({
  amPmText: {
    color: Colors.white,
    fontFamily: Fonts.SemiBold,
    fontSize: Dimens.f12,
    left: -4,
    position: 'relative',
    right: 12,
    top: 4,
  },
  buttonStylePayment: {
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: Colors.mediumGrey,
    borderRadius: 50,
    borderWidth: 1,
    bottom: 15,
    height: 50,
    justifyContent: 'center',
    width: '70%',
  },
  dayBgImageStyle: {
    height: '100%',
    marginTop: -2,
    width: '100%',
  },
  lowerText: {
    color: Colors.white,
    textAlign: 'center',
  },
  middleTimeSection: {
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'column',
    height: 'auto',
    justifyContent: 'center',
    position: 'absolute',
    top: 210,
    width: 'auto',
    zIndex: 1,
  },
  outerRingStyle: {
    alignSelf: 'center',
    height: 340,
    objectFit: 'contain',
    position: 'relative',
    top: 20,
    width: '100%',
  },
  timePageMain: {
    height: '100%',
    position: 'absolute',
    top: '8%',
    width: '100%',
  },
  // Image Container
});

export default styles;
