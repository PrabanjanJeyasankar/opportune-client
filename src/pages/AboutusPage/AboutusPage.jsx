import AboutusGalleryComponent from '@/components/AboutusGalleryComponent/AboutusGalleryComponent'
import { useEffect } from 'react'
import styles from './AboutusPage.module.css'

function AboutusPage() {
    const galleryImages = [
        {
            src: 'https://www.cssdesignawards.com/cdasites/2025/202502/20250221135817.jpg',
            alt: 'Design concept',
        },
        {
            src: 'https://www.cssdesignawards.com/cdasites/2025/202502/20250301010135.jpg',
            alt: 'Code snippet',
        },
        {
            src: 'https://www.cssdesignawards.com/cdasites/2025/202502/20250222000149.jpg',
            alt: 'Project thumbnail',
        },
        {
            src: 'https://www.cssdesignawards.com/cdasites/2025/202502/20250221004941.jpg',
            alt: 'Team member',
        },
        {
            src: 'https://www.cssdesignawards.com/cdasites/2025/202502/20250214132012.jpg',
            alt: 'Design mockup',
        },
        {
            src: 'https://www.cssdesignawards.com/cdasites/2025/202502/20250221135817.jpg',
            alt: 'Design concept',
        },
        {
            src: 'https://www.cssdesignawards.com/cdasites/2025/202502/20250301010135.jpg',
            alt: 'Code snippet',
        },
        {
            src: 'https://www.cssdesignawards.com/cdasites/2025/202502/20250222000149.jpg',
            alt: 'Project thumbnail',
        },
        {
            src: 'https://www.cssdesignawards.com/cdasites/2025/202502/20250221004941.jpg',
            alt: 'Team member',
        },
        {
            src: 'https://www.cssdesignawards.com/cdasites/2025/202502/20250214132012.jpg',
            alt: 'Design mockup',
        },
    ]

    const extendedImages = []
    for (let i = 0; i < 10; i++) {
        extendedImages.push(...galleryImages)
    }

    useEffect(() => {
        document.body.classList.add(styles.scroll_active)

        return () => {
            document.body.classList.remove(styles.scroll_active)
        }
    }, [])
    return (
        <div className={styles.aboutus_container}>
            <h1 className={styles.main_heading}>
                The platform we wish we had, so we built it for you
            </h1>

            <div className={styles.section_text}>
                We built Opportune to help freshers showcase their skills beyond
                just a resume because we believe a project reflects true ability
                better than a CGPA. Let&apos;s be honest—numbers on a transcript
                don&apos;t tell the whole story. That&apos;s why Opportune
                shifts the focus to what truly matters:{' '}
                <span className={styles.section_text_bold}>
                    the work you&apos;ve done, the ideas you&apos;ve built, and
                    the skills you bring to the table.
                </span>
                <p>
                    Whether you&apos;re a student stepping beyond grades or a
                    professional showcasing expertise, we connect you directly
                    with hiring managers, startup founders, and team leaders who
                    care about results. It&apos;s time to let your projects do
                    the talking.
                </p>
            </div>

            <section className='gallery-section'>
                <AboutusGalleryComponent images={extendedImages.slice(0, 50)} />
            </section>
        </div>
    )
}

export default AboutusPage
