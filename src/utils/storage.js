import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Safely stores a value in AsyncStorage by always JSON stringifying it.
 */
export const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value); // ✅ Always stringify
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error('Store error:', e);
  }
};

/**
 * Safely retrieves and parses a value from AsyncStorage.
 */
export const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    console.log(`🔍 Raw value for key "${key}":`, jsonValue);
    return jsonValue != null ? JSON.parse(jsonValue) : null; 
  } catch (e) {
    console.error(` JSON parse error on key "${key}":`, e.message);
    return null;
  }
};

/**
 * Removes a key from AsyncStorage.
 */
export const removeData = async (key) => {
  try { 
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error('Remove error:', e);
  }
};
