import React, { useState } from "react"
import InputComponent from "@/elements/InputComponent/InputComponent"
import ButtonComponent from "@/elements/ButtonComponent/ButtonComponent"
import styles from "../UpdateProfileComponent/UpdateProfileComponent.module.css"
import userProfileService from "@/services/userProfileservice"
import { toast } from "@/hooks/use-toast"
import updateProfileValidation from "@/utils/updateProfileValidation"
import ThumbnailUploadComponent from "../ThumbnailUploadComponent/ThumbnailUploadComponent"

const UpdateProfileComponent = () => {
    const [formData, setFormData] = useState({
        bio: "",
        portfolioLink: "",
        resumeLink: "",
        passedOutYear: "",
        experience: "",
        accounts: [
            { domain: "linkedin", url: "" },
            { domain: "instagram", url: "" },
            { domain: "X", url: "" },
            { domain: "reddit", url: "" },
            { domain: "leetcode", url: "" },
            { domain: "hackerrank", url: "" },
            { domain: "hackerearth", url: "" },
            { domain: "codechef", url: "" },
            { domain: "behance", url: "" },
            { domain: "dribble", url: "" },
            { domain: "geeksforgeeks", url: "" },
        ],
    })
    const [profilePicture, setProfilePicture] = useState(null)
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleFileChange = (e) => {
        const { files } = e.target
        setProfilePicture(files[0])
    }

    const handleAccountChange = (index, value) => {
        setFormData((prev) => {
            const updatedAccounts = [...prev.accounts]
            updatedAccounts[index].url = value
            return { ...prev, accounts: updatedAccounts }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const validationErrors = updateProfileValidation(formData)
        console.error(validationErrors)

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        setLoading(true)
        setErrors({})

        const filteredAccounts = formData.accounts.filter(
            (account) => account.url.trim() !== ""
        )

        try {
            const response = await userProfileService.updateProfile({
                ...formData,
                profilePicture,
                accounts: filteredAccounts,
            })

            if (response.status === 200) {
                toast({
                    description: "Profile updated successfully.",
                })
                setFormData({
                    bio: "",
                    portfolioLink: "",
                    resumeLink: "",
                    passedOutYear: "",
                    experience: "",
                    accounts: [
                        { domain: "linkedin", url: "" },
                        { domain: "instagram", url: "" },
                        { domain: "X", url: "" },
                        { domain: "reddit", url: "" },
                        { domain: "leetcode", url: "" },
                        { domain: "hackerrank", url: "" },
                        { domain: "hackerearth", url: "" },
                        { domain: "behance", url: "" },
                        { domain: "dribble", url: "" },
                        { domain: "codechef", url: "" },
                        { domain: "geeksforgeeks", url: "" },
                    ],
                })
                setProfilePicture(null)
                setErrors({})
            } else {
                setErrors(response.data.errors || {})
            }
        } catch (error) {
            console.error(error)
            setErrors({ general: "Something went wrong." })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.form_wrapperr}>
                <div className={styles.title_container}>
                    <h2 className={styles.form_title}>Update Your Profile</h2>
                    <p>( * are required field)</p>
                </div>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <label htmlFor="bio" className={styles.label}>
                        <div className={styles.label_singleLine_instruction}>
                            Bio *{" "}
                            <p className={styles.input_instruction}>
                                (max 200 characters)
                            </p>
                        </div>
                    </label>
                    <textarea
                        id="bio"
                        className={`${styles.input_field} ${styles.textarea}`}
                        placeholder="Enter your bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        rows={8}
                        maxLength={300}
                    />
                    {errors.bio && (
                        <p className={styles.error_message}>{errors.bio}</p>
                    )}

                    <label htmlFor="portfolioLink" className={styles.label}>
                        Portfolio Link
                    </label>
                    <InputComponent
                        id="portfolioLink"
                        className={styles.input_field}
                        placeholder="Enter your portfolio link"
                        name="portfolioLink"
                        value={formData.portfolioLink}
                        onChange={handleInputChange}
                        error={errors.portfolioLink}
                    />
                    {errors.portfolioLink && (
                        <p className={styles.error_message}>
                            {errors.portfolioLink}
                        </p>
                    )}

                    <label htmlFor="resumeLink" className={styles.label}>
                        Resume Link *
                    </label>
                    <InputComponent
                        id="resumeLink"
                        className={styles.input_field}
                        placeholder="Enter your resume link"
                        name="resumeLink"
                        value={formData.resumeLink}
                        onChange={handleInputChange}
                        error={errors.resumeLink}
                    />
                    {errors.resumeLink && (
                        <p className={styles.error_message}>
                            {errors.resumeLink}
                        </p>
                    )}

                    <label htmlFor="thumbnail_upload" className={styles.label}>
                        Profile Picture
                    </label>
                    <ThumbnailUploadComponent
                        thumbnail={profilePicture}
                        handleInputChange={handleFileChange}
                        error={errors.profilePicture}
                        placeholderText="Upload profile picture"
                    />

                    <label htmlFor="passedOutYear" className={styles.label}>
                        Passed Out Year *
                    </label>
                    <InputComponent
                        id="passedOutYear"
                        className={styles.input_field}
                        placeholder="Enter your passed out year"
                        name="passedOutYear"
                        value={formData.passedOutYear}
                        onChange={handleInputChange}
                        error={errors.passedOutYear}
                    />
                    {errors.passedOutYear && (
                        <p className={styles.error_message}>
                            {errors.passedOutYear}
                        </p>
                    )}

                    <label htmlFor="experience" className={styles.label}>
                        <div className={styles.label_singleLine_instruction}>
                            {" "}
                            Professional Experience *{" "}
                            <p className={styles.input_instruction}>
                                {" "}
                                (in years){" "}
                            </p>
                        </div>
                    </label>
                    <InputComponent
                        id="experience"
                        className={styles.input_field}
                        placeholder="Enter your experience in years"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        error={errors.experience}
                    />
                    {errors.experience && (
                        <p className={styles.error_message}>
                            {errors.experience}
                        </p>
                    )}

                    <label className={styles.label_Heading}>Accounts</label>
                    <br></br>
                    <br></br>
                    {formData.accounts.map((account, index) => (
                        <div key={index} className={styles.account_field}>
                            <label
                                htmlFor={`account_${index}`}
                                className={styles.label}
                            >
                                {account.domain.charAt(0).toUpperCase() +
                                    account.domain.slice(1)}
                                {(account.domain === "linkedin" ||
                                    account.domain === "leetcode") &&
                                    " *"}
                            </label>
                            <InputComponent
                                id={`account_${index}`}
                                className={styles.input_field}
                                placeholder={`Enter ${account.domain} URL`}
                                value={account.url}
                                onChange={(e) =>
                                    handleAccountChange(index, e.target.value)
                                }
                                error={errors[`accounts_${index}`]}
                            />
                            {errors[`accounts_${index}`] && (
                                <p className={styles.error_message}>
                                    {errors[`accounts_${index}`]}
                                </p>
                            )}
                        </div>
                    ))}

                    <ButtonComponent
                        type="submit"
                        className={styles.submit_button}
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Submit Profile"}
                    </ButtonComponent>
                </form>
            </div>
        </div>
    )
}

export default UpdateProfileComponent
