import React from 'react'
import Sidebar from '../components/Sidebar'
import CategoryController from '../controllers/CategoryController'

export default function CategoryScreen() {
    return (
        <div className="app">
            <Sidebar id={5} />
            <CategoryController />
        </div>
    )
}
