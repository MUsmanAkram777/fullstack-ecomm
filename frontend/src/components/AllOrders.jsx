import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../slices/orderSlice";
import { Link } from "react-router-dom";
import Loader from "./Loader";

function AllOrders() {
  const { allOrders, allLoading } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  console.log(allOrders);
  useEffect(() => {
    dispatch(getAllOrders());
  }, []);

  return allLoading ? <Loader repeat={3}/> : (
    <section className="mx-auto w-full max-w-7xl ">
      <div className="flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                    >
                      <span>Order ID</span>
                    </th>
                    <th
                      scope="col"
                      className="px-12 py-3.5 text-left text-sm font-normal text-gray-700"
                    >
                      Total Items
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                    >
                      Total Price
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                    >
                      Payment
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {allOrders.map((order) => {
                    return (
                      <tr>
                        <td className="whitespace-nowrap px-4 py-4">
                          <Link
                            to={`/order/${order._id}`}
                            className="flex items-center underline"
                          >
                            {order._id}
                          </Link>
                        </td>
                        <td className="whitespace-nowrap px-12 py-4">
                          {order.orderItems.length} item(s)
                        </td>
                        <td className="whitespace-nowrap px-12 py-4">
                          Rs.{" "}
                          {Number(order.totalPrice) +
                            Number(order.shippingPrice)}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4">
                          {order.isPaid ? (
                            <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                              Paid
                            </span>
                          ) : (
                            <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-red-800">
                              Unpaid
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AllOrders;
