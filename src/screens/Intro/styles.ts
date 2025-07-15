import { StyleSheet } from 'react-native';
import { Colors, Dimens, Fonts } from '@constants';

const styles = StyleSheet.create({
  activeDotStyle: {
    backgroundColor: Colors.primary,
    bottom:40,
    width: 22
  },
  dotStyle: {
    backgroundColor:Colors.grey,
    bottom:40
  },
  image: {
    bottom:-100,
    height:420,
    overflow: 'hidden',
    width:240,
    zIndex: 1,
  },
  imgStyle: {
    height: 60,
    width: '70%',
  },
  introView: {
    alignItems:'center',
    alignSelf: 'center',
    backgroundColor: Colors.primary,
    borderBottomLeftRadius: 210,
    borderBottomRightRadius: 210,
    bottom:18,
    height: '65%',
    justifyContent:'center',
    overflow: 'hidden',
    width: '120%',
    zIndex: 990
  },
  
  shap1Style: {
    height: 110,
    position: 'absolute',
    right: -7,
    top: -9,
    width: 140,
  },
  shap2Style: {
    bottom: 0,
    height: 110,
    left: -2,
    position: 'absolute',
    width: 90,
  },

  slide: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },

  text: {
    color: Colors.darkGrey,
    fontFamily: Fonts.Regular,
    marginTop: 10,
    paddingHorizontal: 14,
    textAlign: 'center',
  },
  title: {
    color: Colors.black,
    fontFamily: Fonts.Bold,
    fontSize: Dimens.f18,
    paddingHorizontal: 18,
    textAlign: 'center',
  },
});

export default styles;
