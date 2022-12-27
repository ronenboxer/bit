import './assets/style/main.scss'
import './pages/HomePage'
import { Component } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadContacts } from './store/actions/contact.action'
import { login , logout} from './store/actions/user.action'
import { loadCharts } from './store/actions/bitcoin.action'


import { HomePage } from './pages/HomePage'
import { ContactPage } from './pages/ContactPage'
import { ContactDetailsPage } from './pages/ContactDetailsPage'
import { StatisticsPage } from './pages/StatisticPage'
import { ContactEditPage } from './pages/ContactEditPage'
import { AppHeader } from './components/AppHeader'
import { SignPage } from './pages/SignPage'



export class _App extends Component {

    componentDidMount() {
        this.props.loadContacts()
        this.props.loadCharts()
        this.props.login()
    }

    render() {
        return (
            <Router>

                <section className="main-app">
                    <AppHeader logout={this.props.logout} user={this.props.user}/>
                    <main className='container'>
                        <Switch>
                            <Route path="/contact/edit/:id?" component={ContactEditPage} />
                            <Route path="/contact/:id" component={ContactDetailsPage} />
                            <Route path="/contact" component={ContactPage} />
                            <Route path="/stats" component={StatisticsPage} />
                            <Route path="/sign" component={SignPage} />
                            <Route path="/" component={HomePage} />
                        </Switch>
                    </main>

                    <footer>
                    </footer>

                </section>
            </Router>
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
    loadCharts,
    login,
    logout
}
export const App = connect(mapStateToProps, mapDispatchToProps)(_App)