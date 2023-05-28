import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  FlatList,
  StatusBar,
} from 'react-native';
import { WalletConnectProvider } from 'walletkit';
import Button from '../components/Button';

const PROJECT_ID = '2cb6aea9b22abeddab08c580dae0b3f6';
const metadata = {
  name: 'WalletKit',
  description: 'Web3 React Native UI KIT',
  url: 'https://walletconnect.com/',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'QR Code',
    navigate: 'QRCode',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Swap',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Send',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29272',
    title: 'Receive',
  },
];

export default function Home({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.flexCenter}>
        <Text>WalletKit</Text>
        <FlatList
          data={DATA}
          renderItem={({ item }) => (
            <Button
              title={item.title}
              onPress={() => navigation.navigate('QRCode')}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatListContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
