import React from 'react';
import './ProjectsBtn.css';

function ProjectsBtn({ ghUrl }) {
    return (
        <div id='projectsBtn'>

            <ul id='projectsBtn-ul'>
                <li id='projectsBtn-li'>
                    <a href={ghUrl} id='projectsBtn-a' target="_blank" rel="noreferrer">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span class="fa fa-github"></span>
                    </a>
                </li>

            </ul>

        </div>
    )
}

export default ProjectsBtn