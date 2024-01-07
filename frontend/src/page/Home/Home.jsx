import "./home.css";
import { BsMouse } from "react-icons/bs";
import { Product } from "../../containers";
import MetaData from "../MetaData.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAsyncProducts } from "../../app/actions/productAction";
import { Loader } from '../../components';

const product = {
  images: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzXzdSRirQia2KJ5JUrgUtZN9jC1sJLNB3CQ&usqp=CAU",
  ],
  price: 1200,
  name: "Men's T-shirt",
  rating: 2.5,
  noOfReviews: 10,
  _id: 1,
};

const Home = () => {
  const dispatch = useDispatch();
  const { products, loader, productsCount, message } = useSelector(
    (state) => state.products
  );
  // console.log(loader);
  // console.log(products);
  // console.log(productsCount, message);
  useEffect(() => {
    dispatch(fetchAsyncProducts());
  }, [dispatch]);
  return loader ? (
    <Loader />
  ) : (
    <div className="home-page">
      <MetaData title="TreandHeaven | Home" />
      <div className="home flex-center">
        <main className="home-content">
          <h3>Welcome to TrendHaven</h3>
          <h1>Find amazing products below</h1>
          <a href="#featured-product" className="btn">
            Scroll <BsMouse />{" "}
          </a>
        </main>
      </div>
      <div className="featured-product" id="featured-product">
        <h1 className="featured-product-heading flex-center">
          <span>Featured Product</span>
        </h1>
        <div className="featured-product-container flex-center">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
