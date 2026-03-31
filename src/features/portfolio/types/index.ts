export interface ProjectData {
  img: string;
  title: string;
  desc: string | React.JSX.Element;
  stack: string;
  github: string;
  website: string;
}

export interface ProjectsProps {
  id?: string;
}

export interface ProjectsBtnProps {
  ghUrl: string;
}

export type Publication = {
  title: string;
  authors: string[];
  venue?: string;
  year?: number;
  link?: string;
};