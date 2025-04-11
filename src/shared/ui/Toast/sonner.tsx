'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';

import { cn } from '@/shared/lib/utils';

import { MarginValue } from './types';

type ToasterProps = React.ComponentProps<typeof Sonner> & {
  bottomMargin?: MarginValue;
};

const Toaster = ({ bottomMargin = 'detail', ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  // 미리 정의된 마진 클래스 맵
  const marginClasses: Record<MarginValue, string> = {
    detail: 'mb-[20px]',
    receive: 'mb-[95px]',
  };

  // 기본 토스트 클래스
  const baseToastClass = cn(
    'group toast flex justify-center items-center',
    'group-[.toaster]:bg-gray-600 group-[.toaster]:text-gray-white group-[.toaster]:text-body-4 group-[.toaster]:max-w-fit',
    'group-[.toaster]:rounded-full group-[.toaster]:border-none',
    'group-[.toaster]:fixed group-[.toaster]:left-1/2 group-[.toaster]:transform group-[.toaster]:-translate-x-1/2',
    marginClasses[bottomMargin], // 미리 정의된 클래스 사용
  );

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className={cn('toaster group')}
      toastOptions={{
        classNames: {
          toast: baseToastClass,
          description: 'group-[.toast]:text-gray-white',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
