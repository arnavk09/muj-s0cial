import React, { useEffect, createContext, useReducer, useContext } from 'react'
import './App.css';
import NavBar from './components/navbar'
import './App.css'
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom'
import Home from './components/screens/Home'
import Profile from './components/screens/Profile'
import Signup from './components/screens/Signup'
import SignIn from './components/screens/SignIn.js';
import CreatePost from './components/screens/CreatePost';
import { reducer, initialState } from './reducers/userReducer'
import UserProfile from './components/screens/UserProfile'
import SubscribedUserPosts from './components/screens/SubscribesUserPosts'


export const UserContext = createContext()
const Routing = () => {
  const history = useHistory()
  const { state, dispatch } = useContext(UserContext)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user) {
      dispatch({ type: "USER", payload: user })
      //history.push('./')
    } else {
      history.push('/signin')
    }
  }, [])
  return (
    <switch>
      <Route exact path="/">
        <Home />
      </Route>

      <Route path="/signin">
        <SignIn />
      </Route>

      <Route path="/signup">
        <Signup />
      </Route>

      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route path="/create">
        <CreatePost />
      </Route>
      <Route path="/profile/:userid">
        <UserProfile/>
      </Route>
      <Route path="/myfollowingpost">
        <SubscribedUserPosts/>
      </Route>
    </switch>
  )
}
function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <NavBar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}
export default App;