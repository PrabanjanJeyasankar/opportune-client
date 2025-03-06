const updateProfileValidation = (formData) => {
    const errors = {}

    if (!formData) {
        return { general: 'Form data is missing or invalid.' }
    }

    if (!formData) {
        return { general: 'Form data is missing or invalid.' }
    }

    const urlRegex = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,6})(\/[\w.-]*)*\/?$/
    const yearRegex = /^(19|20)\d{2}$/
    const experienceRegex = /^(?:[0-5]?[0-9]|60)$/

    if (!formData.professionalTitle || !formData.professionalTitle.trim()) {
        errors.professionalTitle = '*Professional title is required.'
    }

    if (!formData.bio || !formData.bio.trim()) {
        errors.bio = 'Let this world know what you are really made of'
    }

    if (!formData.resumeLink || !formData.resumeLink.trim()) {
        errors.resumeLink = '*Resume link is required.'
    } else if (!urlRegex.test(formData.resumeLink)) {
        errors.resumeLink = '*Invalid resume link format.'
    }

    if (!formData.passedOutYear) {
        errors.passedOutYear = '*Passed out year is required.'
    } else if (!yearRegex.test(formData.passedOutYear)) {
        errors.passedOutYear = '*Invalid year format. Example: 2024'
    }

    if (
        isNaN(formData.professionalExperience)
       
    ) {
        errors.professionalExperience = '*Experience is required.'
    } else if (!experienceRegex.test(formData.professionalExperience)) {
        errors.professionalExperience =
            '*Invalid experience format. Use numbers between 0-60 only.'
    }

    const accountErrors = []

    const linkedinAccount = formData.accounts.find(
        (acc) => acc.domain === 'linkedin'
    )
    const leetcodeAccount = formData.accounts.find(
        (acc) => acc.domain === 'leetcode'
    )

    if (!linkedinAccount?.url?.trim()) {
        accountErrors.push({
            domain: 'linkedin',
            message: '*LinkedIn link is required.',
        })
    }

    if (!leetcodeAccount?.url?.trim()) {
        accountErrors.push({
            domain: 'leetcode',
            message: '*LeetCode link is required.',
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
        errors.accounts = accountErrors
    }

    return errors
}

export default updateProfileValidation
