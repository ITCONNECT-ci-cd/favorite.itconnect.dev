export type ToolGroup = 'design' | 'workflow';
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
  setup: string;
  caution: string;
  evidence: string;
  links: { label: string; url: string }[];
};

export const REVIEWED_AT = '2026-11-08';
export const GUIDE_PATH = '/research/ai-tool-guide';
export const tools: ToolEntry[] = [
  {
    id: 'taste-skill', name: 'TasteSkill', group: 'design', kind: '코딩 에이전트 스킬', role: '뻔한 화면에서 벗어나기',
    summary: 'AI가 웹페이지를 만들 때 구성·서체·색상·사진을 고르는 방향과 브라우저 점검 기준을 제공합니다. 독립형 디자인 서비스가 아니라 코딩 에이전트가 읽는 작업 지침입니다.',
    output: '차별화된 웹페이지와 구현 코드',
    useCase: '기업교육·교육과정 소개, 행사 신청, 서비스 랜딩 페이지처럼 첫인상과 정보 전달이 모두 중요한 화면에 활용합니다.',
    cost: '저장소는 MIT 오픈소스입니다. 별도 스킬 사용료는 확인되지 않았으며, AI 에이전트 요금과 사진·폰트 등 자산의 이용 조건은 별도입니다.',
    setup: '공식 스킬명은 design-taste-frontend입니다. Claude Code·Codex 설치 안내가 있으며 Node 22+와 Chrome·Edge·Chromium이 필요합니다. 공식 README의 현재 설치 절차를 확인하세요.',
    caution: '기존 브랜드와 가독성 기준을 먼저 정해야 합니다. 사진·폰트·아이콘을 내려받을 수 있으며, MIT 라이선스가 모든 자산의 이용 권리를 보장하지는 않습니다. 예전 스킬 일부는 별도 저장소로 분리됐습니다.',
    evidence: '공식 README 확인 · 설치·실행 성능 미검증',
    links: [{ label: '공식 저장소·설치 안내', url: 'https://github.com/Leonxlnx/taste-skill' }, { label: '프로젝트 사이트', url: 'https://tasteskill.dev' }],
  },
  {
    id: 'ui-ux-pro-max', name: 'UI/UX Pro Max', group: 'design', kind: '디자인 검색 스킬·CLI', role: '글꼴·색·구성의 기준 세우기',
    summary: '스타일, 색상, 폰트 조합, 차트, UX 규칙을 검색해 프로젝트별 디자인 시스템과 구현 가이드를 만듭니다. 여러 코딩 에이전트와 웹·모바일·데스크톱 환경을 지원합니다.',
    output: '디자인 시스템과 화면 구현 가이드',
    useCase: '교육 포털·LMS·수강신청·관리 대시보드의 화면 일관성, 반응형 구성, 접근성 점검 기준을 정할 때 먼저 검토할 만합니다.',
    cost: '기본 저장소는 MIT 오픈소스입니다. 별도 Premium 상품이 안내돼 있으나 확정 가격은 이번 조사에서 확인하지 못했습니다. AI 에이전트 요금도 별도입니다.',
    setup: '현재 공식 패키지는 ui-ux-pro-max-cli입니다. 프로젝트에서 uipro init --ai codex 또는 --ai claude로 설정합니다. 검색 스크립트는 Python 3.x 표준 라이브러리를 사용합니다.',
    caution: '권장안은 실제 사용자 조사나 접근성 인증을 대신하지 않습니다. 한국어 조판과 모바일 화면을 따로 확인하세요. 오래된 uipro-cli 안내와 구버전의 수량 표기는 혼동하지 않아야 합니다.',
    evidence: '공식 README·사이트 확인 · 추천 성능 미검증',
    links: [{ label: '공식 저장소·설치 안내', url: 'https://github.com/nextlevelbuilder/ui-ux-pro-max-skill' }, { label: '공식 사이트·상품 안내', url: 'https://uupm.cc' }],
  },
  {
    id: 'awesome-claude-design', name: 'Awesome Claude Design', group: 'design', kind: '디자인 참고 문서 모음', role: '68개 디자인 사례 비교하기',
    summary: '유명 서비스에서 관찰한 디자인 패턴을 정리한 DESIGN.md 링크 모음입니다. “68종”은 이 저장소의 브랜드·서비스 참고 항목 수이며, AI 도구나 앱 68개를 뜻하지 않습니다.',
    output: '디자인 방향 참고용 DESIGN.md',
    useCase: '고객과 홈페이지 분위기를 고르거나, 디자인 수업에서 사례를 비교·비평하고 자체 디자인 지침을 작성할 때 사용합니다.',
    cost: '저장소는 MIT입니다. 연결된 getdesign.md에는 Catalog Pass 등 별도 상품도 있어 전체 서비스가 무료라고 볼 수 없습니다. 개별 다운로드 조건과 유료 가격은 미확인입니다.',
    setup: '실행 프로그램을 설치하는 방식이 아닙니다. 사례를 고르고 DESIGN.md를 내려받아 Claude Design이나 파일을 읽을 수 있는 코딩 에이전트에 참고 자료로 제공합니다.',
    caution: '브랜드가 제공하거나 보증한 공식 디자인 시스템이 아닙니다. 1:1 복제 대신 구조와 원리를 참고하세요. 상표·로고·전용 폰트 권리는 원 소유자에게 있습니다. getdesign.md 전체 카탈로그와 68개 목록은 범위가 다릅니다.',
    evidence: '공식 README의 68개 목록 확인 · 비공식 영감 자료',
    links: [{ label: '68개 목록·권리 안내', url: 'https://github.com/VoltAgent/awesome-claude-design' }, { label: '연결된 DESIGN.md 컬렉션', url: 'https://getdesign.md' }],
  },
  {
    id: 'design-motion', name: 'Design Motion Principles', group: 'design', kind: '모션 생성·검수 스킬', role: '움직임에 목적과 기준 주기',
    summary: '인터랙션과 애니메이션을 만들거나 기존 코드의 움직임을 점검합니다. 과도한 반복, 상태 전환 누락, 접근성·성능 문제를 살피고 보고서를 작성하도록 설계됐습니다.',
    output: '모션 구현·개선안과 HTML/터미널 보고서',
    useCase: '퀴즈 정답 피드백, 신청 완료 안내, 모달·토스트 등 사용자가 상태 변화를 이해해야 하는 화면의 마지막 검수에 적합합니다.',
    cost: 'MIT 오픈소스입니다. 이용하는 AI 에이전트 요금은 별도입니다.',
    setup: '공식 설치 안내는 npx skills add kylezantos/design-motion-principles입니다. Claude Code·Cursor·Windsurf 등 호환 에이전트와 React·Framer Motion·CSS·HTML 가이드를 제공합니다.',
    caution: '공개된 디자이너들의 작업을 바탕으로 한 제작자의 해석이지, 해당 디자이너들이 제작·보증한 공식 스킬은 아닙니다. 실제 브라우저, 성능, 움직임 줄이기 설정(prefers-reduced-motion)을 별도로 검증해야 합니다.',
    evidence: '공식 README 확인 · 브라우저 성능 미검증',
    links: [{ label: '공식 저장소·설치 안내', url: 'https://github.com/kylezantos/design-motion-principles' }],
  },
  {
    id: 'design-md-chrome', name: 'DESIGN.md Chrome', group: 'design', kind: 'Chrome 확장', role: '현재 페이지의 스타일 문서화',
    summary: '정확한 대상은 Bergside의 TypeUI DESIGN.md Extractor입니다. 현재 열린 페이지에서 서체·색·간격·모서리·그림자·모션 스타일을 읽어 DESIGN.md 또는 SKILL.md로 내려받습니다.',
    output: '관찰한 스타일을 정리한 DESIGN.md / SKILL.md',
    useCase: '소유하거나 사용권이 있는 자사 홈페이지를 문서화하고, 공개 참고 사이트의 디자인 구조를 비교할 때 보조 도구로 활용합니다.',
    cost: '소스는 MIT입니다. 확인한 Chrome Web Store에는 별도 요금 표시가 없었습니다. 다른 Chromium 브라우저의 호환성은 검증하지 않았습니다.',
    setup: '공식 Chrome Web Store에서 설치합니다. 저장소에는 개발자 모드 수동 설치 안내도 있습니다. 현재 권한은 activeTab, scripting, storage, downloads입니다.',
    caution: '현재 페이지를 읽는 권한이 필요합니다. 소스의 manifest에는 상시 전체 사이트 host_permissions가 없고 스토어에는 데이터 미수집 선언이 있지만, 독립 보안감사를 뜻하지 않습니다. 내부 문서·학생정보가 있는 화면에서 사용하거나 추출 파일을 AI에 올리기 전 내용을 확인하세요. 추출은 복제 허락이 아닙니다.',
    evidence: '공식 저장소·스토어·권한 파일 확인 · 보안감사 아님',
    links: [{ label: '공식 저장소', url: 'https://github.com/bergside/design-md-chrome' }, { label: '공식 Chrome Web Store', url: 'https://chromewebstore.google.com/detail/designmd-style-extractor/ogpdnchdjiibhobphelbbkemnnemkfma' }, { label: '요청 권한 확인', url: 'https://github.com/bergside/design-md-chrome/blob/main/manifest.json' }],
  },
  {
    id: 'wondelai-skills', name: 'wondelai/skills', group: 'workflow', kind: '전문 지식 스킬 모음', role: '업무별 사고법을 재사용하기',
    summary: '서적과 공개 가이드의 프레임워크를 AI 작업 지침으로 재구성한 제3자 스킬 모음입니다. 앞선 조사에서는 전문 스킬 51개와 메타 스킬 14개를 구분했으며, 모든 항목이 책에 기반한 것은 아닙니다.',
    output: '업무별 분석·검토·기획 프레임워크',
    useCase: '교육·컨설팅에서 반복하는 분석 절차를 표준화하되, 실제 고객 맥락과 사내 기준에 맞게 검토해서 사용합니다.',
    cost: '공개 저장소의 현재 LICENSE와 각 원자료의 이용 조건을 확인해야 합니다. AI 사용료는 별도이며, 원서나 저자의 공식 상품을 구매한 것과 같지 않습니다.',
    setup: '필요한 스킬의 내용을 먼저 읽고 호환되는 에이전트에 선택적으로 추가합니다. 목록 수는 앞선 조사 시점 기준이며 바뀔 수 있습니다.',
    caution: '저자나 출판사가 보증한 공식 도구로 소개하면 안 됩니다. 프레임워크 요약은 원문 전체나 전문가의 판단을 대신하지 않으며, 출처·저작권을 보존해야 합니다.',
    evidence: '앞선 공개 자료 조사 요약 · 개별 스킬 성능 미검증',
    links: [{ label: '공식 프로젝트 저장소', url: 'https://github.com/wondelai/skills' }],
  },
  {
    id: 'agent-desktop', name: 'Vercel agent-desktop', group: 'workflow', kind: '데스크톱 자동화 도구', role: '앱 화면을 읽고 조작하기',
    summary: '접근성 트리를 바탕으로 데스크톱 앱의 UI를 읽고 조작하는 도구입니다. 새로운 AI 모델이 아니라 에이전트가 컴퓨터를 사용할 수 있게 연결하는 실행 수단입니다.',
    output: '데스크톱 UI 읽기·클릭·입력',
    useCase: '전용 API가 없는 반복 업무를 시험할 때 검토합니다. 외부 발송·삭제·결제처럼 영향이 큰 단계에는 사람의 확인을 두는 편이 안전합니다.',
    cost: '현재 저장소의 LICENSE·지원 범위를 확인해야 합니다. 실행 환경과 연결된 AI 모델 비용은 별도입니다.',
    setup: 'Mac에서는 접근성 권한, Linux에서는 GUI 환경 등이 필요합니다. 공식 문서의 운영체제별 요구사항을 먼저 확인합니다.',
    caution: '앱 화면과 입력 권한은 민감한 데이터에 닿을 수 있습니다. 운영 계정에서 바로 자동화하지 말고 최소 권한·시험 데이터·명확한 작업 범위로 검증하세요.',
    evidence: '앞선 공식 자료 조사 요약 · 설치·연동하지 않음',
    links: [{ label: 'Vercel Labs 저장소', url: 'https://github.com/vercel-labs/agent-desktop' }, { label: '공식 데스크톱 문서', url: 'https://agent-browser.dev/desktop' }],
  },
  {
    id: 'prompt-master', name: 'Prompt Master', group: 'workflow', kind: '프롬프트 설계 자료', role: '요청의 구조와 조건 다듬기',
    summary: '노션 소개 글에서 연결한 대상은 nidhinjs/prompt-master입니다. 목적·맥락·조건·출력 형식을 분명히 하는 프롬프트 설계에 활용하는 프로젝트입니다. 이름이 같은 다른 제품과 구분해야 합니다.',
    output: '더 구체적이고 재사용 가능한 프롬프트',
    useCase: '교육 실습 문제나 콘텐츠 제작 요청을 일정한 형식으로 정리하고, 바꾸기 전후 결과를 같은 기준으로 비교합니다.',
    cost: '저장소의 현재 라이선스와 사용 환경을 확인하세요. 연결된 AI 서비스 요금은 별도입니다.',
    setup: '아래 정확한 저장소에서 현재 사용 방법을 확인합니다. 이번 정리는 소개와 조사이며 설치·계정 연동은 하지 않았습니다.',
    caution: '프롬프트가 길거나 복잡하다고 결과가 더 좋아지는 것은 아닙니다. 입력 자료의 비밀정보와 불필요한 개인 정보를 제거하고 실제 과제로 품질을 확인합니다.',
    evidence: '앞선 공개 노션·연결 저장소 조사 요약',
    links: [{ label: '소개 글이 연결한 저장소', url: 'https://github.com/nidhinjs/prompt-master' }],
  },
  {
    id: 'humanizer', name: 'Humanizer', group: 'workflow', kind: '문체 교정 스킬', role: '과장·상투적인 문장 줄이기',
    summary: '노션 소개 글의 대상은 blader/humanizer입니다. AI가 자주 만드는 과장·상투적 표현을 찾아 문장을 다듬는 스킬이며, 주로 영어 문체를 다룹니다.',
    output: '원래 의미를 살려 다듬은 문장',
    useCase: '영문 소개문이나 블로그 초안의 편집 보조에 활용합니다. 한국어 문서는 자연스러운 표현뿐 아니라 의미·사실·어조를 사람이 다시 검토해야 합니다.',
    cost: '공개 저장소의 현재 라이선스를 확인하세요. AI 에이전트·서비스 요금은 별도입니다.',
    setup: '정확한 저장소의 SKILL.md와 설치 안내를 확인합니다. 한국어 성능이나 실제 결과는 이번에 시험하지 않았습니다.',
    caution: 'AI 탐지 회피나 저자 위장 용도로 보장하는 도구가 아닙니다. 문체를 고치면서 수치·인용·주장·책임 범위까지 바뀌지 않도록 원문과 대조하세요.',
    evidence: '앞선 공개 자료 조사 요약 · 한국어 성능 미검증',
    links: [{ label: '소개 글이 연결한 저장소', url: 'https://github.com/blader/humanizer' }],
  },
  {
    id: 'knowledge-work-plugins', name: '직무별 플러그인', group: 'workflow', kind: 'Claude 중심 업무 확장', role: '직무에 맞는 작업 흐름 묶기',
    summary: 'Anthropic의 knowledge-work-plugins는 직무별 지침과 작업 흐름을 제공하는 공개 프로젝트입니다. 일반적인 “모든 AI용 플러그인”과 같지 않으며 Claude 환경을 중심으로 확인해야 합니다.',
    output: '직무별 지침·명령·업무 흐름',
    useCase: '교육·컨설팅에서 직무별 사용 예시를 만들고, 사내 업무 기준과 도구에 맞게 구성하는 출발점으로 검토합니다.',
    cost: '저장소 라이선스와 각 연결 서비스·Claude 요금제 조건을 따로 확인해야 합니다.',
    setup: '지원하는 Claude 환경과 개별 플러그인의 연결 요구사항을 공식 저장소에서 확인합니다. 이 페이지를 보는 것만으로 플러그인이 설치되지는 않습니다.',
    caution: '플러그인 이름만 보고 사내 자료 접근을 허용하면 안 됩니다. 연결 대상·읽기/쓰기 범위·외부 전송 데이터를 개별적으로 확인합니다.',
    evidence: '앞선 Anthropic 공개 자료 조사 요약',
    links: [{ label: 'Anthropic 공식 저장소', url: 'https://github.com/anthropics/knowledge-work-plugins' }],
  },
  {
    id: 'custom-skills', name: '나만의 스킬', group: 'workflow', kind: '재사용 가능한 작업 지침', role: '잘된 작업 방식을 표준화하기',
    summary: '특정 제품 이름이 아니라 반복 업무의 절차·판단 기준·출력 형식을 파일로 정리해 AI가 다시 쓰게 하는 방식입니다. 단발성 프롬프트보다 업무 절차와 예외를 체계적으로 담을 수 있습니다.',
    output: '팀의 업무 기준을 담은 스킬',
    useCase: '교육안 구성, 제안서 검토, 브랜드 문체, 보고서 검수처럼 반복되는 작업에 적용합니다.',
    cost: '작성·유지보수 시간과 이용 중인 AI 환경의 비용이 듭니다. 별도 단일 상품 가격은 없습니다.',
    setup: '좋은 결과 예시와 실패 예시를 모아 지침을 작성하고, 사용하는 에이전트의 스킬 형식에 맞춰 시험합니다.',
    caution: '스킬 파일에 비밀번호·API 키·고객 비밀을 넣지 않습니다. 파일을 만든 것과 품질이 검증된 것은 다르며, 버전과 담당자를 두고 관리합니다.',
    evidence: '노션 소개의 개념 항목 · 단일 제품으로 식별하지 않음',
    links: [{ label: '처음 소개한 공개 노션 자료', url: 'https://neat-product-c0f.notion.site/AI-5-GPT-40e19ffaaaf18156bd5ce52bb46b8a0a' }],
  },
  {
    id: 'connectors', name: '커넥터', group: 'workflow', kind: '앱·데이터 연결 방식', role: '필요한 자료에 안전하게 연결하기',
    summary: 'AI가 메일·문서·협업 도구의 데이터를 읽거나 기능을 실행할 수 있도록 잇는 연결 방식입니다. 하나의 제품이 아니며, 서비스마다 지원 기능과 권한이 다릅니다.',
    output: '허용된 앱 데이터 조회와 작업 실행',
    useCase: '분산된 교육·컨설팅 자료를 찾고 맥락을 연결할 때 유용합니다. 읽기 연결부터 시작해 필요한 기능만 단계적으로 확장합니다.',
    cost: '사용하는 AI 요금제, 원래 서비스의 요금제, 커넥터별 조건에 따라 다릅니다.',
    setup: 'AI 서비스에서 지원하는 연결인지 확인하고, 조직 관리자 정책과 개별 계정의 허용 범위를 점검한 뒤 연결합니다.',
    caution: '접속 가능하다는 사실이 모든 자료를 외부 AI에 보낼 허락은 아닙니다. 데이터 보관·학습 정책, 읽기/쓰기 권한, 연결 해제 방법을 확인하세요.',
    evidence: '노션 소개의 개념 항목 · 제품별 지원은 별도 확인',
    links: [{ label: '처음 소개한 공개 노션 자료', url: 'https://neat-product-c0f.notion.site/AI-5-GPT-40e19ffaaaf18156bd5ce52bb46b8a0a' }],
  },
];

export function filterTools(query: string, group: ToolGroup | 'all'): ToolEntry[] {
  const terms = query.trim().toLocaleLowerCase('ko-KR').split(/\s+/).filter(Boolean);
  return tools.filter((tool) => (group === 'all' || tool.group === group) && terms.every((term) =>
    [tool.name, tool.kind, tool.role, tool.summary, tool.output, tool.useCase, tool.cost, tool.setup, tool.caution]
      .join(' ').toLocaleLowerCase('ko-KR').includes(term),
  ));
}
