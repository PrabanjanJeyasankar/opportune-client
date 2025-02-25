import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ButtonComponent from '../../elements/ButtonComponent/ButtonComponent'
import ImageComponent from '../../elements/ImageComponent/ImageComponent'
import styles from './ProjectDetailsPage.module.css'

import MoreProjectsByUser from '@/components/MoreProjectsByUser/MoreProjectsByUser'
import ProjectMetaComponent from '@/components/ProjectMetaComponent/ProjectMetaComponent'
import { toast } from '@/hooks/use-toast'
import useUserContext from '@/hooks/useUserContext'
import EditPenSvg from '@/svg/EditPenSvg/EditPenSvg'
import EyeShowSVG from '@/svg/EyeShowSVG/EyeShowSVG'

function ProjectDetailsPage() {
    const location = useLocation()
    const navigate = useNavigate()

    const initialProject = location.state?.project
    const [currentProject, setCurrentProject] = useState(initialProject)
    const [componentKey, setComponentKey] = useState(Date.now())

    useEffect(() => {
        if (currentProject) {
            setComponentKey(Date.now())
        }
    }, [currentProject?.slug])

    const username = currentProject?.authorDetails?.name
    const { userProfile } = useUserContext()
    const slug = currentProject?.slug

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

    const handleProjectSelect = (project) => {
        if (project.slug === slug) return

        setCurrentProject(null)

        setTimeout(() => {
            setCurrentProject(project)

            navigate(`/${project.authorDetails.name}/${project.slug}`, {
                state: { project },
                replace: true,
            })
        }, 10)
    }

    const handleEditProject = () => {
        navigate(`/edit-project/${slug}`, {
            state: { project: currentProject },
        })
    }

    const handleViewProfile = () => {
        navigate(`/${username}`)
    }

    if (!currentProject) {
        return <div className={styles.loading}>Loading project details...</div>
    }

    return (
        <div key={componentKey}>
            <section className={styles.project_details_container}>
                <header className={styles.header}>
                    <div className={styles.profile_section}>
                        <div>
                            <ImageComponent
                                src={
                                    currentProject?.authorDetails.profilePicture
                                }
                                alt='Profile'
                                className={styles.avatar}
                            />
                        </div>
                        <div className={styles.info}>
                            <span className={styles.user_name}>
                                {currentProject?.authorDetails.name}
                            </span>
                            <span className={styles.status}>
                                Available for work
                            </span>
                        </div>
                    </div>
                    <div className={styles.user_profile_actions}>
                        {userProfile?.name === username ? (
                            <ButtonComponent
                                onClick={handleEditProject}
                                className={styles.edit_project_button}>
                                <EditPenSvg />
                                <span>Edit Project</span>
                            </ButtonComponent>
                        ) : (
                            <ButtonComponent
                                onClick={handleViewProfile}
                                className={styles.view_profile_button}>
                                <EyeShowSVG />
                                View Profile
                            </ButtonComponent>
                        )}
                    </div>
                </header>

                <ProjectMetaComponent
                    project={currentProject}
                    handleClick={handleClick}
                />

                <div className={styles.separator}></div>

                {currentProject && (
                    <div className={styles.more_projects_container}>
                        <MoreProjectsByUser
                            key={`more-projects-${currentProject.slug}-${componentKey}`}
                            username={username}
                            slug={slug}
                            onProjectSelect={handleProjectSelect}
                        />
                    </div>
                )}
            </section>
        </div>
    )
}

export default ProjectDetailsPage
