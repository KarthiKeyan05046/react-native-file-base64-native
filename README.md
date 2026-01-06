# react-native-file-base64-native

High-performance React Native native module for converting files to Base64 without blocking the JS thread.

## Installation


```sh
npm install react-native-file-base64-native react-native-nitro-modules

> `react-native-nitro-modules` is required as this library relies on [Nitro Modules](https://nitro.margelo.com/).
```


## Usage


```js
import { encodeFile } from 'react-native-file-base64-native';

// Encode a file to Base64
const base64String = await encodeFile('/path/to/your/file.jpg');
console.log(base64String);
```


## Contributing

- [Development workflow](CONTRIBUTING.md#development-workflow)
- [Sending a pull request](CONTRIBUTING.md#sending-a-pull-request)
- [Code of conduct](CODE_OF_CONDUCT.md)

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
