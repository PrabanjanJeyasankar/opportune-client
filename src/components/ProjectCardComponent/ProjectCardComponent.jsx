import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './ProjectCardComponent.module.css'
import ImageComponent from '../../elements/ImageComponent/ImageComponent'
import ShareIconSvg from '../../svg/ShareIconSvg/ShareIconSvg'
import UpvoteIconSvg from '../../svg/UpvoteIconSvg/UpvoteIconSvg'

const ProjectCardComponent = ({ filteredProjects }) => {
    return (
        <div className={styles.initial_project_whole_container}>
            <div className={styles.project_display_container}>
                {filteredProjects.length > 0 ? (
                    filteredProjects.map((project, index) => (
                        <ProjectCard key={index} project={project} />
                    ))
                ) : (
                    <div className={styles.no_results}>No projects found.</div>
                )}
            </div>
        </div>
    )
}

const ProjectCard = ({ project }) => {
    const [isUpvoted, setIsUpvoted] = useState(false)
    const navigate = useNavigate()
    const handleUpvoteClick = () => {
        setIsUpvoted(!isUpvoted)
    }

    const handleCardClick = () => {
        navigate(`/project-details`, { state: { project } }) 
    }

    return (
        <div
            className={styles.project_card_container}
            onClick={handleCardClick} 
        >
            <div className={styles.project_card_image}>
                <ImageComponent
                    className={styles.image_template}
                    src={project.thumbnailUrl}
                    alt={`Project ${project.projectTitle}`}
                />
            </div>
            <div className={styles.project_card_content}>
                <div className={styles.project_card_title}>{project.title}</div>
                <div className={styles.project_card_tags}>
                    {project.tags.map((tag, tagIndex) => (
                        <span
                            key={tagIndex}
                            className={styles.project_card_tag}>
                            {tag}
                        </span>
                    ))}
                </div>
                <div className={styles.project_card_description}>
                    {project.description}
                </div>
                <div className={styles.project_card_buttons}>
                    <div
                        className={`${styles.upvotes} ${
                            isUpvoted ? styles.upvoted : ''
                        }`}
                        onClick={(e) => {
                            e.stopPropagation() 
                            handleUpvoteClick()
                        }}>
                        <UpvoteIconSvg
                            className={styles.upvote_icon}
                            style={{
                                stroke: isUpvoted ? '#7DFF40' : 'white',
                                fill: isUpvoted ? '#7DFF40' : 'none',
                            }}
                        />
                        <span>
                            {isUpvoted
                                ? project.upvoteCount + 1
                                : project.upvoteCount}
                        </span>
                    </div>
                    <ShareIconSvg className={styles.share_icon} />
                </div>
            </div>
        </div>
    )
}

export default ProjectCardComponent
