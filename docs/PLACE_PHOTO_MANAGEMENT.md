# 장소별 공통 이미지 관리

서울픽의 장소 사진은 `data/place-media.json`에서 관리합니다. 장소 콘텐츠와 지도 데이터에는 파일 경로와 크레딧을 다시 적지 않고 `placeId`만 저장합니다.

## 구조

- `images`: 이미지 ID별 파일 경로, 대체 텍스트, 원본 크기, 초점, 작가, 원문, 라이선스, 확인일
- `places`: 장소 ID, slug, 이름, 자치구 ID 목록, 사진 상태(`ready`/`missing`), 대표 이미지 ID, 추가 이미지 ID 목록
- `data/place-media.ts`: 타입, 조회 함수, 참조 무결성 검사
- `components/place-photo.tsx`: 공통 사진·오류 대체·초점·크레딧 표시

지역과 코스는 `representativePlaceId`를 사용합니다. 별도의 전용 사진이 필요할 때만 `coverImageId`를 지정합니다. 코스의 대표 장소는 반드시 `stops`에 포함되어야 하며 `pnpm check:place-media`가 이를 검사합니다.

## 대표 사진 교체 예시

경복궁 대표 사진을 교체하는 경우:

1. 새 파일을 `public/images/places/gyeongbokgung-v2.webp`처럼 새 버전 이름으로 저장합니다.
2. `data/place-media.json`의 `images`에 `img-gyeongbokgung-v2` 항목을 추가합니다. 실제 대체 텍스트, 원본 크기, 초점, 크레딧, 원문 URL, 라이선스와 확인일을 모두 기록합니다.
3. 같은 파일의 `places.gyeongbokgung.representativeImageId`만 `img-gyeongbokgung-v2`로 변경합니다.
4. `pnpm check:place-media`, `pnpm check:images`, `pnpm typecheck`, `pnpm build`를 실행합니다.
5. 커밋·푸시 후 Vercel 배포가 완료되면 홈 추천 카드, 지도 종로구 카드, 명소 목록, 경복궁 상세, 지역 목록, 추천 코스에서 같은 새 사진이 표시되는지 확인합니다.

정적 파일과 JSON을 수정해도 운영 사이트에는 즉시 반영되지 않습니다. 새 빌드가 기존 Vercel 프로젝트의 운영 배포로 승격된 뒤 반영됩니다. 새 파일명이나 버전 경로를 사용하면 브라우저와 CDN에 남은 이전 파일 캐시를 피할 수 있습니다.

기존 파일은 `rg`와 `pnpm check:images`로 참조가 없음을 확인한 후 삭제합니다.
