# 서울픽 배포 점검표

기존 GitHub 저장소 `woodlaws/seoulpick`의 `main`을 기존 Vercel 프로젝트 `seoulpick`에 배포할 때 사용합니다.

## 소스와 설정

- [ ] `package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`, Next.js·TypeScript 설정이 저장소 루트에 있다.
- [ ] `app`, `components`, `data`, `lib`, `public`, `scripts`가 모두 반영됐다.
- [ ] 사진·로고·파비콘의 실제 파일 경로와 코드 참조가 일치한다.
- [ ] `node_modules`, `.next`, `.env`, 인증 토큰, API 키는 커밋되지 않았다.
- [ ] Vercel 연결 저장소는 `woodlaws/seoulpick`, Production Branch는 `main`, Root Directory는 저장소 루트다.
- [ ] Framework Preset은 Next.js이며 Output Directory를 수동으로 지정하지 않았다.

## 로컬 확인

- [ ] `pnpm install --frozen-lockfile`가 성공한다.
- [ ] `pnpm typecheck`, `pnpm check:blog`, `pnpm build`가 모두 성공한다.
- [ ] 홈, 지역, 명소, 코스, 검색, 무료 가이드, 블로그 목록·분류가 열린다.
- [ ] 미발행 블로그 글은 목록·검색·상세·sitemap.xml에 나타나지 않는다.

## 배포 확인

- [ ] GitHub `main` 커밋 SHA와 Vercel Production 배포의 커밋 SHA가 같다.
- [ ] Vercel 빌드 로그에 의존성 설치와 Next.js 빌드가 기록되고 배포가 READY다.
- [ ] https://seoulpick.vercel.app 의 홈과 실제 주요 페이지가 정상 응답한다.
- [ ] 메뉴 클릭, 상세 페이지 직접 접속, 새로고침이 정상 작동한다.
- [ ] 사진·로고·파비콘이 실제 운영 주소에서 표시된다.
- [ ] PC와 모바일에서 메뉴·본문·이미지가 정상이고 가로 넘침이 없다.
- [ ] 주요 기능을 막는 콘솔·네트워크 오류가 없다.
- [ ] 존재하지 않는 주소는 정상적인 404를 반환한다.
