import React, { useState, useEffect } from 'react'
import { Logo, FormRow, Alert } from '../components'
import { useMyContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true,
}


const Register = () => {
    const [values, setValues] = useState(initialState)
    const { showAlert, displayAlert, registerUser, loginUser, isLoading, user, token } = useMyContext()
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [user, navigate, token])


    const toggleMember = () => setValues({ ...values, isMember: !values.isMember })

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { name, email, password, isMember } = values
        if (!email || !password || (!isMember && !name)) {
            displayAlert()
            return
        }

        const currentUser = { name, email, password }
        if (isMember) {
            loginUser(currentUser)
        } else {
            registerUser(currentUser)
        }
    }

    const handleChange = e => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    return (
        <main className='register-main'>
            <form className='form-box' onSubmit={handleSubmit}>
                <Logo />
                <h3 className='form-title'>{values.isMember ? 'Login' : 'Register'}</h3>

                {showAlert && <Alert />}

                {!values.isMember && <FormRow name='name' type='text' value={values.name} handleChange={handleChange} labelText="Name" />}
                <FormRow name='email' type='email' value={values.email} handleChange={handleChange} labelText="Email" />
                <FormRow name='password' type='password' value={values.password} handleChange={handleChange} labelText="Password" />

                <button type='submit' className='btn submit-btn' disabled={isLoading}>Submit</button>
                <p>
                    {values.isMember ? 'Not a member yet?' : 'Already a member?'}
                    <button className='login-btn' type='button' onClick={toggleMember} >{values.isMember ? 'Register' : 'Login'}
                    </button>
                </p>

            </form>
        </main>
    )
}

export default Register