import React from 'react';
import "./Projects.css";
import { projectData } from './ProjectsData';
import ProjectsBtn from './ProjectsBtn';
import './Projects.css';
import Fade from 'react-reveal/Fade';


export function Projects({ id }) {
    return (
        <div id={id}>
            <Fade left cascade>
                <h2 className='flex justify-center mt-8 mb-8 ' id='about2-title'>Projects</h2>


                <ul className='flex justify-center gap-4 pr-8 flex-wrap'>
                    {projectData.map((project) => (
                        <li className=''>

                            <div role="status" class="transition ease-in-out rounded-xl  p-4 max-w-sm mb-3 hover:-translate-y-1 hover:scale-105 hover:border-purple-400 hover:duration-300 border-gray-200 shadow  md:p-6 dark:border-gray-700 border-solid border-4 ">
                                <div class="flex justify-center items-center mb-4 h-48 dark:bg-gray-700 ">
                                    <img className='project-image w-100 h-100 ' src={project.img} alt='java-Project' />

                                </div>
                                <div class="h-2.5 dark:bg-gray-700 w-100 mb-4 font-bold">{project.title}</div>
                                <hr />
                                <div class="h-2 dark:bg-gray-700 mb-24">{project.desc}</div>
                                <br />
                                <hr />
                                <div class="flex items-center space-x-3">

                                    
                                    <ProjectsBtn ghUrl={project.github} />
                                    <div className='mb-5 flex flex-col justify-center'>
                                        <span class="w-24 mb-2 badge badge--info">Dev Stacks</span>

                                        <div class="font-mono w-48 h-2 dark:bg-gray-700">{project.stack}</div>
                                    </div>


                                </div>
                                {/* <span className='flex justify-end font-mono text-xs'>Press the<br />GitHub Icon</span> */}

                            </div>
                        </li>
                    ))}
                </ul>
            </Fade>



        </div>
    )

}

export default Projects