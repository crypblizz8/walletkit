import 'fast-text-encoding';
import 'react-native-get-random-values';
import '@walletconnect/react-native-compat';
import '@ethersproject/shims';
import { Core } from '@walletconnect/core';
import type { ICore } from '@walletconnect/types';
import { Web3Wallet, IWeb3Wallet } from '@walletconnect/web3wallet';

import React, { createContext, useState, useEffect, useCallback } from 'react';

export let web3wallet: IWeb3Wallet;
export let core: ICore;

const WalletConnectContext = createContext(false);

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
        // logger: 'debug',
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
    createWeb3Wallet();
    console.log('Web3Wallet Initialized:', initialized);
  }, [createWeb3Wallet, initialized]);

  return (
    <WalletConnectContext.Provider value={initialized}>
      {children}
    </WalletConnectContext.Provider>
  );
}

// Note: Used to create initial pairing session
export async function web3WalletPair(params: { uri: string }) {
  return await web3wallet.core.pairing.pair({ uri: params.uri });
}
