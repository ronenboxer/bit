// Lib
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

// Modules
import { setFilter } from '../store/actions/contact.action'

// Cmps
import { ContactList } from '../components/ContactList'
import { ContactFilter } from '../components/ContactFilter'

export const ContactPage = () => {

    const filterBy = useSelector(state => state.contactModule.filterBy)
    const contacts = useSelector(state => state.contactModule.contacts)
    const user = useSelector(state => state.userModule.loggedInUser)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) navigate('/sign')
    }, [user])

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
