# deploying to palette.colorsnake


near cli network
```sh
export NEAR_NETWORK=testnet
export NEAR_NETWORK=mainnet
echo $NEAR_NETWORK 
echo $NEAR_ENV
```

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


```palette
#D2F5D6
#ED7936
#8E93EB
#ED4584
#F6C288
#6CEDEE
#FD74F1
```

```palette
#300F31
#214D88
#9A281E
#5EC795
#4899D1
#848046
#5F9D41
```


```sh
near call palette.colorsnake.near add_palette '{"name":"COLORSNAKE LIGHT","colors":["#D2F5D6", "#ED7936", "#8E93EB", "#ED4584", "#F6C288", "#6CEDEE", "#FD74F1"]}' --accountId colorsnake.near

near call palette.colorsnake.near add_palette '{"name":"COLORSNAKE DARK","colors":["#300F31", "#214D88", "#9A281E", "#5EC795", "#4899D1", "#848046","#5F9D41"]}' --accountId colorsnake.near
```