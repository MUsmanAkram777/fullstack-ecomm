import React, { useEffect, useState } from "react";
import CheckoutNav from "../components/CheckoutNav";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPaymentMethod } from "../slices/cartSlice";

function Payment() {
  const [payment, setPayment] = useState("cod");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlePayment = () => {
    dispatch(setPaymentMethod("cod"));
    navigate("/placeorder");
  };

  const userInfo = useSelector((state) => state.user.userInfo); 

  useEffect(() => {
    if (!userInfo.name) navigate("signin?redirect=/");
  }, [userInfo]);


  return (
    <div className="mx-auto p-8 max-w-[1300px] h-screen">
      <CheckoutNav step1 step2 step3 />

      <div className="mt-8 max-w-[350px] mx-auto">
        <fieldset>
          <legend className="text-lg font-bold mb-3">Payment option</legend>
          <label htmlFor="cod">
            <input
              type="radio"
              value="cod"
              id="cod"
              name="payment"
              checked={payment == "cod"}
              onChange={(e) => setPayment(e.target.value)}
            />
            <span className="pl-1">Cash on Delivey</span>
          </label>
        </fieldset>

        <button
          onClick={handlePayment}
          className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Payment;
