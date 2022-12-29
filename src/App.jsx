// misc
import './assets/style/main.scss'

// Libs
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

// Modulues
import { loadContacts , setFilter} from './store/actions/contact.action'
import { login, logout } from './store/actions/user.action'
import { loadCharts } from './store/actions/bitcoin.action'
import { useEffectOnUpdate } from './customHooks/useEffectOnUpdate'
// Pages
import { HomePage } from './pages/HomePage'
import { ContactPage } from './pages/ContactPage'
import { ContactDetailsPage } from './pages/ContactDetailsPage'
import { StatisticsPage } from './pages/StatisticPage'
import { ContactEditPage } from './pages/ContactEditPage'
import { AppHeader } from './components/AppHeader'
import { SignPage } from './pages/SignPage'



export const App = () => {


    const dispatch = useDispatch()
    // const navigate = useNavigate()
    const user = useSelector(state => state.userModule.loggedInUser)
    const filter = useSelector(state => state.contactModule.filterBy)

    const ProtectedRoute = ({ user, children }) => {
        if (!user) {
            // return <Navigate to="/sign" replace />;
        }

        return children;
    }

    useEffectOnUpdate(() => {
        if (user) dispatch(setFilter({ ...filter,excludedIds: [user._id]}))
    }, [user])


    useEffect(() => {
        dispatch(loadContacts())
        dispatch(loadCharts())
        dispatch(login())
    }, [])

    const signout = () => {
        dispatch(logout())
    }

    return (
        <Router>

            <section className="main-app">
                <AppHeader logout={signout} user={user} />
                <main className='container'>
                    <Routes>
                        <Route path="/contact/edit/:id" element={<ProtectedRoute user={user}><ContactEditPage /></ProtectedRoute>} />
                        <Route path="/contact/edit/" element={<ProtectedRoute user={user}><ContactEditPage /></ProtectedRoute>} />
                        <Route path="/contact/:id" element={<ProtectedRoute user={user}><ContactDetailsPage /></ProtectedRoute>} />
                        <Route path="/contact" element={<ProtectedRoute user={user}><ContactPage /></ProtectedRoute>} />
                        <Route path="/stats" element={<ProtectedRoute user={user}><StatisticsPage /></ProtectedRoute>} />
                        <Route path="/sign" element={<SignPage user={user}/>} />
                        <Route path="/" element={<ProtectedRoute user={user}><HomePage /></ProtectedRoute>} />
                    </Routes>

                </main>

                <footer>
                </footer>

            </section>
        </Router>
    )
}
