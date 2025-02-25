import ButtonComponent from '../../elements/ButtonComponent/ButtonComponent'
import ImageComponent from '../../elements/ImageComponent/ImageComponent'
import styles from './ProjectDetailsPage.module.css'

import MoreProjectsByUser from '@/components/MoreProjectsByUser/MoreProjectsByUser'
import ProjectMetaComponent from '@/components/ProjectMetaComponent/ProjectMetaComponent'
import { toast } from '@/hooks/use-toast'
import useUserContext from '@/hooks/useUserContext'
import EditPenSvg from '@/svg/EditPenSvg/EditPenSvg'
import EyeShowSVG from '@/svg/EyeShowSVG/EyeShowSVG'
import { useRef } from 'react'
import { useLocation } from 'react-router-dom'

function ProjectDetailsPage() {
    const location = useLocation()
    const galleryRef = useRef(null)

    const project = location.state?.project
    const username = project?.authorDetails?.name
    const { userProfile } = useUserContext()
    const slug = project?.slug
    console.log(project)


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

    const handleEditProject = () => {
        navigate(`/edit-project/${slug}`, { state: { project } })
    }

    return (
        <>
            <section className={styles.project_details_container}>
                <header className={styles.header}>
                    <div className={styles.profile_section}>
                        <div>
                            <ImageComponent
                                src={project?.authorDetails.profilePicture}
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
                        {userProfile?.name === username ? (
                            <ButtonComponent
                                className={styles.edit_project_button}
                                onClick={handleEditProject}>
                                <EditPenSvg />
                                <span>Edit Project</span>
                            </ButtonComponent>
                        ) : (
                            <ButtonComponent
                                className={styles.view_profile_button}>
                                    <EyeShowSVG/>
                                View Profile
                            </ButtonComponent>
                        )}
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
