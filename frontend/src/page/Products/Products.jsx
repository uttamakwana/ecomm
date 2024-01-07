import { useEffect, useState } from "react";
import { Loader } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncProducts } from "../../app/actions/productAction";
import { Product } from "../../containers";
import "./products.css";
import { useParams } from "react-router-dom";
import PageNotFound from "../PageNotFound/PageNotFound";
import Pagination from "react-js-pagination";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const Products = () => {
 const categories = ["Tech", "Laptop", "Footwear", "Fashion", "None"]
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 50000]);
  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  const { products, loader, productsCount } = useSelector(
    (state) => state.products
  );
  console.log(productsCount, "product cont");
  const dispatch = useDispatch();
  const { keyword } = useParams();
  useEffect(() => {
    dispatch(fetchAsyncProducts({ keyword, currentPage, price })); // Use currentPage from the state
  }, [dispatch, keyword, currentPage, price]);

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber); // Update the state with the new currentPage
  };
  return loader ? (
    <Loader />
  ) : (
    <section className="all-products">
      {products && products.length > 0 ? (
        <>
          <div className="filters">
            <Box sx={{ width: 300 }}>
              <p>Price:</p>
              <Slider
                value={price}
                onChange={priceHandler}
                valueLabelDisplay="auto"
                aria-aria-labelledby="range-slider"
                min={0}
                max={50000}
              />
            </Box>
            <div className="category">
              <ul className="category-list">
              <strong>Categories:</strong>
                {categories.map((category, index) => (
                  <li key={index}>{category}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="products-container featured-product-container flex-center">
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
          <div className="pagination-box flex-center">
            {productsCount < 10 ? (
              <></>
            ) : (
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={10}
                totalItemsCount={productsCount}
                onChange={(pageNumber) => setCurrentPageNo(pageNumber)}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageItemLinkActive"
              />
            )}
          </div>
        </>
      ) : (
        <PageNotFound keyword={keyword} length={products.length} />
      )}
    </section>
  );
};

export default Products;
