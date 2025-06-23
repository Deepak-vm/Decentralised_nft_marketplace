import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import "./Home.css";

export default function HomePage() {
  return (
    <div className="home-container">
      <Header />
      <div className="hero">
        <div>
          <h1 className="heading">
            Welcome to ClickAndCrypt!
          </h1>
          <p className="description">
            Buy and Trade NFTs Decentralized.
          </p>
          <div className="btns">
            <Link
              to="/marketplace"
              className="btn buyBtn"
            >
              Buy Now!
            </Link>
            <Link to="/sellNFT" className="btn">
              List Now!
            </Link>
          </div>
        </div>
        <img src="/pic1.png" alt="NFTs" width={1000} height={650} />
      </div>
    </div>
  );
}
