import React from 'react'
import styles from './ProjectCardComponent.module.css'
import ImageComponent from '../../elements/ImageComponent/ImageComponent'

const ProjectCardComponent = ({ filteredProjects }) => {
    return (
        <div className={styles.initial_project_whole_container}>
            <div className={styles.project_display_container}>
                {filteredProjects.length > 0 ? (
                    filteredProjects.map((project, index) => (
                        <div
                            key={index}
                            className={styles.project_card_container}>
                            <div className={styles.project_card_image}>
                                <ImageComponent
                                    className={styles.image_template}
                                    src={project.src}
                                    alt={`Project ${project.projectTitle}`}
                                />
                            </div>
                            <div className={styles.project_card_content}>
                                <div className={styles.project_card_title}>
                                    {project.projectTitle}
                                </div>
                                <div className={styles.project_card_tags}>
                                    {project.techStackTags.map(
                                        (tag, tagIndex) => (
                                            <span
                                                key={tagIndex}
                                                className={
                                                    styles.project_card_tag
                                                }>
                                                {tag}
                                            </span>
                                        )
                                    )}
                                </div>
                                <div
                                    className={styles.project_card_description}>
                                    {project.description}
                                </div>
                                <div className={styles.project_card_buttons}>
                                    <svg
                                        className={styles.upvote_icon}
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='24'
                                        height='24'
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        stroke='currentColor'
                                        strokeWidth='2'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'>
                                        <path d='M12 4l8 8h-6v8h-4v-8H4l8-8z' />
                                    </svg>
                                    <span>{project.upvotes}</span>
                                    <svg
                                        className={styles.share_icon}
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='24'
                                        height='24'
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        stroke='currentColor'
                                        strokeWidth='2'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'>
                                        <circle cx='18' cy='5' r='3' />
                                        <circle cx='6' cy='12' r='3' />
                                        <circle cx='18' cy='19' r='3' />
                                        <line
                                            x1='8.59'
                                            y1='13.51'
                                            x2='15.42'
                                            y2='17.49'
                                        />
                                        <line
                                            x1='15.41'
                                            y1='6.51'
                                            x2='8.59'
                                            y2='10.49'
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className={styles.no_results}>No projects found.</div>
                )}
            </div>
        </div>
    )
}

export default ProjectCardComponent
