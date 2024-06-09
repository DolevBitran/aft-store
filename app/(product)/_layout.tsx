// import React, { useCallback } from 'react';
// import { useFonts } from 'expo-font';
// import * as SplashScreen from 'expo-splash-screen';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider } from '@react-navigation/native';
// import Header from 'components/Header';
// import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
// import { Provider, useDispatch, useSelector } from 'react-redux';
// import { I18nManager, Platform, View } from 'react-native';
// import { Dispatch, store } from 'store';
// import { getUser } from 'store/selectors/auth.selector';
// import { registerRootComponent } from 'expo';

// import 'expo-dev-client';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { getRTLMode } from 'store/selectors/app.selector';
// import i18n from 'utils/i18n';

// import 'react-native-reanimated';

// import { useColorScheme } from 'hooks/useColorScheme';
// import { Stack } from 'expo-router';


// // Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

// // export const unstable_settings = {
// //   // Ensure any route can link back to `/`
// //   initialRouteName: 'auth/login',
// // };

// const RootLayout = () => {

//   // load everything and return Loader until load

//   return <Provider store={store}>
//     <App />
//   </Provider>
// }


// export default RootLayout;


// function App() {

//   return (
//     <Stack
//       // initialRouteName='auth/login'
//       screenOptions={{
//         headerShown: true,
//         navigationBarHidden: true,
//         headerBackVisible: false,
//         headerBackButtonMenuEnabled: false,
//         headerLeft: () => null,
//         headerRight: () => null,
//         header: () => <Header />,
//       }}>
//       <Stack.Screen name="index" options={{ headerShown: false }} />
//     </Stack>
//   );
// }
