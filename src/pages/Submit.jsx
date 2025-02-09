import { useState } from 'react';
import { useWallet } from '@/wallets/near';
import styles from '@/styles/pages/submit.module.css';
import ColorPicker from '@/components/ColorPicker';

export const Submit = () => {
  const { wallet, signedAccountId } = useWallet();
  const [paletteName, setPaletteName] = useState('');
  const [colors, setColors] = useState(['#000000']);
  const [currentColor, setCurrentColor] = useState('#000000');

  const handleAddColor = () => {
    if (colors.length < 5) {
      setColors([...colors, currentColor]);
    }
  };

  const handleRemoveColor = (index) => {
    setColors(colors.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!wallet) {
      alert('Please connect your wallet first');
      return;
    }
    if (!paletteName.trim()) {
      alert('Please enter a palette name');
      return;
    }
    if (colors.length < 2) {
      alert('Please add at least 2 colors');
      return;
    }

    try {
      // Call the contract to add the palette
      const contractId = `palette.colorsnake.${wallet.networkId}`;
      await wallet.callMethod({
        contractId,
        method: 'add_palette',
        args: {
          name: paletteName,
          colors: colors
        }
      });
      // Reset form
      setPaletteName('');
      setColors(['#000000']);
      alert('Palette submitted successfully!');
    } catch (error) {
      console.error('Error submitting palette:', error);
      alert('Failed to submit palette. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Submit a Color Palette</h1>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="paletteName">Palette Name</label>
            <input
              type="text"
              id="paletteName"
              value={paletteName}
              onChange={(e) => setPaletteName(e.target.value)}
              placeholder="Enter palette name"
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label>Colors ({colors.length}/5)</label>
            {colors.map((color, index) => (
              <div key={index} className={styles.colorItem}>
                <div
                  className={styles.colorPreview}
                  style={{ backgroundColor: color }}
                />
                <span>{color}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveColor(index)}
                  className={styles.removeButton}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className={styles.formGroup}>
            <label>Add New Color</label>
            <ColorPicker
              onColorChange={setCurrentColor}
              initialColor={currentColor}
            />
            <button
              type="button"
              onClick={handleAddColor}
              disabled={colors.length >= 5}
              className={styles.addButton}
            >
              Add Color
            </button>
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={!signedAccountId}
          >
            {signedAccountId ? 'Submit Palette' : 'Connect Wallet to Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Submit;