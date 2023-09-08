import * as React from 'react';
import { StyleSheet, View, SafeAreaView, Text, StatusBar } from 'react-native';
import { Button } from 'walletkit';

export default function Home({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.flexCenter}>
        <Text style={styles.title}>WalletKit</Text>
        <Button title={'QRCode'} onPress={() => console.log('test')} />
        <Button
          title={'Balance'}
          onPress={() => navigation.navigate('Balance')}
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
