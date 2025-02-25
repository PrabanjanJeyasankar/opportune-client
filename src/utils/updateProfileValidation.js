const updateProfileValidation = (formData) => {
    const errors = {}

    if (!formData) {
        return { general: "Form data is missing or invalid." }
    }

    if (!formData.bio || !formData.bio.trim()) {
        errors.bio = "Bio is required."
    }

    if (!formData.resumeLink || !formData.resumeLink.trim()) {
        errors.resumeLink = "Resume link is required."
    }

    if (!formData.passedOutYear || !formData.passedOutYear.trim()) {
        errors.passedOutYear = "Passed out year is required."
    }

    if (!formData.experience || !formData.experience.trim()) {
        errors.experience = "experience is required."
    }

    if (formData.accounts && Array.isArray(formData.accounts)) {
        formData.accounts.forEach((account, index) => {
            if (
                account.domain === "linkedin" &&
                (!account.url || !account.url.trim())
            ) {
                errors[`accounts_${index}`] = "LinkedIn URL is required."
            }
            if (
                account.domain === "leetcode" &&
                (!account.url || !account.url.trim())
            ) {
                errors[`accounts_${index}`] = "LeetCode URL is required."
            }
        })
    }
    if (!formData.profilePicture) {
        errors.profilePicture = "profilePicture is required."
    }
    return errors
}

export default updateProfileValidation
