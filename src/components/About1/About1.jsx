import React from 'react'
import myPic from './myPicture.jpg';
import './About1.css';
import { Fade } from 'react-reveal';


function About1({ id }) {

    // const onButtonClick = () => {
    //     // using Java Script method to get PDF file
    //     fetch('Resume_mp_no_GPA.pdf').then(response => {
    //         response.blob().then(blob => {
    //             // Creating new object of PDF file
    //             const fileURL = window.URL.createObjectURL(blob);
    //             // Setting various property values
    //             let alink = document.createElement('a');
    //             alink.href = fileURL;
    //             alink.download = 'Kyochul_Resume.pdf';
    //             alink.click();
    //         })
    //     })
    // }

    const onButtonClick = () => {
        // using Java Script method to get PDF file
        const file = 'src/components/SimpleIcon/CV_no_gpa.pdf';
        const blob = new Blob([file], {type: 'application/pdf'});
        const fileURL = window.URL.createObjectURL(blob);
        let alink = document.createElement('a');
        alink.href = fileURL;
        alink.download = 'Kyochul_Resume.pdf';
        alink.click();
    }

    return (
        <div className='about' id={id}>

            <div className='container' fluid="md">
                <div className="row">
                    <Fade left>
                        <div className='col-sm about1' id='leftAbout'>
                            <img src={myPic} alt='myPic' className="img-thumbnail myPic mt-5 p-3" />
                        </div>

                        <div className='col-sm mt-0 about2' id='rightAbout'>

                            <h2 id='about-title'>About Me</h2>


                            {/* <h1 className='about-context' id='aboutme'><span id='aboutme-span'>Hi, I am Kyochul Jang, a Computer Science student at <span className='univ'>Purdue University.</span><br />
                                
                                <br /><span className=' font-mono'>My concentration</span>is Machine Learning, and also minoring in Mathematics.<br />
                                <br /><span className='univ'>My interests</span> lie in Computer Vision, NLP, and Brain-Computer Interface (BCI).
                            </span>
                            </h1> */}
                            <br /><h4 className='font-mono'>Hi, I am Kyochul Jang, a Computer Science student at <span id='emphasize-about' className=''>Purdue university</span>.
                                My interests lie in <span id='emphasize-about' className=''>Machine Learning Engineering</span> and <span id='emphasize-about'>Data Mining</span>.<br /><br />
                                During the Summer Vacation in 2023, and 2022, I did an internship at <span id='emphasize-about' className=''>Samsung Electronics</span> and <span id='emphasize-about' className=''>Seoul National University</span> as a SDE intern.<br /><br />

                                I am, now, seeking a position in a <span id='emphasize-about'>fast-paced environment</span> where I can use my skills and experience to make a real impact.

                                
                                <br /><br />Feel free to contact me via contacts at the <span id='emphasize-about' className=''>bottom</span> of the website!</h4>
                            
                            <button onClick={onButtonClick} className='mt-3' id='download-btn'>
                                <i className="fa fa-download" /> Download Resume
                            </button>
                            
                            
                        </div>




                    </Fade>


                </div>

            </div>

        </div>
    )
}

export default About1;
