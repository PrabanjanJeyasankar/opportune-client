import React, { useState } from 'react'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import EyeShowSVG from '../../svg/EyeShowSVG/EyeShowSVG'
import EyeHideSVG from '../../svg/EyeHideSVG/EyeHideSVG'
import formInputStyles from './FormInputComponent.module.css'

const FormInputComponent = ({
    id,
    name,
    type = 'text',
    value,
    placeholder,
    label,
    onChange,
    error,
    containerClass,
    inputClass,
    labelClass,
    errorClass,
    ...props
}) => {

    const [showPassword, setShowPassword] = useState(false)
    
    const togglePasswordVisibility = (event) => {
        event.preventDefault()
        setShowPassword((prev) => !prev)
    }

    return (
        <div className={formInputStyles.form_input_container}>
            <div className={formInputStyles.input_group}>
                <div className='w-full h-full'>
                    <input
                        type={type === 'password' ? showPassword ? 'text' : 'password' : type}
                        id={id}
                        name={name}
                        className={formInputStyles.input}
                        value={value}
                        placeholder={placeholder}
                        onChange={onChange}
                        {...props}
                    />
                    <label htmlFor={id} className={formInputStyles.label}>
                        {label}
                    </label>
                </div>
                {
                    type === 'password' 
                    &&
                    <ButtonComponent
                        onClick={togglePasswordVisibility}
                        className={formInputStyles.eye_icon}>
                        {showPassword ? 
                            <EyeShowSVG/>
                            : 
                            <EyeHideSVG/>
                        }
                    </ButtonComponent>
                }
                                
            </div>
            {error && <p className={formInputStyles.error}>{error}</p>}
        </div>
    )
}

export default FormInputComponent
