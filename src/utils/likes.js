import { utils } from 'near-api-js';

export const likePalette = async (wallet, paletteId) => {
  if (!wallet) {
    throw new Error('Wallet is not connected');
  }

  try {
    const walletSelector = await wallet.selector;
    const account = walletSelector.store.getState().accounts[0];
    
    if (!account) {
      throw new Error('No account found. Please connect your wallet.');
    }

    if (!account.contract) {
      const contractId = `palette.colorsnake.${wallet.networkId}`;
      throw new Error(`Contract not initialized for ${contractId}. Please ensure you are connected to the correct network.`);
    }

    const { contract } = account;

    await contract.like_palette({
      args: { palette_id: paletteId },
      gas: '30000000000000'
    });

    return true;
  } catch (error) {
    console.error('Error liking palette:', error);
    if (error.message.includes('Contract not initialized')) {
      throw error; // Pass through our custom error message
    }
    if (error.message.includes('Cannot read properties of undefined')) {
      throw new Error('Contract connection failed. Please try reconnecting your wallet.');
    }
    throw new Error(`Failed to process like: ${error.message}`);
  }
};

export const unlikePalette = async (wallet, paletteId) => {
  if (!wallet) {
    throw new Error('Wallet is not connected');
  }

  try {
    const walletSelector = await wallet.selector;
    const account = walletSelector.store.getState().accounts[0];

    if (!account) {
      throw new Error('No account found. Please connect your wallet.');
    }

    if (!account.contract) {
      const contractId = `palette.colorsnake.${wallet.networkId}`;
      throw new Error(`Contract not initialized for ${contractId}. Please ensure you are connected to the correct network.`);
    }

    const { contract } = account;

    await contract.unlike_palette({
      args: { palette_id: paletteId },
      gas: '30000000000000'
    });

    return true;
  } catch (error) {
    console.error('Error unliking palette:', error);
    if (error.message.includes('Contract not initialized')) {
      throw error;
    }
    if (error.message.includes('Cannot read properties of undefined')) {
      throw new Error('Contract connection failed. Please try reconnecting your wallet.');
    }
    throw new Error(`Failed to process unlike: ${error.message}`);
  }
};

export const getLikes = async (wallet, paletteId) => {
  if (!wallet) {
    throw new Error('Wallet is not connected');
  }

  try {
    const walletSelector = await wallet.selector;
    const account = walletSelector.store.getState().accounts[0];

    if (!account) {
      throw new Error('No account found. Please connect your wallet.');
    }

    if (!account.contract) {
      const contractId = `palette.colorsnake.${wallet.networkId}`;
      throw new Error(`Contract not initialized for ${contractId}. Please ensure you are connected to the correct network.`);
    }

    const { contract } = account;

    const likes = await contract.get_likes({
      palette_id: paletteId
    });

    return parseInt(likes, 10);
  } catch (error) {
    console.error('Error getting likes:', error);
    if (error.message.includes('Contract not initialized')) {
      throw error;
    }
    if (error.message.includes('Cannot read properties of undefined')) {
      throw new Error('Contract connection failed. Please try reconnecting your wallet.');
    }
    throw new Error(`Failed to get likes: ${error.message}`);
  }
};