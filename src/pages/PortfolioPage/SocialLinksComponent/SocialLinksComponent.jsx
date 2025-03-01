import GithubSvg from '@/svg/GithubSvg/GithubSvg'
import BehanceSvg from '@/svg/SocialIconsSvg/BehanceSvg/BehanceSvg'
import DribbbleSvg from '@/svg/SocialIconsSvg/DribbbleSvg/DribbbleSvg'
import FacebookSvg from '@/svg/SocialIconsSvg/FacebookSvg/FacebookSvg'
import InstagramSvg from '@/svg/SocialIconsSvg/InstagramSvg/InstagramSvg'
import LeetcodeSvg from '@/svg/SocialIconsSvg/LeetcodeSvg/LeetcodeSvg'
import LinkedinSvg from '@/svg/SocialIconsSvg/LinkedinSvg/LinkedinSvg'
import RedditSvg from '@/svg/SocialIconsSvg/RedditSvg/RedditSvg'
import TelegramSvg from '@/svg/SocialIconsSvg/TelegramSvg/TelegramSvg'
import XSvg from '@/svg/SocialIconsSvg/XSvg/XSvg'
import styles from './SocialLinksComponent.module.css'

function SocialLinksComponent({ socialPlatforms = [] }) {
    if (socialPlatforms.length === 0) return null

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

    const matchedPlatforms = socialPlatforms.map((platform) => ({
        name: platform.domain,
        url: platform.url,
        icon: defaultSocialPlatforms[platform.domain.toLowerCase()] || null,
    }))

    return (
        <div
            className={styles.social_container}
            style={{
                gridTemplateColumns: `repeat(${matchedPlatforms.length}, 1fr)`,
            }}>
            {matchedPlatforms.map((platform, index) =>
                platform.icon ? (
                    <a
                        key={index}
                        href={platform.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className={styles.social_item}>
                        {platform.icon}
                        <span className={styles.social_platform_name}>
                            {platform.name}
                        </span>
                    </a>
                ) : null
            )}
        </div>
    )
}

export default SocialLinksComponent
