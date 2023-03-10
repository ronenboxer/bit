// Lib
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, } from 'react'
import { useForm } from '../customHooks/useForm'
import { useSelector } from 'react-redux'

// Module
import { saveContact, removeContact, getEmptyContact } from '../store/actions/contact.action'

export const ContactEditPage = () => {

    const params = useParams()
    const navigate = useNavigate()

    const [contact, register, setContact, onSaveContact, onRemoveContact] = useForm(getEmptyContact(), saveContact, removeContact)
    const contacts = useSelector(state => state.contactModule.contacts)
    const user = useSelector(state => state.userModule.loggedInUser)

    useEffect(() => {
        loadContact(params.id || null)
    }, [params.id,user])

    const loadContact = id => {
        if (id) {
            const contact = contacts.find(contact => contact._id === id)
            if (contact) setContact(contact)
            else navigate('/contact')
        }
    }

    const onBack = () => { navigate('/contact/' + (contact._id || '')) }

    const imgInvalid = ev => {
        const element = ev.target
        element.outerHTML = ` <div class="avatar">${contact.initials}</div>`
        element.onError = null
    }

    if (!contact) return <div>Loading...</div>
    const url = contact._id
        ? `https://robohash.org/${contact.name}?set=set5`
        : ''

    return (
        <section className="edit-contact">
            <div className="actions flex between align-center">
                <button className="btn flex cetner" onClick={onBack}>Back</button>
                {contact._id && <button className="btn flex cetner" onClick={onRemoveContact}><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21V6H4V4h5V3h6v1h5v2h-1v15Zm2-2h10V6H7Zm2-2h2V8H9Zm4 0h2V8h-2ZM7 6v13Z" /></svg></button>}
            </div>
            <form onSubmit={onSaveContact}>
                {contact._id && contact.name
                    ? <img className="avatar" src={url} alt={contact.initials} onError={imgInvalid} />
                    : <div className="avatar flex center">{contact.initials}</div>}
                <input {...register('name', 'text')} />
                <input {...register('phone', 'text')} />
                <input {...register('email', 'email')} />
                <button className="btn flex center"  >{contact._id
                    ? <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="m10 16.4l-4-4L7.4 11l2.6 2.6L16.6 7L18 8.4Z" /></svg>
                    : <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M11.975 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.125-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2q1.2 0 2.388.3q1.187.3 2.312.875q.375.2.463.612q.087.413-.188.763q-.25.325-.65.425q-.4.1-.75-.1q-.85-.425-1.75-.65Q12.925 4 12 4Q8.675 4 6.338 6.337Q4 8.675 4 12t2.338 5.663Q8.675 20 12 20q.725 0 1.375-.113q.65-.112 1.25-.337q.325-.125.638-.012q.312.112.562.387q.325.375.188.838q-.138.462-.638.662q-.775.275-1.625.425q-.85.15-1.775.15ZM9.9 15.9l-2.875-2.875q-.275-.275-.262-.688q.012-.412.287-.687q.275-.275.7-.275q.425 0 .7.275l2.15 2.15l9.325-9.35q.275-.275.688-.263q.412.013.687.288q.275.275.275.7q0 .425-.275.7L11.3 15.9q-.275.275-.7.275q-.425 0-.7-.275ZM20 20q-.425 0-.712-.288Q19 19.425 19 19v-2h-2q-.425 0-.712-.288Q16 16.425 16 16t.288-.713Q16.575 15 17 15h2v-2q0-.425.288-.713Q19.575 12 20 12t.712.287Q21 12.575 21 13v2h2q.425 0 .712.287q.288.288.288.713t-.288.712Q23.425 17 23 17h-2v2q0 .425-.288.712Q20.425 20 20 20Z" /></svg>}</button>
            </form>
        </section>
    )
}

