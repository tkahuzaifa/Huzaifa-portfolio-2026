export type ProjectLink = {
  id: number | string;
  link: string;
  title: string;
};

export type CaseStudySection = {
  problem?: string[];
  approach?: string[];
  architecture?: string[];
  challenges?: string[];
  outcome?: string[];
};

export type Project = {
  slug: string;
  title: string;
  company?: string;
  timePeriod?: string;
  descriptionDetail: string[];
  technologies?: string[];
  images: { src: string; title: string; description?: string }[];
  links?: {
    videoType?: "loom" | "googleDrive";
    videoUrl?: string; // loom url OR google drive fileId
    webLink?: ProjectLink[];
    github?: ProjectLink[];
  };
  caseStudy?: CaseStudySection;
};
