import React from 'react'
import { Link } from 'react-router-dom'
import Reviews from './Reviews'

function ProductCardV1({product}) { 
 
  return (
    <div className="max-w-[300px] border">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          className="h-[200px] w-full object-cover"
        />
      </Link>
      
      <div className="p-4">
        <h1 className="inline-flex items-center text-lg font-semibold">
          {product.name.slice(0,25)}...
        </h1>
        <div className='pt-2'>
          <Reviews rating={product.rating} reviewCount= {product.numReviews}/>
        </div>
        <p className="mt-3 text-sm text-gray-600">
          {product.description.slice(0,50)}...
        </p>
        <div className="mt-4">
          {product.tags.map(tag=>(
            <span key={`#${tag}`} className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
              #{tag}
            </span>
          ))}
           
        </div>
      </div>
    </div>
  
  )
}

export default ProductCardV1