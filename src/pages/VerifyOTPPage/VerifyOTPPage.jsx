import { useState, useEffect, useContext, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

import otpVerificationStyles from './VerifyOTPPage.module.css'
import OTPInputComponent from '../../components/OTPInputComponent/OTPInputComponent'
import ButtonComponent from '../../elements/ButtonComponent/ButtonComponent'
import AppLogo from '../../assets/images/opportune_logo_svg.svg'

function VerifyOTPPage() {
    // const { setIsLoggedIn, setUserProfile } = useContext(UserContext)
    const [otp, setOtp] = useState(Array(6).fill(''))
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [countdown, setCountdown] = useState(20)
    const [isResendDisabled, setIsResendDisabled] = useState(true)

    const location = useLocation()
    const { isSignup, email } = location.state || {}
    const navigate = useNavigate()
    const countdownIntervalRef = useRef(null)

    const handleOtpChange = (newOtp) => {
        setOtp(newOtp)
        setErrors({})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)

        if (otp.some((digit) => digit === '')) {
            setErrors({ otp: '* Please fill all fields.' })
            setIsLoading(false)
            return
        }

        const otpString = otp.join('')

        try {
            console.log(otpString)
            // let response

            // if (isSignup) {
            //     response = await handleSignupOtpVerificationService(
            //         email,
            //         otpString
            //     )
            // } else {
            //     response = await handleResetPasswordOtpVerificationService(
            //         email,
            //         otpString
            //     )
            // }

            // if (response.status === 201 && isSignup) {
            //     const userProfile = response.data.userProfile
            //     setIsLoggedIn(true)
            //     setUserProfile(userProfile)
            //     localStorage.setItem('userProfile', JSON.stringify(userProfile))
            //     localStorage.setItem('isLoggedIn', 'true')

            //     toast.success('OTP verified successfully!')
            //     navigate(isSignup ? '/' : '/set-new-password')
            // } else if (response.status === 200 && !isSignup) {
            //     toast.success('OTP verified successfully!')
            //     navigate(isSignup ? '/' : '/set-new-password')
            // } else if (response.status === 400) {
            //     toast.error('Invalid OTP')
            // } else if (response.status === 410) {
            //     toast.error('OTP has expired.')
            // }
        } catch (error) {
            // toast.error('An error occurred. Please try again later.')
            console.error('OTP verification error:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleResendOtp = async () => {
        try {
            setIsResendDisabled(true)
            const response = await handleResetPasswordRequestOtpService(email)
            if (response.status === 200) {
                toast.success(
                    'OTP sent again to your email. Please check your inbox.'
                )
                resetCountdown()
            } else if (response.status === 404) {
                toast.error('Email not found. Please check your email address.')
            } else if (response.status === 500) {
                toast.error('Internal server error. Please try again later.')
            } else {
                toast.error('An unexpected error occurred. Please try again.')
            }
        } catch (error) {
            toast.error('Failed to resend OTP. Please try again.')
        }
    }

    const resetCountdown = () => {
        setCountdown(3)
        setIsResendDisabled(true)
        if (countdownIntervalRef.current)
            clearInterval(countdownIntervalRef.current)

        countdownIntervalRef.current = setInterval(() => {
            setCountdown((prevCountdown) => {
                if (prevCountdown <= 1) {
                    clearInterval(countdownIntervalRef.current)
                    setIsResendDisabled(false)
                    return 0
                }
                return prevCountdown - 1
            })
        }, 1000)
    }

    useEffect(() => {
        resetCountdown()
        return () => clearInterval(countdownIntervalRef.current)
    }, [])

    const formatCountdown = () => {
        const minutes = Math.floor(countdown / 60)
        const seconds = countdown % 60
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }

    const handleBack = () => {
        navigate(isSignup ? '/signup' : '/request-otp')
    }

    return (
        <div className={otpVerificationStyles.container}>
            <form
                className={otpVerificationStyles.form}
                onSubmit={handleSubmit}
                noValidate>
                <img
                    src={AppLogo}
                    className={otpVerificationStyles.app_logo}
                    alt='App Logo'
                />
                <h1 className={otpVerificationStyles.title}>Verify OTP</h1>
                <p className={otpVerificationStyles.subtitle}>
                    Enter the OTP sent to
                    <span className={otpVerificationStyles.otp_sent_email}>
                        {' '}
                        {email}
                    </span>
                    .
                </p>
                <p className={otpVerificationStyles.change_mail_container}>
                    Wrong mail id?{' '}
                    <Link
                        to={isSignup ? '/signup' : '/request-otp'}
                        className={otpVerificationStyles.change_mail}>
                        Change mail
                    </Link>
                </p>
                <div className={otpVerificationStyles.inputGroup}>
                    <OTPInputComponent
                        value={otp}
                        onChange={handleOtpChange}
                        errorClass={otpVerificationStyles.error}
                    />
                </div>
                {errors.otp && (
                    <p className={otpVerificationStyles.error}>{errors.otp}</p>
                )}
                <ButtonComponent
                    type='submit'
                    className={otpVerificationStyles.submitButton}
                    disabled={isLoading}>
                    {isLoading ? <SpinnerLoaderComponent /> : null}
                    <span
                        className={
                            otpVerificationStyles.verify_button_state_text
                        }>
                        {isLoading ? 'Verifying...' : 'Verify OTP'}
                    </span>
                </ButtonComponent>

                <div className={otpVerificationStyles.resend_otp_container}>
                    <p>Didn't receive the code? </p>
                    <ButtonComponent
                        className={otpVerificationStyles.resend_otp_button}
                        onClick={handleResendOtp}
                        disabled={isResendDisabled}>
                        {isResendDisabled
                            ? `Resend in ${formatCountdown()}`
                            : 'Resend OTP'}
                    </ButtonComponent>
                </div>

                <ButtonComponent
                    className={otpVerificationStyles.back_button}
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

export default VerifyOTPPage
