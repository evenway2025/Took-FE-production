// mocks/sample.ts
import { CardDetailDto } from '../types/cardDetail';

// API 응답 형식에 맞는 임시 데이터
export const mockCardDetailData: CardDetailDto = {
  status: 'CONTINUE',
  message: '성공적으로 조회되었습니다.',
  timestamp: '2025-03-10T08:03:28.800Z',
  data: {
    nickname: '이재인',
    job: 'DEVELOPER',
    detailJob: 'Frontend Developer',
    organization: '디프만',
    summary: '사용자 경험을 중요시하는 프론트엔드 개발자입니다. ',
    region: '게더',
    interestDomain: ['웹 개발', 'UI/UX', '프론트엔드', 'React'],
    sns: [
      {
        type: 'INSTAGRAM',
        link: 'https://github.com/jaeiny',
      },
      {
        type: 'GITHUB',
        link: 'https://github.com/jaeiny',
      },
      {
        type: 'LINKEDIN',
        link: 'https://github.com/jaeiny',
      },
      {
        type: 'NAVER_BLOG',
        link: 'https://github.com/jaeiny',
      },
      {
        type: 'NAVER_BLOG',
        link: 'https://github.com/jaeiny',
      },
    ],
    news: '새로운 프로젝트 공개',
    hobby: '농구, 코딩, 커피 마시기',
    content: [
      {
        title: 'Spring Boot로 RESTful API 만들기',
        link: 'https://blog.example.com/posts/123',
        imageUrl: '/icons/imageIcon.svg',
        description: 'Spring Boot를 이용한 RESTful API 개발 방법을 소개합니다.',
      },
      {
        title: 'Spring Boot로 RESTful API 만들기',
        link: 'https://blog.example.com/posts/123',
        imageUrl: '/icons/imageIcon.svg',
        description: 'Spring Boot를 이용한 RESTful API 개발 방법을 소개합니다.',
      },
    ],
    project: [
      {
        title: 'UI 컴포넌트 라이브러리',
        link: 'https://github.com/username/project',
        imageUrl: '/icons/imageIcon.svg',
        description: 'React와 TypeScript로 만든 UI 컴포넌트 모음',
      },
      {
        title: '개발자 네트워킹 플랫폼',
        link: 'https://github.com/username/project',
        imageUrl: '/icons/imageIcon.svg',
        description: '개발자들이 서로 연결되고 프로젝트를 공유하는 앱',
      },
    ],
  },
};
