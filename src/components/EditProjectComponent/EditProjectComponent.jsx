import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import projectService from "@/services/projectService";
import ProjectDetailsValidationFrom from "@/utils/ProjectDetailsValidationFrom";
import { toast } from "@/hooks/use-toast";
import ButtonComponent from "@/elements/ButtonComponent/ButtonComponent";
import InputComponent from "@/elements/InputComponent/InputComponent";
import ThumbnailUploadComponent from "../ThumbnailUploadComponent/ThumbnailUploadComponent";
import styles from "../UpdateProfileComponent/UpdateProfileComponent.module.css";
import useUserContext from "@/hooks/useUserContext";
import TagSelectComponent from "../TagSelectComponent/TagSelectComponent";

const EditProjectComponent = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { userProfile } = useUserContext();
    const initialProject = location.state?.project;

    const username = initialProject?.authorDetails?.username || "";
    const slug = initialProject?.slug;

    const [projectData, setProjectData] = useState({
        title: "",
        description: "",
        problemStatement: "",
        problemSolution: "",
        thumbnail: null,
        tags: [],
        githubLink: "",
        hostedLink: "",
        documentation: "",
    });

    const [existingThumbnailUrl, setExistingThumbnailUrl] = useState(null);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [originalData, setOriginalData] = useState(null);

    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                if (initialProject) {
                    if (userProfile?.name !== initialProject.authorDetails.name) {
                        toast({
                            description: "You are not authorized to edit this project",
                            variant: "destructive",
                        });
                        navigate("/projects");
                        return;
                    }

                    if (initialProject.thumbnailUrl) {
                        setExistingThumbnailUrl(initialProject.thumbnailUrl);
                    }

                    const formattedData = {
                        title: initialProject.title,
                        description: initialProject.description,
                        problemStatement: initialProject.problemStatement,
                        problemSolution: initialProject.problemSolution,
                        thumbnail: null,
                        tags: initialProject.tags || [],
                        githubLink: initialProject.githubLink,
                        hostedLink: initialProject.hostedLink || "",
                        documentation: initialProject.documentation || "",
                    };

                    setProjectData(formattedData);
                    setOriginalData(JSON.parse(JSON.stringify(formattedData)));
                    setIsLoading(false);
                }
            } catch (error) {
                if (!navigator.onLine) {
                    toast({
                        description: "No internet connection. Please check your network.",
                    });
                } else if (!error.response) {
                    toast({
                        description: "No internet connection. Please check your network.",
                    });
                } else if (error.response.status === 500) {
                    toast({ description: "Server error. Please try again later." });
                } else if (error.response.status === 401) {
                    toast({ description: "Unauthorized access" });
                } else if (error.response.status === 503) {
                    toast({ description: "Server error. Please try again later." });
                } else {
                    toast({
                        description: "Something went wrong. Please try again.",
                    });
                }
                setIsLoading(false);
                navigate("/projects");
            }
        };

        fetchProjectDetails();
    }, [navigate, initialProject, userProfile]);

    const isFormUnchanged = () => {
        if (!originalData) return false;

        const fieldsToCheck = [
            "title",
            "description",
            "problemStatement",
            "problemSolution",
            "githubLink",
            "hostedLink",
            "documentation",
        ];

        for (let field of fieldsToCheck) {
            if (projectData[field] !== originalData[field]) {
                return false;
            }
        }

        if (projectData.tags.length !== originalData.tags.length) {
            return false;
        }

        for (let i = 0; i < projectData.tags.length; i++) {
            if (projectData.tags[i] !== originalData.tags[i]) {
                return false;
            }
        }

        if (projectData.thumbnail !== null) {
            return false;
        }

        return true;
    };

    const handleInputChange = (event) => {
        const { name, type, files, value } = event.target;

        if (type === "file") {
            if (files && files[0]) {
                if (files[0].size > 2 * 1024 * 1024) {
                    toast({ description: "File size should not exceed 2MB.", variant: "destructive" });
                } else {
                    setProjectData((prevData) => ({
                        ...prevData,
                        thumbnail: files[0],
                    }));
                }
            }
        } else {
            setProjectData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleTagClick = (tag) => {
        setProjectData((prevData) => {
            let newTags = [...prevData.tags];

            if (newTags.includes(tag)) {
                newTags = newTags.filter((t) => t !== tag);
            } else if (newTags.length < 3) {
                newTags.push(tag);
            }

            return { ...prevData, tags: newTags };
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (isFormUnchanged()) {
            toast({
                description: "No changes detected. Please edit the form before submitting.",
                variant: "destructive",
            });
            return;
        }

        const validationErrors = ProjectDetailsValidationFrom({
            ...projectData,
            thumbnailUrl: existingThumbnailUrl,
        });

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);

        try {
            const formDataObj = new FormData();
            formDataObj.append("title", projectData.title);
            formDataObj.append("description", projectData.description);
            formDataObj.append("problemStatement", projectData.problemStatement);
            formDataObj.append("problemSolution", projectData.problemSolution);
            formDataObj.append("githubLink", projectData.githubLink);

            if (projectData.hostedLink.trim()) {
                formDataObj.append("hostedLink", projectData.hostedLink.trim());
            }
            if (projectData.documentation.trim()) {
                formDataObj.append("documentation", projectData.documentation.trim());
            }

            projectData.tags.forEach((tag) => {
                formDataObj.append("tags[]", tag);
            });

            if (projectData.thumbnail) {
                formDataObj.append("thumbnail", projectData.thumbnail);
            } else if (existingThumbnailUrl) {
                formDataObj.append("existingThumbnailUrl", existingThumbnailUrl);
            }

            const response = await projectService.editProjectBySlug(slug, formDataObj);

            if (response.status === 200) {
                toast({
                    description: "🎉 Project updated successfully!",
                });

                const updatedProject = {
                    ...initialProject,
                    ...projectData,
                    thumbnailUrl: existingThumbnailUrl,
                };

                navigate(`/${username}/${slug}`, { state: { project: updatedProject } });
            }
        } catch (error) {
            if (error.response && error.response.status === 409 && error.response.data.error === "existing_project_title") {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    title: "This project title already exists. Please choose another one.",
                }));
            } else {
                toast({
                    description: "Failed to update the project. Please try again!",
                    variant: "destructive",
                });
            }
        } finally {
            setLoading(false);
        }
    };

    if (isLoading) {
        return <div>Loading project details...</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.form_wrapper}>
                <div className={styles.title_container}>
                    <h2 className={styles.form_title}>Edit Your Project</h2>
                    <h3 className={styles.form_subtitle}>
                        ( * are required fields)
                    </h3>
                </div>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className={styles.input_container}>
                        <label htmlFor="title" className={styles.label}>
                            Project Title *
                        </label>
                        <InputComponent
                            id="title"
                            className={styles.input_field}
                            placeholder="Enter your project title"
                            name="title"
                            value={projectData.title}
                            onChange={handleInputChange}
                        />
                        {errors.title && (
                            <p className={styles.error_message}>
                                {errors.title}
                            </p>
                        )}
                    </div>

                    <div className={styles.input_container}>
                        <label htmlFor="description" className={styles.label}>
                            Project Description *
                        </label>
                        <textarea
                            id="description"
                            className={`${styles.input_field} ${styles.textarea}`}
                            placeholder="Describe your project"
                            name="description"
                            value={projectData.description}
                            onChange={handleInputChange}
                            rows={8}
                            maxLength={500}
                        />
                        {errors.description && (
                            <p className={styles.error_message}>
                                {errors.description}
                            </p>
                        )}
                    </div>

                    <div className={styles.input_container}>
                        <label
                            htmlFor="problemStatement"
                            className={styles.label}
                        >
                            Problem Statement *
                        </label>
                        <textarea
                            id="problemStatement"
                            className={`${styles.input_field} ${styles.textarea}`}
                            placeholder="What problem does your project solve?"
                            name="problemStatement"
                            value={projectData.problemStatement}
                            onChange={handleInputChange}
                            rows={6}
                            maxLength={300}
                        />
                        {errors.problemStatement && (
                            <p className={styles.error_message}>
                                {errors.problemStatement}
                            </p>
                        )}
                    </div>

                    <div className={styles.input_container}>
                        <label
                            htmlFor="problemSolution"
                            className={styles.label}
                        >
                            Problem Solution *
                        </label>
                        <textarea
                            id="problemSolution"
                            className={`${styles.input_field} ${styles.textarea}`}
                            placeholder="How does your project solve the problem?"
                            name="problemSolution"
                            value={projectData.problemSolution}
                            onChange={handleInputChange}
                            rows={6}
                            maxLength={300}
                        />
                        {errors.problemSolution && (
                            <p className={styles.error_message}>
                                {errors.problemSolution}
                            </p>
                        )}
                    </div>

                    <div className={styles.input_container}>
                        <label htmlFor="thumbnail" className={styles.label}>
                            Project Thumbnail
                        </label>
                        <ThumbnailUploadComponent
                            thumbnail={projectData.thumbnail}
                            existingImageUrl={existingThumbnailUrl}
                            handleInputChange={handleInputChange}
                            error={errors.thumbnail}
                            placeholderText="Upload project thumbnail"
                        />
                    </div>

                    <div className={styles.input_container}>
                        <TagSelectComponent
                            tags={["Tag1", "Tag2", "Tag3", "Tag4"]}
                            handleTagClick={handleTagClick}
                            selectedTags={projectData.tags}
                            error={errors.tags}
                        />
                    </div>

                    <div className={styles.input_container}>
                        <label htmlFor="githubLink" className={styles.label}>
                            GitHub Link *
                        </label>
                        <InputComponent
                            id="githubLink"
                            className={styles.input_field}
                            placeholder="Enter your project's GitHub repository link"
                            name="githubLink"
                            value={projectData.githubLink}
                            onChange={handleInputChange}
                        />
                        {errors.githubLink && (
                            <p className={styles.error_message}>
                                {errors.githubLink}
                            </p>
                        )}
                    </div>

                    <div className={styles.input_container}>
                        <label htmlFor="hostedLink" className={styles.label}>
                            Hosted Link
                        </label>
                        <InputComponent
                            id="hostedLink"
                            className={styles.input_field}
                            placeholder="Enter your project's live demo link"
                            name="hostedLink"
                            value={projectData.hostedLink}
                            onChange={handleInputChange}
                        />
                        {errors.hostedLink && (
                            <p className={styles.error_message}>
                                {errors.hostedLink}
                            </p>
                        )}
                    </div>

                    <div className={styles.input_container}>
                        <label htmlFor="documentation" className={styles.label}>
                            Documentation
                        </label>
                        <InputComponent
                            id="documentation"
                            className={styles.input_field}
                            placeholder="Enter link to project documentation"
                            name="documentation"
                            value={projectData.documentation}
                            onChange={handleInputChange}
                        />
                        {errors.documentation && (
                            <p className={styles.error_message}>
                                {errors.documentation}
                            </p>
                        )}
                    </div>

                    <ButtonComponent
                        type="submit"
                        className={styles.submit_button}
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Update Project"}
                    </ButtonComponent>
                </form>
            </div>
        </div>
    );
};

export default EditProjectComponent;
