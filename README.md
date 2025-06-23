

# Decentralised NFT Marketplace

A full-stack NFT marketplace application built with React.js and Ethereum smart contracts. This project allows users to mint, buy, sell, and trade NFTs on the Ethereum blockchain.

![NFT Marketplace](/ss/Screenshot%20from%202025-06-23%2016-10-55.png)

## Project Structure

- **`contracts/`**: Solidity smart contracts
  - `NFTmarketplace.sol`: Main contract for NFT minting and marketplace functionality
- **`client/`**: Frontend React application with Vite
  - `src/components/`: Reusable UI components
  - `src/pages/`: Page components for different routes
  - `src/context/`: React context for state management
  - `src/utils/`: Utility functions for IPFS and Pinata
- **`test/`**: Smart contract tests
- **`hardhat.config.js`**: Hardhat configuration for smart contract development
- **`ignition/`**: Deployment scripts and artifacts
  - `modules/`: Ignition deployment modules
  - `deployments/`: Deployment records for different networks

## Technologies Used

### Smart Contract / Backend

- Solidity ^0.8.0
- Hardhat
- Ignition (Hardhat's deployment system)
- OpenZeppelin Contracts
- Ethereum
- Sepolia testnet

### Frontend

- React.js with Vite
- Ethers.js for blockchain interaction
- IPFS for decentralized storage
- Pinata for pinning IPFS content
- CSS for styling

## Prerequisites

- Node.js >= 16.x
- npm or yarn
- MetaMask wallet extension

## Setup and Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd Decentralised-NFT-marketplace
```

### 2. Install backend dependencies

```bash
npm install
```

### 3. Install frontend dependencies

```bash
cd client
npm install
```

### 4. Create a `.env` file in the root directory

Create an environment file with the following variables:

```env
PRIVATE_KEY=your_private_key
ETHEREUM_NETWORK=sepolia  # or any other network
RPC_URL=your_rpc_url
PINATA_API_KEY=your_pinata_api_key
PINATA_SECRET_KEY=your_pinata_secret_key
```

### 5. Configure the frontend

Create a `.env` file in the `client` directory:

```env
VITE_CONTRACT_ADDRESS=your_deployed_contract_address
VITE_PINATA_API_KEY=your_pinata_api_key
VITE_PINATA_SECRET_KEY=your_pinata_secret_key
VITE_IPFS_GATEWAY=https://gateway.pinata.cloud/ipfs/
```

## Smart Contract Development

### Compile contracts

```bash
npx hardhat compile
```

### Run tests

```bash
npx hardhat test
```

### Deploy contracts

Using Ignition:

```bash
npx hardhat ignition deploy ignition/modules/Token.js --network <network-name>
```

Or using traditional scripts:

```bash
npx hardhat run scripts/deploy.js --network <network-name>
```

After deployment, copy the contract address to your client `.env` file.

## Frontend Development

### Start development server

For development:

```bash
cd client
npm run dev
```

This will start the development server (typically at [http://localhost:5173](http://localhost:5173) for Vite).

For production (requires build first):

```bash
cd client
npm run build
npm run preview
```

## Connecting to the dApp

1. Install MetaMask browser extension
2. Configure MetaMask to connect to Sepolia testnet
3. Get some test ETH from a Sepolia faucet
4. Connect your wallet to the dApp using the "Connect Wallet" button

## Features

- Connect wallet functionality
- Browse NFTs available in the marketplace
- Create and mint new NFTs
- Buy and sell NFTs
- View owned NFTs in user profile
- Real-time price updates

## Smart Contract Functions

The NFT marketplace contract (`NFTmarketplace.sol`) includes the following key functions:

- `mintNFT(string memory tokenURI)`: Create and mint a new NFT
- `listNFTForSale(uint256 tokenId, uint256 price)`: List an owned NFT on the marketplace
- `buyNFT(uint256 tokenId)`: Purchase an NFT listed on the marketplace
- `cancelListing(uint256 tokenId)`: Remove an NFT from sale
- `fetchMarketItems()`: View all NFTs currently for sale
- `fetchMyNFTs()`: View all NFTs owned by the caller
- `fetchItemsListed()`: View all NFTs that the caller has listed for sale

## Pages

- **Home**: Landing page with featured NFTs
- **Marketplace**: Browse all NFTs available for purchase
- **NFT Detail**: View detailed information about a specific NFT
- **Profile**: View owned and created NFTs
- **Sell NFT**: Interface for creating and listing new NFTs

## Screenshots

![Home Page](/ss/Screenshot%20from%202025-06-23%2016-10-43.png)
![Marketplace](/ss/Screenshot%20from%202025-06-23%2016-10-48.png)

## Troubleshooting

- **MetaMask not connecting**: Make sure you're on the Sepolia network
- **Transactions failing**: Ensure you have enough test ETH for gas fees
- **Images not loading**: Check if IPFS gateway is accessible or if Pinata API keys are correct

## License

This project is licensed under the MIT License.

## Acknowledgments

- OpenZeppelin for secure contract implementations
- Ethereum development community
- Pinata for IPFS pinning services
- Hardhat and Ignition for deployment tools
