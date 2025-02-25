import PortfolioProjectCardComponent from '@/components/PortfolioProjectCardComponent/PortfolioProjectCardComponent'
import PaperClipSvg from '@/svg/PaperClipSvg/PaperClipSvg'
import ResumeSvg from '@/svg/ResumeSvg/ResumeSvg'
import RingStyleSvg from '@/svg/RingStyleSvg/RingStyleSvg'
import BehanceSvg from '@/svg/SocialIconsSvg/BehanceSvg/BehanceSvg'
import DribbbleSvg from '@/svg/SocialIconsSvg/DribbbleSvg/DribbbleSvg'
import FacebookSvg from '@/svg/SocialIconsSvg/FacebookSvg/FacebookSvg'
import GithubSvg from '@/svg/SocialIconsSvg/GithubSvg/GithubSvg'
import InstagramSvg from '@/svg/SocialIconsSvg/InstagramSvg/InstagramSvg'
import LeetcodeSvg from '@/svg/SocialIconsSvg/LeetcodeSvg/LeetcodeSvg'
import LinkedinSvg from '@/svg/SocialIconsSvg/LinkedinSvg/LinkedinSvg'
import RedditSvg from '@/svg/SocialIconsSvg/RedditSvg/RedditSvg'
import TelegramSvg from '@/svg/SocialIconsSvg/TelegramSvg/TelegramSvg'
import XSvg from '@/svg/SocialIconsSvg/XSvg/XSvg'
import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import data from '../../data/portfolioData'
import styles from './PortfolioPage.module.css'

const defaultSocialPlatforms = {
    github: <GithubSvg />,
    linkedin: <LinkedinSvg />,
    leetcode: <LeetcodeSvg />,
    dribbble: <DribbbleSvg />,
    facebook: <FacebookSvg />,
    telegram: <TelegramSvg />,
    x: <XSvg />,
    reddit: <RedditSvg />,
    instagram: <InstagramSvg />,
    behance: <BehanceSvg />,
}

const PortfolioPage = () => {
    const {
        personalInfo,
        skills,
        socialPlatforms = [],
        totalUpvoteCount,
        totalProjectCount,
        professionalExperience,
    } = data[0] || {}

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
        navigator.clipboard
            .writeText(personalInfo.email)
            .then(() => {
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
            })
            .catch((err) => console.error('Failed to copy email:', err))
    }

    const splitBioText = (bio) => {
        const sentences = bio.split(/(?<=[.!?])\s+/)
        let firstHalf = ''
        let secondHalf = ''

        sentences.forEach((sentence) => {
            if (
                firstHalf.split(' ').length <
                Math.ceil(bio.split(' ').length / 2)
            ) {
                firstHalf += sentence + ' '
            } else {
                secondHalf += sentence + ' '
            }
        })

        return { firstHalf: firstHalf.trim(), secondHalf: secondHalf.trim() }
    }

    const { firstHalf, secondHalf } = splitBioText(
        personalInfo.bio || 'Your bio here...'
    )

    const matchedPlatforms = (socialPlatforms || []).map((platform) => ({
        name: platform.name,
        url: platform.url,
        icon: defaultSocialPlatforms[platform.name],
    }))

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
                <div
                    className={styles.socialContainer}
                    style={{
                        gridTemplateColumns: `repeat(${matchedPlatforms.length}, 1fr)`,
                    }}>
                    {matchedPlatforms.map((platform, index) => (
                        <a
                            key={index}
                            href={platform.url}
                            target='_blank'
                            rel='noopener noreferrer'
                            className={styles.socialItem}>
                            {platform.icon}
                            <span className={styles.socialPlatformName}>
                                {platform.name}
                            </span>
                        </a>
                    ))}
                </div>
                {/* Two-Column Layout */}

                {/* Bio Section */}
                <div className={styles.bioContainer}>
                    <p className={styles.bioText}>
                        <span className={styles.firstHalf}>{firstHalf}</span>
                        <span className={styles.secondHalf}>{secondHalf}</span>
                    </p>
                </div>

                <div className={styles.resumeSocialContainer}>
                    <div className={styles.resumeContainer}>
                        <ResumeSvg />
                        <span className={styles.resumeText}>
                            Curriculum <span>Vita&eacute;</span>
                        </span>
                    </div>
                    <div className={styles.countAndSkillsContainer}>
                        <div className={styles.upvoteProjectExperienceCount}>
                            <div className={styles.totalUpvoteCountContainer}>
                                <div className={styles.totalUpvoteCount}>
                                    {totalUpvoteCount}
                                </div>
                                <span className={styles.totalUpvoteCountTitle}>
                                    Total upcount
                                </span>
                            </div>
                            <div className={styles.totalProjectCountContainer}>
                                <div className={styles.totalProjectCount}>
                                    {totalProjectCount}
                                </div>
                                <span className={styles.totalProjectCountTitle}>
                                    Total projects
                                </span>
                            </div>
                            <div
                                className={
                                    styles.professionalExperienceContainer
                                }>
                                <div
                                    className={
                                        styles.professionalExperienceCount
                                    }>
                                    {professionalExperience === 0
                                        ? '<1'
                                        : professionalExperience}
                                </div>
                                <span
                                    className={
                                        styles.professionalExperienceCountTitle
                                    }>
                                    Experience
                                </span>
                            </div>
                        </div>
                        <div className={styles.skillsGridContainer}>
                            <div className={styles.skillsGrid}>
                                {skills.map((skill, index) => (
                                    <div
                                        key={index}
                                        className={styles.skillItem}>
                                        {skill}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <PortfolioProjectCardComponent />

            {copied &&
                createPortal(
                    <div className={styles.copyMessage}>Copied!</div>,
                    document.body
                )}
        </>
    )
}

export default PortfolioPage
