# NFT Marketplace Frontend

This is the frontend application for the Decentralized NFT Marketplace. It's built with React and Vite for fast development and optimized production builds.

## Features

- Connect to MetaMask wallet
- Browse NFTs available on the marketplace
- View detailed information about specific NFTs
- Create and mint new NFTs
- List owned NFTs for sale
- Purchase NFTs from other users
- View user profile with owned and created NFTs

## Project Structure

- **`src/components/`**: Reusable UI components
  - `Header/`: Navigation and wallet connection
  - `NFTCard/`: Card component for displaying NFT information
- **`src/pages/`**: Page components for different routes
  - `Home/`: Landing page
  - `Marketplace/`: NFT browsing page
  - `NFTDetail/`: Detailed view of a specific NFT
  - `Profile/`: User's NFTs and account information
  - `SellNFT/`: Form for creating and listing new NFTs
- **`src/context/`**: React context for state management
  - `wallet.jsx`: Wallet connection and blockchain state
- **`src/utils/`**: Utility functions
  - `ipfsUtils.js`: Functions for IPFS integration
  - `pinataService.js`: Integration with Pinata API

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

1. Create a `.env` file with the following variables:

   ```env
   VITE_CONTRACT_ADDRESS=your_deployed_contract_address
   VITE_PINATA_API_KEY=your_pinata_api_key
   VITE_PINATA_SECRET_KEY=your_pinata_secret_key
   VITE_IPFS_GATEWAY=https://gateway.pinata.cloud/ipfs/
   ```

1. Start the development server:

   ```bash
   npm run dev
   ```

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Development Notes

- The application uses Ethers.js for blockchain interaction
- IPFS is used for decentralized storage of NFT metadata and images
- Wallet connection is managed through the wallet context
- Contract ABI is stored in `src/contracts/marketplace.json`
