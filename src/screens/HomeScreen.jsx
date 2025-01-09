import React from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import TotalOrdersCard from '../components/TotalOrdersCard'
import Content from '../components/Content'

export default function HomeScreen() {

  return (
    <div className='app'>
      <Sidebar id={1} />
      <Content />
    </div>
  )
}
