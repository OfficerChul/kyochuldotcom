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
        A modern portfolio showcasing my work as a developer and AI researcher.
        Built with React, TypeScript, and Tailwind CSS for optimal performance.
        Features smooth animations, responsive design, and an intuitive user experience.
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
        Full-stack platform for fraternity chapter management and alumni networking.
        Includes event scheduling, member directory, and secure authentication.
        Built with MERN stack to handle 500+ active users.
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
        Interactive learning platform for web development fundamentals.
        Features live code examples, progress tracking, and hands-on exercises.
        Helped 200+ students master HTML, CSS, and JavaScript basics.
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
        Enterprise-level package tracking system with real-time updates.
        Implements microservices architecture and RESTful APIs.
        Optimizes delivery routes using graph algorithms and handles 10K+ daily requests.
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
        Comprehensive academic dashboard for Seoul National University students.
        Integrates course registration, grade tracking, and campus resources.
        Serves 1000+ graduate students with real-time data synchronization.
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
        Full-featured social platform with real-time messaging and news feed.
        Implements secure authentication, friend networks, and content sharing.
        Demonstrates advanced OOP principles and efficient database design patterns.
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
        Original portfolio website showcasing my early web development skills.
        Built from scratch with vanilla JavaScript and custom CSS animations.
        A foundation project that sparked my passion for frontend development.
      </>
    ),
    stack: 'HTML5, CSS3, JavaScript, Bootstrap',
    github: 'https://github.com/OfficerChul/old-website',
    website: 'https://officerchul.github.io/old-website'
  }
];