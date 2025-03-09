import { useEffect, useRef } from 'react'
import styles from './AboutusGalleryComponent.module.css'

function AboutusGalleryComponent({ images }) {
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
                const speed = 0.4 - index * 0.05
                const yMove = -scrollProgress * 100 * speed

                const unevenMargin = index % 2 === 0 ? index * 20 : index * -15
                column.style.transform = `translateY(${yMove}px)`
                column.style.marginTop = `${unevenMargin}px`
            })
        }

        window.addEventListener('scroll', handleScroll)
        handleScroll()

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className={styles.gallery_container}>
            <div className={styles.gallery_grid} ref={galleryRef}>
                <div className={styles.gallery_row}>
                    <div
                        className={styles.gallery_column}
                        ref={(el) => (columnsRef.current[0] = el)}>
                        {images.slice(0, 5).map((image, index) => (
                            <div
                                key={`col1-${index}`}
                                className={styles.gallery_item}>
                                <img
                                    src={image.src}
                                    alt={image.alt || ''}
                                    className={styles.gallery_image}
                                />
                            </div>
                        ))}
                    </div>
                    <div
                        className={styles.gallery_column}
                        ref={(el) => (columnsRef.current[1] = el)}>
                        {images.slice(5, 10).map((image, index) => (
                            <div
                                key={`col2-${index}`}
                                className={styles.gallery_item}>
                                <img
                                    src={image.src}
                                    alt={image.alt || ''}
                                    className={styles.gallery_image}
                                />
                            </div>
                        ))}
                    </div>
                    <div
                        className={styles.gallery_column}
                        ref={(el) => (columnsRef.current[2] = el)}>
                        {images.slice(10, 15).map((image, index) => (
                            <div
                                key={`col3-${index}`}
                                className={styles.gallery_item}>
                                <img
                                    src={image.src}
                                    alt={image.alt || ''}
                                    className={styles.gallery_image}
                                />
                            </div>
                        ))}
                    </div>
                    <div
                        className={styles.gallery_column}
                        ref={(el) => (columnsRef.current[3] = el)}>
                        {images.slice(15, 20).map((image, index) => (
                            <div
                                key={`col4-${index}`}
                                className={styles.gallery_item}>
                                <img
                                    src={image.src}
                                    alt={image.alt || ''}
                                    className={styles.gallery_image}
                                />
                            </div>
                        ))}
                    </div>
                    <div
                        className={styles.gallery_column}
                        ref={(el) => (columnsRef.current[4] = el)}>
                        {images.slice(20, 25).map((image, index) => (
                            <div
                                key={`col5-${index}`}
                                className={styles.gallery_item}>
                                <img
                                    src={image.src}
                                    alt={image.alt || ''}
                                    className={styles.gallery_image}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutusGalleryComponent
