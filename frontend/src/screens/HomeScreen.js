import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import { listTopSellers } from "../actions/userActions";
import img from "../image/img.png";
import img1 from "../image/img1.png";
import img2 from "../image/img2.png";
import img3 from "../image/img3.png";
import img4 from "../image/img4.png";
import img5 from "../image/img5.png";
import img6 from "../image/img6.png";
import img7 from "../image/img7.png";
import backArrow from "../image/back-arrow.png";
import nextArrow from "../image/next-arrow.png";
import image1 from "../image/augmented-reality-3468596_1280.jpeg";
import image2 from "../image/bee-2984342_1280.jpeg";
import image3 from "../image/tablet-1719191_1280.jpeg";

//TODO: featured products need to get own pagination

const HomeScreen = () => {
  const [imgs, setImgs] = useState(0);
  const [changeBackArrow, setChangeBackArrow] = useState({
    arrowDirection: "",
    arrow: backArrow,
  });
  const [changeNextArrow, setChangeNextArrow] = useState({
    arrowDirection: "",
    arrow: nextArrow,
  });
  const imgsArray = [img, img1, img2, img3, img4, img5, img6, img7];

  //get data object from Redux Store
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const userTopSellerList = useSelector((state) => state.userTopSellerList);
  const {
    loading: loadingSellers,
    error: errorSellers,
    users: sellers,
  } = userTopSellerList;

  const dispatch = useDispatch();

  //get data from backend. trou proxy setting in package.json
  useEffect(() => {
    // return empty object = No filter
    dispatch(listProducts({}));
    dispatch(listTopSellers());
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      setImgs((imgs) => imgs + 1);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  if (imgs === imgsArray.length) {
    setImgs(0);
  }

  const changeArrowDirection = () => {
    setChangeBackArrow({ arrowDirection: "nextArrow", arrow: nextArrow });
    setChangeNextArrow({ arrowDirection: "backArrow", arrow: backArrow });
  };
  const defaultArrowDirection = () => {
    setChangeBackArrow({ arrowDirection: "", arrow: backArrow });
    setChangeNextArrow({ arrowDirection: "", arrow: nextArrow });
  };

  return (
    <div>
      <div className="container-home">
        <div className="content">
          <button className="btn"> Collection</button>
          <h1>
            You should always <br />
            feel pretty
          </h1>
          <p>lorem ipsum dorem forem larom text</p>
          <div className="arrow-icons">
            <img
              className={changeBackArrow?.arrowDirection}
              onMouseOver={changeArrowDirection}
              onMouseLeave={defaultArrowDirection}
              src={changeBackArrow.arrow}
              alt="back arrow"
            />
            <img
              className={changeNextArrow?.arrowDirection}
              id="defaultArrowDirection"
              src={changeNextArrow.arrow}
              alt="next arrow"
            />
          </div>
        </div>
        <img key={imgs} src={imgsArray[imgs]} alt="" className="feature-img" />
      </div>

      <div className="featured-Products">
        <h1 className="homeScreen-h1">Featured Products</h1>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : Array.isArray(products) ? (
          <div className="row center">
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <MessageBox variant="danger">No products found</MessageBox>
        )}
      </div>

      <div>
        <div id="headSection">
          {/* <div id="rectangle"></div> */}
          <div className="homeSection">
            <div className="section__bg"></div>
          </div>
        </div>
      </div>
      <div className="homeScreen-carousel">
        <h1 className="homeScreen-h1">Top Products</h1>
        {loadingSellers ? (
          <LoadingBox></LoadingBox>
        ) : errorSellers ? (
          <MessageBox variant="danger">{errorSellers}</MessageBox>
        ) : (
          <>
            {sellers.length === 0 && <MessageBox>No Seller Found</MessageBox>}
            <Carousel
              interval={5000}
              stopOnHover
              autoPlay
              infiniteLoop
              showThumbs={false}
            >
              {products !== undefined
                ? products.map((product) => (
                    <Product key={product._id} product={product} />
                  ))
                : "No Products Found"}
            </Carousel>
          </>
        )}
      </div>

      {/* Showcase */}
      <div id="showcase">
        <div className="bg-image"></div>
        <div className="content-wrap">
          <h1>Welocome to acme web selotions</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque ab
            nam necessitatibus accusantium porro officia voluptates, quo rerum?
            Vitae, aliquid.
          </p>
          <a href="#section-b" className="homebtn">
            Read More
          </a>
        </div>
      </div>
      {/* Section B */}
      <div id="section-b" className="grid">
        <ul>
          <li>
            <div className="homeScreen-card">
              <img className="cardImg" src={image3} alt="" />
              <div className="card-content">
                <h3 className="card-title">Web Development</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo
                  beatae ullam labore a, ipsa dolorum. Odio, temporibus fugit!
                  Amet, sapiente?
                </p>
              </div>
            </div>
          </li>
          <li>
            <div className="homeScreen-card">
              <img className="cardImg" src={image2} alt="" />
              <div className="card-content">
                <h3 className="card-title">Mobile Development</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo
                  beatae ullam labore a, ipsa dolorum. Odio, temporibus fugit!
                  Amet, sapiente?
                </p>
              </div>
            </div>
          </li>
          <li>
            <div className="homeScreen-card">
              <img className="cardImg" src={image1} alt="" />
              <div className="card-content">
                <h3 className="card-title">Tech Marketing</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo
                  beatae ullam labore a, ipsa dolorum. Odio, temporibus fugit!
                  Amet, sapiente?
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HomeScreen;
