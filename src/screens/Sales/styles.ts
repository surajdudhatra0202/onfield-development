import { Colors, Dimens, Fonts } from '@/constants';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  viewContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 5,
    alignItems: 'flex-start',
  },

  textTitle: {
    width: '25%',
    color: Colors.primary,
    fontFamily: Fonts.Medium,
  },

  textField: {
    color: Colors.black,
    fontFamily: Fonts.Medium,
    flexWrap: 'wrap',
    flexShrink: 1,
  },

  dropDownStyle: {
    borderRadius: 8,
    borderWidth: 1,
    height: 50,
    paddingHorizontal: 8,
    borderColor: Colors.grey,
    flex: 1,
  },

  callContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },

  topActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
  },

  closeBtn: {
    backgroundColor: Colors.light_gray,
    borderRadius: '50%',
    padding: 3,
  },

  headerText: {
    color: Colors.black,
    fontFamily: Fonts.Bold,
    fontSize: Dimens.f16,
  },

  tableHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: Colors.granite_gray,
    paddingBottom: 5,
  },

  headText: {
    fontFamily: Fonts.SemiBold,
  },

  dateTable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: Colors.light_gray,
  },
});

export default styles;
