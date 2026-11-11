# AI 도구 가이드

## 현재 표시 기준

- 전체 43개를 디자인 10, 개발 10, 기획·문서 5, 영상·음성 6, 지식·데이터 4, 업무 자동화 8의 주 기능 기준으로 분류한다. 추가 요청·기존 저장소 같은 유입 경로는 화면 분류로 쓰지 않는다.
- 모든 화면에서 한 행에 한 항목을 표시한다. 넓은 화면은 이름·기능·활용을 나란히, 모바일은 같은 행 안에서 세로로 읽는다. 카테고리 표시·필터·검색을 함께 제공한다.

- 사용자의 후속 요청에 따라 전체 34개의 기능·역할·업무 활용 문장을 다시 작성했다. 기본 카드에는 `기능과 역할`, `우리 업무 활용` 두 내용만 표시한다.
- 설치·시작 방법인 `setup`은 카드 데이터와 검색 대상에서 제거했다. 제목·소개·메타데이터의 시작 안내 표현도 수정했다. 비용·주의·출처와 필요한 보안·이용 제한 알림은 유지한다.
- 북마크 DB 등록은 기존 로그인 대기 상태를 유지한다. 원본 데이터·홈·메뉴·인증·공개 범위를 변경하지 않는다.

## 2026-11-12 GitHub AI 도구 8개 추가·TasteSkill 갱신

- GitHub AI Top10 소개 자료를 기준으로 같은 GitHub 저장소가 이미 있는 항목은 제외했다. VoiceStudio는 중복이라 고치지 않았다.
- `data/requested-resources.json`에 HyperFrames(영상·음성), Hallmark·Impeccable(디자인), FreeLLMAPI·rea(morluto/rea)·T3 Code·Cloudflare security-audit-skill·Ghidra(개발)를 추가했다. rea는 기존 rea-video(JuneYaooo/rea-video)와 다른 저장소다.
- TasteSkill은 2026-11-05 2.5판(회사 웹사이트·브라우저 화면 폭 4가지 검사·대시보드 주의)을 반영했다. 디자인 비교표는 기존 5개를 유지한다.
- 문안은 공식 저장소 메타와 소개 자료 범위다. 설치·실행은 하지 않았다.

## 2026-11-09 FilmCraft CLI 추가

- 공식 저장소 `storytold/filmcraft`를 확인하고 `영상·음성`에 중복 없이 추가했다. 기존 34개 내용과 행 단위 화면은 보존한다.
- 클립 연결·교체·배속, 자막 편집·입출력은 공식 문서로 확인했다. 준비한 한·영 자막 적용과 자동 인식·번역을 구분하며, 뉴스레터 사례를 실행 검증한 것으로 표현하지 않는다.
- 알파 단계와 MCP 파일 접근·저장 주의를 안내한다. 이 작업은 정보 추가이며 도구 설치나 계정 연결은 하지 않는다.
- 개별 `evidence` 확인일을 지원한다. 상단 날짜는 마지막 업데이트일이며 기존 항목 전체를 재검증한 날짜가 아니다.

## 2026-11-08 저장소 가이드 확장

- 공개 즐겨찾기 전체 분류에서 외부 GitHub 저장소 14개를 확인했다. 모두 바이브코딩 분류이며, 회사 프로젝트는 제외했다. 옛 소유자명인 chopratejas/headroom과 danny-avila/LibreChat은 공식 현재 주소로 표시한다.
- 새 요청은 GitHub 7개와 COREVIS 웹사이트 1개다. 기존 14개와 URL·저장소 기준 중복은 없었다. 기존 디자인 5개·업무 7개를 보존해 총 34개 카드로 제공한다.
- `data/saved-repositories.json`, `data/requested-resources.json`은 공식 README·문서·라이선스 기반 요약이다. 기본 화면에는 기능과 역할, 업무 활용을 우선 표시한다. 도입 판단에 직접 영향을 주는 제약은 `notice`로 접지 않고 보여준다.
- 연구 중 확인한 핵심: AutoRAG 2.0/legacy를 구분한다. code-animation-prompts의 유료 재판매 제한, treg의 외부 서비스 제공 조건, auto-ontology-mcp의 DB 비밀번호 평문 저장을 기본 노출한다.
- 새 8개 자료는 /info에 수록한다. 원본 북마크 DB는 현재 관리자 로그인 부재로 변경하지 않았다. 사용자가 컴퓨터 앞에 없으므로 원본 등록만 보류하며, 로그인 뒤 기존 URL 정규화 기준으로 다시 중복 확인한 후 추가한다.
- 홈·메뉴·DB·인증·공개 권한은 변경하지 않는다.

- 경로: `/info`. 기존 `/research/ai-tool-guide`는 새 주소로 영구 리디렉션한다. 가이드 UI·데이터는 이 폴더에서 재사용하며 홈 랜딩은 바꾸지 않는다.
- 공식 공개 자료 확인일: 2026-11-08. 디자인 도구 5개는 공식 README, 사이트, Chrome Web Store와 manifest를 확인했다. 업무 확장 7개는 앞선 공개 자료 조사를 요약했다.
- `catalog.ts`가 내용과 출처의 원본이다. 새 항목은 고유 id, 기능·활용·비용·주의사항, 검증 범위, 공식 URL을 함께 적는다. 모호한 제품명은 확인한 저장소를 명시한다.
- 도구 설치, 계정 연결, 고객 자료 전송, 북마크 DB 수정, 인증·권한 설정 변경은 하지 않는다. 새 페이지는 기존 사이트와 같은 공개 정보 안내 페이지다.
- 검색·분류는 브라우저 메모리에서만 작동한다. 개인 상태를 저장하거나 외부로 보내지 않는다.
- 오늘 대화의 12개 항목을 중복 없이 수록한다. Agent Desktop 카드에는 공식 v1.2.0·Windows 지원·Apache-2.0·MCP와 관련 도구 Agent Browser를 추가 확인해 반영했다. Agent Browser는 관련 자료로 묶고 별도 항목 수에는 중복 계산하지 않는다.
- 테스트: `npm test -- app/info/page.test.tsx app/research/ai-tool-guide/page.test.ts app/research/ai-tool-guide/ToolGuide.test.tsx components/Sidebar.test.tsx components/MobileChips.test.tsx`, `npm run typecheck`, `npm run lint`.
- Node 26에서는 기존 테스트의 Web Storage 전역 충돌을 피하려면 `NODE_OPTIONS=--no-experimental-webstorage npm test`를 사용한다. 운영 Node 24 설정은 변경하지 않는다.
- 배포 기준은 Vercel의 현재 파일 기반 배포다. 로컬의 다른 변경을 운영에 덮어쓰지 않도록 현재 배포 파일 SHA를 보존하고, 가이드 폴더와 Sidebar/MobileChips 관련 변경만 교체한다. 환경변수·proxy·DB·관리자 코드는 보존한다.
