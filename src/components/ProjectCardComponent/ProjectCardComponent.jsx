import PropTypes from 'prop-types'
import SkeletonCardComponent from '../SupportingComponents/SkeletonCardComponent/SkeletonCardComponent'
import styles from './ProjectCardComponent.module.css'
import ProjectCard from './ProjectCardSupportingComponents/ProjectCard'
import ProjectCardEmptyState from './ProjectCardSupportingComponents/ProjectCardEmptyState'

function ProjectCardComponent({ filteredProjects, isLoading, searchTerm }) {
    if (isLoading) {
        return (
            <div className={styles.initial_project_whole_container}>
                <div className={styles.project_display_container}>
                    {Array.from({ length: 15 }).map((_, index) => (
                        <SkeletonCardComponent key={index} />
                    ))}
                </div>
            </div>
        )
    }
    

    return (
        <div className={styles.initial_project_whole_container}>
            {filteredProjects.length > 0 ? (
                <div className={styles.project_display_container}>
                    {filteredProjects.map((project, index) => (
                        <ProjectCard
                            key={`${project.slug}-${index}`}
                            project={project}
                        />
                    ))}
                </div>
            ) : (
                <ProjectCardEmptyState searchTerm={searchTerm} />
            )}
        </div>
    )
}

ProjectCardComponent.propTypes = {
    filteredProjects: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    searchTerm: PropTypes.string,
}

export default ProjectCardComponent
