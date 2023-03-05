import React, { useState } from 'react'
import styled from 'styled-components'
import { FormRow, FormRowSelect, JobsContainer } from '../../components'
import { useMyContext } from '../../context/AppContext'

const selectOptions = {
    status: ['all', 'pending', 'interview', 'declined'],
    type: ['all', 'full-time', 'part-time', 'internship', 'remote'],
    sort: ['latest', 'oldest', 'a-z', 'z-a']
}

const AllJobs = () => {
    const { getAllJobs, search, handleChange, sort, queryStatus, queryType } = useMyContext()
    const [localSearch, setLocalSearch] = useState('')

    const debounce = () => {
        let timeoutID;
        return (e) => {
            setLocalSearch(e.target.value);
            clearTimeout(timeoutID);
            timeoutID = setTimeout(() => {
                handleChange({ name: e.target.name, value: e.target.value });
            }, 1000);
        };
    };
    const optimizedDebounce = React.useMemo(() => debounce(), []);


    const handleInput = (e) => {
        const name = e.target.name
        const value = e.target.value
        handleChange({ name, value })
    }

    React.useEffect(() => {
        getAllJobs()
    }, [search, sort, queryStatus, queryType])

    return (
        <Wrapper>
            <section className='search-form'>
                <form>
                    <h4>Search Form</h4>
                    <div className='form-center'>
                        <FormRow labelText='Search' type='text' name='search' value={localSearch} handleChange={optimizedDebounce} />
                        <FormRowSelect name='queryStatus' labelText='Status' options={selectOptions.status} value={queryStatus} handleChange={handleInput} />
                        <FormRowSelect name='queryType' labelText='Type' options={selectOptions.type} value={queryType} handleChange={handleInput} />
                        <FormRowSelect name='sort' labelText='Sort' options={selectOptions.sort} value={sort} handleChange={handleInput} />
                        <button className='clear-btn' type='button'>clear filter</button>
                    </div>
                </form>
            </section>
            <JobsContainer />
        </Wrapper>
    )
}

const Wrapper = styled.div.attrs({ className: 'page-contents' })`
    .search-form{
        width:90%;
        background: white;
        margin:0 auto;
        padding:2rem;
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
        background:#F8D7DA;
        color:#842029;
        border-style:none;
        height: 2rem;
        cursor:pointer;
        border-radius: 5px;
        transition: all 0.3s linear
    }
    .clear-btn:hover{
        background:#800000;
        color:white;
    }

    .job-section{
        width: 90%;
        margin:0 auto;
        margin-top:3rem;
        margin-bottom:3rem;
    }

    .job-section h5{
        letter-spacing:0.5px;
        font-weight:500;
    }
    .job-container{
        display:grid;
        grid-gap: 1rem;
        margin-top:1.5rem;
    }

    .single-job{
        background:white;
        border-radius:5px;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),0 10px 10px -5px rgba(0, 0, 0, 0.04);

    }

    @media screen and (min-width:1000px){
        .form-center{
            grid-template-columns: 1fr 1fr 1fr;
        }
        .job-container{
            grid-template-columns: 1fr 1fr;
        }
    }
`

export default AllJobs