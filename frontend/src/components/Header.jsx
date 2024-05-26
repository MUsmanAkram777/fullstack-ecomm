import React, { useState } from "react";
import { LuShoppingCart } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../slices/userSlice";

function Header() {
  const userInfo = useSelector(state=>state.user.userInfo)
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const totalItems = useSelector(state=>state.cart.totalItems)


  const dispatch = useDispatch()
  const logoutHandler = () => {
    dispatch(logout())
    setIsAccountOpen(false)
  }

  return (
    <div>
      <nav className="bg-white dark:bg-gray-800  shadow py-4 relative">
        <div className="px-8 mx-auto max-w-[1300px]">
          <div className="flex items-center justify-between h-16">
            <div className=" flex items-center menu_main">
              
              <div className="hidden md:block">
                <div className="flex items-baseline ml-10 space-x-4">
                  <Link
                    className="text-black  hover:text-black dark:hover:text-white px-3 py-2 rounded-md text-md font-medium"
                    to="/"
                  >
                    Home
                  </Link>
                </div>
              </div>
            </div>
            <div className="">
                <Link to={'/'} className="flex-shrink-0 font-extrabold text-purple-700">
                  Shopp.App
                </Link>
            </div>
            <div className="block search_main absolute right-[60px] z-10 top-[80px] hidden">
              <div className="flex -mr-2 md:block">
                <form className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0">
                  <div className=" relative ">
                    <input
                      type="text"
                      id='"form-subscribe-Search'
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="components"
                    />
                  </div>
                  <button
                    className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                    type="submit"
                  >
                    Search
                  </button>
                </form>
              </div>
              <div className="flex items-center ml-4 md:ml-6"></div>
            </div>
            <div className="block account_main">
              <div className="flex items-center ml-4 md:ml-6">
                <Link to={'/cart'}
                  type="button"
                  className="relative w-[60px]  flex items-center justify-center rounded-md  px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-50"
                >
                  <LuShoppingCart className=" text-xl" />
                  <span className="absolute -top-1 right-1 bg-black text-white text-[10px] px-2 rounded-full">{totalItems}</span>
                </Link>
                <div className="relative ml-3">
                  <div className="relative inline-block text-left">
                     
                      {!userInfo?.name && (
                        <>
                          <Link to={'/signin'}
                        className="  flex items-center justify-center w-full rounded-md  px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-50 "
                        id="options-menu" 
                      >
                        <svg
                          width="20"
                          fill="currentColor"
                          height="20"
                          className="text-gray-800"
                          viewBox="0 0 1792 1792"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M1523 1339q-22-155-87.5-257.5t-184.5-118.5q-67 74-159.5 115.5t-195.5 41.5-195.5-41.5-159.5-115.5q-119 16-184.5 118.5t-87.5 257.5q106 150 271 237.5t356 87.5 356-87.5 271-237.5zm-243-699q0-159-112.5-271.5t-271.5-112.5-271.5 112.5-112.5 271.5 112.5 271.5 271.5 112.5 271.5-112.5 112.5-271.5zm512 256q0 182-71 347.5t-190.5 286-285.5 191.5-349 71q-182 0-348-71t-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z"></path>
                        </svg>
                      </Link>
                        </>
                      )}
                      {userInfo?.name && (
                        <button
                          type="button"
                          className="  flex items-center justify-center w-full rounded-md  px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-50 cursor-pointer"
                          id="options-menu"
                          onClick={() => setIsAccountOpen(!isAccountOpen)}
                        >
                          <svg
                            width="20"
                            fill="currentColor"
                            height="20"
                            className="text-gray-800"
                            viewBox="0 0 1792 1792"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M1523 1339q-22-155-87.5-257.5t-184.5-118.5q-67 74-159.5 115.5t-195.5 41.5-195.5-41.5-159.5-115.5q-119 16-184.5 118.5t-87.5 257.5q106 150 271 237.5t356 87.5 356-87.5 271-237.5zm-243-699q0-159-112.5-271.5t-271.5-112.5-271.5 112.5-112.5 271.5 112.5 271.5 271.5 112.5 271.5-112.5 112.5-271.5zm512 256q0 182-71 347.5t-190.5 286-285.5 191.5-349 71q-182 0-348-71t-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z"></path>
                          </svg>
                          <label className="text-sm pl-1 cursor-pointer">
                            Hey, {userInfo.name}
                          </label>
                        </button>
                      )}
                      
                     

                    {isAccountOpen && (
                      <div className="absolute right-0 w-56 mt-2 z-10 origin-top-right bg-white rounded-md shadow-lg dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                        <div
                          className="py-1 "
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="options-menu"
                        >  
                          <Link
                            to="/profile"
                            className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
                            role="menuitem"
                          >
                            <span className="flex flex-col">
                              <span>Profile</span>
                            </span>
                          </Link>
                          <div 
                            className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600 cursor-pointer"
                            role="menuitem"
                            onClick={logoutHandler}
                          >
                            <span className="flex flex-col">
                              <span>Logout</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:hidden mbl_menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              to="/"
            >
              Home
            </Link> 
          </div>
          <div className="flex p-2">
            <form className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0">
              <div className=" relative ">
                <input
                  type="text"
                  id='"form-subscribe-Search-mb'
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="components"
                />
              </div>
              <button
                className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
