import React, { useEffect } from 'react'
import ProductCardV1 from './ProductCardV1'
import ProductCardV2 from './ProductCardV2'

import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../slices/productSilce';
import Loader from './Loader';



function ProductList({view}) { 

  const dispatch = useDispatch();
  const productsList = useSelector((state) => state.productsList); 
  useEffect(() => {
    dispatch(fetchProducts())
  }, [])
  


  if(productsList?.loading) return <Loader repeat={7}/>
  
  return (
    <div className={
        view == 'grid' ? 'mx-auto grid w-full max-w-[1300px] items-center space-y-4 px-8 py-10 md:grid-cols-2 md:gap-3 md:space-y-0 lg:grid-cols-4' :
        'mx-auto grid w-full max-w-[1300px] items-center space-y-4 px-8 py-10 md:grid-cols-2 md:gap-3 md:space-y-0 lg:grid-cols-2'
    }>
        {productsList?.products?.map((p) => (
            view == 'grid' ? <ProductCardV1 key={p._id} product={p}/> : <ProductCardV2 key={p._id} product={p}/>
        ))}
    </div>
  )
}

export default ProductList