import React from 'react'
import './MagicCard.css'
import qmark from './mario_questionmark.png'



export default function MagicCard(props) {
    const combinedClsssName = `${props.site} card`
    return (
        <div className="main">
            
            <div className={combinedClsssName}>
                <div className="blocker"></div>
                <img src={qmark} id='qmark'/>
            </div>

            
        </div>
    )
}
