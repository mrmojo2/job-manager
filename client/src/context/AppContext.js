import React, { useContext, useEffect, useReducer } from 'react'
import { DISPLAY_ALERT, REMOVE_ALERT, REGISTER_USER_BEGIN, REGISTER_USER_SUCCESS, REGISTER_USER_ERROR, LOGIN_USER_SUCCESS, TOGGLE_SIDEBAR, LOGOUT_USER, UPDATE_USER_SUCCESS, UPDATE_USER_FAIL, HANDLE_CHANGE, CLEAR_FORM, CREATE_JOB_BEGIN, CREATE_JOB_FAIL, CREATE_JOB_SUCCESS, GET_JOBS_BEGIN, GET_JOBS_SUCCESS, SET_EDIT_JOB, EDIT_JOB_BEGIN, EDIT_JOB_SUCCESS, DELETE_JOB_BEGIN, EDIT_JOB_FAIL, GET_STATS_BEGIN, GET_STATS_SUCCESS, GET_USER_SUCCESS, GET_USER_BEGIN } from "./actions"
import reducer from './reducer'
import axios from 'axios'

// const user = localStorage.getItem('user')
const token = localStorage.getItem('token')
// const location = localStorage.getItem('location')


export const initialState = {
    userLoading: true,
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: null,
    token: token,
    userLocation: '',
    jobLocation: '',
    showSidebar: true,
    isEditing: false,
    editJobId: '',
    position: '',
    company: '',
    jobType: 'full-time',
    status: 'pending',
    sort: 'latest',
    search: '',
    queryStatus: 'all',
    queryType: 'all',
    jobs: [],
    totalJobs: 0,
    page: 1,
    numOfPages: 1,
    pending: null,
    interview: null,
    delclined: null,
}

const AppContext = React.createContext()

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const authFetch = axios.create({
        baseURL: '/api/v1'
    })

    authFetch.interceptors.request.use(
        (config) => {
            config.headers.Authorization = `Bearer ${state.token}`
            return config
        },
        (error) => {
            return Promise.reject(error)
        }
    )

    authFetch.interceptors.response.use(
        (res) => {
            return res
        },
        (error) => {
            console.log(error.response)
            if (error.response.status === 401) {
                logoutUser()
            }
            return Promise.reject(error)
        })






    const displayAlert = () => {
        dispatch({ type: DISPLAY_ALERT })
    }

    const hideAlert = () => {
        dispatch({ type: REMOVE_ALERT })
    }

    const toggleSidebar = () => {
        dispatch({ type: TOGGLE_SIDEBAR })
    }

    const logoutUser = () => {
        dispatch({ type: LOGOUT_USER })
        localStorage.clear()
    }

    const handleChange = (payload) => {
        dispatch({ type: HANDLE_CHANGE, payload })
    }

    const clearForm = () => {
        dispatch({ type: CLEAR_FORM })
    }

    const addUserToLocalStorage = ({ user, token, location }) => {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
        localStorage.setItem('location', location)
    }

    const registerUser = async (currentUser) => {
        dispatch({ type: REGISTER_USER_BEGIN })
        try {
            const resp = await axios.post(`/api/v1/auth/register`, currentUser)
            const { user, location, token } = resp.data
            dispatch({ type: REGISTER_USER_SUCCESS, payload: { token } })
            localStorage.setItem('token,token')
        } catch (error) {
            dispatch({ type: REGISTER_USER_ERROR, payload: error.response.data })
            // console.log(error.response.data)
        }
    }
    const loginUser = async (currentUser) => {
        dispatch({ type: REGISTER_USER_BEGIN })
        try {
            const resp = await axios.post('/api/v1/auth/login', currentUser)
            const { user, location, token } = resp.data
            dispatch({ type: LOGIN_USER_SUCCESS, payload: { token } })
            localStorage.setItem('token', token)
        } catch (error) {
            dispatch({ type: REGISTER_USER_ERROR, payload: error.response.data })
            // console.log(error.response)
        }
    }

    const updateUser = async (currentUser) => {
        dispatch({ type: REGISTER_USER_BEGIN })
        try {
            const { data } = await authFetch.patch('auth/updateUser', currentUser)
            dispatch({ type: UPDATE_USER_SUCCESS, payload: data })
            localStorage('token', token)
        } catch (error) {
            if (error.response.status !== 401) {
                dispatch({ type: UPDATE_USER_FAIL, payload: error.response.data })
            }
            // console.log(error.response.data)
        }
    }

    const createJob = async () => {
        dispatch({ type: CREATE_JOB_BEGIN })
        try {
            const { company, position, jobLocation, status, jobType } = state
            await authFetch.post('/jobs', {
                company, position, jobLocation, status, jobType
            })
            dispatch({ type: CREATE_JOB_SUCCESS })
            clearForm()
        } catch (error) {
            if (error.response.status === 401) return
            dispatch({ type: CREATE_JOB_FAIL, payload: error.response.data })
        }
    }

    const getAllJobs = async () => {
        const { queryStatus, queryType, sort, search } = state
        let url = `/jobs?status=${queryStatus}&type=${queryType}&sort=${sort}&search=${search}`

        dispatch({ type: GET_JOBS_BEGIN })
        try {
            const { data } = await authFetch.get(url)
            dispatch({ type: GET_JOBS_SUCCESS, payload: data })
        } catch (error) {
            console.log(error.response)
            // logoutUser()
        }
    }

    const setEditJob = (id) => {
        console.log(`set edit job ${id}`)
        dispatch({ type: SET_EDIT_JOB, payload: { id } })
    }

    const editJob = async () => {
        dispatch({ type: EDIT_JOB_BEGIN })
        try {
            const { editJobId, position, company, jobLocation, status, jobType } = state
            await authFetch.patch(`/jobs/${editJobId}`, { position, company, jobLocation, status, jobType })
            dispatch({ type: EDIT_JOB_SUCCESS })
            clearForm()
        } catch (error) {
            if (error.response.status === 401) return
            dispatch({ type: EDIT_JOB_FAIL, payload: error.response.data })
        }
    }

    const deleteJob = async (id) => {
        dispatch({ type: DELETE_JOB_BEGIN })
        try {
            await authFetch.delete(`/jobs/${id}`)
            getAllJobs()
        } catch (error) {
            console.log(error.response)
            // logoutUser()
        }
    }

    const getStats = async () => {
        dispatch({ type: GET_STATS_BEGIN })
        try {
            const { data } = await authFetch.get('/jobs/stats')
            dispatch({ type: GET_STATS_SUCCESS, payload: data })
        } catch (error) {
            console.log(error.response)
        }
    }

    const getUser = async () => {
        dispatch({ type: GET_USER_BEGIN })
        try {
            const { data } = await authFetch.get('/auth/getUser')
            dispatch({ type: GET_USER_SUCCESS, payload: data })
        } catch (error) {
            logoutUser()
        }
    }

    useEffect(() => {
        getUser()
    }, [state.token])


    return (
        <AppContext.Provider value={{ ...state, displayAlert, hideAlert, registerUser, loginUser, toggleSidebar, logoutUser, updateUser, handleChange, clearForm, createJob, getAllJobs, setEditJob, deleteJob, editJob, getStats, getUser }}>
            {children}
        </AppContext.Provider>
    )
}

export const useMyContext = () => {
    return useContext(AppContext)
}