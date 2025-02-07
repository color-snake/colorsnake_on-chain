import { useState } from 'react';
import styles from '@/styles/header.module.css';
import PropTypes from 'prop-types';

export const Header = ({ onMenuToggle }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
    onMenuToggle(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <h1 className={styles.title}>colorsnake</h1>
        <button
          className={`${styles.menuButton} ${isMenuOpen ? styles.open : ''}`}
          onClick={handleMenuClick}
          aria-label="Toggle navigation menu"
        >
          <div className={styles.snakeHead}>
            <div className={styles.eye} />
          </div>
          <div className={styles.snakeBody} />
          <div className={styles.snakeTail} />
        </button>
      </div>
    </header>
  );
};

Header.propTypes = {
  onMenuToggle: PropTypes.func.isRequired
};