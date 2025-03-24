import React, { useState } from 'react'
import styles from './PortfolioNavbarComponent.module.css'

function PortfolioNavbarComponent({ name, portfolioLink, sectionRefs }) {
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

    const scrollToSection = (section) => {
        if (sectionRefs[section]?.current) {
            sectionRefs[section].current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            })
            setIsMenuOpen(false)
        }
    }

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <button
                    className={styles.logo_link}
                    onClick={() => scrollToSection('home')}>
                    {name}
                </button>
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
                <button
                    className={`${styles.menu_item}`}
                    onClick={() => scrollToSection('home')}>
                    home.
                </button>
                <button
                    className={styles.menu_item}
                    onClick={() => scrollToSection('works')}>
                    works.
                </button>
                {portfolioLink && (
                    <a
                        href={portfolioLink}
                        className={styles.menu_item}
                        target='_blank'
                        rel='noopener noreferrer'>
                        ext portfolio.
                    </a>
                )}
            </div>
        </nav>
    )
}

export default PortfolioNavbarComponent
