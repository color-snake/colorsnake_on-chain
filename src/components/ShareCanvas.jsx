import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/components/share-canvas.module.css';

const ShareCanvas = ({ palette }) => {
  const canvasRef = useRef(null);
  const [, setCurrentSeed] = useState(Math.random());

  const generateCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Calculate dimensions for rounded rectangles
    const totalColors = palette.colors.length;
    const blockSpacing = 20; // Spacing between blocks
    const blockHeight = canvas.height * 0.6; // Height of each color block
    const totalSpacing = blockSpacing * (totalColors - 1);
    const blockWidth = (canvas.width - totalSpacing - 80) / totalColors; // Dynamic width calculation with margins
    const cornerRadius = 12; // Rounded corner radius
    let startX = (canvas.width - (blockWidth * totalColors + blockSpacing * (totalColors - 1))) / 2;
    const startY = (canvas.height - blockHeight) / 2;

    // Draw each color as a rounded rectangle with hex code
    palette.colors.forEach((color) => {
      // Draw rounded rectangle
      ctx.save();
      
      // Add subtle shadow
      ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      
      // Draw rounded rectangle
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(startX + cornerRadius, startY);
      ctx.lineTo(startX + blockWidth - cornerRadius, startY);
      ctx.arcTo(startX + blockWidth, startY, startX + blockWidth, startY + cornerRadius, cornerRadius);
      ctx.lineTo(startX + blockWidth, startY + blockHeight - cornerRadius);
      ctx.arcTo(startX + blockWidth, startY + blockHeight, startX + blockWidth - cornerRadius, startY + blockHeight, cornerRadius);
      ctx.lineTo(startX + cornerRadius, startY + blockHeight);
      ctx.arcTo(startX, startY + blockHeight, startX, startY + blockHeight - cornerRadius, cornerRadius);
      ctx.lineTo(startX, startY + cornerRadius);
      ctx.arcTo(startX, startY, startX + cornerRadius, startY, cornerRadius);
      ctx.closePath();
      ctx.fill();
      
      ctx.restore();

      // Add vertical hex code text
      ctx.save();
      ctx.translate(startX + blockWidth/2, startY + blockHeight/2);
      ctx.rotate(-Math.PI/2); // Rotate 90 degrees counterclockwise
      const fontSize = 24;
      ctx.font = `${fontSize}px junegull`;
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Subtle text shadow
      ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
      ctx.shadowBlur = 3;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;
      ctx.fillText(color.toUpperCase(), 0, 0);
      ctx.restore();

      startX += blockWidth + blockSpacing;
    });

    // Draw palette name in top left
    ctx.font = '32px junegull';
    ctx.fillStyle = palette.colors[0];
    ctx.textAlign = 'left';
    ctx.fillText(palette.name, 40, 50);

    // Draw branding in bottom right
    ctx.font = '24px junegull';
    ctx.fillStyle = palette.colors[palette.colors.length - 1];
    ctx.textAlign = 'right';
    ctx.fillText('COLORSNAKE.NEAR', canvas.width - 40, canvas.height - 40);
  };

  const handleGenerate = () => {
    setCurrentSeed(Math.random());
    generateCanvas();
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Create download link
    const link = document.createElement('a');
    link.download = `${palette.name.toLowerCase().replace(/\s+/g, '-')}-palette.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  // Generate initial canvas when component mounts
  useState(() => {
    generateCanvas();
  }, []);

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
      <div className={styles.buttonContainer}>
        <button
          className={styles.generateButton}
          onClick={handleGenerate}
        >
          Generate New Design
        </button>
        <button
          className={styles.downloadButton}
          onClick={handleDownload}
        >
          Download Palette Image
        </button>
      </div>
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