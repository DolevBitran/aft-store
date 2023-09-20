import AsyncStorage from '@react-native-async-storage/async-storage';

// add multiSet multiGet

export const saveToStorage = async (key: string, value: string) => {
    await AsyncStorage.setItem(key, value);
}

export const getFromStorage = async (key: string) => {
    return await AsyncStorage.getItem(key)
}

export const removeFromStorage = async (key: string) => {
    return await AsyncStorage.removeItem(key)
}