import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ToolGuide } from './ToolGuide';
import { filterTools, tools } from './catalog';

describe('AI 도구 가이드', () => {
  it('디자인 5개와 앞선 업무 확장 7개를 구분한다', () => {
    expect(tools).toHaveLength(12);
    expect(filterTools('', 'design')).toHaveLength(5);
    expect(filterTools('', 'workflow')).toHaveLength(7);
    expect(new Set(tools.map((tool) => tool.id)).size).toBe(12);
  });

  it('검색은 대소문자·앞뒤 공백을 무시하고 이름·용도·주의사항을 포함한다', () => {
    expect(filterTools('  TASTESKILL ', 'all').map((tool) => tool.id)).toEqual(['taste-skill']);
    expect(filterTools('한국어', 'all').map((tool) => tool.id)).toContain('humanizer');
    expect(filterTools('학생정보', 'all').map((tool) => tool.id)).toContain('design-md-chrome');
    expect(filterTools('Humanizer', 'design')).toEqual([]);
  });

  it('모든 항목에 비용·설치·주의·검증 수준과 HTTPS 출처가 있다', () => {
    for (const tool of tools) {
      expect(tool.cost.length).toBeGreaterThan(10);
      expect(tool.setup.length).toBeGreaterThan(10);
      expect(tool.caution.length).toBeGreaterThan(10);
      expect(tool.evidence.length).toBeGreaterThan(10);
      expect(tool.links.length).toBeGreaterThan(0);
      tool.links.forEach((link) => expect(new URL(link.url).protocol).toBe('https:'));
    }
  });

  it('오늘 조사한 업무 도구를 중복 없이 포함하고 Agent Browser는 관련 자료로 연결한다', () => {
    expect(tools.filter((tool) => tool.group === 'workflow').map((tool) => tool.id)).toEqual([
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
    expect(screen.getByRole('status')).toHaveTextContent('12개 항목');
    fireEvent.click(screen.getByRole('button', { name: '업무 확장 7' }));
    expect(screen.getByRole('status')).toHaveTextContent('7개 항목');
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'humanizer' } });
    expect(screen.getByRole('status')).toHaveTextContent('1개 항목');
    expect(screen.getAllByRole('article')).toHaveLength(1);
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: '없는도구xyz' } });
    expect(screen.queryAllByRole('article')).toHaveLength(0);
    fireEvent.click(screen.getByRole('button', { name: '검색·분류 초기화' }));
    expect(screen.getByRole('searchbox')).toHaveValue('');
    expect(screen.getAllByRole('article')).toHaveLength(12);
    expect(screen.getByRole('button', { name: '전체 12' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('빠른 비교 링크는 필터를 초기화해 대상 카드가 사라지지 않게 한다', () => {
    render(<ToolGuide />);
    fireEvent.click(screen.getByRole('button', { name: '업무 확장 7' }));
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'humanizer' } });
    fireEvent.click(screen.getByRole('link', { name: 'TasteSkill 상세 보기' }));
    expect(screen.getByRole('searchbox')).toHaveValue('');
    expect(screen.getByRole('heading', { name: 'TasteSkill' }).closest('article')).toHaveAttribute('id', 'taste-skill');
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
