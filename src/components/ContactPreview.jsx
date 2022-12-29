import { Link } from 'react-router-dom'

export function ContactPreview({ contact }) {

    const initials = contact.name.trim().split(' ').map(name => name.charAt(0)).join('').toUpperCase()
    const url = `https://robohash.org/${contact.name}?set=set5`
    function imgInvalid(ev) {
        const element = ev.target
        element.outerHTML = `<div className="contact-avatar">${initials}</div>`
        element.onError = null
    }

    return (
        <Link to={`/contact/${contact._id}`} className="contact-preview flex align-center">
            <img className="contact-avatar" src={url} alt={initials} onError={imgInvalid} />
            <div className="mini-details">
                <h3 className="contact-name">{contact.name}</h3>
                <p className="phone">{contact.phone}</p>
                <p className="email">{contact.email}</p>
            </div>
        </Link>
    )
}
