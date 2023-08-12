import React from 'react'
import './MagicCard.css'
import qmark from './mario_questionmark.png'



export default function MagicCard(props) {
    const combinedClsssName = `${props.site} card`
    return (
        <div className="main">
            
            <div className={combinedClsssName}>
                <img src={qmark} alt='question_mark' id='qmark'/>
            </div>

            
        </div>
    )
}
