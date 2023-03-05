import React from 'react'
import { Logo } from '../components'
import main from '../assets/images/main.svg'
import { useNavigate } from 'react-router-dom'


const Landing = () => {
  const navigate = useNavigate()
  const navigateToLogin = (e) => {
    e.preventDefault()
    navigate('/register')
  }

  return (
    <main>
      <nav className='container'>
        <Logo />
      </nav>
      <div className='container landing-page'>
        <div className='landing-info'>
          <h1 className='landing-heading'>Job <span>Tracking</span>  App</h1>
          <p>Are you unemployed because you studied engineering? <br /> Do you have dementia? <br /> Then this is the best app to keep track of all of the jobs you are applying for! <br />You won't use this app ever again after finding a job</p>
          <button className='btn landing-btn' onClick={navigateToLogin}>login/Register</button>
        </div>
        <img src={main} alt="" className='landing-img' />
      </div>
    </main>
  )
}

export default Landing
