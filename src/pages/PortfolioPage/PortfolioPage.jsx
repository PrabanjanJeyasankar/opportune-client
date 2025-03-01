import { toast } from '@/hooks/use-toast'
import InfiniteLoadingAnimation from '@/loaders/InfiniteLoadingAnimation/InfiniteLoadingAnimation'
import userProfileService from '@/services/userProfileservice'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PortfolioProjectCardComponent from '../../components/PortfolioProjectCardComponent/PortfolioProjectCardComponent'
import ContactSectionComponent from './ContactSectionComponent/ContactSectionComponent'
import PortfolioNavbarComponent from './PortfolioNavbarComponent/PortfolioNavbarComponent'
import styles from './PortfolioPage.module.css'
import ProfileSectionComponent from './ProfileSectionComponent/ProfileSectionComponent'
import ResumeComponent from './ResumeComponent/ResumeComponent'
import SocialLinksComponent from './SocialLinksComponent/SocialLinksComponent'
import StatisticGridComponent from './StatisticGridComponent/StatisticGridComponent'
import UserBioComponent from './UserBioComponent/UserBioComponent'

function PortfolioPage() {
    const [userProfileData, setUserProfileData] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        userProfileService
            .getUserProfile()
            .then((response) => {
                const profileData = response.data.data[0] || {}
                if (!profileData.authorDetails) {
                    toast({
                        description:
                            'Please fill out your complete details to complete your portfolio',
                    })
                    navigate('/update-profile', { replace: true })
                    return
                }

                setUserProfileData(profileData)
            })
            .catch((error) => {
                console.error('Error fetching user profile:', error)
            })
            .finally(() => setLoading(false))
    }, [navigate])

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

    if (!userProfileData) {
        return (
            <div className={styles.error_message}>User profile not found</div>
        )
    }

    return (
        <>
            <div className={styles.parent_container}>
                <PortfolioNavbarComponent
                    name={userProfileData.authorDetails?.name}
                    portfolioLink={userProfileData?.portfolioLink}
                />

                <div className={styles.main_container}>
                    <ProfileSectionComponent
                        id='home'
                        name={userProfileData?.authorDetails.name}
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
                username={userProfileData?.authorDetails?.username}
            />
            <ContactSectionComponent
                id='contact'
                onCopyEmail={copyEmailToClipboard}
            />
        </>
    )
}

export default PortfolioPage
