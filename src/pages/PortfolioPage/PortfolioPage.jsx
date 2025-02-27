import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import PortfolioProjectCardComponent from '../../components/PortfolioProjectCardComponent/PortfolioProjectCardComponent'
import data from '../../data/portfolioData'
import ContactSectionComponent from './ContactSectionComponent/ContactSectionComponent'
import PortfolioNavbarComponent from './PortfolioNavbarComponent/PortfolioNavbarComponent'
import styles from './PortfolioPage.module.css'
import ProfileSectionComponent from './ProfileSectionComponent/ProfileSectionComponent'
import ResumeComponent from './ResumeComponent/ResumeComponent'
import SocialLinksComponent from './SocialLinksComponent/SocialLinksComponent'
import StatisticGridComponent from './StatisticGridComponent/StatisticGridComponent'
import UserBioComponent from './UserBioComponent/UserBioComponent'

function PortfolioPage() {
    const {
        personalInfo,
        skills,
        socialPlatforms = [],
        totalUpvoteCount,
        totalProjectCount,
        professionalExperience,
    } = data[0] || {}

    const [copied, setCopied] = useState(false)

    const copyEmailToClipboard = () => {
        navigator.clipboard
            .writeText(personalInfo.email)
            .then(() => {
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
            })
            .catch((err) => console.error('Failed to copy email:', err))
    }

    return (
        <>
            <div className={styles.parent_container}>
                <PortfolioNavbarComponent logoText='jenny wilson.' />

                <div className={styles.main_container}>
                    <ProfileSectionComponent
                        name={personalInfo.name}
                        title={personalInfo.title}
                    />
                    <ContactSectionComponent
                        onCopyEmail={copyEmailToClipboard}
                    />
                </div>

                <SocialLinksComponent socialPlatforms={socialPlatforms} />

                <UserBioComponent portfolioBio={personalInfo.bio} />

                <div className={styles.resume_stats_container}>
                    <ResumeComponent />
                    <div className={styles.stats_skills_container}>
                        <StatisticGridComponent
                            totalUpvoteCount={totalUpvoteCount}
                            totalProjectCount={totalProjectCount}
                            professionalExperience={professionalExperience}
                            skills={skills}
                        />
                    </div>
                </div>
            </div>

            <PortfolioProjectCardComponent />
            <ContactSectionComponent onCopyEmail={copyEmailToClipboard} />

            {copied &&
                createPortal(
                    <div className={styles.copy_message}>Copied!</div>,
                    document.body
                )}
        </>
    )
}

export default PortfolioPage
