import React from 'react'
import Sidebar from '../components/Sidebar'
import Content from '../components/Content'

export default function HomeScreen() {

  return (
    <div className='app'>
      <Sidebar id={1} />
      <Content />
    </div>
  )
}
