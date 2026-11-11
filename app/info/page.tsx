import type { Metadata } from 'next';
import { ToolGuide } from '@/app/research/ai-tool-guide/ToolGuide';

export const metadata: Metadata = {
  title: 'AI 도구 가이드',
  description: '디자인·개발·기획·영상·지식·업무 자동화 6개 카테고리에서 43개 도구의 기능과 ITCONNECT 업무 활용을 한 행씩 비교하는 가이드.',
  alternates: { canonical: 'https://favorite.itconnect.dev/info' },
};

export default function InfoPage() {
  return <ToolGuide />;
}
