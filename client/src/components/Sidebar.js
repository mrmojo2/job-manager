import React from 'react'
import Logo from './Logo'
import { NavLink } from 'react-router-dom'
import { useMyContext } from '../context/AppContext'
import linkList from '../utils/links'

const Sidebar = () => {
    const { showSidebar } = useMyContext()
    return (
        <aside className={showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'}>
            <div className='make-fixed'>
                <header>
                    <Logo />
                </header>
                <div className='nav-links'>
                    {linkList.map((link, i) => {
                        const { to, icon, name } = link
                        return (
                            <NavLink to={to} key={i} style={({ isActive }) => { return { color: isActive ? '#2CB1BC' : '#627D98' } }}>{icon}{name}</NavLink>
                        )
                    })}
                </div>
            </div>
        </aside>
    )
}

export default Sidebar