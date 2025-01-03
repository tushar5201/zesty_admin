import React from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

export default function RiderScreen() {
    return (
        <div className='app'>
            <Sidebar id={5} />
            <Header />
        </div>
    )
}
