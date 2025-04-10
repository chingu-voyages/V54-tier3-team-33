// import { Link } from "react-router-dom";
// import Button from "../../utils/Button";
import { BsCartPlus } from "react-icons/bs";
import { addItemToCart } from "../../store/slices/cartSlice";
import { useDispatch } from "react-redux";
import toast from 'react-hot-toast';

interface Item {
  id: number;
  name: string;
  image: string | string[];
  price: number;
  description: string;
  rating: number;
  stock: number;
  sold: number;
}

function Card({ item }: { item: Item }) {
  const dispatch = useDispatch();
  return (
    <div className="text-darktext flex w-72 cursor-pointer flex-col items-start gap-1 border border-transparent p-3 py-4 transition-all hover:border-gray-200 hover:shadow-lg">
      <div className="relative w-full">
        <img
          src={item.image[0]}
          alt="missing"
          className="w-full rounded-md object-contain"
        />

        {/* add to cart function to be added */}
        <button
         
         onClick={() => {
          dispatch(addItemToCart(item));
          toast.success('Added to cart!');
        }}
          className="hover:bg-darktext absolute right-2 bottom-2 cursor-pointer rounded-full border border-stone-400 bg-white p-2 transition-all hover:text-white"
        >
          <BsCartPlus size={25} />
        </button>
      </div>
      <h3 className="font-medium">{item.name}</h3>
      <span className="flex w-full items-center gap-1 text-stone-600">
        <p className="text-sm text-stone-600">
          Rating:{" "}
          {item.rating ? "⭐".repeat(item.rating) : "No rating yet"}{" "}
        </p>

        <p className="text-sm">| {item.sold} Sold</p>
      </span>
      <span className="flex w-full items-center justify-between">
        <p className="text-xl font-bold">Price: ${item.price}</p>
        <p>{item.stock} left</p>
      </span>
    </div>
  );
}

export default Card;
