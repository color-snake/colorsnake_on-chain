import { Routes, Route } from 'react-router-dom';
import { Navigation } from '@/components/navigation';
import { HomePage } from '@/pages/HomePage';
import { AboutPage } from '@/pages/AboutPage';
import { SharePage } from '@/pages/SharePage';
import { SubmitPage } from '@/pages/SubmitPage';
import styles from '@/styles/app.module.css';

export default function App() {
  return (
    <div className={styles.main}>
      <Navigation />
      <div className={styles.content}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/share" element={<SharePage />} />
          <Route path="/submit" element={<SubmitPage />} />
        </Routes>
      </div>
    </div>
  );
}
