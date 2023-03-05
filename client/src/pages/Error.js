import React from 'react'
import notfound from '../assets/images/not-found.svg'
import { Link } from 'react-router-dom'

const Error = () => {
    return (
        <main className='error-main'>
            <div className='error-div'>
                <img src={notfound} alt="Not Found" />
                <h3>Ohh! Page Not Found</h3>
                <p>We can't seem to find the page youre looking for</p>
                <Link to='/'>Back Home</Link>
            </div>
        </main>
    )
}

export default Error