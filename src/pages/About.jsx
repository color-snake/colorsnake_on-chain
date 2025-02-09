import styles from '@/styles/pages/about.module.css';

export const About = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
      <h1 className={styles.title}>How This App Works</h1>
        <p>This app is built fully on the NEAR chain and uses React to build a front end to interact with smart contracts deployed on chain.</p>
        <br/>
        <h4>Contract Addresses:</h4>
        <ul className={styles.contractList}>
          <li>web4.colorsnake.near/.testnet - Website</li>
          <li>palette.colorsnake.near/.testnet - Color Palette Storage</li>
        </ul>
      </div>

      <div className={styles.socialSection}>
        {/* <h2>Social & Links</h2> */}
        <div className={styles.links}>
          <a 
            href="https://colorsnake.near.social" 
            target="_blank" 
            rel="noopener noreferrer"
            data-description="color palettes on chain"
          >colorsnake.near</a>
          <a 
            href="https://sleet.near.page/" 
            target="_blank" 
            rel="noopener noreferrer"
            data-description="unique names and design on near"
          >sleet.near</a>
          <a 
            href="https://nonresistant.near.social" 
            target="_blank" 
            rel="noopener noreferrer"
            data-description="just trying to create something that is real"
          >nonresistant.near</a>
        </div>
      </div>
    </div>
  );
};

export default About;