import React from 'react'
import NavigationBarComponent from '../../components/NavigationBarComponent/NavigationBarComponent'
import { Outlet } from 'react-router-dom'

function MainLayout() {
    return (
        <div>
            <NavigationBarComponent />
            <Outlet />
        </div>
    )
}

export default MainLayout
