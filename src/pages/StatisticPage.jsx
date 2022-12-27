import { Component } from 'react'
import { Chart } from '../components/Chart'
import { connect } from 'react-redux'
import { setChartProps, loadCharts } from '../store/actions/bitcoin.action'

class _StatisticsPage extends Component {

    state = {
        marketPrice: null,
        avgBlockSize: null,
        tradeVolume: null,
    }

    componentDidMount() {
        this.props.loadCharts()
    }

    render() {
        if (!this.props.user) return this.props.history.push('/sign')
        const { charts} = this.props
        if (!charts) return <div>Loading...</div>
        return (
            <section className='stats-page'>
                {Object.keys(charts).map(chart => (<Chart chart={charts[chart]} key={chart}/>))}
            </section>
        )
    }
}

const mapStateToProps = state => ({
    charts: state.bitcoinModule.charts,
    chartProps: state.bitcoinModule.chartProps,
    rate: state.bitcoinModule.rate,
    user: state.userModule.loggedInUser
})

const mapDispatchToProps = {
    setChartProps,
    loadCharts
}

export const StatisticsPage = connect(mapStateToProps, mapDispatchToProps)(_StatisticsPage)