import { StyleSheet } from 'react-native';
import { Colors, Dimens, Fonts } from '@constants';
import c from '@style';

const styles = StyleSheet.create({
  backIcon: {
    alignItems: 'center',
    height: 30,
    justifyContent: 'center',
    left: 12,
    overflow: 'visible',
    top: 12,
    width: 30,
    zIndex: 999,
  },
  bgTag: {
    backgroundColor: Colors.accent,
    borderRadius: 5,
    bottom: 24,
    color: Colors.primary,
    fontFamily: Fonts.Bold,
    fontSize: Dimens.f10,
    left: 0,
    paddingHorizontal: 10,
    paddingVertical: 3,
    position: 'relative',
    width: '50%',
  },
  buttonStyle: {
    ...c.buttonStyle,
    width: '100%',
  },
  cardInside: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checkBtn: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  choosePlanText: {
    color: Colors.black,
    fontFamily: Fonts.Bold,
    fontSize: Dimens.f26,
    marginBottom:32,
    textAlign:'center'
  },
  faqCard: {
    borderColor: Colors.darkGrey,
    borderRadius: 10,
    borderWidth: 1.2,
    gap: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  faqRowStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  flexRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
    paddingBottom: 8,
    paddingHorizontal: 0,
    width: '90%',
  },
  flexRowSpaceBetween: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'space-between',
    paddingBottom: 8,
    paddingHorizontal: 0,
  },
  fontSizePerMonth: {
    color: Colors.black,
    fontFamily: Fonts.Bold,
    fontSize: Dimens.f12,
  },
  googleButtonStyle: {
    alignItems: 'center',
    borderColor: Colors.vibrant_blue,
    borderRadius: 22.5,
    borderWidth: 1.8,
    height: 45,
    justifyContent: 'center',
    width: 45,
  },
  innerLowerCardTextFaq: {
    color: Colors.labelColor,
    fontFamily:Fonts.Regular,
    fontSize: Dimens.f12
  },
  label: {
    color: Colors.darkGrey,
    fontFamily: Fonts.Regular,
    fontSize: Dimens.f14,
    textAlign: 'center',
  },
  logoStyle: {
    alignSelf: 'center',
    height: 42,
    marginTop: 42,
    width: 220,
  },
  marginH20: {
    marginHorizontal: 20,
    marginTop: 30,
  },
  notAcTextStyle: {
    color: Colors.granite_gray,
    fontFamily: Fonts.Regular,
    fontSize: Dimens.f14,
    textAlign: 'center',
  },
  oneTimeSetupText: {
    color: Colors.black,
    fontFamily: Fonts.Bold,
    fontSize: Dimens.f12,
    textAlign: 'center',
  },
  priceTextSize: {
    color: Colors.black,
    fontFamily: Fonts.Bold,
    fontSize: Dimens.f12,
    paddingVertical: 10,
  },
  priceValueSize: {
    color: Colors.black,
    fontFamily: Fonts.Bold,
    fontSize: Dimens.f14,
  },
  rowCenter: {
    ...c.flexRow,
    alignSelf: 'center',
    marginBottom: 12,
    marginTop: 18,
  },
  shap1Style: {
    height: 90,
    position: 'absolute',
    right: -7,
    top: -9,
    width: 90,
  },
  shap2Style: {
    bottom: 0,
    height: 90,
    left: -6,
    position: 'absolute',
    width: 80,
  },
  signUpBtn: {
    gap: 8,
    marginTop: 12,
  },

  textBold22: {
    color: Colors.accent,
    fontFamily: Fonts.Bold,
    fontSize: Dimens.f16,
    marginTop: 8,
    textAlign: 'center',
  },
  textButtonStyle: {
    color: Colors.accent,
    fontFamily: Fonts.SemiBold,
    fontSize: Dimens.f14,
    paddingHorizontal: 8,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default styles;
