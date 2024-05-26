import React from 'react'
import { Link } from 'react-router-dom'

function CheckoutNav({step1,step2,step3,step4,}) {
  return (
    <div className='flex gap-7 justify-center mb-4'>
        {
            step1 ? <div className='cursor-pointer'>
                <Link to={'/cart'} className='text-gray-800'>
                    Cart
                </Link>
                
            </div> : <div className=''>
                <p className='text-gray-400'>Cart</p>
            </div>
        }
        {
            step2 ? <div className='cursor-pointer'>
                <Link to={'/shipping'} className='text-gray-800'>
                    Shipping
                </Link>
                
            </div> : <div className=''>
                <p className='text-gray-400'>Shipping</p>
            </div>
        }
        {
            step3 ? <div className='cursor-pointer'>
                
                <Link to={'/payment'} className='text-gray-800'>
                    Payment
                </Link>
            </div> : <div className=''>
                <p className='text-gray-400'>Payment</p>
            </div>
        }
        {
            step4 ? <div className='cursor-pointer'>
                <Link to={'/placeorder'} className='text-gray-800'>
                    Place order
                </Link>
                
            </div> : <div className=''>
            <p className='text-gray-400'>Place order</p>
            </div>
        }
    </div>
  )
}

export default CheckoutNav