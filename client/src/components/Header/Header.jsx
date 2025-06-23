import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { WalletContext } from '../../context/wallet.jsx';
import { BrowserProvider } from 'ethers';
import './Header.css';

export default function Header() {
    const {
        isConnected,
        setIsConnected,
        userAddress,
        setUserAddress,
        signer,
        setSigner
    } = useContext(WalletContext);

    const connectWallet = async() => {
        if(!window.ethereum){
            throw new Error("Metamask Not installed");            
        }
        try {
            const provider = new BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            setSigner(signer);
            const accounts = await provider.send("eth_requestAccounts", []);
            setIsConnected(true);
            setUserAddress(accounts[0]);
            const network = await provider.getNetwork();
            const chainID = network.chainId;
            const sepoliaNetworkID = "11155111";

            if(chainID.toString()!== sepoliaNetworkID){
                 alert("Switch to sepolia Testnet"); 
            }
            
        } catch (error) {
            console.error("connection Error:", error);
        }
    };

    return (
        <header className="header">
          <div className="container">
            <div className="logo">
              <Link to="/">
                <img src="/logo.png" width={100} height={100} alt="logo" />
              </Link>
            </div>
            <nav className="nav">
              <ul className="navLinks">
                <li>
                  <Link to="/marketplace" className="link">
                    MarketPlace
                  </Link>
                </li>
                <li>
                  <Link to="/sellNFT" className="link">
                    List
                  </Link>
                </li>
                <li>
                  <Link to="/profile" className="link">
                    Profile
                  </Link>
                </li>
              </ul>
              <button
                className={`ctaBtn ${
                  isConnected ? "activebtn" : "inactivebtn"
                }`}
                onClick={connectWallet}
              >
                {isConnected ? (
                  <>{userAddress?.slice(0, 8)}...</>
                ) : (
                  "Connect wallet"
                )}
              </button>
            </nav>
          </div>
        </header>
    );
}
