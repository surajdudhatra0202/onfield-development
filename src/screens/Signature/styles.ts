import { Platform, StyleSheet } from 'react-native';
import { Colors, Dimens, Fonts } from '@constants';

const styles = StyleSheet.create({
  SignatureBoxPannel: {
    borderColor: Colors.primary,
    borderRadius: 16,
    borderStyle: 'dashed',
    borderWidth: 1,
    height: 220,
    left: '-3%',
    top: '20%',
    width: '106%',
  },
  addSignatureTextStyle: {
    color: Colors.primary,
    fontFamily: Fonts.Bold,
    fontSize: Dimens.f16,
    paddingVertical: 10,
  },
  bottomButtonInside: {
    alignSelf: 'center',
    gap: 18,
    marginVertical: 20,
  },
  bottomButtonSection: {
    backgroundColor: Colors.primary,
  },
  createSignatureText: {
    color: Colors.primary,
    fontSize: Dimens.f14,
  },
  penImageSize: {
    alignSelf: 'center',
    height: 90,
    top: '2%',
    width: 90,
  },
  signature: {
    color: Colors.black,
    fontFamily: 'DancingScript-Regular', // <- match your font file name
    fontSize: 36,
  },
  signatureBottomText: {
    alignSelf: 'center',
    borderColor: Colors.medium_light_gray,
    borderTopWidth: 1,
    bottom: 6,
    color: Colors.medium_light_gray,
    fontSize: Dimens.f13,
    justifyContent: 'center',
    position: 'absolute',
    textAlign: 'center',
    width: '92%',
  },
  signatureBox: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderColor: Platform.OS === 'ios' ?  Colors.accent : Colors.white,
    borderWidth: Platform.OS === 'ios' ? 1 : 0,
    borderRadius: Platform.OS === 'ios' ?0:16,
    height: '85%',
    justifyContent: 'flex-start',
    overflow: Platform.OS === 'ios' ? 'visible' : 'hidden', // 'hidden' can suppress shadows
    position: 'relative',
    top: '2%',
    width: '92%',
  
    // iOS shadow
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  
    // Android shadow
    elevation: 5,
  },
  
  signatureSection: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex:1
  },
  signatureText: {
    alignSelf: 'center',
    
  },
  top14: {
    top: '14%',
  },
  topBtnsSignature: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  // Type Signature Container Css
  typeSignatureContainer: {
    
    flexDirection: 'column',
    gap: 8,
    justifyContent: 'center',
  },
});

export default styles;
