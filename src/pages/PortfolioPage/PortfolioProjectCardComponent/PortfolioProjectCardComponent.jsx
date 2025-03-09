import ButtonComponent from '@/elements/ButtonComponent/ButtonComponent'
import { useNavigate } from 'react-router-dom'
import styles from './PortfolioProjectCardComponent.module.css'

function PortfolioProjectCardComponent({ userProfileData }) {
    const navigate = useNavigate()

    const handleNavigate = (projectData) => {
        const transformedProject = {
            authorDetails: {
                email: userProfileData.email,
                githubId: userProfileData.githubId,
                googleId: userProfileData.googleId,
                name: userProfileData.name,
                profilePicture: userProfileData.profilePicture,
                username: userProfileData.username,
            },
            description: projectData.description,
            documentation: projectData.documentation || null,
            githubLink: projectData.githubLink,
            hostedLink: projectData.hostedLink,
            isUserLiked: projectData.isUserLiked || false,
            problemSolution: projectData.problemSolution,
            problemStatement: projectData.problemStatement,
            slug: projectData.slug,
            tags: projectData.tags || [],
            thumbnailUrl: projectData.thumbnail?.s3Url || '',
            title: projectData.title,
            updatedAt: projectData.updatedAt,
            upvoteCount: projectData.upvoteCount || 0,
            viewsCount: projectData.viewsCount || 0,
        }
        navigate(`/${userProfileData.username}/${projectData.slug}`, {
            state: { project: transformedProject },
        })
    }

    return (
        <div className={styles.projectGrid}>
            {userProfileData.projects.map((project, index) => (
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
                                src={project.thumbnail.s3Url}
                                alt={project.title}
                                className={styles.projectImage}
                            />
                        </div>
                        <ButtonComponent
                            className={styles.button}
                            onClick={() => handleNavigate(project)}>
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
                                        d='M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z'
                                    />
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
                                        d='M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z'
                                    />
                                </svg>
                            </div>
                        </ButtonComponent>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default PortfolioProjectCardComponent
