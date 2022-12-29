import React from 'react';
import logo from '../Main/triangle-green.png';
import "./Projects.css";
import { projectData } from './ProjectsData';

export function Projects() {
    return (
        <div>
            <h2 className='flex justify-center mt-8 mb-8' id='about2-title'>Projects</h2>


            <ul className='flex justify-center gap-4 flex-wrap'>
                {projectData.map((project) => (
                    <div role="status" class="transition ease-in-out rounded-xl hover:-translate-y-1 hover:scale-105 hover:border-indigo-300 hover:duration-300 p-4 max-w-sm mb-3 border-gray-200 shadow  md:p-6 dark:border-gray-700 border-solid border-4 ">
                        <div class="flex justify-center items-center mb-4 h-48 dark:bg-gray-700 ">
                            <img className='project-image w-100 h-100 ' src={project.img} alt='java-Project' />

                        </div>
                        <div class="h-2.5 dark:bg-gray-700 w-100 mb-4 font-bold">{project.title}</div>
                        <hr />
                        <div class="h-2 dark:bg-gray-700 mb-24">{project.desc}</div>

                        <hr />
                        <div class="flex items-center space-x-3">

                            <img className='w-14 h-14' src={logo} alt='logo' />
                            <div className='mb-5 flex flex-col justify-center'>
                                <div class="h-2.5 dark:bg-gray-700 w-32 mb-2">Stack</div>
                                <div class="w-48 h-2 dark:bg-gray-700">{project.stack}</div>
                            </div>
                        </div>
                        <span class="sr-only">Loading...</span>
                    </div>
                ))}
            </ul>



        </div>
    )

}

export default Projects