import React, { useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";
import { listProducts } from "../actions/productActions";
import FilterProduct from "../components/FilterProduct";
import queryString from "query-string";
import { useFilterContext } from "../contexts/FilterContexts";
const HomeScreen = ({ history, location, match }) => {
  const { filter } = useFilterContext();
  const productRef = useRef();
  const dispatch = useDispatch();
  const id = match.params.id;

  console.log(location);
  const urlParams = queryString.parse(id);
  localStorage.setItem("search", JSON.stringify(urlParams));
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const newFilter = JSON.parse(localStorage.getItem("search"));
  const homeFilter = JSON.parse(localStorage.getItem("homePage"));

  useEffect(() => {
    if (
      newFilter.price ||
      newFilter.category ||
      newFilter.rating ||
      (newFilter.keyword && location.pathname.includes("homeProduct"))
    ) {
      dispatch(listProducts(newFilter));
      const newParams = queryString.stringify(newFilter);
      history.push(`/homeProduct/${newParams}`);
    } else {
      dispatch(
        listProducts({
          limit: filter.limit,
          pageNumber: filter.pageNumber,
        })
      );

      const params = queryString.stringify({
        limit: filter.limit,
        pageNumber: filter.pageNumber,
      });
      history.push(`/?${params}`);
    }
  }, [
    dispatch,
    history,
    filter.limit,
    filter.pageNumber,
    filter.limit,
    newFilter.pageNumber,
  ]);

  productRef.current?.scrollIntoView({ behavior: "smooth" });
  return (
    <>
      <Meta />
      <ProductCarousel />

      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            <FilterProduct />
          </Row>

          <Row ref={productRef}>
            {products?.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>

          <Paginate />
        </>
      )}
    </>
  );
};

export default HomeScreen;
