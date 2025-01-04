import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import changePasswordStyles from './ChangePasswordPage.module.css'
import FormInputComponent from '../../elements/FormInputComponent/FormInputComponent'
import PrimaryButtonComponent from '../../elements/PrimaryButtonComponent/PrimaryButtonComponent'
import AppLogo from '../../assets/images/opportune_logo_svg.svg'
import PasswordStrengthBar from 'react-password-strength-bar'
import ButtonComponent from '../../elements/ButtonComponent/ButtonComponent'

function ChangePasswordPage() {
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    // const { email } = usePasswordResetContext()

    
    const navigate = useNavigate()
    

    const handleInputChange = (event) => {
        const { name, value } = event.target
        if (name === 'newPassword') {
            setNewPassword(value)
        } else {
            setConfirmPassword(value)
        }
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)

        // const { isValid, errors: validationErrors } = validateNewPassword(
        //     newPassword,
        //     confirmPassword
        // )
        // if (isValid) {
        //     try {
        //         const response = await handleNewPasswordService(
        //             email,
        //             newPassword
        //         )
        //         if (response.status === 200) {
        //             toast.success('Password updated successfully!')
        //             navigate('/login')
        //         } else if (response.status === 400) {
        //             toast.error(
        //                 'New password cannot be the same as the old password'
        //             )
        //         } else if (response.status === 404) {
        //             toast.error('User not found.')
        //         } else {
        //             toast.error('Unexpected error occurred.')
        //         }
        //     } catch (error) {
        //         if (error.response && error.response.status === 500) {
        //             toast.error('Server error. Please try again.')
        //         } else {
        //             toast.error('Network error. Please try again.')
        //         }
        //     } finally {
        //         setIsLoading(false)
        //     }
        // } else {
        //     setErrors(validationErrors)
        //     setIsLoading(false)
        // }
    }

    const handleBack = () => {
        navigate('/verify-otp')
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
                        value={newPassword}
                        placeholder=' '
                        label='New Password'
                        autoComplete='newPassword'
                        onChange={handleInputChange}
                        error={errors.password}
                    />
                </div>
                <div className={changePasswordStyles.password_container}>
                    <FormInputComponent
                        id='confirmPassword'
                        name='confirmPassword'
                        type='password'
                        value={confirmPassword}
                        placeholder=' '
                        label='Confirm Password'
                        autoComplete='confirmPassword'
                        onChange={handleInputChange}
                        error={errors.password}
                    />
                </div>
                {(newPassword || confirmPassword) && (
                    <PasswordStrengthBar
                        password={newPassword}
                        className={changePasswordStyles.strengthBar}
                    />
                )}
                <PrimaryButtonComponent
                    type='submit'
                    disabled={isLoading}>
                    {isLoading ? 'Updating...' : 'Update Password'}
                </PrimaryButtonComponent>
                <ButtonComponent
                    className={changePasswordStyles.back_button}
                    onClick={handleBack}>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='lucide lucide-chevron-left'>
                        <path d='m15 18-6-6 6-6' />
                    </svg>
                    <span>Back</span>
                </ButtonComponent>
            </form>
        </div>
    )
}

export default ChangePasswordPage
