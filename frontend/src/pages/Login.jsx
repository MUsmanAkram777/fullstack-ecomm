import React, { useEffect } from 'react' 
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { fetchUserLogin } from '../slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';

function Login() {


  const dispatch = useDispatch()
  const {userInfo, error:userError} = useSelector(state=>state.user)
  const navigte = useNavigate()
  const location = useLocation() 
  const queryParams = new URLSearchParams(location.search);
  const redirect = queryParams.get('redirect');

  

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => { 
    dispatch(fetchUserLogin(data)) 
  };


  useEffect(() => {
    
    if(userInfo?.name){
      console.log(redirect)
      if(redirect == '/') navigte(`/`)
      else if(redirect) navigte(`/${redirect}`)
      else navigte('/')
    }
  }, [userInfo])
  

  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md"> 
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 ">
            Don&apos;t have an account?{' '}
            <Link
              to="/signup"
              title=""
              className="font-semibold text-black transition-all duration-200 hover:underline"
            >
              Create a free account
            </Link>
          </p>
          {userError && (
            <label className='text-sm text-red-600'>
              {userError}
            </label>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className='mt-3'>
            <div className="space-y-5">
              <div>
                <label htmlFor="" className="text-base font-medium text-gray-900">
                  {' '}
                  Email address{' '}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Email"
                    name="email"
                    {...register("email", {
                      required: true,
                      pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/
                    })}
                  ></input>
                </div>
                {errors.email && errors.email.type === "required" && (
                  <p className="text-sm text-red-600">Email is required.</p>
                )}
                {errors.email && errors.email.type === "pattern" && (
                  <p className="text-sm text-red-600">Email is not valid.</p>
                )} 
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="" className="text-base font-medium text-gray-900">
                    {' '}
                    Password{' '}
                  </label>
                  {/* <a href="#" title="" className="text-sm font-semibold text-black hover:underline">
                    {' '}
                    Forgot password?{' '}
                  </a> */}
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    name="password"
                    placeholder="Password"
                    {...register("password", {
                      required: true 
                    })}
                  ></input>
                </div>
                {errors.password && errors.password.type === "required" && (
                  <p className="text-sm text-red-600">Password is required.</p>
                )}
                 
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Get started 
                </button>
              </div>
            </div>
          </form> 
        </div>
      </div>
    </section>
  )
}


export default Login
