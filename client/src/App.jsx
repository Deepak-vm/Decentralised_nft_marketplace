import { Routes, Route } from 'react-router-dom';
import { WalletContextProvider } from './context/wallet.jsx';
import './App.css';

import HomePage from './pages/Home/Home.jsx';
import Marketplace from './pages/Marketplace/Marketplace.jsx';
import NFTDetail from './pages/NFTDetail/NFTDetail.jsx';
import Profile from './pages/Profile/Profile.jsx';
import SellNFT from './pages/SellNFT/SellNFT.jsx';

const App = () => {
  return (
    <WalletContextProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/nft/:tokenId" element={<NFTDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sellNFT" element={<SellNFT />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </WalletContextProvider>
  );
};

export default App;
