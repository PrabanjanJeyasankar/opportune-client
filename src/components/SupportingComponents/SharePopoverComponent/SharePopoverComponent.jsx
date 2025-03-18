import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import styles from './SharePopoverComponent.module.css'

// Lazy load all components and SVGs
const ButtonComponent = lazy(() =>
    import('@/elements/ButtonComponent/ButtonComponent')
)
const CloseXSvg = lazy(() => import('@/svg/CloseXSvg/CloseXSvg'))
const CopyIconSvg = lazy(() => import('@/svg/CopyIconSvg/CopyIconSvg'))
const LaptopSvg = lazy(() => import('@/svg/LaptopSvg/LaptopSvg'))
const MobilePhoneSvg = lazy(() => import('@/svg/MobilePhoneSvg/MobilePhoneSvg'))
const ShareIconSvg = lazy(() => import('@/svg/ShareIconSvg/ShareIconSvg'))
const FacebookSvg = lazy(() =>
    import('@/svg/SocialIconsSvg/FacebookSvg/FacebookSvg')
)
const LinkedinSvg = lazy(() =>
    import('@/svg/SocialIconsSvg/LinkedinSvg/LinkedinSvg')
)
const RedditSvg = lazy(() => import('@/svg/SocialIconsSvg/RedditSvg/RedditSvg'))
const TelegramSvg = lazy(() =>
    import('@/svg/SocialIconsSvg/TelegramSvg/TelegramSvg')
)
const WhatsappSvg = lazy(() =>
    import('@/svg/SocialIconsSvg/WhatsappSvg/WhatsappSvg')
)
const XSvg = lazy(() => import('@/svg/SocialIconsSvg/XSvg/XSvg'))
const TickSvg = lazy(() => import('@/svg/TickSvg/TickSvg'))

// Fallback component for Suspense
const LoadingFallback = () => <div className={styles.loading_icon}>...</div>

