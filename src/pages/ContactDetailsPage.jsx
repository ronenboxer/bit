// Lib
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Module
import { removeContact } from '../store/actions/contact.action'
import { transfer } from '../store/actions/user.action'

// Cmps
import { TransactionList } from '../components/TransactionList'

export const ContactDetailsPage = () => {
    const [contact, setContact] = useState(null)
    const [funds, setFunds] = useState('')
    const user = useSelector(state => state.userModule.loggedInUser)
    const contacts = useSelector(state => state.contactModule.contacts)
    const rate = useSelector(state => state.bitcoinModule.rate)
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        loadContact()
    }, [params.id, user])

    const loadContact = async () => {
        const contact = contacts?.find(anyContact => anyContact._id === params.id)
        setContact(contact)
    }

    const deleteContact = async () => {
        dispatch(removeContact(contact._id))
        navigate('/contact')
    }

    const onEdit = () => {
        navigate(`/contact/edit/${contact._id}`)
    }

    const transferFunds = ev => {
        ev.preventDefault()
        const { balance } = user
        if (funds > +balance || +balance <= 0) return
        dispatch(transfer(funds, contact._id))
        setFunds(funds)
    }

    const updateFunds = ({ target }) => {
        let { value } = target || null
        const { balance } = user
        if (+value < 0) value = 0
        else if (+value > +balance) value = +balance
        setFunds(value)
    }

    const onBack = () => { navigate('/contact') }

    const imgInvalid = ev => {
        const element = ev.target
        element.outerHTML = ` <div className="avatar">${contact.initials}</div>`
        element.onError = null
    }

    if (!contact) return <div>Loading...</div>

    const balance = user.balance.toLocaleString()
    const url = `https://robohash.org/${contact.name}?set=set5`

    return (
        <section className="contact-details relative">

            <div className="control">
                <div className="switch-contact flex between">
                    <Link to={`/contact/${contact.prevContactId}`} className="flex align-center"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g transform="translate(24 0) scale(-1 1)"><path fill="none" stroke="currentColor" strokeWidth="2" d="m7 2l10 10L7 22" /></g></svg></Link>
                    <Link to={`/contact/${contact.nextContactId}`} className="flex align-center"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="2" d="m7 2l10 10L7 22" /></svg></Link>
                </div>
                <button className="btn-back" onClick={onBack}>Back</button>
            </div>

            <div className="contact flex column align-center">
                <div className="contact-avatar relative">
                    <img className="avatar" src={url} alt={contact.initials} onError={imgInvalid} />
                    <div className="actions absolute flex center">
                        <button className="flex center" onClick={deleteContact}><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21V6H4V4h5V3h6v1h5v2h-1v15Zm2-2h10V6H7Zm2-2h2V8H9Zm4 0h2V8h-2ZM7 6v13Z" /></svg></button>
                        <button className="flex center" onClick={onEdit}><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M5 19h1.4l8.625-8.625l-1.4-1.4L5 17.6ZM19.3 8.925l-4.25-4.2l1.4-1.4q.575-.575 1.413-.575q.837 0 1.412.575l1.4 1.4q.575.575.6 1.388q.025.812-.55 1.387ZM4 21q-.425 0-.712-.288Q3 20.425 3 20v-2.825q0-.2.075-.387q.075-.188.225-.338l10.3-10.3l4.25 4.25l-10.3 10.3q-.15.15-.337.225q-.188.075-.388.075ZM14.325 9.675l-.7-.7l1.4 1.4Z" /></svg></button>
                    </div>
                </div>
                <div className="details">
                    <h2 className="name">{contact.name}</h2>
                    <h3 className="phone">{contact.phone}</h3>
                    <h3 className="email">{contact.email}</h3>
                    <form className="transfer flex" onSubmit={transferFunds}>
                        <input type="number" onChange={updateFunds} value={funds} placeholder={`Max: BTC ${balance.toLocaleString()}`} />
                        <button>Transfer</button>
                    </form>
                </div>
            </div>

            <TransactionList transactions={user.transfers.filter(transfer => transfer.to === params.id || transfer.from === params.id)} contacts={contacts} rate={rate} title={'Transactions history'} />
        </section>
    )
}