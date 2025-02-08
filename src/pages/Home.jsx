import styles from '@/styles/pages/home.module.css';
import PaletteGrid from '../components/PaletteGrid';

export const Home = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Color Palettes</h1>
      <PaletteGrid />
    </div>
  );
};

export default Home;