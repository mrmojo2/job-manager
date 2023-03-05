import React, { useEffect } from 'react'
import { useMyContext } from '../context/AppContext'

const Alert = () => {
    const { alertText, alertType, hideAlert } = useMyContext()

    useEffect(() => {
        console.log('infinite loop check')
        const timeout = setTimeout(hideAlert, 2000)
        return () => {
            clearTimeout(timeout)
        }
    }, [hideAlert])

    return (
        <div className={`alert ${alertType}`}>
            <p className='alert-text'>{alertText}</p>
        </div>
    )
}

export default Alert