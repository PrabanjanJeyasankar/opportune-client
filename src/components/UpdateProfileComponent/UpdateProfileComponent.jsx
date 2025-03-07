import ButtonComponent from '@/elements/ButtonComponent/ButtonComponent'
import InputComponent from '@/elements/InputComponent/InputComponent'
import { toast } from '@/hooks/use-toast'
import userProfileService from '@/services/userProfileservice'
import updateProfileValidation from '@/utils/updateProfileValidation'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ThumbnailUploadComponent from '../ThumbnailUploadComponent/ThumbnailUploadComponent'
import styles from '../UpdateProfileComponent/UpdateProfileComponent.module.css'

const UpdateProfileComponent = () => {
    const [formData, setFormData] = useState({
        professionalTitle: '',
        bio: '',
        portfolioLink: '',
        resumeLink: '',
        passedOutYear: '',
        professionalExperience: '',
        profilePicture: null,
        accounts: [
            { domain: 'linkedin', url: '' },
            { domain: 'leetcode', url: '' },
            { domain: 'behance', url: '' },
            { domain: 'dribble', url: '' },
            { domain: 'hackerrank', url: '' },
            { domain: 'instagram', url: '' },
            { domain: 'X', url: '' },
            { domain: 'reddit', url: '' },
            { domain: 'hackerearth', url: '' },
            { domain: 'codechef', url: '' },
            { domain: 'geeksforgeeks', url: '' },
        ],
    })
    const [existingProfilePictureUrl, setExistingProfilePictureUrl] =
        useState(null)
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [originalData, setOriginalData] = useState(null)

    useEffect(() => {
        userProfileService
            .getUserProfile()
            .then((response) => {
                if (response.status === 200) {
                    const userData = response.data.data[0]
                    if (userData.profilePicture) {
                        setExistingProfilePictureUrl(userData.profilePicture)
                    }

                    const formattedData = {
                        ...formData,
                        professionalTitle: userData.professionalTitle || '',
                        bio: userData.bio || '',
                        portfolioLink: userData.portfolioLink || '',
                        resumeLink: userData.resumeLink || '',
                        passedOutYear: userData.passedOutYear || '',
                        professionalExperience: isNaN(
                            userData.professionalExperience
                        )
                            ? ''
                            : userData.professionalExperience,
                        accounts: formData.accounts.map((acc) => ({
                            domain: acc.domain,
                            url:
                                userData.accounts?.find(
                                    (a) => a.domain === acc.domain
                                )?.url || '',
                        })),
                    }
                    setFormData(formattedData)
                    toast({ description: 'Restored your previous work' })
                    setOriginalData(JSON.parse(JSON.stringify(formattedData)))
                }
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    const handleInputChange = (event) => {
        const { name, type, files, value } = event.target
        if (type === 'file') {
            if (files && files[0]) {
                if (files[0].size > 2 * 1024 * 1024) {
                    toast({ description: 'File size should not exceed 2MB.' })
                } else {
                    setFormData((prevData) => ({
                        ...prevData,
                        profilePicture: files[0],
                    }))
                }
            }
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }))
        }
    }

    const handleAccountChange = (index, value) => {
        setFormData((prev) => {
            const updatedAccounts = [...prev.accounts]
            updatedAccounts[index].url = value
            return { ...prev, accounts: updatedAccounts }
        })
    }

    const isFormUnchanged = () => {
        if (!originalData) return false

        if (
            formData.professionalTitle !== originalData.professionalTitle ||
            formData.bio !== originalData.bio ||
            formData.portfolioLink !== originalData.portfolioLink ||
            formData.resumeLink !== originalData.resumeLink ||
            formData.passedOutYear !== originalData.passedOutYear ||
            formData.professionalExperience !==
                originalData.professionalExperience ||
            formData.profilePicture !== null
        ) {
            return false
        }

        const formDataNonEmptyAccounts = formData.accounts.filter(
            (account) => account.url.trim() !== ''
        )
        const originalDataNonEmptyAccounts = originalData.accounts.filter(
            (account) => account.url.trim() !== ''
        )

        if (
            formDataNonEmptyAccounts.length !==
            originalDataNonEmptyAccounts.length
        ) {
            return false
        }

        for (const formAccount of formDataNonEmptyAccounts) {
            const originalAccount = originalDataNonEmptyAccounts.find(
                (acc) => acc.domain === formAccount.domain
            )

            if (!originalAccount || originalAccount.url !== formAccount.url) {
                return false
            }
        }

        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (originalData && isFormUnchanged()) {
            toast({
                description:
                    'No changes detected. Please edit the form before submitting.',
            })
            return
        }
        const cleanedFormData = {
            ...formData,
            accounts: formData.accounts.filter(
                (account) => account.url.trim() !== ''
            ),
        }

        const validationErrors = updateProfileValidation(cleanedFormData)

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }
        setLoading(true)
        setErrors({})

        const formDataObj = new FormData()
        formDataObj.append('professionalTitle', formData.professionalTitle)
        formDataObj.append('bio', formData.bio)
        formDataObj.append('portfolioLink', formData.portfolioLink)
        formDataObj.append('resumeLink', formData.resumeLink)
        formDataObj.append('passedOutYear', formData.passedOutYear)
        formDataObj.append(
            'professionalExperience',
            formData.professionalExperience
        )

        if (formData.profilePicture) {
            formDataObj.append('profilePicture', formData.profilePicture)
        } else if (existingProfilePictureUrl) {
            formDataObj.append(
                'existingProfilePicture',
                existingProfilePictureUrl
            )
        }

        const nonEmptyAccounts = formData.accounts.filter(
            (account) => account.url.trim() !== ''
        )

        nonEmptyAccounts.forEach((account, index) => {
            formDataObj.append(`accounts[${index}][domain]`, account.domain)
            formDataObj.append(`accounts[${index}][url]`, account.url)
        })

        try {
            const response = await userProfileService.updateProfile(formDataObj)
            if (response.status === 200) {
                toast({ description: 'Profile updated successfully.' })

                const username = response.data.data.username
                navigate(`/portfolio/${username}`)
                if (response.data.data && response.data.data.profilePicture) {
                    setExistingProfilePictureUrl(
                        response.data.data.profilePicture
                    )
                }

                setFormData((prev) => ({
                    ...prev,
                    profilePicture: null,
                }))
            } else {
                setErrors(response.data.errors || {})
            }
        } catch (error) {
            if (!navigator.onLine) {
                toast({
                    description:
                        'No internet connection. Please check your network.',
                })
            }
            if (!error.response) {
                toast({
                    description:
                        'No internet connection. Please check your network.',
                })
            } else if (error.response.status === 500) {
                toast({ description: 'Server error. Please try again later.' })
            } else if (error.response.status === 401) {
                toast({ description: 'Unauthorized access' })
            } else if (error.response.status === 503) {
                toast({ description: 'Server error. Please try again later.' })
            } else {
                toast({
                    description: 'Something went wrong. Please try again.',
                })
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.form_wrapperr}>
                <div className={styles.title_container}>
                    <h2 className={styles.form_title}>Update Your Portfolio</h2>
                    <h3 className={styles.form_subtitle}>
                        ( * are required field)
                    </h3>
                </div>
                <form onSubmit={handleSubmit} encType='multipart/form-data'>
                    <div className={styles.input_container}>
                        <label
                            htmlFor='professionalTitle'
                            className={styles.label}>
                            Professional title *
                        </label>
                        <InputComponent
                            id='professionalTitle'
                            className={styles.input_field}
                            placeholder='Ex. Front-End Developer'
                            name='professionalTitle'
                            value={formData.professionalTitle}
                            onChange={handleInputChange}
                        />
                        {errors.professionalTitle && (
                            <p className={styles.error_message}>
                                {errors.professionalTitle}
                            </p>
                        )}
                    </div>
                    <div className={styles.input_container}>
                        <label htmlFor='bio' className={styles.label}>
                            <div
                                className={styles.label_singleLine_instruction}>
                                Bio *{' '}
                                <p className={styles.input_instruction}>
                                    (max 200 characters)
                                </p>
                            </div>
                        </label>

                        <textarea
                            id='bio'
                            className={`${styles.input_field} ${styles.textarea}`}
                            placeholder="Ex. Once upon a time, there lived a coder who didn't use GPT. Hours were lost, frustration grew, and then… blah blah."
                            name='bio'
                            value={formData.bio}
                            onChange={handleInputChange}
                            rows={8}
                            maxLength={300}
                        />
                        {errors.bio && (
                            <p className={styles.error_message}>{errors.bio}</p>
                        )}
                    </div>
                    <div className={styles.input_container}>
                        <label htmlFor='portfolioLink' className={styles.label}>
                            Portfolio Link
                        </label>
                        <InputComponent
                            id='portfolioLink'
                            className={styles.input_field}
                            placeholder='Enter your portfolio link'
                            name='portfolioLink'
                            value={formData.portfolioLink}
                            onChange={handleInputChange}
                        />
                        {errors.portfolioLink && (
                            <p className={styles.error_message}>
                                {errors.portfolioLink}
                            </p>
                        )}
                    </div>
                    <div className={styles.input_container}>
                        <label htmlFor='resumeLink' className={styles.label}>
                            Resume Link *
                        </label>
                        <InputComponent
                            id='resumeLink'
                            className={styles.input_field}
                            placeholder='Enter your resume link'
                            name='resumeLink'
                            value={formData.resumeLink}
                            onChange={handleInputChange}
                        />
                        {errors.resumeLink && (
                            <p className={styles.error_message}>
                                {errors.resumeLink}
                            </p>
                        )}
                    </div>
                    <div className={styles.input_container}>
                        <label
                            htmlFor='profilePicture'
                            className={styles.label}>
                            Profile Picture
                        </label>
                        <ThumbnailUploadComponent
                            thumbnail={formData.profilePicture}
                            existingImageUrl={existingProfilePictureUrl}
                            handleInputChange={handleInputChange}
                            error={errors.profilePicture}
                            placeholderText='Upload profile picture'
                        />
                    </div>
                    <div className={styles.input_container}>
                        <label htmlFor='passedOutYear' className={styles.label}>
                            Passed Out Year *
                        </label>
                        <InputComponent
                            id='passedOutYear'
                            className={styles.input_field}
                            placeholder='Ex. 2026'
                            name='passedOutYear'
                            value={formData.passedOutYear}
                            onChange={handleInputChange}
                        />
                        {errors.passedOutYear && (
                            <p className={styles.error_message}>
                                {errors.passedOutYear}
                            </p>
                        )}
                    </div>
                    <div className={styles.input_container}>
                        <label
                            htmlFor='professionalExperience'
                            className={styles.label}>
                            Professional Experience in years*
                        </label>
                        <InputComponent
                            id='professionalExperience'
                            className={styles.input_field}
                            placeholder='If you are a fresher mention 0'
                            name='professionalExperience'
                            value={formData.professionalExperience}
                            onChange={handleInputChange}
                        />
                        {errors.professionalExperience && (
                            <p className={styles.error_message}>
                                {errors.professionalExperience}
                            </p>
                        )}
                    </div>
                    <div className={styles.account_links_container}>
                        <h3 className={styles.account_links_heading}>
                            Social accounts
                        </h3>
                        <p className={styles.account_links_subheading}>
                            Developers may share their LeetCode, and designers
                            can include their Dribbble or Behance profiles.
                        </p>
                        {formData.accounts.map((account, index) => {
                            const accountError = errors.accounts?.find(
                                (err) => err.domain === account.domain
                            )

                            return (
                                <div
                                    key={index}
                                    className={`styles.account_field`}>
                                    <label
                                        htmlFor={`account_${index}`}
                                        className={styles.label}>
                                        {account.domain
                                            .charAt(0)
                                            .toUpperCase() +
                                            account.domain.slice(1)}
                                        {(account.domain === 'linkedin' ||
                                            account.domain === 'leetcode') &&
                                            ' *'}
                                    </label>
                                    <InputComponent
                                        id={`account_${index}`}
                                        className={styles.input_field}
                                        placeholder={`Enter ${account.domain} URL`}
                                        value={account.url}
                                        onChange={(e) =>
                                            handleAccountChange(
                                                index,
                                                e.target.value
                                            )
                                        }
                                    />
                                    {accountError && (
                                        <p className={styles.error_message}>
                                            {accountError.message}
                                        </p>
                                    )}
                                </div>
                            )
                        })}

                        {errors.general && (
                            <p className={styles.error_message}>
                                {errors.general}
                            </p>
                        )}
                    </div>
                    <ButtonComponent
                        type='submit'
                        className={styles.submit_button}
                        disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit Profile'}
                    </ButtonComponent>
                </form>
            </div>
        </div>
    )
}

export default UpdateProfileComponent
