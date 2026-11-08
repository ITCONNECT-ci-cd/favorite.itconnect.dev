import type { Metadata } from 'next';
import { ToolGuide } from '@/app/research/ai-tool-guide/ToolGuide';

export const metadata: Metadata = {
  title: 'AI 도구 가이드',
  description: '즐겨찾기의 외부 GitHub 저장소와 새로 요청한 자료를 무엇인지, ITCONNECT 업무 활용, 시작 방법으로 간결하게 정리한 가이드.',
  alternates: { canonical: 'https://favorite.itconnect.dev/info' },
};

export default function InfoPage() {
  return <ToolGuide />;
}
