import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { web3WalletPair, web3wallet } from 'walletkit';

// Need to re-export these types from walletkit
import { SignClientTypes } from '@walletconnect/types';

export default function QRCode() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  // const [pairingModalVisible, setPairingModalVisible] = useState(false);
  // const [currentProposal, setCurrentProposal] = useState(false);

  const onSessionProposal = useCallback(
    (proposal: SignClientTypes.EventArguments['session_proposal']) => {
      setPairingModalVisible(true);
      // setCurrentProposal(proposal);
      console.log('main proposal...', proposal);
    },
    []
  );

  async function pair(data) {
    const pairing = await web3WalletPair({ uri: data });
    console.log('pairing2...', pairing);
    return pairing;
  }

  const handleBarCodeScanned = async ({ data }) => {
    await pair(data);
    setScanned(true);
  };

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    getBarCodeScannerPermissions();
  }, []);

  useEffect(() => {
    web3wallet?.on('session_proposal', onSessionProposal);
  }, [scanned, onSessionProposal]);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.layerTop}>
        <View style={styles.focusedLayer} />
        {scanned && (
          <Button
            title={'Tap to Scan Again'}
            onPress={() => setScanned(false)}
          />
        )}
      </View>
    </View>
  );
}
const opacity = 'rgba(0, 0, 0, .6)';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  layerTop: {
    flex: 1,
    backgroundColor: opacity,
    justifyContent: 'center',
    alignItems: 'center',
  },
  focusedLayer: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'white',
    height: 250,
    width: 250,
  },
  // layerCenter: {
  //   flex: 1,
  //   flexDirection: 'row',
  // },
  // layerLeft: {
  //   flex: 1,
  //   backgroundColor: opacity,
  // },
  // focused: {
  //   flex: 10,
  // },
  // layerRight: {
  //   flex: 1,
  //   backgroundColor: opacity,
  // },
  // layerBottom: {
  //   flex: 1,
  //   backgroundColor: opacity,
  // },
});
