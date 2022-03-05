import React, { useEffect } from "react";
import { Form, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import { useFilterContext } from "../contexts/FilterContexts";
import { listProducts } from "../actions/productActions";
import { useDispatch } from "react-redux";
const FilterProduct = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { filter, setFilter } = useFilterContext();
  const categories = ["all", "Iphone", "Ipad", "Macbook", "Others"];
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
      keyword:"",
      pageNumber:1,
      [name]: value,
    });
  };


  const handleSubmit = (e) => {
    const newFilter = delete filter.keyword;
    e.preventDefault();
    if(newFilter) {
      dispatch(listProducts(filter));

      const params = queryString.stringify(filter);
      history.push(`/homeProduct/${params}`);
    }
  };



  return (
    <Col>
      <Form onSubmit={handleSubmit} className="d-flex mt-3">
        <Col lg={3}>
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

        <Col lg={3}>
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

        <Col lg={3}>
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
        <Col lg={1}>
          <Button type="submit" variant="primary">
            Clear Filter
          </Button>
        </Col>
      </Form>
    </Col>
  );
};

export default FilterProduct;
