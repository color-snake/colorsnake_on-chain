import { useEffect, useState } from 'react';
import ColorPalette from './ColorPalette';
import styles from '../styles/components/palette-grid.module.css';
import { getPalettes } from '../utils/palette';
import { useWallet } from '../wallets/near';

const PaletteGrid = () => {
  const [palettes, setPalettes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedPalettes, setLikedPalettes] = useState({});
  const { wallet, networkId } = useWallet();

  useEffect(() => {
    const fetchPalettes = async () => {
      try {
        const palettesData = await getPalettes(networkId);
        setPalettes(palettesData);
      } catch (error) {
        console.error('Error fetching palettes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPalettes();
  }, [networkId]);

  const handleLikeToggle = async (paletteId) => {
    if (!wallet) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      const contractId = networkId === 'mainnet' ? 'palette.colorsnake.near' : 'palette.colorsnake.testnet';
      if (likedPalettes[paletteId]) {
        await wallet.callMethod({
          contractId,
          method: 'unlike_palette',
          args: { palette_id: paletteId },
          gas: '30000000000000',
          deposit: '0'
        });
        const newLikedPalettes = { ...likedPalettes };
        delete newLikedPalettes[paletteId];
        setLikedPalettes(newLikedPalettes);
      } else {
        await wallet.callMethod({
          contractId,
          method: 'like_palette',
          args: { palette_id: paletteId },
          gas: '30000000000000',
          deposit: '0'
        });
        setLikedPalettes({ ...likedPalettes, [paletteId]: true });
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      alert('Failed to update like status. Please try again.');
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading palettes...</div>;
  }

  return (
    <div className={styles.gridContainer}>
      {palettes.map((palette, index) => (
        <ColorPalette
          key={index}
          palette={palette}
          onLike={() => handleLikeToggle(palette.id)}
          isLiked={likedPalettes[palette.id] || false}
          likeCount={palette.likes || 0}
          wallet={wallet}
        />
      ))}
    </div>
  );
};

export default PaletteGrid;