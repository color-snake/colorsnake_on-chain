import { useRef } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/components/share-canvas.module.css';

const ShareCanvas = ({ palette }) => {
  const canvasRef = useRef(null);

  const handleDownload = () => {
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
  };

  return (
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
        onClick={handleDownload}
      >
        Download Palette Image
      </button>
    </div>
  );
};

ShareCanvas.propTypes = {
  palette: PropTypes.shape({
    name: PropTypes.string.isRequired,
    colors: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired
};

export default ShareCanvas;