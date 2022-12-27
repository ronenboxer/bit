import { Component } from 'react'
import { Chart } from '../components/Chart'
import { connect } from 'react-redux'
import { loadContacts, removeContact, setFilter, saveContact } from '../store/actions/contact.action'
import { transfer, login, signup } from '../store/actions/user.action'
import { setChartProps, loadCharts } from '../store/actions/bitcoin.action'
import { TransactionList } from '../components/TransactionList'

class _HomePage extends Component {

    componentDidMount() {
        this.props.loadContacts()
        this.props.loadCharts()
    }

    render() {
        const { user, rate, charts } = this.props
        if (!user) return this.props.history.push('/sign')
        if (!rate || !charts) return <div>Loading...</div>
        const usd = (user.balance * rate).toLocaleString()
        const { transfers } = this.props.user
        const transactions = transfers?.length > 5
            ? transfers.slice(-5)
            : transfers
        const transactionsTitle = transactions.length
            ? transactions.length + ' last transactions'
            : 'No transactions yet'
        return (
            <section className='home-page'>
                <div className="details">
                    <h1 className="user-name capitalize">Hi {user.name}</h1>
                    <section className="user-stats flex between">
                        <div className="balance">
                            <h5 className="sub-header">Current balance</h5>
                            <p className="upper bitcoin">Bit: <mark>&#8383; {user.balance.toLocaleString()}</mark></p>
                            <p className="upper usd">Usd: <mark>$ {usd}</mark></p>
                        </div>
                        <div className="rate">
                            <h5 className="sub-header">Current BTC USD</h5>
                            <p className="curr-rate">$ {rate.toLocaleString()}</p>
                        </div>
                    </section>
                </div>

                {charts && <Chart chart={charts.marketPrice} />}
                <TransactionList transactions={transactions} contacts={this.props.contacts} rate={rate} title={transactionsTitle}/>
            </section>
        )
    }
}

const mapStateToProps = state => ({
    contacts: state.contactModule.contacts,
    filterBy: state.contactModule.filterBy,
    charts: state.bitcoinModule.charts,
    chartProps: state.bitcoinModule.chartProps,
    rate: state.bitcoinModule.rate,
    user: state.userModule.loggedInUser
})

const mapDispatchToProps = {
    loadContacts,
    removeContact,
    saveContact,
    setFilter,
    transfer,
    login,
    signup,
    setChartProps,
    loadCharts
}

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(_HomePage)