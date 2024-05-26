import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getOrderById } from "../slices/orderSlice";
import Loader from "../components/Loader";
import { LuBanknote, LuCheckCheck, LuEqualNot, LuTruck } from "react-icons/lu";

const products = [
  {
    id: 1,
    name: "Nike Air Force 1 07 LV8",
    imageSrc:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/54a510de-a406-41b2-8d62-7f8c587c9a7e/air-force-1-07-lv8-shoes-9KwrSk.png",
    href: "#",
    price: "₹61,999",
    color: "Orange",
    imageAlt: "Nike Air Force 1 07 LV8",
    quantity: 1,
  },
  {
    id: 2,
    name: "Nike Run Division, Airmax Pro Ultra Mens Runnig Shoes",
    imageSrc:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e48d6035-bd8a-4747-9fa1-04ea596bb074/blazer-low-77-se-shoes-0w2HHV.png",
    href: "#",
    price: "₹22,500",
    color: "White",
    imageAlt: "APPLE Airpods Pro with MagSafe Charging Case Bluetooth Headset",
    quantity: 1,
  },
];

export const OrderDetails = () => {
  const order = useSelector((state) => state.order);
  const userInfo = useSelector((state)=>state.user.userInfo)
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getOrderById(id));
  }, [id]);

  useEffect(() => {
    if(!userInfo.name) navigate('/');
  }, [userInfo]);


  return order.loadingId ? (
    <Loader repeat={3}/>
  ) : order.error ? (
    <div className="mx-auto p-8 max-w-[1300px]">{order.error}</div>
  ) : (
    <>
      (
      <div className="mx-auto p-8 max-w-[1300px]">
        <h2 className="text-3xl font-bold">Order #{order.orderDetails._id}</h2>

        <div className="flex justify-between mt-5 mb-1">
          <div className="">
            <h3 className="text-1xl font-bold">Shipping Information</h3>
            <p className="text-sm">
              <strong className="font-bold">Name:</strong>{" "}
              {order.orderDetails.user?.name}
            </p>
            <p className="text-sm">
              <strong className="font-bold">Email:</strong>{" "}
              {order.orderDetails.user?.email}
            </p>
            <p className="text-sm">
              <strong className="font-bold">Address:</strong>{" "}
              {order.orderDetails.shippingAddress.address}{" "}
              {order.orderDetails.shippingAddress.street},{" "}
              {order.orderDetails.shippingAddress.city},{" "}
              {order.orderDetails.shippingAddress.postalCode},{" "}
              {order.orderDetails.shippingAddress.country}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col overflow-hidden rounded-lg border border-gray-300 md:flex-row">
          <div className="w-full border-r border-gray-300 bg-gray-100 md:max-w-xs">
            <div className="p-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1"> 
                <div className="mb-4">
                  <div className="text-sm font-semibold">Deliverd</div>
                  <div className="text-sm font-medium text-gray-700">
                    {order.isDeliverd ? (
                      <div className="flex gap-1 items-center text-green-500">
                        <LuCheckCheck /> Deliverd
                      </div>
                    ) : (
                      <div className="flex gap-1 items-center text-red-500">
                        <LuTruck /> On way
                      </div>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <div className="text-sm font-semibold">Paid</div>
                  <div className="text-sm font-medium text-gray-700">
                    {order.isPaid ? (
                      <div className="flex gap-1 items-center text-green-500">
                        <LuBanknote /> Paid
                      </div>
                    ) : (
                      <div className="flex gap-1 items-center text-red-500">
                        <LuEqualNot /> Unpaid
                      </div>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <div className="text-sm font-semibold">Payment Method</div>
                  <div className="text-sm font-medium text-gray-700">
                    Cash on Delivery
                  </div>
                </div>
                <hr className="my-5 border-t border-t-gray-200" />
                <div className="mb-2 flex justify-between">
                  <div className="text-sm font-semibold">Shipping Price</div>
                  <div className="text-sm font-medium text-gray-700">
                    Rs. {order.orderDetails.shippingPrice}
                  </div>
                </div>
                <div className="mb-2 flex justify-between">
                  <div className="text-sm font-semibold">Sub Total</div>
                  <div className="text-sm font-medium text-gray-700">
                    Rs. {order.orderDetails.totalPrice}
                  </div>
                </div>
                <hr className="my-2 border-t border-t-gray-200" />
                <div className="mb-2 flex justify-between">
                  <div className="text-sm font-semibold">Sub Total</div>
                  <div className="text-sm font-medium text-gray-700">
                    Rs.{" "}
                    {Number(order.orderDetails.totalPrice) +
                      Number(order.orderDetails.shippingPrice)}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="p-8">
              <ul className="-my-7 divide-y divide-gray-200">
                {order.orderDetails.orderItems.map((product) => (
                  <li
                    key={product.id}
                    className="flex flex-col justify-between space-x-5 py-7 md:flex-row"
                  >
                    <div className="flex flex-1 items-stretch">
                      <Link to={`/product/${product.id}`} className="flex-shrink-0">
                        <img
                          className="h-20 w-20 rounded-lg border border-gray-200 object-cover"
                          src={product.image}
                        />
                      </Link>

                      <div className="ml-5 flex flex-col justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-bold text-gray-900">
                            {product.name}
                          </p>
                        </div>

                        <p className="mt-4 text-sm font-medium text-gray-500">
                          {product.qty} x Rs. {product.price} = Rs.{" "}
                          {(product.qty * product.price).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <hr className="my-8 border-t border-t-gray-200" />
            </div>
          </div>
        </div>
      </div>
      )
    </>
  );
};

export default OrderDetails;
