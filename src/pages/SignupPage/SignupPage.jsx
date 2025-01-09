import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import FormInputComponent from '../../elements/FormInputComponent/FormInputComponent'
import AppLogo from '../../assets/images/opportune_logo_svg.svg'

import signupStyles from './SignupPage.module.css'
import PrimaryButtonComponent from '../../elements/PrimaryButtonComponent/PrimaryButtonComponent'
import { validateSignupInputs } from '../../utils/authenticationFieldsValidation'
import PasswordStrengthBar from 'react-password-strength-bar'
import ButtonComponent from '../../elements/ButtonComponent/ButtonComponent'
import authService from '../../services/authService'
import SpinnerLoaderComponent from '../../loaders/SpinnerLoaderComponent/SpinnerLoaderComponent'
import GoogleSvg from '@/svg/GoogleSvg/GoogleSvg'
import GithubSvg from '@/svg/GithubSvg/GithubSvg'
import { toast } from '@/hooks/use-toast'

function SignupPage() {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
    })

    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        setErrors((prev) => ({ ...prev, [name]: '' }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)

        const { isValid, errors: validationErrors } = validateSignupInputs(
            formData.name,
            formData. username,
            formData.email,
            formData.password
        )
        if (isValid) {
            try {
                const response = await authService.signup(formData)
                if (response.status === 201 && response.data) {
                    setFormData({ name: '', email: '', password: '' })
                    setErrors({})
                    navigate('/verify-otp', {
                        state: {
                            isSignup: true,
                            email: formData.email,
                        },
                    })
                    toast({
                        description: 'OTP sent to your email. Please check your inbox.',
                    })
                }
            } 
            catch (error) {
                if (error.response) {
                    const status = error.response.status
                    const message = error.response.data?.message || "An error occurred"
          
                    if (status === 409) {
                        setErrors({ email: 'User already exists' })
                        toast({
                            description: 'User already exists. Login to continue',
                        })
                    } 
                    else if (status === 403) {
                        navigate('/verify-otp', {
                            state: {
                                isSignup: true,
                                email: formData.email,
                            },
                        })
                        toast({
                            description: 'OTP already sent.',
                        })
                    } 
                    else if (status === 500) {
                        toast({
                            description: 'Server error, please try again later',
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
                        description: 'Network error. Please check your connection and try again.',
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
        } 
        else {
            setErrors(validationErrors)
            setIsLoading(false)
        }
    }

    const handleGoogleSignUpAuth = async () => {
        try {
            
        } 
        catch (error) {
            console.log(error)
            console.log(error?.response?.data)
        }
    }

    const handleGithubSignUpAuth = async() => {
        try {
            
        } 
        catch (error) {
            console.log(error)
            console.log(error?.response?.data)
        }
    }

    const handleUsernameInputChange = async (event) => {
        const newUsername = event.target.value
        setFormData((prev) => ({
            ...prev,
            username: newUsername,
        }))
    
        if (newUsername !== null) {
            try {
                const response = await authService.checkUserName(newUsername);
                if (response.status === 200 && response.data) {
                    setErrors((prev) => ({username: "" }))
                }
            } 
            catch (error) {
                if (error.response) {
                    const status = error.response.status;
                    const message = error.response.data?.message || "An error occurred"

                    if (status === 409) {
                        setErrors({username: "User Name already taken. Try different one"})
                    }
                    else if (status === 400) {
                        setErrors({username: message})
                    }
                }
            }
        }
    };
    

    return (
        <div className={signupStyles.container}>
            <form
                className={signupStyles.form}
                onSubmit={handleSubmit}
                noValidate>
                <img
                    src={AppLogo}
                    className={signupStyles.app_logo}
                    alt='Better Auth Logo'
                />
                <h1 className={signupStyles.title}>Create account</h1>
                <p className={signupStyles.subtitle}>
                    Already have an account?
                    <Link to='/login' className={signupStyles.login_link}>
                        Login
                    </Link>
                </p>

                <FormInputComponent
                    id='name'
                    name='name'
                    type='text'
                    value={formData.name}
                    placeholder=' '
                    label='Name'
                    autoComplete='name'
                    onChange={handleInputChange}
                    error={errors.name}
                />

                <FormInputComponent
                    id='username'
                    name='username'
                    type='text'
                    value={formData.username}
                    placeholder=' '
                    label='User Name'
                    autoComplete='username'
                    onChange={handleUsernameInputChange}
                    error={errors.username}
                />

                <FormInputComponent
                    id='email'
                    name='email'
                    type='email'
                    value={formData.email}
                    placeholder=' '
                    label='Email'
                    autoComplete='email'
                    onChange={handleInputChange}
                    error={errors.email}
                />
                <div className={signupStyles.password_container}>
                    <FormInputComponent
                        id='password'
                        name='password'
                        type='password'
                        value={formData.password}
                        placeholder=' '
                        label='Password'
                        autoComplete='password'
                        onChange={handleInputChange}
                        error={errors.password}
                    />
                </div>
                {formData.password && (
                    <PasswordStrengthBar
                        password={formData.password}
                        className={signupStyles.strengthBar}
                    />
                )}

                <PrimaryButtonComponent
                    type='submit'
                    disabled={isLoading}>
                    <div>
                        {
                            isLoading ? (
                                <span className={signupStyles.spinning_loader}>
                                    <SpinnerLoaderComponent />
                                </span>
                            ) : null
                        }
                    </div>
                    <span className={signupStyles.signin_button_state_text}>
                        {isLoading ? ' Sending OTP...' : 'Signup'}
                    </span>
                </PrimaryButtonComponent>
                <div className={signupStyles.social_buttons_container}>
                    <ButtonComponent
                        type='button'
                        className={signupStyles.social_button}
                        onClick={handleGoogleSignUpAuth}
                    >
                        <GoogleSvg/>
                        Signup with Google  
                    </ButtonComponent>

                    <ButtonComponent
                        type='button'
                        className={signupStyles.social_button}
                        onClick={handleGithubSignUpAuth}
                    >
                        <GithubSvg/>
                        Signup with Github  
                    </ButtonComponent>
                </div>
            </form>
        </div>
    )
}

export default SignupPage
