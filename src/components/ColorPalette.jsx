import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/components/color-palette.module.css';
import { Link } from 'react-router-dom';

const ColorPalette = ({ palette, onLike, isLiked, likeCount, wallet }) => {
  const [copiedColor, setCopiedColor] = useState(null);
  const [isLiking, setIsLiking] = useState(false);

  const handleColorClick = (color) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 1500);
  };

  const handleLikeClick = async () => {
    if (!wallet) {
      alert('Please connect your wallet first');
      return;
    }

    if (isLiking) return;

    setIsLiking(true);
    try {
      await onLike();
    } catch (error) {
      console.error('Error handling like:', error);
      alert('Failed to process like. Please try again.');
    } finally {
      setIsLiking(false);
    }
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
        <h3 className={styles.paletteName}>
          <Link to={`/palette/${palette.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
            {palette.name}
          </Link>
        </h3>
        <div className={styles.likeContainer}>
          <button 
            className={`${styles.likeButton} ${isLiked ? styles.liked : ''} ${isLiking ? styles.liking : ''}`}
            onClick={handleLikeClick}
            disabled={isLiking}
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
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    colors: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
  onLike: PropTypes.func.isRequired,
  isLiked: PropTypes.bool.isRequired,
  likeCount: PropTypes.number.isRequired,
  wallet: PropTypes.object
};

export default ColorPalette;