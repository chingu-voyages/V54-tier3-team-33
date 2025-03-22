import { useEffect, useState } from "react";
import Card from "../Card/Card";

function Grid() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://ecommerce-chingu-backend.fly.dev/api/products");
        const data = await res.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="bg-bgcolortwo text-dark container mx-auto flex flex-col items-center justify-center py-16">
      <section className="flex w-full flex-col items-center gap-6 px-6 md:max-w-[65rem]">
        {/* dynamic product grid */}
        <div className="grid w-full gap-6 sm:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
          {data.map((element, index) => (
            <Card key={index} item={element} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Grid;
