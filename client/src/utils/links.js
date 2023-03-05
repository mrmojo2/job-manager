import { FaChartBar, FaWpforms } from 'react-icons/fa'
import { BsFillBriefcaseFill } from 'react-icons/bs'
import { ImProfile } from 'react-icons/im'

const linkList = [
    {
        to: '/',
        icon: <FaChartBar />,
        name: 'Stats'
    },
    {
        to: 'all-jobs',
        icon: <BsFillBriefcaseFill />,
        name: 'All Jobs'
    },
    {
        to: 'add-job',
        icon: <FaWpforms />,
        name: 'Add Job'
    },
    {
        to: 'profile',
        icon: <ImProfile />,
        name: 'Profile'
    }
]

export default linkList