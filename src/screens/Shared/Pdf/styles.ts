import { Colors } from '@/constants';
import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  pdfStyle: {
    width: Dimensions.get('window').width * 0.95,
    height: Dimensions.get('window').height * 0.85,
    borderRadius: 6,
  },

  pdfContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  pdfViewStyle: {
    borderRadius: 8,
    elevation: 1,
    overflow: 'hidden',
  },

  topActions: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    gap: 12,
  },

  closeBtn: {
    backgroundColor: Colors.light,
    borderRadius: '50%',
    padding: 3,
    marginBottom: 7,
  },
});

export default styles;
