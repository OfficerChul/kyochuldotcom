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

                                    <div role="status" className="flex flex-col justify-end h-[500px] px-6 pb-6 mb-3 shadow-lg transition ease-in-out rounded-xl max-w-sm  hover:-translate-y-1 hover:scale-105 hover:border-purple-400 hover:duration-300 border-gray-200  dark:border-gray-700 border-solid border-4 ">
                                        <div className="flex justify-center items-center mb-10 sm:mb-4 h-48 dark:bg-gray-700 ">
                                            <a className='block w-68 h-52 overflow-hidden rounded-xl ' href={project.website}><img className='border-4 rounded-xl w-full h-full object-fill border-gray-300' src={project.img} alt={project.title} /></a>

                                        </div>
                                        <div className="py-2 dark:bg-gray-700 w-100 font-bold sm:text-base text-xs">{project.title}</div>
                                        <hr className='pb-2'/>
                                        <div className="dark:bg-gray-700 sm:text-sm text-xs">{project.desc}</div>
                                        <br />


                                        <div className="flex justify-center gap-3 ml-8 sm:ml-0">
                                                <ProjectsBtn ghUrl={project.github}/>
                                                <div className=''>
                                                    <span className="">Dev Stacks</span>
                                                    <div className="font-mono w-48 dark:bg-gray-700 text-xs">{project.stack}</div>
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