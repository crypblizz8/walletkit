import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { WalletConnectProvider } from 'walletkit';
import Home from './screens/Home';
import QRCode from './screens/QRCode';
import Transactions from './screens/Transcations';
import ReceiveScreen from './screens/ReceiveScreen';
import ReceiveScreenTwo from './screens/ReceiveScreenTwo';
import NFTScreen from './screens/NFTScreen';

const Stack = createNativeStackNavigator();

const PROJECT_ID = 'XXX';
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
          <Stack.Screen
            name="QRCode"
            component={QRCode}
            options={{ headerShown: true }}
          />

          <Stack.Screen
            name="Transactions"
            component={Transactions}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="ReceiveScreen"
            component={ReceiveScreen}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="ReceiveScreenTwo"
            component={ReceiveScreenTwo}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="NFTScreen"
            component={NFTScreen}
            options={{ headerShown: true }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </WalletConnectProvider>
  );
}
