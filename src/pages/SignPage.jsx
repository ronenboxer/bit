// Lib
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Modules
import { login, signup } from '../store/actions/user.action'

export const SignPage = (appUser) => {

    const [user, setUser] = useState(useSelector(state => state.userModule.loggedInUser))
    const [isSignup, setIsSignup] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (user) return navigate('/')
    }, [])

    const toggleSignState = value => {
        setIsSignup(value)
    }

    const upadteUser = ({ target }) => {
        const { name: key, value } = target
        setUser(prevUser => ({ ...prevUser, [key]: value }))
    }

    const signIn = () => {
        dispatch(login(user.username))
        navigate('/')
    }

    const signUp = () => {
        dispatch(signup(user))
        signIn()
    }


    return (
        <section className='sign-page column flex center absolute center'>
            <div className="action">
                <button onClick={() => toggleSignState(false)} className={isSignup ? 'btn-sign' : 'btn-sign active'} >Sign in</button>
                <button onClick={() => toggleSignState(true)} className={isSignup ? 'btn-sign active' : 'btn-sign'}>Sign up</button>
            </div>
            {isSignup
                ? <form className="credentials" onSubmit={signUp}>
                    <div className="flex between">
                        <label>Full name</label>
                        <input onChange={upadteUser} type="text" name="name" />
                    </div>
                    <div className="flex between">
                        <label>Username</label>
                        <input onChange={upadteUser} type="text" name="username" />
                    </div>
                </form>
                : <form className="credentials" onSubmit={signIn}>
                    <div className="flex between">
                        <label>Full name</label>
                        <input onChange={upadteUser} type="text" name="username" />
                    </div>
                </form>
            }
            {isSignup
                ? <button className="btn-submit" onClick={signUp}>Sign up</button>
                : <button className="btn-submit" onClick={signIn}>Sign in</button>}

        </section>
    )
}

