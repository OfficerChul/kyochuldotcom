import React from 'react'
import myPic from './myPicture.jpg';
import './AboutMe.css';
import { Fade } from 'react-awesome-reveal';


function AboutMe({ id }) {

    const onButtonClick = () => {
        // using Java Script method to get PDF file
        fetch('Kyochul_Jang___CV.pdf').then(response => {
            response.blob().then(blob => {
                // Creating new object of PDF file
                const fileURL = window.URL.createObjectURL(blob);
                // Setting various property values
                let alink = document.createElement('a');
                alink.href = fileURL;
                alink.download = 'Kyochul_Resume.pdf';
                alink.click();
            })
        })
    }

    return (
        <div className='about flex justify-center' id={id}>

            <div className='container' fluid="md">

                <Fade cascade damping={0.1} triggerOnce={true} direction='left'>
                    <div className="sm:flex sm:p-10 p-2 items-center">
                        <div className="sm:w-1/2 sm:mr-3 md:mr-0 ">
                            <img src={myPic} alt="myPic" className="w-[80vw] sm:mt-5 2xl:w-4/6 lg:w-5/6 md:w-5/6 img-thumbnail sm:p-3 p-2 border-8 border-gray-300 shadow-lg rounded-lg" />                        </div>

                        <div className="mt-3 sm:mt-0 sm:w-1/2 px-4">
                            <h2 className="font-mono md:text-6xl text-3xl text-sky-300 font-extrabold">
                                About Me
                            </h2>

                            <div className="mt-3 font-mono lg:text-lg sm:text-[13px] text-[12px] text-gray-700">
                                <p>
                                    Hi, I am Kyochul Jang, a Master’s student in the
                                    <span className="text-sky-400"> <a className='text-[#0F709D] underline hover:text-sky-400' href='https://gsai.snu.ac.kr/'>Seoul National University AI</a></span>, advised by Professor Bongwon Suh.

                                </p>

                                <p className="mt-3">
                                    My research interests lie in <span className="text-sky-400">Natural Language Processing</span>, <span className='text-sky-400'>Graph Neural Networks</span>, and
                                    <span className="text-sky-400"> Human+AI Interaction</span>.
                                </p>

                                <p>
                                    Prior to this, I obtained my Bachelor's degree in Computer Science from <a href='https://purdue.edu/' className="text-[#CEB888] underline hover:text-sky-400">Purdue University</a> in 2024 and worked as a Software Engineer Intern at <a href='https://www.samsung.com/' className="underline text-[#1428A0] hover:text-sky-400">Samsung Electronics</a>.

                                </p>



                                <p className="mt-3">
                                    I welcome AI research intern offers! Feel free to contact me via contacts at the
                                    <span className="text-sky-400"> bottom</span> of the website!
                                </p>

                                <button onClick={onButtonClick} className="px-4 py-2 mt-3 bg-sky-400 hover:bg-sky-600 text-white font-bold rounded-lg shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-opacity-50">
                                    <i className="fa fa-download"></i> Download Resume
                                </button>
                            </div>
                        </div>
                    </div>




                </Fade>




            </div>

        </div>
    )
}

export default AboutMe;
