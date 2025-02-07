import styles from '@/styles/pages.module.css';

export const HomePage = () => {
  return (
    <div className={styles.pageContainer}>
      <h1>Color Palettes</h1>
      <div className={styles.content}>
        <div className={styles.paletteGrid}>
          {/* Placeholder for color palettes */}
          <div className={styles.palettePlaceholder}>
            <p>Color palettes will be loaded here</p>
          </div>
        </div>
      </div>
    </div>
  );
};