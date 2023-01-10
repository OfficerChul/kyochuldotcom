import "./Like.css";
import { doc, getDoc, setDoc } from "firebase/firestore";
import db  from "../Firebase.jsx";
import React, { useEffect, useState } from 'react';

function Like() {
    const [likes, setLikes] = useState([])


    useEffect(() => {
        getLikes()
    })

    async function getLikes() {


        const temp = doc(db, "userInput", 'doc1');
        const temp1 = getDoc(temp).then((resource) => {
            console.log("resouce", resource.data().age);
            setLikes(parseInt(resource.data().age));
        });
        await setDoc(temp, {
            age: likes + 1
        })
        console.log(temp1.data);
    }

    return (
        <div>
            <ul>like: {likes}</ul>
            <button onClick={getLikes}>button</button>
        </div>
    )
}

export default Like