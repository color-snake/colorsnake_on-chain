import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/components/color-palette.module.css';

const ColorPalette = ({ palette }) => {
  const [copiedColor, setCopiedColor] = useState(null);

  const handleColorClick = (color) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 1500);
  };

  return (
    <div className={styles.paletteContainer}>
      <h3 className={styles.paletteName}>{palette.name}</h3>
      <div className={styles.colorsGrid}>
        {palette.colors.map((color, index) => (
          <div
            key={index}
            className={styles.colorBlock}
            style={{ backgroundColor: color }}
            onClick={() => handleColorClick(color)}
          >
            <span className={styles.colorHex}>
              {copiedColor === color ? 'Copied!' : color}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

ColorPalette.propTypes = {
  palette: PropTypes.shape({
    name: PropTypes.string.isRequired,
    colors: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired
};

export default ColorPalette;