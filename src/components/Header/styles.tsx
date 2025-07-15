import { StyleSheet } from 'react-native';
import { Colors, Dimens, Fonts } from '@constants';

export const styles = StyleSheet.create({
  formHeaderStyle: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    height: 100,
    justifyContent: 'space-between',
    width: '100%',
  },
  formIconStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    left: 12,
    width: 'auto',
  },
  headerInnerStyle: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerStyle: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    height: 52,
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    width: '100%',
  },
  iconRightStyle: {
    alignItems: 'center',
    height: 26,
    justifyContent: 'center',
    width: 'auto',
  },
  iconStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    bottom: -20,
    height: 120,
    position: 'absolute',
    right: -8,
    width: 100,
  },
  logoStyle: {
    height: 20,
    width: 200,
  },
  titleStyle: {
    color: Colors.white,
    fontFamily: Fonts.Bold,
    fontSize: Dimens.f16,
    paddingHorizontal: 16,
  },
});
