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
    helperText,
    containerClass,
    inputClass,
    labelClass,
    errorClass,
    helperTextClass,
    ...props
}) => {

    const [showPassword, setShowPassword] = useState(false)
    
    const togglePasswordVisibility = (event) => {
        event.preventDefault()
        setShowPassword((prev) => !prev)
    }

    return (
        <div className={formInputStyles.form_input_container}>
            <div className={formInputStyles.input_container}>
                <div className={formInputStyles.input_group}>
                    <div className={formInputStyles.input_label_container}>
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
                            type='button'
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
                {helperText && (
                    <p className={helperTextClass || formInputStyles.helperText}>{helperText}</p>
                )}
            </div>
        </div>
    )
}

export default FormInputComponent
