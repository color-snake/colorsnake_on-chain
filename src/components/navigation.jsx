import { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from '@/styles/navigation.module.css';
import networkStyles from '@/styles/network-toggle.module.css';
import { NearContext } from '@/wallets/near';

export const Navigation = ({ isNavVisible, setIsNavVisible }) => {
  const { networkId, onNetworkChange, signedAccountId, wallet } = useContext(NearContext);

  const handleNetworkToggle = (e) => {
    const newNetwork = e.target.checked ? 'mainnet' : 'testnet';
    onNetworkChange(newNetwork);
  };

  const handleLogin = () => {
    if (!signedAccountId) {
      wallet.signIn();
    } else {
      wallet.signOut();
    }
    setIsNavVisible(false);
  };

  return (
    <nav className={`${styles.navbar} ${isNavVisible ? styles.visible : ''}`}>
      <div className={styles.navContent}>
        <Link to="/" className={styles.navLink} onClick={() => setIsNavVisible(false)}>Home</Link>
        <Link to="/submit" className={styles.navLink} onClick={() => setIsNavVisible(false)}>Submit</Link>
        <Link to="/about" className={styles.navLink} onClick={() => setIsNavVisible(false)}>About</Link>
        <div className={styles.toggleContainer}>
          <div className={networkStyles.networkToggle}>
            <input
              type="checkbox"
              className={networkStyles.networkToggleInput}
              id="networkToggle"
              checked={networkId === 'mainnet'}
              onChange={handleNetworkToggle}
            />
            <label className={networkStyles.networkToggleLabel} htmlFor="networkToggle">
              <div className={networkStyles.networkToggleInner}>
                <div className={networkStyles.networkToggleSwitch} />
              </div>
            </label>
          </div>
        </div>
        <button className={styles.loginButton} onClick={handleLogin}>
          {signedAccountId ? 'Logout' : 'Login'}
        </button>
      </div>
    </nav>
  );
};

Navigation.propTypes = {
  isNavVisible: PropTypes.bool.isRequired,
  setIsNavVisible: PropTypes.func.isRequired
};
