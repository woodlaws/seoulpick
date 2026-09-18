# 서울픽 · SEOUL PICK

서울픽 홈페이지와 블로그의 **일반 Next.js 16 App Router** 소스입니다. Sites 전용 Vinext·Cloudflare 실행 파일과 인증 파일은 포함하지 않았습니다.

## 포함된 상태

- 기존 지역·장소·코스·K-컬처·가이드 페이지와 검색·저장 기능
- 블로그 목록, 6개 분류, 검색, 상세 템플릿, 관련 글 연결
- 노션에서 가져온 발행 대기 기획 30개 (`data/blog-drafts.json`)
- 공개 블로그 글 0개. 초안은 공개 목록·상세·사이트맵에 표시되지 않습니다.

## 로컬 실행

Node.js 22.13 이상과 pnpm 10을 사용합니다.

```bash
pnpm install --frozen-lockfile
pnpm typecheck
pnpm check:blog
pnpm build
pnpm dev
```

## 저장소와 배포

기존 저장소는 `woodlaws/seoulpick`, 운영 주소는 https://seoulpick.vercel.app 입니다. Vercel 프로젝트 `seoulpick`은 GitHub `main` 브랜치의 저장소 루트에서 빌드합니다. 배포 전후 점검 항목은 [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)에 있습니다.

`pnpm-lock.yaml`과 `pnpm-workspace.yaml`을 소스와 함께 커밋합니다. `node_modules`, `.next`, `.env`, API 키는 커밋하지 않습니다. `data/blog-drafts.json`에는 발행 전 기획 메모가 포함되므로 저장소 공개 범위를 결정할 때 고려하세요. 노션 인증 토큰은 포함하지 않았습니다.

## Vercel 설정

Framework Preset은 **Next.js**, Root Directory는 저장소 루트, Production Branch는 `main`입니다. `vercel.json`에도 Next.js 프레임워크를 명시했습니다. 설치에는 pnpm 잠금 파일을, 빌드에는 `next build`를 사용하고 Output Directory는 Next.js 기본값으로 둡니다.

`NEXT_PUBLIC_SITE_URL`을 `https://seoulpick.vercel.app`로 설정하면 canonical, 공유 메타데이터, sitemap.xml, robots.txt의 기준 주소가 명확해집니다. 설정하지 않으면 Vercel의 `VERCEL_PROJECT_PRODUCTION_URL`, `VERCEL_URL` 순서로 사용합니다.

Vercel의 Git 연결을 사용하면 이후 GitHub `main` 푸시가 새 배포를 시작합니다.

## 글 발행

완성 원고·사진 권한·공식 출처·실제 발행일 확인 후 `data/blog.ts`의 `posts` 배열에 공개 글을 추가합니다. 자세한 순서는 [BLOG_PUBLISHING.md](BLOG_PUBLISHING.md)를 보세요. 기획 순서를 발행일로 사용하거나 기획 메모를 원고로 공개하지 마세요.

## 운영 확인

- 사진 출처는 `/photo-credits`에 있습니다.
- 장소 운영 정보와 외부 링크는 게시 시점에 다시 확인해야 합니다.
- 저장한 장소는 사용자의 브라우저 localStorage에만 보관됩니다.
- 영어 제목과 키워드는 보관 중이며 영어 본문·언어별 URL은 아직 없습니다.
