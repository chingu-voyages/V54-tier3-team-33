import { Link } from "react-router-dom";
import Button from "../../utils/Button";

interface Item {
  id: number;
  name: string;
  image: string | string[];
  price: number;
  description: string;
}

function Card({ item }: { item: Item }) {
  // const imageSrc = typeof item.image === 'string'
  //   ? item.image
  //   : item.image[0] || '';
  return (
    // <div className="rounded-custom flex flex-col items-center bg-white p-6 shadow-lg">
    //   {imageSrc && (
    //     <img
    //       src={imageSrc}
    //       alt={item.name}
    //       className="mb-4 h-48 w-full rounded-md object-cover"
    //     />
    //   )}
    //   <h3 className="mb-2 text-xl font-semibold">{item.name}</h3>
    //   <p className="mb-4 text-gray-700">{item.description}</p>
    //   <Link to={`/product/${item.id}`} state={{ product: item }}>
    //     <Button className="mt-auto">View Details</Button>
    //   </Link>
    // </div>
    <div className="flex w-56 p-2 border border-transparent hover:border-amber-600 transition-all text-darktext flex-col items-start gap-1 ">
      <img
        src="https://helios-i.mashable.com/imagery/articles/05djrP5PjtVB7CcMtvrTOAP/images-4.fill.size_2000x1125.v1723100793.jpg"
        alt="Product Image"
        className="w-full object-contain"
      />

      <h3 className="font-medium">HP laptop 15-fc0036nm | HP® 15-fc0036nm</h3>
      <span className="flex w-full items-center gap-1">
        <p className="text-sm text-stone-600">Rating ⭐⭐⭐⭐⭐</p>
        <p className="text-sm text-stone-600">| 445 Sold</p>
      </span>
      <span className="flex w-full items-center justify-between">
        <p className="text-xl font-bold">Price: $86</p>
        <p>5 left</p>
      </span>

      {/* <Link to={`/product/${item.id}`} state={{ product: item }}> */}

      {/* </Link> */}
    </div>
  );
}

export default Card;
