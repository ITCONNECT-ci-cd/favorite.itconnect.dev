-- Migration: 0028_delete_claude_devteam_office.sql
-- Description: Delete the discontinued AI-DEV-TEAM office dashboard from bookmarks.
--   The Firebase project (itconnect-claude-devteam) has been deleted.
--   - https://itconnect-claude-devteam.web.app/

DELETE FROM bookmarks
WHERE id = '5a7e135b-e7b4-4b8e-b99f-3d8e716bcb89'
   OR url LIKE '%itconnect-claude-devteam.web.app%';
