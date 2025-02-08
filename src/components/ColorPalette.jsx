import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/components/color-palette.module.css';

const ColorPalette = ({ palette, onLike, isLiked, likeCount }) => {
  const [copiedColor, setCopiedColor] = useState(null);

  const handleColorClick = (color) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 1500);
  };

  return (
    <div className={styles.paletteContainer}>
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
      <div className={styles.paletteFooter}>
        <h3 className={styles.paletteName}>{palette.name}</h3>
        <div className={styles.likeContainer}>
          <button 
            className={`${styles.likeButton} ${isLiked ? styles.liked : ''}`}
            onClick={onLike}
          >
            ♥
          </button>
          <span className={styles.likeCount}>{likeCount}</span>
        </div>
      </div>
    </div>
  );
};

ColorPalette.propTypes = {
  palette: PropTypes.shape({
    name: PropTypes.string.isRequired,
    colors: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
  onLike: PropTypes.func.isRequired,
  isLiked: PropTypes.bool.isRequired,
  likeCount: PropTypes.number.isRequired
};

export default ColorPalette;