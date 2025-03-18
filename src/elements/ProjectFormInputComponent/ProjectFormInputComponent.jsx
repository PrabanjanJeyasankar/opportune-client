import React, { useState } from 'react'

const ProjectFormInputComponent = ({ fields, onSubmit }) => {
    const [formData, setFormData] = useState(
        fields.reduce(
            (acc, field) => ({
                ...acc,
                [field.name]: field.initialValue || '',
            }),
            {}
        )
    )

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (onSubmit) onSubmit(formData)
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Project Details</h2>
            {fields.map(({ id, name, type, placeholder, label, required }) => (
                <div key={id || name} className='form-group'>
                    <input
                        id={id || name}
                        name={name}
                        type={type || 'text'}
                        value={formData[name]}
                        placeholder={placeholder}
                        className='form-input'
                        onChange={handleChange}
                        required={required}
                    />
                </div>
            ))}
            <button type='submit'>Submit</button>
        </form>
    )
}

export default ProjectFormInputComponent
