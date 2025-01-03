import React from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

export default function HomeScreen() {
    
  return (
    <div className='app'>
      <Sidebar id={1} />
      <Header />

    </div>
  )
}
