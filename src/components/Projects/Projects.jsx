import React from 'react';
import { projectData } from './ProjectsData';
import ProjectsBtn from './ProjectsBtn';
import { Slide, Fade } from 'react-awesome-reveal';


export function Projects({ id }) {
    return (
        <div id={id} className='bg-white pb-2 flex justify-center'>
            <Slide direction='right' cascade damping={0.1} triggerOnce={true}>
                <div className="">
                    <h2 className='font-mono text-6xl text-sky-300 font-extrabold flex justify-center py-6'>Projects</h2>

                    <Fade cascade damping={0.1} triggerOnce direction={"right"}>

                        <ul className='flex justify-center px-6 sm:px-0 gap-4 flex-wrap font-mono'>
                            {projectData.map((project) => (
                                <li className=''>

                                    <div role="status" className="flex flex-col justify-end h-[500px] px-6 pb-6 mb-3 shadow-lg transition ease-in-out rounded-xl max-w-xs border-solid border-4 hover:-translate-y-1 hover:scale-105 hover:border-purple-400 hover:duration-300 border-gray-200 dark:border-gray-700">
                                        <div className="mb-4 sm:mb-4">
                                            <a className='block overflow-hidden rounded-xl' href={project.website}>
                                                <img className='sm:w-96 w-full h-56 object-cover rounded-xl border-4 border-gray-300' src={project.img} alt={project.title} />
                                            </a>
                                        </div>
                                        <div className="relative top-2">
                                            <div className="py-2 dark:bg-gray-700 w-full font-bold text-sm">
                                                {project.title}
                                            </div>
                                            <hr className='my-2' />
                                            <div className="dark:bg-gray-700 text-xs">
                                                {project.desc}
                                            </div>
                                            <br />
                                        </div>


                                        <div className='flex justify-center gap-3 ml-12'>
                                            <ProjectsBtn ghUrl={project.github} />
                                            <div className=''>
                                                <span className="">Dev Stacks</span>
                                                <div className="font-mono text-xs w-48 dark:bg-gray-700">
                                                    {project.stack}
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Fade>
                </div>
            </Slide>

        </div>
    )

}

export default Projects