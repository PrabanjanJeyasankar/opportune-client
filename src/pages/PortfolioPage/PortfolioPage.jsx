import PaperClipSvg from '@/svg/PaperClipSvg/PaperClipSvg'
import RingStyleSvg from '@/svg/RingStyleSvg/RingStyleSvg'
import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import data from '../../data/portfolioData'
import styles from './PortfolioPage.module.css'

const PortfolioPage = () => {
    const { personalInfo } = data[0]
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [copied, setCopied] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev)
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            toggleMenu()
        }
    }

    const copyEmailToClipboard = () => {
        navigator.clipboard.writeText(personalInfo.email)
            .then(() => {
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
            })
            .catch((err) => console.error('Failed to copy email:', err))
    }

    return (
        <>
            <div className={styles.parentContainer}>
                <nav className={styles.navbar}>
                    <div className={styles.logo}>
                        <a href='/' className={styles.logoLink}>
                            jenny wilson.
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
                        className={`${styles.menuItems} ${
                            isMenuOpen ? styles.show : ''
                        }`}>
                        <a
                            href='/'
                            className={`${styles.menuItem} ${styles.active}`}>
                            home.
                        </a>
                        <a href='/works' className={styles.menuItem}>
                            works.
                        </a>
                        <a href='/contact' className={styles.menuItem}>
                            contact.
                        </a>
                    </div>
                </nav>
                <div className={styles.mainContainer}>
                    <div className={styles.profileSection}>
                        <div className={styles.profileHeader}>
                            <div className={styles.profileImageContainer}>
                                <img
                                    loading='lazy'
                                    src='https://cdn.prod.website-files.com/63fbd08ddcf51344a63f9add/63fbd08ddcf5133a563f9af5_Avatar.png'
                                    alt='Profile'
                                    className={styles.profileImage}
                                />
                            </div>
                            <h1 className={styles.profileText}>
                                {personalInfo.name}
                                <br />
                                <span className={styles.professionalTitle}>
                                    is a {personalInfo.title}
                                </span>
                            </h1>
                        </div>
                    </div>

                    <div className={styles.contactSection}>
                        <div className={styles.contactContainer}>
                            <RingStyleSvg />
                            <h2 className={styles.contactTitle}>
                                Have a project
                                <br />
                                in mind?
                            </h2>
                            <button
                                onClick={copyEmailToClipboard}
                                className={styles.contactButton}>
                                <PaperClipSvg /> <span>Copy Email</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {copied &&
                createPortal(
                    <div className={styles.copyMessage}>Copied!</div>,
                    document.body
                )}
        </>
    )
}

export default PortfolioPage
