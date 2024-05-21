import React from 'react'

export default function Slide() {
  return (
    <div className="relative w-full bg-white">
      <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8">
        <div className="flex flex-col justify-center px-4 py-12 md:py-16 lg:col-span-5 lg:gap-x-5 lg:px-6 lg:py-24 xl:col-span-5">
          
          <h1 className="mt-8 text-3xl font-bold tracking-tight text-black">
            People who care about your growth
          </h1>
          <p className="mt-8 text-lg text-gray-700">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur modi blanditiis
            dolores quasi eaque explicabo!
          </p>
        </div>
        <div className="relative lg:col-span-7 lg:-mr-8 xl:col-span-7">
          <img
            className="aspect-[3/2] bg-gray-50 object-cover lg:aspect-[4/3] lg:h-[500px] xl:aspect-[16/9] flex w-full"
            src="https://plus.unsplash.com/premium_photo-1679079456783-5d862f755557?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjQ3fHxtYW4lMjB3aXRoJTIwbGFwdG9wfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
            alt=""
          />
        </div>
      </div>
    </div>
  )
}
