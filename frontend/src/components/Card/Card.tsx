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
  const imageSrc = typeof item.image === 'string' 
    ? item.image 
    : item.image[0] || '';
  return (
    <div className="rounded-custom flex flex-col items-center bg-white p-6 shadow-lg">
      {imageSrc && (
        <img
          src={imageSrc}
          alt={item.name}
          className="mb-4 h-48 w-full rounded-md object-cover"
        />
      )}
      <h3 className="mb-2 text-xl font-semibold">{item.name}</h3>
      <p className="mb-4 text-gray-700">{item.description}</p>
      <Link to={`/product/${item.id}`} state={{ product: item }}>
        <Button className="mt-auto">View Details</Button>
      </Link>
    </div>
  );
}

export default Card;