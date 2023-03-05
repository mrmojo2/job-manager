import React from 'react'
import { Navigate } from 'react-router-dom'
import { useMyContext } from '../context/AppContext'
import { Loading } from '../components'

const ProtectedRoute = ({ children }) => {
    const { user, userLoading } = useMyContext()

    if (userLoading) {
        return (
            <Loading />
        )
    }

    if (!user) {
        return (
            <Navigate to='/landing' />
        )
    }
    return children

}

export default ProtectedRoute