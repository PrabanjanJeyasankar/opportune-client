import React from 'react'
import { Outlet } from 'react-router-dom'
import AccountSideNavbarComponent from '../../components/AccountSideNavbarComponent/AccountSideNavbarComponent'
import accountLayoutStyles from './AccountLayout.module.css'

const AccountLayout = () => {
  return (
    <div className={accountLayoutStyles.container}>
      <AccountSideNavbarComponent/> 
      <Outlet/>
    </div>
  )
}

export default AccountLayout
