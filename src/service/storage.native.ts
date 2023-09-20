import * as SecureStore from 'expo-secure-store';

// add multiSet multiGet

export const saveToStorage = async (key: string, value: string) => {
    await SecureStore.setItemAsync(key, value);
}
export const getFromStorage = async (key: string) => {
    return await SecureStore.getItemAsync(key)
}
export const removeFromStorage = async (key: string) => {
    return await SecureStore.deleteItemAsync(key)
}