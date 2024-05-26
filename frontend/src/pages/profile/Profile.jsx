import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AllOrders from "../../components/AllOrders";

function Profile() {
  const userInfo = useSelector((state) => state.user.userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo.name) navigate("/");
  }, [userInfo]);

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 2xl:px-16 h-screen ">
      <div className="py-5 w-full">
        <h3 className="text-xl leading-6 font-bold text-gray-900">
          Account
        </h3>
      </div>
      <div className="flex gap-8">
        <div className="border-t border-gray-200 max-w-[300px]   py-5 sm:p-0 w-full">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Full name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {userInfo.name}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Email address</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {userInfo.email}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <Link to={'/profile/update'} className="inline-flex items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80">
                  Update Profile
                </Link>
              </dd>
              <dt className="text-sm font-medium text-gray-500"></dt>
            </div>
          </dl>
        </div>
        <AllOrders/>
      </div>
    </div>
  );
}

export default Profile;
