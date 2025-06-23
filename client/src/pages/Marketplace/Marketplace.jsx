import { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import { WalletContext } from "../../context/wallet.jsx";
import Header from "../../components/Header/Header";
import NFTCard from "../../components/NFTCard/NFTCard";
import marketplaceJSON from "../../contracts/marketplace.json";
import "./Marketplace.css";

export default function Marketplace() {
  const [items, setItems] = useState([]);
  const { isConnected, signer } = useContext(WalletContext);

  async function getNFTitems() {
    const itemsArray = [];
    if (!signer) return [];

    let contract = new ethers.Contract(
      marketplaceJSON.address,
      marketplaceJSON.abi,
      signer
    );

    let transaction = await contract.getAllListedNFTs();

    for (const i of transaction) {
      const tokenId = parseInt(i.tokenId);
      let tokenURI = await contract.tokenURI(tokenId);
      if (tokenURI.startsWith("ipfs://")) {
        tokenURI = tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/");
      }
      const meta = (await axios.get(tokenURI)).data;
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
    }
    return itemsArray;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemsArray = await getNFTitems();
        setItems(itemsArray);
      } catch (error) {
        console.error("Error fetching NFT items:", error);
      }
    };

    if (isConnected) {
      fetchData();
    }
  }, [isConnected, signer]);

  return (
    <div className="marketplace-container">
      <Header />
      <div className="inner-container">
        <div className="content">
          {isConnected ? (
            <>
              <div className="nft-section">
                <h2 className="heading">NFT Marketplace</h2>
                {items?.length > 0 ? (
                  <div className="nft-grid">
                    {items?.map((value, index) => (
                      <NFTCard item={value} key={index} />
                    ))}
                  </div>
                ) : (
                  <div className="no-nft">No NFT Listed Now...</div>
                )}
              </div>
            </>
          ) : (
            <div className="not-connected">You are not connected...</div>
          )}
        </div>
      </div>
    </div>
  );
}
