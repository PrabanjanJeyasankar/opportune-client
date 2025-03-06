import ButtonComponent from '@/elements/ButtonComponent/ButtonComponent'
import { toast } from '@/hooks/use-toast'
import useUserContext from '@/hooks/useUserContext'
import FloatingAstronautAnimation from '@/loaders/FloatingAstronautAnimation/FloatingAstronautAnimation'
import InfiniteLoadingAnimation from '@/loaders/InfiniteLoadingAnimation/InfiniteLoadingAnimation'
import userProfileService from '@/services/userProfileservice'
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

            // If logged-in user is viewing their own incomplete profile - redirect to login
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
            <div className={styles.loading_animation}>
                <InfiniteLoadingAnimation />
            </div>
        )
    }

    const hasCompletedProfile =
        userProfileData?.bio && userProfileData?.professionalTitle
    const isViewingOwnProfile =
        isUserLoggedIn && userProfile?.username === username

    // Showing error message if profile is incomplete and it's not the user's own profile
    if (!hasCompletedProfile) {
        // If user is viewing someone else's incomplete profile (or anonymous user viewing incomplete profile)
        if (!isViewingOwnProfile) {
            return (
                <div className={styles.error_message}>
                    <FloatingAstronautAnimation />
                    <p className={styles.error_message_text}>
                        {username}'s portfolio is shaping up, check back soon
                        for updates!
                    </p>
                    <ButtonComponent
                        className={styles.home_button}
                        onClick={() => navigate('/')}>
                        Go Home
                    </ButtonComponent>
                </div>
            )
        }
        // Also, Note: If viewing own incomplete profile, the redirect in useEffect will handle it
    }

    return (
        <>
            <div className={styles.parent_container}>
                <PortfolioNavbarComponent
                    name={userProfileData?.name}
                    portfolioLink={userProfileData?.portfolioLink}
                />

                <div className={styles.main_container}>
                    <ProfileSectionComponent
                        id='home'
                        name={userProfileData?.name}
                        title={userProfileData?.professionalTitle}
                    />

                    <ContactSectionComponent
                        onCopyEmail={copyEmailToClipboard}
                    />
                </div>

                {userProfileData.accounts && (
                    <SocialLinksComponent
                        socialPlatforms={userProfileData?.accounts}
                    />
                )}

                {userProfileData.bio && (
                    <UserBioComponent portfolioBio={userProfileData?.bio} />
                )}

                <div className={styles.resume_stats_container}>
                    <ResumeComponent resumeLink={userProfileData.resumeLink} />
                    <div className={styles.stats_skills_container}>
                        <StatisticGridComponent
                            professionalExperience={
                                userProfileData?.professionalExperience || 0
                            }
                        />
                    </div>
                </div>
            </div>

            <PortfolioProjectCardComponent
                id='works'
                projects={userProfileData?.projects}
            />
            <ContactSectionComponent
                id='contact'
                onCopyEmail={copyEmailToClipboard}
            />
        </>
    )
}

export default PortfolioPage
