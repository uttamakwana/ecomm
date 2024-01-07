import ReactStars from "react-rating-stars-component";
import "./product.css";
import { Link } from "react-router-dom";

const options = {
  edit: false,
  color: "rgba(20, 20, 20, 0.1)",
  activeColor: "tomato",
  isHalf: true,
  size: window.innerWidth < 600 ? 20 : 25,
};

const Product = ({ product }) => {
  return (
    <Link
      to={`/product/${product._id}`}
      style={{ textDecoration: "none", color: "var(--color-dark-purple)" }}
    >
      <main className="product-card">
        <img src={product.images[0].public_id} alt="none" />
        <div className="product-card-content">
          <p>{product.name}</p>
          <p>{product.category}</p>
          <div className="product-card-stars">
            <ReactStars {...options} value={product.ratings} />{" "}
            <span>{product.numberOfReviews} reviews</span>
          </div>
          <span>₹{product.price}</span>
        </div>
      </main>
    </Link>
  );
};

export default Product;
