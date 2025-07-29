import { Dimensions } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

const constants = {
  API_BASE_URL: 'https://manage.onfieldai.com/api/v1/',
  API_BASE_URL_LOCAL: 'https://work.infilon.net/infilon-service/api/v1/',
  IMAGE_URL: 'https://onfieldai.com/wp-content/uploads/2025/04/',
  PANEL_URL: 'https://manage.onfieldai.com/',
  SENTRY_INTERNAL_DSN: '',
  REQUEST_TIMEOUT: 20000 * 1,
  config: {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  },
  height: SCREEN_HEIGHT,
  width: SCREEN_WIDTH,
  wp: widthPercentageToDP,
  hp: heightPercentageToDP,
  scale: Dimensions.get('window').scale,
  fontScale: Dimensions.get('window').fontScale,
  dateFormat: {
    SHORT_MONTH: 'DD MMM, YYYY',
    FULL_DATE: 'dddd, MMMM Do YYYY',   // example: Saturday, April 19th 2025
    TIME_ONLY: 'hh:mm A',              // example: 03:45 PM
    ISO: 'YYYY-MM-DD',                 // example: 2025-04-19
    DATE_FORMAT: 'DD/MM/YYYY',
    DATE_TIME_FORMAT: 'DD/MM/YYYY h:mm:ss a',
  }
};

export default constants;
