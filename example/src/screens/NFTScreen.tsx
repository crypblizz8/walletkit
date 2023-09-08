import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';

const Zerion = () => {
  const apiKey = 'XXXX';
  const address = '0xb4CE8dcf4312dB84f428fD5293d4a0dDe35Ec106';
  const [data, setData] = useState({});
  const [txData, setTxData] = useState([]);

  const fetchTransactionData = async () => {
    try {
      const response = await fetch(
        `https://api.zerion.io/v1/wallets/${address}/nft-positions/`,
        {
          headers: {
            accept: 'application/json',
            authorization: `Basic ${apiKey}`,
          },
        }
      );
      const responseData = await response.json();
      console.log('responseData', responseData.data);
      setTxData(responseData.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTransactionData();
  }, []);

  const renderIcon = (item) => {
    const { content } = item.attributes.nft_info;
    if (content && content.preview && content.preview.url) {
      return (
        <Image source={{ uri: content.preview.url }} style={styles.icon} />
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {txData.length > 0 ? (
        <FlatList
          data={txData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              {renderIcon(item)}
              <View>
                <Text style={styles.itemText}>
                  {item.attributes.nft_info.name}
                </Text>
              </View>
            </View>
          )}
        />
      ) : (
        <Text style={styles.loadingText}>Fetching Zerion API data...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginVertical: 10,
    backgroundColor: '#E6F2FF',
    borderRadius: 10,
    padding: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  loadingText: {
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 16,
  },
});

export default Zerion;
