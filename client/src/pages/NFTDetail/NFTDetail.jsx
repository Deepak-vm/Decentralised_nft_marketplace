import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import axios from "axios";
import { WalletContext } from "../../context/wallet.jsx";
import Header from "../../components/Header/Header";
import { getIpfsUrlFromPinata } from "../../utils/ipfsUtils";
import marketplaceJSON from "../../contracts/marketplace.json";
import "./NFTDetail.css";

export default function NFTDetail() {
  const params = useParams();
  const tokenId = params.tokenId;
  const [item, setItem] = useState(null);
  const [msg, setMsg] = useState("");
  const [btnContent, setBtnContent] = useState("Buy NFT");
  const { isConnected, userAddress, signer } = useContext(WalletContext);
  const navigate = useNavigate();

  async function getNFTData() {
    if (!signer) return;
    try {
      let contract = new ethers.Contract(
        marketplaceJSON.address,
        marketplaceJSON.abi,
        signer
      );

      let tokenURI = await contract.tokenURI(tokenId);
      console.log("Token URI:", tokenURI);

      const listedToken = await contract.getNFTListing(tokenId);

      if (tokenURI.startsWith("ipfs://")) {
        tokenURI = tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/");
      } else {
        tokenURI = getIpfsUrlFromPinata(tokenURI);
      }

      console.log("Formatted URI:", tokenURI);

      const meta = (await axios.get(tokenURI)).data;
      const item = {
        price: meta.price,
        tokenId,
        seller: listedToken.seller,
        owner: listedToken.owner,
        image: meta.image,
        name: meta.name,
        description: meta.description,
      };
      return item;
    } catch (error) {
      console.error("Error getting NFT data:", error);
      return null;
    }
  }

  useEffect(() => {
    async function fetchData() {
      if (!signer) return;
      try {
        const itemTemp = await getNFTData();
        setItem(itemTemp);
      } catch (error) {
        console.error("Error fetching NFT items:", error);
        setItem(null);
      }
    }

    if (isConnected) {
      fetchData();
    }
  }, [isConnected, signer, tokenId]);

  async function buyNFT() {
    try {
      if (!signer) return;
      let contract = new ethers.Contract(
        marketplaceJSON.address,
        marketplaceJSON.abi,
        signer
      );
      const salePrice = ethers.parseUnits(item.price, "ether").toString();
      setBtnContent("Processing...");
      setMsg("Buying the NFT... Please Wait (Upto 5 mins)");
      let transaction = await contract.executeSale(tokenId, {
        value: salePrice,
      });
      await transaction.wait();
      alert("You successfully bought the NFT!");
      setMsg("");
      setBtnContent("Buy NFT");
      navigate("/");
    } catch (e) {
      console.log("Buying Error: ", e);
      setMsg("Error purchasing NFT. Please try again.");
      setBtnContent("Buy NFT");
    }
  }

  if (!isConnected) {
    return (
      <div className="nft-detail-container">
        <Header />
        <div className="inner-container">
          <div className="not-connected">You are not connected...</div>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="nft-detail-container">
        <Header />
        <div className="inner-container">
          <div className="content">
            <div className="loading">Loading NFT data...</div>
          </div>
        </div>
      </div>
    );
  }

  const IPFSUrl = getIpfsUrlFromPinata(item.image);

  return (
    <div className="nft-detail-container">
      <Header />
      <div className="inner-container">
        <div className="content">
          <div className="nft-grid">
            <img src={IPFSUrl} alt={item.name} className="nft-image" />
            <div className="details">
              <div className="stats">
                <div className="stat">
                  <span className="label">Name:</span>
                  <span className="value">{item?.name}</span>
                </div>
                <div className="stat">
                  <span className="label">Description:</span>
                  <span className="value">{item?.description}</span>
                </div>
                <div className="stat">
                  <span className="label">Price:</span>
                  <span className="value">{item?.price} ETH</span>
                </div>
                <div className="stat">
                  <span className="label">Seller:</span>
                  <span className="value">{item?.seller}</span>
                </div>
              </div>
              <div className="cta-btn">
                <div className="msg">{msg}</div>
                {userAddress?.toLowerCase() === item?.seller?.toLowerCase() ? (
                  <div className="msg-alert">You already Own!</div>
                ) : (
                  <button
                    onClick={() => {
                      buyNFT();
                    }}
                    className="buy-btn"
                  >
                    {btnContent === "Processing..." && (
                      <span className="spinner" />
                    )}
                    {btnContent}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
