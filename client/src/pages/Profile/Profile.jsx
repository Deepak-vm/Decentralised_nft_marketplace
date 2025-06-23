import { useState, useContext, useEffect } from 'react';
import { ethers } from 'ethers';
import { WalletContext } from '../../context/wallet.jsx';
import Header from '../../components/Header/Header.jsx';
import NFTCard from '../../components/NFTCard/NFTCard.jsx';
import './Profile.css';

// Import your marketplace ABI and contract address
import marketplaceData from '../../contracts/marketplace.json';

const Profile = () => {
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState("0");
  const { isConnected, userAddress, signer } = useContext(WalletContext);

  async function getNFTItems() {
    let sumPrice = 0;
    const itemsArray = [];

    if (!signer) return { itemsArray, sumPrice };

    try {
      let contract = new ethers.Contract(
        marketplaceData.address,
        marketplaceData.abi,
        signer
      );

      const transaction = await contract.getMyNFTs();

      for (const i of transaction) {
        const tokenId = parseInt(i.tokenId);
        const tokenURI = await contract.tokenURI(tokenId);
        // Replace with your utility function for IPFS URLs
        const meta = await fetchMetadata(tokenURI);
        const price = ethers.formatEther(i.price);

        const item = {
          price,
          tokenId,
          seller: i.seller,
          owner: i.owner,
          image: meta.image,
          name: meta.name,
          description: meta.description,
        };

        itemsArray.push(item);
        sumPrice += Number(price);
      }
    } catch (error) {
      console.error("Error fetching NFTs:", error);
    }

    return { itemsArray, sumPrice };
  }

  // Simple fetch metadata function - replace with your actual implementation
  const fetchMetadata = async (url) => {
    try {
      // This is a placeholder for your actual IPFS fetch logic
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.error("Error fetching metadata:", error);
      return { name: "Unknown", description: "Error loading", image: "/placeholder.png" };
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { itemsArray, sumPrice } = await getNFTItems();
        setItems(itemsArray);
        setTotalPrice(sumPrice);
      } catch (error) {
        console.error("Error fetching NFT items:", error);
      }
    };

    if (isConnected) {
      fetchData();
    }
  }, [isConnected, signer]);

  return (
    <div className="profile-container">
      <Header />
      <div className="profile-content">
        {isConnected ? (
          <>
            <div className="user-info">
              <span className="label">Wallet Address:</span>
              <span className="address">{userAddress}</span>
            </div>
            <div className="stats">
              <div className="stat">
                <span className="label">Number of NFTs:</span>
                <span className="value">{items?.length || 0}</span>
              </div>
              <div className="stat">
                <span className="label">Total Value:</span>
                <span className="value">{totalPrice} ETH</span>
              </div>
            </div>
            <div className="nft-section">
              <h2 className="heading">Your NFTs</h2>
              {items && items.length > 0 ? (
                <div className="nft-grid">
                  {items.map((item, index) => (
                    <NFTCard key={index} item={item} />
                  ))}
                </div>
              ) : (
                <div className="no-nft">You don't have any NFTs yet...</div>
              )}
            </div>
          </>
        ) : (
          <div className="not-connected">Connect Your Wallet to Continue...</div>
        )}
      </div>
    </div>
  );
};

export default Profile;
