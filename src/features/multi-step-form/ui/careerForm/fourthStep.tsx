'use client';

import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { CardTags, WrappedCard } from '@/features/home/components/BusinessCard/Card';
import { ThumbnailTag } from '@/shared/config';
import { cn } from '@/shared/lib/utils';
import { useCardFormStore } from '@/shared/store/cardFormState';
import Header from '@/shared/ui/header';
import Thumbnail from '@/shared/ui/thumbnail';

import { CareerFormData } from '../../schema';

import { SelectedTagType, tagConfig } from './tagFormStep/config/config';

const LAST_NUMBER = 7;

const HEADER_TITLE = `썸네일 명함에 대표로\n 보여줄 정보를 1개 선택해 주세요`;

function FourthStep() {
  const { control } = useFormContext<CareerFormData>();

  const formState = useCardFormStore((state) => state.tagArray);
  const tagArray = tagConfig.filter((tag) => formState.includes(tag.value));
  const [selectedTag, setSelectedTag] = useState<SelectedTagType>(tagArray[0]?.message ?? '대표 프로젝트');

  const [index, setIndex] = useState<number>(0);

  function handleSelectTag(tagMessage: SelectedTagType) {
    setSelectedTag(tagMessage);
    setIndex(tagArray.findIndex((tag) => tag.message === tagMessage));
  }

  return (
    <>
      <Header title={HEADER_TITLE} isFourthStep={true} />
      <section className="relative z-50 -mt-1 h-16 bg-gradient-to-b from-[#14141A] to-[rgba(20,20,26,0)]" />
      <main className="flex flex-col items-center justify-center">
        <WrappedCard
          cardType="DESIGNER"
          className="-mt-24 flex h-56 flex-col items-start justify-end gap-2 rounded-none rounded-b-md"
        >
          <CardTags tags={['관심 도메인1', '관심 도메인2']} tagType="DESIGNER" />
          <section className="h-4" />
          <Thumbnail
            tag={(tagArray[index]?.message as ThumbnailTag) ?? '대표 프로젝트'}
            title={tagArray[index]?.title ?? '대표 프로젝트'}
            description={tagArray[index]?.description ?? ''}
          />
        </WrappedCard>
        <div className="mt-4 flex min-w-[292px] gap-1 text-body-5 text-gray-500">
          <TextIcon />
          <p>위 화면은 예시이며, 홈에서는 직접 입력한 정보가 보여요. 소속 정보는 홈 명함에서 이름 옆에 표시돼요.</p>
        </div>
        <Controller
          control={control}
          name="previewInfoType"
          render={({ field: { onChange } }) => (
            <div className="grid-w-full my-6 grid w-full grid-cols-2 gap-2">
              {tagArray.map((tag) => {
                if (tag.id === LAST_NUMBER) return null;
                return (
                  <div
                    key={tag.id}
                    className={cn(
                      'flex h-10 cursor-pointer items-center justify-center rounded-[6px]',
                      selectedTag === tag.message
                        ? 'border border-primary-normal bg-gray-700 text-white'
                        : 'bg-gray-800 text-gray-600',
                    )}
                    onClick={() => {
                      handleSelectTag(tag.message);
                      onChange(tag.value.toUpperCase());
                    }}
                  >
                    <p>{tag.message}</p>
                  </div>
                );
              })}
            </div>
          )}
        />
      </main>
    </>
  );
}

const TextIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 9.00012V14.5001" stroke="#646486" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M10 6.50926L10.0083 6.5"
        stroke="#646486"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.0003 18.3333C14.6027 18.3333 18.3337 14.6023 18.3337 9.99996C18.3337 5.39758 14.6027 1.66663 10.0003 1.66663C5.39795 1.66663 1.66699 5.39758 1.66699 9.99996C1.66699 14.6023 5.39795 18.3333 10.0003 18.3333Z"
        stroke="#646486"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default FourthStep;
