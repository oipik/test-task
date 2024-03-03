import { useDispatch, useSelector } from "react-redux";
import { fetchIDs, fetchProducts, changeItemOffset, changeCurrentPage } from "./productsSlice";
import { useEffect } from "react";

import Product from "../product/Product";
import ReactPaginate from "react-paginate";

const Products = () => {

  const dispatch = useDispatch();
  const { ids, products, productsLoadingStatus, idsLoadingStatus, itemsPerPage, itemOffset, currentPage } = useSelector(state => state.products);

  const endOffset = itemOffset + itemsPerPage
  const pageCount = Math.ceil(ids.length / itemsPerPage);

  useEffect(() => {
    dispatch(fetchIDs());
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (ids.length !== 0) {
      dispatch(fetchProducts(ids.slice(itemOffset, endOffset)));
    }
    // eslint-disable-next-line
  }, [ids])

  useEffect(() => {
    if (currentPage === 0) return 
    if (!products[currentPage]) {
      dispatch(fetchProducts(ids.slice(itemOffset, endOffset)));
    } 
    // eslint-disable-next-line
  }, [currentPage])

  if (productsLoadingStatus === "loading" || idsLoadingStatus === "loading") return <h2 className="text-4xl text-center">Loading...</h2>

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage);
    dispatch(changeItemOffset(newOffset))
    dispatch(changeCurrentPage(event.selected));
  };

  const data = products.map((item, i) => {
    if (currentPage === +i) {
      return item.map((item) => {
        return <Product item={item} key={item.id} />
      })
    }
  })
  
  return (
    <section>
      {data.length === 0 ? <h2 className="text-4xl text-center">По вашему запросу ничего не найдено. Измените параметры поска</h2> : data}
      {
        (data.length > 0 && ids.length > 0) ? <ReactPaginate
          previousLabel={"Previous"}
          pageCount={pageCount}
          nextLabel={"Next"}
          onPageChange={handlePageClick}
          containerClassName="flex items-center justify-center mt-4 space-x-4 "
          pageClassName="border border-solid border-lightGray rounded-md hover:bg-slate-400 hover:text-white"
          pageLinkClassName="cursor-pointer block w-10 h-10 flex items-center justify-center "
          activeClassName="bg-slate-400 text-white"
          initialPage={currentPage}
        /> : null
      }
    </section>
  )
}


export default Products