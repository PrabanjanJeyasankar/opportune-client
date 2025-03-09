import ButtonComponent from '@/elements/ButtonComponent/ButtonComponent'
import { toast } from '@/hooks/use-toast'
import useUserContext from '@/hooks/useUserContext'
import FloatingAstronautAnimation from '@/loaders/FloatingAstronautAnimation/FloatingAstronautAnimation'
import InfiniteLoadingAnimation from '@/loaders/InfiniteLoadingAnimation/InfiniteLoadingAnimation'
import userProfileService from '@/services/userProfileservice'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ContactSectionComponent from './ContactSectionComponent/ContactSectionComponent'
import PortfolioNavbarComponent from './PortfolioNavbarComponent/PortfolioNavbarComponent'
import styles from './PortfolioPage.module.css'
import PortfolioProjectCardComponent from './PortfolioProjectCardComponent/PortfolioProjectCardComponent'
import ProfileSectionComponent from './ProfileSectionComponent/ProfileSectionComponent'
import ResumeComponent from './ResumeComponent/ResumeComponent'
import SocialLinksComponent from './SocialLinksComponent/SocialLinksComponent'
import StatisticGridComponent from './StatisticGridComponent/StatisticGridComponent'
import UserBioComponent from './UserBioComponent/UserBioComponent'

function PortfolioPage() {
    const { username } = useParams()
    const [userProfileData, setUserProfileData] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const { isUserLoggedIn, userProfile } = useUserContext()

    useEffect(() => {
        userProfileService
            .retirevePortfolioDataByUsername(username)
            .then((response) => {
                const portfolioData = response.data.data
                console.log(portfolioData)
                setUserProfileData(portfolioData)
            })
            .catch((error) => {
                console.error('Error fetching user profile:', error)
            })
            .finally(() => setLoading(false))
    }, [username])

    useEffect(() => {
        if (!loading) {
            const hasCompletedProfile =
                userProfileData?.bio && userProfileData?.professionalTitle
            const isViewingOwnProfile =
                isUserLoggedIn && userProfile?.username === username

            // Redirect if the logged-in user views their own incomplete profile
            if (isViewingOwnProfile && !hasCompletedProfile) {
                navigate('/login')
            }
        }
    }, [
        isUserLoggedIn,
        userProfile,
        userProfileData,
        username,
        navigate,
        loading,
    ])

    const copyEmailToClipboard = () => {
        if (userProfileData?.email) {
            navigator.clipboard.writeText(userProfileData.email)
            toast({ description: 'Email copied to clipboard!' })
        }
    }

    if (loading) {
        return (
            <motion.div
                className={styles.loading_animation}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}>
                <InfiniteLoadingAnimation />
            </motion.div>
        )
    }

    const hasCompletedProfile =
        userProfileData?.bio && userProfileData?.professionalTitle
    const isViewingOwnProfile =
        isUserLoggedIn && userProfile?.username === username

    // Show an error message if the profile is incomplete and it's not the user's own profile
    if (!hasCompletedProfile && !isViewingOwnProfile) {
        return (
            <motion.div
                className={styles.error_message}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}>
                <FloatingAstronautAnimation />
                <p className={styles.error_message_text}>
                    {username}'s portfolio is shaping up, check back soon for
                    updates!
                </p>
                <ButtonComponent
                    className={styles.home_button}
                    onClick={() => navigate('/')}>
                    Go Home
                </ButtonComponent>
            </motion.div>
        )
    }

    const fadeInVariant = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: 'easeOut' },
        },
    }

    return (
        <motion.div
            className={styles.parent_container}
            initial={false}
            animate='visible'
            variants={fadeInVariant}>
            <motion.div
                variants={fadeInVariant}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, amount: 0.2 }}>
                <PortfolioNavbarComponent
                    name={userProfileData?.name}
                    portfolioLink={userProfileData?.portfolioLink}
                />
            </motion.div>

            <motion.div
                className={styles.main_container}
                variants={fadeInVariant}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, amount: 0.2 }}>
                <ProfileSectionComponent
                    id='home'
                    name={userProfileData?.name}
                    title={userProfileData?.professionalTitle}
                />
                <ContactSectionComponent onCopyEmail={copyEmailToClipboard} />
            </motion.div>

            {userProfileData.accounts && (
                <motion.div
                    variants={fadeInVariant}
                    initial='hidden'
                    whileInView='visible'
                    viewport={{ once: true, amount: 0.2 }}>
                    <SocialLinksComponent
                        socialPlatforms={userProfileData?.accounts}
                    />
                </motion.div>
            )}

            {userProfileData.bio && (
                <motion.div
                    variants={fadeInVariant}
                    initial='hidden'
                    whileInView='visible'
                    viewport={{ once: true, amount: 0.2 }}>
                    <UserBioComponent portfolioBio={userProfileData?.bio} />
                </motion.div>
            )}

            <motion.div
                className={styles.resume_stats_container}
                variants={fadeInVariant}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, amount: 0.2 }}>
                <ResumeComponent resumeLink={userProfileData.resumeLink} />
                <div className={styles.stats_skills_container}>
                    <StatisticGridComponent
                        professionalExperience={
                            userProfileData?.professionalExperience
                        }
                        totalUpvoteCount={userProfileData?.totalUpvoteCount}
                        totalProjects={userProfileData?.totalProjects}
                        skills={userProfileData?.skills}
                    />
                </div>
            </motion.div>

            <motion.div
                variants={fadeInVariant}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, amount: 0.2 }}>
                <PortfolioProjectCardComponent
                    id='works'
                    projects={userProfileData?.projects}
                />
                <ContactSectionComponent
                    id='contact'
                    onCopyEmail={copyEmailToClipboard}
                />
            </motion.div>
        </motion.div>
    )
}

export default PortfolioPage
