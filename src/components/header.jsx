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
          <div className={styles.menuLine} />
          <div className={styles.menuLine} />
          <div className={styles.menuLine} />
        </button>
      </div>
    </header>
  );
};

Header.propTypes = {
  onMenuToggle: PropTypes.func.isRequired,
  isNavVisible: PropTypes.bool
};