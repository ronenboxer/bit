import { Component } from 'react'
import { connect } from 'react-redux'
import { loadContacts, removeContact, setFilter, saveContact } from '../store/actions/contact.action'
import { transfer, login, signup } from '../store/actions/user.action'
import { setChartProps, loadCharts } from '../store/actions/bitcoin.action'



class _SignPage extends Component {

    state = {
        username: '',
        name: '',
        isSignup: false
    }

    componentDidMount() {
    }

    toggleSignState = value => {
        this.setState({ isSignup: value })
    }

    updateState = ({ target }) => {
        const { name: key, value } = target
        this.setState({ [key]: value })
    }

    signIn = () => {
        this.props.login(this.state.name)
        this.props.history.push('/')
    }

    signUp = () => {
        const user = {
            name: this.state.name,
            username: this.state.username
        }
        this.props.signup(user)
        this.signIn()
    }

    render() {
        if (this.props.user) return this.props.history.push('/')
        const { isSignup } = this.state
        return (
            <section className='sign-page column flex center absolute center'>
                <div className="action">
                    <button onClick={() => this.toggleSignState(false)} className={isSignup ? 'btn-sign' : 'btn-sign active'} >Sign in</button>
                    <button onClick={() => this.toggleSignState(true)} className={isSignup ? 'btn-sign active' : 'btn-sign'}>Sign up</button>
                </div>
                {isSignup
                    ? <form className="credentials" onSubmit={this.signUp}>
                        <div className="flex between">
                            <label>Full name</label>
                            <input onChange={this.updateState} type="text" name="name" />
                        </div>
                        <div className="flex between">
                            <label>Username</label>
                            <input onChange={this.updateState} type="text" name="username" />
                        </div>
                    </form>
                    : <form className="credentials" onSubmit={this.signIn}>
                        <div className="flex between">
                            <label>Full name</label>
                            <input onChange={this.updateState} type="text" name="name" />
                        </div>
                    </form>
                }
                {isSignup
                    ? <button className="btn-submit" onClick={this.signUp}>Sign up</button>
                    : <button className="btn-submit" onClick={this.signIn}>Sign in</button>}

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

export const SignPage = connect(mapStateToProps, mapDispatchToProps)(_SignPage)