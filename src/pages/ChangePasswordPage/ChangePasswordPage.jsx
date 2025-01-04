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
    const [showPassword, setShowPassword] = useState(false)

    // const { email } = usePasswordResetContext()

    
    const navigate = useNavigate()
    
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev)
    }

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
                <div className={changePasswordStyles.password_container}>
                    <FormInputComponent
                        id='newPassword'
                        name='newPassword'
                        type={showPassword ? 'text' : 'password'}
                        value={newPassword}
                        placeholder=' '
                        label='New Password'
                        autoComplete='newPassword'
                        onChange={handleInputChange}
                        error={errors.password}
                        containerClass={changePasswordStyles.input_group}
                        inputClass={changePasswordStyles.input}
                        labelClass={changePasswordStyles.label}
                        errorClass={changePasswordStyles.error}
                    />
                    <ButtonComponent
                        onClick={togglePasswordVisibility}
                        className={changePasswordStyles.eyeIcon}>
                        {showPassword ? (
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
                                className='lucide lucide-eye'>
                                <path d='M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0' />
                                <circle cx='12' cy='12' r='3' />
                            </svg>
                        ) : (
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
                                className='lucide lucide-eye-off'>
                                <path d='M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49' />
                                <path d='M14.084 14.158a3 3 0 0 1-4.242-4.242' />
                                <path d='M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143' />
                                <path d='m2 2 20 20' />
                            </svg>
                        )}
                    </ButtonComponent>
                </div>
                <div className={changePasswordStyles.password_container}>
                    <FormInputComponent
                        id='confirmPassword'
                        name='confirmPassword'
                        type={showPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        placeholder=' '
                        label='Confirm Password'
                        autoComplete='confirmPassword'
                        onChange={handleInputChange}
                        error={errors.password}
                        containerClass={changePasswordStyles.input_group}
                        inputClass={changePasswordStyles.input}
                        labelClass={changePasswordStyles.label}
                        errorClass={changePasswordStyles.error}
                    />
                    <span
                        onClick={togglePasswordVisibility}
                        className={changePasswordStyles.eyeIcon}>
                        {showPassword ? (
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
                                className='lucide lucide-eye'>
                                <path d='M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0' />
                                <circle cx='12' cy='12' r='3' />
                            </svg>
                        ) : (
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
                                className='lucide lucide-eye-off'>
                                <path d='M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49' />
                                <path d='M14.084 14.158a3 3 0 0 1-4.242-4.242' />
                                <path d='M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143' />
                                <path d='m2 2 20 20' />
                            </svg>
                        )}
                    </span>
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
