// Lib
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// Modules
import { setFilter } from '../store/actions/contact.action'

// Cmps
import { ContactList } from '../components/ContactList'
import { ContactFilter } from '../components/ContactFilter'

export const ContactPage = () => {

    const filterBy = useSelector(state => state.contactModule.filterBy)
    const contacts = useSelector(state => state.contactModule.contacts)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSetFilter = filterBy => {
        dispatch(setFilter(filterBy))
    }

    const addContact = () => {
        navigate('/contact/edit')
    }

    if (!contacts) return <div>Loading...</div>
    return (
        <section>
            <ContactFilter setFilter={onSetFilter} filterBy={filterBy} addContact={addContact} />
            <ContactList contacts={contacts} />
        </section>
    )
}
