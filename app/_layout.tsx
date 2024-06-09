import React, { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider } from '@react-navigation/native';
import Header from 'components/Header';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { AppRegistry, I18nManager, Platform } from 'react-native';
import { Dispatch, store } from 'store';
import { getUser } from 'store/selectors/auth.selector';

import 'expo-dev-client';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { getRTLMode } from 'store/selectors/app.selector';
import i18n from 'utils/i18n';

import 'react-native-reanimated';

import { useColorScheme } from 'hooks/useColorScheme';
import { Stack } from 'expo-router';
import 'expo-router/entry'
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: '(auth)',
};

const RootLayout = () => {

  // load everything and return Loader until load

  return <Provider store={store}>
    <App />
  </Provider>
}

export default RootLayout;


function App() {
  const dispatch = useDispatch<Dispatch>()
  const RTL_MODE = useSelector(getRTLMode)
  const user = useSelector(getUser)

  React.useEffect(() => {
    // dispatch.auth.retrieveUser()
    // dispatch.products.fetchCategories()
  }, [])

  React.useEffect(() => {
    if (Platform.OS !== 'web') {
      if (RTL_MODE) {
        I18nManager.allowRTL(true)
        I18nManager.forceRTL(true)
        I18nManager.swapLeftAndRightInRTL(true)
      } else {
        I18nManager.forceRTL(false)
        // I18nManager.swapLeftAndRightInRTL(false)
      }
    }
  }, [RTL_MODE])


  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    'Rubik-200': require('assets/fonts/Rubik/Rubik-Black.ttf'),
    'Rubik-300': require('assets/fonts/Rubik/Rubik-Light.ttf'),
    'Rubik': require('assets/fonts/Rubik/Rubik-Regular.ttf'),
    'Rubik-500': require('assets/fonts/Rubik/Rubik-Medium.ttf'),
    'Rubik-600': require('assets/fonts/Rubik/Rubik-SemiBold.ttf'),
    'Rubik-700': require('assets/fonts/Rubik/Rubik-Bold.ttf'),
  })


  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded])

  onLayoutRootView()

  const RTLDirection = RTL_MODE ? 'rtl' : 'ltr'


  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <GestureHandlerRootView style={{ flex: 1, direction: RTLDirection }}>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack
              initialRouteName='(auth)'
              screenOptions={{
                headerShown: true,
                navigationBarHidden: true,
                headerBackVisible: false,
                headerBackButtonMenuEnabled: false,
                headerLeft: () => null,
                headerRight: () => null,
                header: () => <Header />,
              }}>
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
          </ThemeProvider>
        </GestureHandlerRootView >
      </SafeAreaView>
    </SafeAreaProvider >
  );
}
