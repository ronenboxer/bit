import { userService } from "../../services/user.service"
import { contactService } from "../../services/contact.service"

export function transfer(amount, targetId) {
    try {
        return async (dispatch, getState) => {
            const { loggedInUser } = getState().userModule
            userService.transfer({ ...loggedInUser }, amount, targetId)
            await dispatch({ type: 'TRANSFER', amount })
            return 'hello'
        }
    } catch (err) {
        console.log(`err`, err)
    }
}

export function login(username = null) {
    return async dispatch => {
        try {
            const user = await userService.login(username) 
            if (user) dispatch({ type: 'SIGN_IN', user })
        } catch (err) {
            console.log(`err`, err)
        }
    }
}

export function logout() {
    return dispatch => {
        try {
            userService.logout()
            dispatch({ type: 'SIGN_IN', user: null })
        } catch (err) {
            console.log(`err`, err)
        }
    }
}

export function signup(newUser) {
    return async dispatch => {
        try {
            const user = await userService.signup(newUser)
            const contact = { ...user }
            delete contact._id
            contactService.saveContact(contact)
            dispatch({ type: 'SIGN_UP', user })
            dispatch({ type: 'ADD_CONTACT', contact: user })
        } catch (err) {
            console.log(`err`, err)
        }
    }
}