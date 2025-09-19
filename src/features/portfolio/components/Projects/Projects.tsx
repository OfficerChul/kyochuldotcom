import React from 'react';
import { Fade, Slide } from 'react-awesome-reveal';
import { ProjectsProps } from '../../types';
import { projectsData } from './ProjectsData';
import ProjectsBtn from './ProjectsBtn';

const Projects: React.FC<ProjectsProps> = ({ id }) => {
  return (
    <section className="bg-gray-50 py-16" id={id}>
      <div className="container mx-auto px-4">
        <Fade cascade damping={0.1} triggerOnce={true} direction="up">
          <div className="text-center mb-12">
            <h2 className="font-mono text-4xl md:text-6xl text-sky-300 font-extrabold mb-4">
              Projects
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Here are some of the projects I've worked on that showcase my skills and experience
              in software development and web technologies.
            </p>
          </div>
        </Fade>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <Slide
              key={index}
              direction={index % 2 === 0 ? 'left' : 'right'}
              triggerOnce={true}
              delay={index * 200}
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 h-full flex flex-col">
                <div className="relative overflow-hidden">
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
                </div>

                <div className="p-6 flex flex-col flex-grow border-t border-gray-200">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {project.title}
                  </h3>

                  <div className="text-gray-600 text-sm mb-4 leading-relaxed min-h-[120px]">
                    {project.desc}
                  </div>

                  <div className="mb-4">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Tech Stack
                    </span>
                    <div className="flex flex-wrap gap-2 mt-2 min-h-[32px]">
                      {project.stack.split(', ').map((tech, idx) => {
                        // 기술별 맞춤 색상
                        let colorClass = 'bg-gray-100 text-gray-800 border-gray-300';

                        if (tech.toLowerCase().includes('react')) {
                          colorClass = 'bg-cyan-50 text-cyan-700 border-cyan-300 hover:bg-cyan-100';
                        } else if (tech.toLowerCase().includes('typescript')) {
                          colorClass = 'bg-blue-50 text-blue-700 border-blue-300 hover:bg-blue-100';
                        } else if (tech.toLowerCase().includes('node')) {
                          colorClass = 'bg-green-50 text-green-700 border-green-300 hover:bg-green-100';
                        } else if (tech.toLowerCase().includes('python')) {
                          colorClass = 'bg-yellow-50 text-yellow-700 border-yellow-300 hover:bg-yellow-100';
                        } else if (tech.toLowerCase().includes('java')) {
                          colorClass = 'bg-orange-50 text-orange-700 border-orange-300 hover:bg-orange-100';
                        } else if (tech.toLowerCase().includes('tailwind')) {
                          colorClass = 'bg-teal-50 text-teal-700 border-teal-300 hover:bg-teal-100';
                        } else if (tech.toLowerCase().includes('firebase')) {
                          colorClass = 'bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100';
                        } else if (tech.toLowerCase().includes('sql') || tech.toLowerCase().includes('postgres') || tech.toLowerCase().includes('mysql')) {
                          colorClass = 'bg-indigo-50 text-indigo-700 border-indigo-300 hover:bg-indigo-100';
                        } else if (tech.toLowerCase().includes('mongo')) {
                          colorClass = 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100';
                        } else if (tech.toLowerCase().includes('express')) {
                          colorClass = 'bg-gray-50 text-gray-700 border-gray-400 hover:bg-gray-100';
                        } else if (tech.toLowerCase().includes('spring')) {
                          colorClass = 'bg-lime-50 text-lime-700 border-lime-300 hover:bg-lime-100';
                        } else if (tech.toLowerCase().includes('html')) {
                          colorClass = 'bg-red-50 text-red-700 border-red-300 hover:bg-red-100';
                        } else if (tech.toLowerCase().includes('css')) {
                          colorClass = 'bg-purple-50 text-purple-700 border-purple-300 hover:bg-purple-100';
                        } else if (tech.toLowerCase().includes('javascript') || tech.toLowerCase().includes('js')) {
                          colorClass = 'bg-yellow-50 text-yellow-700 border-yellow-300 hover:bg-yellow-100';
                        } else if (tech.toLowerCase().includes('bootstrap')) {
                          colorClass = 'bg-violet-50 text-violet-700 border-violet-300 hover:bg-violet-100';
                        }

                        return (
                          <span
                            key={idx}
                            className={`inline-flex items-center px-1.5 py-0 text-[10px] font-semibold ${colorClass} border rounded-full transition-all duration-200`}
                          >
                            {tech}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-auto">
                    <ProjectsBtn ghUrl={project.github} />

                    {project.website ? (
                      <a
                        href={project.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-sky-600 bg-sky-50 border border-sky-200 rounded-lg hover:bg-sky-100 hover:text-sky-700 hover:border-sky-300 transition-all duration-300 hover:-translate-y-0.5"
                        aria-label="Visit live website"
                      >
                        <svg
                          className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                        Live Demo
                      </a>
                    ) : (
                      <div className="w-24"></div>
                    )}
                  </div>
                </div>
              </div>
            </Slide>
          ))}
        </div>

        <Fade triggerOnce={true} delay={800} direction="up">
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Want to see more of my work?
            </p>
            <a
              href="https://github.com/kyochul-jang"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                  clipRule="evenodd"
                />
              </svg>
              View All Projects on GitHub
            </a>
          </div>
        </Fade>
      </div>
    </section>
  );
};

export default Projects;