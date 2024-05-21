import React from 'react'
import { Link } from 'react-router-dom'
import Reviews from './Reviews'

function ProductCardV2({product}) {
  console.log(product)
  return (
    <div className="flex max-w-2xl flex-col items-center border md:flex-row">
      <Link to={`/product/${product._id}`} className="h-full w-full md:h-[200px] md:w-[300px]">
        <img
          src={product.image}
          className="h-full w-full object-cover flex"
        />
      </Link>
      <div>
        <div className="p-4">
          <div className='pb-2'>
            <Reviews rating={product.rating} reviewCount= {product.numReviews}/>
          </div>
          <h1 className="inline-flex items-center text-lg font-semibold">
          {product.name}
          </h1>
          <p className="mt-3 text-sm text-gray-600">
          {product.description.slice(0,100)}...
          </p>
          <div className="mt-4">
          {product.tags.map(tag=>(
            <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
              #{tag}
            </span>
          ))}
          </div> 
        </div>
      </div>
    </div>
  )
}


export default ProductCardV2