import { Navigation } from './components/navigation';
import { Footer } from './components/footer';
import { Header } from './components/header';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Submit from './pages/Submit';
import About from './pages/About';
import PaletteDetail from './pages/PaletteDetail';
import Profile from './pages/Profile';
import { useEffect, useState } from 'react';
import { NearContext, Wallet } from '@/wallets/near';

function App() {
  const [signedAccountId, setSignedAccountId] = useState(null);
  const [networkId, setNetworkId] = useState(() => {
    return localStorage.getItem('networkId') || 'mainnet';
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
        <Header onMenuToggle={setIsNavVisible} isNavVisible={isNavVisible} />
        <Navigation isNavVisible={isNavVisible} setIsNavVisible={setIsNavVisible} />
        <main className="mt-4 flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/submit" element={<Submit />} />
            <Route path="/about" element={<About />} />
            <Route path="/palette/:id" element={<PaletteDetail networkId={networkId} />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </NearContext.Provider>
  )
}

export default App
