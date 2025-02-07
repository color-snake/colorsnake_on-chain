# Color Palette Contract

> i updated the contract during testing phase, didn't feel like updateing and coping all the dcoumentaion over. see [color snake palette depoyment.md](color_snake_palette_depoyment.md)

A smart contract written in Zig that enables users to store and manage color palettes on the NEAR blockchain. Users can add their own color palettes, while only the contract owner has the ability to remove palettes.

## Features

- Add new color palettes with a name and array of color codes
- View all stored color palettes
- Owner-only palette removal functionality
- Input validation for color codes

## Building the Contract

1. Install [Zig](https://ziglang.org/learn/getting-started/#installing-zig) (v0.13.0 recommended)

2. Build the contract:
```bash
zig build-exe color_palette.zig -target wasm32-freestanding -O ReleaseSmall --export=init --export=add_palette --export=remove_palette --export=get_palettes --export=get_palette_by_id -fno-entry
```

This will create `color_palette.wasm` file.

## Contract Methods

### init()
Initializes the contract and sets the owner. Must be called once after deployment.

### add_palette()
Adds a new color palette to the contract.
- Input: JSON string containing:
  - name: string (palette name)
  - colors: array of hex color codes (e.g., ["#FF0000", "#00FF00", "#0000FF"])
- Returns: Palette ID

### remove_palette()
Removes a palette by ID (owner-only function).
- Input: JSON string containing:
  - id: string (palette ID to remove)

### get_palettes()
Returns all stored palettes.
- Returns: Array of palette objects

### get_palette_by_id()
Returns a specific palette by ID.
- Input: JSON string containing:
  - id: string (palette ID to fetch)
- Returns: Palette object if found, null if not found

## Storage Notes and Fees

### Storage Requirements
- Each color palette requires storage space on the NEAR blockchain
- The storage cost depends on the palette name length and number of colors
- Approximate storage per palette: 200-500 bytes (varies based on content)

### Storage Fees
- Users must attach storage deposit when adding palettes
- Recommended deposit: 0.1 NEAR per palette
- Storage fees are locked until palette removal
- Upon palette removal, storage deposit is refunded to the original creator

### Storage Management
- Contract automatically manages storage staking
- Insufficient storage deposit will cause transaction failure
- Storage fees protect against spam and ensure resource availability

## Example Usage

```bash
# Initialize contract
near call $CONTRACT_ID init --accountId $OWNER_ID

# Add a palette
near call $CONTRACT_ID add_palette '{"name":"Sunset","colors":["#FF6B6B","#4ECDC4","#45B7D1"]}' --accountId $ACCOUNT_ID

# Get all palettes
near view $CONTRACT_ID get_palettes

# Remove a palette (owner only)
near call $CONTRACT_ID remove_palette '{"id":"palette-1"}' --accountId $OWNER_ID
```