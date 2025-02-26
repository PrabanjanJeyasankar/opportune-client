import ButtonComponent from '@/elements/ButtonComponent/ButtonComponent'
import ClipboardIcon from '@/svg/ClipboardSvg/ClipboardSvg'
import CloseXSvg from '@/svg/CloseXSvg/CloseXSvg'
import FacebookSvg from '@/svg/SocialIconsSvg/FacebookSvg/FacebookSvg'
import LinkedinSvg from '@/svg/SocialIconsSvg/LinkedinSvg/LinkedinSvg'
import RedditSvg from '@/svg/SocialIconsSvg/RedditSvg/RedditSvg'
import TelegramSvg from '@/svg/SocialIconsSvg/TelegramSvg/TelegramSvg'
import WhatsappSvg from '@/svg/SocialIconsSvg/WhatsappSvg/WhatsappSvg'
import XSvg from '@/svg/SocialIconsSvg/XSvg/XSvg'
import { useEffect, useRef, useState } from 'react'
import styles from './SharePopoverComponent.module.css'

function SharePopoverComponent({ isOpen, onClose, project }) {
    const [shareUrl, setShareUrl] = useState('')
    const [isCopying, setIsCopying] = useState(false)
    const inputRef = useRef(null)
    const popoverRef = useRef(null)

    useEffect(() => {
        if (isOpen) {
            const baseUrl = window.location.origin
            const fullShareUrl = `${baseUrl}/${project.authorDetails.username}/${project.slug}`
            setShareUrl(fullShareUrl)

            document.body.style.overflow = 'hidden'

            setTimeout(() => {
                inputRef.current?.focus()
                inputRef.current?.select()
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

        inputRef.current.select()
        navigator.clipboard.writeText(shareUrl)

        setIsCopying(true)
        setTimeout(() => setIsCopying(false), 1000)
    }

    const shareToSocialMedia = (platform) => {
        const text = `Check out this awesome project: ${project.title}`
        const imageUrl = project.thumbnailUrl
        let url = ''

        switch (platform) {
            case 'X':
                url = `https://X.com/intent/tweet?text=${encodeURIComponent(
                    text
                )}&url=${encodeURIComponent(
                    shareUrl
                )}&media=${encodeURIComponent(imageUrl)}`
                break
            case 'whatsapp':
                url = `https://wa.me/?text=${encodeURIComponent(
                    `${text} ${shareUrl}`
                )}`
                break
            case 'facebook':
                url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    shareUrl
                )}&quote=${encodeURIComponent(
                    text
                )}&picture=${encodeURIComponent(imageUrl)}`
                break
            case 'linkedin':
                url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    shareUrl
                )}&summary=${encodeURIComponent(text)}`
                break
            case 'reddit':
                url = `https://www.reddit.com/submit?url=${encodeURIComponent(
                    shareUrl
                )}&title=${encodeURIComponent(text)}`
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

    return (
        <div className={styles.overlay}>
            <div
                className={styles.popover_container}
                ref={popoverRef}
                onClick={handleContentClick}>
                <div className={styles.popover_header}>
                    <h3>Share this project</h3>
                    <button
                        className={styles.close_button}
                        onClick={handleCloseClick}>
                        <CloseXSvg width='20' height='20' />
                    </button>
                </div>

                <div className={styles.social_icons}>
                    <ButtonComponent
                        className={styles.social_button}
                        onClick={() => shareToSocialMedia('X')}
                        aria-label='Share to X'>
                        <XSvg />
                    </ButtonComponent>
                    <ButtonComponent
                        className={styles.social_button}
                        onClick={() => shareToSocialMedia('facebook')}
                        aria-label='Share to Facebook'>
                        <FacebookSvg />
                    </ButtonComponent>
                    <ButtonComponent
                        className={styles.social_button}
                        onClick={() => shareToSocialMedia('whatsapp')}
                        aria-label='Share to WhatsApp'>
                        <WhatsappSvg />
                    </ButtonComponent>
                    <ButtonComponent
                        className={styles.social_button}
                        onClick={() => shareToSocialMedia('linkedin')}
                        aria-label='Share to LinkedIn'>
                        <LinkedinSvg />
                    </ButtonComponent>
                    <ButtonComponent
                        className={styles.social_button}
                        onClick={() => shareToSocialMedia('reddit')}
                        aria-label='Share to Reddit'>
                        <RedditSvg />
                    </ButtonComponent>
                    <ButtonComponent
                        className={styles.social_button}
                        onClick={() => shareToSocialMedia('telegram')}
                        aria-label='Share to Telegram'>
                        <TelegramSvg />
                    </ButtonComponent>
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
                    <ButtonComponent
                        className={styles.copy_button}
                        onClick={handleCopyLink}>
                        <span className={isCopying ? styles.hidden : ''}>
                            Copy
                        </span>
                        <span
                            className={`${styles.clipboard_icon} ${
                                isCopying ? styles.active : ''
                            }`}>
                            <ClipboardIcon />
                        </span>
                    </ButtonComponent>
                </div>
            </div>
        </div>
    )
}

export default SharePopoverComponent
