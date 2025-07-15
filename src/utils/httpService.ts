import { Constants } from '@constants';

const BaseUrl = __DEV__ ? Constants.API_BASE_URL : Constants.API_BASE_URL;

export const APP_VERSION = BaseUrl + 'app-version';

export const PLANS = BaseUrl + 'plans';
export const FAQS = BaseUrl + 'faqs';
export const LOGIN = BaseUrl + 'login';
export const REGISTER = BaseUrl + 'register';
export const PAYMENT = BaseUrl + 'payment';
export const DELETE = BaseUrl + 'delete';

export const SOCIAL_LOGIN = BaseUrl + 'social-login';

export const CALLS = BaseUrl + 'calls';
export const CALLDETAIL = BaseUrl + 'call-detail';
export const CALLS_SAVE = BaseUrl + 'call-save';
export const START_WORK = BaseUrl + 'start-work';
// export const CALLS_SAVE = BaseUrl + 'call-save';

export const CHAT = BaseUrl + 'chat';
export const CHAT_CLEAR = BaseUrl + 'chat/clear';
export const CHAT_ADD = BaseUrl + 'chat/add';

export const FIELDS = BaseUrl + 'fields';

export const LEAVES = BaseUrl + 'leaves';
export const LEAVES_ADD = BaseUrl + 'leave-add';

export const CHECK_STATUS = BaseUrl + 'check-today-status';
export const START_DAY = BaseUrl + 'start-day';
export const END_DAY = BaseUrl + 'end-day';

export const SIGNATURE = BaseUrl + 'signature';
export const UPLOAD_SIGNATURE = BaseUrl + 'upload-signature';

export const ITEMS = BaseUrl + 'items';

export const CALLFORM = BaseUrl + 'call-form';
export const CUSTOMERS_DETAIL = BaseUrl + 'customers-detail';
export const ADD_CALL = BaseUrl + 'call/add';

export const CATEGORIES = BaseUrl + 'categories';
export const SAVE_ORDER = BaseUrl + 'order/save';
export const ORDER = BaseUrl + 'order';
export const ORDER_DETAILS = BaseUrl + 'order/detail';
