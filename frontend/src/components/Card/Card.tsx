import { BsCartPlus } from "react-icons/bs";
import { addItemToCart } from "../../store/slices/cartSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

interface Item {
  id: number;
  name: string;
  image: string | string[];
  price: number;
  description: string;
  rating: number;
  stock: number;
  sold: number;
  category: string;
  subcategory: string;
}

function Card({ item }: { item: Item }) {
  const dispatch = useDispatch();
  return (
    <div className="text-darktext relative flex cursor-pointer flex-col items-start gap-2 border border-transparent p-3 py-4 transition-all hover:border-gray-200 hover:bg-gray-50 hover:shadow-lg">
      <Link to={`/product/${item.id}`} className="w-full">
        <img
          src={item.image[0]}
          alt="missing"
          className="h-40 w-full rounded-md object-contain"
        />
      </Link>
      <button
        onClick={() => {
          dispatch(addItemToCart(item));
          toast.success("Added to cart!");
        }}
        className="hover:bg-darktext absolute top-36 right-5 cursor-pointer rounded-full border border-stone-400 bg-white p-2 transition-all hover:text-white"
      >
        <BsCartPlus size={25} />
      </button>
      <Link
        to={`/product/${item.id}`}
        className="flex h-full w-full flex-col gap-1"
      >
        <h3 className="font-medium">{item.name}</h3>
        <span className="text-darktext/65 flex w-full flex-col items-start gap-1">
          <p className="text-xs">
            Rating: {item.rating ? "⭐".repeat(item.rating) : "No rating yet"}
          </p>
          <span className="flex w-full items-center justify-between">
            <p className="text-sm">{item.sold} Sold</p>
            <p>{item.stock} left</p>
          </span>
        </span>
        {/* Push this section to the bottom */}

        <p className="mt-auto text-xl font-bold">Price: ${item.price}</p>
      </Link>
    </div>
  );
}

export default Card;
