import { useEffect, useState } from 'react';
import ColorPalette from './ColorPalette';
import styles from '../styles/components/palette-grid.module.css';
import { getPalettes } from '../utils/palette';

const PaletteGrid = () => {
  const [palettes, setPalettes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPalettes = async () => {
      try {
        const [mainnetPalettes, testnetPalettes] = await Promise.all([
          getPalettes('mainnet'),
          getPalettes('testnet')
        ]);
        setPalettes([...mainnetPalettes, ...testnetPalettes]);
      } catch (error) {
        console.error('Error fetching palettes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPalettes();
  }, []); // Remove NetworkId dependency as we're now fetching from both networks

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