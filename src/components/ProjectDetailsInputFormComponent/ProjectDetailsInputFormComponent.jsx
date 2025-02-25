import React, { useState } from "react"
import ButtonComponent from "../../elements/ButtonComponent/ButtonComponent"
import InputComponent from "../../elements/InputComponent/InputComponent"
import ModalComponent from "../../elements/ModalComponent/ModalComponent"
import projectService from "../../services/projectService"
import ProjectDetailsValidationFrom from "../../utils/ProjectDetailsValidationFrom"
import styles from "../ProjectDetailsInputFormComponent/ProjectDetailsInputFormComponent.module.css"
import TagSelectComponent from "../TagSelectComponent/TagSelectComponent"
import ThumbnailUploadComponent from "../ThumbnailUploadComponent/ThumbnailUploadComponent"
import { toast } from "@/hooks/use-toast"

const ProjectDetailsInputFormComponent = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        thumbnail: null,
        tags: [],
        githubLink: "",
        hostedLink: "",
        documentation: "",
    })

    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    const handleInputChange = (event) => {
        const { name, type, files } = event.target

        if (type === "file") {
            if (files && files[0]) {
                if (files[0].size > 2 * 1024 * 1024) {
                    toast({ description: "File size should not exceed 2MB." })
                } else {
                    setFormData((prevData) => ({
                        ...prevData,
                        [name]: files[0],
                    }))
                }
            }
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: event.target.value,
            }))
        }
    }

    const handleTagClick = (tag) => {
        setFormData((prevData) => {
            let newTags = [...prevData.tags]

            if (newTags.includes(tag)) {
                newTags = newTags.filter((t) => t !== tag)
            } else if (newTags.length < 3) {
                newTags.push(tag)
            }

            return { ...prevData, tags: newTags }
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const validationErrors = ProjectDetailsValidationFrom(formData)
        setErrors(validationErrors)

        if (Object.keys(validationErrors).length === 0) {
            setLoading(true)
            try {
                const formDataObj = new FormData()
                formDataObj.append("title", formData.title)
                formDataObj.append("description", formData.description)
                formDataObj.append("thumbnail", formData.thumbnail)
                formDataObj.append("githubLink", formData.githubLink)
                if (formData.hostedLink.trim()) {
                    formDataObj.append("hostedLink", formData.hostedLink.trim())
                }
                if (formData.documentation.trim()) {
                    formDataObj.append(
                        "documentation",
                        formData.documentation.trim()
                    )
                }

                formData.tags.forEach((tag) => {
                    formDataObj.append("tags[]", tag)
                })
                const response = await projectService.postProjectData(
                    formDataObj
                )

                if (response.status === 201) {
                    toast({ description: "🎉 Project submitted successfully!" })

                    setFormData({
                        title: "",
                        description: "",
                        thumbnail: null,
                        tags: [],
                        githubLink: "",
                        hostedLink: "",
                        documentation: "",
                    })
                }
            } catch (error) {
                console.error("Error submitting project", error)
                if (
                    error.response &&
                    error.response.status === 409 &&
                    error.response.data.error === "existing_project_title"
                ) {
                    console.log(error.response.data.error)
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        title: "This project title already exists. Please choose another one.",
                    }))
                } else {
                    toast({
                        description:
                            "Failed to submit the project. Please try again!",
                    })
                }
            } finally {
                setLoading(false)
            }
        }
    }

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.form_wrapperr}>
                    <div className={styles.title_container}>
                        <h2 className={styles.form_title}>
                            Submit Your Project
                        </h2>
                        <p>( * are required field)</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <label className={styles.label}>Title *</label>
                        <InputComponent
                            className={styles.input_field}
                            placeholder="Enter project title"
                            name="title"
                            value={formData.title}
                            label="Title"
                            onChange={handleInputChange}
                            error={errors.title}
                        />
                        {errors.title && (
                            <p className={styles.error_message}>
                                {errors.title}
                            </p>
                        )}

                        <div className={styles.label}>Description *</div>
                        <textarea
                            id="description"
                            className={`${styles.input_field} ${styles.textarea}`}
                            placeholder="Enter project description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows={8}
                            error={errors.description}
                        />
                        {errors.description && (
                            <p className={styles.error_message}>
                                {errors.description}
                            </p>
                        )}

                        <div className={styles.label}>Thumbnail *</div>
                        <ThumbnailUploadComponent
                            thumbnail={formData.thumbnail}
                            handleInputChange={handleInputChange}
                            error={errors.thumbnail}
                        />

                        <TagSelectComponent
                            tags={["Tag1", "Tag2", "Tag3", "Tag4"]}
                            handleTagClick={handleTagClick}
                            selectedTags={formData.tags}
                            error={errors.tags}
                        />
                        <div className={styles.label}>GithubLink *</div>
                        <InputComponent
                            className={styles.input_field}
                            placeholder="Enter GitHub repository URL"
                            name="githubLink"
                            value={formData.githubLink}
                            label="GitHub Link"
                            onChange={handleInputChange}
                            error={errors.githubLink}
                        />
                        {errors.githubLink && (
                            <p className={styles.error_message}>
                                {errors.githubLink}
                            </p>
                        )}

                        <div className={styles.label}>HostedLink</div>
                        <InputComponent
                            className={styles.input_field}
                            placeholder="Enter live demo URL"
                            name="hostedLink"
                            value={formData.hostedLink}
                            label="Hosted Link"
                            onChange={handleInputChange}
                            error={errors.hostedLink}
                        />
                        {errors.hostedLink && (
                            <p className={styles.error_message}>
                                {errors.hostedLink}
                            </p>
                        )}

                        <div className={styles.label}>Documentation</div>
                        <InputComponent
                            className={styles.input_field}
                            placeholder="Enter Documentation URL"
                            name="documentation"
                            value={formData.documentation}
                            label="Documentation"
                            onChange={handleInputChange}
                            error={errors.documentation}
                        />
                        {errors.documentation && (
                            <p className={styles.error_message}>
                                {errors.documentation}
                            </p>
                        )}

                        <ButtonComponent
                            type="submit"
                            className={styles.submit_button}
                            disabled={loading}
                        >
                            {loading ? "Submitting..." : "Submit Project"}
                        </ButtonComponent>
                    </form>
                    {/* <ModalComponent
                        isOpen={isModalOpen}
                        message={modalContent.message}
                        type={modalContent.type}
                        onClose={() => setIsModalOpen(false)}
                    /> */}
                </div>
            </div>
        </div>
    )
}

export default ProjectDetailsInputFormComponent
