import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useDragScrollForTags from '@/hooks/useDragScrollForTags'
import useScrollHandlerForTags from '@/hooks/useScrollHandlerForTags'
import NavigationArrow from './NavigationArrow'
import styles from './TagFilterComponent.module.css'
import TagsListComponent from './TagListComponent'
import {
    selectSelectedTag,
    selectTags,
    selectTagsError,
    selectTagsLoading,
} from '@/app/features/tags/tagsSelectors'
import { fetchTags, handleTagSelection } from '@/app/features/tags/tagsThunks'

function TagFilterComponent() {
    const tagsContainerRef = useRef(null)
    const scrollAmount = 250

    const dispatch = useDispatch()
    const tagsData = useSelector(selectTags)
    const isLoading = useSelector(selectTagsLoading)
    const isError = useSelector(selectTagsError)
    const selectedTag = useSelector(selectSelectedTag)

    const { smoothScroll } = useScrollHandlerForTags()

    const { handleMouseDown, handleMouseUp, handleMouseMove } =
        useDragScrollForTags(tagsContainerRef)

    useEffect(() => {
        dispatch(fetchTags())
    }, [dispatch])

    const handleTagClick = (tag) => {
        dispatch(handleTagSelection(tag))
    }

    const shouldShowSkeletons = isLoading || isError || tagsData.length === 0

    const tags = shouldShowSkeletons ? [] : tagsData

    const scroll = (direction) => {
        if (tagsContainerRef.current) {
            const container = tagsContainerRef.current
            const targetScroll = container.scrollLeft + direction * scrollAmount
            smoothScroll(container, targetScroll, 300)
        }
    }

    const isAtStart = tagsContainerRef.current
        ? tagsContainerRef.current.scrollLeft === 0
        : true

    const isAtEnd = tagsContainerRef.current
        ? Math.abs(
              tagsContainerRef.current.scrollWidth -
                  (tagsContainerRef.current.scrollLeft +
                      tagsContainerRef.current.clientWidth)
          ) < 1
        : false

    const calculateSkeletonCount = () => {
        if (!tagsContainerRef.current) return 40

        const containerWidth = tagsContainerRef.current.clientWidth
        const skeletonsPerRow = Math.ceil(containerWidth / 100) * 3
        return skeletonsPerRow
    }

    return (
        <div className={styles.tags_container}>
            <NavigationArrow
                direction="left"
                isHidden={isAtStart}
                onClick={() => scroll(-1)}
                styles={styles}
            />

            <TagsListComponent
                ref={tagsContainerRef}
                styles={styles}
                shouldShowSkeletons={shouldShowSkeletons}
                tags={tags}
                selectedTag={selectedTag}
                setSelectedTag={handleTagClick}
                calculateSkeletonCount={calculateSkeletonCount}
                isError={isError}
                dragHandlers={{
                    onMouseDown: handleMouseDown,
                    onMouseUp: handleMouseUp,
                    onMouseLeave: handleMouseUp,
                    onMouseMove: handleMouseMove,
                }}
            />

            <NavigationArrow
                direction="right"
                isHidden={isAtEnd}
                onClick={() => scroll(1)}
                styles={styles}
            />
        </div>
    )
}

export default TagFilterComponent
