# deploying to palette.colorsnake


```sh
# Testnet
near deploy --wasmFile color_palette.wasm  palette.colorsnake.testnet
#Mainnet
near deploy --wasmFile color_palette.wasm  palette.colorsnake.near
```

### Initialize contract
not sure if necessary running it onece reset the contract it seemed, but should run it because if i don't someone else can run.
```sh
# Test
near call palette.colorsnake.testnet init --accountId palette.colorsnake.testnet
# Main
near call palette.colorsnake.near init --accountId palette.colorsnake.near
```

```sh
# Test
near call palette.colorsnake.testnet add_palette '{"name":"Sunset","colors":["#FF6B6B","#4ECDC4","#45B7D1"]}' --accountId colorsnake.testnet
# Main
near call palette.colorsnake.near add_palette '{"name":"Sunset","colors":["#FF6B6B","#4ECDC4","#45B7D1"]}' --accountId colorsnake.near
```


```sh
# Test
near view palette.colorsnake.testnet get_palettes
# Main
near view palette.colorsnake.near get_palettes
```


sample cli output!!!
```sh
near view palette.colorsnake.testnet get_palettes
▹▹▸▹▹ Getting a response to a read-only function call ...                        --------------
No logs
--------------
Result:
[
  {
    "colors": [
      "#FF6B6B",
      "#4ECDC4",
      "#45B7D1"
    ],
    "creator": "colorsnake.testnet",
    "id": "palette-1",
    "name": "Sunset"
  }
]
--------------
```



### New Social Features (V2)
```bash
# Like a palette
near call palette.colorsnake.testnet like_palette '{"palette_id":"palette-1"}' --accountId colorsnake.testnet

# Unlike a palette
near call palette.colorsnake.testnet unlike_palette '{"palette_id":"palette-1"}' --accountId colorsnake.testnet

# Check total likes for a palette
near view palette.colorsnake.testnet get_likes '{"palette_id":"palette-1"}'
```

