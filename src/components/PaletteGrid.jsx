import { useEffect, useState } from 'react';
import ColorPalette from './ColorPalette';
import styles from '../styles/components/palette-grid.module.css';
import { getPalettes } from '../utils/palette';
import { NetworkId } from '../config';

const PaletteGrid = () => {
  const [palettes, setPalettes] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPalettes = async () => {
      try {
        const result = await getPalettes(NetworkId);
        setPalettes(result || []);
      } catch (error) {
        console.error('Error fetching palettes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPalettes();
  }, [NetworkId]);

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