import tempdata from "../utils/tempData.json";
import Card from "./Card";

function Grid() {
  return (
    <div className="bg-bgcolortwo text-dark container mx-auto flex flex-col items-center justify-center py-16">
      <section className="flex w-full flex-col items-center gap-6 px-6 md:max-w-[65rem]">
        {/* dynamic product grid */}
        <div
          className="grid w-full gap-6"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          }}
        >
          {tempdata.map((element, index) => (
            <Card key={index} item={element} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Grid;
