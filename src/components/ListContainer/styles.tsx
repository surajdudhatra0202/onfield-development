import { StyleSheet } from 'react-native';
import { Fonts, Dimens, Colors } from '@constants';

const styles = StyleSheet.create({
  cardMain: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    gap: 8,
  },
  imagebg: {
    opacity:0.6,
    position: 'absolute',
    right: -35,
    width: 100,
  },
  imgBackgroundStyle: {
    height: '100%',
    minHeight: 100,
    opacity: 0.8,
    position: 'absolute',
    right: -30,
    width: 120,
  },

  innerCardSection: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: '1%',
    width: '95%',
  },
  leaveReasonText: {
    color: Colors.darkGrey,
    flexShrink: 1,
    flexWrap: 'wrap',
    fontFamily: Fonts.Medium,
    fontSize: Dimens.f12,
  },
  viewStyleNew: {
    alignSelf: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    elevation: 3,
    flexDirection: 'row',
    gap: 10,
    height: 'auto',
    justifyContent: 'flex-start',
    marginTop: '2.5%',
    minHeight: 80,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    width: '95%',
  },
});

export default styles;
