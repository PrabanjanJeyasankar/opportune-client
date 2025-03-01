import { toast } from '@/hooks/use-toast'
import InfiniteLoadingAnimation from '@/loaders/InfiniteLoadingAnimation/InfiniteLoadingAnimation'
import projectService from '@/services/projectService'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './PortfolioProjectCardComponent.module.css'

function PortfolioProjectCardComponent({ username }) {
    const navigate = useNavigate()
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        projectService
            .retrieveAllProjectByUsername(username)
            .then((response) => {
                setProjects(response.data.data || [])
            })
            .catch((error) => {
                if (error.response?.status === 401) {
                    toast({
                        description: 'Unauthorized! Redirecting to login.',
                    })
                    navigate('/login', { replace: true })
                } else {
                    setError('Failed to load projects.')
                    console.error('Error fetching projects:', error)
                }
            })
            .finally(() => setLoading(false))
    }, [username, navigate])

    if (loading) {
        return (
            <div className={styles.loading_animation}>
                <InfiniteLoadingAnimation />
            </div>
        )
    }

    if (error) {
        return <div className={styles.error_message}>{error}</div>
    }

    if (!projects.length) {
        return <div className={styles.error_message}>No projects found</div>
    }

    return (
        <div className={styles.projectGrid}>
            {projects.map((project, index) => (
                <div
                    key={project._id || `project-${index}`}
                    className={styles.cardWrapper}>
                    <div className={styles.projectContainer}>
                        <div className={styles.projectInfo}>
                            <h2 className={styles.projectTitle}>
                                {project.title}
                            </h2>
                            <p className={styles.projectDescription}>
                                {project.description}
                            </p>
                        </div>
                        <div className={styles.projectImageContainer}>
                            <img
                                src={
                                    project.thumbnailUrl || '/default-image.jpg'
                                }
                                alt={project.title}
                                className={styles.projectImage}
                            />
                        </div>
                        <button className={styles.button}>
                            <div className={styles.buttonCircle}>
                                <svg
                                    width='14'
                                    className={styles.buttonIcon}
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 14 15'>
                                    <path
                                        fill='currentColor'
                                        strokeWidth='0.5'
                                        d='M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z'></path>
                                </svg>
                                <svg
                                    width='14'
                                    className={`${styles.buttonIcon} ${styles.buttonIconCopy}`}
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 14 15'>
                                    <path
                                        fill='currentColor'
                                        strokeWidth='0.5'
                                        d='M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z'></path>
                                </svg>
                            </div>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default PortfolioProjectCardComponent
