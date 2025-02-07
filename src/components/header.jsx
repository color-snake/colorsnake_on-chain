import PropTypes from 'prop-types';
import styles from '@/styles/header.module.css';

export const Header = ({ onMenuToggle, isNavVisible }) => {
  const handleMenuClick = () => {
    onMenuToggle(!isNavVisible);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <h1 className={styles.title}>colorsnake</h1>
        <button
          className={`${styles.menuButton} ${isNavVisible ? styles.open : ''}`}
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
  onMenuToggle: PropTypes.func.isRequired,
  isNavVisible: PropTypes.bool
};