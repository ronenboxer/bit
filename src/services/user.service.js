import { contactService } from './contact.service'
let gUsers
getUsers()
async function getUsers() {
    gUsers = JSON.parse(localStorage.getItem('userDB') || null) || await contactService.getContacts()
    localStorage.setItem('userDB', JSON.stringify(gUsers))
}

export const userService = {
    login,
    signup,
    logout,
    transfer,
    save
}

async function login(username) {
    if (!username) return JSON.parse(sessionStorage.getItem('loggedInUser') || null)
    const user = gUsers.find(user => user.username === username)
    if (!user) return Promise.reject('User not found')
    sessionStorage.setItem('loggedInUser', JSON.stringify(user))
    return user
}

function logout() {
    sessionStorage.removeItem('loggedInUser')
}

async function signup(user) {
    user._id = makeId()
    user.balance = 100
    user.transfers = []
    gUsers.push(user)
    localStorage.setItem('userDB', JSON.stringify(gUsers))
    return user
}

async function transfer(user, amount, targetId) {
    if (user.balance < +amount || +amount <= 0) return Promise.reject('Insufficient funds')
    const target = gUsers.find(anyUser => anyUser._id === targetId)
    if (!target) return Promise.reject('Target user not found')
    user.balance -= +amount
    user.transfers.push({ to: target._id, amount, at: Date.now() })
    target.balance += +amount
    if (!target.transfers) target.transfers = []
    target.transfers.push({ from: user._id, amount, at: Date.now() })
    save(user)
    save(target)
}

async function save(user) {
    const userToSave = { transfers: [], balance: 100, ...user }
    userToSave.initials = user.name.trim().split(' ').map(word => word.charAt[0]).join('').toUpperCase()
    if (userToSave._id) {
        const idx = gUsers.findIndex(anyUser => anyUser._id === userToSave._id)
        if (idx === -1) return Promise.reject('User not found')
        gUsers.splice(idx, 0, userToSave)
    } else {
        userToSave._id = makeId()
        gUsers.push(userToSave)
    }
    localStorage.setItem('userDB', JSON.stringify(gUsers))
    return userToSave
}

export function contactRemoved(contactId) {
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser') || null)
    if (gUsers) {
        gUsers.forEach((user, idx) => {
            const transfers = user.transfers?.filter(transfer => !(transfer.from === contactId || transfer.to === contactId)) || []
            user.transfers = transfers
            if (loggedInUser?._id === user._id) sessionStorage.setItem('loggedInUser', JSON.stringify(user))
        })
        localStorage.setItem('userDB', JSON.stringify(gUsers))

    }
}

function makeId(length = 10) {
    let id = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
        id += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return id;
}