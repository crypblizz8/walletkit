import React, { createContext, useState, useEffect, useCallback } from 'react';
import '@walletconnect/react-native-compat';
import '@ethersproject/shims';
// import { ethers } from 'ethers';

import { Core } from '@walletconnect/core';
import type { ICore } from '@walletconnect/types';
import { Web3Wallet, IWeb3Wallet } from '@walletconnect/web3wallet';

// Required for TextEncoding Issue
const TextEncodingPolyfill = require('text-encoding');
const BigInt = require('big-integer');

Object.assign(global, {
  TextEncoder: TextEncodingPolyfill.TextEncoder,
  TextDecoder: TextEncodingPolyfill.TextDecoder,
  BigInt: BigInt,
});

export let web3wallet: IWeb3Wallet;
export let core: ICore;
// export let currentETHAddress: string;

// export function WalletConnectProvider({ children }) {
//   const [initialized, setInitialized] = useState(false);

//   const createWeb3Wallet = useCallback(async () => {
//     try {
//       core = new Core({
//         // @notice: If you want the debugger / logs
//         logger: 'debug',
//         projectId: PROJECT_ID,
//       });

//       web3wallet = await Web3Wallet.init({
//         core,
//         metadata: {
//           name: 'React Native UI Kit',
//           description: 'ReactNative Web3Wallet',
//           url: 'https://walletconnect.com/',
//           icons: ['https://avatars.githubusercontent.com/u/37784886'],
//         },
//       });
//       setInitialized(true);
//     } catch (err: unknown) {
//       console.log('Error for initializing Web3Wallet', err);
//     }
//   }, []);

//   useEffect(() => {
//     console.log('initialize state', initialized);
//     createWeb3Wallet();
//   }, [createWeb3Wallet, initialized]);

//   return (
//     <WalletConnectContext.Provider value={{ initialized }}>
//       {children}
//     </WalletConnectContext.Provider>
//   );
// }
const WalletConnectContext = createContext();

interface CoreMetaData {
  name: string;
  description: string;
  url: string;
  icons: string[];
}

interface WalletConnectProviderProps {
  children: React.ReactNode;
  projectID: string;
  relayURL?: string;
  metadata?: CoreMetaData;
}

export function WalletConnectProvider({
  children,
  projectID,
  relayURL,
  metadata,
}: WalletConnectProviderProps) {
  const [initialized, setInitialized] = useState(false);

  const createWeb3Wallet = useCallback(async () => {
    try {
      core = new Core({
        logger: 'debug',
        projectId: projectID,
        relayUrl: relayURL || 'wss://relay.walletconnect.com',
      });

      web3wallet = await Web3Wallet.init({
        core,
        metadata: metadata || {
          name: 'React Native UI Kit',
          description: 'ReactNative Web3Wallet',
          url: 'https://walletconnect.com/',
          icons: ['https://avatars.githubusercontent.com/u/37784886'],
        },
      });
      setInitialized(true);
    } catch (err: unknown) {
      console.log('Error for initializing Web3Wallet', err);
    }
  }, [projectID, relayURL, metadata]);

  useEffect(() => {
    console.log('initialize state', initialized);
    createWeb3Wallet();
  }, [createWeb3Wallet, initialized]);

  return (
    <WalletConnectContext.Provider value={{ initialized }}>
      {children}
    </WalletConnectContext.Provider>
  );
}
