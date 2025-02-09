import { utils } from 'near-api-js';

const validateWalletConnection = async (wallet) => {
  if (!wallet) {
    throw new Error('Wallet is not connected');
  }

  const walletSelector = await wallet.selector;
  const account = walletSelector.store.getState().accounts[0];

  if (!account) {
    throw new Error('No account found. Please connect your wallet.');
  }

  if (!account.contract) {
    const contractId = `palette.colorsnake.${wallet.networkId}`;
    throw new Error(`Contract not initialized for ${contractId}. Please ensure you are connected to the correct network.`);
  }

  return account.contract;
};

const handleContractError = (error, action) => {
  console.error(`Error ${action} palette:`, error);
  if (error.message.includes('Contract not initialized')) {
    throw error;
  }
  if (error.message.includes('Cannot read properties of undefined')) {
    throw new Error('Contract connection failed. Please try reconnecting your wallet.');
  }
  throw new Error(`Failed to ${action}: ${error.message}`);
};

export const likePalette = async (wallet, paletteId) => {
  try {
    const contract = await validateWalletConnection(wallet);
    await contract.like_palette({
      args: { palette_id: paletteId },
      gas: '30000000000000'
    });
    return true;
  } catch (error) {
    handleContractError(error, 'like');
  }
};

export const unlikePalette = async (wallet, paletteId) => {
  try {
    const contract = await validateWalletConnection(wallet);
    await contract.unlike_palette({
      args: { palette_id: paletteId },
      gas: '30000000000000'
    });
    return true;
  } catch (error) {
    handleContractError(error, 'unlike');
  }
};

export const getLikes = async (wallet, paletteId) => {
  try {
    const contract = await validateWalletConnection(wallet);
    return await contract.get_likes({
      palette_id: paletteId
    });
  } catch (error) {
    handleContractError(error, 'get likes');
  }
};