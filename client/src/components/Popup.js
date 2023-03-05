import React, { useEffect } from 'react'
import Logo from './Logo'
import { FaTimes } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { useMyContext } from '../context/AppContext'
import linkList from '../utils/links'


const Popup = () => {
    const { showSidebar, toggleSidebar } = useMyContext()
    return (
        <aside className={!showSidebar ? 'popupbar show-popup' : 'popupbar'}>
            <div className='popup-container'>
                <header>
                    <Logo />
                </header>
                <div className='nav-links-2'>
                    {linkList.map((link, i) => {
                        const { to, icon, name } = link
                        return (
                            <NavLink to={to} key={i} onClick={toggleSidebar} style={({ isActive }) => { return { color: isActive ? '#2CB1BC' : '#627D98' } }}>{icon}{name}</NavLink>
                        )
                    })}
                </div>
                <button className='close-popup' onClick={toggleSidebar}>
                    <FaTimes />
                </button>
            </div>
        </aside>
    )
}

export default Popup