# Ton connect demo
Try it out https://ton-connect-demo.netlify.app/

## Resource Site
- https://docs.ton.org/develop/dapps/ton-connect/
- https://github.com/ton-connect/sdk/tree/main/packages/ui
- https://ton-connect.github.io/sdk/modules/_tonconnect_ui.html
- https://tonviewer.com/
- Query wallet address https://ton.org/address/
- Test Network Block Browser https://testnet.tonscan.org/
- Main network block browser https://tonscan.org/
- est net faucets can receive test coins https://t.me/testgiver_ton_bot

## Project Scripts

### Install Dependencies

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Preview Site

```sh
npm run preview
```

## Table of contents
- tonConnect.js：Includes functions such as connecting wallets, sending transactions, disconnecting wallets, Boc parsing hashes, etc
- polyfills.js：@ton/ton depends on the buffer module
- style.css：Page Style
- main.js：Project Entry JS
- index.html: Project page
- public: Static resource public directory

## Reason for transfer being returned
- Check if the account is active or inactive, and transfer a sum of money to each other to become active
