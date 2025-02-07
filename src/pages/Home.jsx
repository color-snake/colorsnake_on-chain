import styles from '@/styles/pages/home.module.css';

export const Home = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Color Palettes</h1>
      <div className={styles.paletteGrid}>
        {/* Palette components will be added here */}
        <p className={styles.comingSoon}>Color palettes coming soon...</p>
      </div>
    </div>
  );
};

export default Home;