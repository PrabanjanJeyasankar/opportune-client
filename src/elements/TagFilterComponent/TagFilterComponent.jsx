'use client'

import React, { useState, useRef, useEffect } from 'react'
import styles from './TagFilterComponent.module.css'
import ChevronRight from '../../svg/ChervronRight/ChevronRight'
import ChevronLeft from '../../svg/ChevronLeft/ChevronLeft'
import fetchProjectTags from '../../services/fetchProjectTags'

function TagFilterComponent({ selectedTag, setSelectedTag }) {
    const [tags, setTags] = useState([{ tag: 'All' }])
    const [scrollPosition, setScrollPosition] = useState(0)
    const tagsContainerRef = useRef(null)
    const scrollAmount = 200
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(0)

    useEffect(() => {
        fetchProjectTags()
            .then((fetchedTags) => {
                setTags([{ tag: 'All' }, ...fetchedTags])
            })
            .catch((error) => {
                console.error('Error fetching tags:', error)
            })
    }, [])

    const scroll = (direction) => {
        if (tagsContainerRef.current) {
            const container = tagsContainerRef.current
            const targetScroll = container.scrollLeft + direction * scrollAmount
            smoothScroll(container, targetScroll, 300) // 300ms duration for smooth scrolling
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

    useEffect(() => {
        const handleScroll = () => {
            if (tagsContainerRef.current) {
                setScrollPosition(tagsContainerRef.current.scrollLeft)
            }
        }

        const container = tagsContainerRef.current
        if (container) {
            container.addEventListener('scroll', handleScroll)
        }

        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll)
            }
        }
    }, [])

    const handleMouseDown = (e) => {
        setIsDragging(true)
        setStartX(e.pageX - tagsContainerRef.current.offsetLeft)
        setScrollLeft(tagsContainerRef.current.scrollLeft)
    }

    const handleMouseUp = () => {
        setIsDragging(false)
    }

    const handleMouseMove = (e) => {
        if (!isDragging) return
        e.preventDefault()
        const x = e.pageX - tagsContainerRef.current.offsetLeft
        const walk = (x - startX) * 0.5 // Adjust the speed of drag scrolling
        tagsContainerRef.current.scrollLeft = scrollLeft - walk
    }

    const isAtStart = scrollPosition === 0
    const isAtEnd = tagsContainerRef.current
        ? Math.abs(
              tagsContainerRef.current.scrollWidth -
                  (tagsContainerRef.current.scrollLeft +
                      tagsContainerRef.current.clientWidth)
          ) < 1
        : false

    return (
        <div className={styles.tags_container}>
            <button
                className={`${styles.arrow} ${styles['arrow-left']} ${
                    !isAtStart ? styles['arrow-show'] : ''
                }`}
                onClick={() => scroll(-1)}
                aria-label='Scroll left'>
                <ChevronLeft />
            </button>
            <div
                className={styles.tags_filter}
                ref={tagsContainerRef}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onMouseMove={handleMouseMove}>
                {tags.map((tagObj, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedTag(tagObj.tag)}
                        className={`${styles.tag} ${
                            selectedTag === tagObj.tag
                                ? styles.tag_selected
                                : ''
                        } ${tagObj.tag === 'All' ? styles.tag_all : ''}`}>
                        {tagObj.tag}
                    </button>
                ))}
            </div>
            <button
                className={`${styles.arrow} ${styles['arrow-right']} ${
                    !isAtEnd ? styles['arrow-show'] : ''
                }`}
                onClick={() => scroll(1)}
                aria-label='Scroll right'>
                <ChevronRight />
            </button>
        </div>
    )
}

export default TagFilterComponent
