import { NavLink, withRouter } from 'react-router-dom'

function _AppHeader({  logout, user }) {

    return (
        <header className="app-header">
            <nav className="main-nav flex between align-center">
                <section className='flex align-center'>
                    {user && <NavLink exact to="/contact">Contacts</NavLink>}
                    {user && <NavLink to="/stats">Statistics</NavLink>}
                    {user && <NavLink onClick={logout} to="/sign">Logout</NavLink>}
                </section>
                <NavLink exact to="/" className="flex center"><svg xmlns="http://www.w3.org/2000/svg"  preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="currentColor" d="M12 3v3H8v20h4v3h2v-3h2v3h2v-3h1.5c3.027 0 5.5-2.473 5.5-5.5c0-2.082-1.16-3.91-2.875-4.844A5.513 5.513 0 0 0 18.5 6H18V3h-2v3h-2V3zm-2 5h8.5c1.945 0 3.5 1.555 3.5 3.5S20.445 15 18.5 15H10zm0 9h9.5c1.945 0 3.5 1.555 3.5 3.5S21.445 24 19.5 24H10z"/></svg></NavLink>
            </nav>
        </header>
    )
}

export const AppHeader = withRouter(_AppHeader)