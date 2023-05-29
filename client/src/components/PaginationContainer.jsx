import React, { useEffect } from 'react'
import ReactPaginate from "react-paginate";
import { useAppContext } from '../context/appContext';
const PaginationContainer = ({form={}}) => {
  const {setPage,pageInfo,page,getAllData } = useAppContext()
  
  useEffect(() => {
    getAllData(form);
  }, [page]);
  const handlePageClick = (event) => {
    setPage(event.selected+1);
  };
  return (
    <ReactPaginate
    forcePage={page-1}
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={Math.round(pageInfo.totalCount/25)}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName={
          "pagination"
        } /* as this work same as bootstrap class */
        subContainerClassName={
          "pages pagination"
        } /* as this work same as bootstrap class */
        activeClassName={"active"}
      />
  )
}

export default PaginationContainer