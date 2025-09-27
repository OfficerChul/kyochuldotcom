import React from 'react';
import { Fade } from 'react-awesome-reveal';

interface EducationProps {
  id?: string;
}

const EDUCATIONS = [
  {
    school: 'Seoul National University',
    department: 'Graduate School of AI',
    degree: 'Ph.D. in Artificial Intelligence',
    period: '2025.09 - Present',
    note: 'Advisor: Prof. Youngjae Yu',
  },
  {
    school: 'Purdue University',
    department: 'Department of Computer Science',
    degree: 'Bachelor of Science in Computer Science',
    period: '2020.08 - 2024.05',
    note: 'GPA: 3.71/4.0',
  },
];

const Education: React.FC<EducationProps> = ({ id }) => (
  <section className="bg-gradient-to-br from-gray-50 to-sky-50 py-12 md:py-16 lg:py-20" id={id}>
    <div className="container mx-auto px-4 sm:px-6 lg:px-20">
      <Fade cascade damping={0.1} triggerOnce={true} direction="up">
        <div className="text-center mb-12">
          <h2 className="font-mono text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-sky-300 font-extrabold mb-4">
            Education
          </h2>
          <div className="w-20 h-1 bg-sky-300 mx-auto rounded-full"></div>
        </div>
      </Fade>
      
      <Fade cascade damping={0.1} triggerOnce={true} direction="up">
        <div className="max-w-4xl mx-auto space-y-6">
          {EDUCATIONS.map((edu, index) => (
            <div key={index} className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800">{edu.school}</h3>
                  <p className="text-gray-700 font-mono mt-1">{edu.department}</p>
                  <p className="text-gray-600 mt-2">{edu.degree}</p>
                  {edu.note && <p className="text-gray-500 text-sm mt-1 italic">{edu.note}</p>}
                </div>
                <div className="text-sky-500 font-mono font-semibold whitespace-nowrap">
                  {edu.period}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Fade>
    </div>
  </section>
);

export default Education;
