import Image from 'next/image';
import Link from 'next/link';

import { spacingStyles } from '@/shared/spacing';

import Empty from '../components/empty';
import SNS_CONFIG, { SnsType } from '../config/sns-config';
import { SnsDto } from '../types/cardDetail';

interface SNSProps {
  data: SnsDto[];
}

function SNS({ data }: SNSProps) {
  if (!data || data.length === 0) {
    return <Empty />;
  }

  return (
    /**
     * grid , flex 디자이너와 상의중
     */

    <div className="grid grid-cols-4 justify-items-center gap-8 sm:grid-cols-5">
      {data.map((sns, i) => {
        // sns.type을 SnsType으로 캐스팅
        const snsType = sns.type as SnsType;

        // config에서 해당 SNS 타입의 설정 가져오기
        // 만약 일치하는 타입이 없으면 ETC를 기본값으로 사용
        const snsConfig = SNS_CONFIG[snsType] || SNS_CONFIG.ETC;
        return (
          <Link href={sns.link} key={i} target="_blank">
            <div className="flex w-[56px] flex-col items-center">
              <div
                className={`${spacingStyles({ padding: 'md' })} flex items-center justify-center rounded-full bg-opacity-purple-30`}
              >
                <Image src={snsConfig.iconPath} alt={snsConfig.iconAlt} width={24} height={24} />
              </div>
              <p className="mt-[7px] w-full truncate text-center text-caption-1">
                {sns.type.substring(0, 1) + sns.type.substring(1).toLowerCase().split('_').join(' ')}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default SNS;
