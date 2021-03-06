import React from "react";
import { Pagination, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useFilterContext } from "../contexts/FilterContexts";

const Paginate = () => {
  const productList = useSelector((state) => state.productList);
  const { page, pages } = productList;
  const { filter, setFilter } = useFilterContext();

  const handlePaginate = (x) => {
    setFilter({
      ...filter,
      pageNumber: x + 1,
    });
  };
  localStorage.setItem("search", JSON.stringify(filter));
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <Pagination.Item
            onClick={() => handlePaginate(x)}
            activeLabel=""
            active={x + 1 === page}
          >
            {x + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
