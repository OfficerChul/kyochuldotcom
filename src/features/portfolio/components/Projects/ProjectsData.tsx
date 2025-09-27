import { ProjectData } from '../../types';
import newWebsite from '../../../../assets/images/projects/new_website.jpg';
import pkaWebsite from '../../../../assets/images/projects/pka-website.png';
import mobileGUIAgent from '../../../../assets/images/projects/mobile_gui_agent.jpg';

export const projectsData: ProjectData[] = [
  {
    img: newWebsite,
    title: 'Personal Website v2.0',
    desc: (
      <>
        This is my personal website showcasing my work as a developer and AI researcher.
        It was originally built from scratch before the emergence of ChatGPT, but has since evolved by leveraging LLM-based services.
        While my main expertise lies in AI research, I also take pride in my strong development skills.
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
        During my time at Purdue, I co-developed the official Purdue Korean Association website as one of the founding members of the development team.
        The website serves the Korean community at Purdue as well as those interested in Korean culture.
        My primary contributions included frontend development, design, CRUD functionality, and email automation.
      </>
    ),
    stack: 'React, Node.js, MongoDB, Express',
    github: 'https://github.com/kyochul98/pka-website',
    website: 'https://purdueka.org/'
  },
  {
    img: mobileGUIAgent,
    title: 'Mobile GUI Agent Development',
    desc: (
      <>
        Designed and implemented a Mobile GUI Agent for smartphone automation by post-training SVLAM and deploying it on-device.
      </>
    ),
    stack: 'ADB, Huggingface TRL, UIAutomator2, Google AI Edge, Python',
    github: '',
    website: 'https://devocean.sk.com/community/detail.do?ID=167400'
  }
];
