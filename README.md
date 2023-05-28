# WalletKit

Web3 UI Component Kit for React Native

## Installation

```sh
npm install walletkit

// or with yarn

yarn add walletkit
```

## Usage

```js
import { WalletKitProvider } from 'walletkit';

...

 <WalletKitProvider projectId={projectId} relayUrl={relayURL} metadata={metadata}>
    <Component>
 </WalletKitProvider>
```

## Alpha Release TODO List

Spec

- [ ] Bootstrap it with import PKey and public address
- [ ] envs: ProjectID + privatekey
- [ ] Npm init
- [ ] Test publish
- [x] Context Wrap in a WalletProvider with Web3WalletSDK
- [ ] Simple Hooks (useBalance, useAddress, useSendTransaction) - Use ThirdWeb?

Initial Components
- [ ] WalletConnect QR Code
- [ ] Zerion TX Component
- [ ] Swap Component via 0x?

Future Components
- [ ] ENS
- [ ] Gnosis
- [ ] NFTs
- [ ] OnRamps
- [ ] In App Browser
- [ ] Multichain: big one
- [ ] Staking
- [ ] Account Abstraction / Smart Accounts
- [ ] Chat
- [ ] Push Notifications
- [ ] MPC (Web3Auth)
- [ ] Lens with [react-native-lens-ui-kit](https://github.com/lens-protocol/react-native-lens-ui-kit/)
- Pretty much in line with my thesis/analysis [here](https://mirror.xyz/crypblizz.eth/3rUdZbcRdrcfONqoD4dNWujrOAB6VuG9GMSmoMjqdjk)

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
