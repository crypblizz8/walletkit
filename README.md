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
- [ ] Spec
- [ ] Npm init
- [ ] Test publish
- [ ] Context Wrap in a WalletProvider with Web3WalletSDK
- [ ] Simple Hooks (useBalance, useAddress, useSendTransaction)

Initial Components

- [ ] Zerion TX Component
- [ ] ENS Component
- [ ] Swap Component

Future Components

- [ ] Gnosis
- [ ] Lens with [react-native-lens-ui-kit](https://github.com/lens-protocol/react-native-lens-ui-kit/)
- [ ] NFTs
- [ ] OnRamps
- [ ] In App Browser
- [ ] Multichain: big one
- [ ] Staking
- [ ] Account Abstraction / Smart Accounts
- [ ] Chat
- [ ] Push Notifications
- [ ] MPC (Web3Auth)
- Pretty much in line with my thesis/analysis [here](https://mirror.xyz/crypblizz.eth/3rUdZbcRdrcfONqoD4dNWujrOAB6VuG9GMSmoMjqdjk)

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
