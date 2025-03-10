import { useEffect, useRef, useState } from 'react'
import styles from './AboutusGalleryComponent.module.css'
import { Skeleton } from '../ui/skeleton'

function AboutusGalleryComponent({ images }) {
    const imagesArray = Object.values(images)
    const galleryRef = useRef(null)
    const columnsRef = useRef([])
    const [loadedImages, setLoadedImages] = useState({})

    useEffect(() => {
        const handleScroll = () => {
            if (!galleryRef.current) return
            const scrollTop =
                window.pageYOffset || document.documentElement.scrollTop
            const rect = galleryRef.current.getBoundingClientRect()
            const galleryTop = rect.top + scrollTop
            const galleryHeight = rect.height

            const scrollProgress = Math.max(
                0,
                Math.min(
                    1,
                    (scrollTop - galleryTop + window.innerHeight) /
                        (galleryHeight + window.innerHeight)
                )
            )

            const screenWidth = window.innerWidth
            const mobileFactor = screenWidth < 768 ? 0.4 : 1

            columnsRef.current.forEach((column, index) => {
                if (!column) return
                const speed = 1 - index * 0.7
                const yMove = -scrollProgress * 150 * speed * mobileFactor
                const unevenMargin = index % 2 === 0 ? index * 40 : index * 20
                column.style.transform = `translateY(${yMove}px)`
                column.style.marginTop = `${unevenMargin}px`
            })
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll()

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const availableCount = imagesArray.length

    const getImageAtIndex = (index) => {
        const actualIndex = index % availableCount
        return imagesArray[actualIndex]
    }

    const handleImageLoad = (index) => {
        setLoadedImages((prev) => ({ ...prev, [index]: true }))
    }

    return (
        <div className={styles.gallery_container}>
            <div className={styles.gallery_grid} ref={galleryRef}>
                <div className={styles.gallery_row}>
                    {[...Array(5)].map((_, colIndex) => (
                        <div
                            key={colIndex}
                            className={styles.gallery_column}
                            ref={(el) => (columnsRef.current[colIndex] = el)}>
                            {[...Array(5)].map((_, rowIndex) => {
                                const imageIndex = colIndex * 5 + rowIndex
                                const image = getImageAtIndex(imageIndex)

                                return (
                                    <div
                                        key={`col${colIndex}-${rowIndex}`}
                                        className={styles.gallery_item}>
                                        {!loadedImages[imageIndex] && (
                                            <Skeleton
                                                className={
                                                    styles.skeleton_project_card_image
                                                }
                                            />
                                        )}
                                        <img
                                            src={image.imageUrl}
                                            alt={
                                                image.title ||
                                                image.description ||
                                                ''
                                            }
                                            className={`${
                                                styles.gallery_image
                                            } ${
                                                loadedImages[imageIndex]
                                                    ? styles.image_loaded
                                                    : ''
                                            }`}
                                            onLoad={() =>
                                                handleImageLoad(imageIndex)
                                            }
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AboutusGalleryComponent
