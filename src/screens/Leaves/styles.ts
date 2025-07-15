import { StyleSheet } from 'react-native';
import { Colors, Dimens, Fonts } from '@constants';

const styles = StyleSheet.create({
  daysView: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.light_pastel_blue,
    borderColor: Colors.light_pastel_blue,
    borderRadius: 50,
    borderWidth: 1.4,
    color: Colors.primary,
    height: 30,
    justifyContent: 'center',
    width: 92,
  },
  numberDaySec: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  textMediumPrimaryLeave: {
    color: Colors.primary,
    fontFamily: Fonts.Regular,
    fontSize: Dimens.f14,
  },
});

export default styles;
