import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { toast } from '@/hooks/use-toast'
import SpinnerLoaderComponent from '@/loaders/SpinnerLoaderComponent/SpinnerLoaderComponent'
import PasswordStrengthBar from 'react-password-strength-bar'
import AppLogo from '../../assets/images/opportune_logo_svg.svg'
import FormInputComponent from '../../elements/FormInputComponent/FormInputComponent'
import PrimaryButtonComponent from '../../elements/PrimaryButtonComponent/PrimaryButtonComponent'
import authService from '../../services/authService'
import { validateNewPassword } from '../../utils/authenticationFieldsValidation'
import changePasswordStyles from './ChangePasswordPage.module.css'

function ChangePasswordPage() {
    const { state } = useLocation()
    const navigate = useNavigate()

    const initialEmail = state?.email || ''
    const [formData, setFormData] = useState({
        email: initialEmail,
        newPassword: '',
        confirmPassword: '',
    })
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const { email, newPassword, confirmPassword } = formData

    const handleInputChange = ({ target: { name, value } }) => {
        setFormData((prev) => ({ ...prev, [name]: value }))
        setErrors((prev) => ({ ...prev, [name]: '' }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)

        const { isValid, errors: validationErrors } = validateNewPassword(
            newPassword,
            confirmPassword
        )

        if (!isValid) {
            setErrors(validationErrors)
            setIsLoading(false)
            return
        }

        if (!email) {
            setErrors((prev) => ({
                ...prev,
                email: 'Email is required to update the password.',
            }))
            setIsLoading(false)
            return
        }

        try {
            const response = await authService.changePassword(
                email,
                newPassword
            )
            if (response.status === 200) {
                toast({
                    description: 'Password updated successfully!',
                })
                navigate('/login')
            }
        } catch (error) {
            if (error.response) {
                const status = error.response.status
                const message =
                    error.response.data?.message || 'An error occurred'

                if (status === 400) {
                    setErrors({
                        newPassword:
                            'Validation error. Try with different combination',
                    })
                    toast({
                        description:
                            'Validation error. Try with different combination',
                    })
                } else if (status === 500) {
                    toast({
                        description:
                            'Failed to update password. Please try again.',
                    })
                } else {
                    toast({
                        description: `Error ${status}: ${message}`,
                    })
                }
            } else if (error.request) {
                toast({
                    description:
                        'Network error. Please check your connection and try again.',
                })
            } else {
                toast({
                    description:
                        'Unexpected error occurred. Please try again later.',
                })
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={changePasswordStyles.container}>
            <form
                className={changePasswordStyles.form}
                onSubmit={handleSubmit}
                noValidate>
                <img
                    src={AppLogo}
                    className={changePasswordStyles.app_logo}
                    alt='App Logo'
                />
                <h1 className={changePasswordStyles.title}>Set New Password</h1>
                <p className={changePasswordStyles.subtitle}>
                    Make sure your password is memorable and secure.
                </p>

                <FormInputComponent
                    id='email'
                    name='email'
                    type='email'
                    value={email}
                    placeholder=' '
                    label='Email'
                    autoComplete='email'
                    onChange={handleInputChange}
                    error={errors.email}
                    disabled={!!initialEmail}
                />

                <FormInputComponent
                    id='newPassword'
                    name='newPassword'
                    type='password'
                    value={newPassword}
                    placeholder=' '
                    label='New Password'
                    autoComplete='new-password'
                    onChange={handleInputChange}
                    error={errors.newPassword}
                />

                <FormInputComponent
                    id='confirmPassword'
                    name='confirmPassword'
                    type='password'
                    value={confirmPassword}
                    placeholder=' '
                    label='Confirm Password'
                    autoComplete='new-password'
                    onChange={handleInputChange}
                    error={errors.confirmPassword}
                />

                {newPassword && (
                    <PasswordStrengthBar
                        password={newPassword}
                        className={changePasswordStyles.strengthBar}
                    />
                )}

                <PrimaryButtonComponent type='submit' disabled={isLoading}>
                    <div>
                        {isLoading ? (
                            <span
                                className={
                                    changePasswordStyles.spinning_loader
                                }>
                                <SpinnerLoaderComponent />
                            </span>
                        ) : null}
                    </div>
                    <span
                        className={
                            changePasswordStyles.verify_button_state_text
                        }>
                        {isLoading ? 'Updating...' : 'Update Password'}
                    </span>
                </PrimaryButtonComponent>
            </form>
        </div>
    )
}

export default ChangePasswordPage
