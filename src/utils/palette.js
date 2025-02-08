import { providers } from 'near-api-js';
import { Buffer } from '../polyfills';

const CONTRACT_ID = {
  mainnet: 'palette.colorsnake.near',
  testnet: 'palette.colorsnake.testnet'
};

export const getPalettes = async (networkId = 'testnet') => {
  const url = `https://rpc.${networkId}.near.org`;
  const provider = new providers.JsonRpcProvider({ url });

  try {
    const res = await provider.query({
      request_type: 'call_function',
      account_id: CONTRACT_ID[networkId],
      method_name: 'get_palettes',
      args_base64: Buffer.from(JSON.stringify({})).toString('base64'),
      finality: 'optimistic',
    });
    return JSON.parse(Buffer.from(res.result).toString());
  } catch (error) {
    console.error('Error fetching palettes:', error);
    return [];
  }
};

export const getPaletteById = async (paletteId, networkId = 'testnet') => {
  const url = `https://rpc.${networkId}.near.org`;
  const provider = new providers.JsonRpcProvider({ url });

  try {
    const res = await provider.query({
      request_type: 'call_function',
      account_id: CONTRACT_ID[networkId],
      method_name: 'get_palette_by_id',
      args_base64: Buffer.from(JSON.stringify({ id: paletteId })).toString('base64'),
      finality: 'optimistic',
    });
    return JSON.parse(Buffer.from(res.result).toString());
  } catch (error) {
    console.error('Error fetching palette:', error);
    return null;
  }
};