import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { utils } from 'ethers';

const EtherBalance = () => {
  const [balance, setBalance] = useState(null);
  const [ethPrice, setEthPrice] = useState(null);

  const address = '0xb4CE8dcf4312dB84f428fD5293d4a0dDe35Ec106';
  const apiKey = 'XXXXX';

  useEffect(() => {
    fetch(
      `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        const balanceInWei = data.result;
        const balanceInEth = utils.formatEther(balanceInWei);
        setBalance(balanceInEth);
      });

    fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
    )
      .then((response) => response.json())
      .then((data) => setEthPrice(data.ethereum.usd));
  }, []);

  if (balance === null || ethPrice === null) {
    return <Text>Loading...</Text>;
  }

  const balanceInUsd = balance * ethPrice;
  return (
    <View>
      <Text>Balance in ETH: {balance}</Text>
      <Text>Balance in USD: ${balanceInUsd}</Text>
    </View>
  );
};

export default EtherBalance;
