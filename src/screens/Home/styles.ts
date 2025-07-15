import { StyleSheet } from 'react-native';
import { Colors, Dimens, Fonts } from '@constants';
import c from '@style';

const styles = StyleSheet.create({
  botHeaderImageSize: {
    height: 28,
    width: '52%',
  },
  bottomSheetStyle: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    elevation: 0, 
  },
  buttonStyle: {
    ...c.buttonStyle,
    bottom: 0,
    position: 'absolute'
  },
  buttonViewStyle: {
    backgroundColor: Colors.white,
    height: 70
  },
  cardShadow: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    elevation: 2,
    marginTop: 12,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  chatContainerView: {
    alignItems: 'center',
    backgroundColor: Colors.chatBg,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: 22,
    justifyContent: 'center',
    width: '100%',
  },
  checkBoxTextStyle: {
    color: Colors.darkGrey,
    fontFamily: Fonts.Regular,
    fontSize: Dimens.f14,
    marginLeft: 4,
  },
  dotLoaderStyle: {
    alignSelf: 'flex-start',
    height: 36,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  flexRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  headingText: {
    color: Colors.primary,
    fontFamily: Fonts.SemiBold,
    fontSize: Dimens.f14,
  },
  innerChatContainer: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    color: Colors.black,
    elevation: 1,
    fontFamily: Fonts.Regular,
    fontSize: Dimens.f16,
    height: 46,
    paddingHorizontal: 12,
    width: '86%',
  },
  innerRadioButton: {
    backgroundColor: Colors.primary,
    borderRadius: 7,
    height: 10,
    width: 10,
  },
  innerchatContainerView: {
    gap: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: '100%',
  },
  inputOffmargin: {
    marginVertical: 6,
  },
  label: {
    backgroundColor: Colors.white,
    fontSize: Dimens.f14,
    left: 22,
    paddingHorizontal: 8,
    position: 'absolute',
    top: 8,
    zIndex: 999,
  },
  modalRowStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
    paddingHorizontal: 16,
    width: '100%',
  },
  modalStyle: {
    ...c.formHeaderViewStyle,
    paddingVertical: 0,
  },
  radioButton: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 10,
    height: 20,
    justifyContent: 'center',
    width: 20,
  },
  radioViewRow: {
    ...c.flexRow,
    marginVertical: 8,
  },
  rowButtonStyle: {
    alignItems: 'center',
    borderColor: Colors.mediumGrey,
    borderRadius: 8,
    borderWidth: 1.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: 16,
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  seperatorStyle: {
    backgroundColor: Colors.white,
    elevation: 1,
    height: 5,
    marginVertical: 16,
    width: '106%'
  },
  signatureStyle: {
    height: 220,
    top:18,
    width: '70%'
  },
  signatureViewStyle: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.light_gray,
    borderRadius: 8,
    height: 230,
    justifyContent: 'center',
    marginTop: 8,
    width: '92%'
  },
  //remove
  viewHeader: {
    alignItems: 'flex-start',
    alignSelf: 'center',
    backgroundColor: Colors.skyColor,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 12,
    width: '100%',
  },
  viewStyle1: {
    alignSelf: 'center',
    marginTop: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    width: '98%',
  },
  width48: {
    marginVertical: 12,
    width: '48%',
  },
  width50: {
    flexDirection: 'row',
    marginTop: 8,
    width: '50%'
  },

});

export default styles;
