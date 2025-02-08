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

  const handleLike = async (paletteId, paletteNetwork) => {
    if (!wallet.isSignedIn()) {
      await wallet.signIn();
      return;
    }

    if (networkId !== paletteNetwork) {
      alert(`Please switch to ${paletteNetwork} network to like this palette`);
      return;
    }

    try {
      const isLiked = likedPalettes[paletteId];
      const method = isLiked ? 'unlike_palette' : 'like_palette';
      
      await wallet.callMethod({
        contractId: `palette.colorsnake.${networkId}`,
        method,
        args: { palette_id: paletteId }
      });

      setLikedPalettes(prev => ({
        ...prev,
        [paletteId]: !isLiked
      }));
    } catch (error) {
      console.error('Error liking palette:', error);
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
          onLike={() => handleLike(palette.id, palette.network)}
          isLiked={likedPalettes[palette.id] || false}
          likeCount={palette.likes || 0}
          wallet={wallet}
        />
      ))}
    </div>
  );
};

export default PaletteGrid;