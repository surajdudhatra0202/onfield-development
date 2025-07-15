import { Colors } from '@constants';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  drawerBelowLogo: {
    backgroundColor: Colors.very_light_gray, 
    height: 0.8,
    marginBottom: 20,
    width: '100%',
  },
  drawerHeader: {
    height: 160,
    width: '100%',
  },
  drawerHeightBorder: {
    borderBottomRightRadius: 30,
    height: 80,
  },
  flex1: {
    backgroundColor: Colors.drawerColor,
    borderBottomRightRadius: 30,
    flex: 1,
  },
  itemStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 52,
    justifyContent: 'space-between',
    marginTop: 8,
    width: '100%',
  },
  listHeader: {
    alignItems: 'center',
    backgroundColor:Colors.drawerButtonColor,
    borderBottomRightRadius: 30,
    bottom: 0,
    flexDirection: 'row',
    height: 80,
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 20,
    position: 'absolute',
    width: '100%',
  },
  logoStyle: {
    alignSelf: 'center',
    height: 80,
    marginBottom: 0,
    marginVertical: 12,
    width: '75%',
  },
  m5: {
    flex: 1,
    marginTop: -5,
  },
  manuItemStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    paddingLeft:12
  },
});
