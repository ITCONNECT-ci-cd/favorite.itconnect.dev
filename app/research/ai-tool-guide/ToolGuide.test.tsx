import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ToolGuide } from './ToolGuide';
import { filterTools, GROUP_LABELS, GROUP_ORDER, originalTools, tools } from './catalog';

describe('AI 도구 가이드', () => {
  it('51개 카드 모두 기능·활용만 기본 표시하고 시작 방법은 제공하지 않는다', () => {
    render(<ToolGuide />);
    const cards = screen.getAllByRole('article');
    expect(cards).toHaveLength(51);
    for (const card of cards) {
      expect(within(card).getByText('기능과 역할')).toBeInTheDocument();
      expect(within(card).getByText('우리 업무 활용')).toBeInTheDocument();
      expect(within(card).queryByText(/이렇게 시작|시작 방법/)).not.toBeInTheDocument();
    }
    expect(screen.queryByText(/첫 단계|어떻게 시작/)).not.toBeInTheDocument();
    expect(filterTools('npx skills add', 'all')).toEqual([]);
  });

  it('51개를 기능별 6개 카테고리로 중복 없이 분류하고 원래 자료를 보존한다', () => {
    expect(originalTools).toHaveLength(12);
    expect(tools).toHaveLength(51);
    expect(new Set(tools.map((tool) => tool.id)).size).toBe(51);
    expect(GROUP_ORDER.map((group) => filterTools('', group).length)).toEqual([11, 10, 5, 6, 7, 12]);
    expect(tools.every((tool) => GROUP_ORDER.includes(tool.group))).toBe(true);
    expect(tools.flatMap((tool) => tool.links).some((link) => /github\.com\/ITCONNECT-ci-cd\//i.test(link.url))).toBe(false);
    const repositories = tools.filter((tool) => !originalTools.some((original) => original.id === tool.id));
    expect(new Set(repositories.map((tool) => tool.links[0].url.toLowerCase().replace(/\/$/, ''))).size).toBe(39);
    expect(tools.find((tool) => tool.id === 'corevisos-library')?.kind).toContain('웹사이트');
    for (const id of ['treg', 'code-animation-prompts', 'autorag', 'auto-ontology-mcp']) {
      expect(tools.find((tool) => tool.id === id)?.notice?.length).toBeGreaterThan(15);
    }
  });

  it('각 행에 기능 카테고리를 표시하고 모든 카테고리 필터가 정확히 작동한다', () => {
    render(<ToolGuide />);
    expect(screen.queryByRole('button', { name: /추가 요청|기존 저장소|업무 확장/ })).not.toBeInTheDocument();
    for (const group of GROUP_ORDER) {
      const expected = filterTools('', group);
      const button = screen.getByRole('button', { name: `${GROUP_LABELS[group]} ${expected.length}` });
      fireEvent.click(button);
      expect(button).toHaveAttribute('aria-pressed', 'true');
      expect(screen.getAllByRole('article')).toHaveLength(expected.length);
      for (const tool of expected) {
        const row = screen.getByRole('heading', { name: tool.name }).closest('article')!;
        expect(within(row).getByText(GROUP_LABELS[group])).toBeInTheDocument();
      }
    }
  });

  it('기능·활용과 중요한 주의사항은 펼치지 않아도 보이고 CTA는 검색을 초기화한다', () => {
    render(<ToolGuide />);
    const ontology = screen.getByRole('heading', { name: 'Auto Ontology MCP' }).closest('article')!;
    expect(within(ontology).getByText(/DB의 업무 용어/).closest('details')).toBeNull();
    expect(within(ontology).getByText('DB 비밀번호를 평문 저장합니다. 운영 DB 대신 합성 DB로 시험하세요.').closest('details')).toBeNull();
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: '없는도구' } });
    fireEvent.click(screen.getByRole('link', { name: '개발 도구 보기' }));
    expect(screen.getByRole('searchbox')).toHaveValue('');
    expect(screen.getAllByRole('article')).toHaveLength(10);
    expect(screen.getByRole('button', { name: '개발 10' })).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(screen.getByRole('link', { name: '전체 도구 보기 ↓' }));
    expect(screen.getAllByRole('article')).toHaveLength(51);
  });

  it('검색은 대소문자·앞뒤 공백을 무시하고 이름·용도·주의사항을 포함한다', () => {
    expect(filterTools('  TASTESKILL ', 'all').map((tool) => tool.id)).toEqual(['taste-skill']);
    expect(filterTools('한국어', 'all').map((tool) => tool.id)).toContain('humanizer');
    expect(filterTools('학생정보', 'all').map((tool) => tool.id)).toContain('design-md-chrome');
    expect(filterTools('Humanizer', 'design')).toEqual([]);
    expect(filterTools('지식·데이터', 'all')).toHaveLength(7);
  });

  it('모든 항목에 기능·활용·비용·주의·검증 수준과 HTTPS 출처가 있다', () => {
    for (const tool of tools) {
      expect(tool.cost.length).toBeGreaterThan(10);
      expect(tool.summary.length).toBeGreaterThan(20);
      expect(tool.useCase.length).toBeGreaterThan(20);
      expect(tool).not.toHaveProperty('setup');
      expect(tool.caution.length).toBeGreaterThan(10);
      expect(tool.evidence.length).toBeGreaterThan(10);
      expect(tool.links.length).toBeGreaterThan(0);
      tool.links.forEach((link) => expect(new URL(link.url).protocol).toBe('https:'));
    }
  });

  it('오늘 조사한 업무 도구를 중복 없이 포함하고 Agent Browser는 관련 자료로 연결한다', () => {
    expect(originalTools.filter((tool) => tool.group !== 'design').map((tool) => tool.id)).toEqual([
      'wondelai-skills', 'agent-desktop', 'prompt-master', 'humanizer',
      'knowledge-work-plugins', 'custom-skills', 'connectors',
    ]);
    const desktop = tools.find((tool) => tool.id === 'agent-desktop')!;
    expect(desktop.summary).toContain('Windows');
    expect(desktop.cost).toContain('Apache-2.0');
    expect(desktop.caution).toContain('보안 격리 환경이 아닙니다');
    expect(desktop.links.map((link) => link.url)).toContain('https://github.com/vercel-labs/agent-browser');
    expect(filterTools('Agent Browser', 'all').map((tool) => tool.id)).toEqual(['agent-desktop']);
  });

  it('필터·검색·초기화를 반복해도 올바른 목록을 보여준다', () => {
    render(<ToolGuide />);
    expect(screen.getByRole('status')).toHaveTextContent('51개 항목');
    fireEvent.click(screen.getByRole('button', { name: '기획·문서 5' }));
    expect(screen.getByRole('status')).toHaveTextContent('5개 항목');
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'humanizer' } });
    expect(screen.getByRole('status')).toHaveTextContent('1개 항목');
    expect(screen.getAllByRole('article')).toHaveLength(1);
    fireEvent.click(screen.getByRole('button', { name: '개발 10' }));
    expect(screen.queryAllByRole('article')).toHaveLength(0);
    fireEvent.click(screen.getByRole('button', { name: '기획·문서 5' }));
    expect(screen.getAllByRole('article')).toHaveLength(1);
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: '없는도구xyz' } });
    expect(screen.queryAllByRole('article')).toHaveLength(0);
    fireEvent.click(screen.getByRole('button', { name: '검색·분류 초기화' }));
    expect(screen.getByRole('searchbox')).toHaveValue('');
    expect(screen.getAllByRole('article')).toHaveLength(51);
    expect(screen.getByRole('button', { name: '전체 51' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('빠른 비교 링크는 필터를 초기화해 대상 카드가 사라지지 않게 한다', () => {
    render(<ToolGuide />);
    fireEvent.click(screen.getByRole('button', { name: '기획·문서 5' }));
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'humanizer' } });
    fireEvent.click(screen.getByRole('link', { name: 'TasteSkill 상세 보기' }));
    expect(screen.getByRole('searchbox')).toHaveValue('');
    expect(screen.getByRole('heading', { name: 'TasteSkill' }).closest('article')).toHaveAttribute('id', 'taste-skill');
  });

  it('FilmCraft CLI를 영상·음성에 한 번만 포함하고 자막·배속 검색과 근거를 제공한다', () => {
    const matches = tools.filter((tool) => tool.id === 'filmcraft-cli');
    expect(matches).toHaveLength(1);
    const filmcraft = matches[0];
    expect(filmcraft.group).toBe('media');
    expect(filmcraft.links[0].url).toBe('https://github.com/storytold/filmcraft');
    expect(filmcraft.evidence).toContain('2026-11-09');
    expect(filmcraft.caution).toContain('자동 음성인식·번역 품질은 미검증');
    expect(filmcraft.notice).toContain('알파 단계');
    expect(filterTools('자막 배속', 'media').map((tool) => tool.id)).toContain('filmcraft-cli');
    render(<ToolGuide />);
    fireEvent.click(screen.getByRole('button', { name: '영상·음성 6' }));
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'FilmCraft' } });
    expect(screen.getAllByRole('article')).toHaveLength(1);
    const row = screen.getByRole('heading', { name: 'FilmCraft CLI' }).closest('article')!;
    expect(within(row).getByText(filmcraft.summary).closest('details')).toBeNull();
    expect(within(row).getByText(filmcraft.useCase).closest('details')).toBeNull();
    expect(within(row).getByText(filmcraft.notice!).closest('details')).toBeNull();
  });

  it('2026-11-12 GitHub AI 도구 8개를 중복 없이 추가하고 TasteSkill 2.5판을 반영한다', () => {
    const added = {
      hyperframes: ['media', 'https://github.com/heygen-com/hyperframes'],
      hallmark: ['design', 'https://github.com/Nutlope/hallmark'],
      freellmapi: ['development', 'https://github.com/tashfeenahmed/freellmapi'],
      rea: ['development', 'https://github.com/morluto/rea'],
      impeccable: ['design', 'https://github.com/pbakaus/impeccable'],
      't3-code': ['development', 'https://github.com/pingdotgg/t3code'],
      'security-audit-skill': ['development', 'https://github.com/cloudflare/security-audit-skill'],
      ghidra: ['development', 'https://github.com/NationalSecurityAgency/ghidra'],
      unslop: ['design', 'https://github.com/heydamir/unslop'],
      'google-maps-scraper': ['knowledge', 'https://github.com/gosom/google-maps-scraper'],
      'remote-in-tech': ['knowledge', 'https://github.com/remoteintech/remote-jobs'],
      huginn: ['automation', 'https://github.com/huginn/huginn'],
      firecrawl: ['knowledge', 'https://github.com/firecrawl/firecrawl'],
      'check-if-email-exists': ['automation', 'https://github.com/reacherhq/check-if-email-exists'],
      listmonk: ['automation', 'https://github.com/knadh/listmonk'],
      twenty: ['automation', 'https://github.com/twentyhq/twenty'],
    } as const;
    for (const [id, [group, url]] of Object.entries(added)) {
      const matches = tools.filter((tool) => tool.id === id);
      expect(matches).toHaveLength(1);
      expect(matches[0].group).toBe(group);
      expect(matches[0].links[0].url).toBe(url);
      expect(matches[0].evidence).toContain('2026-11-12');
    }
    expect(filterTools('언슬롭', 'design').map((tool) => tool.id)).toEqual(['unslop']);
    const rea = tools.find((tool) => tool.id === 'rea')!;
    const reaVideo = tools.find((tool) => tool.id === 'rea-video')!;
    expect(rea.links[0].url).not.toBe(reaVideo.links[0].url);
    expect(rea.notice).toContain('rea-video와 다른 도구');
    expect(tools.filter((tool) => /voicestudio/i.test(tool.links[0].url))).toHaveLength(1);
    const taste = tools.find((tool) => tool.id === 'taste-skill')!;
    expect(taste.caution).toContain('2.5판');
    expect(taste.output).toBe('브라우저에서 확인한 웹페이지와 구현 코드');
    expect(taste.evidence).toContain('2026-11-12');
    render(<ToolGuide />);
    expect(screen.getAllByRole('link', { name: /상세 보기$/ })).toHaveLength(5);
    expect(screen.getByText('2026.11.12')).toBeInTheDocument();
  });

  it('출처는 새 탭임을 알리고 안전한 rel을 가지며 원래 사이트로 돌아갈 수 있다', () => {
    render(<ToolGuide />);
    const card = screen.getByRole('heading', { name: 'DESIGN.md Chrome' }).closest('article')!;
    const source = within(card).getByRole('link', { name: /공식 Chrome Web Store/ });
    expect(source).toHaveAttribute('target', '_blank');
    expect(source).toHaveAttribute('rel', 'noopener noreferrer');
    expect(source).toHaveAccessibleName(/새 탭/);
    expect(screen.getByRole('link', { name: '즐겨찾기로 돌아가기 ↗' })).toHaveAttribute('href', '/');
    expect(screen.getByText(/68개의 앱·모델·스킬/)).toBeInTheDocument();
  });
});
