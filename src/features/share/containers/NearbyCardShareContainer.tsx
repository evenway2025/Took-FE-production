import { motion, useAnimation, useMotionValue } from 'framer-motion';
import { LoaderIcon } from 'lucide-react';

import useHistoryBack from '@/shared/hooks/useHistoryBack';

import { NearbyProfile } from '../components/NearbyProfile';
import { useNearbyCardsQuery } from '../hooks/queries/useNearbyCardQuery';
import { useCurrentLocation } from '../hooks/useCurrentLocation';

type Params = {
  jobType: 'DESIGNER' | 'DEVELOPER';
  cardId: string;
};

export const NearbyCardShareContainer = ({ cardId, jobType }: Params) => {
  const y = useMotionValue(0);
  const controls = useAnimation();

  const { location } = useCurrentLocation();

  const { data, isLoading } = useNearbyCardsQuery(location?.latitude, location?.longitude);

  const historyBack = useHistoryBack();

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: any) => {
    event.stopPropagation();

    if (info.offset.y > 200) {
      controls.start({ y: 600, transition: { duration: 0.4 } });
      setTimeout(() => {
        historyBack();
      }, 300);
    } else {
      controls.start({ y: 0, transition: { type: 'spring', stiffness: 300, damping: 25 } });
    }
  };

  const backgroundStyle = {
    backgroundColor: jobType === 'DEVELOPER' ? 'rgba(12, 109, 255, 0.4)' : 'rgba(92, 45, 255, 0.4)',
  };

  return (
    <>
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 600 }}
        onDragEnd={(e, info) => handleDragEnd(e, info)}
        animate={controls}
        whileDrag={{ zIndex: 9999 }}
        style={{
          y,
        }}
      >
        <div
          className="flex h-[478px] w-[320px] flex-col items-center gap-2 overflow-y-scroll rounded-[24px] px-[18px] pb-10 pt-[28px]"
          style={backgroundStyle}
        >
          {isLoading && <LoaderIcon className="animate-spin" />}
          {data?.profiles.map(({ userId, nickname, name, detailJobEn, imagePath }) => (
            <NearbyProfile
              key={cardId}
              cardId={Number(cardId)}
              userId={userId}
              profileImg={imagePath}
              name={nickname ?? name ?? ''}
              jobDetail={detailJobEn}
            />
          ))}
        </div>
      </motion.div>
      <div className="mt-[24px] h-[36px]" />
    </>
  );
};
