import React, { useEffect } from "react";
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";

const HomeScreen = () => {
  //get data object from Redux Store
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const dispatch = useDispatch();

  //get data from backend. trou proxy setting in package.json
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : products.length >= 1 ? (
        <div className="row center">
          {
            (console.log(products),
            products.map((product) => (
              <Product key={product._id} product={product} />
            )))
          }
        </div>
      ) : (
        <MessageBox variant="danger">No products found</MessageBox>
      )}
    </div>
  );
};

export default HomeScreen;
