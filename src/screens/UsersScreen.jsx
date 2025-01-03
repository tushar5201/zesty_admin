import React from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

export default function UsersScreen() {
    return (
        <div className='app'>
            <Sidebar id={3} />
            <Header />
        </div>
    )
}
