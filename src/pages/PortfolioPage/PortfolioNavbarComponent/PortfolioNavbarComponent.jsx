import React, { useState } from 'react'
import styles from './PortfolioNavbarComponent.module.css'

function PortfolioNavbarComponent({ name, portfolioLink }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev)
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            toggleMenu()
        }
    }

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <a href='/' className={styles.logo_link}>
                    {name}
                </a>
            </div>

            <button
                className={`${styles.hamburger} ${
                    isMenuOpen ? styles.active : ''
                }`}
                onClick={toggleMenu}
                onKeyDown={handleKeyDown}
                aria-expanded={isMenuOpen}
                aria-label='Toggle navigation menu'>
                <span className={styles.line} />
                <span className={styles.line} />
            </button>

            <div
                className={`${styles.menu_items} ${
                    isMenuOpen ? styles.show : ''
                }`}>
                <a href='#home' className={`${styles.menu_item} ${styles.active}`}>
                    home.
                </a>
                <a href='#works' className={styles.menu_item}>
                    works.
                </a>
                <a href='#contact' className={styles.menu_item}>
                    contact.
                </a>
                <a
                    href={portfolioLink}
                    className={styles.menu_item}
                    target='_blank'
                    rel='noopener noreferrer'>
                    ext portfolio.
                </a>
            </div>
        </nav>
    )
}

export default PortfolioNavbarComponent
