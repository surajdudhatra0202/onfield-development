import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

const PrefManager = {
  setValue: function (key: string, value: unknown) {
    storage.set(key, JSON.stringify(value));
  },

  getValue: async function (key: string) {
    let value = '';
    try {
      value = (await storage.getString(key)) ?? '';
    } catch { }
    return value ? JSON.parse(value) : value;
  },

  deleteItem: function (key: string) {
    storage.delete(key);
  }
}

export default PrefManager;
