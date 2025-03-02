import ButtonComponent from '@/elements/ButtonComponent/ButtonComponent'
import useHomeFeedResetContext from '@/hooks/useHomeFeedResetContext'
import useUserContext from '@/hooks/useUserContext'
import authService from '@/services/authService'
import CheveronArrowDownSvg from '@/svg/ChevronArrowDownSvg/CheveronArrowDownSvg'
import EditPenSvg from '@/svg/EditPenSvg/EditPenSvg'
import LogoutSvg from '@/svg/LogoutSvg/LogoutSvg'
import UserRoundSvg from '@/svg/UserRoundSvg/UserRoundSvg'
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import AppLogo from '../../assets/images/opportune_logo_svg.svg'
import navBarStyles from './NavigationBarComponent.module.css'

const NavigationBarComponent = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const navbarRef = useRef(null)
    const dropdownRef = useRef(null)
    const { setSearchTerm } = useHomeFeedResetContext()
    const { isUserLoggedIn, setIsUserLoggedIn, setUserProfile, userProfile } =
        useUserContext()

    const toggleMenu = () => setIsMenuOpen((prev) => !prev)
    const handleCloseMenu = () => setIsMenuOpen(false)
    const handleClearSearch = () => setSearchTerm('')
    const toggleDropdown = () => setIsDropdownOpen((prev) => !prev)

    const logout = () => {
        authService
            .logout()
            .then(() => {
                localStorage.removeItem('userData')

                setIsUserLoggedIn(false)
                setUserProfile({})

                window.location.href = '/'
            })
            .catch((error) => {
                console.error('Logout failed:', error)
            })
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsDropdownOpen(false)
            }
        }

        if (isDropdownOpen) {
            document.addEventListener('click', handleClickOutside)
        } else {
            document.removeEventListener('click', handleClickOutside)
        }

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [isDropdownOpen])

    return (
        <header ref={navbarRef} className={navBarStyles.header}>
            <Link
                to='/'
                className={navBarStyles.logo}
                onClick={handleClearSearch}>
                <img
                    src={AppLogo}
                    alt='App Logo'
                    className={navBarStyles.logo_image}
                />
                <div className={navBarStyles.app_name}>Opportune</div>
            </Link>

            <nav
                className={`${navBarStyles.navigation_bar} ${
                    isMenuOpen ? navBarStyles.show : ''
                }`}>
                <NavLink
                    to='/'
                    className={({ isActive }) =>
                        `${navBarStyles.link} ${
                            isActive ? navBarStyles.activeLink : ''
                        }`
                    }
                    onClick={() => {
                        handleCloseMenu()
                        handleClearSearch()
                    }}>
                    Home
                </NavLink>
                <NavLink
                    to='/aboutus'
                    className={({ isActive }) =>
                        `${navBarStyles.link} ${
                            isActive ? navBarStyles.activeLink : ''
                        }`
                    }
                    onClick={handleCloseMenu}>
                    About us
                </NavLink>
                <NavLink
                    to='/feedback'
                    className={({ isActive }) =>
                        `${navBarStyles.link} ${
                            isActive ? navBarStyles.activeLink : ''
                        }`
                    }
                    onClick={handleCloseMenu}>
                    Feedback
                </NavLink>

                <div className={navBarStyles.authentication_links}>
                    {!isUserLoggedIn ? (
                        <>
                            <NavLink
                                to='/login'
                                className={navBarStyles.link}
                                onClick={handleCloseMenu}>
                                Login
                            </NavLink>
                            <NavLink
                                to='/new'
                                className={navBarStyles.signup_button}
                                onClick={handleCloseMenu}>
                                Post a project &#128640;
                            </NavLink>
                        </>
                    ) : (
                        <>
                            <div
                                className={
                                    navBarStyles.profile_dropdown_container
                                }
                                ref={dropdownRef}>
                                <ButtonComponent
                                    className={`${
                                        navBarStyles.profile_btn_container
                                    } ${
                                        isDropdownOpen
                                            ? navBarStyles.profile_active
                                            : ''
                                    }`}
                                    onClick={toggleDropdown}>
                                    <div className={navBarStyles.link}>
                                        <div
                                            className={`${
                                                navBarStyles.arrow_icon
                                            } ${
                                                isDropdownOpen
                                                    ? `${navBarStyles.icon_active} ${navBarStyles.rotate_arrow}`
                                                    : navBarStyles.default_arrow
                                            }`}>
                                            <CheveronArrowDownSvg />
                                        </div>
                                        <span
                                            className={
                                                isDropdownOpen
                                                    ? navBarStyles.text_active
                                                    : ''
                                            }>
                                            Profile
                                        </span>
                                    </div>
                                </ButtonComponent>

                                {isDropdownOpen && (
                                    <div
                                        className={`${navBarStyles.dropdown_menu} ${navBarStyles.show}`}>
                                        <NavLink
                                            to={`/portfolio/${userProfile?.username}`}
                                            className={
                                                navBarStyles.dropdown_item
                                            }
                                            onClick={() => {
                                                setIsDropdownOpen(false)
                                                setIsMenuOpen(false) 
                                            }}>
                                            <UserRoundSvg />
                                            <span>My Portfolio</span>
                                        </NavLink>
                                        <NavLink
                                            to={'/update-profile'}
                                            className={
                                                navBarStyles.dropdown_item
                                            }
                                            onClick={() => {
                                                setIsDropdownOpen(false)
                                                setIsMenuOpen(false) 
                                            }}>
                                            <EditPenSvg />
                                            <span>Edit Portfolio</span>
                                        </NavLink>
                                        <ButtonComponent
                                            className={
                                                navBarStyles.dropdown_item
                                            }
                                            onClick={() => {
                                                logout()
                                                setIsDropdownOpen(false)
                                                setIsMenuOpen(false) 
                                            }}>
                                            <LogoutSvg />
                                            <span>Logout</span>
                                        </ButtonComponent>
                                    </div>
                                )}
                            </div>
                            <NavLink
                                to='/new'
                                className={navBarStyles.signup_button}
                                onClick={handleCloseMenu}>
                                <span>Post a project &#128640;</span>
                            </NavLink>
                        </>
                    )}
                </div>
            </nav>

            <ButtonComponent
                className={`${navBarStyles.hamburger} ${
                    isMenuOpen ? navBarStyles.active : ''
                }`}
                onClick={toggleMenu}
                aria-expanded={isMenuOpen}
                aria-label='Toggle navigation menu'>
                <span className={navBarStyles.line} />
                <span className={navBarStyles.line} />
            </ButtonComponent>
        </header>
    )
}

export default NavigationBarComponent
