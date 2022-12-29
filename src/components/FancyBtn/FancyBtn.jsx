import React from 'react';
import "./FancyBtn.css";

function FancyBtn() {
    return (
        <div class="fbtn-container">
            <div class="center">
                <a href='#about1'><button id="fbtn">
                    <svg id='fbtn-svg' width="180px" height="60px" viewBox="0 0 180 60" class="border">
                        <polyline points="179,1 179,59 1,59 1,1 179,1" class="bg-line" />
                        <polyline points="179,1 179,59 1,59 1,1 179,1" class="hl-line" />
                    </svg>
                    <span>About Me!</span>
                </button></a>
            </div>
        </div>
    )
}

export default FancyBtn;