import React, { useState } from "react";
import "./search.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncProducts } from "../../app/actions/productAction";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmimt = (e) => {
    e.preventDefault();
    dispatch(fetchAsyncProducts(keyword));
    navigate(`/products/${keyword}`);
  };

  return (
    <form className="search-box flex-center" onSubmit={handleSubmimt}>
      <div className="search-container">
        <input
          type="text"
          placeholder="search products..."
          name="search"
          id="search"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button className="btn flex-center" type="submit">
          Search
        </button>
      </div>
    </form>
  );
};

export default Search;
