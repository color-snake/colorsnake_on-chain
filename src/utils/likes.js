import { providers } from 'near-api-js';
import { Buffer } from '../polyfills';

const CONTRACT_ID = {
  mainnet: 'palette.colorsnake.near',
  testnet: 'palette.colorsnake.testnet'
};

const handleContractError = (error, action) => {
  console.error(`Error ${action}:`, error);
  if (error.message.includes('Contract not initialized')) {
    throw new Error('Contract not initialized. Please ensure you are connected to the correct network.');
  }
  throw new Error(`Failed to ${action}: ${error.message}`);
};

export const likePalette = async (wallet, paletteId) => {
  if (!wallet) {
    throw new Error('Wallet is not connected');
  }

  try {
    const selectedWallet = await wallet.selector;
    const outcome = await selectedWallet.signAndSendTransaction({
      receiverId: CONTRACT_ID[wallet.networkId],
      actions: [{
        type: 'FunctionCall',
        params: {
          methodName: 'like_palette',
          args: { palette_id: paletteId },
          gas: '30000000000000',
          deposit: '0'
        }
      }]
    });
    return providers.getTransactionLastResult(outcome);
  } catch (error) {
    handleContractError(error, 'like palette');
  }
};

export const unlikePalette = async (wallet, paletteId) => {
  if (!wallet) {
    throw new Error('Wallet is not connected');
  }

  try {
    const selectedWallet = await wallet.selector;
    const outcome = await selectedWallet.signAndSendTransaction({
      receiverId: CONTRACT_ID[wallet.networkId],
      actions: [{
        type: 'FunctionCall',
        params: {
          methodName: 'unlike_palette',
          args: { palette_id: paletteId },
          gas: '30000000000000',
          deposit: '0'
        }
      }]
    });
    return providers.getTransactionLastResult(outcome);
  } catch (error) {
    handleContractError(error, 'unlike palette');
  }
};

export const getLikes = async (paletteId, networkId = 'testnet') => {
  const url = `https://rpc.${networkId}.near.org`;
  const provider = new providers.JsonRpcProvider({ url });

  try {
    const res = await provider.query({
      request_type: 'call_function',
      account_id: CONTRACT_ID[networkId],
      method_name: 'get_likes',
      args_base64: Buffer.from(JSON.stringify({ palette_id: paletteId })).toString('base64'),
      finality: 'optimistic',
    });
    return JSON.parse(Buffer.from(res.result).toString());
  } catch (error) {
    handleContractError(error, 'get likes');
    return 0;
  }
};