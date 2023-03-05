import React from 'react'
import styled from 'styled-components'
import { Alert, FormRow, FormRowSelect } from '../../components'
import { useMyContext } from '../../context/AppContext'

const AddJobs = () => {

    const { displayAlert, isEditing, showAlert, position, company, jobType, status, jobLocation, handleChange, clearForm, isLoading, createJob, editJob } = useMyContext()

    const selectOptions = {
        status: ['pending', 'interview', 'declined'],
        type: ['full-time', 'part-time', 'internship', 'remote'],
    }

    const handleJobInput = e => {
        const name = e.target.name
        const value = e.target.value
        handleChange({ name, value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!position || !company || !jobLocation) {
            displayAlert()
            return
        }
        if (isEditing) {
            editJob()
            return
        }
        createJob()
    }


    return (
        <Wrapper>
            <section className='add-form'>
                <form>
                    <h4>{isEditing ? 'Edit Job' : 'Add Job'}</h4><br />
                    {showAlert && <Alert />}
                    <div className='form-center'>

                        <FormRow labelText='Position' type='text' name='position' value={position} handleChange={handleJobInput} />

                        <FormRow labelText='Company' type='text' name='company' value={company} handleChange={handleJobInput} />

                        <FormRow labelText='Job location' type='text' name='jobLocation' value={jobLocation} handleChange={handleJobInput} />

                        <FormRowSelect labelText='Status' name='status' options={selectOptions.status} value={status} handleChange={handleJobInput} />

                        <FormRowSelect name='jobType' labelText='Job Type' options={selectOptions.type} value={jobType} handleChange={handleJobInput} />

                        <div className='btn-div'>
                            <button type='submit' className='btn btn-submit' onClick={handleSubmit} disabled={isLoading}>{isLoading ? 'Creating job...' : 'submit'}</button>
                            <button className='btn clear-btn' type='button' onClick={clearForm}>clear</button>
                        </div>

                    </div>
                </form>
            </section>
        </Wrapper>
    )
}

const Wrapper = styled.div.attrs({ className: 'page-contents' })`
    .add-form{
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

    .btn-div{
        display:grid;
        grid-template-columns:1fr 1fr;
        grid-gap:1rem;
    }

    .clear-btn{
        background:#627D98;
        color:white;
        border-style:none;
        height: 2rem;
        cursor:pointer;
        border-radius: 5px;
        transition: all 0.3s linear
    }
    .clear-btn:hover{
        background:black;
        color:white;
    }
    
    .btn-submit{
        background:#2CB1BC;
    }

    @media screen and (min-width:1000px){
        .form-center{
            grid-template-columns: 1fr 1fr 1fr;
        }
    }
    @media screen and (max-width:500px) {
        .form-center{
            grid-gap:0.25rem;
        }
    }
`

export default AddJobs