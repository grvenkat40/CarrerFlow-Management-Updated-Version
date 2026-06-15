import { useNavigate, NavLink, useParams } from "react-router-dom"


function Header(){

    const navigate = useNavigate();

    const {username} = useParams();

    const logout = () =>{
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        
        navigate("/login");
    };

    return(
        <div className="pageHeader">
            <NavLink to={`/users/${username}/account`}><span>{username?.[0]?.toUpperCase()}</span>Account</NavLink>
            <button onClick={logout}>🚪 Logout</button>
        </div>
    )
}
 
export default Header