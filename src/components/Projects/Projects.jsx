import React from 'react';
import "./Projects.css";
import { projectData } from './ProjectsData';
import ProjectsBtn from './ProjectsBtn';
import './Projects.css';
import { Slide } from 'react-awesome-reveal';


export function Projects({ id }) {
    return (
        <div id={id} className='bg-white pb-2'>
            <Slide direction='right' cascade damping={0.1} triggerOnce={true}>
                <div className="">
                    <h2 className='font-mono text-6xl text-sky-300 font-extrabold flex justify-center py-6'>Projects</h2>


                    <ul className='flex justify-center gap-4 pr-8 flex-wrap'>
                        {projectData.map((project) => (
                            <li className=''>

                                <div role="status" className="transition ease-in-out rounded-xl  p-4 max-w-sm mb-3 hover:-translate-y-1 hover:scale-105 hover:border-purple-400 hover:duration-300 border-gray-200 shadow  md:p-6 dark:border-gray-700 border-solid border-4 ">
                                    <div className="flex justify-center items-center mb-4 h-48 dark:bg-gray-700 ">
                                        <img className='project-image w-100 h-100 rounded-xl' src={project.img} alt={project.title} />

                                    </div>
                                    <div className="h-3 dark:bg-gray-700 w-100 font-bold sm:text-sm text-xs">{project.title}</div>
                                    <hr />
                                    <div className="h-2 dark:bg-gray-700 sm:mb-10 mb-4 sm:text-sm text-xs">{project.desc}</div>
                                    <br />
                                    <div className="flex justify-evenly space-x-3 mt-4">


                                        <ProjectsBtn ghUrl={project.github} />
                                        <div className='mb-5 flex flex-col'>
                                            <span className="w-24 mb-2 mt-2 badge badge--info">Dev Stacks</span>

                                            <div className="font-mono w-48 h-0 dark:bg-gray-700 text-xs">{project.stack}</div>
                                        </div>


                                    </div>


                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </Slide>

        </div>
    )

}

export default Projects