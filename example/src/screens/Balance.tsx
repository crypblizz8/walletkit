import * as React from 'react';

import { StyleSheet, SafeAreaView } from 'react-native';

import { Balance } from 'walletkit';

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <Balance zerionAPI="XXX" address="XXX" />
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
    marginTop: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
