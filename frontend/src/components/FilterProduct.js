import React from "react";
import { Form, Col, Button } from "react-bootstrap";
import { useFilterContext } from "../contexts/FilterContexts";
import { listProducts } from "../actions/productActions";
import { useDispatch } from "react-redux";
import queryString from "query-string";
import { useHistory } from "react-router-dom";
const FilterProduct = () => {
  const dispatch = useDispatch();
  const { filter, setFilter } = useFilterContext();
  const categories = ["all", "Iphone", "Ipad", "Macbook", "Others"];

  const history = useHistory();
  const ratings = [
    { name: "all" },
    { name: "1 Star", value: 1 },
    { name: "2 Stars", value: 2 },
    { name: "3 Stars", value: 3 },
    { name: "4 Stars", value: 4 },
    { name: "5 Star", value: 5 },
  ];

  const prices = [
    { name: "all" },
    { name: "Below $100", value: "1-100" },
    { name: "From $100 to 500", value: "100-500" },
    { name: "Above $500", value: "500-1500" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilter({
      ...filter,
      keyword: "",
      pageNumber: 1,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newParams = queryString.stringify(filter);
    history.push(`/homeProduct/${newParams}`);
    dispatch(listProducts(filter));
    localStorage.setItem("search", JSON.stringify(filter));
  };

  return (
    <Col>
      <Form onSubmit={handleSubmit} className="d-flex mt-3">
        <Col lg={3} md={4} xs={3}>
          <Form.Group controlId="category">
            <Form.Label className="mr-2">Category: </Form.Label>
            <Form.Select
              type="select"
              name="category"
              value={filter.category}
              onChange={(e) => handleChange(e)}
            >
              {categories.map((category) => (
                <option value={category} key={category}>
                  {category}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col lg={3} md={3} xs={3}>
          <Form.Group controlId="price">
            <Form.Label className="mr-2">Price:</Form.Label>
            <Form.Select
              type="select"
              name="price"
              value={filter.price}
              onChange={(e) => handleChange(e)}
            >
              {prices.map(({ name, value }) => (
                <option value={value} key={value}>
                  {name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col lg={3} md={3} xs={3}>
          <Form.Group controlId="Reviews">
            <Form.Label className="mr-2">Rating: </Form.Label>
            <Form.Select
              type="select"
              name="rating"
              value={filter.rating}
              onChange={(e) => handleChange(e)}
            >
              {ratings.map(({ name, value }) => (
                <option value={value} key={value}>
                  {name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col lg={2} md={2} xs={3}>
          <Button className="find-product" type="submit" variant="primary">
            Find
          </Button>
        </Col>
      </Form>
    </Col>
  );
};

export default FilterProduct;
