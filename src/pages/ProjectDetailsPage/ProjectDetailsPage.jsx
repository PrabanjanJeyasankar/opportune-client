import styles from './ProjectDetailsPage.module.css'
import UserImage from '../../assets/images/ProjectTemplates/img2.png'
import ButtonComponent from '../../elements/ButtonComponent/ButtonComponent'
import ImageComponent from '../../elements/ImageComponent/ImageComponent'

import { useLocation } from 'react-router-dom'
import { toast } from '@/hooks/use-toast'
import { useRef } from 'react'
import MoreProjectsByUser from '@/components/MoreProjectsByUser/MoreProjectsByUser'
import ProjectMetaComponent from '@/components/ProjectMetaComponent/ProjectMetaComponent'

function ProjectDetailsPage() {
    const location = useLocation()
    const project = location.state?.project
    const galleryRef = useRef(null)

    const username = project?.authorDetails?.name
    const slug = project?.slug

    const handleClick = () => {
        navigator.clipboard
            .writeText(window.location.href)
            .then(() =>
                toast({
                    description: 'Link Copied to Clipboard',
                })
            )
            .catch((error) => console.error('Error copying link: ', error))
    }

    return (
        <>
            <section className={styles.project_details_container}>
                <header className={styles.header}>
                    <div className={styles.profile_section}>
                        <div>
                            <ImageComponent
                                src={UserImage}
                                alt='Profile'
                                className={styles.avatar}
                            />
                        </div>
                        <div className={styles.info}>
                            <span className={styles.user_name}>
                                {project?.authorDetails.name}
                            </span>
                            <span className={styles.status}>
                                Available for work
                            </span>
                        </div>
                    </div>
                    <div className={styles.user_profile_actions}>
                        <ButtonComponent className={styles.view_profile_button}>
                            View Profile
                        </ButtonComponent>
                    </div>
                </header>
                <ProjectMetaComponent
                    project={project}
                    handleClick={handleClick}
                />

                <div className={styles.separator}></div>
                <div className={styles.more_projects_by_user} ref={galleryRef}>
                    <MoreProjectsByUser username={username} slug={slug} />
                </div>
            </section>
        </>
    )
}

export default ProjectDetailsPage
