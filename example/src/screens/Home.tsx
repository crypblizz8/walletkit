import * as React from 'react';

import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  FlatList,
  StatusBar,
} from 'react-native';

import { Button } from 'walletkit';

const DATA = [
  {
    title: 'QR Code',
    navigate: 'QRCode',
  },
];

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.flexCenter}>
        <Text style={styles.title}>WalletKit</Text>
        <FlatList
          data={DATA}
          renderItem={({ item }) => (
            <Button title={item.title} onPress={() => console.log('test')} />
          )}
          keyExtractor={(item) => item.title}
        />
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
