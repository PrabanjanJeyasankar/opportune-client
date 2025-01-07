import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import changePasswordStyles from './ChangePasswordPage.module.css'
import FormInputComponent from '../../elements/FormInputComponent/FormInputComponent'
import PrimaryButtonComponent from '../../elements/PrimaryButtonComponent/PrimaryButtonComponent'
import AppLogo from '../../assets/images/opportune_logo_svg.svg'
import PasswordStrengthBar from 'react-password-strength-bar'
import ButtonComponent from '../../elements/ButtonComponent/ButtonComponent'
import { validateNewPassword } from '../../utils/authenticationFieldsValidation'
import authService from '../../services/authService'

function ChangePasswordPage() {
    const [formData, setFormData] = useState({
        newPassword : '',
        confirmPassword: ''
    })
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    // const { email } = usePasswordResetContext()

    
    const navigate = useNavigate()
    const location = useLocation()
    const {email} = location.state || {}
    console.log(email)

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        setErrors((prev) => ({ ...prev, [name]: '' }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log('Form submission prevented')
        setIsLoading(true)

        const { isValid, errors} = validateNewPassword(
            formData.newPassword,
            formData.confirmPassword
        )
        if (isValid) {
            try {
                console.log("valid")
                const response = await authService.changePassword(
                    email,
                    formData.newPassword
                )
                console.log(response)
                // if (response.status === 200) {
                //     toast.success('Password updated successfully!')
                //     navigate('/login')
                // } else if (response.status === 400) {
                //     toast.error(
                //         'New password cannot be the same as the old password'
                //     )
                // } else if (response.status === 404) {
                //     toast.error('User not found.')
                // } else {
                //     toast.error('Unexpected error occurred.')
                // }
            } catch (error) {
                // if (error.response && error.response.status === 500) {
                //     toast.error('Server error. Please try again.')
                // } else {
                //     toast.error('Network error. Please try again.')
                // }
            } finally {
                setIsLoading(false)
            }
        } else {
            setErrors(errors)
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
                <div className=''>
                    <FormInputComponent
                        id='newPassword'
                        name='newPassword'
                        type='password'
                        value={formData.newPassword}
                        placeholder=' '
                        label='New Password'
                        autoComplete='newPassword'
                        onChange={handleInputChange}
                        error={errors.newPassword}
                    />
                </div>
                <div className={changePasswordStyles.password_container}>
                    <FormInputComponent
                        id='confirmPassword'
                        name='confirmPassword'
                        type='password'
                        value={formData.confirmPassword}
                        placeholder=' '
                        label='Confirm Password'
                        autoComplete='confirmPassword'
                        onChange={handleInputChange}
                        error={errors.confirmPassword}
                    />
                </div>
                {(formData.newPassword || formData.confirmPassword) && (
                    <PasswordStrengthBar
                        password={formData.newPassword}
                        className={changePasswordStyles.strengthBar}
                    />
                )}
                <PrimaryButtonComponent
                    type='submit'
                    disabled={isLoading}>
                    {isLoading ? 'Updating...' : 'Update Password'}
                </PrimaryButtonComponent>
            </form>
        </div>
    )
}

export default ChangePasswordPage
