import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { WalletContextProvider } from './context/wallet.jsx';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <WalletContextProvider>
                <App />
            </WalletContextProvider>
        </BrowserRouter>
    </React.StrictMode>
);
