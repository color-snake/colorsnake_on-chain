import styles from '@/styles/pages.module.css';

export const AboutPage = () => {
  return (
    <div className={styles.pageContainer}>
      <h1>About ColorSnake</h1>
      <div className={styles.content}>
        <p>This app is built fully on the NEAR chain and uses React to build a front end to interact with a smart contract that is deployed on chain.</p>
        <div className={styles.contractInfo}>
          <h2>Contract Addresses</h2>
          <ul>
            <li>web4.colorsnake.near/.testnet - Website</li>
            <li>palette.colorsnake.near/.testnet - Color Palettes Storage</li>
          </ul>
        </div>
        <div className={styles.socialLinks}>
          <h2>Social & Links</h2>
          <ul>
            <li><a href="https://colorsnake.near.social" target="_blank" rel="noopener noreferrer">colorsnake.near</a></li>
            <li><a href="https://sleet.near.page" target="_blank" rel="noopener noreferrer">sleet.near</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};