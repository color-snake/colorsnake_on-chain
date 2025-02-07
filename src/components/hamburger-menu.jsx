import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from '@/styles/hamburger-menu.module.css';

export const HamburgerMenu = ({ isOpen, toggleMenu }) => {
  return (
    <div className={styles.menuContainer}>
      <button className={`${styles.hamburger} ${isOpen ? styles.open : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <nav className={`${styles.menu} ${isOpen ? styles.active : ''}`}>
        <ul>
          <li><Link to="/" onClick={toggleMenu}>Color Palettes</Link></li>
          <li><Link to="/share" onClick={toggleMenu}>Share</Link></li>
          <li><Link to="/submit" onClick={toggleMenu}>Submit</Link></li>
          <li><Link to="/about" onClick={toggleMenu}>About</Link></li>
        </ul>
      </nav>
    </div>
  );
};

HamburgerMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired
};