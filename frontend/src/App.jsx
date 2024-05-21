import React from 'react'
import { Footer, Header} from './components'  
import { Outlet } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <div className=''>
      <Header/> 
       <Outlet/>
      <Footer/>
      <ScrollToTop/>
    </div>
  )
}

export default App