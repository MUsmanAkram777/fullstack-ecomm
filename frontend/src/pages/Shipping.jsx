import React, { useEffect } from "react";
import CheckoutNav from "../components/CheckoutNav";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setShippingAddress } from "../slices/cartSlice";
import { Link, useNavigate } from "react-router-dom";

function Shipping() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const shippingAddress = useSelector(state=>state.cart.shippingAddress)

  const userInfo = useSelector(state=>state.user.userInfo) 
 


  useEffect(() => { 
    if(!userInfo.name) navigate('/signin?redirect=/')
    reset({
        address:shippingAddress.address,
        street:shippingAddress.street,
        city:shippingAddress.city,
        postalCode:shippingAddress.postalCode,
        country:shippingAddress.country,
    })
  }, [userInfo])

  const onSubmit = (formData) => {
    dispatch(
      setShippingAddress({
        shippingAddress: {
          address: formData.address,
          street:formData.street,
          city:formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
        },
      })
    );
    navigate('/payment')
  };
  return (
    <div className="mx-auto p-8 max-w-[1300px]">
      <CheckoutNav step1 step2 />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 max-w-[350px] mx-auto"
      >
        <div className="space-y-5">
          <div>
            <label
              htmlFor="address"
              className="text-base font-medium text-gray-900"
            >
              {" "}
              address{" "}
            </label>
            <div className="mt-2">
              <input
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="address"
                id="address"
                {...register("address", {
                  required: true,
                })}
              ></input>
            </div>
            {errors.address && errors.address.type === "required" && (
              <p className="text-sm text-red-600">address is required.</p>
            )}
          </div>
          <div>
            <label
              htmlFor="street"
              className="text-base font-medium text-gray-900"
            >
              Street
            </label>
            <div className="mt-2">
              <input
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Street"
                id="street"
                {...register("street", {
                  required: true,
                })}
              ></input>
            </div>
            {errors.street && errors.street.type === "required" && (
              <p className="text-sm text-red-600">Street is required.</p>
            )}
          </div>
          <div>
            <label
              htmlFor="city"
              className="text-base font-medium text-gray-900"
            >
              City
            </label>
            <div className="mt-2">
              <input
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="City"
                id="city"
                {...register("city", {
                  required: true,
                })}
              ></input>
            </div>
            {errors.city && errors.city.type === "required" && (
              <p className="text-sm text-red-600">City is required.</p>
            )}
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="postalCode"
                className="text-base font-medium text-gray-900"
              >
                Postal Code
              </label>
            </div>
            <div className="mt-2">
              <input
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Postal Code"
                id="postalCode"
                {...register("postalCode", {
                  required: true,
                })}
              ></input>
            </div>
            {errors.postalCode && errors.postalCode.type === "required" && (
              <p className="text-sm text-red-600">Postal Code is required.</p>
            )}
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="country"
                className="text-base font-medium text-gray-900"
              >
                Country
              </label>
            </div>
            <div className="mt-2">
              <input
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Country"
                id="country"
                {...register("country", {
                  required: true,
                })}
              ></input>
            </div>
            {errors.country && errors.country.type === "required" && (
              <p className="text-sm text-red-600">Country is required.</p>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
            >
              Next
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Shipping;
