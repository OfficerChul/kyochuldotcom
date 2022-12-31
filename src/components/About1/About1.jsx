import React from 'react'
import myPic from './myPicture.jpg';
import './About1.css';
import { Fade } from 'react-reveal';


function About1({ id }) {
    return (
        <div className='about' id={id}>

            <div className='container' fluid="md">
                <div className="row">
                    <Fade left>
                        <div className='col-sm about1' id='leftAbout'>
                            <img src={myPic} alt='myPic' class="img-thumbnail myPic mt-5 p-3" />
                        </div>

                        <div className='col-sm mt-5 about2' id='rightAbout'>

                            <h2 id='about-title'>About Me</h2>


                            {/* <h1 className='about-context' id='aboutme'><span id='aboutme-span'>Hi, I am Kyochul Jang, a Computer Science student at <span className='univ'>Purdue University.</span><br />
                                
                                <br /><span className=' font-mono'>My concentration</span>is Machine Learning, and also minoring in Mathematics.<br />
                                <br /><span className='univ'>My interests</span> lie in Computer Vision, NLP, and Brain-Computer Interface (BCI).
                            </span>
                            </h1> */}
                            <br /><h4 className='font-mono'>Hi, I am Kyochul Jang, a Computer Science student at <span id='emphasize-about' className=''>Purdue university</span>. My concentration is Machine Learning, and also minoring in Mathematics.
                            My interests lie in Computer Vision, NLP, and Brain-Computer Interface(BCI).<br /><br />
                            I am currently looking for an Summer 2023 Internship. Feel free to contact me via contacts at the bottom of the website!</h4>
                        </div>
                    </Fade>


                </div>

            </div>

        </div>
    )
}

export default About1;
