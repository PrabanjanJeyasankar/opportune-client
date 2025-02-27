const updateProfileValidation = (formData) => {
    const errors = {}
    console.log("Starting validation with full form data:", formData)

    if (!formData) {
        return { general: "Form data is missing or invalid." }
    }

    if (!formData) {
        return { general: "Form data is missing or invalid." }
    }

    const urlRegex = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,6})(\/[\w.-]*)*\/?$/
    const yearRegex = /^(19|20)\d{2}$/
    const experienceRegex = /^(?:[0-5]?[0-9]|60)$/

    if (!formData.professionalTitle || !formData.professionalTitle.trim()) {
        errors.professionalTitle = "Professional title is required."
    }
    console.log(formData.professionalTitle)

    if (!formData.bio || !formData.bio.trim()) {
        errors.bio = "Bio is required."
    }

    if (!formData.resumeLink || !formData.resumeLink.trim()) {
        errors.resumeLink = "Resume link is required."
    } else if (!urlRegex.test(formData.resumeLink)) {
        errors.resumeLink = "Invalid resume link format."
    }

    if (!formData.passedOutYear || !formData.passedOutYear.trim()) {
        errors.passedOutYear = "Passed out year is required."
    } else if (!yearRegex.test(formData.passedOutYear)) {
        errors.passedOutYear = "Invalid year format. Example: 2024"
    }

    if (
        !formData.professionalExperience ||
        !formData.professionalExperience.trim()
    ) {
        errors.professionalExperience = "Experience is required."
    } else if (!experienceRegex.test(formData.professionalExperience)) {
        errors.professionalExperience =
            "Invalid experience format. Use numbers between 0-60 only."
    }

    const accountErrors = []

    console.log("Checking all accounts:", formData.accounts)

    const linkedinAccount = formData.accounts.find(
        (acc) => acc.domain === "linkedin"
    )
    const leetcodeAccount = formData.accounts.find(
        (acc) => acc.domain === "leetcode"
    )

    console.log("LinkedIn account:", linkedinAccount)
    console.log("LeetCode account:", leetcodeAccount)

    if (!linkedinAccount?.url?.trim()) {
        accountErrors.push({
            domain: "linkedin",
            message: "LinkedIn link is required.",
        })
    }

    if (!leetcodeAccount?.url?.trim()) {
        accountErrors.push({
            domain: "leetcode",
            message: "LeetCode link is required.",
        })
    }

    formData.accounts.forEach((account) => {
        if (account.url.trim() && !urlRegex.test(account.url)) {
            accountErrors.push({
                domain: account.domain,
                message: `Invalid ${account.domain} URL format.`,
            })
        }
    })

    if (accountErrors.length > 0) {
        console.log("Account validation errors found:", accountErrors)
        errors.accounts = accountErrors
    }

    console.log("Final validation errors:", errors)
    return errors
}

export default updateProfileValidation
