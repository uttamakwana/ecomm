import ReactStars from "react-rating-stars-component";
import "./productReview.css";

const ProductReviews = ({ reviews }) => {
  console.log(reviews);

  const options = {
    edit: false,
    color: "rgba(20, 20, 20, 0.1)",
    activeColor: "tomato",
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25,
  };
  return reviews && reviews.length > 0 ? (
    <section className="product-reviews">
      <h1>Reviews</h1>
      <div className="product-reviews-container">
        {reviews &&
          reviews.map((review) => (
            <div className="review-card">
              <h3>{review.name}</h3>
              <ReactStars {...options} value={review.rating} />{" "}
              <p>{review.comment}</p>
            </div>
          ))}
      </div>
    </section>
  ) : (
    <div className="flex-center">
      <p className="no-reviews-yet">No reviews yet</p>
    </div>
  );
};

export default ProductReviews;
