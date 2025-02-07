import { Navigation } from './components/navigation';
import { Footer } from './components/footer';
import { Header } from './components/header';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Share from './pages/Share';
import Submit from './pages/Submit';
import About from './pages/About';
import { useEffect, useState } from 'react';
import { NearContext, Wallet } from '@/wallets/near';

function App() {
  const [signedAccountId, setSignedAccountId] = useState(null);
  const [networkId, setNetworkId] = useState(() => {
    return localStorage.getItem('networkId') || 'testnet';
  });
  const [wallet, setWallet] = useState(() => new Wallet({ networkId, createAccessKeyFor: signedAccountId }));

  useEffect(() => {
    wallet.startUp(setSignedAccountId);
    return () => {
      wallet.cleanup();
    };
  }, [wallet]);

  const handleNetworkChange = async (newNetwork) => {
    if (signedAccountId) {
      const confirmed = window.confirm('Please log out before changing networks to ensure proper wallet state management.');
      if (!confirmed) return;
      await wallet.signOut();
    }
    await wallet.cleanup();
    localStorage.setItem('networkId', newNetwork);
    setNetworkId(newNetwork);
    const newWallet = new Wallet({ networkId: newNetwork, createAccessKeyFor: signedAccountId });
    await newWallet.startUp(setSignedAccountId);
    setWallet(newWallet);
    window.location.reload();
  };

  const [isNavVisible, setIsNavVisible] = useState(false);

  return (
    <NearContext.Provider value={{ wallet, signedAccountId, networkId, onNetworkChange: handleNetworkChange }}>
      <div className="container d-flex flex-column min-vh-100">
        <Header onMenuToggle={setIsNavVisible} />
        {isNavVisible && <Navigation />}
        <main className="mt-4 flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/share" element={<Share />} />
            <Route path="/submit" element={<Submit />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </NearContext.Provider>
  )
}

export default App
