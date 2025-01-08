import fetchMoreProjectsByUser from '@/services/fetchMoreProjectsByUser'
import styles from './MoreProjectsByUser.module.css'
import { useState, useEffect, useRef } from 'react'

function MoreProjectsByUser({ username, slug }) {
    const [moreProjectsByUser, setMoreProjectsByUser] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const galleryRef = useRef(null)

    useEffect(() => {
        const galleryDiv = galleryRef.current

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setLoading(true)
                    fetchMoreProjectsByUser(username, slug)
                        .then((data) => {
                            setMoreProjectsByUser(data.data.slice(0, 4))
                        })
                        .catch((error) => setError(error))
                        .finally(() => setLoading(false))

                    observer.disconnect()
                }
            },
            { threshold: 0.1 }
        )

        if (galleryDiv) observer.observe(galleryDiv)

        return () => observer.disconnect()
    }, [username, slug])

    return (
        <div className={styles.more_projects_by_user} ref={galleryRef}>
            <div className={styles.more_projects_header}>
                <h1 className={styles.more_projects_title}>
                    More by {username}
                </h1>
                <p className={styles.view_profile_link}>View Profile</p>
            </div>
            <div className={styles.image_gallery}>
                {moreProjectsByUser.map((image) => (
                    <div key={image.id} className={styles.image_wrapper}>
                        <img
                            src={image.thumbnailUrl}
                            alt={image.alt}
                            className={styles.image}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MoreProjectsByUser
