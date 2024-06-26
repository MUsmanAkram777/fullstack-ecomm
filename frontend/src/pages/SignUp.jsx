import React, { useEffect } from 'react' 
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { fetchUserRegister } from '../slices/userSlice';

export default function SignUp() {

  const {userInfo, error:userError} = useSelector(state=>state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    if(userInfo.name) {
      navigate('/')
    }
  }, [userInfo])


  const onSubmit = (data) => { 
    dispatch(fetchUserRegister(data))
  }

  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md"> 
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Sign up to create account
          </h2>
          <p className="mt-2 text-center text-base text-gray-600">
            Already have an account?{' '}
            <Link
              to="/signin"
              title=""
              className="font-medium text-black transition-all duration-200 hover:underline"
            >
              Sign In
            </Link>
          </p>
          {userError && (
            <label className='text-sm text-red-600'>
              {userError}
            </label>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
            <div className="space-y-5">
              <div>
                <label htmlFor="name" className="text-base font-medium text-gray-900">
                  {' '}
                  Full Name{' '}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Full Name"
                    id="name"
                    name="name"
                    {...register("name", {
                      required: true
                    })}
                  ></input>
                </div>
                {errors.name && errors.name.type === "required" && (
                  <p className="text-sm text-red-600">Name is required.</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="text-base font-medium text-gray-900">
                  {' '}
                  Email address{' '}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Email"
                    id="email"
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
                  <p className="text-sm text-red-600">Email is not valid email address.</p>
                )}
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-base font-medium text-gray-900">
                    {' '}
                    Password{' '}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                    id="password"
                    name="password"
                    {...register("password", {
                      required: true,
                      minLength:6
                    })}
                  ></input>
                </div>
                {errors.password && errors.password.type === "required" && (
                  <p className="text-sm text-red-600">Password is required.</p>
                )}
                {errors.password && errors.password.type === "minLength" && (
                  <p className="text-sm text-red-600">Password should be at-least 6 characters.</p>
                )}
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Create Account 
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
