import Button from "../../utils/Button";

interface Item {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
}

function Card({ item }: { item: Item }) {
  return (
    <div className="flex flex-col items-center rounded-custom bg-white p-6 shadow-lg">
      <img
        src={item.image}
        alt={item.name}
        className="mb-4 h-48 w-full rounded-md object-cover"
      />
      <h3 className="mb-2 text-xl font-semibold">{item.name}</h3>
      <p className="mb-4 text-gray-700">{item.description}</p>
      <Button
        className="mt-auto"
        onClick={() => alert(`Viewing details for ${item.name}`)}
      >
        View Details
      </Button>
    </div>
  );
}

export default Card;
