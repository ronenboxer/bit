import { contactService } from "../../services/contact.service"

export function loadContacts() {

    return async (dispatch, getState) => {
        try {
            const filterBy = getState().contactModule.filterBy
            const contacts = await contactService.getContacts(filterBy)
            dispatch({ type: 'SET_CONTACTS', contacts })
            return 'hello'
        } catch (err) {
            console.log('err:', err)
        }
    }
}


export function saveContact(contact) {

    return async (dispatch) => {
        try {
            const savedContact = await contactService.saveContact(contact)
            if (contact._id) dispatch({ type: 'UPDATE_CONTACT', contact: savedContact })
            else dispatch({ type: 'ADD_CONTACT', contact: savedContact })
            return savedContact
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function removeContact(contactId) {

    return async (dispatch) => {
        try {
            await contactService.deleteContact(contactId)
            dispatch({ type: 'REMOVE_CONTACT', contactId })
            return 'hello'
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function setFilter(filterBy) {

    return async (dispatch) => {
        try {
            const contacts = await contactService.getContacts(filterBy)
            dispatch({ type: 'SET_CONTACTS', contacts })
            dispatch({ type: 'SET_FILTER_BY', filterBy: { ...filterBy } })
        } catch (err) {
            console.log('err:', err)
        }
    }
}