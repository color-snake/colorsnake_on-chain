import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getPaletteById } from '../utils/palette';
import styles from '../styles/pages/palette-detail.module.css';

const PaletteDetail = ({ networkId }) => {
  const { id } = useParams();
  const [palette, setPalette] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPalette = async () => {
      try {
        setLoading(true);
        const paletteData = await getPaletteById(id, networkId);
        if (!paletteData) {
          console.error('Palette not found on', networkId);
          // Try the other network if palette is not found
          const otherNetwork = networkId === 'mainnet' ? 'testnet' : 'mainnet';
          const altPaletteData = await getPaletteById(id, otherNetwork);
          if (altPaletteData) {
            console.log('Palette found on', otherNetwork);
            setPalette(altPaletteData);
          }
        } else {
          setPalette(paletteData);
        }
      } catch (error) {
        console.error('Error fetching palette:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPalette();
  }, [id, networkId]);

  if (loading) {
    return <div className={styles.loading}>Loading palette...</div>;
  }

  if (!palette) {
    return <div className={styles.error}>Palette not found</div>;
  }

  const getColorInfo = (hex) => {
    // Convert hex to RGB
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    // Convert RGB to HSL
    const rr = r / 255;
    const gg = g / 255;
    const bb = b / 255;
    const max = Math.max(rr, gg, bb);
    const min = Math.min(rr, gg, bb);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case rr: h = (gg - bb) / d + (gg < bb ? 6 : 0); break;
        case gg: h = (bb - rr) / d + 2; break;
        case bb: h = (rr - gg) / d + 4; break;
      }
      h /= 6;
    }

    return {
      hex,
      rgb: `rgb(${r}, ${g}, ${b})`,
      hsl: `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`
    };
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{palette.name}</h1>
      
      <div className={styles.paletteBox}>
        {palette.colors.map((color, index) => (
          <div
            key={index}
            className={styles.colorBlock}
            style={{ backgroundColor: color }}
          >
            <span className={styles.colorHex}>{color}</span>
          </div>
        ))}
      </div>

      <div className={styles.infoGrid}>
        <div className={styles.infoBox}>
          <h3>Creator</h3>
          <p>{palette.creator}</p>
          <p>Created: {new Date(palette.timestamp).toLocaleDateString()}</p>
        </div>

        <div className={styles.infoBox}>
          <h3>Color Values</h3>
          {palette.colors.map((color, index) => {
            const colorInfo = getColorInfo(color);
            return (
              <div key={index} className={styles.colorInfo}>
                <h4>Color {index + 1}</h4>
                <p>HEX: {colorInfo.hex}</p>
                <p>RGB: {colorInfo.rgb}</p>
                <p>HSL: {colorInfo.hsl}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

PaletteDetail.propTypes = {
  networkId: PropTypes.string.isRequired
};

export default PaletteDetail;