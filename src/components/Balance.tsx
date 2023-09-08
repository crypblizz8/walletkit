import React, { useCallback, useEffect, useState } from 'react';
import { Text, StyleSheet, View, FlatList } from 'react-native';

interface WalletBalanceProps {
  zerionAPI: string;
  address: string;
  filterZeroBalances?: boolean; //TODO: Implement filterZeroBalances
}
interface WalletBalanceData {
  attributes: {
    changes: {
      absolute_1d: number;
      percent_1d: number;
    };
    positions_distribution_by_chain: {
      [chain: string]: number;
    };
    positions_distribution_by_type: {
      [type: string]: number;
    };
    total: {
      positions: number;
    };
  };
  id: string;
  type: string;
}

export function Balance({ zerionAPI, address }: WalletBalanceProps) {
  const [walletBalance, setWalletBalance] = useState<WalletBalanceData | null>(
    null
  );

  if (!zerionAPI) {
    throw new Error('Zerion API is required');
  }

  const fetchWalletBalanceData = useCallback(async () => {
    try {
      const response = await fetch(
        `https://api.zerion.io/v1/wallets/${address}/portfolio?currency=usd`,
        {
          headers: {
            accept: 'application/json',
            authorization: `Basic ${zerionAPI}`,
          },
        }
      );
      const responseData = await response.json();
      setWalletBalance(responseData.data);
    } catch (error) {
      console.error(error);
    }
  }, [address, zerionAPI]);

  useEffect(() => {
    fetchWalletBalanceData();
  }, [fetchWalletBalanceData]);

  // TODO: Add filterZeroBalances functionality

  return (
    <View style={styles.container}>
      {walletBalance ? (
        <FlatList
          data={Object.entries(
            walletBalance.attributes.positions_distribution_by_chain
          )}
          keyExtractor={(item) => item[0]}
          renderItem={({ item }) => {
            return (
              <View style={styles.flexRow}>
                <Text>{item[0]}</Text>
                <Text>{item[1].toFixed(2)}</Text>
              </View>
            );
          }}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  flatList: {
    width: '100%',
    flexGrow: 1,
  },
  container: {
    display: 'flex',
    borderRadius: 1,
    borderColor: 'black',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    marginTop: 8,
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
