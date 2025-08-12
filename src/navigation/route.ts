// src/navigation/routes.ts

import SplashScreen from '../screens/Intro/splash';
import IntroScreen from '../screens/Intro/intro';
import LoginScreen from '../screens/Auth/login';
import SignUpScreen from '../screens/Auth/signUp';
import PaymentScreen from '../screens/Auth/payment';

import HomeScreen from '../screens/Home';

import FormStack from "../screens/Home/Form";
import DetailsScreen from '../screens/Home/Form/details';
import FormScreen from '../screens/Home/Form/form';
import AttachmentScreen from '../screens/Home/Form/attachment';

import DayStatusScreen from '../screens/Day/dayStatus';

import RequestLeaveScreen from '../screens/Leaves/requestLeave';
import LeaveListScreen from '../screens/Leaves/leaveList';

import OrderScreen from '../screens/Order';
import OrderDetailScreen from '../screens/Order/orderDetails';
import AddOrderScreen from '../screens/Order/addOrder';
import AddNewCallScreen from '../screens/Call';
import ViewItemsScreen from '../screens/ViewItem';

import NotificationScreen from '../screens/Notification'

import CallTransferScreen from '../screens/Call/callTransfer';
import SalesScreen from '../screens/Sales'
import AddCompanyScreen from '../screens/Sales/companyForm'

import UpdateSignatureScreen from '../screens/Signature/updateSignature';

export enum Routes {
  Splash = 'Splash',
  Intro = 'Intro',
  Login = 'Login',
  SignUp = 'SignUp',
  ForgotPassword = 'ForgotPassword',
  Payment = 'Payment',
  Home = 'Home',

  FormStack = 'FormStack',

  Details = 'Details',
  Form = 'Form',
  Attachment = 'Attachment',

  Notification = 'Notification',
  DayStatus = 'DayStatus',
  RequestLeave = 'RequestLeave',
  LeaveList = 'LeaveList',
  Order = 'Order',
  OrderDetails = "OrderDetails",
  AddOrder = 'AddOrder',
  AddNewCall = 'AddNewCall',
  ViewItems = 'ViewItems',
  UpdateSignature = 'UpdateSignature',

  CallTransfer = 'CallTransfer',
  Sales = 'Sales',
  AddCompany = 'AddCompany'
}

export const RouteScreens = {
  [Routes.Splash]: SplashScreen,
  [Routes.Intro]: IntroScreen,
  [Routes.Login]: LoginScreen,
  [Routes.SignUp]: SignUpScreen,
  // [Routes.ForgotPassword]: For,
  [Routes.Payment]: PaymentScreen,
  [Routes.Home]: HomeScreen,
  [Routes.FormStack]: FormStack,

  [Routes.Details]: DetailsScreen,
  [Routes.Form]: FormScreen,
  [Routes.Attachment]: AttachmentScreen,

  [Routes.DayStatus]: DayStatusScreen,
  [Routes.RequestLeave]: RequestLeaveScreen,
  [Routes.LeaveList]: LeaveListScreen,
  [Routes.Order]: OrderScreen,
  [Routes.OrderDetails]:OrderDetailScreen,
  [Routes.AddOrder]: AddOrderScreen,
  [Routes.AddNewCall]: AddNewCallScreen,
  [Routes.ViewItems]: ViewItemsScreen,
  [Routes.UpdateSignature]: UpdateSignatureScreen,

  [Routes.CallTransfer]: CallTransferScreen,
  [Routes.Sales]: SalesScreen,
  [Routes.AddCompany]: AddCompanyScreen,

  [Routes.Notification]: NotificationScreen
};

export type ViewItemData = {
  name: string,
  nav: string,
  type: string,
  icon: string,
};

export type RootStackParamList = {
  [Routes.Splash]: undefined,
  [Routes.Intro]: undefined,
  [Routes.Login]: undefined,
  [Routes.SignUp]: undefined,
  [Routes.Payment]: undefined,
  [Routes.Home]: undefined,
  [Routes.FormStack]: { formId: number },

  [Routes.Details]: undefined,
  [Routes.Form]: undefined,
  [Routes.Attachment]: undefined,
  [Routes.Notification]: undefined,
  [Routes.DayStatus]: undefined,
  [Routes.RequestLeave]: undefined,
  [Routes.LeaveList]: undefined,
  [Routes.Order]: undefined,
  [Routes.OrderDetails] : undefined,
  [Routes.AddOrder]: undefined,
  [Routes.AddNewCall]: undefined,
  [Routes.ViewItems]:    {
    data?: ViewItemData,
  },
  [Routes.UpdateSignature]: { from: string },

  [Routes.CallTransfer]: {callData?: any},
  [Routes.Sales]: undefined,
  [Routes.AddCompany]: undefined,
};