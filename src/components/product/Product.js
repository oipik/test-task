import noimage from "../../images/noimage.png";

const Product = ({ item }) => {
  return (
    <div>
      <div className="m-4 flex justify-between">
        <div className="flex">
          <img className="w-16 h-16 mr-5" src={noimage} alt="no img" />
          <div>
            <p className="text-lg font-bold">ID товара: {item.id}</p>
            <p><span className="text-lg font-bold">Brand is:</span> {item.brand ? item.brand : "Отсутствует"}</p>
            <p><span className="text-lg font-bold">Product is:</span> {item.product}</p>
            <p><span className="text-lg font-bold">Price is:</span> {item.price}</p>
          </div>
        </div>
      </div>
      <hr />
    </div>
  )
}

export default Product