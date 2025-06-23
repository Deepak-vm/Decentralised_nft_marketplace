import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { WalletContext } from '../../context/wallet.jsx';
import Header from '../../components/Header/Header.jsx';
import './SellNFT.css';

// Import marketplace contract data
import marketplace from '../../contracts/marketplace.json';

const SellNFT = () => {
  const [formParams, updateFormParams] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [fileURL, setFileURL] = useState(null);
  const [message, updateMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [btnContent, setBtnContent] = useState("List NFT");

  const navigate = useNavigate();
  const { isConnected, signer } = useContext(WalletContext);

  // File change handler - this is a placeholder
  // You'll need to implement actual IPFS upload functionality
  async function onFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    try {
      // Here you would normally upload to IPFS
      // This is a placeholder URL to simulate the process
      setFileURL(`https://ipfs.io/ipfs/sample/${file.name}`);
      updateMessage("File selected successfully");
    } catch (error) {
      console.error("Error uploading file:", error);
      updateMessage("Error uploading file");
    }
  }

  // Upload metadata to IPFS - placeholder
  async function uploadMetadataToIPFS() {
    if (!formParams.name || !formParams.description || !formParams.price || !fileURL) {
      updateMessage("Please fill all fields");
      return -1;
    }

    const nftJSON = {
      name: formParams.name,
      description: formParams.description,
      price: formParams.price,
      image: fileURL,
    };

    try {
      // Here you would normally upload the JSON to IPFS
      // This is a placeholder to simulate the process
      return `https://ipfs.io/ipfs/sample-metadata/${formParams.name}`;
    } catch (error) {
      console.error("Error uploading metadata:", error);
      updateMessage("Error uploading metadata");
      return -1;
    }
  }

  // List NFT on the marketplace
  async function listNFT(e) {
    e.preventDefault();
    if (!isConnected) {
      updateMessage("Please connect your wallet first");
      return;
    }

    try {
      setIsProcessing(true);
      setBtnContent("Processing...");

      const metadataURL = await uploadMetadataToIPFS();
      if (metadataURL === -1) {
        setIsProcessing(false);
        setBtnContent("List NFT");
        return;
      }

      updateMessage("Creating your NFT... Please wait");

      // Here you would interact with the smart contract
      const contract = new ethers.Contract(
        marketplace.address,
        marketplace.abi,
        signer
      );

      const price = ethers.parseEther(formParams.price);

      // This would be the actual contract call
      // const transaction = await contract.createToken(metadataURL, price);
      // await transaction.wait();

      // Simulating transaction success
      setTimeout(() => {
        setBtnContent("List NFT");
        setIsProcessing(false);
        updateMessage("");
        updateFormParams({ name: "", description: "", price: "" });
        setFileURL(null);
        alert("Successfully listed your NFT!");
        navigate("/marketplace");
      }, 2000);

    } catch (e) {
      console.error("Error listing NFT:", e);
      setIsProcessing(false);
      setBtnContent("List NFT");
      updateMessage("Error listing NFT. Please try again.");
    }
  }

  const isFormFilled = formParams.name && formParams.description &&
    formParams.price && fileURL;

  return (
    <div className="sellnft-container">
      <Header />
      <div className="sellnft-content">
        {isConnected ? (
          <div className="form-container">
            <h2 className="heading">Upload your NFT</h2>
            <div className="form">
              <div className="form-group">
                <label className="label">NFT name</label>
                <input
                  type="text"
                  className="input"
                  value={formParams.name}
                  onChange={(e) =>
                    updateFormParams({ ...formParams, name: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label className="label">NFT description</label>
                <textarea
                  className="input textarea"
                  value={formParams.description}
                  onChange={(e) =>
                    updateFormParams({
                      ...formParams,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label className="label">Price (in ETH)</label>
                <input
                  type="number"
                  step="0.01"
                  className="input"
                  value={formParams.price}
                  onChange={(e) =>
                    updateFormParams({ ...formParams, price: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label className="label">Upload image</label>
                <input
                  type="file"
                  className="input file-input"
                  onChange={onFileChange}
                />
              </div>

              {message && <div className="message">{message}</div>}

              <button
                onClick={listNFT}
                disabled={!isFormFilled || isProcessing}
                className={`btn ${isFormFilled && !isProcessing ? 'active-btn' : 'inactive-btn'}`}
              >
                {isProcessing && <span className="spinner" />}
                {btnContent}
              </button>
            </div>
          </div>
        ) : (
          <div className="not-connected">Connect Your Wallet to Continue...</div>
        )}
      </div>
    </div>
  );
};

export default SellNFT;
