import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'
const Signup = () => {
    const history = useHistory()
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    const PostData = () => {
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
         return M.toast({ html:"Invalid Email", classes: "#e53935 red darken-1" })
        }
        fetch("/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                password,
                email

            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    M.toast({ html: data.error, classes: "#e53935 red darken-1" })
                }
                else {
                    M.toast({ html: data.message, classes: "#43a047 green darken-1" })
                    history.push('/signin')
                }
                

            }).catch(err=>{
                console.log(err)
            })
        
    }
    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h4>Sign Up For MUJ S∅CIAL</h4>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                    onClick={() => PostData()}
                >
                    Sign Up
                </button>
                <h6>
                    <u><Link to="/signin">Already have an account?</Link></u>
                </h6>

            </div>
        </div>
    )
}
export default Signup