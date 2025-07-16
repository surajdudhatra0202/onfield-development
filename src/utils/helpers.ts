import { showMessage } from 'react-native-flash-message';
import { Colors, StorageKey, Strings } from '@constants';
import { Alert, Platform, StatusBar } from 'react-native';
import type { GeoCoordinates, GeoPosition } from 'react-native-geolocation-service';
import Geolocation from 'react-native-geolocation-service';
import { realm } from '../database';
import type { DrawerItem, LoginResponse } from '@/types/global';
import PrefManager from './prefManager';
import { openSettings, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { navigationRef } from '@/navigation/navigationHelper';
import { Routes } from '@/navigation/route';

/** Checks for empty value
 * @param {string} str        The string to check
 * @param {string} fieldName  The fieldname
 * @returns {string}  Returns error string if empty, otherwise returns empty string
 */
export function emptyValidator(str: string, fieldName: string = 'This field'): string {
  const _str = str.trim();
  return !_str ? `${fieldName} can't be empty` : '';
}




/** 
 * Validates email format
 * @param {string} email The email to check
 * @returns {string} Returns an error string if invalid, otherwise an empty string
 */
export function emailValidator(email: string): string {
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
  return reg.test(email.trim()) ? '' : Strings.validMail;
}




/**
 * Checks if a value is considered "empty".
 *
 * Empty means:
 * - null or undefined
 * - empty string (after trim)
 * - empty array
 * - empty object (no own enumerable keys)
 *
 * @param value - The value to check
 * @returns `true` if the value is empty, otherwise `false`
 */
export function isEmptyValue(
  value: string | number | null | undefined | object | unknown[]
): boolean {
  if (value == null) return true; // null or undefined
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false; // numbers and other primitives are not "empty"
}




/** Shows a popup banner message (top of screen)
 * @param {string}        message     The message title
 * @param {string|null}   description The description of the message
 * @param {boolean}       error       Whether the message is an error
 * @returns {void}
 */
export function showPopupMessage(message: string, description: string, error = false): void {
  showMessage({
    message,
    description,
    backgroundColor: !error ? Colors.primary : Colors.red,
    color: Colors.white,
    type: 'default',
    floating: true,
    statusBarHeight: (StatusBar.currentHeight || 0) - 4,
    duration: error ? 8000 : 6000,
  });
}





export async function getLocation(): Promise<GeoCoordinates | null> {
  try {
    let permission;
    if (Platform.OS === 'android') {
      permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
    } else if (Platform.OS === 'ios') {
      permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
    } else {
      return null;
    }

    const result = await request(permission);

    switch (result) {
      case RESULTS.GRANTED:
        // continue
        break;

      case RESULTS.BLOCKED:
        showPopupMessage(Strings.permissionDenied, Strings.permissionDeniedMsg, true);
        openSettings();
        return null;

      case RESULTS.DENIED:
      case RESULTS.LIMITED:
      case RESULTS.UNAVAILABLE:
      default:
        showPopupMessage(Strings.permissionDenied, Strings.permissionDeniedMsg, true);
        return null;
    }

    const coords = await new Promise<GeoCoordinates | null>((resolve) => {
      Geolocation.getCurrentPosition(
        (data: GeoPosition) => resolve(data.coords),
        () => {
          showPopupMessage(Strings.locationTimeout, Strings.locationTimeoutMsg, false);
          resolve(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0,
        },
      );
    });

    return coords;
  } catch (err) {
    console.log('err', err);
    showPopupMessage(Strings.locReqFail, Strings.locationTimeoutMsg, true);
    return null;
  }
}




export const storeAuthData = (data: LoginResponse) => {
  try {
    PrefManager.setValue(StorageKey.userInfo, data.data)

    realm.write(() => {
      // Clear old DrawerMenu if needed
      const oldDrawerData = realm.objects('DrawerMenu');
      realm.delete(oldDrawerData);

      // Save DrawerMenu array
      data.drawer_data.map((item: DrawerItem) => {
        realm.create('DrawerMenu', item);
      });
    });
  } catch (error) {
    console.error('Error storing split data:', error);
  }
};





export function getLoginDetails() {
  const drawerMenu = realm.objects('DrawerMenu');
  return {
    drawerMenu,
  };
};




export function deleteDBData() {
  PrefManager.deleteItem(StorageKey.userInfo)
  realm.write(() => {
    realm.deleteAll();
  });
}


export const isLogout = () => {
  Alert.alert(
    "Confirm Logout",
    "Are you sure ?",
    [
      {
        text: "No",
        onPress: () => console.log('No Pressed'),
        style: 'cancel',
      },
      {
        text: "Yes",
        onPress: () => {
          deleteDBData();
          navigationRef.reset({
            index: 0,
            routes: [
              {
                name: Routes.Login,
                params: { status: 'start' },
              },
            ],
          });
        }
      }
    ],
    { cancelable: true }
  )
};

// export const isLogout = () => {
//   deleteDBData();
//   navigationRef.reset({
//     index: 0,
//     routes: [
//       {
//         name: Routes.Login,
//         params: { status: 'start' },
//       },
//     ],
//   });
// };
