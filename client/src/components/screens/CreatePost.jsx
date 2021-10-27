import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'


const CreatePost = () => {
    const history = useHistory();
    const [title, SetTitle] = useState();
    const [body, SetBody] = useState();
    const [image, setImage] = useState();
    const [url, setUrl] = useState();
    useEffect(() => {
        if (url) {
            fetch("/createpost", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    title,
                    body,
                    pic: url

                })
            }).then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.error) {
                        M.toast({ html: data.error, classes: "#e53935 red darken-1" })
                    }
                    else {
                        M.toast({ html: "Posted! You can view your post.", classes: "#43a047 green darken-1" })
                        history.push('/')
                    }


                }).catch(err => {
                    console.log(err)
                })
        }
    }, [url])

    const postDetails = () => {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "mujs0cial")
        data.append("cloud_name", "arnavk09")
        fetch("https://api.cloudinary.com/v1_1/arnavk09/image/upload", {
            method: "post",
            body: data
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                setUrl(data.url)
            })
            .catch(err => {
                console.log(err)
            })

    }

    return (
        <div className="card-input-filed"
            style={{
                margin: "30px auto",
                maxWidth: "500px",
                padding: "20px",
                textAlign: "center"
            }}

        >
            <input
                type="text"
                placeholder="title"
                value={title}
                onChange={(e) => SetTitle(e.target.value)}
            />
            <input type="text"
                placeholder="body"
                value={body}
                onChange={(e) => SetBody(e.target.value)}
            />
            <div className="file-field input-field">
                <div className="btn waves-effect waves-light #64b5f6 blue darken-1">
                    <span>Upload Image</span>
                    <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                </div>
                <div className="file-path-wrapper">
                    <input class="file-path validate" type="text" />
                </div>
            </div>
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1"

                onClick={() => postDetails()}

            >
                Post
                </button>
        </div>

    )
}

export default CreatePost
