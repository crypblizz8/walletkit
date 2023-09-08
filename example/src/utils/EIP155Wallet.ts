import { ethers } from 'ethers';
import AsyncStorage from '@react-native-async-storage/async-storage';

export let wallet: ethers.Wallet;

export async function createAndStoreWallet() {
  // Create a new random wallet
  wallet = ethers.Wallet.createRandom();

  // Convert the wallet instance to a JSON string
  let walletJson = JSON.stringify({
    privateKey: wallet.privateKey,
    address: wallet.address,
  });

  // Store wallet details in AsyncStorage
  try {
    console.log('walletJson', walletJson);
    await AsyncStorage.setItem('@wallet', walletJson);
  } catch (e) {
    // Handle error
    console.error(e);
  }
}

export async function getWallet() {
  let walletJson = await AsyncStorage.getItem('@wallet');

  if (walletJson !== null) {
    // Parse the wallet details from the stored JSON string
    let walletDetails = JSON.parse(walletJson);

    // Re-create the Wallet instance
    wallet = new ethers.Wallet(walletDetails.privateKey);

    // Return the wallet
    console.log('wallet', wallet);
    return wallet;
  }

  // In case there's no wallet stored
  console.log('no wallet stored');
  return null;
}
