import { describe, expect, it, vi } from 'vitest';
import { permanentRedirect } from 'next/navigation';
import AiToolGuidePage from './page';

vi.mock('next/navigation', () => ({
  permanentRedirect: vi.fn(() => { throw new Error('NEXT_REDIRECT'); }),
}));

describe('이전 가이드 경로', () => {
  it('중복 화면 대신 /info로 영구 이동한다', () => {
    expect(() => AiToolGuidePage()).toThrow('NEXT_REDIRECT');
    expect(permanentRedirect).toHaveBeenCalledWith('/info');
  });
});
