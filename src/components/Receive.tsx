import React from 'react';
import QRCode from 'react-native-qrcode-svg';
import { Text, View, Button } from 'react-native';
import * as Clipboard from 'expo-clipboard';

export function Receive() {
  const ethereumAddress = '0xb4CE8dcf4312dB84f428fD5293d4a0dDe35Ec106';

  const handleCopyToClipboard = () => {
    Clipboard.setStringAsync(ethereumAddress);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Address:</Text>
      <Text>{ethereumAddress}</Text>
      <View style={{ marginBottom: 16 }}>
        <Button title="Copy to clipboard" onPress={handleCopyToClipboard} />
      </View>

      <QRCode value={ethereumAddress} size={250} />
    </View>
  );
}
