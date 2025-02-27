import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { toast } from '@/hooks/use-toast'
import BackSvg from '@/svg/BackSvg/BackSvg'
import AppLogo from '../../assets/images/opportune_logo_svg.svg'
import OTPInputComponent from '../../components/OTPInputComponent/OTPInputComponent'
import ButtonComponent from '../../elements/ButtonComponent/ButtonComponent'
import PrimaryButtonComponent from '../../elements/PrimaryButtonComponent/PrimaryButtonComponent'
import useUserContext from '../../hooks/useUserContext'
import SpinnerLoaderComponent from '../../loaders/SpinnerLoaderComponent/SpinnerLoaderComponent'
import authService from '../../services/authService'
import otpVerificationStyles from './VerifyOTPPage.module.css'

function VerifyOTPPage() {
    const { setIsUserLoggedIn, setUserProfile } = useUserContext()
    const [otpString, setOtpString] = useState(Array(6).fill(''))
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [countdown, setCountdown] = useState(20)
    const [isResendDisabled, setIsResendDisabled] = useState(true)
    const [isOtpResending, setIsOtpResending] = useState(false)

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

        if (isSignup) {
            try {
                const response = await authService.verfiyOtp({ email, otp })
                if (response.status === 200) {
                    toast({
                        description: 'Verification sucess. Signup completed.',
                    })
                    setIsUserLoggedIn(true)
                    localStorage.setItem(
                        'userData',
                        JSON.stringify(response.data.data)
                    )
                    navigate('/')
                }
            } catch (error) {
                if (error.response) {
                    const status = error.response.status
                    const message =
                        error.response.data?.message || 'An error occurred'

                    if (status === 401) {
                        toast({
                            description:
                                'The OTP you entered is incorrect. Please try again.',
                        })
                    } else if (status === 410) {
                        toast({
                            description:
                                'The OTP has expired. Please request a new one.',
                        })
                    } else if (status === 500) {
                        toast({
                            description: 'Server error, please try again later',
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
        } else {
            try {
                const response = await authService.verfiyOtp({ email, otp })
                if (response.status === 200) {
                    toast({
                        description: 'Verification sucessfull, Redirecting...',
                    })
                    setUserProfile(response.data)
                    setIsUserLoggedIn(true)
                    navigate('/change-password', {
                        state: {
                            email: email,
                        },
                    })
                }
            } catch (error) {
                if (error.response) {
                    const status = error.response.status
                    const message =
                        error.response.data?.message || 'An error occurred'

                    if (status === 401) {
                        toast({
                            description:
                                'The OTP you entered is incorrect. Please try again.',
                        })
                    } else if (status === 410) {
                        toast({
                            description:
                                'The OTP has expired. Please request a new one.',
                        })
                    } else if (status === 500) {
                        toast({
                            description: 'Server error, please try again later',
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
    }

    const handleResendOtp = async () => {
        if (isSignup) {
            try {
                setIsResendDisabled(true)
                setOtpString(Array(6).fill(''))
                setIsOtpResending(true)
                const response = await authService.resendOtp(email)
                if (response.status == 201) {
                    toast({
                        description: 'OTP resent to given email address.',
                    })
                }
            } catch (error) {
                if (error.response) {
                    const status = error.response.status
                    const message =
                        error.response.data?.message || 'An error occurred'

                    if (status === 401) {
                        toast({
                            description: 'Session expired. Signup again',
                        })
                        navigate('/signup')
                    } else if (status === 409) {
                        toast({
                            description: 'User already Registered',
                        })
                        navigate('/')
                    } else if (status === 429) {
                        toast({
                            description:
                                'Too many attempts. Try after 15 mins.',
                        })
                    } else if (status === 500) {
                        toast({
                            description: 'Server Error try again',
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
                setIsResendDisabled(false)
                setIsOtpResending(false)
            }
        } else {
            try {
                setIsResendDisabled(true)
                setOtpString(Array(6).fill(''))
                setIsOtpResending(true)
                const response = await authService.forgotPassword(email)
                if (response.status === 201) {
                    toast({
                        description: 'OTP resent to registered email address.',
                    })
                }
            } catch (error) {
                if (error.response) {
                    const status = error.response.status
                    const message =
                        error.response.data?.message || 'An error occurred'

                    if (status === 400) {
                        setErrors({ email: 'Email address not registered' })
                        toast({
                            description: 'Email address not registered',
                        })
                    } else if (status === 401) {
                        toast({
                            description: 'Session expired. Try again',
                        })
                        navigate('/signup')
                    } else if (status === 429) {
                        toast({
                            description:
                                'Too many attempts. Try after 10 mins.',
                        })
                    } else if (status === 500) {
                        toast({
                            description: 'Server Error try again',
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
                setIsOtpResending(false)
                setIsResendDisabled(false)
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

                <PrimaryButtonComponent type='submit' disabled={isLoading}>
                    <div>
                        {isLoading ? (
                            <span
                                className={
                                    otpVerificationStyles.spinning_loader
                                }>
                                <SpinnerLoaderComponent />
                            </span>
                        ) : null}
                    </div>
                    <span
                        className={
                            otpVerificationStyles.verify_button_state_text
                        }>
                        {isLoading ? 'Verifying...' : 'Verify OTP'}
                    </span>
                </PrimaryButtonComponent>

                <div className={otpVerificationStyles.resend_otp_container}>
                    <p>Didn't receive the code? </p>
                    {isOtpResending ? (
                        <p className={otpVerificationStyles.resend_otp_button}>
                            Resending...
                        </p>
                    ) : (
                        <ButtonComponent
                            className={otpVerificationStyles.resend_otp_button}
                            onClick={handleResendOtp}
                            disabled={isResendDisabled}>
                            {isResendDisabled
                                ? `Resend in ${formatCountdown()}`
                                : 'Resend OTP'}
                        </ButtonComponent>
                    )}
                </div>

                <ButtonComponent
                    className={otpVerificationStyles.back_button}
                    onClick={handleBack}>
                    <BackSvg />
                    <span>Back</span>
                </ButtonComponent>
            </form>
        </div>
    )
}

export default VerifyOTPPage
