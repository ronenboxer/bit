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
            const user = await userService.login(username) || {
                _id: "7FkwE3etrB",
                balance: 1394.5,
                name: "Doda Shli",
                username: "doda",
                initials: "DS",
                transfers: [
                    { to: "5a56640243427b8f8445231e", amount: 55, at: 1672177128142 },
                    { from: "5a56640298ab77236845b82b", amount: 12, at: 167227712841 },
                    { from: "5a56640298ab77236845b82b", amount: 0.4, at: 1672377128141 },
                    { to: "5a56640298500fead8cb1ee5", amount: 20.3, at: 1672477128141 },
                    { to: "5a566402f90ae30e97f990db", amount: 4, at: 1672177528141 },
                    { to: "5a566402f90ae30e97f990db", amount: 230.4, at: 1653477128141 },
                    { to: "5a566402abce24c6bfe4699d", amount: 230.4, at: 1672677623141 },
                    { to: "5a566402f90ae30e97f990db", amount: 230.4, at: 1676897128141 },
                    { to: "5a566402abce24c6bfe4699d", amount: 230.4, at: 1672677768141 },
                    { to: "5a5664025f6ae9aa24a99fde", amount: 230.4, at: 1672677124121 },
                    { to: "5a566402ed1cf349f0b47b4d", amount: 230.4, at: 1656977128141 },
                    { to: "5a56640252d6acddd183d319", amount: 230.4, at: 1672624128141 },
                    { to: "5a5664025f6ae9aa24a99fde", amount: 230.4, at: 1672677134711 },
                    { to: "5a5664025f6ae9aa24a99fde", amount: 230.4, at: 1672677124211 },
                    { to: "5a56640269f443a5d64b32ca", amount: 230.4, at: 1672677122451 },
                    { to: "5a56640269f443a5d64b32ca", amount: 230.4, at: 1672543128141 },
                    { to: "5a56640269f443a5d64b32ca", amount: 230.4, at: 1672677541141 },
                    { to: "5a5664025f6ae9aa24a99fde", amount: 230.4, at: 1672677128141 },
                    { from: "5a5664025c3abdad6f5e098c", amount: 4, at: 1672187128141 },
                    { to: "5a56640208fba3e8ecb97305", amount: 6, at: 1672177928141 },
                    { to: "5a5664029a8dd82a6178b15f", amount: 1, at: 1672177028141 },
                    { from: "5a5664025c3abdad6f5e098c", amount: 0.6, at: 1671177128141 },
                    { to: "5a566402a6499c1d4da9220a", amount: 6, at: 1673177128141 },
                    { from: "5a566402abb3146207bc4ec5", amount: 2, at: 1672177128143 },
                    { from: "5a5664028c096d08eeb13a8a", amount: 2, at: 1672154328143 },
                    { from: "5a5664028c096d08eeb13a8a", amount: 2, at: 1672177143143 },
                    { from: "5a566402abb3146207bc4ec5", amount: 2, at: 1673467128143 },
                    { from: "5a56640272c7dcdf59c3d411", amount: 2, at: 1676437128143 },
                    { from: "5a566402abb3146207bc4ec5", amount: 2, at: 1672177338143 },
                    { from: "5a5664027bae84ef280ffbdf", amount: 2, at: 1672177163243 },
                    { from: "5a5664027bae84ef280ffbdf", amount: 2, at: 1695177128143 },
                    { from: "5a56640272c7dcdf59c3d411", amount: 2, at: 1672161128143 },
                    { to: "5a56640298500fead8cb1ee5", amount: 12, at: 1674177128141 },
                    { from: "5a566402e3b846c5f6aec652", amount: 465, at: 1675177128141 },
                    { to: "5a566402e3b846c5f6aec652", amount: 45, at: 1676177128141 },
                    { from: "5a5664029a8dd82a6178b15f", amount: 50.6, at: 1677177128141 },
                    { from: "5a56640298ab77236845b82b", amount: 0.4, at: 1678177128141 },
                    { to: "5a5664026c53582bb9ebe9d1", amount: 3.5, at: 1679177128141 },
                    { to: "5a56640243427b8f8445231e", amount: 23.4, at: 1670177128141 },
                    { to: "5a5664025f6ae9aa24a99fde", amount: 54, at: 1672177128144 },
                    { from: "5a56640208fba3e8ecb97305", amount: 293, at: 1672177128145 },
                    { to: "5a56640243427b8f8445231e", amount: 203, at: 1672177128141 },
                    { from: "5a5664029a8dd82a6178b15f", amount: 3.4, at: 1672176128141 },
                    { from: "5a56640243427b8f8445231e", amount: 34.4, at: 1672175128141 },
                    { from: "5a56640298500fead8cb1ee5", amount: 103.5, at: 1672174128141 },
                    { to: "5a5664025c3abdad6f5e098c", amount: 502.2, at: 1672173128141 },
                    { to: "5a566402e3b846c5f6aec652", amount: 34, at: 1672172128141 },
                    { to: "5a5664025c3abdad6f5e098c", amount: 69, at: 1672171128141 },
                    { from: "5a566402a6499c1d4da9220a", amount: 93, at: 1672170128141 }]
            }
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