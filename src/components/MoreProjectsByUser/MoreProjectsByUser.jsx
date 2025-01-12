import ImageComponent from '@/elements/ImageComponent/ImageComponent'
import fetchMoreProjectsByUser from '@/services/fetchMoreProjectsByUser'
import { useEffect, useRef, useState } from 'react'
import styles from './MoreProjectsByUser.module.css'

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
                            setMoreProjectsByUser(data.data[0].projects.slice(0,4))
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
                {moreProjectsByUser && moreProjectsByUser.length > 0 ? (
                    <div className={styles.image_gallery}>
                        {moreProjectsByUser.map((image, index) => (
                            <div
                                key={image.id || `${username}-${slug}-${index}`}
                                className={styles.image_wrapper}>
                                <ImageComponent
                                    src={image.thumbnailUrl}
                                    alt={image.alt}
                                    className={styles.image}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No more projects by user</p>
                )}
            </div>
        </div>
    )
}

export default MoreProjectsByUser
