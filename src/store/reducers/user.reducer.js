
const INITIAL_STATE = {
    loggedInUser: null
}

export function userReducer(state = INITIAL_STATE, action) {

    switch (action.type) {
        case 'TRANSFER':
            const { loggedInUser } = state
            return {
                ...state,
                loggedInUser: { ...loggedInUser, balance: loggedInUser.balance - action.amount }
            }
        case 'SIGN_UP':
        case 'SIGN_IN':
            const { user } = action
            return {
                ...state, loggedInUser: user
            }
        default:
            return state;
    }

}