import { useDispatch } from "react-redux";
import { useState } from "react";
import { fetchIDs, changeItemOffset, changeCurrentPage, clearProducts } from "../products/productsSlice";
import search from "../../images/search.svg";

const Filter = () => {
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");

  const dispatch = useDispatch();

  const changeReducer = () => {
    dispatch(clearProducts());
    dispatch(changeItemOffset(0));
    dispatch(changeCurrentPage(0));
  }

  const handleClickProduct = () => {
    const obj = { "product": product };
    product === "" ? dispatch(fetchIDs()) : dispatch(fetchIDs(obj))
    changeReducer();
  }

  const handleClickPrice = () => {
    const obj = { "price": +price };
    price === "" ? dispatch(fetchIDs()) : dispatch(fetchIDs(obj))
    changeReducer();
  }

  const handleClickBrand = () => {
    const obj = { "brand": brand };
    brand === "" ? dispatch(fetchIDs()) : dispatch(fetchIDs(obj));
    changeReducer();
  }

  return (
    <section className='ml-5 flex'>
      <div className="relative">
        <input
          type="text"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleClickProduct()
            }
          }}
          placeholder="Введите название товара"
          className="w-60 p-2 px-4 border rounded-lg" />
        <button
          onClick={() => handleClickProduct()}
          className="w-30 h-10 cursor-pointer absolute top-0.5 left-[210px]" type="submit">
          <img className="w-6 h-6" src={search} alt="search" />
        </button>
      </div>
      <div className="ml-4 relative">
        <input
          type="number"
          placeholder="Цена, р"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleClickPrice()
            }
          }}
          className="p-2 px-4 border rounded w-[130px]" />
        <button
          onClick={() => handleClickPrice()}
          className="w-30 h-10 cursor-pointer absolute top-0.5 left-[100px]" type="submit">
          <img className="w-[24px] h-[24px]" src={search} alt="search" />
        </button>
      </div>
      <div className="ml-4 relative">
        <input
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleClickBrand()
            }
          }}
          placeholder="Введите название бренда"
          className="w-60 p-2 px-4 border rounded-lg" />
        <button
          onClick={() => handleClickBrand()}
          className="w-30 h-10 cursor-pointer absolute top-0.5 left-[210px]" type="submit">
          <img className="w-6 h-6" src={search} alt="search" />
        </button>
      </div>
    </section>
  )
}

export default Filter; 