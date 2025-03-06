import { toast } from '@/hooks/use-toast'
import GithubSvg from '@/svg/GithubSvg/GithubSvg'
import GoogleSvg from '@/svg/GoogleSvg/GoogleSvg'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AppLogo from '../../assets/images/opportune_logo_svg.svg'
import ButtonComponent from '../../elements/ButtonComponent/ButtonComponent'
import FormInputComponent from '../../elements/FormInputComponent/FormInputComponent'
import PrimaryButtonComponent from '../../elements/PrimaryButtonComponent/PrimaryButtonComponent'
import useUserContext from '../../hooks/useUserContext'
import SpinnerLoaderComponent from '../../loaders/SpinnerLoaderComponent/SpinnerLoaderComponent'
import authService from '../../services/authService'
import { validateLoginInputs } from '../../utils/authenticationFieldsValidation'
import loginStyles from './LoginPage.module.css'

function LoginPage() {
    const { setIsUserLoggedIn } = useUserContext()
    const [formData, setFormData] = useState({
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
        const { isValid, errors: validationErrors } = validateLoginInputs(
            formData.email,
            formData.password
        )

        if (isValid) {
            try {
                const response = await authService.login(formData)
                if (response.status === 200) {
                    toast({
                        description: 'Logged in successfully.',
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

                    if (status === 401 && message === 'Invalid password') {
                        toast({
                            description: 'Incorrect password',
                        })
                    } else if (
                        status === 401 &&
                        message === 'Invalid email address'
                    ) {
                        toast({
                            description: 'User is not registered',
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
            setErrors(validationErrors)
            setIsLoading(false)
        }
    }

    const handleGoogleLogInAuth = async () => {
        const baseUrl = import.meta.env.VITE_API_BASE_URL
        window.location.href = `${baseUrl}/auth/google/login`
    }

    const handleGithubLogInAuth = async () => {
        const baseUrl = import.meta.env.VITE_API_BASE_URL
        window.location.href = `${baseUrl}/auth/github/login`
    }

    return (
        <div className={loginStyles.container}>
            <form
                className={loginStyles.form}
                onSubmit={handleSubmit}
                noValidate>
                <img
                    src={AppLogo}
                    className={loginStyles.app_logo}
                    alt='App Logo'
                />
                <h1 className={loginStyles.title}>Welcome Back!</h1>
                <p className={loginStyles.subtitle}>
                    Don&#39;t have an account?
                    <Link to='/signup' className={loginStyles.signup_link}>
                        Sign Up
                    </Link>
                </p>
                <FormInputComponent
                    id='email'
                    name='email'
                    type='email'
                    value={formData.email}
                    placeholder=' '
                    label='Email'
                    onChange={handleInputChange}
                    error={errors.email}
                    containerClass={loginStyles.inputGroup}
                    inputClass={loginStyles.input}
                    labelClass={loginStyles.label}
                    errorClass={loginStyles.error}
                />
                <div className={loginStyles.password_container}>
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
                <div className={loginStyles.forgot_password_container}>
                    <Link
                        to='/request-otp'
                        className={loginStyles.forgot_password}>
                        Forgot password?
                    </Link>
                </div>
                <PrimaryButtonComponent type='submit'>
                    <div>
                        {isLoading ? (
                            <span className={loginStyles.spinning_loader}>
                                <SpinnerLoaderComponent />
                            </span>
                        ) : null}
                    </div>
                    <span className={loginStyles.login_button_state_text}>
                        {isLoading ? 'Logging in...' : 'Login'}{' '}
                    </span>
                </PrimaryButtonComponent>

                <div className={loginStyles.continue_with_container}>
                    <div className={loginStyles.continue_with_stripe}></div>
                    <p className={loginStyles.continue_with_text}>
                        or continue with
                    </p>
                </div>

                <div className={loginStyles.socialButtonsContainer}>
                    <ButtonComponent
                        type='button'
                        className={loginStyles.socialButton}
                        onClick={handleGoogleLogInAuth}>
                        <GoogleSvg />
                        Signin with Google
                    </ButtonComponent>

                    <ButtonComponent
                        type='button'
                        className={loginStyles.socialButton}
                        onClick={handleGithubLogInAuth}>
                        <GithubSvg />
                        Signin with Github
                    </ButtonComponent>
                </div>
            </form>
        </div>
    )
}

export default LoginPage
