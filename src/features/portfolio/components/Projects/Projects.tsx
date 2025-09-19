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
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
                <div className="relative overflow-hidden">
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {project.title}
                  </h3>

                  <div className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {project.desc}
                  </div>

                  <div className="mb-4">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Tech Stack
                    </span>
                    <p className="text-sm text-sky-600 font-medium mt-1">
                      {project.stack}
                    </p>
                  </div>

                  <div className="flex justify-between items-center">
                    <ProjectsBtn ghUrl={project.github} />

                    {project.website && (
                      <a
                        href={project.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-2 bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-opacity-50"
                        aria-label="Visit live website"
                      >
                        <svg
                          className="w-4 h-4 mr-1"
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