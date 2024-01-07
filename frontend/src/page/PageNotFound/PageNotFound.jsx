import { Link } from "react-router-dom";
import "./style.css";


const PageNotFound = ({ keyword, length }) => {
  return (
    <section className="page-not-found flex-center">
      {keyword || length === 0 ? (
        <>
          {length === 0 ? (
            <h1>Sorry! " {length} "product found!</h1>
          ) : (
            <h1>Sorry! product " {keyword} "not found!</h1>
          )}
          <h3>Please check the product name again</h3>
          <h5>Have a good day!😀</h5>
          <Link
            to="/products/"
            className="btn"
          >
            Products
          </Link>
        </>
      ) : (
        <>
          <h1>Sorry! This page is not found</h1>
          <h3>Please check the url and try again</h3>
          <h5>Have a good day!😀</h5>
          <Link to="/" className="btn">
            Home
          </Link>
        </>
      )}
    </section>
  );
};

export default PageNotFound;
