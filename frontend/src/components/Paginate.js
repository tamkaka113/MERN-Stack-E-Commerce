import React from "react";
import { Pagination } from "react-bootstrap";
import { useSelector } from "react-redux";
import {useFilterContext} from '../contexts/FilterContexts'

const Paginate = () => {

  const productList = useSelector((state) => state.productList);
  const {  page, pages } = productList;
  const  {filter, setFilter} =useFilterContext()



  return ( 
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
      
            <Pagination.Item 
            onClick ={() => setFilter({
              ...filter,
              pageNumber:x+1
            })}
            activeLabel="" active={x + 1 === page}>
              {x + 1}
            </Pagination.Item>
       
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
