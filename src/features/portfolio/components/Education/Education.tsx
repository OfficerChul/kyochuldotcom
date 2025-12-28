import React from 'react';
import { SectionWrapper, Card } from '../../../../shared/components/ui';

interface EducationProps {
  id?: string;
}

const EDUCATIONS = [
  {
    school: 'Seoul National University',
    department: 'Graduate School of AI',
    degree: 'Ph.D. in Artificial Intelligence',
    period: '2024.09 - Present',
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
  <SectionWrapper id={id} title="Education" background="gradient">
    <div className="max-w-4xl mx-auto space-y-6">
      {EDUCATIONS.map((edu, index) => (
        <Card key={index} variant="glass">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
            <div className="flex-1">
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800">{edu.school}</h3>
              <p className="text-gray-700 font-mono mt-1 text-xs sm:text-sm md:text-base">{edu.department}</p>
              <p className="text-gray-600 mt-2 text-xs sm:text-sm md:text-base">{edu.degree}</p>
              {edu.note && <p className="text-gray-500 text-xs sm:text-sm mt-1 italic">{edu.note}</p>}
            </div>
            <div className="text-sky-500 font-mono font-semibold whitespace-nowrap text-xs sm:text-sm md:text-base">
              {edu.period}
            </div>
          </div>
        </Card>
      ))}
    </div>
  </SectionWrapper>
);

export default Education;
