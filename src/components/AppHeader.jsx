import {  NavLink } from 'react-router-dom'


export function AppHeader({ logout, user }) {

    return (
        <header className="app-header">
            <nav className="main-nav flex between align-center">
                <NavLink className="flex center logo" exact="true" to="/">&#8383;it it</NavLink>
                <section className='flex align-center'>
                    {user && <NavLink className="flex center" exact="true" to="/contact">Contacts</NavLink>}
                    {user && <NavLink className="flex center" to="/stats">Statistics</NavLink>}
                    {user && <NavLink className="flex center" onClick={logout} to="/sign">Logout</NavLink>}
                </section>
            </nav>
        </header>
    )
}