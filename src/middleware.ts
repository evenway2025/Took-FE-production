// middleware.ts
import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 현재 URL 경로 가져오기
  const path = request.nextUrl.pathname;
  const isFile = request.nextUrl.pathname.match(/\.(.*)$/);

  // 인증이 필요하지 않은 경로들
  const publicPaths = [
    '/login',
    '/api/auth', // 인증 관련 API 경로
    '/api/auth/callback', // 소셜 로그인 콜백 경로
  ];

  // 현재 경로가 public 경로인지 확인
  const isPublicPath = publicPaths.some((publicPath) => path === publicPath || path.startsWith(`${publicPath}/`));

  // 토큰 확인
  const accessToken = request.cookies.get('accessToken');
  const refreshToken = request.cookies.get('refreshToken');

  // 문자가 있는지 검사합니다 (예: .css, .js, .png 등).
  // 로그인 페이지 CSS 깨짐 현상 해결
  if (isFile) {
    return NextResponse.next();
  }

  // 토큰이 존재할 때 로그인 페이지에 접근한다면 /경로로 리다이렉트
  if (isPublicPath && accessToken && refreshToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 인증이 필요한 경로에 토큰 없이 접근하려고 하면 로그인 페이지로 리다이렉트
  if (!isPublicPath && (!accessToken || !refreshToken)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * 다음으로 시작하는 경로를 제외한 모든 요청 경로를 매칭합니다:
     * - api (API 라우트)
     * - _next/static (정적 파일)
     * - _next/image (이미지 최적화 파일)
     * - favicon.ico (파비콘 파일)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
