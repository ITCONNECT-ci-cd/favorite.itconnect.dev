-- 0029: Discord ingest 경로 폐기 (2026-11-16)
--
-- #ai-favorite 디스코드 채널과 Hermes favorite 게이트웨이가 agent.itconnect.dev 통합 대시보드로
-- 이관되면서 /api/discord-ingest, HMAC 서명, 전용 LOGIN role(discord_ingest_runtime)을 모두 걷어낸다.
--
-- 유지하는 것:
--   * bookmarks.source = 'discord' 로 이미 저장된 링크와 그 provenance(private.discord_ingest_provenance)
--   * 관리자 화면의 파비콘 채우기·고아 정리 RPC(discord_favicon_owner 소유 admin_* 함수)
-- 제거하는 것:
--   * receipt 정리 pg_cron job, ingest_bookmark RPC, 자동 보강 RPC 4종
--   * receipt / rate-limit 테이블
--   * discord_ingest_runtime 의 로그인 자격(비밀번호 포함)과 모든 권한

do $$
begin
  execute pg_catalog.format('grant discord_ingest_owner to %I', current_user);
  execute pg_catalog.format('grant discord_favicon_owner to %I', current_user);
end;
$$;

-- 1. receipt 정리 cron job
select cron.unschedule(jobid)
  from cron.job
 where jobname = 'discord-ingest-receipt-cleanup';

-- 2. ingest / 자동 보강 RPC
drop function if exists public.ingest_bookmark(text, text, text, text, text);
drop function if exists public.discord_ingest_update_metadata(uuid, text, text, text, text);
drop function if exists public.discord_ingest_claim_favicon(uuid, text);
drop function if exists public.discord_ingest_finalize_favicon(uuid, uuid, text, text);
drop function if exists public.discord_ingest_fail_favicon(uuid, uuid, text);
drop function if exists private.cleanup_discord_ingest_receipts();

-- 3. ingest 전용 상태 테이블
drop table if exists private.discord_ingest_receipts;
drop table if exists private.discord_ingest_rate_events;

-- 4. 런타임 LOGIN role 무력화 — 비밀번호를 지우고 로그인·권한을 모두 회수한다.
alter role discord_ingest_runtime nologin password null connection limit 0;
revoke all on all tables in schema public from discord_ingest_runtime;
revoke all on all sequences in schema public from discord_ingest_runtime;
revoke execute on all functions in schema public from discord_ingest_runtime;
revoke all on all tables in schema private from discord_ingest_runtime;
revoke all on all sequences in schema private from discord_ingest_runtime;
revoke execute on all functions in schema private from discord_ingest_runtime;
revoke usage on schema public from discord_ingest_runtime;
revoke usage on schema private from discord_ingest_runtime;
drop policy if exists discord_ingest_runtime_categories_select on public.categories;
drop policy if exists discord_ingest_owner_bookmarks_insert on public.bookmarks;

do $$
begin
  execute pg_catalog.format('revoke discord_ingest_owner from %I', current_user);
  execute pg_catalog.format('revoke discord_favicon_owner from %I', current_user);
end;
$$;
