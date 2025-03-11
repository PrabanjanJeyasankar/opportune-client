import { Skeleton } from '@/components/ui/skeleton'
import PropTypes from 'prop-types'
import { forwardRef } from 'react'
import ButtonComponent from '../ButtonComponent/ButtonComponent'

const TagsListComponent = forwardRef(function TagsList(
    {
        styles,
        shouldShowSkeletons,
        tags,
        selectedTag,
        setSelectedTag,
        calculateSkeletonCount,
        isError,
        refetch,
        dragHandlers,
    },
    ref
) {
    const handleRetry = () => {
        refetch({ cancelRefetch: true })
    }

    return (
        <div
            className={`${styles.tags_filter} ${
                !shouldShowSkeletons ? styles.loaded : ''
            }`}
            ref={ref}
            onMouseDown={dragHandlers.onMouseDown}
            onMouseUp={dragHandlers.onMouseUp}
            onMouseLeave={dragHandlers.onMouseLeave}
            onMouseMove={dragHandlers.onMouseMove}>
            {shouldShowSkeletons ? (
                <>
                    {Array.from({ length: calculateSkeletonCount() }).map(
                        (_, index) => (
                            <Skeleton
                                key={index}
                                className={`${styles.skeleton_tag}`}
                            />
                        )
                    )}
                    {isError && (
                        <ButtonComponent
                            onClick={handleRetry}
                            className={styles.retry_button}>
                            Retry
                        </ButtonComponent>
                    )}
                </>
            ) : (
                tags.map((tagObj, index) => (
                    <ButtonComponent
                        key={index}
                        onClick={() => setSelectedTag(tagObj.tag)}
                        className={`${styles.tag} ${
                            selectedTag === tagObj.tag
                                ? styles.tag_selected
                                : ''
                        }`}>
                        {tagObj.tag}
                    </ButtonComponent>
                ))
            )}
        </div>
    )
})

TagsListComponent.propTypes = {
    styles: PropTypes.object.isRequired,
    shouldShowSkeletons: PropTypes.bool.isRequired,
    tags: PropTypes.array.isRequired,
    selectedTag: PropTypes.string.isRequired,
    setSelectedTag: PropTypes.func.isRequired,
    calculateSkeletonCount: PropTypes.func.isRequired,
    isError: PropTypes.bool.isRequired,
    refetch: PropTypes.func.isRequired,
    dragHandlers: PropTypes.shape({
        onMouseDown: PropTypes.func.isRequired,
        onMouseUp: PropTypes.func.isRequired,
        onMouseLeave: PropTypes.func.isRequired,
        onMouseMove: PropTypes.func.isRequired,
    }).isRequired,
}

export default TagsListComponent
