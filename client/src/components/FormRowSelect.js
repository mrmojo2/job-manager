import React from 'react'

const FormRowSelect = ({ name, labelText, options, value, handleChange }) => {
    return (
        <div className='form-row'>
            <label htmlFor={name}>
                {labelText || name}
            </label>
            <select
                name={name}
                value={value}
                onChange={handleChange}
            >
                {options.map((o, i) => {
                    return (
                        <option key={i} value={o}>{o}</option>
                    )
                })}
            </select>
        </div>
    )
}

export default FormRowSelect