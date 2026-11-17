import { describe, expect, it } from 'vitest';
import { getAdminEmail } from '@/lib/admin-config';

// t1843: 관리자 이메일은 환경변수에서만 온다. 비면 "관리자 없음"(fail-closed).
describe('getAdminEmail', () => {
  it('환경변수가 없거나 공백이면 빈 문자열', () => {
    expect(getAdminEmail({})).toBe('');
    expect(getAdminEmail({ ADMIN_EMAIL: '   ' })).toBe('');
  });
  it('앞뒤 공백을 지우고 소문자로 접는다', () => {
    expect(getAdminEmail({ ADMIN_EMAIL: '  Admin@Example.TEST ' })).toBe('admin@example.test');
  });
});
