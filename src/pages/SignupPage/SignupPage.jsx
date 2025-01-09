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

function SignupPage() {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
    })

    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [isUsernameAvailable, setIsUsernameAvailable] = useState(false)
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
                console.log(formData)
                const response = await authService.signup(formData)
                console.log(response)
                if (response.status === 201 && response.data) {
                    setFormData({ name: '', email: '', password: '' })
                    setErrors({})
                    navigate('/verify-otp', {
                        state: {
                            isSignup: true,
                            email: formData.email,
                        },
                    })
                    // toast.success(
                    //     'OTP sent to your email. Please check your inbox.'
                    // )
                }
            } catch (error) {
                console.error('Signup error:', error)
                console.log(error?.response?.status)
                console.log(error?.response?.data?.message)

                if (error.response) {
                    const status = error.response.status
                    const message = error.response.data?.message || "An error occurred"
          
                    if (status === 409) {
                        setErrors({ email: 'User already exists' })
                        console.log("User already Exists")
                        // toast.error("User already exists. Login to continue")
                    } else if (status === 403) {
                        console.log("Otp already sent" + message)
                        navigate('/verify-otp', {
                            state: {
                                isSignup: true,
                                email: formData.email,
                            },
                        })
                        // toast.error("OTP already sent.")
                    } else if (status === 500) {
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
        } else {
            setErrors(validationErrors)
            setIsLoading(false)
        }
    }

    const handleGoogleSignUpAuth = async () => {
        try {
            
        } catch (error) {
            console.log(error)
            console.log(error?.response?.data)
        }
    }

    const handleGithubSignUpAuth = async() => {
        try {
            
        } catch (error) {
            console.log(error)
            console.log(error?.response?.data)
        }
    }

    const handleUsernameInputChange = async (event) => {
        const newUsername = event.target.value; // Use the event value directly
        setFormData((prev) => ({
            ...prev,
            username: newUsername,
        }));
    
        if (newUsername !== null) { // Check the new value
            try {
                const response = await authService.checkUserName(newUsername);
                console.log(response);
                if (response.status === 200 && response.data) {
                    console.log("success")
                    setErrors((prev) => ({username: "" })); // Clear username error
                    setIsUsernameAvailable(true); // Indicate username is available
                }
            } catch (error) {
                if (error.response) {
                    const status = error.response.status;
                    const message = error.response.data?.message || "An error occurred";
    
                    if (status === 409) {
                        setErrors({username: "User Name already taken. Try different one"})
                        setIsUsernameAvailable(false);
                        console.log("Username already exists");
                    } else if (status === 400) {
                        setErrors({username: message})
                        console.log("error: " + message);
                    } else if (status === 500) {
                        console.log("Server error: " + message);
                    } else {
                        console.log(`Error ${status}: ${message}`);
                    }
                } else if (error.request) {
                    console.log("Network error. Please check your connection.");
                } else {
                    console.log("Unexpected error occurred. Please try again later.");
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

                {
                    formData.username &&
                    <div>
                        {/* {
                            isUsernameAvailable 
                            ?
                            <p className={signupStyles.success}>User Name Available</p>
                            :
                            <p className={signupStyles.error}>User Name is not availabe</p>
                        } */}
                    </div>
                }

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
                        <svg
                            className={signupStyles.social_icon}
                            viewBox='0 0 24 24'>
                            <path
                                d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                                fill='#4285F4'
                            />
                            <path
                                d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                                fill='#34A853'
                            />
                            <path
                                d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                                fill='#FBBC05'
                            />
                            <path
                                d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                                fill='#EA4335'
                            />
                        </svg>
                        Signup with Google  
                    </ButtonComponent>

                    <ButtonComponent
                        type='button'
                        className={signupStyles.social_button}
                        onClick={handleGithubSignUpAuth}
                    >
                        <svg
                            className={signupStyles.social_icon}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            fill="currentColor"
                            >
                            <path
                                d="M12 .5C5.65.5.5 5.65.5 12c0 5.07 3.29 9.36 7.85 10.87.57.1.78-.24.78-.55 0-.27-.01-1.16-.02-2.1-3.2.69-3.88-1.54-3.88-1.54-.52-1.32-1.28-1.67-1.28-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.76 2.68 1.25 3.33.95.1-.74.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.28 1.18-3.08-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.15 1.18a10.98 10.98 0 0 1 2.88-.39c.98.01 1.97.13 2.88.39 2.18-1.49 3.14-1.18 3.14-1.18.62 1.57.23 2.73.11 3.02.74.8 1.18 1.82 1.18 3.08 0 4.42-2.68 5.39-5.24 5.67.41.36.77 1.07.77 2.15 0 1.55-.01 2.8-.01 3.18 0 .31.21.66.79.55A10.5 10.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"
                            />
                        </svg>

                        Signup with Github  
                    </ButtonComponent>
                </div>
            </form>
        </div>
    )
}

export default SignupPage
