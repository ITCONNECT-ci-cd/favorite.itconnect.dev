import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import InfoPage, { metadata } from './page';

describe('/info', () => {
  it('기존 가이드 화면과 오늘 조사한 12개 항목을 그대로 제공한다', () => {
    render(<InfoPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('도구는 많아도,맡길 일은 다릅니다.');
    expect(screen.getAllByRole('article')).toHaveLength(12);
    expect(screen.getByRole('link', { name: '즐겨찾기로 돌아가기 ↗' })).toHaveAttribute('href', '/');
    expect(metadata.alternates?.canonical).toBe('https://favorite.itconnect.dev/info');
  });
});
