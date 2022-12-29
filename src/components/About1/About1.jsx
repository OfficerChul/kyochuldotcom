import React from 'react'
import myPic from './myPicture.jpg';
import './About1.css';

function About1({ id }) {
    return (
        <div className='about' id={id}>
            
            <div className='container' fluid="md">
                <div className="row">
                    <div className='col-sm about1'>
                        <img src={myPic} alt='myPic' class="img-thumbnail myPic mt-5 p-3" />
                    </div>
                    <div className='col-sm mt-5 about2'>

                        <h2 id='about-title'>About Me</h2>


                        <h1 className='about-context' id='aboutme'><span id='aboutme-span'>Hi, I am Kyochul Jang, a Computer Science student at <span className='univ'>Purdue University.</span><br />
                            <br /><span className='univ'>My concentration</span>is Machine Learning, and also minoring in Mathematics.<br />
                            <br /><span className='univ'>My interests</span> lie in Computer Vision, NLP, and Brain-Computer Interface (BCI).
                        </span>
                        </h1>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default About1;
