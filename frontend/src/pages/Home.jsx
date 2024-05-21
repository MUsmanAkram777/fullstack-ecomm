import React from 'react'
import {Slider,ProductList} from '../components'


function Home() {
 

  return (
    <div>
        <Slider/>
        <ProductList view={'grid'}/>
    </div>
  )
}

export default Home