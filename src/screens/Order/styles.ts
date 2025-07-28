import { StyleSheet } from 'react-native';
import { Colors, Dimens, Fonts } from '@constants';
import c from '@/style';
const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.button_blue,
    borderRadius: 12.5,
    height:20,
    padding: 5,
    width:20,
  },
  container: {
    alignItems: 'center',
    bottom: -3,
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
  },
  input: {
    alignItems:'center',
    color:Colors.drawerColor,
    fontFamily:Fonts.Medium,
    fontSize: Dimens.f14,
    height: '100%',
    justifyContent:'center',
    lineHeight:4,
    width: 45,
  },
  inputStyle: {
    alignSelf: 'center',
    backgroundColor: Colors.white,
    borderRadius: 4,
    height: 42,
    width: '92%',
  },
  listImg:{
    borderTopRightRadius:18,
    height:'100%',
    objectFit:'contain',
    position:'absolute',
    right:-10,
    top:-5,
    width:'18%',
  },
  listStyle: {
     ...c.viewStyle,
     width: '99%',
     padding: 8
  },
  listView:{
    borderRadius:18,
    marginVertical:5,
    paddingHorizontal:15,
    paddingVertical:15,
    position:'relative',
  },
  logoStyle: {
    height: 60,
    width: 160,
  },
});
export default styles;