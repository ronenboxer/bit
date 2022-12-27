import { ContactPreview } from "./ContactPreview";

export function ContactList({ contacts, selectContact }) {
    return (
        <section className="contact-list">
            {contacts.map(contact =>
                <ContactPreview
                    key={contact._id}
                    contact={contact}
                />
            )}
        </section>
    )
}
