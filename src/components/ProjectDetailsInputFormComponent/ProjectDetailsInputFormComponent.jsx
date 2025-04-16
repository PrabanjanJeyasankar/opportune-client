import { toast } from "@/hooks/use-toast"
import useUserContext from "@/hooks/useUserContext"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import projectService from "../../services/projectService"
import ProjectDetailsValidationFrom from "../../utils/ProjectDetailsValidationFrom"
import ProjectDetailsFormFieldsComponent from "../ProjectDetailsFormFieldsComponent/ProjectDetailsFormFieldsComponent"

const ProjectDetailsInputFormComponent = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        problemStatement: "",
        problemSolution: "",
        thumbnail: null,
        tags: [],
        githubLink: "",
        hostedLink: "",
        documentation: "",
    })

    const [errors, setErrors] = useState({})
    const [beError, setBeError] = useState("")
    const [loading, setLoading] = useState(false)
    const { userProfile } = useUserContext()
    const navigate = useNavigate()

    const handleInputChange = (event) => {
        const { name, type, value, files } = event.target

        if (type === "file") {
            if (files && files[0]) {
                const file = files[0]
                if (file.size > 2 * 1024 * 1024) {
                    toast({ description: "File size should not exceed 2MB." })
                    return
                }

                setFormData((prevData) => ({
                    ...prevData,
                    thumbnail: file,
                }))

                if (errors.thumbnail) {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        thumbnail: "",
                    }))
                }
            }
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }))

            if (errors[name]) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [name]: "",
                }))
            }
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

            setErrors((prevErrors) => ({
                ...prevErrors,
                tags:
                    newTags.length > 0
                        ? ""
                        : "At least one tag must be selected.",
            }))

            return { ...prevData, tags: newTags }
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const validationErrors = ProjectDetailsValidationFrom(formData)
        setErrors(validationErrors)
        setBeError("")

        if (Object.keys(validationErrors).length === 0) {
            setLoading(true)
            try {
                const formDataObj = new FormData()

                formDataObj.append("title", formData.title)
                formDataObj.append("description", formData.description)
                formDataObj.append(
                    "problemStatement",
                    formData.problemStatement
                )
                formDataObj.append("problemSolution", formData.problemSolution)
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

                if (formData.thumbnail) {
                    formDataObj.append("thumbnail", formData.thumbnail)
                }
                formData.tags.forEach((tag) => {
                    formDataObj.append("tags[]", tag)
                })

                const response = await projectService.postProjectData(
                    formDataObj
                )

                if (response.status === 201) {
                    toast({
                        description: "🎉 Project submitted successfully!",
                    })

                    setFormData({
                        title: "",
                        description: "",
                        problemStatement: "",
                        problemSolution: "",
                        thumbnail: null,
                        tags: [],
                        githubLink: "",
                        hostedLink: "",
                        documentation: "",
                    })

                    const slug = response.data.data.slug
                    navigate(`/${userProfile.username}/${slug}`)
                }
            } catch (error) {
                console.error("Error submitting project", error)

                if (
                    error.response &&
                    error.response.status === 409 &&
                    error.response.data.error === "existing_project_title"
                ) {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        title: error.response.data.message,
                    }))
                } else if (error.response && error.response.status === 400) {
                    setBeError(
                        error.response.data.message ||
                            "An unexpected error occurred."
                    )
                } else {
                    setBeError(
                        "Failed to submit the project. Please try again!"
                    )
                }
            } finally {
                setLoading(false)
            }
        }
    }

    return (
        <ProjectDetailsFormFieldsComponent
            formData={formData}
            errors={errors}
            beError={beError}
            isProfileUpdate={false}
            handleInputChange={handleInputChange}
            handleTagClick={handleTagClick}
            handleSubmit={handleSubmit}
            loading={loading}
            serviceFunction={{
                service: projectService,
                fn: projectService.tagSelectionGetMethod,
            }}
        />
    )
}

export default ProjectDetailsInputFormComponent
