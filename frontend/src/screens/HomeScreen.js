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
const HomeScreen = ({ match, history }) => {
  const { filter, setFilter } = useFilterContext();
  const params = match.params.id;
  const productRef = useRef();
  const newParams = queryString.parse(params);
  
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    if (Object.keys(newParams).length !== 0) {
      dispatch(listProducts(newParams));
      history.push(`/homeProduct/${params}`);
    } else {
      dispatch(listProducts());
      history.push(`/`);
    }
  }, [dispatch, history]);
  productRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <Meta />
     {!filter.keyword && <ProductCarousel />}

      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {" "}
            <FilterProduct />
          </Row>
          <Row >
            {products.map((product) => (
              <Col ref={productRef} key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product  product={product} />
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
