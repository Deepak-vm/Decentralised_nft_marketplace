"use client";


import { WalletContext } from "@/context/wallet";
import { BrowserProvider } from "ethers";
import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./header.module.css";



export default function Header(){
    const {
        isConnected,
        setIsConnected,
        userAddress,
        setUserAddress,
        signer,
        setSigner
    } = useContext(WalletContext);

    const connectWallet = async()=> {
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
        <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">
            <Image src="/logo.png" width={100} height={100} alt="logo" />
          </Link>
        </div>
        <nav className={styles.nav}>
          <ul className={styles.navLinks}>
            <li>
              <Link href="/marketplace" className={styles.link}>
                MarketPlace
              </Link>
            </li>
            <li>
              <Link href="/sellNFT" className={styles.link}>
                List
              </Link>
            </li>
            <li>
              <Link href="/profile" className={styles.link}>
                Profile
              </Link>
            </li>
          </ul>
          <button
            className={`${styles.ctaBtn} ${
              isConnected ? styles.activebtn : styles.inactivebtn
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