import { Colors, Constants } from '@/constants';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  ViewWrapper: {
    borderRadius: 8,

    height: '100%',
    width: Constants.wp(100),
  },
  modalBackground: {
    backgroundColor: Colors.lightBlack,
    flex: 1,
  },

  // confirmation popup

  confirmModalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    width: '80%',
    padding: 24,
    backgroundColor: 'white',
    borderRadius: 12,
    alignItems: 'center',
    gap: 20,
  },

  text: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500',
  },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 20,
  },

  yesBtn: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 28,
    height: 52,
    justifyContent: 'center',
    width: '48%',
  },
  
  noBtn: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.button_blue,
    borderRadius: 28,
    height: 52,
    justifyContent: 'center',
    width: '48%',
  },
});
