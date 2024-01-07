import { useDispatch, useSelector } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useEffect } from "react";
import { fetchProductDetails } from "../../app/actions/productAction";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import ReactStars from "react-rating-stars-component";
import "./productDetails.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GoCodeReview } from "react-icons/go";
import ProductReviews from "./ProductReviews";

const options = {
  edit: false,
  color: "rgba(20, 20, 20, 0.1)",
  activeColor: "tomato",
  isHalf: true,
  size: window.innerWidth < 600 ? 20 : 25,
};

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { productDetailLoader, product } = useSelector(
    (state) => state.products
  );
  const { id } = useParams();
  // console.log(id, productDetailLoader);
  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  return productDetailLoader ? (
    <Loader />
  ) : (
    <>
      <div className="product-details">
        <div className="product-details-images">
          <Carousel>
            {product.images === undefined ? (
              <Loader />
            ) : (
              product.images.map((img) => (
                <img
                  className="product-detail-img"
                  key={img.public_id}
                  src={img.public_id}
                  alt="none"
                />
              ))
            )}
          </Carousel>
        </div>
        <div className="product-details-content">
          <div className="product-details-content-name">
            <h1 className="product-name">{product.name}</h1>
            <p className="product-category">Category:{product.category}</p>
            <p className="product-id">Product id:{product._id}</p>
            <p>Description: {product.description}</p>
          </div>
          <div className="product-details-content-price">
            <div className="product-rating">
              <ReactStars {...options} value={product.ratings} />{" "}
              <p>{`${product.numberOfReviews} reviews`}</p>
            </div>
            <p>
              <h3 className="product-price">₹{product.price}</h3>
            </p>
          </div>
          <div className="product-details-content-other">
            <div className="increase-quantity">
              <button className="">-</button>
              <input type="number" className="flex-center" />
              <button className="">+</button>
            </div>
            <div className="product-stock">
              <strong>Stock: </strong>
              <span className={`${product.stock < 1 ? "red" : "green"}`}>
                {product.stock < 1 ? "Out of stock" : "In Stock"}
              </span>
            </div>

            <div className="product-details-content-other-buttons">
              <button className="btn flex-center">
                Add to cart
                <AiOutlineShoppingCart />
              </button>
              <button className="btn flex-center">
                Submit Review <GoCodeReview />
              </button>
            </div>
          </div>
        </div>
      </div>
      <ProductReviews reviews={product.reviews} />
    </>
  );
};

export default ProductDetails;
