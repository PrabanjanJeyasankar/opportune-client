import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PrimaryButtonComponent from '../../elements/PrimaryButtonComponent/PrimaryButtonComponent'
import FormInputComponent from '../../elements/FormInputComponent/FormInputComponent'
import { validateEmail } from '../../utils/authenticationFieldsValidation'
import requestOtpStyles from './RequestOtpPage.module.css'
import AppLogo from '../../assets/images/opportune_logo_svg.svg'
import SpinnerLoaderComponent from '../../loaders/SpinnerLoaderComponent/SpinnerLoaderComponent'
import ButtonComponent from '../../elements/ButtonComponent/ButtonComponent'
import authService from '../../services/authService'
import BackSvg from '@/svg/BackSvg/BackSvg'
import { toast } from '@/hooks/use-toast'

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
                const response = await authService.forgotPassword(email)
                if (response.status === 201) {
                    toast({
                        description: 'OTP sent to your email. Please check your inbox.',
                    })
                    navigate('/verify-otp', {
                        state: {
                            email: email,
                        },
                    })
                }
            } 
            catch (error) {
                if (error.response) {
                    const status = error.response.status
                    const message = error.response.data?.message || "An error occurred"
          
                    if (status === 400) {
                        setErrors({ email: 'Email address not registered' })
                        toast({
                            description: 'Email address not registered',
                        })
                    } 
                    else if (status === 401) {
                        toast({
                            description: 'Session expired. Try again',
                        })
                        navigate("/signup")
                    } 
                    else if (status === 429) {
                        toast({
                            description: 'Too many attempts. Try again after 10 mins',
                        })
                    } 
                    else if (status === 500) {
                        toast({
                            description: 'Server Error try again',
                        })
                    } 
                    else {
                        toast({
                            description: `Error ${status}: ${message}`,
                        })
                    }
                } 
                else if (error.request) {
                    toast({
                        description: 'Network error. Please check your connection and try again',
                    })
                } 
                else {
                    toast({
                        description: 'Unexpected error occurred. Please try again later.',
                    })
                }
            }
            finally {
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

                <div className=''>
                    <FormInputComponent
                        type='email'
                        id='email'
                        value={email}
                        placeholder=' '
                        label='Email'
                        onChange={handleInputChange}
                        error={errors.email}
                    />
                </div>
                <PrimaryButtonComponent
                    type='submit'
                    disabled={isLoading}>
                    {
                        isLoading ? (
                            <span className={requestOtpStyles.spinning_loader}>
                                <SpinnerLoaderComponent />
                            </span>
                        ) : null
                    }
                    {isLoading ? 'Sending...' : 'Send OTP'}
                </PrimaryButtonComponent>
                
                <ButtonComponent
                    className={requestOtpStyles.back_button}
                    onClick={handleBack}>
                    <BackSvg/>
                    <span>Back</span>
                </ButtonComponent>
            </form>
        </div>
    )
}

export default RequestOtpPage