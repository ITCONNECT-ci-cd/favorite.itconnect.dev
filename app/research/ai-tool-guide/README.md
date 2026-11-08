# AI 도구 가이드

- 경로: `/research/ai-tool-guide`
- 공식 공개 자료 확인일: 2026-11-08. 디자인 도구 5개는 공식 README, 사이트, Chrome Web Store와 manifest를 확인했다. 업무 확장 7개는 앞선 공개 자료 조사를 요약했다.
- `catalog.ts`가 내용과 출처의 원본이다. 새 항목은 고유 id, 비용·설치·주의사항, 검증 범위, 공식 URL을 함께 적는다. 모호한 제품명은 확인한 저장소를 명시한다.
- 도구 설치, 계정 연결, 고객 자료 전송, 북마크 DB 수정, 인증·권한 설정 변경은 하지 않는다. 새 페이지는 기존 사이트와 같은 공개 정보 안내 페이지다.
- 검색·분류는 브라우저 메모리에서만 작동한다. 개인 상태를 저장하거나 외부로 보내지 않는다.
- 테스트: `npm test -- app/research/ai-tool-guide/ToolGuide.test.tsx components/Sidebar.test.tsx components/MobileChips.test.tsx`, `npm run typecheck`, `npm run lint`.
- Node 26에서는 기존 테스트의 Web Storage 전역 충돌을 피하려면 `NODE_OPTIONS=--no-experimental-webstorage npm test`를 사용한다. 운영 Node 24 설정은 변경하지 않는다.
- 배포 기준은 Vercel의 현재 파일 기반 배포다. 로컬의 다른 변경을 운영에 덮어쓰지 않도록 현재 배포 파일 SHA를 보존하고, 가이드 폴더와 Sidebar/MobileChips 관련 변경만 교체한다. 환경변수·proxy·DB·관리자 코드는 보존한다.
