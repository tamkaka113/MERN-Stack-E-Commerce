import React, { useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { listProducts } from "../actions/productActions";
import { useDispatch } from "react-redux";
import queryString from "query-string";
import { useFilterContext } from "../contexts/FilterContexts";


const SearchBox = ({ history }) => {
  const { filter, setFilter } = useFilterContext();

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();

    const params = queryString.stringify(filter);
    dispatch(listProducts(filter))
    localStorage.setItem('search',JSON.stringify(filter))
    history.push(`/homeProduct/${params}`);
    
  };
  


  return (
    <Form onSubmit={submitHandler} className="d-flex">
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setFilter({
          limit:filter.limit,
          pageNumber:1,
          keyword:e.target.value,
        })}
        placeholder="Search Products..."
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>
      <Button type="submit" variant="outline-success" className="p-2">
        Search
      </Button>
    </Form>
  );
};
export default SearchBox;
