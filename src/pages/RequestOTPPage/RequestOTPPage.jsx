import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ButtonComponent from '../../elements/ButtonComponent/ButtonComponent'
import FormInputComponent from '../../elements/FormInputComponent/FormInputComponent'
import { validateEmail } from '../../utils/authenticationFieldsValidation'
import requestOtpStyles from './RequestOtpPage.module.css'
import AppLogo from '../../assets/images/opportune_logo_svg.svg'
import SpinnerLoaderComponent from '../../loaders/SpinnerLoaderComponent/SpinnerLoaderComponent'
// import { usePasswordResetContext } from '../../context/PasswordResetContext/passwordResetContext'
// import handleResetPasswordRequestOtpService from '../../services/authenticationServices/handleResetPasswordRequestOtpService'

function RequestOtpPage() {
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState("")
    const navigate = useNavigate()

    const handleInputChange = (event) => {
        setEmail(event.target.value)
        setErrors({})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)

        const validationError = validateEmail(email)
        if (!validationError) {
            try {
                console.log(email)
                // const response = await handleResetPasswordRequestOtpService(
                //     email
                // )
                // if (response.status === 200) {
                //     toast.success(
                //         'OTP sent to your email. Please check your inbox.'
                //     )
                //     navigate('/verify-otp', {
                //         state: {
                //             email: email,
                //         },
                //     })
                // } else if (response.status === 404) {
                //     toast.error(
                //         'Email not found. Please check your email address.'
                //     )
                // } else if (response.status === 500) {
                //     toast.error(
                //         'Internal server error. Please try again later.'
                //     )
                // } else {
                //     toast.error(
                //         'An unexpected error occurred. Please try again.'
                //     )
                // }
            } catch (error) {
                toast.error('Error sending OTP. Please try again.')
                setErrors({ email: 'Error occurred, please try again.' })
            } finally {
                setIsLoading(false)
            }
        } else {
            setErrors({ email: validationError })
            setIsLoading(false)
        }
    }

    const handleBack = () => {
        navigate('/login')
    }

    return (
        <div className={requestOtpStyles.container}>
            <form
                className={requestOtpStyles.form}
                onSubmit={handleSubmit}
                noValidate>
                <img
                    src={AppLogo}
                    className={requestOtpStyles.app_logo}
                    alt='App Logo'
                />
                <h1 className={requestOtpStyles.title}>Forgot Password</h1>
                <p className={requestOtpStyles.subtitle}>
                    Enter your email address to receive a One-Time Password
                    (OTP).
                </p>

                <div className={requestOtpStyles.input_group}>
                    <FormInputComponent
                        type='email'
                        id='email'
                        value={email}
                        placeholder=' '
                        label='Email'
                        onChange={handleInputChange}
                        error={errors.email}
                        containerClass={requestOtpStyles.input_group}
                        inputClass={requestOtpStyles.input}
                        labelClass={requestOtpStyles.label}
                        errorClass={requestOtpStyles.error}
                    />
                </div>
                <ButtonComponent
                    type='submit'
                    className={requestOtpStyles.submit_button}
                    disabled={isLoading}>
                    {
                        isLoading ? (
                            <span className={requestOtpStyles.spinning_loader}>
                                <SpinnerLoaderComponent />
                            </span>
                        ) : null
                    }
                    {isLoading ? 'Sending...' : 'Send OTP'}
                </ButtonComponent>
                
                <ButtonComponent
                    className={requestOtpStyles.back_button}
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

export default RequestOtpPage
