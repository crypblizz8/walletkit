import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, ScrollView } from 'react-native';
import EtherBalance from './EtherBalance';

const Zerion = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const address = '0xb4CE8dcf4312dB84f428fD5293d4a0dDe35Ec106';
  const apiKey = 'XXXX';

  useEffect(() => {
    console.log('hi');
    fetch(
      `http://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`
    )
      .then((response) => response.json())
      .then((json) => setData(json.result))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <ScrollView style={{ padding: 24 }}>
      <EtherBalance />
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Text>{JSON.stringify(data, null, 2)}</Text>
      )}
    </ScrollView>
  );
};

export default Zerion;
