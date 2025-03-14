function Card({ item }) {
  return (
    <div
      key={item.id}
      className="rounded-custom border-grayOne/70 shadow-custom flex flex-col border bg-white p-5 transition-all hover:shadow-xl"
    >
      {/* Product Image */}
      <img
        src={item.image}
        alt={item.name}
        className="mb-4 h-52 w-full object-contain"
      />

      {/* Product Info */}
      <h2
        className={`text-dark/85 font-titles mb-3 text-2xl font-light tracking-wider`}
      >
        {item.name}
      </h2>
      <p className="mb-1">
        Price: <span className="text-primary font-semibold">${item.price}</span>
      </p>
      <p className="mb-3">
        Description: <span>{item.description}</span>
      </p>

      {/* Add to Cart Button */}
      {/* <Button
          onClick={() => handleAddToCart(item)}
          disabled={item.inStock === 0 || isInCart}
          className={`mt-auto ${
            item.inStock === 0 || isInCart
              ? "cursor-not-allowed !bg-gray-300 hover:bg-gray-300"
              : "hover:bg-primaryHover"
          }`}
        >
          {item.inStock === 0
            ? "Out of Stock"
            : isInCart
              ? "In Cart"
              : "Add to Cart"}
        </Button> */}
    </div>
  );
}

export default Card;
