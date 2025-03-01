import ImageComponent from '@/elements/ImageComponent/ImageComponent'
import fetchMoreProjectsByUser from '@/services/fetchMoreProjectsByUser'
import { useEffect, useState } from 'react'
import styles from './MoreProjectsByUser.module.css'
import { Link } from 'react-router-dom'

function MoreProjectsByUser({ username, slug, onProjectSelect }) {
    const [moreProjectsByUser, setMoreProjectsByUser] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [projectKey, setProjectKey] = useState(`${username}-${slug}`)

    useEffect(() => {
        setProjectKey(`${username}-${slug}-${Date.now()}`)

        setMoreProjectsByUser([])
        setLoading(true)
        setError(null)

        if (username && slug) {
            fetchMoreProjectsByUser(username, slug)
                .then((data) => {
                    if (data.data && data.data[0]?.projects) {
                        setMoreProjectsByUser(data.data[0].projects.slice(0, 4))
                    } else {
                        setMoreProjectsByUser([])
                    }
                })
                .catch((error) => {
                    console.error('Error fetching projects:', error)
                    setError(error)
                })
                .finally(() => setLoading(false))
        }
    }, [username, slug])

    const handleProjectClick = (project) => {
        if (onProjectSelect && project.slug !== slug) {
            onProjectSelect(project)
        }
    }

    if (loading) {
        return <div>Loading more projects...</div>
    }

    if (error) {
        return <div>Error loading projects</div>
    }

    return (
        <div className={styles.more_projects_by_user} key={projectKey}>
            <div className={styles.more_projects_header}>
                <h1 className={styles.more_projects_title}>
                    <span>More by</span>
                    <Link to={`/portfolio/${username}`} className={styles.more_project_username}>
                        {username}
                    </Link>
                </h1>
                {/* <p className={styles.view_profile_link}>View Profile</p> */}
            </div>

            {moreProjectsByUser && moreProjectsByUser.length > 0 ? (
                <div className={styles.image_gallery}>
                    {moreProjectsByUser.map((project, index) => (
                        <div
                            key={`${
                                project.id || project.slug
                            }-${index}-${projectKey}`}
                            onClick={() => handleProjectClick(project)}
                            className={styles.image_wrapper}>
                            <ImageComponent
                                src={project.thumbnailUrl}
                                alt={project.title || 'Project thumbnail'}
                                className={styles.image}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className={styles.no_projects_message}>
                    Still cooking up ideas! &#127859;
                </div>
            )}
        </div>
    )
}

export default MoreProjectsByUser
