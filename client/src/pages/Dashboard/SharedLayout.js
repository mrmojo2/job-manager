import React from 'react'
import styled from 'styled-components'
import { Outlet } from 'react-router-dom'
import { Navbar, Popup, Sidebar } from '../../components/'

const SharedLayout = () => {
    return (
        <Wrapper>
            <main className='dashboard'>
                <Popup />
                <Sidebar />
                <div>
                    <Navbar />
                    <Outlet />
                </div>
            </main>
        </Wrapper>
    )
}

const Wrapper = styled.section`
    .dashboard{
        /* height:100%; */
        display:grid;
        grid-template-columns: auto 1fr;
    }

    .sidebar-container{
        width:250px;
        height:100%;
        min-height:100vh;
        background:white;
        margin-left:-250px;
        transition: all 0.3s linear;
    }

    .sidebar-container header{
        padding-left:2rem;
        display:flex;
        align-items:center;
        height: 96px;
    }

    .make-fixed{
        position:sticky;
        top:0;
    }

    .nav-links{
        display:flex;
        flex-direction:column;
        justify-content:center;
        padding-top:2rem;

    }

    .nav-links a{
        height:56px;
        padding:1rem 0 1rem 2.5rem;
        display:flex;
        align-items:center;
        gap:0.5rem;
        color:#627D98;
        transition:all 0.3s linear;
    }

    .nav-links svg{
        font-size:1.5rem;
        /* color:#627D98; */
    }
    .nav-links a:hover{
        background:#F0F4F8;
        padding-left:3rem;
    }

    .nav-links a:hover svg{
        color:#2CB1BC;
    }



    .toggle-btn{
        background:transparent;
        border-style:none;
        font-size:2rem;
        color: #2CB1BC;
    }
    .show-sidebar{
        margin-left:0;
    }
    nav{
        width: 100%;
        height:96px;
        background:white;
        display:flex;
        justify-content:center;
        align-items:center;
        position:sticky;
        top:0px;
        border-bottom:1px solid #D8DBDF;
    }
    .nav-center{
        width:90%;
        display:flex;
        align-items:center;
        justify-content:space-between;
    }

    .nav-center img{
        width: 100px;   
    }

    .logout-btn{
        background: #25a5af;
        padding:0.5rem 1.5rem;
        border:none;
        border-radius:5px;
        color:white;
        cursor: pointer;
    }
    .logout-btn:hover {
        background: #02616a;
    }

    .popupbar{
        position:fixed;
        width: 100vw;
        height: 100%;
        display:flex;
        align-items:center;
        justify-content:center;
        display:none;
        background: rgba(106, 103, 103,0.95);
        z-index:99;
    }

    .show-popup{
        display:flex;
    }

    .popup-container{
        width:80vw;
        max-width:1170px;
        background: white;
        height:90vh;
        display:flex;
        align-items:center;
        /* justify-content:center; */
        flex-direction:column;
        border-radius:10px;
        position:relative;
    }

    .popup-container header{
        margin-top:2rem;
    }

    .nav-links-2{
        margin-top:2rem;
    }

    .nav-links-2 a{
        height:56px;
        display:flex;
        align-items:center;
        gap:0.5rem;
        color:#627D98;
        transition:all 0.3s linear;
    }

    .nav-links-2 svg{
        font-size:1.5rem;
        
    }

    .nav-links-2 a:hover svg{
        color:#2CB1BC;
    }
    
    .close-popup{
        position:absolute;
        top:1rem;
        left:1rem;
        background:transparent;
        border-style:none;
        color:red;
        font-size:1.75rem;
    }

    .page-contents{
        padding-top: 2rem;
        border-left:1px solid #D8DBDF; 
    }

    @media screen and (min-width: 1000px){
        .popupbar{
            display:none;
        }
        .nav-center img{
            display:none;
        }
    }

    @media screen and (max-width:1000px){
        .sidebar-container{
            display:none
        }
        .dashboard{
            grid-template-columns: 1fr;
        }
        .dash-head{
            display:none;
        }

        .logout-btn{
            padding: 0.25rem 0.5rem;
            font-size:1rem;
        }        
    }
`
export default SharedLayout