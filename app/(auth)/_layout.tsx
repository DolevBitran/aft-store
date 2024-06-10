import React from 'react';
import Header from 'components/Header';

import { Stack } from 'expo-router';

// export const unstable_settings = {
//   // Ensure any route can link back to `/`
//   initialRouteName: 'auth/login',
// };


function App() {

  return (
    <Stack
      // initialRouteName='auth/login'
      screenOptions={{
        headerShown: true,
        navigationBarHidden: true,
        headerBackVisible: false,
        headerBackButtonMenuEnabled: false,
        headerLeft: () => null,
        headerRight: () => null,
        header: () => <Header />,
      }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}

export default App;
