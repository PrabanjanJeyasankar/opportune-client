import React from 'react'
import accountSideNavbarStyles from './AccountSideNavbarComponent.module.css'
import ImageComponent from '../../elements/ImageComponent/ImageComponent'
import { Link, NavLink, useLocation } from 'react-router-dom'
import ProfileSvg from '../../svg/ProfileSvg/ProfileSvg'
import ProjectSvg from '../../svg/ProjectSvg/ProjectSvg'
import ButtonComponent from '../../elements/ButtonComponent/ButtonComponent'
import LogoutSvg from '../../svg/LogoutSvg/LogoutSvg'
import DefaultProfileSVG from '../../svg/DefaultProfileSvg/DefaultProfileSvg'

const AccountSideNavbarComponent = () => {

    const location = useLocation()

  return (
    <div className={accountSideNavbarStyles.container}>
      <div>
        <div className={accountSideNavbarStyles.profile_container}>
            <div className={accountSideNavbarStyles.profile_svg}>
              <DefaultProfileSVG/>
            </div>
            <div>
                <p className={accountSideNavbarStyles.profile_name}>Yugendar M</p>
                <p className={accountSideNavbarStyles.profile_email}>yugendar2411@gmail.com</p>
            </div>
        </div>

        <div className={accountSideNavbarStyles.nav_links_container}>
        <NavLink
                to="/account/my-profile"
                className={({ isActive }) =>
                    `${accountSideNavbarStyles.nav_link} ${isActive ? accountSideNavbarStyles.active : ''}`
                }
                >
                {({ isActive }) => (
                    <>
                    <ProfileSvg isActive={isActive} />
                    <p>Profile</p>
                    </>
                )}
            </NavLink>

            <NavLink
                to="/account/my-projects"
                className={({ isActive }) =>
                    `${accountSideNavbarStyles.nav_link} ${isActive ? accountSideNavbarStyles.active : ''}`
                }
                >
                {({ isActive }) => (
                    <>
                    <ProjectSvg isActive={isActive} />
                    <p>My Projects</p>
                    </>
                )}
            </NavLink>
        </div>
      </div>

      <div >
        <ButtonComponent className={accountSideNavbarStyles.logout_button}>
            <LogoutSvg />
            Logout
        </ButtonComponent>
      </div>
    </div>
  )
}

export default AccountSideNavbarComponent