// import { Link } from "react-router-dom";
// import Button from "../../utils/Button";
import { BsCartPlus } from "react-icons/bs";
import { addItemToCart } from "../../store/slices/cartSlice";
import { useDispatch } from "react-redux";

interface Item {
  id: number;
  name: string;
  image: string | string[];
  price: number;
  description: string;
}

function Card({ item }: { item: Item }) {
  // const imageSrc =
  //   typeof item.image === "string" ? item.image : item.image[0] || "";
  const dispatch = useDispatch();
  return (
    <div className="text-darktext flex w-72 cursor-pointer flex-col items-start gap-1 border border-transparent p-3 py-4 transition-all hover:border-gray-200 hover:shadow-lg">
      <div className="relative w-full">
        {/* {imageSrc && ( */}
          <img
            src="https://www.digitaltrends.com/wp-content/uploads/2024/07/surface-laptop-7-02.jpg?resize=800%2C418&p=1"
            alt="missing"
            className="w-full rounded-md object-contain"
          />
        {/* )} */}

        {/* add to cart function to be added */}
        <button
          // add toast that item is added to cart
          onClick={() => dispatch(addItemToCart(item))}
          className="hover:bg-darktext absolute right-2 bottom-2 cursor-pointer rounded-full border border-stone-400 bg-white p-2 transition-all hover:text-white"
        >
          <BsCartPlus size={25} />
        </button>
      </div>
      <h3 className="font-medium">{item.name}</h3>
      <span className="flex w-full items-center gap-1">
        <p className="text-sm text-stone-600">Rating ⭐⭐⭐⭐⭐</p>
        <p className="text-sm text-stone-600">| 445 Sold</p>
      </span>
      <span className="flex w-full items-center justify-between">
        <p className="text-xl font-bold">Price: $86</p>
        <p>5 left</p>
      </span>
    </div>
  );
}

export default Card;
