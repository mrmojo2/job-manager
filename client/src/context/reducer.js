import { DISPLAY_ALERT, REMOVE_ALERT, REGISTER_USER_BEGIN, REGISTER_USER_SUCCESS, REGISTER_USER_ERROR, LOGIN_USER_SUCCESS, TOGGLE_SIDEBAR, LOGOUT_USER, UPDATE_USER_SUCCESS, UPDATE_USER_FAIL, HANDLE_CHANGE, CLEAR_FORM, CREATE_JOB_SUCCESS, CREATE_JOB_BEGIN, CREATE_JOB_FAIL, GET_JOBS_BEGIN, GET_JOBS_SUCCESS, SET_EDIT_JOB, EDIT_JOB_BEGIN, EDIT_JOB_SUCCESS, DELETE_JOB_BEGIN, EDIT_JOB_FAIL, GET_STATS_BEGIN, GET_STATS_SUCCESS, GET_USER_SUCCESS, GET_USER_BEGIN } from "./actions"
import { initialState } from "./AppContext"

const reducer = (state, action) => {
    if (action.type === DISPLAY_ALERT) {
        return ({
            ...state,
            showAlert: true,
            alertText: 'please provide all value',
            alertType: 'danger',
        })
    }
    if (action.type === REMOVE_ALERT) {
        return ({
            ...state,
            showAlert: false,
            alertText: '',
            alertType: '',
        })
    }
    if (action.type === REGISTER_USER_BEGIN) {
        return ({
            ...state,
            isLoading: true,
        })
    }
    if (action.type === REGISTER_USER_SUCCESS) {
        return ({
            ...state,
            isLoading: false,
            token: action.payload.token,
        })
    }
    if (action.type === LOGIN_USER_SUCCESS) {
        return ({
            ...state,
            isLoading: false,
            token: action.payload.token,
        })
    }
    if (action.type === REGISTER_USER_ERROR) {
        return ({
            ...state,
            isLoading: false,
            showAlert: true,
            alertText: action.payload.msg,
            alertType: 'danger'
        })
    }

    if (action.type === TOGGLE_SIDEBAR) {
        return ({
            ...state,
            showSidebar: !state.showSidebar
        })
    }

    if (action.type === LOGOUT_USER) {
        return ({
            ...initialState,
            userLoading: false,
            user: null,
            token: null,
            userLocation: '',
            jobLocation: '',
        })
    }

    if (action.type === UPDATE_USER_SUCCESS) {
        return ({
            ...state,
            isLoading: false,
            token: action.payload.token,
            showAlert: true,
            alertText: 'User Successfully Updated!!',
            alertType: 'success'
        })
    }

    if (action.type === UPDATE_USER_FAIL) {
        return ({
            ...state,
            isLoading: false,
            showAlert: true,
            alertText: action.payload.msg,
            alertType: 'danger'
        })
    }

    if (action.type === HANDLE_CHANGE) {
        return ({
            ...state,
            [action.payload.name]: action.payload.value
        })
    }

    if (action.type === CLEAR_FORM) {
        return ({
            ...state,
            isEditing: false,
            editJobId: '',
            position: '',
            company: '',
            jobLocation: state.userLocation,
            jobType: 'full-time',
            status: 'pending',
        })
    }

    if (action.type === CREATE_JOB_BEGIN) {
        return ({
            ...state,
            isLoading: true,

        })
    }
    if (action.type === CREATE_JOB_SUCCESS) {
        return ({
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'success',
            alertText: 'New Job Created'
        })
    }
    if (action.type === CREATE_JOB_FAIL) {
        return ({
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg
        })
    }

    if (action.type === GET_JOBS_BEGIN) {
        return ({
            ...state,
            isLoading: true,
            showAlert: false,
        })
    }
    if (action.type === GET_JOBS_SUCCESS) {
        return ({
            ...state,
            isLoading: false,
            jobs: action.payload.jobs,
            totalJobs: action.payload.totalJobs,
            numOfPages: action.payload.numOfPages
        })
    }
    if (action.type === SET_EDIT_JOB) {
        const job = state.jobs.find(each => each._id === action.payload.id)
        const { _id, position, company, jobLocation, jobType, status } = job
        return ({
            ...state,
            isEditing: true,
            editJobId: _id,
            position,
            company,
            jobLocation,
            jobType,
            status,
        })
    }

    if (action.type === EDIT_JOB_BEGIN) {
        return ({
            ...state,
            isLoading: true,
        })
    }
    if (action.type === EDIT_JOB_SUCCESS) {
        return ({
            ...state,
            isLoading: false,
            showAlert: true,
            alertText: 'Job Updated Successfully!',
            alertType: 'success'
        })
    }
    if (action.type === EDIT_JOB_FAIL) {
        return ({
            ...state,
            isLoading: false,
            showAlert: true,
            alertText: action.payload.msg,
            alertType: 'danger'
        })
    }

    if (action.type === DELETE_JOB_BEGIN) {
        return ({
            ...state,
            isLoading: true,
        })
    }

    if (action.type === GET_STATS_BEGIN) {
        return ({
            ...state,
            isLoading: true,
        })
    }
    if (action.type === GET_STATS_SUCCESS) {
        return ({
            ...state,
            isLoading: false,
            pending: action.payload.pending,
            interview: action.payload.interview,
            declined: action.payload.declined,
        })
    }
    if (action.type === GET_USER_BEGIN) {
        return ({
            ...state,
            userLoading: true,
        })
    }

    if (action.type === GET_USER_SUCCESS) {
        return ({
            ...state,
            user: action.payload.user,
            userLocation: action.payload.location,
            jobLocation: action.payload.location,
            userLoading: false,
        })
    }


    throw new Error(`action milena sathi! : ${action.type}`)
}

export default reducer