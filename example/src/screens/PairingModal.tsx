import { Image, Modal, StyleSheet, Text, View } from 'react-native';
import type { SignClientTypes } from '@walletconnect/types';
import React, { useEffect } from 'react';
import Button from '../components/Button';

interface PairingModalProps {
  visible: boolean;
  setVisible: (arg1: boolean) => void;
  currentProposal:
    | SignClientTypes.EventArguments['session_proposal']
    | undefined;
  handleAccept: () => void;
  //   handleReject: () => void;
}

export default function PairingModal({
  visible,
  setVisible,
  currentProposal,
  handleAccept,
}: //   handleAccept,
//   handleReject,
PairingModalProps) {
  const name = currentProposal?.params?.proposer?.metadata?.name;
  const url = currentProposal?.params?.proposer?.metadata.url;
  const methods = currentProposal?.params?.requiredNamespaces?.eip155.methods;
  const events = currentProposal?.params?.requiredNamespaces?.eip155.events;
  const chains = currentProposal?.params?.requiredNamespaces?.eip155.chains;
  const icon = currentProposal?.params.proposer.metadata.icons[0];

  useEffect(() => {
    // if (visible) {
    //   console.log('currentProposal...', currentProposal);
    // }
  }, [visible]);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.container}>
        <View style={styles.modalContentContainer}>
          {/* <Button onPress={() => setVisible(false)} title="Close" /> */}

          <Image
            style={styles.dappLogo}
            source={{
              uri: icon,
            }}
          />
          <Text>{name}</Text>
          <Text>{url}</Text>

          <Text>Chains: {chains}</Text>

          <View style={styles.marginVertical8}>
            <Text style={styles.subHeading}>Methods:</Text>
            {methods?.map((method) => (
              <Text style={styles.centerText} key={method}>
                {method}
              </Text>
            ))}
          </View>

          <View style={styles.marginVertical8}>
            <Text style={styles.subHeading}>Events:</Text>
            {events?.map((events) => (
              <Text style={styles.centerText} key={events}>
                {events}
              </Text>
            ))}
          </View>

          <View style={styles.flexRow}>
            <View style={{ marginRight: 8 }}>
              <Button onPress={() => handleAccept()} title="Reject" />
            </View>
            <Button onPress={() => handleAccept()} title="Accept" />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   position: 'absolute',
  //   bottom: 0,
  //   left: 0,
  //   right: 0,
  //   height: '75%',
  //   backgroundColor: 'white',
  //   borderTopLeftRadius: 48,
  //   borderTopRightRadius: 48,
  //   borderWidth: 0,
  // },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContentContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 34,
    borderWidth: 1,
    width: '100%',
    height: '50%',
    position: 'absolute',
    backgroundColor: 'white',
    bottom: 0,
  },
  dappLogo: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginVertical: 4,
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  marginVertical8: {
    marginVertical: 8,
    textAlign: 'center',
  },
  subHeading: {
    textAlign: 'center',
    fontWeight: '600',
  },
  centerText: {
    textAlign: 'center',
  },
});
