import React from 'react'
import { FaBars } from 'react-icons/fa'
import Logo from '../components/Logo'
import { useMyContext } from '../context/AppContext'

const Navbar = () => {
    const { toggleSidebar, logoutUser } = useMyContext()

    return (
        <nav>
            <div className='nav-center'>
                <button onClick={() => toggleSidebar()} className='toggle-btn'><FaBars /></button>
                <h3 className='dash-head'>Dashboard</h3>
                <Logo />
                <button className='landing-btn logout-btn' onClick={logoutUser}>Logout</button>
            </div>
        </nav>
    )
}

export default Navbar