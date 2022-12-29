// Lib
import { useSelector } from 'react-redux'
import { useChartProps } from '../customHooks/useChartProps'

// Module
import { loadCharts, setProps } from '../store/actions/bitcoin.action'

// Cmps
import { Chart } from '../components/Chart'

export const StatisticsPage = () => {
    const charts = useSelector(state => state.bitcoinModule.charts)

    const [register] = useChartProps(setProps, loadCharts)

    if (!charts) return <div>Loading...</div>
    return (
        <section className='statistics-page'>
            <div className="actions flex column center">
                <div className="statistics-control">
                    <span className="label flex center">Duration</span>
                    <button {...register('span', 'timespan=1months')}>1 month</button>
                    <button {...register('span', 'timespan=3months')}>3 months</button>
                    <button {...register('span', 'timespan=6months')}>6 months</button>
                    <button {...register('span', 'timespan=1years')}>1 year</button>
                    <button {...register('span', 'timespan=3years')}>3 years</button>
                </div>
                <div className="statistics-control">
                    <span className="label flex center">Average</span>
                    <button {...register('avg', 'rollingAverage=1hours')}>1 hour</button>
                    <button {...register('avg', 'rollingAverage=1days')}>1 day</button>
                    <button {...register('avg', 'rollingAverage=1weeks')}>1 week</button>
                    <button {...register('avg', 'rollingAverage=2weeks')}>2 weeks</button>
                    <button {...register('avg', 'rollingAverage=30days')}>30 days</button>
                </div>
            </div>
            {Object.keys(charts).map(chart => (<Chart chart={charts[chart]} key={chart} />))}
        </section>
    )
}