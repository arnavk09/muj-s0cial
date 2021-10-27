import React,{useContext} from 'react'
import { Link,useHistory } from 'react-router-dom'
import { UserContext } from '../App'
import M from 'materialize-css'
const NavBar = () => {
    const { state, dispatch } = useContext(UserContext)
    console.log(" "+state);
    const history = useHistory()
    const renderList = () => {
        if (state) {
            return [
                <li key = "1"><Link to="/profile">Profile</Link></li>,
                <li key = "2"><Link to="/create">Create Post</Link></li>,
                <li key="3"><Link to="/myfollowingpost">Posts from Following</Link></li>,
                <li> <button className="btn waves-effect waves-light #d32f2f red darken-2"
                    onClick={() => {
                        localStorage.clear()
                        dispatch({ type: "CLEAR" })
                        M.toast({ html: "Logged Out", classes: "#43a047 green darken-1" })
                        history.push('/signin')
                    }}
                >Log Out
                </button>
                </li>
                
                   ]
        } else {
            return [
                    <li key = "3"><Link to="/signin">Log In</Link></li>,
                    <li key = "4"><Link to="/signup">Sign Up</Link></li>,

                  
                
            ]
        }
    }
    return (
        <nav>
            <div className="nav-wrapper white">
                <Link to={state ? "/" : "/signin"} className="brand-logo-left">The S∅CIAL</Link>
                <ul id="nav-mobile" class="right">
                    {renderList()}
                </ul>
            </div>
        </nav>
    )

}
export default NavBar