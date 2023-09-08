import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { WalletConnectProvider } from 'walletkit';
import Home from './screens/Home';
const Stack = createNativeStackNavigator();

const PROJECT_ID = '';
const metadata = {
  name: 'WalletKit',
  description: 'Web3 React Native UI KIT',
  url: 'https://walletconnect.com/',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

export default function App() {
  return (
    <WalletConnectProvider projectID={PROJECT_ID} metadata={metadata}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          {/* <Stack.Screen
            name="QRCode"
            component={QRCode}
            options={{ headerShown: true }}
          /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </WalletConnectProvider>
  );
}
