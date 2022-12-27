// import { contactService } from '../services/contact.service'
// import { userService } from '../services/user.service'

import { connect } from 'react-redux'
import { loadContacts, removeContact, setFilter } from '../store/actions/contact.action'
import { Component } from 'react'
import { ContactList } from '../components/ContactList'
import { ContactFilter } from '../components/ContactFilter'

class _ContactPage extends Component {

    componentDidMount() {
        this.props.loadContacts()
    }

    setFilter = event => {
        const filterBy = {
            term: event?.target?.value || '',
            excludedIds: this.props?.user?._id
                ? [this.props?.user?._id]
                : null
        }
        // this.setState({filterBy})
        this.props.setFilter(filterBy)
    }

    render() {
        if (!this.props.user) return this.props.history.push('/sign')
        const { contacts } = this.props
        if (!contacts) return <div>Loading...</div>
        return (
            <section>

                <ContactFilter setFilter={this.setFilter} filterBy={this.props.filterBy} />

                <ContactList contacts={this.props.contacts} />

            </section>
        )
    }
}

const mapStateToProps = state => ({
    contacts: state.contactModule.contacts,
    filterBy: state.contactModule.filterBy,
    user: state.userModule.loggedInUser
})

const mapDispatchToProps = {
    loadContacts,
    removeContact,
    setFilter,
}

export const ContactPage = connect(mapStateToProps, mapDispatchToProps)(_ContactPage)