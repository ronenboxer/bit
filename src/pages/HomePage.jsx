// Lib
import { useSelector } from 'react-redux'
import { Chart } from '../components/Chart'

// Cmps
import { TransactionList } from '../components/TransactionList'

export const HomePage = () => {

    const user = useSelector(state => state.userModule.loggedInUser)
    const contacts = useSelector(state => state.contactModule.contacts)
    const rate = useSelector(state => state.bitcoinModule.rate)
    const charts = useSelector(state => state.bitcoinModule.charts)

    if (!rate || !charts) return <div>Loading...</div>
    const usd = (user.balance * rate).toLocaleString()
    const transactions = user.transfers?.length > 5
        ? user.transfers.slice(-5)
        : user.transfers
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
            <TransactionList transactions={transactions} contacts={contacts} rate={rate} title={transactionsTitle} isRouterNav={true} />
        </section>
    )
}