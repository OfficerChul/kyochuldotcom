import javaProject from './java-social-network-project.jpg';
import snuProject from './snu-dash-project.png';
import UPS from './UPS.png';
import webdev101 from './course-website.png';
import kyochuldotcom from './new_website.jpg';
import pkawebsite from './pka-website.png';

const webdev101_url = <div>A course platform which contains 12-weeks web development course. All course materials are designed and written by OfficerChul. Please visit
<a href='https://officerchul.github.io/webDev101/'> my course website!</a></div>;

export const projectData = [

    {
        img: javaProject,
        title: 'Social Network Profile Application',
        desc: 'A social network application that job seekers can upload their introduction and interests for recruiters, like LinkedIn. Worked on testing apps by using JUnit Test.',
        stack: 'Java, JUit Test',
        github: 'https://github.com/OfficerChul/Social-Network-Profile-Application',
        website: 'https://github.com/OfficerChul/Social-Network-Profile-Application',
    },
    {
        img: snuProject,
        title: 'Neural Data AutoPlot Program',
        desc: 'A GUI web application that helps neuroscientists to plot and analyze neural data without writing a code. Used various filters for signal processing.',
        stack: 'Python Libraries - Dash, SciPy(Signal Processing)',
        github: 'https://github.com/OfficerChul/Neural-Data-AutoPlot-Program',
        website: 'https://github.com/OfficerChul/Neural-Data-AutoPlot-Program'
    },
    {
        img: webdev101,
        title: 'WebDev101',
        desc: webdev101_url,
        stack: 'JavaScript(React), HTML, CSS, Firebase',
        github: 'https://github.com/OfficerChul/webDev101',
        website: 'https://officerchul.github.io/webDev101/'
    },
    {
        img: UPS,
        title: 'Revenue Prediction Model',
        desc: 'Developed a predictive model by using a K-means algorithm in the Scikit-Learn framework to identify the potential of portfolio companies for UPS to partner with.',
        stack: 'SKlearn, Python, KNN, Streamlit',
        github: 'https://github.com/OfficerChul',
        website: 'https://github.com/OfficerChul'
    },
    {
        img: kyochuldotcom,
        title: 'kyochuldotcom',
        desc: 'My portfolio website that I created from the scratch without using any template.',
        stack: 'JavaScript(React), Tailwind, CSS, HTML, PostCSS',
        github: 'https://github.com/OfficerChul/kyochuldotcom',
        website: 'https://kyochuljang.com/'
    },
    {
        img: pkawebsite,
        title: 'Purdue Korean Association Official Website',
        desc: 'A website that our dev team created for Purdue Korean Association. Backend is private repo, and frontend is partially private.',
        stack: 'Typescript(React), Tailwind, Next.js, Nest.js',
        github: 'https://github.com/OfficerChul/purdueka.org',
        website: 'https://purdueka.org/'
    }
];