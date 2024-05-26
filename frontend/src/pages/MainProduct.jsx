import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Loader, Reviews } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails } from "../slices/productDetailSlice";
import { addToCart } from "../slices/cartSlice";
import { v4 as uuidv4 } from 'uuid';

function MainProduct() {
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const navigate  = useNavigate();

  const dispatch = useDispatch();
  const product = useSelector((state) => state.productDetail.product);

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, []);

  const addToCartHandle = () => {
    
    dispatch(addToCart({product:{
      id:product._id,
      image:product.image,
      name:product.name,
      price:product.price,
      countInStock:product.countInStock,
      qty
    }}))
    setQty(1)
    navigate(`/cart`)
  }

  if (!product._id) return <Loader repeat={10} />;

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 2xl:px-16">
      <div className="pt-8">
        <div className="flex items-center">
          <ol className="flex w-full items-center overflow-hidden">
            <li className="text-body hover:text-heading px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
              <Link to="/">Home</Link>
            </li>
            {/* <li className="text-body mt-0.5 text-base">/</li>
            <li className="text-body hover:text-heading px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
              <a className="capitalize" href="#">
                products
              </a>
            </li> */}
            <li className="text-body mt-0.5 text-base">/</li>
            <li className="text-body hover:text-heading px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
              <div className="capitalize">{product.name}</div>
            </li>
          </ol>
        </div>
      </div>
      <div className="block grid-cols-9 items-start gap-x-10 pb-10 pt-7 lg:grid lg:pb-14 xl:gap-x-14 2xl:pb-20">
        <div className="col-span-5 grid  gap-2.5">
          <div className="flex transition duration-150 ease-in hover:opacity-90">
            <img src={product.image} className="w-full object-cover" />
          </div>
        </div>
        <div className="col-span-4 pt-8 lg:pt-0">
          <div className="mb-7 border-b border-gray-300 pb-7">
            {product.onSale && (
              <div className="text-white mb-3 bg-gray-600 px-2 py-1 rounded max-w-[50px] flex justify-center text-center text-[12px]">
                SALE
              </div>
            )}
            <h2 className="text-heading mb-2 text-lg font-bold md:text-xl lg:text-2xl 2xl:text-3xl">
              {product.name}
            </h2>
            <div className="mb-2">
              <Reviews
                rating={product.rating}
                reviewCount={product.numReviews}
              />
            </div>
            <p className="text-body text-sm leading-6  lg:text-base lg:leading-8">
              {product.description.slice(0, 150)}...
            </p>
            <div className="mt-5 flex items-center ">
              {product.comparePrice > product.price ? (
                <>
                  <div className="text-heading pr-2 text-base font-bold md:pr-0 md:text-xl lg:pr-2 lg:text-2xl 2xl:pr-0 2xl:text-4xl">
                    ${product.price}
                  </div>
                  <span className="font-segoe pl-2 text-sm text-gray-400 line-through md:text-base lg:text-lg xl:text-xl">
                    ${product.comparePrice}
                  </span>
                </>
              ) : (
                <div className="text-heading pr-2 text-base font-bold md:pr-0 md:text-xl lg:pr-2 lg:text-2xl 2xl:pr-0 2xl:text-4xl">
                  ${product.price}
                </div>
              )}
            </div>
          </div>
          {/* <div className="border-b border-gray-300 pb-3  ">
            <div className="mb-4">
              <h3 className="text-heading mb-2.5 text-base font-semibold capitalize md:text-lg">
                size
              </h3>
              <ul className="colors -mr-3 flex flex-wrap">
                {['S', 'M', 'L', 'XL'].map((size) => (
                  <li
                    key={size}
                    className="text-heading mb-2 mr-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded border border-gray-100 p-1 text-xs font-semibold uppercase transition duration-200 ease-in-out hover:border-black md:mb-3 md:mr-3 md:h-11 md:w-11 md:text-sm "
                  >
                    {size}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-4 ">
              <h3 className="text-heading mb-2.5 text-base font-semibold capitalize md:text-lg">
                color
              </h3>
              <ul className="colors -mr-3 flex flex-wrap">
                {['bg-orange-400', 'bg-pink-400', 'bg-violet-600', 'bg-red-500'].map((color) => (
                  <li
                    key={color}
                    className="text-heading mb-2 mr-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded border border-gray-100 p-1 text-xs font-semibold uppercase transition duration-200 ease-in-out hover:border-black md:mb-3 md:mr-3 md:h-11 md:w-11 md:text-sm"
                  >
                    <span className={`block h-full w-full rounded ${color}`} />
                  </li>
                ))}
              </ul>
            </div>
          </div> */}

          {product.countInStock <= 0 ? (
            <button
              type="button"
              className="h-11 w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black opacity-40"
            >
              SOLD OUT
            </button>
          ) : (
            <div className="space-s-4 3xl:pr-48 flex items-center gap-2 border-b border-gray-300 py-8  md:pr-32 lg:pr-12 2xl:pr-32">
              <div className="group flex h-11 flex-shrink-0 items-center justify-between overflow-hidden rounded-md border border-gray-300 md:h-12">
                <button
                  className="text-heading hover:bg-heading flex h-full w-10 flex-shrink-0 items-center justify-center border-e border-gray-300 transition duration-300 ease-in-out focus:outline-none md:w-12"
                  onClick={() => {
                    setQty((prev) => {
                      if (prev <= 1) return prev;
                      return prev - 1;
                    });
                  }}
                >
                  -
                </button>
                <span className="duration-250 text-heading flex h-full w-12  flex-shrink-0 cursor-default items-center justify-center text-base font-semibold transition-colors ease-in-out  md:w-20 xl:w-24">
                  {qty}
                </span>
                <button
                  className="text-heading hover:bg-heading flex h-full w-10 flex-shrink-0 items-center justify-center border-s border-gray-300 transition duration-300 ease-in-out focus:outline-none md:w-12"
                  onClick={() => {
                    setQty((prev) => {
                      if (prev >= product.countInStock) return prev;
                      return prev + 1;
                    });
                  }}
                >
                  +
                </button>
              </div>
              <button
                type="button"
                className="h-11 w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black" 
                onClick={addToCartHandle}
              >
                Add to cart
              </button>
            </div>
          )}

          <div className="py-6 ">
            <ul className="space-y-5 pb-1 text-sm">
              <li>
                <span className="text-heading inline-block pr-2 font-semibold">
                  Brand:
                </span>
                {product.brand}
              </li>
              <li>
                <span className="text-heading inline-block pr-2 font-semibold">
                  Category:
                </span>
                <a
                  className="hover:text-heading transition hover:underline"
                  href="#"
                >
                  {product.category}
                </a>
              </li>
              <li className="productTags">
                <span className="text-heading inline-block pr-2 font-semibold ">
                  Tags:
                </span>
                {product.tags.map((tag) => (
                  <a
                    className="hover:text-heading mb-2 inline-block transition hover:underline capitalize bg-gray-300 mr-2 px-2 py-1 rounded"
                    href="#"
                    key={uuidv4()}
                  >
                    {tag}
                  </a>
                ))}
              </li>
            </ul>
          </div>
          <div className="shadow-sm ">
            <header className="flex cursor-pointer items-center justify-between border-t border-gray-300 py-5 transition-colors md:py-6">
              <h2 className="text-heading pr-2 text-sm font-semibold leading-relaxed md:text-base lg:text-lg">
                Product Details
              </h2>
              <div className="relative flex h-4 w-4 flex-shrink-0 items-center justify-center">
                <div className="bg-heading h-0.5 w-full rounded-sm" />
                <div className="bg-heading absolute bottom-0 h-full w-0.5 origin-bottom scale-0 transform rounded-sm transition-transform duration-500 ease-in-out" />
              </div>
            </header>
            <div>
              <div className="pb-6 text-sm leading-7 text-gray-600 md:pb-7">
                {product.description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainProduct;
