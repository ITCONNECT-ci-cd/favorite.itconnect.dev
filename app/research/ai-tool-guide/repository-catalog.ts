import type { ToolEntry, ToolGroup } from './catalog';
import saved from './data/saved-repositories.json';
import requested from './data/requested-resources.json';

export const repositoryTools: ToolEntry[] = [
  ...requested.map((tool) => ({ ...tool, group: tool.group as ToolGroup, output: tool.role, evidence: '2026-11-08 공식 README·문서·이용 조건 확인. 설치·실행 미검증.' })),
  ...saved.map((tool) => ({ ...tool, group: tool.group as ToolGroup, output: tool.role, evidence: '2026-11-08 즐겨찾기 원본·공식 README 확인. 설치·실행 미검증.' })),
];
