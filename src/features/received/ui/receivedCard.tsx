'use client';
import Image from 'next/image';
import React from 'react';

import { Card } from '@/features/home/types';
import { cn } from '@/shared/lib/utils';
import { spacingStyles } from '@/shared/spacing';
import WrappedAvatar from '@/shared/ui/Avatar';
import Tag from '@/shared/ui/tag/tag';
import Thumbnail from '@/shared/ui/thumbnail';

type ReceivedCardProps = {
  cardData: Card;
};

function RenderingThumbnail({ cardData }: ReceivedCardProps) {
  const previewInfoType = cardData.previewInfoType;
  const previewInfo = cardData.previewInfo;

  switch (previewInfoType) {
    case 'PROJECT':
      return (
        <Thumbnail
          tag="대표 프로젝트"
          title={previewInfo.project?.title}
          description={previewInfo.project?.link}
          className="!w-auto !bg-gray-700"
        />
      );
    case 'CONTENT':
      return (
        <Thumbnail
          tag="작성한 글"
          title={previewInfo.content?.title}
          description={previewInfo.content?.link}
          imageUrl={previewInfo.content?.imageUrl}
          className="!w-auto !bg-gray-700"
        />
      );
    case 'HOBBY':
      return <Thumbnail tag="취미" description={previewInfo.hobby} className="!w-auto !bg-gray-700" />;
    case 'SNS':
      return (
        <Thumbnail
          tag="SNS"
          title={previewInfo.sns?.link}
          imageUrl={previewInfo.content?.imageUrl} // sns icon 조건부 렌더링 추후 구현
          className="!w-auto !bg-gray-700"
        />
      );
    case 'NEWS':
      return <Thumbnail tag="최근 소식" description={previewInfo.news} className="!w-auto !bg-gray-700" />;
    case 'REGION':
      return <Thumbnail tag="활동 지역" description={previewInfo.region} className="!w-auto !bg-gray-700" />;
    default:
      return null;
  }
}

export default function ReceivedCard({ cardData }: ReceivedCardProps) {
  function ParseSummary(summary: string) {
    const MAX_LENGTH = 22;
    if (summary.length >= MAX_LENGTH) return summary.substring(0, MAX_LENGTH) + '...';
    else return summary;
  }
  return (
    <div
      className={cn(
        'flex h-auto w-auto flex-col justify-center rounded-2xl bg-gray-800',
        spacingStyles({ marginX: 'ml', paddingX: 'ml', paddingY: 'ml' }),
      )}
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <WrappedAvatar src={cardData?.imagePath} alt="f" size="medium" />
          <div className="flex flex-col items-start">
            <div className="flex w-36 items-center justify-start gap-2 text-white">
              <p className="text-title-2">{cardData.nickname}</p>
              <p className="text-caption-1">{cardData.organization}</p>
            </div>
            <p className="text-body-3 text-white">{cardData.detailJob}</p>
          </div>
        </div>
        <Image src="/icons/developer-icon-white.svg" alt="icon" width={16} height={16} className="self-start" />
      </div>
      <p
        className={cn(
          'w-auto text-ellipsis text-body-5 text-white',
          spacingStyles({ marginTop: 'md', marginBottom: 'lg' }),
        )}
      >
        {ParseSummary(cardData.summary)}
      </p>
      <div className={cn('flex gap-1', spacingStyles({ marginBottom: 'md' }))}>
        {cardData.interestDomain.map((tag, index) => {
          return <Tag key={index} size="sm" message={tag} className="bg-opacity-white-10 text-white" />;
        })}
      </div>
      <RenderingThumbnail cardData={cardData} />
    </div>
  );
}
