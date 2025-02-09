import { useState, useEffect, useContext } from 'react';
import { NearContext } from '@/wallets/near';
import { getPalettes } from '../utils/palette';
import styles from '../styles/pages/profile.module.css';
import ColorPalette from '../components/ColorPalette';

const Profile = () => {
  const { signedAccountId, networkId, wallet } = useContext(NearContext);
  const [submittedPalettes, setSubmittedPalettes] = useState([]);
  const [likedPalettes, setLikedPalettes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPalettes = async () => {
      if (!signedAccountId) return;
      
      try {
        setLoading(true);
        const allPalettes = await getPalettes(networkId);
        
        // Filter submitted palettes
        const submitted = allPalettes.filter(p => p.creator === signedAccountId);
        setSubmittedPalettes(submitted);

        // Get liked palettes
        const liked = await wallet.viewMethod({
          contractId: networkId === 'mainnet' ? 'palette.colorsnake.near' : 'palette.colorsnake.testnet',
          method: 'get_liked_palettes',
          args: { account_id: signedAccountId }
        });

        const likedPaletteDetails = allPalettes.filter(p => liked.includes(p.id));
        setLikedPalettes(likedPaletteDetails);
      } catch (error) {
        console.error('Error fetching palettes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPalettes();
  }, [signedAccountId, networkId, wallet]);

  const handleLike = async (paletteId) => {
    if (!signedAccountId) return;

    try {
      await wallet.callMethod({
        contractId: networkId === 'mainnet' ? 'palette.colorsnake.near' : 'palette.colorsnake.testnet',
        method: 'like_palette',
        args: { palette_id: paletteId }
      });
      
      // Refresh palettes after liking
      const allPalettes = await getPalettes(networkId);
      const submitted = allPalettes.filter(p => p.creator === signedAccountId);
      setSubmittedPalettes(submitted);
    } catch (error) {
      console.error('Error liking palette:', error);
    }
  };

  if (!signedAccountId) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Please log in to view your profile</h2>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Loading...</h2>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Your Profile</h2>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Your Submitted Palettes</h3>
        {submittedPalettes.length === 0 ? (
          <p className={styles.emptyMessage}>You haven&apos;t submitted any palettes yet</p>
        ) : (
          <div className={styles.palettesGrid}>
            {submittedPalettes.map(palette => (
              <ColorPalette
                key={palette.id}
                palette={palette}
                onLike={() => handleLike(palette.id)}
                isLiked={likedPalettes.some(p => p.id === palette.id)}
                likeCount={palette.likes || 0}
                wallet={wallet}
              />
            ))}
          </div>
        )}
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Your Liked Palettes</h3>
        {likedPalettes.length === 0 ? (
          <p className={styles.emptyMessage}>You haven&apos;t liked any palettes yet</p>
        ) : (
          <div className={styles.palettesGrid}>
            {likedPalettes.map(palette => (
              <ColorPalette
                key={palette.id}
                palette={palette}
                onLike={() => handleLike(palette.id)}
                isLiked={true}
                likeCount={palette.likes || 0}
                wallet={wallet}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;