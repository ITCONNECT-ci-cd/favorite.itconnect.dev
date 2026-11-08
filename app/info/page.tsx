import type { Metadata } from 'next';
import { ToolGuide } from '@/app/research/ai-tool-guide/ToolGuide';

export const metadata: Metadata = {
  title: 'AI 도구 가이드',
  description: '디자인 도구 5개와 업무 확장 자료를 역할, 결과물, 비용, 설치 조건, 주의사항으로 비교하는 실무 안내서.',
  alternates: { canonical: 'https://favorite.itconnect.dev/info' },
};

export default function InfoPage() {
  return <ToolGuide />;
}
