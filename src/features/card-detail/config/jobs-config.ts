export type JobType = 'DEVELOPER' | 'DESIGNER';

interface JobConfig {
  backgroundImage: string;
  iconPath: string;
  iconAlt: string;
}

const JOB_CONFIG: Record<JobType, JobConfig> = {
  DEVELOPER: {
    backgroundImage: '/images/card-detail/card-detail-develop.png',
    iconPath: '/icons/developer-icon-white.svg',
    iconAlt: '개발자 아이콘',
  },
  DESIGNER: {
    backgroundImage: '/images/card-detail/card-detail-design.png',
    iconPath: '/icons/designer-icon-white.svg',
    iconAlt: '디자이너 아이콘',
  },
};

export default JOB_CONFIG;
