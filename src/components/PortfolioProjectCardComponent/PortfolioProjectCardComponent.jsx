import React from 'react'
import data from '../../data/portfolioData'
import styles from './PortfolioProjectCardComponent.module.css'

function PortfolioProjectCardComponent() {
    const { projects = [] } = data[0] || {}

    return (
        <div className={styles.projectGrid}>
            {projects.map((project, index) => (
                <div key={index} className={styles.cardWrapper}>
                    <div className={styles.projectContainer}>
                        <div className={styles.projectInfo}>
                            <div
                                className={
                                    styles.titleAndShortDescriptionContainer
                                }>
                                <h2 className={styles.projectTitle}>
                                    {project.title}
                                </h2>
                                <p className={styles.projectShortDescription}>
                                    {project.shortDescription}
                                </p>
                            </div>
                            <div className={styles.projectLongDescription}>
                                {project.longDescription}
                            </div>
                        </div>
                        <div className={styles.projectImageContainer}>
                            <img
                                src={project.image}
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
