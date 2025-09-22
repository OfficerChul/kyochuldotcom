import React, { memo } from 'react';
import { Fade, Slide } from 'react-awesome-reveal';
import { ProjectsProps } from '../../types';
import { projectsData } from './ProjectsData';
import ProjectsBtn from './ProjectsBtn';
import { FancyButtonSmall } from '../../../../shared/components/ui/Button';

const Projects: React.FC<ProjectsProps> = memo(({ id }) => {
  return (
    <section className="bg-gray-50 py-12 md:py-16 lg:py-20" id={id}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Fade cascade damping={0.1} triggerOnce={true} direction="up">
          <div className="text-center mb-12">
            <h2 className="font-mono text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-sky-300 font-extrabold mb-4">
              Projects
            </h2>
            <div className="w-20 h-1 bg-sky-300 mx-auto rounded-full mb-4"></div>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto px-4 sm:px-0">
              Here are some of the projects I've worked on that showcase my skills and experience
              in software development and web technologies.
            </p>
          </div>
        </Fade>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projectsData.map((project, index) => (
            <Slide
              key={index}
              direction={index % 2 === 0 ? 'left' : 'right'}
              triggerOnce={true}
              delay={index * 200}
            >
              <div className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.01] h-full flex flex-col border-2 border-gray-100 hover:border-purple-500">
                <div className="relative overflow-hidden rounded-t-xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                  <img
                    src={project.img}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                      {project.title}
                    </h3>
                    <div className="w-12 h-0.5 bg-gradient-to-r from-sky-300 to-transparent"></div>
                  </div>

                  <div className="text-gray-600 text-sm mb-4 leading-relaxed min-h-[100px] sm:min-h-[120px] group-hover:text-gray-700 transition-colors duration-300">
                    {project.desc}
                  </div>

                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      Tech Stack
                    </span>
                    <div className="mt-2 min-h-[32px]">
                      <p className="text-xs leading-relaxed flex flex-wrap gap-x-1 gap-y-2 items-center">
                        {project.stack.split(', ').map((tech, idx, arr) => {
                          let textColor = 'text-gray-600';

                          if (tech.toLowerCase().includes('react')) {
                            textColor = 'text-cyan-600';
                          } else if (tech.toLowerCase().includes('typescript')) {
                            textColor = 'text-blue-600';
                          } else if (tech.toLowerCase().includes('node')) {
                            textColor = 'text-green-600';
                          } else if (tech.toLowerCase().includes('python')) {
                            textColor = 'text-yellow-600';
                          } else if (tech.toLowerCase().includes('java')) {
                            textColor = 'text-orange-600';
                          } else if (tech.toLowerCase().includes('tailwind')) {
                            textColor = 'text-teal-600';
                          } else if (tech.toLowerCase().includes('firebase')) {
                            textColor = 'text-amber-600';
                          } else if (tech.toLowerCase().includes('sql') || tech.toLowerCase().includes('postgres') || tech.toLowerCase().includes('mysql')) {
                            textColor = 'text-indigo-600';
                          } else if (tech.toLowerCase().includes('mongo')) {
                            textColor = 'text-emerald-600';
                          } else if (tech.toLowerCase().includes('express')) {
                            textColor = 'text-gray-700';
                          } else if (tech.toLowerCase().includes('spring')) {
                            textColor = 'text-lime-600';
                          } else if (tech.toLowerCase().includes('html')) {
                            textColor = 'text-red-600';
                          } else if (tech.toLowerCase().includes('css')) {
                            textColor = 'text-purple-600';
                          } else if (tech.toLowerCase().includes('javascript') || tech.toLowerCase().includes('js')) {
                            textColor = 'text-yellow-600';
                          } else if (tech.toLowerCase().includes('bootstrap')) {
                            textColor = 'text-violet-600';
                          }

                          return (
                            <React.Fragment key={idx}>
                              <span className={`inline-flex items-center px-2 py-0.5 font-semibold ${textColor} border border-gray-300 rounded-md hover:opacity-70 transition-opacity duration-200`}>
                                {tech}
                              </span>
                              {idx < arr.length - 1 && <span className="text-gray-400 mx-1">•</span>}
                            </React.Fragment>
                          );
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                    <ProjectsBtn ghUrl={project.github} />

                    {project.website ? (
                      <FancyButtonSmall
                        href={project.website}
                        className="px-3 py-1.5 text-xs font-medium text-sky-600 stroke-sky-400 hover:stroke-sky-600"
                        borderColor="rgba(14, 165, 233, 0.5)"
                        noSvgBorder={true}
                        shineColor="from-transparent via-blue-300/40 to-transparent"
                        ariaLabel="Visit live website"
                      >
                        <svg
                          className="w-3.5 h-3.5 group-hover/btn:rotate-12 transition-transform duration-300"
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
                        <span>Live Demo</span>
                      </FancyButtonSmall>
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
              href="https://github.com/OfficerChul?tab=repositories"
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
});

Projects.displayName = 'Projects';

export default Projects;