function SharePopoverComponent({ isOpen, onClose, project }) {
    const [shareUrl, setShareUrl] = useState('')
    const [isCopying, setIsCopying] = useState(false)
    const inputRef = useRef(null)
    const popoverRef = useRef(null)

    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768)
        }

        handleResize()

        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        if (isOpen) {
            const baseUrl = window.location.origin
            const fullShareUrl = `${baseUrl}/${project.authorDetails.username}/${project.slug}`
            setShareUrl(fullShareUrl)

            document.body.style.overflow = 'hidden'

            setTimeout(() => {
                inputRef.current?.focus()
            }, 100)

            const handleEscKey = (e) => {
                if (e.key === 'Escape') onClose()
            }
            window.addEventListener('keydown', handleEscKey)

            const handleOutsideClick = (e) => {
                if (
                    popoverRef.current &&
                    !popoverRef.current.contains(e.target)
                ) {
                    onClose()
                }
            }
            document.addEventListener('mousedown', handleOutsideClick)

            return () => {
                document.body.style.overflow = 'auto'
                window.removeEventListener('keydown', handleEscKey)
                document.removeEventListener('mousedown', handleOutsideClick)
            }
        }
    }, [isOpen, onClose, project])

    if (!isOpen) return null

    const handleCopyLink = (e) => {
        e.preventDefault()
        e.stopPropagation()

        navigator.clipboard.writeText(shareUrl)

        setIsCopying(true)
        setTimeout(() => setIsCopying(false), 2000)
    }

    const shareToSocialMedia = async (platform) => {
        const title = project.title || 'Check out this awesome project'
        const description =
            project.description || 'An amazing project on Opportune'
        const text = `${title} - ${description}`

        if (platform === 'native' && navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    text: description,
                    url: shareUrl,
                })
                return
            } catch (error) {
                console.log('Error sharing:', error)
            }
        }

        let url = ''

        switch (platform) {
            case 'X':
                url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    text
                )}&url=${encodeURIComponent(shareUrl)}`
                break
            case 'whatsapp':
                url = `https://wa.me/?text=${encodeURIComponent(
                    `${text} ${shareUrl}`
                )}`
                break
            case 'facebook':
                url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    shareUrl
                )}`
                break
            case 'linkedin':
                url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    shareUrl
                )}&summary=${encodeURIComponent(
                    description
                )}&title=${encodeURIComponent(title)}`
                break
            case 'reddit':
                url = `https://www.reddit.com/submit?url=${encodeURIComponent(
                    shareUrl
                )}&title=${encodeURIComponent(title)}`
                break
            case 'telegram':
                url = `https://t.me/share/url?url=${encodeURIComponent(
                    shareUrl
                )}&text=${encodeURIComponent(text)}`
                break
            default:
                break
        }

        if (url) {
            window.open(url, '_blank', 'noopener,noreferrer')
        }
    }

    const handleContentClick = (e) => {
        e.stopPropagation()
    }

    const handleCloseClick = (e) => {
        e.preventDefault()
        e.stopPropagation()
        onClose()
    }

    const handleInputClick = (e) => {
        e.stopPropagation()
        inputRef.current?.select()
    }

    const title = project?.title || 'Opportune Project'
    const description =
        project?.description || 'Check out this awesome project on Opportune'
    const imageUrl =
        project?.thumbnailUrl ||
        `${window.location.origin}/default-project-thumbnail.jpg`

    return (
        <>
            <Helmet>
                {/* Basic SEO Meta Tags */}
                <meta name='description' content={description} />

                {/* Open Graph (Facebook, LinkedIn, WhatsApp) */}
                <meta property='og:type' content='website' />
                <meta property='og:url' content={shareUrl} />
                <meta property='og:title' content={title} />
                <meta property='og:description' content={description} />
                <meta property='og:image' content={imageUrl} />
                <meta property='og:image:alt' content={title} />
                <meta property='og:site_name' content='Opportune' />
                <meta property='og:image:width' content='1200' />
                <meta property='og:image:height' content='630' />
                <meta property='og:locale' content='en_US' />

                {/* Twitter Meta Tags */}
                <meta name='twitter:card' content='summary_large_image' />
                <meta name='twitter:url' content={shareUrl} />
                <meta name='twitter:title' content={title} />
                <meta name='twitter:description' content={description} />
                <meta name='twitter:image' content={imageUrl} />
                <meta name='twitter:image:alt' content={title} />
            </Helmet>

            <div className={styles.overlay}>
                <div
                    className={styles.popover_container}
                    ref={popoverRef}
                    onClick={handleContentClick}>
                    <div className={styles.popover_header}>
                        <h3 className={styles.popover_header_title}>
                            <Suspense fallback={<LoadingFallback />}>
                                <ShareIconSvg strokeWidth='2' />
                            </Suspense>
                            <span>Quick share</span>
                        </h3>
                        <p className={styles.popover_header_subtitle}>
                            Share this project via your device or favorite apps.
                        </p>
                        <button
                            className={styles.close_button}
                            onClick={handleCloseClick}>
                            <Suspense fallback={<LoadingFallback />}>
                                <CloseXSvg width='20' height='20' />
                            </Suspense>
                        </button>
                    </div>

                    {navigator.share && (
                        <div className={styles.native_share}>
                            <Suspense fallback={<LoadingFallback />}>
                                <ButtonComponent
                                    className={styles.native_share_button}
                                    onClick={() => shareToSocialMedia('native')}
                                    aria-label='Share using device options'>
                                    <span>Share on your device</span>
                                    {isMobile ? (
                                        <Suspense
                                            fallback={<LoadingFallback />}>
                                            <MobilePhoneSvg />
                                        </Suspense>
                                    ) : (
                                        <Suspense
                                            fallback={<LoadingFallback />}>
                                            <LaptopSvg />
                                        </Suspense>
                                    )}
                                </ButtonComponent>
                            </Suspense>
                        </div>
                    )}
                    <div className={styles.divider_container}>
                        <div className={styles.divider_stripe_left} />
                        <p className={styles.divider_text}>or</p>
                        <div className={styles.divider_stripe_right} />
                    </div>
                    <div className={styles.social_icons}>
                        <Suspense fallback={<LoadingFallback />}>
                            <ButtonComponent
                                className={styles.social_button}
                                onClick={() => shareToSocialMedia('X')}
                                aria-label='Share to X'>
                                <Suspense fallback={<LoadingFallback />}>
                                    <XSvg />
                                </Suspense>
                            </ButtonComponent>
                        </Suspense>
                        <Suspense fallback={<LoadingFallback />}>
                            <ButtonComponent
                                className={styles.social_button}
                                onClick={() => shareToSocialMedia('facebook')}
                                aria-label='Share to Facebook'>
                                <Suspense fallback={<LoadingFallback />}>
                                    <FacebookSvg />
                                </Suspense>
                            </ButtonComponent>
                        </Suspense>
                        <Suspense fallback={<LoadingFallback />}>
                            <ButtonComponent
                                className={styles.social_button}
                                onClick={() => shareToSocialMedia('whatsapp')}
                                aria-label='Share to WhatsApp'>
                                <Suspense fallback={<LoadingFallback />}>
                                    <WhatsappSvg />
                                </Suspense>
                            </ButtonComponent>
                        </Suspense>
                        <Suspense fallback={<LoadingFallback />}>
                            <ButtonComponent
                                className={styles.social_button}
                                onClick={() => shareToSocialMedia('linkedin')}
                                aria-label='Share to LinkedIn'>
                                <Suspense fallback={<LoadingFallback />}>
                                    <LinkedinSvg />
                                </Suspense>
                            </ButtonComponent>
                        </Suspense>
                        <Suspense fallback={<LoadingFallback />}>
                            <ButtonComponent
                                className={styles.social_button}
                                onClick={() => shareToSocialMedia('reddit')}
                                aria-label='Share to Reddit'>
                                <Suspense fallback={<LoadingFallback />}>
                                    <RedditSvg />
                                </Suspense>
                            </ButtonComponent>
                        </Suspense>
                        <Suspense fallback={<LoadingFallback />}>
                            <ButtonComponent
                                className={styles.social_button}
                                onClick={() => shareToSocialMedia('telegram')}
                                aria-label='Share to Telegram'>
                                <Suspense fallback={<LoadingFallback />}>
                                    <TelegramSvg />
                                </Suspense>
                            </ButtonComponent>
                        </Suspense>
                    </div>

                    <div className={styles.link_container}>
                        <input
                            ref={inputRef}
                            type='text'
                            value={shareUrl}
                            readOnly
                            className={styles.link_input}
                            aria-label='Share link'
                            onClick={handleInputClick}
                        />
                        <Suspense fallback={<LoadingFallback />}>
                            <ButtonComponent
                                className={styles.copy_button}
                                onClick={handleCopyLink}>
                                {isCopying ? (
                                    <Suspense fallback={<LoadingFallback />}>
                                        <TickSvg />
                                    </Suspense>
                                ) : (
                                    <Suspense fallback={<LoadingFallback />}>
                                        <CopyIconSvg />
                                    </Suspense>
                                )}
                                <span>Copy</span>
                            </ButtonComponent>
                        </Suspense>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SharePopoverComponent
