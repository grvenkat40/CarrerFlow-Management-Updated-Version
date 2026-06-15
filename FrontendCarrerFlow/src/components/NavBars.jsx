import {NavLink, useParams} from 'react-router-dom'
import logo from '../assets/images/logo.png'
 
function NavBar(){

    const {username} = useParams();

    return(
        <div className='sideBar'>
            <div className='sidebarComponents'>
                <div className='Apptitle'>
                    <img src={logo} alt="Career Flow Logo" />
                    <h2>Career<span>Flow</span></h2>
                </div>
                <hr className='hr' />
                <ul>
                    <li>
                        <NavLink to={`/users/${username}/dashboard`}>📊 Dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink to={`/users/${username}/skills`}>💡 Skills</NavLink>
                    </li>
                    <li>
                        <NavLink to={`/users/${username}/createApplication`}>✏️ Create Application</NavLink>
                    </li>
                    <li>
                        <NavLink to={`/users/${username}/trackApplication`}>📋 Track Application</NavLink>
                    </li>
                </ul>
            </div>
            
            
        </div>
    )
}
 
export default NavBar