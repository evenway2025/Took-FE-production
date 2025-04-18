'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import { PreviewInfo } from '@/features/share/types';

import {
  WrappedCard,
  ShareCardAvatar,
  ShareCardName,
  ShareCardJob,
  ShareCardDescription,
  ShareCardTags,
  ShareCardFooter,
} from '../../components/Card';
import { Card, JopType, PreviewInfoType } from '../../types';
import { convertPreviewInfo } from '../../utils/convertPreviewType';
import { getPreviewContentByType } from '../../utils/getPreviewContent';

type CardNotesCardProps = {
  cards: Card[];
  toggleCardSelection?: (cardId: number) => void;
  selectedCards?: number[];
};

function CardNotesCard({ cards, toggleCardSelection, selectedCards }: CardNotesCardProps) {
  const [_, setActiveIndex] = useState(0);
  const isSingleCard = cards.length === 1;

  const getPreviewContent = (card: Card) => {
    if (!card?.previewInfo || !card?.previewInfoType) return {};

    const previewInfo = card.previewInfo as PreviewInfo;
    const type = card.previewInfoType.toUpperCase();

    return getPreviewContentByType(previewInfo, type);
  };

  return (
    <Swiper
      modules={[Pagination]}
      onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      pagination={{
        dynamicBullets: true,
        enabled: !isSingleCard,
      }}
      navigation={false}
      slidesPerView={isSingleCard ? 1 : 1.3}
      spaceBetween={isSingleCard ? 0 : 24}
      centeredSlides={true}
      className="custom-swiper h-[420px]"
    >
      {cards.map((card) => {
        const previewContent = getPreviewContent(card);
        const isSelected = selectedCards?.includes(card.id);

        return (
          <SwiperSlide
            key={card.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'start',
            }}
          >
            <WrappedCard cardType={card?.job as JopType} className="relative mb-[20px]">
              <div
                className="flex h-full cursor-pointer flex-col justify-between"
                onClick={(e) => {
                  e.stopPropagation(); // 이벤트 버블링 방지
                  toggleCardSelection && toggleCardSelection(card.id);
                }}
              >
                <button
                  className={`absolute right-[24px] top-[24px] flex h-[24px] w-[24px] items-center justify-center rounded-full ${isSelected ? 'bg-white' : 'bg-gray-600'}`}
                >
                  {isSelected && (
                    <Image src="/icons/check.svg" alt="선택됨" width={11} height={11} className="object-cover" />
                  )}
                </button>
                <ShareCardAvatar
                  src={card?.imagePath || '/icons/avatarIcon.png'}
                  alt={`${card?.nickname}의 프로필 이미지`}
                />
                <ShareCardName organization={card?.organization}>{card?.nickname}</ShareCardName>
                <ShareCardJob jobType={card?.job as JopType}>{card?.detailJob}</ShareCardJob>
                <ShareCardDescription>{card?.summary}</ShareCardDescription>
                <ShareCardTags tagType={card?.job as JopType} tags={card?.interestDomain || []} />
                <ShareCardFooter
                  previewInfo={convertPreviewInfo(card?.previewInfoType as PreviewInfoType)}
                  title={previewContent.title}
                  description={previewContent.description}
                  imageUrl={previewContent.imageUrl}
                />
              </div>
            </WrappedCard>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default CardNotesCard;
