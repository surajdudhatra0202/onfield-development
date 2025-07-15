import { CommonActions, createNavigationContainerRef } from '@react-navigation/native';
import { RootStackParamList } from './route';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();
export function navigate(name: string, params?: unknown): void {
  if (navigationRef.isReady()) {
  // @ts-expect-error: navigation typing is too strict for dynamic route names
  navigationRef.navigate(name, params);
  }
}

const toLogin = CommonActions.reset({
  index: 0,
  routes: [{ name: 'Login' }],
});

const toSignUp = CommonActions.reset({
  index: 0,
  routes: [{ name: 'SignUp' }],
});

export { toLogin, toSignUp };
