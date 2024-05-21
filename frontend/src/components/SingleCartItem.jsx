import React, { useEffect, useState } from "react";
import { LuTrash2 } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { addToCart, removeItem } from "../slices/cartSlice";
import { Link } from "react-router-dom";

function SingleCartItem({ product }) {
  const [qty, setQty] = useState(product.qty);
  const dispatch = useDispatch();

  useEffect(() => {
    setQty(product.qty);
  }, [product.qty]);

  const handleIncDec = (newQty) => {
    dispatch(
      addToCart({
        product: {
          id: product.id,
          img: product.img,
          name: product.name,
          price: product.price,
          countInStock: product.countInStock,
          qty: newQty,
        },
        type: "UPDATE_QTY_CART"
      })
    );
  };

  const handleDelete = () => {
    dispatch(removeItem(product.id));
  };

  return (
    <>
      <li className="flex py-6 sm:py-6 ">
        <div className="flex-shrink-0">
          <img
            src={product.img}
            alt={product.name}
            className="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center"
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
          <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
            <div>
              <Link to={`/product/${product.id}`} className="flex justify-between">
                <h3 className="text-sm">{product.name}</h3>
              </Link>
              <div className="mt-1 flex items-end">
                <p className="text-sm font-medium text-gray-900">
                  Rs. {product.price}
                </p>
              </div>
            </div>
          </div>
        </div>
      </li>
      <div className="mb-2 pt-2 flex">
        <div className="min-w-24 flex">
          <button
            type="button"
            className="h-7 w-7"
            onClick={() => {
              setQty((prev) => {
                if (prev <= 1) return prev;
                const newQty = prev - 1;
                handleIncDec(newQty);
                return newQty;
              });
            }}
          >
            -
          </button>
          <span
            className="mx-1 h-7 w-9 rounded-md border text-center"
          >
            {qty}
          </span>
          <button
            type="button"
            className="flex h-7 w-7 items-center justify-center"
            onClick={() => {
              setQty((prev) => {
                if (prev >= product.countInStock) return prev;
                const newQty = prev + 1;
                handleIncDec(newQty);
                return newQty;
              });
            }}
          >
            +
          </button>
        </div>
        <div className="ml-6 flex text-sm">
          <button
            type="button"
            className="flex items-center space-x-1 px-2 py-1 pl-0"
            onClick={handleDelete}
          >
            <LuTrash2 className="text-[12px] text-red-500" />
            <span className="text-xs font-medium text-red-500">Remove</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default SingleCartItem;
