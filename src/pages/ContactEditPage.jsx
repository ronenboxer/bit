import { contactService } from '../services/contact.service'
import { Component } from 'react'
import { connect } from 'react-redux'
import { loadContacts, removeContact, setFilter, saveContact } from '../store/actions/contact.action'

class _ContactEditPage extends Component {

    state = {
        contact: null,
    }

    componentDidMount() {
        this.props.loadContacts()
        const id = this.props.match.params.id
        if (id) this.loadContact(id)
        else this.setState({
            contact: contactService.getEmptyContact()
        })
    }

    loadContact = id => {
        const contact = this.props.contacts.find(contact => contact._id === id)
        if (contact) this.setState({ contact })
        else this.props.history.push('/contact')
    }

    editContact = ({ target }) => {
        this.setState(prevState => {
            const initials = target.name === 'name'
                ? target.value.trim().split(' ').map(word => word.charAt[0]).join('').toUpperCase()
                : prevState.contact.initials || prevState.contact.name.trim().split(' ').map(word => word.charAt[0]).join('').toUpperCase()
            return { contact: { ...prevState.contact, [target.name]: target.value, initials } }
        })
    }

    saveContact = async ev => {
        ev.preventDefault()
        try {
            const contact = await this.props.saveContact({ ...this.state.contact })
            if (!this.state.contact._id) this.props.history.replace('/contact/edit/' + contact._id)
            this.setState({ contact })
            this.props.history.replace('/contact/' + contact._id)
        } catch (err) {
            console.log(`err`, err)
        }
    }

    removeContact = () => {
        try {
            this.props.removeContact(this.state.contact._id)
            this.props.history.push('/contact')
        } catch (err) {

        }
    }


    onBack = () => { this.props.history.push('/contact/' + this.state.contact._id || '') }

    imgInvalid = ev => {
        const element = ev.target
        element.outerHTML = ` <div className="avatar">${this.state.contact.initials}</div>`
        element.onError = null
    }

    render() {
        if (!this.props.user) return this.props.history.push('/sign')
        const { contact } = this.state
        if (!contact) return <div>Loading...</div>
        const url = `https://robohash.org/${contact.name}?set=set5`

        return (
            <section className="edit-contact">
                <div className="actions flex between align-center">
                    <button className="btn flex cetner" onClick={this.onBack}>Back</button>
                    {contact._id && <button className="btn flex cetner" onClick={this.removeContact}><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21V6H4V4h5V3h6v1h5v2h-1v15Zm2-2h10V6H7Zm2-2h2V8H9Zm4 0h2V8h-2ZM7 6v13Z" /></svg></button>}
                </div>
                <form onSubmit={this.saveContact}>
                    <img className="avatar" src={url} alt={contact.initials} onError={this.imgInvalid} />
                    <input onChange={this.editContact} type="text" name='name' value={contact.name} className="input block name" placeholder='Contact name' />
                    <input onChange={this.editContact} type="text" name='phone' value={contact.phone} className="input block phone" placeholder='Contact phone' />
                    <input onChange={this.editContact} type="text" name='email' value={contact.email} className="input block email" placeholder='Contact email' />
                    <button className="btn flex center" >{contact._id
                        ? <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="m10 16.4l-4-4L7.4 11l2.6 2.6L16.6 7L18 8.4Z" /></svg>
                        : <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M11.975 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.125-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2q1.2 0 2.388.3q1.187.3 2.312.875q.375.2.463.612q.087.413-.188.763q-.25.325-.65.425q-.4.1-.75-.1q-.85-.425-1.75-.65Q12.925 4 12 4Q8.675 4 6.338 6.337Q4 8.675 4 12t2.338 5.663Q8.675 20 12 20q.725 0 1.375-.113q.65-.112 1.25-.337q.325-.125.638-.012q.312.112.562.387q.325.375.188.838q-.138.462-.638.662q-.775.275-1.625.425q-.85.15-1.775.15ZM9.9 15.9l-2.875-2.875q-.275-.275-.262-.688q.012-.412.287-.687q.275-.275.7-.275q.425 0 .7.275l2.15 2.15l9.325-9.35q.275-.275.688-.263q.412.013.687.288q.275.275.275.7q0 .425-.275.7L11.3 15.9q-.275.275-.7.275q-.425 0-.7-.275ZM20 20q-.425 0-.712-.288Q19 19.425 19 19v-2h-2q-.425 0-.712-.288Q16 16.425 16 16t.288-.713Q16.575 15 17 15h2v-2q0-.425.288-.713Q19.575 12 20 12t.712.287Q21 12.575 21 13v2h2q.425 0 .712.287q.288.288.288.713t-.288.712Q23.425 17 23 17h-2v2q0 .425-.288.712Q20.425 20 20 20Z" /></svg>}</button>
                </form>
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
    saveContact
}

export const ContactEditPage = connect(mapStateToProps, mapDispatchToProps)(_ContactEditPage)