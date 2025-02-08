import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getPaletteById } from '../utils/palette';
import styles from '../styles/pages/palette-detail.module.css';

const PaletteDetail = ({ networkId }) => {
  const { id } = useParams();
  const [palette, setPalette] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copiedColor, setCopiedColor] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const fetchPalette = async () => {
      try {
        setLoading(true);
        const paletteData = await getPaletteById(id, networkId);
        setPalette(paletteData);
      } catch (error) {
        console.error('Error fetching palette:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPalette();
  }, [id, networkId]);

  const handleCopyColor = (color) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 1500);
  };

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
            <span 
              className={`${styles.colorHex} ${copiedColor === color ? styles.copied : ''}`}
              onClick={() => handleCopyColor(color)}
            >
              {copiedColor === color ? 'Copied!' : color}
            </span>
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
                <p onClick={() => handleCopyColor(colorInfo.hex)} style={{ cursor: 'pointer' }}>
                  HEX: {copiedColor === colorInfo.hex ? 'Copied!' : colorInfo.hex}
                </p>
                <p onClick={() => handleCopyColor(colorInfo.rgb)} style={{ cursor: 'pointer' }}>
                  RGB: {copiedColor === colorInfo.rgb ? 'Copied!' : colorInfo.rgb}
                </p>
                <p onClick={() => handleCopyColor(colorInfo.hsl)} style={{ cursor: 'pointer' }}>
                  HSL: {copiedColor === colorInfo.hsl ? 'Copied!' : colorInfo.hsl}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.canvasContainer}>
        <h3>Share Color Palette</h3>
        <div className={styles.canvasWrapper}>
          <canvas
            ref={canvasRef}
            width="1600"
            height="900"
            className={styles.shareCanvas}
          />
        </div>
        <button
          className={styles.downloadButton}
          onClick={() => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Create random shapes with palette colors
            const shapes = ['circle', 'rectangle', 'triangle'];
            const numShapes = 30; // Total number of shapes

            for (let i = 0; i < numShapes; i++) {
              const color = palette.colors[i % palette.colors.length];
              const shape = shapes[Math.floor(Math.random() * shapes.length)];
              const size = Math.random() * 200 + 50; // Random size between 50 and 250
              const x = Math.random() * (canvas.width - size);
              const y = Math.random() * (canvas.height - size);

              ctx.fillStyle = color;
              ctx.globalAlpha = 0.8;

              if (shape === 'circle') {
                ctx.beginPath();
                ctx.arc(x + size/2, y + size/2, size/2, 0, Math.PI * 2);
                ctx.fill();
              } else if (shape === 'rectangle') {
                ctx.fillRect(x, y, size, size);
              } else if (shape === 'triangle') {
                ctx.beginPath();
                ctx.moveTo(x + size/2, y);
                ctx.lineTo(x, y + size);
                ctx.lineTo(x + size, y + size);
                ctx.closePath();
                ctx.fill();
              }
            }

            ctx.globalAlpha = 1.0;

            // Draw title
            ctx.font = '80px junegull';
            ctx.fillStyle = '#333333';
            ctx.textAlign = 'center';
            ctx.fillText(palette.name, canvas.width / 2, canvas.height - 100);

            // Create download link
            const link = document.createElement('a');
            link.download = `${palette.name.toLowerCase().replace(/\s+/g, '-')}-palette.png`;
            link.href = canvas.toDataURL();
            link.click();
          }}
        >
          Download Palette Image
        </button>
      </div>
    </div>
  );
};

PaletteDetail.propTypes = {
  networkId: PropTypes.string.isRequired
};

export default PaletteDetail;