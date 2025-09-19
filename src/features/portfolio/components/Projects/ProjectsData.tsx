import { ProjectData } from '../../types';
import oldWebsiteProject from '../../../../assets/images/projects/old-website-project.png';
import javaSocialNetworkProject from '../../../../assets/images/projects/java-social-network-project.jpg';
import snuDashProject from '../../../../assets/images/projects/snu-dash-project.png';
import newWebsite from '../../../../assets/images/projects/new_website.jpg';
import pkaWebsite from '../../../../assets/images/projects/pka-website.png';
import courseWebsite from '../../../../assets/images/projects/course-website.png';
import UPS from '../../../../assets/images/projects/UPS.png';

export const projectsData: ProjectData[] = [
  {
    img: newWebsite,
    title: 'Personal Website v2.0',
    desc: (
      <>
        My current personal website built with modern React and TypeScript.
        Features a clean, responsive design with dark mode support and smooth animations.
        Showcases my portfolio, skills, and professional journey.
      </>
    ),
    stack: 'React, TypeScript, Tailwind CSS, Firebase',
    github: 'https://github.com/OfficerChul/kyochuldotcom',
    website: 'https://kyochul.com'
  },
  {
    img: pkaWebsite,
    title: 'PKA Website',
    desc: (
      <>
        A professional website for Phi Kappa Alpha fraternity chapter.
        Built with modern web technologies featuring event management,
        member portal, and alumni networking capabilities.
      </>
    ),
    stack: 'React, Node.js, MongoDB, Express',
    github: 'https://github.com/kyochul98/pka-website',
    website: 'https://pka-website.netlify.app'
  },
  {
    img: courseWebsite,
    title: 'WebDev 101 Course Website',
    desc: (
      <>
        An educational platform for web development courses.
        Features interactive lessons, code examples, and student progress tracking.
        Designed to help beginners learn web development fundamentals.
      </>
    ),
    stack: 'HTML, CSS, JavaScript, Bootstrap',
    github: 'https://github.com/kyochul98/webdev101',
    website: 'https://webdev101.netlify.app'
  },
  {
    img: UPS,
    title: 'UPS Delivery Tracker',
    desc: (
      <>
        A package tracking application built with Java and Spring Boot.
        Features real-time tracking, delivery notifications, and route optimization.
        Demonstrates RESTful API design and microservices architecture.
      </>
    ),
    stack: 'Java, Spring Boot, MySQL, React',
    github: 'https://github.com/kyochul98/ups-tracker',
    website: ''
  },
  {
    img: snuDashProject,
    title: 'SNU Dashboard',
    desc: (
      <>
        A comprehensive dashboard for Seoul National University.
        Features course management, grade tracking, and campus resources.
        Built with modern web technologies for optimal user experience.
      </>
    ),
    stack: 'React, TypeScript, Node.js, PostgreSQL',
    github: 'https://github.com/kyochul98/snu-dashboard',
    website: 'https://snu-dashboard.vercel.app'
  },
  {
    img: javaSocialNetworkProject,
    title: 'Java Social Network',
    desc: (
      <>
        A full-stack social networking application built with Java and Spring Boot.
        Features user authentication, real-time messaging, post creation and sharing,
        friend connections, and news feed functionality. Demonstrates object-oriented
        programming principles and database design.
      </>
    ),
    stack: 'Java, Spring Boot, MySQL, HTML/CSS, JavaScript',
    github: 'https://github.com/kyochul-jang/java-social-network',
    website: 'https://java-social-network-demo.herokuapp.com'
  },
  {
    img: oldWebsiteProject,
    title: 'Personal Website v1.0',
    desc: (
      <>
        My first personal portfolio website built with vanilla technologies.
        A milestone project that marked the beginning of my web development journey.
        Features responsive design and smooth animations.
      </>
    ),
    stack: 'HTML5, CSS3, JavaScript, Bootstrap',
    github: 'https://github.com/OfficerChul/old-website',
    website: 'https://officerchul.github.io/old-website'
  }
];