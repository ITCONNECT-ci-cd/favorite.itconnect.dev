import { permanentRedirect } from 'next/navigation';
import { GUIDE_PATH } from './catalog';

export default function AiToolGuidePage() {
  permanentRedirect(GUIDE_PATH);
}
