'use client';

import Link from 'next/link';
import { useState } from 'react';
import { filterTools, REVIEWED_AT, tools, type ToolGroup } from './catalog';
import styles from './page.module.css';

const groups = [
  { id: 'all', name: '전체', count: tools.length },
  { id: 'design', name: '디자인 도구', count: tools.filter((tool) => tool.group === 'design').length },
  { id: 'workflow', name: '업무 확장', count: tools.filter((tool) => tool.group === 'workflow').length },
] as const;

export function ToolGuide() {
  const [query, setQuery] = useState('');
  const [group, setGroup] = useState<ToolGroup | 'all'>('all');
  const results = filterTools(query, group);
  const reset = () => { setQuery(''); setGroup('all'); };

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
            <p className={styles.eyebrow}>ITCONNECT · RESEARCH NOTES</p>
            <h1 id="guide-title">도구는 많아도,<br />맡길 일은 다릅니다.</h1>
            <p className={styles.intro}>디자인을 만들고, 기준을 세우고, 업무를 연결하는 도구들.<br className={styles.desktopBreak} /> 무엇을 언제 쓰면 좋을지 한곳에 정리했습니다.</p>
            <div className={styles.heroLinks}>
              <a href="#quick-compare" className={styles.primaryLink}>디자인 5개 빠르게 비교 ↓</a>
              <a href="#tool-catalog" className={styles.secondaryLink}>전체 도구 살펴보기</a>
            </div>
          </div>
          <aside className={styles.heroAside} aria-label="가이드 범위">
            <div><strong>05</strong><span>이번에 살펴본<br />디자인 도구</span></div>
            <div><strong>07</strong><span>함께 정리한<br />업무 확장 자료</span></div>
            <p><time dateTime={REVIEWED_AT}>{REVIEWED_AT.replaceAll('-', '.')}</time> 정리<br />공식 자료와 앞선 조사 기반 · 설치·실행 미검증</p>
          </aside>
        </section>

        <section id="quick-compare" className={styles.section} aria-labelledby="compare-title">
          <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>01 / QUICK COMPARE</p><h2 id="compare-title">디자인 도구, 이렇게 나뉩니다</h2></div><p>서로 대체하기보다, 맡는 단계가 다릅니다.</p></div>
          <div className={styles.compare}>
            <div className={styles.compareHeader} aria-hidden="true"><span>도구</span><span>맡길 일</span><span>얻는 결과</span><span>상세</span></div>
            {tools.filter((tool) => tool.group === 'design').map((tool, index) => (
              <a key={tool.id} href={`#${tool.id}`} aria-label={`${tool.name} 상세 보기`} className={styles.compareRow} onClick={reset}>
                <span className={styles.compareName}><span className={styles.number}>0{index + 1}</span><strong>{tool.name}</strong></span>
                <span className={styles.compareRole}>{tool.role}</span><span className={styles.compareOutput}>{tool.output}</span><span className={styles.arrow} aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
          <p className={styles.smallNote}>“68종”은 Awesome Claude Design 저장소의 참고 목록입니다. 68개의 앱·모델·스킬을 제공한다는 뜻은 아닙니다.</p>
        </section>

        <section className={styles.workflow} aria-labelledby="workflow-title">
          <div><p className={styles.eyebrow}>추천 사용 순서</p><h2 id="workflow-title">하나의 기준을 세우고,<br />필요한 도구를 더하세요.</h2><p>여러 스킬을 동시에 켜기보다 주 기준 하나와 보조 검수 도구를 정하는 편이 좋습니다.</p></div>
          <ol>
            <li><span>01</span><div><strong>기준 정하기</strong><p>UI/UX Pro Max로 기본 규칙을 정하고, 참고 사례를 보며 자체 DESIGN.md를 작성합니다.</p></div></li>
            <li><span>02</span><div><strong>화면 만들기</strong><p>TasteSkill로 목적에 맞는 랜딩 페이지를 구현합니다. 기존 자사 사이트는 Chrome 추출 결과를 참고할 수 있습니다.</p></div></li>
            <li><span>03</span><div><strong>움직임 검수하기</strong><p>Motion 스킬로 필요한 상태 변화를 다듬고, 모바일·접근성·성능을 직접 확인합니다.</p></div></li>
          </ol>
        </section>

        <section id="tool-catalog" className={styles.section} aria-labelledby="catalog-title">
          <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>02 / TOOL CATALOG</p><h2 id="catalog-title">필요한 도구를 찾아보세요</h2></div><p>역할과 활용처를 읽고, 상세 조건을 펼쳐보세요.</p></div>
          <div className={styles.filters}>
            <div className={styles.tabs} role="group" aria-label="도구 분류">
              {groups.map((item) => <button key={item.id} type="button" aria-pressed={group === item.id} onClick={() => setGroup(item.id)}>{item.name}{' '}<span>{item.count}</span></button>)}
            </div>
            <div className={styles.searchWrap}><label htmlFor="tool-search" className={styles.srOnly}>도구 이름·용도 검색</label><input id="tool-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="이름·용도 검색 (예: 폰트, 한국어)" autoComplete="off" /></div>
          </div>
          <p className={styles.resultCount} role="status" aria-live="polite">{results.length}개 항목{query.trim() ? ` · “${query.trim()}” 검색 결과` : ''}</p>
          {results.length === 0 ? <div className={styles.empty}><h3>일치하는 도구가 없습니다</h3><p>검색어를 줄이거나 다른 분류에서 찾아보세요.</p><button type="button" onClick={reset}>검색·분류 초기화</button></div> : <div className={styles.cards}>
            {results.map((tool) => (
              <article key={tool.id} id={tool.id} className={styles.card}>
                <div className={styles.cardMeta}><span>{tool.group === 'design' ? '디자인' : '업무 확장'}</span><span>{tool.kind}</span></div>
                <h3>{tool.name}</h3><p className={styles.role}>{tool.role}</p><p className={styles.description}>{tool.summary}</p>
                <div className={styles.useCase}><span>이런 일에 활용</span><p>{tool.useCase}</p></div>
                <details className={styles.details}>
                  <summary>비용·설치·주의사항 보기 <span aria-hidden="true">+</span></summary>
                  <dl><dt>비용과 라이선스</dt><dd>{tool.cost}</dd><dt>시작 방법</dt><dd>{tool.setup}</dd><dt>사용 전 확인</dt><dd>{tool.caution}</dd></dl>
                </details>
                <div className={styles.sources}><span>출처</span>{tool.links.map((link) => <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">{link.label} ↗<span className={styles.srOnly}> (새 탭)</span></a>)}</div>
                <p className={styles.evidence}>{tool.evidence}</p>
              </article>
            ))}
          </div>}
        </section>

        <section className={styles.guardrails} aria-labelledby="guardrails-title">
          <div><p className={styles.eyebrow}>03 / BEFORE YOU START</p><h2 id="guardrails-title">업무에 넣기 전, 세 가지만 확인하세요</h2></div>
          <div className={styles.guardrailGrid}>
            <div><span>01</span><h3>자료를 보낼 권한이 있나요?</h3><p>고객·학생 정보, 내부 문서, 인증 정보는 별도로 확인합니다. 커넥터와 확장 프로그램은 필요한 권한만 허용합니다.</p></div>
            <div><span>02</span><h3>출처와 이용 조건이 맞나요?</h3><p>오픈소스 라이선스가 원서·브랜드·로고·사진·폰트의 모든 권리까지 주지는 않습니다. 참고와 복제는 구분합니다.</p></div>
            <div><span>03</span><h3>실제 과제로 검증했나요?</h3><p>먼저 작은 작업에 적용하고 결과를 비교합니다. 한국어, 모바일, 접근성, 성능과 사실 정확성은 사람이 최종 확인합니다.</p></div>
          </div>
        </section>
        <footer className={styles.footer}>
          <p>새 디자인 도구 5개는 {REVIEWED_AT.replaceAll('-', '.')} 공식 공개 자료를 확인했습니다. 업무 확장 7개는 앞선 조사 내용을 요약했습니다. 추천 순서는 실무 적용을 위한 판단이며 성능 시험 결과가 아닙니다. 가격·지원 범위·권한은 변경될 수 있습니다.</p>
          <p>공개 자료 안내 페이지입니다. 도구 설치·계정 연동·자료 제출은 실행하지 않았습니다.</p>
          <a href="#guide-title">맨 위로 ↑</a>
        </footer>
      </main>
    </div>
  );
}
