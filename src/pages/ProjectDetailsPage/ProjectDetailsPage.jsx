import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ButtonComponent from "../../elements/ButtonComponent/ButtonComponent";
import ImageComponent from "../../elements/ImageComponent/ImageComponent";
import styles from "./ProjectDetailsPage.module.css";

import MoreProjectsByUser from "@/components/MoreProjectsByUser/MoreProjectsByUser";
import ProjectMetaComponent from "@/components/ProjectMetaComponent/ProjectMetaComponent";
import MetaTagsComponent from "@/components/SupportingComponents/MetaTagsComponent/MetaTagsComponent";
import useUserContext from "@/hooks/useUserContext";
import projectService from "@/services/projectService";
import EditPenSvg from "@/svg/EditPenSvg/EditPenSvg";
import EyeShowSVG from "@/svg/EyeShowSVG/EyeShowSVG";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3,
            delayChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

function ProjectDetailsPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();

    const initialProject = location.state?.project;
    const [currentProject, setCurrentProject] = useState(initialProject);

    const { userProfile } = useUserContext();

    useEffect(() => {
        if (!initialProject && params.username && params.projectSlug) {
            projectService
                .retrieveProjectBySlug(params.username, params.projectSlug)
                .then((response) => {
                    setCurrentProject(response.data.data);
                })
                .catch((error) => {
                    console.error("Error fetching project data:", error);
                });
        }
    }, [initialProject, params.username, params.projectSlug]);

    const handleEditProject = () => {
        navigate(`/edit-project/${currentProject.slug}`, {
            state: { project: currentProject },
        });
    };

    const handleViewProfile = () => {
        navigate(`/portfolio/${currentProject?.authorDetails?.name}`);
    };

    if (!currentProject) {
        return <div className={styles.error}>Project not found</div>;
    }

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <MetaTagsComponent
                title={`${currentProject.title} by ${currentProject.authorDetails.name} | MyPlatform`}
                description={
                    currentProject.description ||
                    "Check out this amazing project!"
                }
                image={currentProject.thumbnailUrl}
                url={window.location.href}
            />
            <section className={styles.project_details_container}>
                <motion.div variants={itemVariants}>
                    <header className={styles.header}>
                        <div
                            className={styles.profile_section}
                            onClick={handleViewProfile}
                        >
                            <ImageComponent
                                src={
                                    currentProject?.authorDetails.profilePicture
                                }
                                alt="Profile"
                                className={styles.avatar}
                            />
                            <div className={styles.info}>
                                <span className={styles.user_name}>
                                    {currentProject?.authorDetails.name}
                                </span>
                                <span className={styles.professional_title}>
                                    Professional title
                                </span>
                            </div>
                        </div>

                        <div className={styles.user_profile_actions}>
                            {userProfile?.name ===
                            currentProject?.authorDetails.name ? (
                                <ButtonComponent
                                    onClick={handleEditProject}
                                    className={styles.edit_project_button}
                                >
                                    <EditPenSvg />
                                    <span className={styles.edit_button_text}>
                                        Edit Project
                                    </span>
                                </ButtonComponent>
                            ) : (
                                <ButtonComponent
                                    onClick={handleViewProfile}
                                    className={styles.view_profile_button}
                                >
                                    <EyeShowSVG />
                                    View Profile
                                </ButtonComponent>
                            )}
                        </div>
                    </header>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <ProjectMetaComponent project={currentProject} />
                </motion.div>

                <motion.div variants={itemVariants}>
                    <div className={styles.separator}></div>
                    {currentProject && (
                        <div className={styles.more_projects_container}>
                            <MoreProjectsByUser
                                key={`more-projects-${currentProject.slug}`}
                                username={currentProject?.authorDetails.name}
                                slug={currentProject?.slug}
                                onProjectSelect={() => {}}
                            />
                        </div>
                    )}
                </motion.div>
            </section>
        </motion.div>
    );
}

export default ProjectDetailsPage;
