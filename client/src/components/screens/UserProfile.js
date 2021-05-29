//start at video 37

import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../../App'
import { useParams } from 'react-router-dom'
const Profile = () => {
    const [userProfile, setProfile] = useState(null)
    const { state, dispatch } = useContext(UserContext)
    const { userid } = useParams()
    // console.log(userid)
    useEffect(() => {
        fetch(`/user/${userid}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {

                console.log(result)
                setProfile(result)
            })
    }, [])
    const followUser = () => {
        fetch('/follow', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                followId: userid

            })
        }).then(res => res.json())
            .then(data => {
                dispatch({ type: "UPDATE", payload: { following: data.following, followers: data.followers } })
                localStorage.setItem("user", JSON.stringify(data))
                setProfile((prevState) => {
                    return {
                        ...prevState,
                        user: data
                    }
                })

                console.log(data)
            })
    }









    return (
        <>
            {userProfile ?
                <div style={{ maxWidth: "550px", margin: "0px auto" }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        margin: "18px 0px",
                        borderBottom: "1px solid grey"

                    }}>
                        <div><img style={{ width: "160px", height: "160px", borderRadius: "80px" }}
                            src="https://tcap.pbworks.com/f/1435170280/myAvatar.png"
                            alt="profile picture"
                            title="profile picture"
                        /></div>
                        <div>
                            <h4>{userProfile.user.name}</h4>
                            <h5>{userProfile.user.email}</h5>
                            <div style={{ display: "flex", justifyContent: "space-between", width: "108%" }}>
                                <h6>{userProfile.posts.length} posts</h6>
                                <h6>{userProfile.user.followers.length}followers</h6>
                                <h6>{userProfile.user.following.length}following</h6>
                            </div>
                            <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                                onClick={() => followUser()}
                            >Follow
                </button>
                        </div>
                    </div>
                    <div className="gallery">
                        {
                            userProfile.posts.map(item => {
                                return (
                                    <img key={item._id}
                                        className="item"
                                        src={item.photo}
                                        alt={item.title}
                                        title="gallery pic">
                                    </img>
                                )
                            })
                        }

                    </div>
                </div>






                : <h2>Loading...</h2>}

        </>
    )
}
export default Profile