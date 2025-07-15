import { Platform, StyleSheet } from 'react-native';
import { Colors, Constants, Dimens, Fonts } from '@constants';

const c = StyleSheet.create({
  // /* @ts-ignore */
  alignSelf: {
    alignSelf: 'center',
  },
  botFlex: {
    backgroundColor: Colors.transparent,
    flex: 1,
    justifyContent: 'flex-end',
  },
  botHeaderStyle: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    height: 52,
    justifyContent: 'center',
    width: '100%',
  },
  botViewStyle: {
    alignSelf: 'center',
    backgroundColor: Colors.chatBg,
    borderRadius: 6,
    bottom: 100,
    height: Constants.height * 0.76,
    width: '96%',
    // elevation: 1,
  },
  boxStyle: {
    alignSelf: 'center',
    backgroundColor: Colors.white,
    borderRadius: 8,
    borderWidth: 1.5,
    flexDirection: 'column',
    height: 'auto',
    justifyContent: 'center',
    padding: 10,
    width: '100%',
  },
  buttonNextStyle: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 28,
    height: 52,
    justifyContent: 'center',
    width: '48%',
  },
  buttonRowStyle: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 8,
    paddingHorizontal: 12
  },
  buttonSaveStyle: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.accent,
    borderRadius: 28,
    height: 52,
    justifyContent: 'center',
    width: '48%',
  },
  buttonStyle: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 28,
    height: 52,
    justifyContent: 'center',
    width: '90%',
  },
  colorWhite: {
    backgroundColor: Colors.white
  },
  drawerTitle: {
    color: Colors.black,
    fontFamily: Fonts.Regular,
    fontSize: Dimens.f14,
    marginLeft: -14,
  },
  dropdown: {
    borderColor: Colors.grey,
    borderRadius: 8,
    borderWidth: 0.5,
    height: 50,
    paddingHorizontal: 8,
  },
  errorStyle: {
    color: Colors.red,
    fontFamily: Fonts.Regular,
    fontSize: Dimens.f14,
    paddingHorizontal: 10,
  },
  flex1: {
    flex: 1,
  },
  flex1P: {
    backgroundColor: Colors.primary,
    flex: 1,
  },
  flex1W: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  flex1WHorizontal: {
    backgroundColor: Colors.white,
    flex: 1,
    paddingHorizontal: 8,
  },
  flexRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  flexRowSpaceBetweenPadding0: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flexRowSpaceBetweenPadding0W75: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '75%',
  },
  flexRowSpaceBetweenPadding12: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },

  flexRowStart: {
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  flexRowWrap: {
    alignContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  flexWrap: {
    flex: 1,
    flexWrap: 'wrap',
  },
  floatingCrossStyle: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 25,
    bottom: 24,
    elevation: 1,
    height: 50,
    justifyContent: 'center',
    position: 'absolute',
    right: 12,
    width: 50,
  },
  floatingStyle: {
    alignItems: 'center',
    backgroundColor: Colors.primaryDark,
    borderRadius: 25,
    bottom: 24,
    elevation: 1,
    height: 50,
    justifyContent: 'center',
    position: 'absolute',
    right: 12,
    width: 50,
  },
  formHeaderViewStyle: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 18,
  },

  h100: {
    height: 100,
  },
  h12: {
    height: 12,
  },
  h26: {
    height: 26,
  },

  iconStyle: {
    height: 20,
    width: 20,
  },
  img16: {
    height: 16,
    width: 16,
  },
  img20: {
    height: 20,
    tintColor: Colors.darkGrey,
    width: 20,
  },
  img20Black: {
    height: 20,
    tintColor: Colors.black,
    width: 20,
  },
  img25: {
    height: 25,
    width: 25,
  },
  img30: {
    height: 30,
    width: 30,
  },
  img36: {
    height: 36,
    width: 36,
  },
  img70: {
    height: 70,
    width: 70,
  },
  inputSearchStyle: {
    fontSize: Dimens.f16,
    height: 40,
  },
  inputStyle: {
    alignSelf: 'center',
    height: 52,
    width: '100%',
  },
  lazyRoot: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  lazyView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    position: 'absolute',
  },
  listFormStyle: {
    flex: 1,
    marginVertical: 8,
    paddingHorizontal: 4,
  },
  margin8: {
    margin: 8,
  },
  marginRight12: {
    marginRight: 12,
  },
  marginRight5: {
    marginRight: 5,
  },
  marginT24: {
    marginTop: 24,
  },
  marginT6: {
    marginTop: 6,
  },
  marginV12: {
    marginVertical: 12,
  },
  modalRoot: {
    alignItems: 'center',
    backgroundColor: Colors.red,
    flex: 1,
    justifyContent: 'center',
  },
  navTitle: {
    color: Colors.black,
    fontFamily: Fonts.SemiBold,
    fontSize: Dimens.f18,
    marginVertical: 12,
    paddingHorizontal: 30,
    textAlign: 'center',
  },
  placeholderStyle: {
    fontSize: Dimens.f16,
  },

  rightIconStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    position: 'absolute',
    right: 10,
  },
  rightIconStyleRight0: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    position: 'absolute',
    right: 0,
  },
  rootCenter: {
    alignItems: 'center',
    color: Colors.white,
    flex: 1,
    justifyContent: 'center',
  },
  rowCenterSpaceBetween20: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  searchInputStyle: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.white,
    borderRadius: 40,
    flexDirection: 'row',
    height: 40,
    width: '92%',
  },
  selectedTextStyle: {
    fontSize: Dimens.f16,
  },
  setupTextStyle: {
    color: Colors.black,
    fontFamily: Fonts.Bold,
    fontSize: Dimens.f12,
    textAlign: 'center',
    top: 2,
  },
  textBold: {
    color: Colors.black,
    fontFamily: Fonts.Bold,
    fontSize: Dimens.f16,
  },
  textBold14: {
    color: Colors.black,
    fontFamily: Fonts.Bold,
    fontSize: Dimens.f14,
  },
  textBoldWhite: {
    color: Colors.white,
    fontFamily: Fonts.Bold,
    fontSize: Dimens.f16,
  },
  textMedium: {
    color: Colors.black,
    fontFamily: Fonts.Regular,
    fontSize: Dimens.f16,
  },
  textMedium14: {
    color: Colors.black,
    fontFamily: Fonts.Regular,
    fontSize: Dimens.f14,
  },
  textMediumPrimary: {
    color: Colors.primary,
    fontFamily: Fonts.Regular,
    fontSize: Dimens.f16,
  },
  textRegular: {
    color: Colors.black,
    fontFamily: Fonts.Regular,
    fontSize: Dimens.f16,
  },
  textRegular14: {
    color: Colors.black,
    fontFamily: Fonts.Regular,
    fontSize: Dimens.f14,
  },
  textRegular14White: {
    color: Colors.white,
    fontFamily: Fonts.Regular,
    fontSize: Dimens.f14,
  },
  textRegularGray: {
    color: Colors.darkGrey,
    fontFamily: Fonts.Regular,
    fontSize: Dimens.f16,
  },
  textRegularGray14: {
    color: Colors.darkGrey,
    fontFamily: Fonts.Regular,
    fontSize: Dimens.f14,
  },
  textRegularWhite: {
    color: Colors.white,
    fontFamily: Fonts.Regular,
    fontSize: Dimens.f16,
  },
  textSemiBold: {
    color: Colors.black,
    fontFamily: Fonts.SemiBold,
    fontSize: Dimens.f16,
  },
  textSemiBold12: {
    color: Colors.black,
    fontFamily: Fonts.SemiBold,
    fontSize: Dimens.f12,
  },

  textSemiBold14: {
    color: Colors.black,
    fontFamily: Fonts.SemiBold,
    fontSize: Dimens.f14,
  },
  textSemiBold14White: {
    color: Colors.white,
    fontFamily: Fonts.SemiBold,
    fontSize: Dimens.f14,
  },

  textSemiBold15: {
    color: Colors.black,
    fontFamily: Fonts.SemiBold,
    fontSize: Dimens.f14,
  },
  textTitleStyle: {
    bottom: 4,
    color: Colors.primary,
    fontFamily: Fonts.Bold,
    fontSize: Dimens.f14,
  },

  triangle: {
    backgroundColor: Colors.transparent,
    borderBottomColor: Colors.chatBg, // Change color as needed
    borderBottomWidth: 16,
    borderLeftColor: Colors.transparent,
    borderLeftWidth: 10,
    borderRightColor: Colors.transparent,
    borderRightWidth: 10,
    bottom: -15,
    height: 0,
    position: 'absolute',
    right: 16,
    transform: [{ rotate: '180deg' }], // Inverted triangle
    width: 0,
  },

  valueText: {
    fontFamily: Fonts.Medium,
    textAlign: 'left',
    width: '58%',
  },
  viewRootLisStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  viewStyle: {
    alignSelf: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginTop: '2.5%',
    width: '95%',
    ...Platform.select({
      ios: {
        // iOS specific shadow
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 2, // Android shadow
        overflow: 'hidden',
      }
    }),
  },
  width100: {
    width: '100%'
  }
});

export default c;
