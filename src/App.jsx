import React, { useEffect } from 'react'
import Routers from './router/Routers'
import { Toaster } from 'react-hot-toast'

const App = () => {
 
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden'>
      
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Routers />
    </div>
  )
}

export default App