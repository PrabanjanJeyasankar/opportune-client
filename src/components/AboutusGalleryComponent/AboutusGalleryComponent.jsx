import { useEffect, useRef } from 'react'
import styles from './AboutusGalleryComponent.module.css'

function AboutusGalleryComponent({ images }) {
    const imagesArray = Object.values(images)
    const galleryRef = useRef(null)
    const columnsRef = useRef([])

    useEffect(() => {
        const handleScroll = () => {
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

            columnsRef.current.forEach((column, index) => {
                if (!column) return
                const speed = 1 - index * 1
                const yMove = -scrollProgress * 150 * speed

                const unevenMargin = index % 2 === 0 ? index * 40 : index * 20
                column.style.transform = `translateY(${yMove}px)`
                column.style.marginTop = `${unevenMargin}px`
            })
        }

        window.addEventListener('scroll', handleScroll)
        handleScroll()

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const availableCount = imagesArray.length

    const getImageAtIndex = (index) => {
        const actualIndex = index % availableCount
        return imagesArray[actualIndex]
    }

    return (
        <div className={styles.gallery_container}>
            <div className={styles.gallery_grid} ref={galleryRef}>
                <div className={styles.gallery_row}>
                    <div
                        className={styles.gallery_column}
                        ref={(el) => (columnsRef.current[0] = el)}>
                        {[0, 1, 2, 3, 4].map((offset) => {
                            const image = getImageAtIndex(offset)
                            return (
                                <div
                                    key={`col1-${offset}`}
                                    className={styles.gallery_item}>
                                    <img
                                        src={image.imageUrl}
                                        alt={
                                            image.title ||
                                            image.description ||
                                            ''
                                        }
                                        className={styles.gallery_image}
                                    />
                                </div>
                            )
                        })}
                    </div>
                    <div
                        className={styles.gallery_column}
                        ref={(el) => (columnsRef.current[1] = el)}>
                        {[5, 6, 7, 8, 9].map((offset) => {
                            const image = getImageAtIndex(offset)
                            return (
                                <div
                                    key={`col2-${offset}`}
                                    className={styles.gallery_item}>
                                    <img
                                        src={image.imageUrl}
                                        alt={
                                            image.title ||
                                            image.description ||
                                            ''
                                        }
                                        className={styles.gallery_image}
                                    />
                                </div>
                            )
                        })}
                    </div>
                    <div
                        className={styles.gallery_column}
                        ref={(el) => (columnsRef.current[2] = el)}>
                        {[10, 11, 12, 13, 14].map((offset) => {
                            const image = getImageAtIndex(offset)
                            return (
                                <div
                                    key={`col3-${offset}`}
                                    className={styles.gallery_item}>
                                    <img
                                        src={image.imageUrl}
                                        alt={
                                            image.title ||
                                            image.description ||
                                            ''
                                        }
                                        className={styles.gallery_image}
                                    />
                                </div>
                            )
                        })}
                    </div>
                    <div
                        className={styles.gallery_column}
                        ref={(el) => (columnsRef.current[3] = el)}>
                        {[15, 16, 17, 18, 19].map((offset) => {
                            const image = getImageAtIndex(offset)
                            return (
                                <div
                                    key={`col4-${offset}`}
                                    className={styles.gallery_item}>
                                    <img
                                        src={image.imageUrl}
                                        alt={
                                            image.title ||
                                            image.description ||
                                            ''
                                        }
                                        className={styles.gallery_image}
                                    />
                                </div>
                            )
                        })}
                    </div>
                    <div
                        className={styles.gallery_column}
                        ref={(el) => (columnsRef.current[4] = el)}>
                        {[20, 21, 22, 23, 24].map((offset) => {
                            const image = getImageAtIndex(offset)
                            return (
                                <div
                                    key={`col5-${offset}`}
                                    className={styles.gallery_item}>
                                    <img
                                        src={image.imageUrl}
                                        alt={
                                            image.title ||
                                            image.description ||
                                            ''
                                        }
                                        className={styles.gallery_image}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutusGalleryComponent
