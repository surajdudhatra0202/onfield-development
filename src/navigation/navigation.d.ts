import type { DrawerNavigationProp } from '@react-navigation/drawer';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { RootStackParamList } from './route';

type ViewItemNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList, 'ViewItem'>,
  DrawerNavigationProp<RootStackParamList>
>;

type ViewItemRouteProp = RouteProp<RootStackParamList, 'ViewItem'>;

export type NavigationProps = {
  navigation: ViewItemNavigationProp;
  route: ViewItemRouteProp;
};
