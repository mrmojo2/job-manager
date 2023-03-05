import React from 'react'
import styled from 'styled-components'
import { FaLocationArrow, FaCalendarAlt, FaBriefcase } from 'react-icons/fa'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { useMyContext } from '../context/AppContext'

const SingleJob = ({ _id, company, position, jobType, jobLocation, status, createdAt }) => {
    const { setEditJob, deleteJob } = useMyContext()

    let date = moment(createdAt)
    date = date.format('MMM Do, YYYY')
    return (
        <Wrapper>
            <header>
                <div className='main-icon'>{company.charAt(0).toUpperCase()}</div>
                <div className='info'>
                    <h5>{position}</h5>
                    <p>{company}</p>
                </div>
            </header>
            <div className='content'>
                <div className='content-center'>
                    <div><FaLocationArrow />{jobLocation}</div>
                    <div><FaCalendarAlt />{date}</div>
                    <div><FaBriefcase />{jobType}</div>
                    <div>
                        <p className={`status ${status}`}>{status}</p>
                    </div>
                </div>
            </div>
            <div className='btn-div'>
                <Link to='/add-job'>
                    <button className='edit-btn' onClick={() => { setEditJob(_id) }}>edit</button>
                </Link>
                <button type='button' className='delete-btn' onClick={() => { deleteJob(_id) }}>delete</button>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.article.attrs({ className: 'single-job' })`

    header{
        padding:1rem;
        display:grid;
        grid-gap:1rem;
        grid-template-columns: 60px 1fr;
        align-items:center;
        border-bottom: 1px solid #9FB1C3;
    }
    .info h5{
        font-weight:400;
        letter-spacing:0px;
        margin-bottom:0.5rem;
        font-family: 'Roboto Condensed', sans-serif;
        font-weight: 500;
    }
    .info p{
        color:#9FB1C3;
        text-transform:capitalize;
    }

    .content{
        padding:1rem;
    }

    .content-center{
        display:grid;
        grid-gap:1rem;
        grid-template-columns: 1fr;
        row-gap:1rem;
    }
    .content-center>div{
        display:flex;
        align-items:center;
        gap:0.5rem;
        margin-top:0.5rem;
        text-transform:capitalize;
    }
    .content-center svg{
        color:#9FB1C3;
    }

    .btn-div{
        padding:0 1rem;
        padding-bottom:1rem;
        margin-top:1rem;
    }
    .btn-div button{
        margin-right:0.7rem;
        border:none;
        padding:0.35rem 0.8rem;
        text-transform:capitalize;
        border-radius:5px;
        cursor:pointer;
        box-shadow:0 2px 2px grey;
        transition:all 0.1s linear;
    }
    button:hover{
        box-shadow:0 2px 4px grey;
    }

    .edit-btn{
        background:#D1E7DD;
        color:#1E5C40;
    }

    .delete-btn{
        background: rgb(255, 188, 188);
        color: rgb(108, 23, 23);
    }

    .main-icon{
        height:60px;
        display:flex;
        align-items:center;
        justify-content:center;
        background:#2CB1BC;
        color:white;
        font-size:1.75rem;
        border-radius:5px
    }

    .status{
        padding:0.5rem 1rem;
        text-transform: capitalize;
        border-radius:5px;
    }

    .declined{
        background:#FFEEEE;
        color:#D66A6A;
    }

    .pending{
        background:#FCEFC7;
        color:#E9B949;
    }
    .interview{
        background:#E0E8F9;
        color:#8799D8;
    }
    
    @media screen and (min-width:576px) {
        .content-center{
            grid-template-columns:1fr 1fr;
        }
    }
    @media screen and (min-width:992px) {
        .content-center{
            grid-template-columns:1fr;
        }
    }
    @media screen and (min-width:1120px) {
        .content-center{
            grid-template-columns:1fr 1fr;
        }
    }
`

export default SingleJob