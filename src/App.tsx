import React, { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Home from 'views/Home';
import Login from 'views/Login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Header from 'components/Header';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { I18nManager, Platform } from 'react-native';
import { Dispatch, store } from 'store';
import { getUser } from 'store/selectors/auth.selector';
import { registerRootComponent } from 'expo';

import 'expo-dev-client';
import Dashboard from 'views/Dashboard';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Create from 'views/Create';
import Product from 'views/Product';
import { getRTLMode } from 'store/selectors/app.selector';
import i18n from 'utils/i18n';

const Stack = createNativeStackNavigator()

const WrappedApp = () => {



  // load everything and return Loader until load

  return <Provider store={store}>
    <App />
  </Provider>
}

const App = () => {
  const dispatch = useDispatch<Dispatch>()
  const RTL_MODE = useSelector(getRTLMode)

  React.useEffect(() => {
    dispatch.auth.retrieveUser()
    dispatch.products.fetchCategories()
  }, [])

  React.useEffect(() => {
    if (Platform.OS !== 'web') {
      if (RTL_MODE) {
        I18nManager.allowRTL(true)
        I18nManager.forceRTL(true)
        // I18nManager.swapLeftAndRightInRTL(true)
      } else {
        I18nManager.forceRTL(false)
        // I18nManager.swapLeftAndRightInRTL(false)
      }
    }
  }, [RTL_MODE])


  const user = useSelector(getUser)

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


  const navigationContainerRef = React.useRef<AppNavigationContainer>(null)

  React.useEffect(() => {
    if (navigationContainerRef.current) {
      dispatch.app.initNavigator(navigationContainerRef.current);
    }
  }, [navigationContainerRef.current])

  const config = {
    screens: {
      Dashboard: '',
      Store: 'store',
      Login: 'login',
      Create: 'create',
      Product: 'product',
    },
  };

  const linking = {
    prefixes: ['http://localhost:8081', 'aft://'],
    config,
  };

  const RTLDirection = RTL_MODE ? 'rtl' : 'ltr'

  return <SafeAreaProvider>
    <SafeAreaView style={{ flex: 1 }}>
      <GestureHandlerRootView style={{ flex: 1, direction: RTLDirection }}>
        <NavigationContainer ref={navigationContainerRef} linking={linking}>
          <Stack.Navigator screenOptions={{
            headerShown: true,
            navigationBarHidden: true,
            headerBackVisible: false,
            headerBackButtonMenuEnabled: false,
            headerLeft: () => null,
            headerRight: () => null,
            headerTitle: () => <Header />
          }}>
            {user ?
              <>
                <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
                <Stack.Screen name="Store" component={Home} options={{ headerShown: false }} />
                <Stack.Screen name="Product" component={Product} options={{ headerShown: false }} />
                <Stack.Screen name="Create" component={Create} options={{
                  headerShown: true,
                  headerTitle: i18n.translate('newProductButton'),
                  headerBackVisible: true,
                  navigationBarHidden: false
                }} />
              </> :
              <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            }
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaView>
  </SafeAreaProvider>
}

registerRootComponent(WrappedApp)
// export default WrappedApp;