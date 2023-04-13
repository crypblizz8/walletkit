import React, { createContext, useState, useEffect } from 'react';
import '@walletconnect/react-native-compat';
import { Core } from '@walletconnect/core';
import { ICore } from '@walletconnect/types';
import { Web3Wallet, IWeb3Wallet } from '@walletconnect/web3wallet';

// Required for TextEncoding Issue
const TextEncodingPolyfill = require('text-encoding');
const BigInt = require('big-integer');

Object.assign(global, {
  TextEncoder: TextEncodingPolyfill.TextEncoder,
  TextDecoder: TextEncodingPolyfill.TextDecoder,
  BigInt: BigInt,
});

const PROJECT_ID = '2cb6aea9b22abeddab08c580dae0b3f6';

interface WalletContextType {
  core: ICore;
  wallet: IWeb3Wallet;
}

const WalletContext = createContext<WalletContextType>({
  core: new Core({}),
  wallet: new Web3Wallet({}),
});

const WalletProvider: React.FC = ({ children }) => {
  const [core, setCore] = useState<ICore>(new Core({ projectId: PROJECT_ID }));
  const [wallet, setWallet] = useState<IWeb3Wallet>(null);
  const value = { core, wallet };

  useEffect(() => {
    const initWallet = async () => {
      const metadata = {
        name: 'Web3 Wallet',
        description: 'A Web3 Wallet Starter Kit',
        url: 'https://walletconnect.com/',
        icons: ['https://avatars.githubusercontent.com/u/37784886'],
      };
      const web3wallet = await Web3Wallet.init({ core, metadata });
      setWallet(web3wallet);
      console.log('Wallet initialized', web3wallet);
    };
    initWallet();
  }, [core]);

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};

export { WalletContext, WalletProvider };
