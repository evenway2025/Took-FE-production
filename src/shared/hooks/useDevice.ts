import { useEffect, useRef, useState } from 'react';

type WindowSize = {
  width?: number;
  height?: number;
};

const MAX_MOBILE_SIZE = 992; // 모바일 최대 사이즈

// 웹뷰 여부를 제공하는 hook
const useWebview = () => {
  const isWebViewRef = useRef(false);

  useEffect(() => {
    if (isWebViewRef.current) return;

    if (typeof window !== 'undefined' && window.ReactNativeWebView) {
      isWebViewRef.current = true;
    }
  }, []);

  return {
    isWebView: isWebViewRef.current,
  };
};

// 윈도우 사이즈를 제공하는 hook
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      const { innerWidth: width, innerHeight: height } = window;
      setWindowSize({ width, height });
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

// 디바이스 정보를 제공하는 hook
const useDevice = () => {
  const { isWebView } = useWebview();
  const { width: windowWidth } = useWindowSize();
  const isMobile = !!windowWidth && windowWidth < MAX_MOBILE_SIZE;

  return { isWebView, isMobile };
};

export default useDevice;
