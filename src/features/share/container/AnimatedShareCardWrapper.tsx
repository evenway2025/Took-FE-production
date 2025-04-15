'use client';

import { motion, useAnimation } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { sendMessageToNative } from '@/features/auth/login/utils/nativeBridge';
import useDevice from '@/shared/hooks/useDevice';
import { useIsLoggedIn } from '@/shared/hooks/useIsLoggedIn';
import Toast from '@/shared/ui/Toast';
import handleAxiosError from '@/shared/utils/handleAxiosError';

import { ShareBackground } from '../components/background/ShareBackground';
import { useSaveCard } from '../hooks/mutations/useSaveCard';
import { useCardQuery } from '../hooks/queries/useCardQuery';
import { useShareStore } from '../store/shareStore';
import { Card } from '../types';

import { OpenShareCardDetailContainer } from './OpenShareCardDetailContainer';
import { ShareCardContentContainer } from './ShareCardContentContainer';

function AnimatedShareCardWrapper() {
  const controls = useAnimation();
  const [isAnimating, setIsAnimating] = useState(true);
  const { id } = useParams();
  const { data } = useCardQuery(id as string);
  const setFromSharedCard = useShareStore((state) => state.setFromSharedCard);
  const { mutate: saveCard } = useSaveCard();
  const { isLoggedIn } = useIsLoggedIn();
  const router = useRouter();
  const cardData = data?.data;

  const { isWebView, isMobileDevice, isIOS, isAndroid } = useDevice();

  // 웹뷰일 경우 네이티브 앱에서 저장 처리를 위한 딥링크 전송
  const urlScheme = isWebView ? 'took://' : 'https://www.took.com/';

  useEffect(() => {
    // 명함 공유 페이지에서 접근했음을 표시
    setFromSharedCard(true);

    // 웹뷰에서 열렸을 때
    if (isWebView && isLoggedIn) {
      sendMessageToNative({
        type: 'SHARE_CARD_DEEP_LINK',
        url: `took://card-share/${id}`,
        data: {
          cardId: id as string,
          type: 'receivedcard',
          shouldSave: true,
        },
      });

      if (isLoggedIn) {
        handleSaveCard();
      }
    }
    // 모바일 기기에서 브라우저로 열었을 때 (웹뷰가 아닌 상태)
    else if (isMobileDevice && !isWebView) {
      // 앱으로 딥링크 시도
      window.location.href = `took://card-share/${id}`;

      // 앱이 없는 경우 앱스토어로 리다이렉트(2초 후)
      const timeout = setTimeout(() => {
        if (isIOS) {
          // TODO: 앱스토어 링크 수정 필요
          window.location.href = 'https://apps.apple.com/app/id앱스토어ID'; // 앱스토어 링크
        } else if (isAndroid) {
          // TODO: 플레이스토어 링크 수정 필요
          window.location.href = 'https://play.google.com/store/apps/details?id=com.evenway2025.took'; // 플레이스토어 링크
        }
      }, 2000);

      return () => clearTimeout(timeout);
    }
    // 웹에서 접근한 경우 직접 저장
    else if (isLoggedIn) {
      handleSaveCard();
    }

    // 애니메이션은 웹뷰/웹 모두 실행
    controls
      .start({
        y: 0,
        x: 0,
        rotate: 0,
        scale: 1,
        opacity: 1,
        transition: {
          type: 'spring',
          damping: 14,
          stiffness: 70,
          duration: 2,
        },
      })
      .then(() => {
        setIsAnimating(false);
      });
  }, [controls, setFromSharedCard, isLoggedIn, isWebView, isMobileDevice, isIOS, isAndroid, id]);

  const handleSaveCard = () => {
    if (!id) return;

    saveCard(id as string, {
      onSuccess: () => {
        toast.success('명함이 저장되었습니다.');
      },
      onError: (error) => {
        handleAxiosError(error);
      },
    });
  };

  const handleMoveToDetail = () => {
    router.push(`${urlScheme}/card-detail/${id}?type=receivedcard`);
  };

  return (
    <>
      <div className="relative h-full w-full">
        <ShareBackground className="absolute z-[-10]" />

        {isAnimating && (
          <>
            {/* 전체 배경 오버레이 */}
            <div className="absolute inset-0 z-[-5] bg-white opacity-5 transition-opacity duration-500" />

            {/* 왼쪽 그라데이션 */}
            <div className="absolute left-0 top-0 z-[-5] h-full w-[18%] bg-gradient-to-r from-white to-transparent opacity-10 transition-opacity duration-500" />

            {/* 오른쪽 그라데이션 */}
            <div className="absolute right-0 top-0 z-[-5] h-full w-[18%] bg-gradient-to-l from-white to-transparent opacity-10 transition-opacity duration-500" />
          </>
        )}

        <motion.div
          className="mx-auto flex h-full w-full flex-col items-center justify-center"
          initial={{
            y: -350, // 더 높은 위치에서 시작
            x: 0,
            rotate: 10, // 비스듬하게 기울어진 상태에서 시작
            opacity: 0,
          }}
          animate={controls}
        >
          <section className="flex flex-col items-center justify-center" onClick={handleMoveToDetail}>
            <ShareCardContentContainer cardData={cardData as Card} />
            <div className="h-[46px]">
              <OpenShareCardDetailContainer isAnimating={isAnimating} cardData={cardData as Card} />
            </div>
          </section>
        </motion.div>
      </div>
      <Toast />
    </>
  );
}

export default AnimatedShareCardWrapper;
