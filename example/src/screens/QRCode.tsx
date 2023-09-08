import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { web3WalletPair, web3wallet } from 'walletkit';
import { wallet } from '../utils/EIP155Wallet';

// Need to re-export these types from walletkit
// Need to re-export these types from walletkit
import type { SignClientTypes } from '@walletconnect/types';
import PairingModal from './PairingModal';

export default function QRCode() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [pairingModalVisible, setPairingModalVisible] = useState(false);
  const [currentProposal, setCurrentProposal] = useState();

  const onSessionProposal = useCallback(
    (proposal: SignClientTypes.EventArguments['session_proposal']) => {
      setPairingModalVisible(true);
      setCurrentProposal(proposal);
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

  async function handleAccept() {
    const { id, params } = currentProposal;
    const { requiredNamespaces, relays } = params;

    if (currentProposal) {
      const namespaces: SessionTypes.Namespaces = {};
      Object.keys(requiredNamespaces).forEach((key) => {
        const accounts: string[] = [];
        requiredNamespaces[key].chains.map((chain) => {
          [wallet?.address].map((acc) => accounts.push(`${chain}:${acc}`));
        });

        namespaces[key] = {
          accounts,
          methods: requiredNamespaces[key].methods,
          events: requiredNamespaces[key].events,
        };
      });

      await web3wallet.approveSession({
        id,
        relayProtocol: relays[0].protocol,
        namespaces,
      });

      setPairingModalVisible(!pairingModalVisible);
      setCurrentProposal(undefined);
    }
  }

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    getBarCodeScannerPermissions();
  }, []);

  useEffect(() => {
    web3wallet?.on('session_proposal', onSessionProposal);
  }, [scanned, onSessionProposal, pairingModalVisible]);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <PairingModal
        visible={pairingModalVisible}
        setVisible={setPairingModalVisible}
        currentProposal={currentProposal}
        handleAccept={handleAccept}
      />

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
