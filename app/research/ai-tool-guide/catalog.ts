import { repositoryTools } from './repository-catalog';

export const GROUP_ORDER = ['design', 'development', 'planning', 'media', 'knowledge', 'automation'] as const;
export type ToolGroup = typeof GROUP_ORDER[number];
export const GROUP_LABELS: Record<ToolGroup, string> = {
  design: '디자인', development: '개발', planning: '기획·문서',
  media: '영상·음성', knowledge: '지식·데이터', automation: '업무 자동화',
};
export type ToolEntry = {
  id: string;
  name: string;
  group: ToolGroup;
  kind: string;
  role: string;
  summary: string;
  output: string;
  useCase: string;
  cost: string;
  caution: string;
  evidence: string;
  notice?: string;
  links: { label: string; url: string }[];
};

export const UPDATED_AT = '2026-11-12';
export const GUIDE_PATH = '/info';
export const originalTools: ToolEntry[] = [
  {
    id: 'taste-skill', name: 'TasteSkill', group: 'design', kind: '코딩 에이전트 스킬', role: '웹페이지의 시각적 완성도',
    summary: 'AI 코딩 에이전트가 회사 웹사이트의 화면 구성·서체·색상·사진을 정하고, 브라우저에서 화면 폭 4가지를 검사하도록 돕는 디자인 스킬입니다. 비슷비슷한 웹 화면을 줄이는 데 씁니다.',
    output: '브라우저에서 확인한 웹페이지와 구현 코드',
    useCase: '교육과정 소개, 행사 신청, 기업 소개처럼 첫인상이 중요한 회사·랜딩 페이지를 만들 때 좋습니다. 대시보드 같은 앱 화면은 결과를 먼저 확인한 뒤 쓰는 편이 안전합니다.',
    cost: '저장소는 MIT 오픈소스입니다. 별도 스킬 사용료는 확인되지 않았으며 API 키는 필요 없습니다. AI 에이전트 요금과 사진·폰트 등 자산의 이용 조건은 별도입니다.',
    caution: '기존 브랜드와 가독성 기준을 먼저 정해야 합니다. 사진·폰트·아이콘을 내려받을 수 있으며, MIT 라이선스가 모든 자산의 이용 권리를 보장하지는 않습니다. 2026년 11월 5일 나온 2.5판부터 회사 웹사이트에 맞춰졌고, 예전 스킬 일부는 별도 저장소로 분리됐습니다.',
    evidence: '2026-11-12 공식 README·소스 페이지(2.5판) 확인 · 설치·실행 성능 미검증',
    links: [{ label: '공식 저장소', url: 'https://github.com/Leonxlnx/taste-skill' }, { label: '프로젝트 사이트', url: 'https://tasteskill.dev' }],
  },
  {
    id: 'ui-ux-pro-max', name: 'UI/UX Pro Max', group: 'design', kind: '디자인 검색 스킬·CLI', role: '일관된 UI·UX 기준',
    summary: '스타일·색상·폰트·차트·UX 규칙을 검색해 프로젝트의 디자인 시스템과 화면 구현 기준을 제안하는 스킬입니다.',
    output: '디자인 시스템과 화면 구현 가이드',
    useCase: '교육 포털·LMS·수강신청·관리 대시보드의 화면을 일관되게 만들고 반응형·접근성 기준을 정할 때 활용합니다.',
    cost: '기본 저장소는 MIT 오픈소스입니다. 별도 Premium 상품이 안내돼 있으나 확정 가격은 이번 조사에서 확인하지 못했습니다. AI 에이전트 요금도 별도입니다.',
    caution: '권장안은 실제 사용자 조사나 접근성 인증을 대신하지 않습니다. 한국어 조판과 모바일 화면을 따로 확인하세요. 오래된 uipro-cli 안내와 구버전의 수량 표기는 혼동하지 않아야 합니다.',
    evidence: '공식 README·사이트 확인 · 추천 성능 미검증',
    links: [{ label: '공식 저장소', url: 'https://github.com/nextlevelbuilder/ui-ux-pro-max-skill' }, { label: '공식 사이트·상품 안내', url: 'https://uupm.cc' }],
  },
  {
    id: 'awesome-claude-design', name: 'Awesome Claude Design', group: 'design', kind: '디자인 참고 문서 모음', role: '유명 서비스 디자인 비교',
    summary: '유명 서비스의 디자인 패턴을 설명한 DESIGN.md 참고 목록입니다. 68종은 도구 수가 아니라 브랜드·서비스 사례 수입니다.',
    output: '디자인 방향 참고용 DESIGN.md',
    useCase: '고객과 홈페이지의 분위기를 고르거나, 디자인 수업에서 사례를 비교하고 우리만의 디자인 지침을 만드는 데 씁니다.',
    cost: '저장소는 MIT입니다. 연결된 getdesign.md에는 Catalog Pass 등 별도 상품도 있어 전체 서비스가 무료라고 볼 수 없습니다. 개별 다운로드 조건과 유료 가격은 미확인입니다.',
    caution: '브랜드가 제공하거나 보증한 공식 디자인 시스템이 아닙니다. 1:1 복제 대신 구조와 원리를 참고하세요. 상표·로고·전용 폰트 권리는 원 소유자에게 있습니다. getdesign.md 전체 카탈로그와 68개 목록은 범위가 다릅니다.',
    evidence: '공식 README의 68개 목록 확인 · 비공식 영감 자료',
    links: [{ label: '68개 목록·권리 안내', url: 'https://github.com/VoltAgent/awesome-claude-design' }, { label: '연결된 DESIGN.md 컬렉션', url: 'https://getdesign.md' }],
  },
  {
    id: 'design-motion', name: 'Design Motion Principles', group: 'design', kind: '모션 생성·검수 스킬', role: '화면 움직임 생성·검수',
    summary: '전환·피드백 애니메이션을 만들고 기존 화면의 과도한 움직임, 상태 변화 누락, 접근성·성능 문제를 점검하는 스킬입니다.',
    output: '모션 구현·개선안과 HTML/터미널 보고서',
    useCase: '퀴즈 정답 피드백, 신청 완료 안내, 모달·알림처럼 사용자가 상태 변화를 알아야 하는 화면을 다듬을 때 좋습니다.',
    cost: 'MIT 오픈소스입니다. 이용하는 AI 에이전트 요금은 별도입니다.',
    caution: '공개된 디자이너들의 작업을 바탕으로 한 제작자의 해석이지, 해당 디자이너들이 제작·보증한 공식 스킬은 아닙니다. 실제 브라우저, 성능, 움직임 줄이기 설정(prefers-reduced-motion)을 별도로 검증해야 합니다.',
    evidence: '공식 README 확인 · 브라우저 성능 미검증',
    links: [{ label: '공식 저장소', url: 'https://github.com/kylezantos/design-motion-principles' }],
  },
  {
    id: 'design-md-chrome', name: 'DESIGN.md Chrome', group: 'design', kind: 'Chrome 확장', role: '웹페이지 스타일 문서화',
    summary: '현재 페이지의 서체·색·간격·그림자·모션을 읽어 DESIGN.md나 SKILL.md로 정리하는 Chrome 확장입니다. 웹사이트 전체 복제 도구는 아닙니다.',
    output: '관찰한 스타일을 정리한 DESIGN.md / SKILL.md',
    useCase: '자사 홈페이지의 디자인 규칙을 문서화하거나 공개 참고 사이트의 화면 구조를 비교할 때 활용합니다.',
    cost: '소스는 MIT입니다. 확인한 Chrome Web Store에는 별도 요금 표시가 없었습니다. 다른 Chromium 브라우저의 호환성은 검증하지 않았습니다.',
    caution: '현재 페이지를 읽는 권한이 필요합니다. 소스의 manifest에는 상시 전체 사이트 host_permissions가 없고 스토어에는 데이터 미수집 선언이 있지만, 독립 보안감사를 뜻하지 않습니다. 내부 문서·학생정보가 있는 화면에서 사용하거나 추출 파일을 AI에 올리기 전 내용을 확인하세요. 추출은 복제 허락이 아닙니다.',
    evidence: '공식 저장소·스토어·권한 파일 확인 · 보안감사 아님',
    links: [{ label: '공식 저장소', url: 'https://github.com/bergside/design-md-chrome' }, { label: '공식 Chrome Web Store', url: 'https://chromewebstore.google.com/detail/designmd-style-extractor/ogpdnchdjiibhobphelbbkemnnemkfma' }, { label: '요청 권한 확인', url: 'https://github.com/bergside/design-md-chrome/blob/main/manifest.json' }],
  },
  {
    id: 'wondelai-skills', name: 'wondelai/skills', group: 'planning', kind: '전문 지식 스킬 모음', role: '전문 프레임워크 재사용',
    summary: '서적과 공개 가이드의 사고법을 AI 작업 지침으로 재구성한 스킬 모음입니다. 조사 시점에 전문 스킬 51개와 메타 스킬 14개를 구분했습니다.',
    output: '업무별 분석·검토·기획 프레임워크',
    useCase: '교육·컨설팅에서 반복하는 분석·기획·검토의 기준을 정리하고, 고객 상황에 맞는 질문과 검토 틀을 만들 때 참고합니다.',
    cost: '공개 저장소의 현재 LICENSE와 각 원자료의 이용 조건을 확인해야 합니다. AI 사용료는 별도이며, 원서나 저자의 공식 상품을 구매한 것과 같지 않습니다.',
    caution: '저자나 출판사가 보증한 공식 도구로 소개하면 안 됩니다. 프레임워크 요약은 원문 전체나 전문가의 판단을 대신하지 않으며, 출처·저작권을 보존해야 합니다.',
    evidence: '앞선 공개 자료 조사 요약 · 개별 스킬 성능 미검증',
    links: [{ label: '공식 프로젝트 저장소', url: 'https://github.com/wondelai/skills' }],
  },
  {
    id: 'agent-desktop', name: 'Vercel agent-desktop', group: 'automation', kind: '데스크톱 자동화 도구', role: '데스크톱 앱 조작',
    summary: 'macOS·Windows·Linux 앱의 화면 구조를 읽고 클릭·입력을 수행하는 도구입니다. AI 모델이 아니라 기존 에이전트에 컴퓨터 조작 기능을 붙입니다.',
    output: '데스크톱 UI 읽기·클릭·입력',
    useCase: 'API가 없는 앱의 반복 입력과 파일 대화상자 처리를 자동화할 때 검토합니다. 웹 본문 조작은 관련 도구 Agent Browser로 나눌 수 있습니다.',
    cost: 'Apache-2.0 오픈소스입니다. 실행 환경과 연결된 AI 모델 비용은 별도입니다.',
    caution: '앱별 접근성 호환성을 검증해야 하며, session은 보안 격리 환경이 아닙니다. 최소 권한·시험 데이터로 확인하고 외부 발송·삭제·결제에는 사람의 확인을 둡니다. 같은 이름의 다른 개발자 프로젝트와 혼동하지 마세요.',
    evidence: 'Vercel Labs 공식 자료·v1.2.0 확인 · 설치·연동하지 않음',
    links: [{ label: 'Vercel Labs 저장소', url: 'https://github.com/vercel-labs/agent-desktop' }, { label: '공식 데스크톱 문서', url: 'https://agent-browser.dev/desktop' }, { label: 'v1.2.0 릴리스', url: 'https://github.com/vercel-labs/agent-desktop/releases/tag/v1.2.0' }, { label: '관련 도구: Agent Browser', url: 'https://github.com/vercel-labs/agent-browser' }, { label: 'Agent Browser 공식 문서', url: 'https://agent-browser.dev' }],
  },
  {
    id: 'prompt-master', name: 'Prompt Master', group: 'planning', kind: '프롬프트 설계 자료', role: 'AI 요청의 구조화',
    summary: '목적·맥락·조건·출력 형식을 정리해 AI에 전달할 요청을 더 분명하게 만드는 프롬프트 설계 프로젝트입니다.',
    output: '더 구체적이고 재사용 가능한 프롬프트',
    useCase: '교육 실습 문제, 콘텐츠 제작, 제안서 분석처럼 반복하는 요청을 일정한 형식으로 정리하고 결과 품질을 비교할 때 씁니다.',
    cost: '저장소의 현재 라이선스와 사용 환경을 확인하세요. 연결된 AI 서비스 요금은 별도입니다.',
    caution: '프롬프트가 길거나 복잡하다고 결과가 더 좋아지는 것은 아닙니다. 입력 자료의 비밀정보와 불필요한 개인 정보를 제거하고 실제 과제로 품질을 확인합니다.',
    evidence: '앞선 공개 노션·연결 저장소 조사 요약',
    links: [{ label: '소개 글이 연결한 저장소', url: 'https://github.com/nidhinjs/prompt-master' }],
  },
  {
    id: 'humanizer', name: 'Humanizer', group: 'planning', kind: '문체 교정 스킬', role: 'AI 문장의 문체 편집',
    summary: 'AI가 자주 쓰는 과장과 상투적 표현을 찾아 문장을 다듬는 스킬입니다. 주로 영어 문체를 다루며 한국어 품질은 별도 확인이 필요합니다.',
    output: '원래 의미를 살려 다듬은 문장',
    useCase: '영문 회사 소개문과 블로그 초안을 편집하거나, 문체만 다듬고 사실·수치·의미는 유지해야 하는 작업에 활용합니다.',
    cost: '공개 저장소의 현재 라이선스를 확인하세요. AI 에이전트·서비스 요금은 별도입니다.',
    caution: 'AI 탐지 회피나 저자 위장 용도로 보장하는 도구가 아닙니다. 문체를 고치면서 수치·인용·주장·책임 범위까지 바뀌지 않도록 원문과 대조하세요.',
    evidence: '앞선 공개 자료 조사 요약 · 한국어 성능 미검증',
    links: [{ label: '소개 글이 연결한 저장소', url: 'https://github.com/blader/humanizer' }],
  },
  {
    id: 'knowledge-work-plugins', name: '직무별 플러그인', group: 'automation', kind: 'Claude 중심 업무 확장', role: '직무별 AI 업무 흐름',
    summary: 'Anthropic이 공개한 Claude 중심 플러그인 모음입니다. 직무별 지침·명령·도구 연결을 묶어 반복 업무를 돕습니다.',
    output: '직무별 지침·명령·업무 흐름',
    useCase: '직무별 AI 교육의 실습 사례를 구성하거나, 사내 업무 기준과 도구에 맞는 업무 보조 기능을 설계할 때 참고합니다.',
    cost: '저장소 라이선스와 각 연결 서비스·Claude 요금제 조건을 따로 확인해야 합니다.',
    caution: '플러그인 이름만 보고 사내 자료 접근을 허용하면 안 됩니다. 연결 대상·읽기/쓰기 범위·외부 전송 데이터를 개별적으로 확인합니다.',
    evidence: '앞선 Anthropic 공개 자료 조사 요약',
    links: [{ label: 'Anthropic 공식 저장소', url: 'https://github.com/anthropics/knowledge-work-plugins' }],
  },
  {
    id: 'custom-skills', name: '나만의 스킬', group: 'automation', kind: '재사용 가능한 작업 지침', role: '반복 업무의 기준 표준화',
    summary: '잘된 작업의 절차·판단 기준·출력 형식을 파일로 정리해 AI가 재사용하게 하는 방식입니다. 특정 제품 하나의 이름은 아닙니다.',
    output: '팀의 업무 기준을 담은 스킬',
    useCase: '교육안 구성, 제안서 검토, 브랜드 문체, 보고서 검수처럼 매번 같은 품질 기준이 필요한 업무에 활용합니다.',
    cost: '작성·유지보수 시간과 이용 중인 AI 환경의 비용이 듭니다. 별도 단일 상품 가격은 없습니다.',
    caution: '스킬 파일에 비밀번호·API 키·고객 비밀을 넣지 않습니다. 파일을 만든 것과 품질이 검증된 것은 다르며, 버전과 담당자를 두고 관리합니다.',
    evidence: '노션 소개의 개념 항목 · 단일 제품으로 식별하지 않음',
    links: [{ label: '처음 소개한 공개 노션 자료', url: 'https://neat-product-c0f.notion.site/AI-5-GPT-40e19ffaaaf18156bd5ce52bb46b8a0a' }],
  },
  {
    id: 'connectors', name: '커넥터', group: 'automation', kind: '앱·데이터 연결 방식', role: 'AI와 업무 데이터 연결',
    summary: 'AI가 메일·문서·협업 도구의 자료를 조회하거나 허용된 기능을 실행하도록 잇는 연결 방식입니다. 지원 기능과 권한은 서비스마다 다릅니다.',
    output: '허용된 앱 데이터 조회와 작업 실행',
    useCase: '여러 곳에 흩어진 교육·컨설팅 자료를 한 번에 찾고, 문서와 대화의 맥락을 묶어 확인해야 할 때 활용합니다.',
    cost: '사용하는 AI 요금제, 원래 서비스의 요금제, 커넥터별 조건에 따라 다릅니다.',
    caution: '접속 가능하다는 사실이 모든 자료를 외부 AI에 보낼 허락은 아닙니다. 데이터 보관·학습 정책, 읽기/쓰기 권한, 연결 해제 방법을 확인하세요.',
    evidence: '노션 소개의 개념 항목 · 제품별 지원은 별도 확인',
    links: [{ label: '처음 소개한 공개 노션 자료', url: 'https://neat-product-c0f.notion.site/AI-5-GPT-40e19ffaaaf18156bd5ce52bb46b8a0a' }],
  },
];

// 기능별로 모아 표시하되, 각 분류 안에서는 원래 순서를 유지한다.
const allTools = [...originalTools, ...repositoryTools];
export const tools: ToolEntry[] = GROUP_ORDER.flatMap((group) => allTools.filter((tool) => tool.group === group));

export function filterTools(query: string, group: ToolGroup | 'all'): ToolEntry[] {
  const terms = query.trim().toLocaleLowerCase('ko-KR').split(/\s+/).filter(Boolean);
  return tools.filter((tool) => (group === 'all' || tool.group === group) && terms.every((term) =>
    [GROUP_LABELS[tool.group], tool.name, tool.kind, tool.role, tool.summary, tool.output, tool.useCase, tool.cost, tool.caution, tool.notice ?? '', ...tool.links.map((link) => link.url)]
      .join(' ').toLocaleLowerCase('ko-KR').includes(term),
  ));
}
