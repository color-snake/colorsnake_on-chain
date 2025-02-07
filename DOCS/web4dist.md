# Web4 Distribution


using https://github.com/vgrichina/web4-min-contract

first deploy web4-min-contract
```sh
near deploy web4.colorsnake.testnet web4-min.wasm
near deploy web4.colorsnake.near web4-min.wasm
```

near cli network
```sh
export NEAR_NETWORK=testnet
export NEAR_NETWORK=mainnet
echo $NEAR_NETWORK 
echo $NEAR_ENV
```

deploy

```sh
npx web4-deploy dist web3.colorsnake.testnet --nearfs
npx web4-deploy dist web3.colorsnake.near --nearfs
```
- can be run with or without --nearfs




also locally with ipfs
```sh
ipfs add -r web_playground
```


---




near subaccunt setup

```sh
near create-account web4.colorsnake.testnet --masterAccount colorsnake.testnet --initialBalance 1
near create-account web4.colorsnake.near --masterAccount colorsnake.near --initialBalance 0.5
```

remember to export account
```sh
# export
near account export-account web4.colorsnake.testnet
near account export-account web4.colorsnake.near

#view
near view-account 
```