import useDragScrollForTags from '@/hooks/useDragScrollForTags'
import useScrollHandlerForTags from '@/hooks/useScrollHandlerForTags'
import useTagsQuery from '@/hooks/useTagsQuery'
import PropTypes from 'prop-types'
import { useEffect, useRef } from 'react'
import NavigationArrow from './NavigationArrow'
import styles from './TagFilterComponent.module.css'
import TagsListComponent from './TagListComponent'

function TagFilterComponent({ selectedTag, setSelectedTag }) {
    const tagsContainerRef = useRef(null)
    const scrollAmount = 250

    const { tagsData, isLoading, isError, status, refetch } = useTagsQuery()

    const { smoothScroll } = useScrollHandlerForTags()

    const { handleMouseDown, handleMouseUp, handleMouseMove } =
        useDragScrollForTags(tagsContainerRef)

    useEffect(() => {
        if (
            tagsData.length > 0 &&
            selectedTag !== 'All' &&
            !tagsData.some((tag) => tag.tag === selectedTag)
        ) {
            setSelectedTag('All')
        }
    }, [tagsData, selectedTag, setSelectedTag])

    const shouldShowSkeletons =
        isLoading || isError || status === 'error' || tagsData.length === 0

    const tags = shouldShowSkeletons ? [] : [{ tag: 'All' }, ...tagsData]

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
                direction='left'
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
                setSelectedTag={setSelectedTag}
                calculateSkeletonCount={calculateSkeletonCount}
                isError={isError}
                refetch={refetch}
                dragHandlers={{
                    onMouseDown: handleMouseDown,
                    onMouseUp: handleMouseUp,
                    onMouseLeave: handleMouseUp,
                    onMouseMove: handleMouseMove,
                }}
            />

            <NavigationArrow
                direction='right'
                isHidden={isAtEnd}
                onClick={() => scroll(1)}
                styles={styles}
            />
        </div>
    )
}

TagFilterComponent.propTypes = {
    selectedTag: PropTypes.string.isRequired,
    setSelectedTag: PropTypes.func.isRequired,
}

export default TagFilterComponent
