import emailjs from '@emailjs/browser'
import { useCallback, useEffect, useRef, useState } from 'react'
import styles from './FeedbackPage.module.css'

import HappyEmoji from '../../assets/images/emojis/happy.webp'
import MediumEmoji from '../../assets/images/emojis/medium.webp'
import SadEmoji from '../../assets/images/emojis/sad.webp'
import VeryHappyEmoji from '../../assets/images/emojis/very-happy.webp'
import VerySadEmoji from '../../assets/images/emojis/very-sad.webp'

const moods = [
    { id: 'very sad', emoji: VerySadEmoji },
    { id: 'sad', emoji: SadEmoji },
    { id: 'medium', emoji: MediumEmoji },
    { id: 'happy', emoji: HappyEmoji },
    { id: 'very happy', emoji: VeryHappyEmoji },
]

const resetIcons = (buttons) => {
    buttons.forEach((button) => {
        button.style.transform = 'scale(1) translateY(0px)'
    })
}

const focusMood = (index, buttons) => {
    resetIcons(buttons)

    const transformations = [
        { idx: index - 2, scale: 1.05, translateY: 0 },
        { idx: index - 1, scale: 1.15, translateY: -6 },
        { idx: index, scale: 1.25, translateY: -10 },
        { idx: index + 1, scale: 1.15, translateY: -6 },
        { idx: index + 2, scale: 1.05, translateY: 0 },
    ]

    transformations.forEach(({ idx, scale, translateY }) => {
        if (buttons[idx]) {
            buttons[
                idx
            ].style.transform = `scale(${scale}) translateY(${translateY}px)`
        }
    })
}

function FeedbackPage() {
    const [selectedMood, setSelectedMood] = useState('medium')
    const [comment, setComment] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState(null)

    const moodButtonsRef = useRef([])

    const handleMoodHover = useCallback((index) => {
        focusMood(index, moodButtonsRef.current)
    }, [])

    const handleMoodReset = useCallback(() => {
        resetIcons(moodButtonsRef.current)
    }, [])

    useEffect(() => {
        const handleResize = () => {
            const index = moods.findIndex((mood) => mood.id === selectedMood)
            if (window.innerWidth >= 768) {
                focusMood(index, moodButtonsRef.current)
            } else {
                resetIcons(moodButtonsRef.current)
            }
        }

        handleResize()
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [selectedMood])

    const sendFeedback = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus(null)

        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

        try {
            const templateParams = {
                mood: selectedMood,
                feedback: comment.trim() || 'No comment provided',
                timestamp: new Date().toISOString(),
            }

            const response = await emailjs.send(
                serviceId,
                templateId,
                templateParams,
                publicKey
            )

            if (response.status === 200) {
                setSubmitStatus('success')
                setComment('')
                setSelectedMood('medium')
            } else {
                setSubmitStatus('error')
            }
        } catch (error) {
            console.error('Failed to send feedback:', error)
            setSubmitStatus('error')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className={styles.feedback_container}>
            <div className={styles.feedback_modal}>
                <header className={styles.modal_header}>
                    <h2 className={styles.modal_title}>How are you feeling?</h2>
                </header>

                <p className={styles.modal_description}>
                    We&apos;re all ears, ready to catch your feedback and make
                    things better!
                </p>

                <div className={styles.mood_container}>
                    {moods.map((mood, index) => (
                        <button
                            key={mood.id}
                            ref={(el) => (moodButtonsRef.current[index] = el)}
                            className={`${styles.mood_button} ${
                                selectedMood === mood.id
                                    ? styles.mood_button_selected
                                    : ''
                            }`}
                            onClick={() => setSelectedMood(mood.id)}
                            disabled={isSubmitting}
                            onMouseOver={() => handleMoodHover(index)}
                            onFocus={() => handleMoodHover(index)}
                            onMouseLeave={handleMoodReset}
                            onBlur={handleMoodReset}
                            aria-label={`Select mood: ${mood.id}`}>
                            <span className={styles.mood_emoji}>
                                <img
                                    src={mood.emoji}
                                    alt={`${mood.id} emoji`}
                                />
                            </span>
                        </button>
                    ))}
                </div>

                <textarea
                    className={styles.comment_input}
                    placeholder='Add a Comment...'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    disabled={isSubmitting}
                />

                <button
                    className={`${styles.submit_button} ${
                        isSubmitting ? styles.submitting : ''
                    }`}
                    onClick={sendFeedback}
                    disabled={isSubmitting || !comment.trim()}>
                    {isSubmitting ? 'Sending...' : 'Submit Now'}
                </button>

                {submitStatus && (
                    <div
                        className={`${styles.status_message} ${
                            submitStatus === 'success'
                                ? styles.status_success
                                : styles.status_error
                        }`}>
                        {submitStatus === 'success'
                            ? 'Thank you for your feedback!'
                            : 'Failed to send feedback. Please try again.'}
                    </div>
                )}
            </div>
        </div>
    )
}

export default FeedbackPage
