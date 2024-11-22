import Image from "next/image";
import Header from "./components/Header/header";
import styles from "./page.module.css";

import Link from "next/link";
export default function HomePage() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.hero}>
        <div>
          <h1 className={styles.heading}>
            Welcome to  ClickAndCrypt !
          </h1>
          <p className={styles.description}>
          Buy and Trade NFTs Decentralized.
          </p>
          <div className={styles.btns}>
            <Link
              href="/marketplace"
              className={`${styles.btn} ${styles.buyBtn}`}
            >
              Buy Now!
            </Link>
            <Link href="/sellNFT" className={styles.btn}>
              List Now!
            </Link>
          </div>
        </div>
        <Image src="/pic1.png" alt="NFTs" width={1000} height={650} />
      </div>
    </div>
  );
}