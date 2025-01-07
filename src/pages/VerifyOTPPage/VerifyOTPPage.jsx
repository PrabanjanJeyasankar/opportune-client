import { useState, useEffect, useContext, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

import otpVerificationStyles from './VerifyOTPPage.module.css'
import OTPInputComponent from '../../components/OTPInputComponent/OTPInputComponent'
import PrimaryButtonComponent from '../../elements/PrimaryButtonComponent/PrimaryButtonComponent'
import AppLogo from '../../assets/images/opportune_logo_svg.svg'
import ButtonComponent from '../../elements/ButtonComponent/ButtonComponent'
import authService from '../../services/authService'
import { UserContext } from '../../context/userContext'
import useUserContext from '../../hooks/useUserContext'
import SpinnerLoaderComponent from '../../loaders/SpinnerLoaderComponent/SpinnerLoaderComponent'

function VerifyOTPPage() {
    const { setIsUserLoggedIn, setUserProfile } = useUserContext();

    const [otpString, setOtpString] = useState(Array(6).fill(''))
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [countdown, setCountdown] = useState(20)
    const [isResendDisabled, setIsResendDisabled] = useState(true)

    const location = useLocation()
    const { isSignup, email } = location.state || {}
    const navigate = useNavigate()
    const countdownIntervalRef = useRef(null)

    const handleOtpChange = (newOtp) => {
        setOtpString(newOtp)
        setErrors({})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)

        if (otpString.some((digit) => digit === '')) {
            setErrors({ otpString: '* Please fill all fields.' })
            setIsLoading(false)
            return
        }

        const otp = otpString.join('')

        if(isSignup){
            console.log(email)
            console.log(otp)
            try{
                const response = await authService.verfiyOtp({email, otp})
                if(response.status === 200){
                    console.log("Verification sucessfull")
                    console.log("Singup complete")
                    setIsUserLoggedIn(true)
                    setUserProfile(response.data)
                    navigate("/")
                }
            }
            catch (error) {
                console.error('OTP verification error:', error)
                console.log(error?.response?.status)
                console.log(error?.response?.data?.message)

                if (error.response) {
                    const status = error.response.status
                    const message = error.response.data?.message || "An error occurred"
          
                    if (status === 401) {
                        console.log("Incorrect otp")
                        // toast.error("The OTP you entered is incorrect. Please try again.")
                    } else if (status === 410) {
                        console.log("The OTP has expired. Please request a new one." + error)
                        // toast.error("The OTP has expired. Please request a new one.")
                    }else if (status === 500) {
                        console.log("Server error try again" + message)
                        // toast.error("Server error, please try again later")
                    } else {
                        // toast.error(`Error ${status}: ${message}`);
                    }
                } else if (error.request) {
                    // toast.error("Network error. Please check your connection and try again.");
                } else {
                    // toast.error("Unexpected error occurred. Please try again later.");
                }
            } finally {
                setIsLoading(false)
            }
        }
        else {
            console.log(email)
            console.log(otp)
            try{
                const response = await authService.verfiyOtp({email, otp})
                if(response.status === 200){
                    console.log("Verification sucessfull")
                    console.log("redirecting to change password")
                    setUserProfile(response.data)
                    setIsUserLoggedIn(true)
                    navigate("/change-password", {
                        state: {
                            email : email
                        }
                    })
                }
            }
            catch (error) {
                console.error('OTP verification error:', error)
                console.log(error?.response?.status)
                console.log(error?.response?.data?.message)

                if (error.response) {
                    const status = error.response.status
                    const message = error.response.data?.message || "An error occurred"
          
                    if (status === 401) {
                        console.log("Incorrect otp")
                        // toast.error("The OTP you entered is incorrect. Please try again.")
                    } else if (status === 410) {
                        console.log("The OTP has expired. Please request a new one." + error)
                        // toast.error("The OTP has expired. Please request a new one.")
                    }else if (status === 500) {
                        console.log("Server error try again" + message)
                        // toast.error("Server error, please try again later")
                    } else {
                        // toast.error(`Error ${status}: ${message}`);
                    }
                } else if (error.request) {
                    // toast.error("Network error. Please check your connection and try again.");
                } else {
                    // toast.error("Unexpected error occurred. Please try again later.");
                }
            } finally {
                setIsLoading(false)
            }
        }
        
    }

    const handleResendOtp = async () => {
        try {
            setIsResendDisabled(true)
            setOtpString([])
            const response = await authService.resendOtp(email)
            console.log(response)
        } catch (error) {
            console.error('OTP verification error:', error)
            console.log(error?.response?.status)
            console.log(error?.response?.data?.message)

            if (error.response) {
                const status = error.response.status
                const message = error.response.data?.message || "An error occurred"
      
                if (status === 401) {
                    console.log("session expires signup again")
                    // toast.error("Session expired. Signup again")
                    navigate("/signup")
                } else if (status === 409) {
                    console.log("conflict user already exist" + error)
                    // toast.error("User already Registered")
                    navigate("/")
                } else if (status === 429) {
                    console.log("too many attempts signup again" + message)
                    // toast.error("Too many attempts. Signup again.")
                } else if (status === 500) {
                    console.log("Server Error try again" + message)
                    // toast.error("Server Error try again")
                } else {
                    // toast.error(`Error ${status}: ${message}`);
                }
            } else if (error.request) {
                // toast.error("Network error. Please check your connection and try again.");
            } else {
                // toast.error("Unexpected error occurred. Please try again later.");
            }
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

    const formatCountdown = () => {
        const minutes = Math.floor(countdown / 60)
        const seconds = countdown % 60
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }

    const handleBack = () => {
        navigate(isSignup ? '/signup' : '/request-otp')
    }

    useEffect(() => {
        resetCountdown()
        return () => clearInterval(countdownIntervalRef.current)
    }, [])

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
                        value={otpString}
                        onChange={handleOtpChange}
                        errorClass={otpVerificationStyles.error}
                    />
                </div>
                {errors.otp && (
                    <p className={otpVerificationStyles.error}>{errors.otp}</p>
                )}
                <PrimaryButtonComponent
                    type='submit'
                    disabled={isLoading}>
                    {isLoading ? <SpinnerLoaderComponent /> : null}
                    <span
                        className={
                            otpVerificationStyles.verify_button_state_text
                        }>
                        {isLoading ? 'Verifying...' : 'Verify OTP'}
                    </span>
                </PrimaryButtonComponent>

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
