import { getIpfsUrlFromPinata } from "../../utils/ipfsUtils";
import { Link } from "react-router-dom";
import "./NFTCard.css";

export default function NFTCard({ item }) {
  const IPFSUrl = getIpfsUrlFromPinata(item.image);

  const limitedDescription =
    item.description.length > 100
      ? item.description.substring(0, 100) + "..."
      : item.description;

  return (
    <div className="tile">
      <div className="imageContainer">
        <img src={IPFSUrl} alt={item.name} width={500} height={360} />
      </div>
      <div className="overlay">
        <Link to={`/nft/${item.tokenId}`} className="text">
          <strong>{item.name}</strong>
          <p>{limitedDescription}</p>
        </Link>
      </div>
    </div>
  );
}
