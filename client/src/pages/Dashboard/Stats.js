import React from 'react'
import styled from 'styled-components'
import { MdPendingActions } from 'react-icons/md'
import { GoCalendar, GoTrashcan } from 'react-icons/go'
import { useMyContext } from '../../context/AppContext'
import { Loading } from '../../components'

const Stats = () => {
    const { isLoading, getStats, pending, interview, declined } = useMyContext()

    React.useEffect(() => {
        getStats()
    }, [])

    if (isLoading) {
        return <Wrapper>
            <Loading />
        </Wrapper>
    }

    return (
        <Wrapper>
            <section>
                <article className='stats-article orange'>
                    <header>
                        <h2>{pending}</h2>
                        <MdPendingActions />
                    </header>
                    <h5>Pending Applications</h5>
                </article>
                <article className='stats-article blue'>
                    <header>
                        <h2>{interview}</h2>
                        <GoCalendar />
                    </header>
                    <h5>Meetings Scheduled</h5>
                </article>
                <article className='red'>
                    <header>
                        <h2>{declined}</h2>
                        <GoTrashcan />
                    </header>
                    <h5>Jobs Declined</h5>
                </article>
            </section>
        </Wrapper>
    )
}

const Wrapper = styled.div.attrs({ className: 'page-contents' })`
    section{
        display:grid;
        grid-template-columns: repeat(auto-fit,minmax(340px,1fr));
        grid-auto-rows:190px;
        grid-gap: 1rem;
        width:90%;
        margin: 0 auto;
    }

    article{
        background:white;
        display:grid;
        grid-template-rows: 3fr 1fr;
        padding:2rem;
    }


    article>header{
        display:flex;
        justify-content:space-between;
        align-items:center;
        font-size:2.5rem;
    }

    article h2{
        font-size:3rem;
    }

    article svg{
        border-radius:5px;
        box-sizing:content-box;
        padding:1rem;
    }

    .orange{
        border-bottom: 0.5rem solid #E9B949;
    }
    .blue{
        border-bottom: 0.5rem solid #647ACB;
    }
    .red{
        border-bottom: 0.5rem solid #D66A6A;
    }

    .orange h2{
        color:#E9B949;
    }
    .orange svg{
        background:#FCEFC7;
        color:#E9B949;
    }
    .blue h2{
        color:#647ACB;
    }
    .blue svg{
        background:#E0E8F9;
        color:#647ACB;
    }
    .red h2{
        color:#D66A6A;
    }
    .red svg{
        background:#FFEEEE;
        color:#D66A6A;
    }
    
`

export default Stats