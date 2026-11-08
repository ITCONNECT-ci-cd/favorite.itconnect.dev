'use client';

import Link from 'next/link';
import { useState } from 'react';
import { filterTools, GROUP_LABELS, REVIEWED_AT, tools, type ToolGroup } from './catalog';
import styles from './page.module.css';

const groups = [
  { id: 'all', name: '전체', count: tools.length },
  ...(['requested', 'saved-repo', 'design', 'workflow'] as const).map((id) => ({ id, name: GROUP_LABELS[id], count: tools.filter((tool) => tool.group === id).length })),
] as const;

export function ToolGuide() {
  const [query, setQuery] = useState('');
  const [group, setGroup] = useState<ToolGroup | 'all'>('all');
  const results = filterTools(query, group);
  const reset = () => { setQuery(''); setGroup('all'); };
  const showGroup = (next: ToolGroup) => { setQuery(''); setGroup(next); };

  return (
    <div className={styles.page}>
      <a className={styles.skip} href="#tool-catalog">도구 목록으로 건너뛰기</a>
      <header className={styles.header}>
        <Link href="/" className={styles.brand}>내 링크 <span>/ AI 도구 가이드</span></Link>
        <Link href="/" className={styles.back}>즐겨찾기로 돌아가기 ↗</Link>
      </header>
      <main className={styles.main}>
        <section className={styles.hero} aria-labelledby="guide-title">
          <div>
            <p className={styles.eyebrow}>ITCONNECT · TOOL GUIDE</p>
            <h1 id="guide-title">무엇을 하고,<br />어디에 쓸까요?</h1>
            <p className={styles.intro}>즐겨찾기의 외부 GitHub 저장소와 새로 요청한 자료.<br className={styles.desktopBreak} /> 각 도구의 기능과 우리 업무에 쓸 곳을 정리했습니다.</p>
            <div className={styles.heroLinks}>
              <a href="#tool-catalog" className={styles.primaryLink} onClick={() => showGroup('requested')}>추가 요청 8개 보기 ↓</a>
              <a href="#tool-catalog" className={styles.secondaryLink} onClick={() => showGroup('saved-repo')}>기존 저장소 보기</a>
              <a href="#quick-compare" className={styles.secondaryLink}>디자인 5개 비교</a>
            </div>
          </div>
          <aside className={styles.heroAside} aria-label="가이드 범위">
            <div><strong>{tools.filter((tool) => tool.group === 'saved-repo').length}</strong><span>즐겨찾기의<br />외부 저장소</span></div>
            <div><strong>08</strong><span>추가 요청 자료<br />GitHub 7개 · 웹사이트 1개</span></div>
            <p><time dateTime={REVIEWED_AT}>{REVIEWED_AT.replaceAll('-', '.')}</time> 확인 · 우리 프로젝트 제외<br />기존 디자인·업무 가이드도 함께 볼 수 있습니다.</p>
          </aside>
        </section>

        <section id="tool-catalog" className={styles.section} aria-labelledby="catalog-title">
          <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>FIND YOUR TOOL</p><h2 id="catalog-title">필요한 일부터 찾아보세요</h2></div><p>기능과 역할을 읽고, 우리 업무에서 쓸 곳을 비교하세요.</p></div>
          <div className={styles.filters}>
            <div className={styles.tabs} role="group" aria-label="도구 분류">
              {groups.map((item) => <button key={item.id} type="button" aria-pressed={group === item.id} onClick={() => setGroup(item.id)}>{item.name}{' '}<span>{item.count}</span></button>)}
            </div>
            <div className={styles.searchWrap}><label htmlFor="tool-search" className={styles.srOnly}>도구 이름·용도 검색</label><input id="tool-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="이름·사용처 검색 (예: 영상, 제안서)" autoComplete="off" /></div>
          </div>
          <p className={styles.resultCount} role="status" aria-live="polite">{results.length}개 항목{query.trim() ? ` · “${query.trim()}” 검색 결과` : ''}</p>
          {results.length === 0 ? <div className={styles.empty}><h3>일치하는 도구가 없습니다</h3><p>검색어를 줄이거나 다른 분류에서 찾아보세요.</p><button type="button" onClick={reset}>검색·분류 초기화</button></div> : <div className={styles.cards}>
            {results.map((tool) => (
              <article key={tool.id} id={tool.id} className={styles.card}>
                <div className={styles.cardMeta}><span>{GROUP_LABELS[tool.group]}</span><span>{tool.kind}</span></div>
                <h3>{tool.name}</h3><p className={styles.role}>{tool.role}</p>
                <dl className={styles.practical}>
                  <dt>기능과 역할</dt><dd>{tool.summary}</dd>
                  <dt>우리 업무 활용</dt><dd>{tool.useCase}</dd>
                </dl>
                {tool.notice && <p className={styles.notice}>{tool.notice}</p>}
                <details className={styles.details}>
                  <summary>비용·주의사항 보기 <span aria-hidden="true">+</span></summary>
                  <dl><dt>비용과 이용 조건</dt><dd>{tool.cost}</dd><dt>확인할 점</dt><dd>{tool.caution}</dd></dl>
                  <p className={styles.evidence}>{tool.evidence}</p>
                </details>
                <div className={styles.sources}>{tool.links.map((link) => <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">{link.label} ↗<span className={styles.srOnly}> (새 탭)</span></a>)}</div>
              </article>
            ))}
          </div>}
        </section>

        <section id="quick-compare" className={styles.section} aria-labelledby="compare-title">
          <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>DESIGN QUICK COMPARE</p><h2 id="compare-title">디자인 도구는 이렇게 나뉩니다</h2></div><p>기준을 정하고 → 만들고 → 검수하세요.</p></div>
          <div className={styles.compare}>
            <div className={styles.compareHeader} aria-hidden="true"><span>도구</span><span>맡길 일</span><span>얻는 결과</span><span>상세</span></div>
            {tools.filter((tool) => tool.group === 'design').map((tool, index) => (
              <a key={tool.id} href={`#${tool.id}`} aria-label={`${tool.name} 상세 보기`} className={styles.compareRow} onClick={reset}>
                <span className={styles.compareName}><span className={styles.number}>0{index + 1}</span><strong>{tool.name}</strong></span>
                <span className={styles.compareRole}>{tool.role}</span><span className={styles.compareOutput}>{tool.output}</span><span className={styles.arrow} aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
          <p className={styles.smallNote}>“68종”은 Awesome Claude Design의 참고 사례 수입니다. 68개의 앱·모델·스킬을 제공한다는 뜻은 아닙니다.</p>
        </section>
        <footer className={styles.footer}>
          <p>공식 공개 자료를 바탕으로 정리했습니다. 활용 예시는 ITCONNECT 업무에 맞춘 제안이며, 설치·실행 검증 전입니다.</p>
          <p>실제 도입 전 고객 데이터 접근 범위와 이용 조건을 확인하세요. 도구나 계정을 자동으로 연결하지 않습니다.</p>
          <a href="#guide-title">맨 위로 ↑</a>
        </footer>
      </main>
    </div>
  );
}
