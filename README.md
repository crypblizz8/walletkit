# React Native Wallet Kit

Bootstrap Web3 Wallet Components with one simple package.

## Installation

```sh
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

[Alpha Release](https://github.com/crypblizz8/walletkit/issues/2)

Future Components

- [ ] ENS Lookup
- [ ] ENS Registration
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
