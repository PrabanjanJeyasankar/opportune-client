import { Skeleton } from '@/components/ui/skeleton'
import { useQuery } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import { useRef, useState } from 'react'
import fetchProjectTags from '../../services/fetchProjectTags'
import ChevronRight from '../../svg/ChervronRight/ChevronRight'
import ChevronLeft from '../../svg/ChevronLeft/ChevronLeft'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import styles from './TagFilterComponent.module.css'

function TagFilterComponent({ selectedTag, setSelectedTag }) {
    const tagsContainerRef = useRef(null)
    const scrollAmount = 200
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(0)

    const { data: tagsData = [], isLoading } = useQuery({
        queryKey: ['projectTags'],
        queryFn: fetchProjectTags,
        staleTime: 3 * 60 * 1000,
    })

    const tags = [{ tag: 'All' }, ...tagsData]

    const scroll = (direction) => {
        if (tagsContainerRef.current) {
            const container = tagsContainerRef.current
            const targetScroll = container.scrollLeft + direction * scrollAmount
            smoothScroll(container, targetScroll, 300)
        }
    }

    const smoothScroll = (element, target, duration) => {
        const start = element.scrollLeft
        const change = target - start
        const startTime = performance.now()

        const animateScroll = (currentTime) => {
            const elapsedTime = currentTime - startTime
            if (elapsedTime < duration) {
                element.scrollLeft = easeInOutQuad(
                    elapsedTime,
                    start,
                    change,
                    duration
                )
                requestAnimationFrame(animateScroll)
            } else {
                element.scrollLeft = target
            }
        }

        requestAnimationFrame(animateScroll)
    }

    const easeInOutQuad = (t, b, c, d) => {
        t /= d / 2
        if (t < 1) return (c / 2) * t * t + b
        t--
        return (-c / 2) * (t * (t - 2) - 1) + b
    }

    const handleMouseDown = (e) => {
        if (!tagsContainerRef.current) return
        setIsDragging(true)
        setStartX(e.pageX - tagsContainerRef.current.offsetLeft)
        setScrollLeft(tagsContainerRef.current.scrollLeft)
    }

    const handleMouseUp = () => {
        setIsDragging(false)
    }

    const handleMouseMove = (e) => {
        if (!isDragging || !tagsContainerRef.current) return
        e.preventDefault()
        const x = e.pageX - tagsContainerRef.current.offsetLeft
        const walk = (x - startX) * 0.5
        tagsContainerRef.current.scrollLeft = scrollLeft - walk
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

    return (
        <div className={styles.tags_container}>
            <ButtonComponent
                className={`${styles.arrow} ${styles['arrow-left']} ${
                    !isAtStart ? styles['arrow-show'] : ''
                }`}
                onClick={() => scroll(-1)}
                aria-label='Scroll left'>
                <ChevronLeft />
            </ButtonComponent>
            <div
                className={`${styles.tags_filter} ${
                    !isLoading ? styles.loaded : ''
                }`}
                ref={tagsContainerRef}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onMouseMove={handleMouseMove}>
                {isLoading
                    ? Array.from({ length: 40 }).map((_, index) => (
                          <Skeleton
                              key={index}
                              className={`${styles.skeleton_tag}`}
                          />
                      ))
                    : tags.map((tagObj, index) => (
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
                      ))}
            </div>
            <ButtonComponent
                className={`${styles.arrow} ${styles['arrow-right']} ${
                    !isAtEnd ? styles['arrow-show'] : ''
                }`}
                onClick={() => scroll(1)}
                aria-label='Scroll right'>
                <ChevronRight />
            </ButtonComponent>
        </div>
    )
}

TagFilterComponent.propTypes = {
    selectedTag: PropTypes.string.isRequired,
    setSelectedTag: PropTypes.func.isRequired,
}

export default TagFilterComponent
