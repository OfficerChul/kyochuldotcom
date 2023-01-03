import "./Like.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.jsx";
import React, { useEffect, useState } from 'react';

function Like() {
    const [likes, setLikes] = useState([])


    useEffect(() => {
        getLikes()
    }, [])

    useEffect(() => {
        console.log(22);
        console.log(likes);
        console.log(11);
    }, [likes])

    function getLikes() {
        const collectionRef = collection(db, "userInput");

        getDocs(collectionRef).then(response => {
            const likey = response.docs.map(doc => ({
                data: doc.data(),
                id: doc.id, 
            }))
            setLikes(likey)
        }).catch(error => console.log(error.message))
        
    }

    return (
        <div>
            <ul></ul>
        </div>
    )
}

export default Like