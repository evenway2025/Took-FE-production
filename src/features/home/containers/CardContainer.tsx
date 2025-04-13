'use client';

import { motion, useAnimation, useMotionValue } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { convertPreviewInfo } from '@/features/share/utils/convertPreviewType';
import { getPreviewContentByType } from '@/features/share/utils/getPreviewContent';

import { AddCard } from '../components/BusinessCard/AddCard';
import {
  CardAvatar,
  CardDescription,
  CardFooter,
  CardJob,
  CardName,
  CardTags,
  WrappedCard,
} from '../components/BusinessCard/Card';
import { useCardQuery } from '../hooks/queries/useCardQuery';
import { Card } from '../types';

import { ClipboardContainer } from './ClipboardContainer';

export const CardContainer = () => {
  const router = useRouter();
  const { data } = useCardQuery();

  const [activeTab, setActiveTab] = useState(0);

  const goToDetailPage = (id: number) => {
    router.push(`/card-detail/${id}?type=mycard`);
  };
  const goToSharePage = (cards: Card[], activeTab: number) => {
    const encodingProfileImg = encodeURIComponent(cards[activeTab]?.imagePath);

    router.push(
      `/share?profileImg=${encodingProfileImg}&name=${cards[activeTab]?.nickname}&job=${cards[activeTab]?.detailJob}&jobType=${cards[activeTab]?.job}&url=https://www.even-took.com/card-share/${cards[activeTab].id}`,
    );
  };
  const y = useMotionValue(0);
  const controls = useAnimation();

  if (!data) return null;

  const { cards } = data;

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: any, activeTab: number) => {
    if (info.offset.y < -200) {
      // 공유 페이지 이동
      controls.start({ y: -600, transition: { duration: 0.4 } });
      setTimeout(() => {
        goToSharePage(cards, activeTab);
      }, 300);
    } else {
      // 원위치 복귀
      controls.start({ y: 0, transition: { type: 'spring', stiffness: 300, damping: 25 } });
    }
  };

  return (
    <>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        onSlideChange={(swiper) => setActiveTab(swiper.activeIndex)}
        className="home-swiper h-[420px]"
      >
        {cards.map(
          ({
            id,
            job: type,
            imagePath: profileImg,
            nickname: name,
            organization,
            detailJob,
            summary: introduction,
            interestDomain: tags,
            previewInfo: project,
            previewInfoType,
          }) => {
            const previewContent = getPreviewContentByType(project, previewInfoType);
            return (
              <SwiperSlide
                key={id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'start',
                }}
              >
                <motion.div
                  drag="y"
                  dragConstraints={{ top: -600, bottom: 0 }}
                  onDragEnd={(e, info) => handleDragEnd(e, info, activeTab)}
                  animate={controls}
                  whileDrag={{ zIndex: 9999 }}
                  style={{
                    y,
                  }}
                >
                  <WrappedCard
                    cardType={type}
                    style={{
                      marginBottom: '20px',
                    }}
                    onClick={() => goToDetailPage(id)}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        height: '100%',
                      }}
                    >
                      <div>
                        <CardAvatar
                          src={profileImg || '/icon/default-image-s.svg'}
                          alt={`${name}의 프로필 이미지`}
                        />
                        <CardName organization={organization}>{name}</CardName>
                        <CardJob jobType={type}>{detailJob}</CardJob>
                        <CardDescription>{introduction}</CardDescription>
                      </div>
                      <div>
                        <CardTags tagType={type} tags={tags} />
                        <CardFooter
                          previewInfo={convertPreviewInfo(previewInfoType)}
                          title={previewContent.title}
                          description={previewContent.description}
                          imageUrl={previewContent.imageUrl}
                        />
                      </div>
                    </div>
                  </WrappedCard>
                </motion.div>
              </SwiperSlide>
            );
          },
        )}
        {cards.length < 3 && (
          <SwiperSlide
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'start' }}
          >
            <AddCard />
          </SwiperSlide>
        )}
      </Swiper>
      {cards && cards.length > 0 && cards[activeTab] && (
        <ClipboardContainer
          id={cards[activeTab]?.id}
          name={cards[activeTab]?.nickname}
          job={cards[activeTab]?.detailJob}
          type={cards[activeTab]?.job}
          profileImg={cards[activeTab]?.imagePath}
        />
      )}
    </>
  );
};
