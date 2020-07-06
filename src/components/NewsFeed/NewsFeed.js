import React, { useState, useEffect } from 'react';
import { Link, Redirect } from "react-router-dom";
import {
    Form,
    Button,
    Jumbotron,
    Input,
    Label
} from 'reactstrap';
// FormGroup,


// moods
import API from "../../module/dataManager.js";
import {
    Comeback,
    getStorageSession,
    generalHandleChanges
} from "../../Helpers";
import NewBox from "./NewBox"

const NewsFeed = () => {

    /* -------- Show past post feature -------- */

    // Array with AL news from the DATA
    let session = getStorageSession()
    const [news, setNews] = useState([])

    // New that is inputed in the form
    const [newToPost, setNewToPost] = useState({
        title: "",
        eventId: session.eventId,
        userId: session.userId,
        content: "",
        hasPicture: false,
        pictureUrl: "",
    })

    // Toggle button FORM
    const [formNewOn, setFormNewOn] = useState(false)

    // Getting ALL news from the API
    const getData = async () => {
        let dataNews = await API.getWhereExpand("news", "eventId", session.eventId, "event")
        setNews(dataNews.reverse())
    }

    useEffect(() => {
        getData()
    }, [formNewOn])

    /*------------------------------------*/

    /* -------- Post new -------- */

    // Toggle Button
    const toggleForm = () => {
        setFormNewOn(!formNewOn)
    }

    const handleChanges = (e) => {
        generalHandleChanges(e, newToPost, setNewToPost)
    }

    const handlePost = async (e) => {
        e.preventDefault();
        if (!newToPost.title || !newToPost.content){
            return alert("Please, provide Title and/or Content")
        }
        await API.post("news", newToPost)
        toggleForm()
    }

    /*------------------------------------*/

    /*-----------------Image upload feature-------------------*/

    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(false)

    const uploadImage = async e => {
        const files = e.target.files
        if(!files){ return }
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'testes')
        setLoading(true)
        const res = await fetch(
            'https://api.cloudinary.com/v1_1/dqhswasf6/image/upload',
            {
                method: 'POST',
                body: data
            }
        )
        const file = await res.json()

        setImage(file.secure_url)
        handleImageChange(file.secure_url)
        getData()
        setLoading(false)
    }

    const handleImageChange = (link) => {
        let stateToChange = {...newToPost}
        if (!!link){
            stateToChange.pictureUrl = link;
            stateToChange.hasPicture = true;
        } else {
            stateToChange.hasPicture = false;
        }
        setNewToPost(stateToChange)
    }

        /*------------------------------------*/

    return <>
        <div className="container --yellow-bg">
            <h2 className="--page-title">News Feed</h2>
            { session.participationStatus === 1 && <div>
            {!formNewOn && <button className="--button" onClick={toggleForm}>New Post</button>}

            {formNewOn && <div className="newForm--NewsFeed">
                <Form onSubmit={handlePost}>
                    <Input onChange={handleChanges} required type="text" id="title" placeholder="Title"></Input>
                    <Input onChange={handleChanges} required type="text" id="content" placeholder="Content"></Input>
                        <br />
                    <div className="form-row p-2">
                        <Label className="col-4" for="file">Upload Image</Label>
                        <input
                            className="col-8"
                            type="file"
                            name="file"
                            id="file"
                            onChange={uploadImage}
                        />
                        {loading ? (
                            <h3>Loading...</h3>
                        ) : (
                                <img alt="" src={image} style={{ width: '300px' }} />
                            )}
                    </div>
                    <button className="--button" type="submit">Post</button>
                </Form>
            </div>}
            </div>
            }

        </div>
            <div className="container-cards">
                {news.map(e =>
                    <NewBox key={e.id} news={e} />
                )}
            </div>
    </>
}

export default NewsFeed