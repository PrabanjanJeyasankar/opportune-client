const validateEmail = (email) => {
    if (!email) {
        return '*email is required'
    }

    if (!email.includes('@')) {
        return '*Just @ is missing.'
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    if (!emailPattern.test(email)) {
        return '*Please enter a valid email address.'
    }

    return ''
}

const validateField = (field, value, required, minimumLength, maximumLength, rules) => {
    if (required && !value) {
        return `${field} is required.`
    }
    if (minimumLength && value.length < minimumLength) {
        return `${field} must be at least ${minimumLength} characters.`
    }
    if (maximumLength && value.length > maximumLength) {
        return `${field} must not exceed ${maximumLength} characters.`
    }

    // Check custom rules
    if (rules) {
        for (const rule of rules) {
            if (!rule.regex.test(value)) {
                return rule.errorMessage
            }
        }
    }

    return null
}

const validateInputs = (inputs, validations) => {
    const errors = {}
    let isValid = true

    for (const [field, value] of Object.entries(inputs)) {
        const validation = validations[field]
        const error = validateField(
            field,
            value,
            validation?.required,
            validation?.minimumLength,
            validation?.maximumLength,
            validation?.rules
        )

        if (error) {
            errors[field] = error
            isValid = false
        }
    }

    const emailError = validateEmail(inputs.email)
    if (emailError) {
        errors.email = emailError
        isValid = false
    }

    return { isValid, errors }
}

const validateSignupInputs = (name, username, email, password) => {
    const inputs = { name, username, email, password }
    const validations = {
        name: { required: true },
        username: { required: true, minimumLength: 3, maximumLength: 20 },
        email: { required: true },
        password: {
            required: true,
            minimumLength: 6,
            maximumLength: 128,
            rules: [
                {
                    regex: /[A-Z]/,
                    errorMessage: "Password must contain at least one uppercase letter.",
                },
                {
                    regex: /[a-z]/,
                    errorMessage: "Password must contain at least one lowercase letter.",
                },
                {
                    regex: /[!@#$%^&*(),.?":{}|<>]/,
                    errorMessage: "Password must contain at least one special character.",
                },
            ],
        },
    }
    return validateInputs(inputs, validations)
}



const validateLoginInputs = (email, password) => {
    const inputs = { email, password }
    const validations = {
        email: { required: true },
        password: { required: true, minimumLength: 6, maximumLength: 128 },
    }
    return validateInputs(inputs, validations)
}

export {
    validateField,
    validateSignupInputs,
    validateLoginInputs,
    validateEmail,
}
