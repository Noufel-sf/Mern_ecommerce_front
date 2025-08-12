import React from "react";
function Cartitem({
  Delete_cartItem,
  Qty,
  Handle_Qty,
  price,
  name,
  category,
  Decrease_Qty,
  img
}) {
  return (
    <div className="flex flex-col gap-8 sm:flex-row items-center justify-between border-b py-4">
      <div className="flex items-center gap-4">
        
        <img
          src={img}
          alt="product"
          className="w-34 h-34 object-cover rounded-lg"
          loading="lazy"
        />
        <div>
          <h3 className="text-xl font-semibold capitalize">{category}</h3>
          <p className="text-sm text-gray-500">{name}</p>
          <p className="text-sm text-[var(--primary-color)] font-bold">Price: {price}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-lg font-medium">Qty: {Qty}</span>
        <span
          className="text-3xl cursor-pointer text-[var(--secondary-color)] hover:text-[var(--secondary-color)] "
          onClick={Handle_Qty}
        >
          +
        </span>
        <span
          className="text-3xl cursor-pointer text-[var(--secondary-color)] hover:text-[var(--secondary-color)] "
          onClick={Decrease_Qty}
        >
          -
        </span>
        <button
          className=" hover:bg-[var(--primary-color)] font-bold cursor-pointer bg-[var(--secondary-color)] px-4 py-2 rounded-lg text-white transition-colors duration-300"
          onClick={Delete_cartItem}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default Cartitem;
