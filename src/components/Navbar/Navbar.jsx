import './Navbar.css';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (  
        <nav className="navbar">
            <h1>Posts List by React</h1>
            <div className="links">
                <NavLink exact to="/" activeClassName="active">Posts List</NavLink>
                <NavLink exact to="/create" activeClassName="active">Create A Post</NavLink>
            </div>            
        </nav>
    );
}
 
export default Navbar;
