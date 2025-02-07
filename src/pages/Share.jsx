import styles from '@/styles/pages/share.module.css';

export const Share = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Share Your Palette</h1>
      <div className={styles.canvasContainer}>
        {/* Canvas for palette sharing will be implemented here */}
        <p>Palette sharing canvas coming soon...</p>
      </div>
    </div>
  );
};

export default Share;