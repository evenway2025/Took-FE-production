import { cn } from '../lib/utils';

type headerPropsType = {
  title: string;
  description?: string;
  isFourthStep?: boolean;
};

/**
 * 공통 컴포넌트 - Header
 *
 * @example <Header title={`명함에 추가할 태그를 \n 선택해주세요`} description="직군에 맞는 템플릿으로 내 명함을 만들 수 있어요!" />
 *
 * @param {string} title - 제목
 * @param {string} [description] - 부가 설명
 *
 * @returns {JSX.Element} Header 컴포넌트
 */

function Header({ title, description, isFourthStep }: headerPropsType) {
  return (
    <header
      className={cn(
        'relative z-50 flex w-full max-w-[600px] flex-col items-start justify-between gap-3',
        isFourthStep && 'bg-black',
      )}
    >
      <h1 className="m-0 whitespace-pre-line text-title-1 text-white">{title}</h1>
      <p className="m-0 text-body-3 text-gray-300">{description}</p>
    </header>
  );
}
export default Header;
