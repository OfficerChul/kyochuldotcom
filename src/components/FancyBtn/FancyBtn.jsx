import React from 'react';
import "./FancyBtn.css";


function FancyBtn(props) {

    function remHash() {
        setTimeout(() => {
            var uri = window.location.toString();
            if (uri.indexOf("#") > 0) {
                var clean_uri = uri.substring(0, uri.indexOf("#"));
                console.log(window.location.toString())
                console.log(clean_uri)
                window.history.replaceState('', document.title, clean_uri);

            }
        }, 5)
    }



return (

    <div className="fbtn-container">
        <div className="center">

            <a href={props.url}><button onClick={remHash} id="fbtn">
                
                <svg id='fbtn-svg' width="180px" height="60px" viewBox="0 0 180 60" className="border">
                    <polyline points="179,1 179,59 1,59 1,1 179,1" className="bg-line" />
                    <polyline points="179,1 179,59 1,59 1,1 179,1" className="hl-line" />
                </svg>
                <span>{props.btnText}</span>

            </button></a>
        </div>
    </div>
)
}

export default FancyBtn;