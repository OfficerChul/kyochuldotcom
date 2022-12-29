import React from 'react'
import { Carousel } from 'react-bootstrap';
import './Projects-Carousel.css';
import { projectData } from '../Projects/ProjectsData';



export default function Projects() {
    return (

        <div className="container carousel-container" >

            <Carousel variant='dark'>
                {projectData.map((project) => (
                    <Carousel.Item>

                        <img
                            className="project"
                            src={project.img}
                            alt={project.title}
                        />

                    </Carousel.Item>
                ))}

            </Carousel>

        </div>
    );


}
