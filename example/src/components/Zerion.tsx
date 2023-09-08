import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Button from './Button';

const Zerion = () => {
  const apiKey = 'XXX';
  const address = '0xb4CE8dcf4312dB84f428fD5293d4a0dDe35Ec106';

  // `https://api.zerion.io/v1/wallets/${address}/portfolio/?currency=usd`,

  useEffect(() => {
    console.log('fetching address portfolio');
    const fetchWalletData = async () => {
      try {
        const response = await fetch(
          `https://api.zerion.io/v1/wallets/${address}/portfolio?currency=usd`,
          {
            headers: {
              accept: 'application/json',
              authorization: `Basic ${apiKey}`,
            },
          }
        );
        const data = await response.json();
        console.log('data', data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchWalletData();
  }, []);

  return (
    <View>
      <Button title="Fetch Zerion API data" onPress={() => fetchWalletData()} />
      <Text>Fetching Zerion API data...</Text>
    </View>
  );
};

export default Zerion;
