import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
  try {
    const data = typeof value === 'string' ? value : JSON.stringify(value);
    await AsyncStorage.setItem(key, data);
  } catch (e) {
    console.error('Store error', e);
  }
};

export const getData = async (key) => {
  try {
    const val = await AsyncStorage.getItem(key);
    return val ? JSON.parse(val) : null;
  } catch (e) {
    console.error('Get error', e);
    return null;
  }
};

export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error('Remove error', e);
  }
};
