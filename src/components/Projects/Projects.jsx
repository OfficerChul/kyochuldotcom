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
                        <h3 ><span className='label-title'>Third slide label</span></h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="project"
                        src={webdev101}
                        alt="Fourth slide"
                    />

                    <Carousel.Caption className='label'>
                        <h3 ><span className='label-title'>Third slide label</span></h3>
                        <p>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
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
                        <h3 ><span className='label-title'>Third slide label</span></h3>
                        <p className='stacks'>Stacks: Java</p>
                        <h5>Built a social network platform for getting a job like LinkedIn. <br />Worked on testing apps by using JUnit Test.</h5>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="project"
                        src={oldWebProject}
                        alt="Third slide"
                    />

                    <Carousel.Caption className='label'>
                        <h3 ><span className='label-title'>Third slide label</span></h3>
                        <p>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>

            </Carousel>
        </div>
    );


}
