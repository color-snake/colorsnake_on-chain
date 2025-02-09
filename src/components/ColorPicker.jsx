import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/components/color-picker.module.css';

const ColorPicker = ({ onColorChange, initialColor = '#000000' }) => {
  const [color, setColor] = useState(initialColor);
  const [rgb, setRgb] = useState({ r: 0, g: 0, b: 0 });

  useEffect(() => {
    // Convert hex to RGB on initial load
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(initialColor);
    if (result) {
      setRgb({
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      });
    }
  }, [initialColor]);

  const handleHexChange = (event) => {
    const newColor = event.target.value;
    if (/^#[0-9A-F]{6}$/i.test(newColor)) {
      setColor(newColor);
      onColorChange(newColor);
      // Update RGB sliders
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(newColor);
      if (result) {
        setRgb({
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        });
      }
    }
  };

  const handleRgbChange = (channel, value) => {
    const newRgb = { ...rgb, [channel]: value };
    setRgb(newRgb);
    const newColor = `#${newRgb.r.toString(16).padStart(2, '0')}${newRgb.g.toString(16).padStart(2, '0')}${newRgb.b.toString(16).padStart(2, '0')}`;
    setColor(newColor);
    onColorChange(newColor);
  };

  return (
    <div className={styles.colorPicker}>
      <div className={styles.hexInput}>
        <input
          type="text"
          value={color}
          onChange={handleHexChange}
          placeholder="#000000"
          pattern="^#[0-9A-Fa-f]{6}$"
        />
        <div 
          className={styles.colorPreview}
          style={{ backgroundColor: color }}
        />
      </div>
      <div className={styles.sliders}>
        <div className={styles.sliderGroup}>
          <label>R</label>
          <input
            type="range"
            min="0"
            max="255"
            value={rgb.r}
            onChange={(e) => handleRgbChange('r', parseInt(e.target.value))}
          />
          <span>{rgb.r}</span>
        </div>
        <div className={styles.sliderGroup}>
          <label>G</label>
          <input
            type="range"
            min="0"
            max="255"
            value={rgb.g}
            onChange={(e) => handleRgbChange('g', parseInt(e.target.value))}
          />
          <span>{rgb.g}</span>
        </div>
        <div className={styles.sliderGroup}>
          <label>B</label>
          <input
            type="range"
            min="0"
            max="255"
            value={rgb.b}
            onChange={(e) => handleRgbChange('b', parseInt(e.target.value))}
          />
          <span>{rgb.b}</span>
        </div>
      </div>
    </div>
  );
};

ColorPicker.propTypes = {
  onColorChange: PropTypes.func.isRequired,
  initialColor: PropTypes.string
};

export default ColorPicker;