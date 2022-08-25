import React from 'react'
import { Carousel } from 'react-bootstrap';
import './Projects.css';
import javaProject from './java-social-network-project.jpg';
import snuProject from './snu-dash-project.png';
import oldWebProject from './old-website-project.png';
import webdev101 from './course-website.png';



export default function Projects() {
    return (

        <div className="container carousel-container">
            <div className="wave-content project-title">
                <h2 className='wave-title'>Projects</h2>
                <h2 className='wave-title1'>Projects</h2>
            </div>
            <Carousel variant='dark'>

                <Carousel.Item>
                    <img
                        className="project"
                        src={snuProject}
                        alt="Second slide"
                    />

                    <Carousel.Caption className='label'>
                        <h3 ><span className='label-title'>Neural Data AutoPlot Program</span></h3>
                        <p className='stacks'>Stacks: Python Libraries - Dash, SciPy(Signal Processing), etc</p>
                        <p>A GUI web application that helps neuroscientists to plot and analyze neural data without writing a code.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="project"
                        src={webdev101}
                        alt="Fourth slide"
                    />

                    <Carousel.Caption className='label'>
                        <h3 ><span className='label-title'>WebDeb101</span></h3>
                        <p className='stacks'>JavaScript(React), HTML, CSS</p>
                        <p>
                            A course platform which contains 12-weeks web development course designed and written by myself.
                            <br />
                            Course Website: <a href='https://officerchul.github.io/webDev101/'>https://officerchul.github.io/webDev101/</a>
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="project"
                        src={javaProject}
                        alt="First slide"

                    />
                    <Carousel.Caption className='label'>
                        <h3 ><span className='label-title'>Online Networking Platform</span></h3>
                        <p className='stacks'>Stacks: Java, JUit Test</p>
                        <p>A social network application that job seekers can upload their introduction and interests for recruiters, like LinkedIn. <br />Worked on testing apps by using JUnit Test.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="project"
                        src={oldWebProject}
                        alt="Third slide"
                    />

                    <Carousel.Caption className='label'>
                        <h3 ><span className='label-title'>My Old Website</span></h3>
                        <p className='stacks'>Stacks: JavaScript(React), Netlify, HTML, CSS</p>
                        <p>
                            My old portfolio website. I am currently not using it.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>

            </Carousel>
        </div>
    );


}
