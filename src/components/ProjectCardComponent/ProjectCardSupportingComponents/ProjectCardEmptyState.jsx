import PropTypes from 'prop-types'
import { Suspense, lazy } from 'react'
import styles from '../ProjectCardComponent.module.css'

const FloatingAstronautAnimation = lazy(() =>
    import('@/loaders/FloatingAstronautAnimation/FloatingAstronautAnimation')
)

function ProjectCardEmptyState({ searchTerm }) {
    return (
        <div className={styles.no_results}>
            <Suspense
                fallback={
                    <div className={styles.loader_placeholder}>Loading...</div>
                }>
                <FloatingAstronautAnimation />
            </Suspense>
            <p className={styles.no_tag_result_text}>
                {searchTerm
                    ? `Sorry, no projects fit '${searchTerm}'. Maybe try another search?`
                    : 'This tag is feeling lonely! Be the first to add a project.'}
            </p>
        </div>
    )
}

ProjectCardEmptyState.propTypes = {
    searchTerm: PropTypes.string,
}

export default ProjectCardEmptyState
