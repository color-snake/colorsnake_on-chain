import { useEffect, useState, useContext } from 'react';
import { NearContext } from '@/wallets/near';
import ColorPalette from './ColorPalette';
import styles from '../styles/components/palette-grid.module.css';

const PaletteGrid = () => {
  const [palettes, setPalettes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { wallet } = useContext(NearContext);

  useEffect(() => {
    const fetchPalettes = async () => {
      try {
        const result = await wallet.viewMethod({
          contractId: wallet.getContractId(),
          method: 'get_palettes'
        });
        setPalettes(result || []);
      } catch (error) {
        console.error('Error fetching palettes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPalettes();
  }, [wallet]);

  if (loading) {
    return <div className={styles.loading}>Loading palettes...</div>;
  }

  return (
    <div className={styles.gridContainer}>
      {palettes.map((palette, index) => (
        <ColorPalette key={index} palette={palette} />
      ))}
    </div>
  );
};

export default PaletteGrid;