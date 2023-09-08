import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const Zerion = () => {
  const apiKey = 'XXX';
  const address = '0xb4CE8dcf4312dB84f428fD5293d4a0dDe35Ec106';
  const [data, setData] = useState({});
  const [txData, setTxData] = useState([]);

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
      const responseData = await response.json();
      setData(responseData.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTransactionData = async () => {
    try {
      const response = await fetch(
        `https://api.zerion.io/v1/wallets/${address}/transactions/`,
        {
          headers: {
            accept: 'application/json',
            authorization: `Basic ${apiKey}`,
          },
        }
      );
      const responseData = await response.json();
      setTxData(responseData.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchWalletData();
    fetchTransactionData();
  }, []);
  return (
    <View style={styles.container}>
      {data.hasOwnProperty('attributes') ? (
        <FlatList
          data={Object.entries(data.attributes.positions_distribution_by_chain)}
          keyExtractor={(item) => item[0]}
          renderItem={({ item }) => {
            if (item[1] > 0) {
              return (
                <View style={styles.item}>
                  <Text style={styles.itemText}>{item[0]}</Text>
                  <Text style={styles.itemText}>{item[1]}</Text>
                </View>
              );
            } else {
              return null;
            }
          }}
          ListFooterComponent={() => (
            <>
              <Text style={styles.transactionTitle}>Transaction Data:</Text>
              <FlatList
                data={txData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.transactionItem}>
                    <Text style={styles.transactionText}>
                      Hash: {item.attributes.hash}
                    </Text>
                    <Text style={styles.transactionText}>
                      Date: {item.attributes.mined_at}
                    </Text>
                  </View>
                )}
              />
            </>
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
    // marginVertical: 20,
    backgroundColor: '#E6F2FF',
    borderRadius: 10,
    padding: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  transactionItem: {
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    padding: 10,
  },
  transactionText: {
    fontSize: 14,
  },
  loadingText: {
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 16,
  },
});

export default Zerion;
