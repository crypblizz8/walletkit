import * as React from 'react';

import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  FlatList,
  StatusBar,
} from 'react-native';
import Button from '../components/Button';

import { createAndStoreWallet, getWallet, wallet } from '../utils/EIP155Wallet';
import { useEffect } from 'react';
// import Zerion from '../components/Zerion';

const DATA = [
  {
    title: 'QR Code',
    navigate: 'QRCode',
  },
  {
    title: 'TX List',
    navigate: 'Transactions',
  },
  {
    title: 'NFT',
    navigate: 'NFTScreen',
  },
  {
    title: 'Receive',
    navigate: 'ReceiveScreen',
  },
  {
    title: 'ReceiveTwo',
    navigate: 'ReceiveScreenTwo',
  },
  // {
  //   title: 'Send',
  // },
  {
    title: 'Swap',
    disabled: true,
  },
  {
    title: 'ENS',
    disabled: true,
  },
];

export default function Home({ navigation }) {
  useEffect(() => {
    console.log('wallet', wallet);
    if (!wallet) {
      createAndStoreWallet();
    } else {
      getWallet();
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.flexCenter}>
        <Text style={styles.title}>WalletKit</Text>
        <Text style={styles.centeredText}>
          Address: {'\n'} {wallet ? wallet?.address : null}
        </Text>

        <FlatList
          data={DATA}
          renderItem={({ item }) => (
            <Button
              disabled={item.disabled}
              title={item.title}
              onPress={() => navigation.navigate(item?.navigate || `QRCode`)}
            />
          )}
          keyExtractor={(item) => item.title}
        />
        {/* <Zerion /> */}
        {/* <Etherscan /> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  centeredText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
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
