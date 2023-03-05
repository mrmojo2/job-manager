import React, { useState } from 'react'
import styled from 'styled-components'
import { Alert, FormRow } from '../../components'
import { useMyContext } from '../../context/AppContext'

const Profile = () => {
    const { user, updateUser, showAlert, displayAlert, isLoading } = useMyContext()
    const [values, setValues] = useState({
        name: user?.name,
        lastname: user?.lastname,
        email: user?.email,
        location: user?.location
    })

    const handleChange = e => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    const handleSubmit = e => {
        e.preventDefault()
        const { name, lastname, email, location } = values
        if (!name || !lastname || !email || !location) {
            displayAlert()
            return
        }
        updateUser(values)
    }

    return (
        <Wrapper>
            <section className='profile-form'>
                <form onSubmit={handleSubmit}>
                    <h5>Profile</h5> <br />
                    {showAlert && <Alert />}
                    <div className='form-center'>
                        <FormRow labelText='Name' type='text' name='name' value={values.name} handleChange={handleChange} />
                        <FormRow labelText='Last Name' type='text' name='lastname' value={values.lastname} handleChange={handleChange} />
                        <FormRow labelText='Email' type='text' name='email' value={values.email} handleChange={handleChange} />
                        <FormRow labelText='Location' type='text' name='location' value={values.location} handleChange={handleChange} />
                        <button type='submit' className='clear-btn' disabled={isLoading} >{isLoading ? 'loading...' : 'save changes'}</button>
                    </div>
                </form>
            </section>
        </Wrapper>
    )
}

const Wrapper = styled.div.attrs({ className: 'page-contents' })`
    .profile-form{
        width:90%;
        background: white;
        margin:0 auto;
        padding:2rem;
        margin-top:2rem;
        margin-bottom:3rem;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),0 10px 10px -5px rgba(0, 0, 0, 0.04);

    }
    .form-center{
        display:grid;
        grid-template-columns: repeat(auto-fit,minmax(200px,1fr));
        grid-gap:1rem;
        align-items:center;
        margin-top:2rem;
    }
    .clear-btn{
        background:#2CB1BC;
        color:white;
        border-style:none;
        height: 2rem;
        cursor:pointer;
        border-radius: 5px;
        transition: all 0.3s linear
    }
    .clear-btn:hover{
        background: #025961;
        color:white;
}

    @media screen and (min-width:1000px){
        .form-center{
            grid-template-columns: 1fr 1fr 1fr;
        }
    }
`

export default Profile