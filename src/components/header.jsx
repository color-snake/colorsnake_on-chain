import PropTypes from 'prop-types';
import styles from '@/styles/header.module.css';
import { Link } from 'react-router-dom';

export const Header = ({ onMenuToggle, isNavVisible }) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link to="/" className={styles.title}>COLORSNAKE</Link>
        <div className={styles.nav}>
          <button
            className={`${styles.menuButton} ${isNavVisible ? styles.open : ''}`}
            onClick={() => onMenuToggle(!isNavVisible)}
            aria-label="Toggle navigation menu"
          >
            <div className={styles.menuLine}></div>
            <div className={styles.menuLine}></div>
            <div className={styles.menuLine}></div>
          </button>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  onMenuToggle: PropTypes.func.isRequired,
  isNavVisible: PropTypes.bool
};