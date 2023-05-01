import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { WalletConnectProvider } from 'walletkit';

const metadata = {
  name: 'WalletKit',
  description: 'Web3 React Native UI KIT',
  url: 'https://walletconnect.com/',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

export default function App() {
  return (
    <WalletConnectProvider projectID={PROJECT_ID} metadata={metadata}>
      <View style={styles.container}>
        <Text>WalletKit</Text>
      </View>
    </WalletConnectProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
