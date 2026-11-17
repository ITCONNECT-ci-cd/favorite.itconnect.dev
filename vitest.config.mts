import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// t1843: 관리자 이메일은 코드에 두지 않는다. 테스트는 RLS 마이그레이션(DB 쪽 단일 출처)의
// 리터럴을 읽어 ADMIN_EMAIL 로 넣는다 — 코드(env)와 SQL 이 같아야 한다는 계약도 그대로 시험된다.
const adminEmailFromSql =
  /auth\.jwt\(\) ->> 'email'\)\) = '([^'\s]+@[^'\s]+)'/.exec(
    readFileSync(new URL('./supabase/migrations/0002_admin_write_policy.sql', import.meta.url), 'utf8'),
  )?.[1] ?? '';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./', import.meta.url)),
      // `server-only` 는 `react-server` 조건이 있을 때만 빈 모듈이고, 그 밖에서는 import 만으로
      // throw 하는 마커 패키지다(node_modules/server-only/index.js). Vitest 는 그 조건 없이
      // 도므로 `lib/supabase/server.ts` · `admin.ts` 를 테스트에서 import 하면 그대로 터진다.
      // 패키지가 함께 싣고 다니는 빈 파일로 돌려 조건이 있는 것처럼 만든다 — 마커의 역할
      // (클라이언트 번들 혼입을 **빌드 타임에** 막는 것)은 Next 빌드가 그대로 수행한다.
      'server-only': fileURLToPath(new URL('./node_modules/server-only/empty.js', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    env: { ADMIN_EMAIL: process.env.ADMIN_EMAIL ?? adminEmailFromSql },
    setupFiles: ['./vitest.setup.ts'],
    include: ['**/*.test.{ts,tsx}'],
    exclude: ['**/node_modules/**', '.next/**', 'docs/**'],
  },
});
