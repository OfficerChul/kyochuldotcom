import React from 'react'
import myPic from './myPicture.jpg';
import './About1.css';
import { Fade } from 'react-reveal';



function About1({ id }) {

    const onButtonClick = () => {
        // using Java Script method to get PDF file
        fetch('Resume_mp_no_GPA.pdf').then(response => {
            response.blob().then(blob => {
                // Creating new object of PDF file
                const fileURL = window.URL.createObjectURL(blob);
                // Setting various property values
                let alink = document.createElement('a');
                alink.href = fileURL;
                alink.download = 'Resume_mp_no_GPA.pdf';
                alink.click();
            })
        })
    }

    return (
        <div className='about' id={id}>

            <div className='container' fluid="md">
                <div className="row">
                    <Fade left>
                        <div className='col-sm about1' id='leftAbout'>
                            <img src={myPic} alt='myPic' class="img-thumbnail myPic mt-5 p-3" />
                        </div>

                        <div className='col-sm mt-0 about2' id='rightAbout'>

                            <h2 id='about-title'>About Me</h2>


                            {/* <h1 className='about-context' id='aboutme'><span id='aboutme-span'>Hi, I am Kyochul Jang, a Computer Science student at <span className='univ'>Purdue University.</span><br />
                                
                                <br /><span className=' font-mono'>My concentration</span>is Machine Learning, and also minoring in Mathematics.<br />
                                <br /><span className='univ'>My interests</span> lie in Computer Vision, NLP, and Brain-Computer Interface (BCI).
                            </span>
                            </h1> */}
                            <br /><h4 className='font-mono'>Hi, I am Kyochul Jang, a Computer Science student at <span id='emphasize-about' className=''>Purdue university</span>. My concentration is Machine Learning, and I also study Mathematics as a minor.
                                My interests lie in <span id='emphasize-about' className=''>Computer Vision, NLP, and Brain-Computer Interface(BCI)</span>.<br /><br />
                                I am currently looking for a <span id='emphasize-about' className=''>Summer 2023 Internship</span>. <br /><br />Feel free to contact me via contacts at the <span id='emphasize-about' className=''>bottom</span> of the website!</h4>
                            
                            <button onClick={onButtonClick} className='mt-3' id='download-btn'>
                            <i class="fa fa-download" /> Download Resume
                            </button>
                            
                        </div>




                    </Fade>


                </div>

            </div>

        </div>
    )
}

export default About1;
