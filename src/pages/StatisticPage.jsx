// Lib
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import { useEffectOnUpdate } from '../customHooks/useEffectOnUpdate'
// import { useState } from 'react'

// Module
// import { loadCharts, setProps } from '../store/actions/bitcoin.action'

// Cmps
import { Chart } from '../components/Chart'
// import { useChartProps } from '../customHooks/useChartProps'

export const StatisticsPage = () => {

    const charts = useSelector(state => state.bitcoinModule.charts)
    const navigate = useNavigate()
    const user = useSelector(state => state.userModule.loggedInUser)

    useEffect(() => {
        if (!user) navigate('/sign')
    }, [user])

    // const [register] = useChartProps(useSelector(state => state.bitcoinModule.chartProps), setProps, loadCharts)

    // useEffectOnUpdate(() => {
    //     console.log(`charts`, charts)
    // }, [useSelector(state => state.bitcoinModule.charts)])



    if (!charts) return <div>Loading...</div>
    return (
        <section className='stats-page'>
            {/* <div className="actions">
                <div>
                    <button {...register('span','timespan=1months')}>1 month</button>
                    <button {...register('span','timespan=3months')}>3 months</button>
                    <button {...register('span','timespan=6months')}>6 months</button>
                    <button {...register('span','timespan=1years')}>1 year</button>
                    <button {...register('span','timespan=3years')}>3 years</button>
                </div>
                <div>
                    <button {...register('avg','rollingAverage=1days')}>1 day</button>
                    <button {...register('avg','rollingAverage=1weeks')}>1 week</button>
                    <button {...register('avg','rollingAverage=2weeks')}>2 weeks</button>
                    <button {...register('avg','rollingAverage=30days')}>30 days</button>
                </div>
            </div> */}
            {Object.keys(charts).map(chart => (<Chart chart={charts[chart]} key={chart} />))}
        </section>
    )
}
