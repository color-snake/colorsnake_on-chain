import styles from '@/styles/pages/about.module.css';

export const About = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>How This App Works</h1>
      <div className={styles.content}>
        <p>This app is built fully on the NEAR chain and uses React to build a front end to interact with smart contracts deployed on chain.</p>
        
        <h2>Contract Addresses</h2>
        <ul className={styles.contractList}>
          <li>web4.colorsnake.near/.testnet - Website</li>
          <li>palette.colorsnake.near/.testnet - Color Palette Storage</li>
        </ul>

        <h2>Social & Links</h2>
        <div className={styles.links}>
          <a href="https://colorsnake.near.social" target="_blank" rel="noopener noreferrer">colorsnake.near</a>
          <a href="https://sleet.near.page/" target="_blank" rel="noopener noreferrer">sleet.near</a>
        </div>
      </div>
    </div>
  );
};

export default About;