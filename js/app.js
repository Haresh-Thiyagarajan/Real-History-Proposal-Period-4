(() => {
  'use strict';

  const FTP = window.FTP;
  if (!FTP || !FTP.siteCopy) return;

  const COPY = FTP.siteCopy;
  const PAGE = document.body.dataset.page || 'intro';
  const PAGES = [
    { id: 'intro', title: 'Introduction', href: 'index.html', img: 'img/bacteria.webp', alt: 'Grayscale scanning electron micrograph of E. coli O157:H7.' },
    { id: 'outbreak', title: 'The outbreak', href: 'outbreak.html', img: 'img/cdc-report.webp', alt: "First page of the CDC's April 1993 outbreak update." },
    { id: 'evidence', title: 'The evidence', href: 'evidence.html', img: 'img/cdc-chart.webp', alt: 'CDC Figure 1, Washington cases by week of onset.' },
    { id: 'change', title: 'Change and continuity', href: 'change.html', img: 'img/rule-1996.webp', alt: 'First page of the 1996 Federal Register rule.' },
    { id: 'historians', title: 'Historians and sources', href: 'sources.html', img: 'img/usda-1994.webp', alt: 'First page of the FSIS Backgrounder, May 1994.' },
    { id: 'conclusion', title: 'Conclusion', href: 'conclusion.html', img: 'img/inspection-1999.webp', alt: 'Tagged beef carcasses in cold storage.' }
  ];
  const SOURCE_BY_ID = Object.fromEntries((FTP.sources || []).map(source => [source.id, source]));
  const EVIDENCE_BY_ID = Object.fromEntries((FTP.evidence || []).map(item => [item.id, item]));
  const REDUCED = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const STORAGE = {
    vote: 'ftp-hook-vote',
    weights: 'ftp-cause-weights',
    edits: 'ftp-conclusion-edits',
    guesses: 'ftp-continuity-guesses'
  };

  const esc = value => String(value == null ? '' : value).replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);
  const rich = value => esc(value).replace(/\bE\. coli\b/g, '<em>E. coli</em>').replace(/\*([^*]+)\*/g, '<em>$1</em>');
  const richMLA = value => esc(value).replace(/&lt;i&gt;/g, '<em>').replace(/&lt;\/i&gt;/g, '</em>').replace(/\bE\. coli\b/g, '<em>E. coli</em>');
  const getJSON = (key, fallback) => {
    try { const value = localStorage.getItem(key); return value ? JSON.parse(value) : fallback; }
    catch (_) { return fallback; }
  };
  const setJSON = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch (_) {} };
  const label = cls => {
    const names = { verified: 'VERIFIED', interpretation: 'INTERPRETATION', inference: 'INFERENCE', unresolved: 'UNRESOLVED' };
    return `<span class="class-label ${esc(cls || 'unresolved')}">${names[cls] || 'UNRESOLVED'}</span>`;
  };
  const stamp = strength => `<span class="stamp ${esc(strength || 'uncertain')}">${esc(strength || 'uncertain')}</span>`;
  const verifyFlag = item => item && item.verify ? '<span class="verify-flag">Needs source verification</span>' : '';
  const sourceFor = id => id ? SOURCE_BY_ID[id] : null;
  const sourceLabel = id => sourceFor(id)?.short || 'Source not listed';
  const sourceRef = id => id ? `<a class="source-ref" href="sources.html#src-${esc(id)}">${esc(sourceLabel(id))}</a>` : '<span class="source-ref unresolved">No source listed</span>';
  const topicHref = item => {
    const map = {
      outbreak: 'outbreak.html#outbreak-section', map: 'outbreak.html#map',
      chain: `evidence.html#chain-${item.link || 1}`, timeline: `change.html#period-${item.period || 'p4'}`,
      evidence: `evidence.html#ev-${item.open || 'E12'}`, thenNow: 'change.html#then-now',
      historians: 'sources.html#literature', continuity: 'change.html#continuity',
      thennow: 'change.html#then-now',
      conclusion: 'conclusion.html#conclusion'
    };
    return map[item.target] || 'index.html';
  };
  const evidenceRef = id => `<a class="exhibit-link" href="evidence.html#ev-${esc(id)}">${esc(id)}</a>`;
  const imageFigure = (src, alt, caption, cls = '') => `<figure class="document-plate ${cls}"><img loading="lazy" src="${esc(src)}" alt="${esc(alt)}"><figcaption>${rich(caption)}</figcaption></figure>`;
  const sectionHead = (number, title, text = '') => `<div class="section-heading"><span class="section-number">${esc(number)}</span><div><h2>${rich(title)}</h2>${text ? `<p>${rich(text)}</p>` : ''}</div></div>`;
  const chapterIntro = (number, title, dek, date = '') => `<section class="chapter-intro"><p class="eyebrow">Chapter ${esc(number)} · ${esc(date || 'Follow the evidence')}</p><h1>${rich(title)}</h1><p class="dek">${rich(dek)}</p></section>`;

  function chapterEnd(pageId) {
    const current = Math.max(0, PAGES.findIndex(page => page.id === pageId));
    const previous = PAGES[(current + PAGES.length - 1) % PAGES.length];
    const next = PAGES[(current + 1) % PAGES.length];
    return `<nav class="chapter-end" aria-label="Previous and next chapters"><a href="${previous.href}"><small>← Previous chapter</small>${esc(previous.title)}</a><a class="next" href="${next.href}"><small>Next chapter →</small>${esc(next.title)}</a></nav>`;
  }

  function pageIntro() {
    const savedVote = localStorage.getItem(STORAGE.vote);
    const options = FTP.hook.choices.map(choice => `<label class="poll-choice"><input type="radio" name="hook-vote" value="${esc(choice.id)}" ${savedVote === choice.id ? 'checked' : ''}><span>${esc(choice.label)}</span></label>`).join('');
    const needToKnow = COPY.aimsNeedToKnow.map((item, index) => `<li><span class="objective-num">0${index + 1}</span><p>${rich(item.question)}</p><span class="objective-status">${rich(item.status)}</span></li>`).join('');
    const directory = PAGES.map((item, index) => `<a class="directory-row" href="${item.href}"><span class="directory-no">0${index + 1}</span><span class="directory-title">${esc(item.title)}</span><span class="directory-dek">Open chapter <span aria-hidden="true">→</span></span><img class="directory-thumb" loading="lazy" src="${item.img}" alt="${esc(item.alt)}"></a>`).join('');
    const classes = Object.entries(COPY.evidenceClasses).map(([key, definition]) => `<div class="key-item">${label(key)}<p>${rich(definition)}</p></div>`).join('');
    return `
      <section class="chapter-hero" id="intro">
        <div class="hero-grid">
          <div class="hero-copy">
            <p class="eyebrow red">A six-chapter evidence investigation</p>
            <h1 class="hero-title"><span>FOLLOW</span><span>THE PATTY</span></h1>
            <p class="hero-subtitle">${rich(COPY.subtitle)}</p>
            <p class="hero-opening">${rich(COPY.openingLine)}</p>
            <p class="byline">${esc(COPY.byline)}</p>
            <p class="research-question-inline"><span class="claim-chip">The question</span> ${rich(COPY.researchQuestion)}</p>
            <div class="cta-row"><a class="button-primary" href="outbreak.html">Begin the investigation <span class="arrow" aria-hidden="true">→</span></a></div>
          </div>
          <figure class="hero-art"><img fetchpriority="high" src="img/bacteria.webp" alt="E. coli O157:H7 in a grayscale scanning electron micrograph, magnified 10,961 times."><figcaption>${rich(COPY.imageCaptions.micrograph)}</figcaption></figure>
        </div>
      </section>
      <section class="menu-hook" id="hook"><div class="menu-hook-inner">
        <div><p class="eyebrow">The opening question</p><h2>Why is your burger cooked that way?</h2><p class="hook-question">${rich(COPY.hookQuestion)}</p>
          <form class="poll-form" id="hook-poll"><fieldset style="border:0;padding:0;margin:0"><legend class="eyebrow">What do you think?</legend>${options}</fieldset><button class="poll-submit" type="submit">Save my hypothesis</button></form>
          <p class="poll-result" id="poll-result" aria-live="polite"></p>
        </div>
        <div class="menu-board" aria-label="Typographic menu board"><small>GRILL SPECIFICATION</small><p>${esc(COPY.menuBoard).replace('??? °F', '<span class="menu-temp unresolved">??? °F</span>')}</p></div>
      </div></section>
      <section class="section-wrap"><div class="section-inner"><div class="reading-column">
        <p class="eyebrow">Student introduction · research framing</p>
        ${COPY.introduction.map((paragraph, index) => `<p class="${index === 0 ? 'first-paragraph' : ''}">${rich(paragraph)}</p>`).join('')}
        <aside class="annotation"><strong>Terminology note</strong><br>${rich(COPY.ruleFootnote)}</aside>
      </div></div></section>
      <section class="section-wrap"><div class="section-inner">${sectionHead('AIMS & OBJECTIVES', 'What this investigation is trying to establish')}
        <div class="aims-grid">
          <article class="aim-card"><p class="eyebrow">Why I am researching this</p><ul>${COPY.aimsWhy.map(item => `<li>${rich(item)}</li>`).join('')}</ul></article>
          <article class="aim-card"><p class="eyebrow">What I expect to find</p><p>${rich(COPY.aimsExpectation)}</p></article>
          <article class="aim-card"><p class="eyebrow">What I need to know</p><p>Research status remains open where the record is incomplete.</p></article>
        </div>
        <ol class="objective-list">${needToKnow}</ol>
      </div></section>
      <section class="section-wrap" id="from-proposal"><div class="section-inner">${sectionHead('FROM PROPOSAL TO WEBSITE', 'How my research proposal became this site')}
        <div class="reading-column">${COPY.fromProposal.paragraphs.map(p => `<p>${rich(p)}</p>`).join('')}
          <ol class="objective-list">${COPY.fromProposal.mapping.map((m, i) => `<li><span class="objective-num">0${i + 1}</span><p>${rich(m.from)}</p><span class="objective-status">${rich(m.to)}</span></li>`).join('')}</ol>
        </div>
      </div></section>
      <section class="section-wrap"><div class="section-inner">${sectionHead('EVIDENCE KEY', 'Four labels, four different kinds of claim', 'The labels describe what kind of claim is being made—not whether a reader has to agree.')}
        <div class="key-grid">${classes}</div>
      </div></section>
      <section class="section-wrap"><div class="section-inner">${sectionHead('CHAPTER DIRECTORY', 'Choose a file to open')}
        <div class="chapter-directory">${directory}</div>
      </div></section>`;
  }

  function caseFilesMarkup() {
    return FTP.caseFiles.map(file => `<article class="case-file">
      <span class="case-number">CASE FILE ${esc(file.n)}</span><span class="case-date">${esc(file.date)}</span>
      <h3>${rich(file.event)}</h3><p class="case-place">${rich(file.place)}</p><p>${rich(file.detail)}</p>
      <div class="case-foot"><span>${sourceRef(file.source)}</span><span class="meta-line">${stamp(file.strength)} ${label('verified')}</span></div>
      <div class="exhibit-links">${(file.evidence || []).map(evidenceRef).join('')}</div>
    </article>`).join('');
  }

  const STATE_NAMES = { WA: 'Washington', OR: 'Oregon', CA: 'California', ID: 'Idaho', NV: 'Nevada', MT: 'Montana', WY: 'Wyoming', UT: 'Utah', AZ: 'Arizona', CO: 'Colorado', NM: 'New Mexico' };
  function mapSvg(prefix = 'main', selected = []) {
    const paths = window.FTP_MAP_PATHS || {};
    const labels = window.FTP_MAP_LABELS || {};
    const caseCodes = Object.keys(FTP.mapStates);
    const shapes = Object.entries(paths).map(([code, path]) => {
      const state = FTP.mapStates[code];
      const classes = ['state-shape', state ? 'is-case' : '', selected.includes(code) ? 'is-active' : ''].filter(Boolean).join(' ');
      const title = state ? `${STATE_NAMES[code]}: ${state.cases} cases, ${state.hosp} hospitalized, ${state.hus} HUS, ${state.deaths} deaths` : (STATE_NAMES[code] || code);
      const position = labels[code] || { x: 0, y: 0 };
      return `<path id="${prefix}-state-${code}" class="${classes}" d="${path}" data-map-state="${code}" tabindex="0" role="button" aria-label="${esc(title)}" aria-pressed="${selected.includes(code)}"><title>${esc(title)}</title></path><text class="state-label ${selected.includes(code) ? 'light' : ''}" data-map-label="${code}" x="${position.x}" y="${position.y}" aria-hidden="true">${code}</text>`;
    }).join('');
    const lines = [[245,245,74,52],[245,245,448,60],[245,245,477,210],[245,245,449,516],[245,245,100,512],[245,245,24,290],[245,245,344,31],[245,245,158,540]]
      .map(line => `<line x1="${line[0]}" y1="${line[1]}" x2="${line[2]}" y2="${line[3]}"/>`).join('');
    return `<svg class="outbreak-map ${prefix === 'deck' ? 'deck-map' : ''}" id="${prefix}-map-svg" viewBox="0 0 500 570" role="group" aria-label="State-level map of the western United States. State outlines from ${esc(window.FTP_MAP_SOURCE || 'us-atlas')}; no cities or restaurant locations are plotted."><g class="trace-lines" id="${prefix}-trace-lines" style="visibility:hidden">${lines}</g>${shapes}</svg>`;
  }

  function countTable() {
    const rows = ['WA', 'ID', 'NV', 'CA'].map(code => {
      const row = FTP.mapStates[code];
      return `<tr data-count-row="${code}"><th scope="row">${code} <span class="state-long">${esc(STATE_NAMES[code])}</span></th><td data-count="cases" data-value="${row.cases}">${row.cases}</td><td data-count="hosp" data-value="${row.hosp}">${row.hosp}</td><td data-count="hus" data-value="${row.hus}">${row.hus}</td><td data-count="deaths" data-value="${row.deaths}">${row.deaths}</td></tr>`;
    }).join('');
    return `<table class="map-counts"><caption>Cases by state</caption><thead><tr><th scope="col">State</th><th scope="col">Cases</th><th scope="col">Hosp.</th><th scope="col">HUS</th><th scope="col">Deaths</th></tr></thead><tbody>${rows}</tbody></table>`;
  }

  function pageOutbreak() {
    const steps = FTP.mapSteps.map((step, index) => `<li><button type="button" data-map-step="${index}" ${index === 0 ? 'aria-current="true"' : ''}><span class="map-step-date">${rich(step.date)}</span><span><strong>${rich(step.title)}</strong><small>${rich(step.text)}</small><span class="exhibit-links"><span class="exhibit-link">${esc(step.evidence)}</span></span></span></button></li>`).join('');
    return `${chapterIntro('02', 'The outbreak', 'A report reached Washington. An investigation moved from sick children to one chain, one product and four states.', 'January 1993')}
      <section class="section-wrap"><div class="section-inner"><div class="plate-layout">
        ${imageFigure('img/cdc-report.webp', "First page of the CDC's April 1993 outbreak update, printed page 258.", COPY.imageCaptions.mmwr258)}
        <div class="plate-note"><p class="eyebrow red">A document in the record</p><h2 class="serif-title">The first federal page</h2><p>The CDC report names the restaurant chain only as “chain A.” The document does not name a city or hospital for the first physician report.</p><div class="meta-line">${sourceRef('mmwr-update')} ${label('verified')}</div></div>
      </div></div></section>
      <section class="section-wrap" id="outbreak-section"><div class="section-inner">${sectionHead('SIX CASE FILES', 'The investigation, one decision at a time', 'Open each file to see the date, the place, the evidence, and how strongly the CDC’s 1993 reports support it.')}</div>
        <div class="case-timeline"><div class="case-track">${caseFilesMarkup()}</div></div><p class="timeline-tip">On a desktop, scroll to move across the files. On a phone, the files read vertically.</p>
      </section>
      <section class="section-wrap"><div class="section-inner">${sectionHead('THE EPIDEMIC CURVE', 'More cases began in the week of 17 January than in any other week', COPY.curveText)}
        <div class="curve-feature">${imageFigure('img/cdc-chart.webp', 'CDC Figure 1: cases of E. coli O157:H7 by week of onset in Washington.', COPY.imageCaptions.epidemicCurve, 'document-plate-wide curve-plate')}
          <div><blockquote>“Onsets of illness peaked from January 17 through January 20.”</blockquote><p class="source-line">CDC, MMWR, vol. 42, no. 14, p. 259.</p><a class="text-link" href="img/cdc-charts-states.webp" data-lightbox-src="img/cdc-charts-states.webp" data-lightbox-alt="CDC Figure 2 showing case curves in Idaho, California, and Nevada." data-lightbox-caption="${esc(COPY.imageCaptions.mmwr260)}">Open the Idaho, California and Nevada curves →</a></div>
        </div>
      </div></section>
      <section class="section-wrap" id="map"><div class="section-inner">${sectionHead('STATE-LEVEL TRACEBACK', 'The outbreak moved beyond Washington', 'No city dots appear: the sources gathered do not identify restaurant locations.')}
        <div class="map-layout"><div class="map-frame">${mapSvg('outbreak', ['WA'])}<p class="source-line">State outlines: ${esc(window.FTP_MAP_SOURCE || 'us-atlas us-states.json')}. Counts/source: ${esc(COPY.mapSource)}</p></div>
          <div><ol class="map-step-list">${steps}</ol>${countTable()}<p class="source-line">ID count is culture-confirmed; other state counts met the case definition. The dashed traceback lines are abstract and do not identify a location.</p></div>
        </div>
      </div></section>`;
  }

  function evidenceCard(item) {
    const source = sourceFor(item.source);
    const evidenceLinks = (item.topics || []).map(topic => `<span class="claim-chip">${esc(topic)}</span>`).join(' ');
    return `<details class="exhibit-file" id="ev-${esc(item.id)}" data-exhibit="${esc(item.id)}" data-type="${esc(item.sourceType)}" data-strength="${esc(item.strength)}" data-class="${esc(item.cls)}" data-category="${esc(item.category)}">
      <summary><span class="exhibit-id">${esc(item.id)}<br><small>${esc(item.date)}</small></span><span class="exhibit-title">${rich(item.title)}</span><span class="exhibit-summary-meta">${label(item.cls)} ${stamp(item.strength)}${verifyFlag(item)}</span></summary>
      <div class="exhibit-body"><p><strong>Evidence</strong><br>${rich(item.description)}</p><p><strong>What it tells us</strong><br>${rich(item.tells)}</p><p><strong>Why it matters</strong><br>${rich(item.matters)}</p><p><strong>Claim it supports</strong><br>${rich(item.claim)}</p><p><strong>Limitations</strong><br>${rich(item.limits)}</p>
        <p class="exhibit-source"><strong>Full MLA source</strong><br>${source ? richMLA(source.mla) : 'No source found yet. This is a gap in the research.'}${source ? ` <a href="sources.html#src-${esc(source.id)}">Source record ↗</a>` : ''}</p>
        <div class="meta-line"><span class="claim-chip">${esc(item.sourceType)}</span><span class="claim-chip">${esc(item.category)}</span>${evidenceLinks}</div>${verifyFlag(item)}
      </div>
    </details>`;
  }

  function chainMarkup() {
    const chain = FTP.chain;
    const staticLinks = chain.links.map((link, index) => `<article class="chain-static-link"><p class="eyebrow">LINK ${String(index + 1).padStart(2, '0')} · ${rich(chain.nodes[index].date)} → ${rich(chain.nodes[index + 1].date)}</p><h3>${rich(chain.nodes[index].label)} → ${rich(chain.nodes[index + 1].label)}</h3><p><strong>What evidence connects these moments?</strong> ${rich(link.reading)}</p><p class="meta-line">${stamp(link.strength)} <span class="claim-chip">Causal strength</span></p><p><strong>Linked exhibits</strong> <span class="exhibit-links">${link.evidence.map(evidenceRef).join(' ')}</span></p><p class="cannot-prove"><strong>What we still cannot prove</strong><br>${rich(link.cannot)}</p></article>`).join('');
    return `<div class="chain-track">${chain.nodes.map((node, index) => `<article class="chain-node ${index === 0 ? 'active' : ''}" data-chain-node="${index}"><span class="node-date">${esc(node.date)}</span><strong>${rich(node.label)}</strong>${index < chain.links.length ? `<button type="button" id="chain-${index + 1}" class="chain-link" data-chain-index="${index}" aria-label="What evidence connects ${esc(node.label)} to ${esc(chain.nodes[index + 1].label)}?">→</button>` : ''}</article>`).join('')}</div><section class="chain-static-fallback" aria-label="All causal-link readings">${staticLinks}</section><div class="chain-detail" id="chain-detail" hidden><div id="chain-detail-main"></div><p class="cannot-prove" id="chain-cannot"></p></div>`;
  }

  function pageEvidence() {
    const types = [...new Set(FTP.evidence.map(item => item.sourceType))];
    const strengths = ['strong', 'moderate', 'limited', 'uncertain'];
    const classes = ['verified', 'interpretation', 'inference', 'unresolved'];
    return `${chapterIntro('03', 'The evidence', 'Nineteen exhibits, each with a source and a limit. Follow the chain—but judge how much each link can carry.', 'Evidence board')}
      <section class="section-wrap"><div class="section-inner">
        <div class="section-heading"><span class="section-number">E01—E19</span><div><h2>Open the evidence files</h2><p>Every file shows what the evidence says, why it matters, what it supports, and what it cannot prove.</p></div></div>
        <div class="filter-bar" role="group" aria-label="Filter exhibits">
          <label>Evidence type<select data-evidence-filter="type"><option value="">All types</option>${types.map(type => `<option value="${esc(type)}">${esc(type)}</option>`).join('')}</select></label>
          <label>Strength<select data-evidence-filter="strength"><option value="">All strengths</option>${strengths.map(value => `<option value="${value}">${value.toUpperCase()}</option>`).join('')}</select></label>
          <label>Claim label<select data-evidence-filter="class"><option value="">All labels</option>${classes.map(value => `<option value="${value}">${value.toUpperCase()}</option>`).join('')}</select></label>
          <span class="filter-result" id="filter-result">${FTP.evidence.length} exhibits</span>
        </div>
        <div class="evidence-board">${FTP.evidence.map(evidenceCard).join('')}</div>
      </div></section>
      <section class="section-wrap" id="chain"><div class="section-inner">${sectionHead('FOLLOW THE CHAIN', 'How much evidence connects one moment to the next?', 'Each arrow opens the reading, the linked exhibits, the causal-strength stamp and the question the record cannot settle.')}
      </div><div class="chain-stage"><div class="chain-pin">${chainMarkup()}</div></div></section>`;
  }

  function periodTabs() {
    return `<div class="period-tabs" role="tablist" aria-label="Historical periods">${FTP.periods.map((period, index) => `<button class="period-tab" type="button" id="tab-${period.id}" role="tab" aria-controls="period-${period.id}" aria-selected="${index === 0}" tabindex="${index === 0 ? '0' : '-1'}" data-period="${period.id}"><strong>${esc(period.label)}</strong><small>${rich(period.sub)}</small></button>`).join('')}</div>
      ${FTP.periods.map((period, index) => `<section class="period-panel" id="period-${period.id}" role="tabpanel" aria-labelledby="tab-${period.id}" tabindex="0"><div class="period-grid">${FTP.timelineRows.map(row => {
        const cell = period.cells[row];
        return `<article class="period-cell ${cell ? '' : 'empty-cell'}"><h3>${esc(row)}</h3>${cell ? `<p>${rich(cell.text)}</p><div class="meta-line">${label(cell.cls)} ${sourceRef(cell.src)}${verifyFlag(cell)}</div>` : '<p>No entry yet</p>'}</article>`;
      }).join('')}</div></section>`).join('')}`;
  }

  function thenNowRows() {
    return FTP.thenNow.map(item => {
      const thenSrc = sourceFor(item.then.src);
      const nowSrc = sourceFor(item.now.src);
      return `<article class="then-now-row"><h3>${rich(item.label)}</h3>
        <div class="then-now-side"><span class="small-label">Then</span><p>${rich(item.then.text)}</p><div class="meta-line">${label(item.then.cls)} ${thenSrc ? sourceRef(item.then.src) : ''}${verifyFlag(item.then)}</div></div>
        <div class="year-marker" aria-label="Year of change ${esc(item.year)}">${esc(item.year)}</div>
        <div class="then-now-side now"><span class="small-label">Now</span><p>${rich(item.now.text)}</p><div class="meta-line">${label(item.now.cls)} ${nowSrc ? sourceRef(item.now.src) : ''}${verifyFlag(item.now)}</div></div>
      </article>`;
    }).join('');
  }

  function continuityItems() {
    return FTP.continuity.map((item, index) => `<article class="continuity-item" data-continuity="${index}">
      <div class="continuity-question"><h3>${rich(item.q)}</h3><div class="guess-options" role="group" aria-label="Your guess for ${esc(item.q)}">${['Changed', 'Continued', 'Not sure'].map(option => `<button type="button" data-guess="${esc(option)}" aria-pressed="false">${esc(option)}</button>`).join('')}</div></div>
      <div class="continuity-answer" id="continuity-answer-${index}">${label(item.cls)} <span>${rich(item.answer)}</span><div class="exhibit-links">${(item.evidence || []).map(evidenceRef).join('') || '<span class="claim-chip">No exhibits linked yet</span>'}</div></div>
    </article>`).join('');
  }

  const WEIGHT_CHOICES = ['Major', 'Contributing', 'Minor', "Can't tell yet"];
  function forceCards() {
    const weights = getJSON(STORAGE.weights, {});
    return FTP.forces.map(force => `<article class="force-card" data-force-card="${esc(force.id)}">
      <div class="force-title"><h3>${rich(force.label)}</h3><p>${rich(force.q)}</p></div>
      <div class="force-evidence"><div><strong>Evidence for</strong><p>${rich(force.for)}</p></div><div><strong>Evidence against / limits</strong><p>${rich(force.against)}</p><div class="exhibit-links">${force.evidence.map(evidenceRef).join('')}</div></div></div>
      <div class="weight-control" role="group" aria-label="Your weight for ${esc(force.label)}"><span class="weight-label">Your weight</span>${WEIGHT_CHOICES.map(choice => `<button type="button" data-force="${esc(force.id)}" data-weight="${esc(choice)}" aria-pressed="${weights[force.id] === choice}">${esc(choice)}</button>`).join('')}</div>
    </article>`).join('');
  }

  function pageChange() {
    return `${chapterIntro('04', 'Change and continuity', 'Rules changed in stages. The outbreak mattered—but the record also shows work, science and pressure already in motion.', '1993—1996')}
      <section class="section-wrap"><div class="section-inner"><div class="plate-layout">
        ${imageFigure('img/rule-1996.webp', 'First page of the July 25, 1996 Federal Register Pathogen Reduction / HACCP final rule.', COPY.imageCaptions.federalRegister)}
        <div class="plate-note"><p class="eyebrow red">A regulatory turning point</p><h2 class="serif-title">A final rule, not an Act</h2><p>The official title is the USDA <em>Pathogen Reduction; Hazard Analysis and Critical Control Point (HACCP) Systems final rule</em>, dated 25 July 1996.</p><div class="meta-line">${sourceRef('fsis-haccp-1996')} ${label('verified')}</div></div>
      </div></div></section>
      <section class="section-wrap" id="timeline"><div class="section-inner">${sectionHead('FIVE PERIODS', 'Compare the same questions across time', 'Select a period. Blank cells say “No entry yet”; they are not filled by guesswork.')}${periodTabs()}</div></section>
      <section class="section-wrap" id="then-now"><div class="section-inner">${sectionHead('THEN / NOW', 'Six subjects. Six markers of change', 'Each side keeps its own evidence trail.')}
        <div class="then-now-list">${thenNowRows()}</div>
        <figure class="document-plate document-plate-wide safe-label-plate"><img loading="lazy" src="img/label-1994.webp" alt="Safe Handling Instructions label box shown on page 2 of the FSIS Backgrounder."><figcaption>${rich(COPY.imageCaptions.safeHandlingLabel)}</figcaption></figure>
      </div></section>
      <section class="section-wrap" id="continuity"><div class="section-inner">${sectionHead('WHAT DIDN’T CHANGE?', 'Make a guess before opening the record', 'Choose Changed, Continued or Not sure, then check the evidence.')}
        <div class="continuity-list">${continuityItems()}</div>
        <figure class="document-plate document-plate-wide" style="max-width:52rem;margin:2rem auto 0"><img loading="lazy" src="img/inspection-1999.webp" alt="Tagged beef carcasses in cold storage."><figcaption>${rich(COPY.imageCaptions.usdaInspection)}</figcaption></figure>
      </div></section>
      <section class="section-wrap" id="forces"><div class="section-inner">${sectionHead('WHO REALLY CAUSED THE CHANGE?', 'Weigh the six threads', 'The scale records your judgment locally in this browser. The evidence and counter-evidence remain visible beside every choice.')}
        <div class="weight-tally" id="weight-tally"></div><div class="forces-grid" id="forces-grid">${forceCards()}</div>
        <p class="turning-strip"><span>Was the outbreak the cause, the trigger, or one part of a larger process?</span><span>→</span></p>
      </div></section>`;
  }

  function historianCards() {
    return FTP.historians.map(entry => {
      const source = sourceFor(entry.source);
      return `<article class="hist-card"><div class="hist-citation">${source ? richMLA(source.mla) : ''}<br><span class="paraphrase-note">Paraphrased, not quoted</span>${source?.url ? `<br><a href="${esc(source.url)}" target="_blank" rel="noopener">Open source ↗</a>` : ''}</div>
        <div class="hist-main"><h3>${source ? rich(source.short) : 'Researcher'}</h3><p><strong>Main argument</strong><br>${rich(entry.argument)}</p><p><strong>How it helps</strong><br>${rich(entry.helps)}</p><p><strong>Perspective / bias</strong><br>${rich(entry.perspective)}</p><p><strong>What it cannot establish</strong><br>${rich(entry.cannot)}</p></div>
      </article>`;
    }).join('');
  }

  function disagreementCards() {
    return FTP.disagreements.map(item => `<article class="disagreement"><h3>${rich(item.topic)}</h3><div><div class="disagreement-positions">${item.positions.map(position => `<div class="disagreement-position"><strong>${esc(sourceLabel(position.who))}</strong><p>${rich(position.says)}</p></div>`).join('')}</div><p class="disagreement-note">${rich(item.note)}</p></div></article>`).join('');
  }

  function sourceRoom() {
    const groups = [
      { id: 'primary', title: 'Primary / Government' },
      { id: 'academic', title: 'Academic' },
      { id: 'secondary', title: 'Secondary' }
    ];
    return groups.map(group => `<h3 class="source-group-heading">${group.title}</h3>${FTP.sources.filter(source => source.group === group.id).map(source => {
      const cites = FTP.evidence.filter(exhibit => exhibit.source === source.id).map(exhibit => exhibit.id);
      return `<article class="source-card" id="src-${esc(source.id)}"><div class="source-meta">${esc(source.date)} · ${esc(source.type)}</div><h3>${rich(source.title)}</h3><p class="citation">${richMLA(source.mla)}</p><p><strong>Why it matters:</strong> ${rich(source.why)}</p><p><strong>Supports:</strong> ${rich(source.supports)}</p>${source.verify ? '<span class="verify-flag">Needs source verification</span>' : ''}${source.url ? `<p><a href="${esc(source.url)}" target="_blank" rel="noopener noreferrer">Open cited source ↗</a></p>` : ''}<div class="source-exhibits">${cites.length ? cites.map(evidenceRef).join('') : '<span class="claim-chip">No exhibit cites this source yet</span>'}</div></article>`;
    }).join('')}`).join('');
  }

  function sourceGallery() {
    const docs = [
      { src: 'img/cdc-report.webp', alt: "First page of the CDC's April 1993 outbreak update, printed page 258.", caption: COPY.imageCaptions.mmwr258, title: 'CDC MMWR · p. 258' },
      { src: 'img/usda-1994.webp', alt: 'First page of the FSIS Backgrounder, May 1994.', caption: COPY.imageCaptions.fsisBackgrounder, title: 'FSIS Backgrounder · May 1994' },
      { src: 'img/rule-1996.webp', alt: 'First page of the 1996 Federal Register final rule.', caption: COPY.imageCaptions.federalRegister, title: 'Federal Register · p. 38806' }
    ];
    return docs.map(doc => `<button class="gallery-item" type="button" data-lightbox-src="${doc.src}" data-lightbox-alt="${esc(doc.alt)}" data-lightbox-caption="${esc(doc.caption)}"><img loading="lazy" src="${doc.src}" alt="${esc(doc.alt)}"><span>${esc(doc.title)} · Public domain</span></button>`).join('');
  }

  function pageHistorians() {
    return `${chapterIntro('05', 'Historians and sources', 'Researchers tell different stories about whether 1993 began the change, accelerated it, or marked one stage in a longer process.', 'Literature review')}
      <section class="section-wrap" id="literature"><div class="section-inner">${sectionHead('LITERATURE REVIEW', 'Four researchers, four useful limits', 'Each summary is paraphrased, not quoted. The perspective and reach of each source remain visible.')}
        <div class="historians-list">${historianCards()}</div>
      </div></section>
      <section class="section-wrap" id="disagreements"><div class="section-inner">${sectionHead('WHERE SOURCES DISAGREE', 'The totals and the causal story do not line up neatly')}${disagreementCards()}</div></section>
      <section class="section-wrap"><div class="section-inner">${sectionHead('PRIMARY DOCUMENTS', 'Read the record as an artifact', 'Open a document plate to inspect it at a larger scale.')}
        <div class="gallery-grid">${sourceGallery()}</div>
      </div></section>
      <section class="section-wrap" id="source-room"><div class="section-inner">${sectionHead('SOURCE ROOM', 'The full citation trail', 'Sources are grouped by type. A link appears only where a verified online copy exists.')}
        <div class="source-room">${sourceRoom()}</div>
      </div></section>`;
  }

  function chainRecap() {
    return `<div class="conclusion-chain">${FTP.chain.nodes.map((node, index) => `<article class="conclusion-node"><span class="node-date">${esc(node.date)}</span><strong>${rich(node.label)}</strong>${index < FTP.chain.links.length ? stamp(FTP.chain.links[index].strength) : '<small>End of chain</small>'}</article>`).join('')}</div>`;
  }

  function currentEdits() {
    const saved = getJSON(STORAGE.edits, {});
    return {
      headline: saved.headline || FTP.conclusion.headline,
      strong: saved.strong || FTP.conclusion.strong,
      suggests: saved.suggests || FTP.conclusion.suggests,
      cannot: saved.cannot || FTP.conclusion.cannot
    };
  }

  function visitorRecord() {
    const vote = localStorage.getItem(STORAGE.vote);
    const choice = FTP.hook.choices.find(item => item.id === vote);
    const weights = getJSON(STORAGE.weights, {});
    const majors = FTP.forces.filter(force => weights[force.id] === 'Major').map(force => force.label);
    return `<div class="visitor-record"><div><h3>Your opening hypothesis</h3><p>${choice ? `You chose <strong>${esc(choice.label)}</strong> in the opening poll.` : 'No opening-poll vote is saved in this browser yet.'}</p></div><div><h3>Your major causes</h3><p>${majors.length ? majors.map(esc).join(' · ') : 'No force is currently marked Major.'}</p></div></div>`;
  }

  function pageConclusion() {
    const saved = currentEdits();
    return `${chapterIntro('06', 'Conclusion', 'Follow the evidence back through the chain. Then decide how much the outbreak explains—and what remains unsettled.', 'Weigh the links')}
      <section class="section-wrap" id="conclusion"><div class="section-inner">${sectionHead('CHAIN RECAP', 'The links are not equally strong')}${chainRecap()}
        <button type="button" class="button-primary conclusion-reveal-button" data-reveal-findings>Reveal the findings <span class="arrow" aria-hidden="true">→</span></button>
        <p class="claim-label">INFERENCE</p><h2 class="finding-headline editable-text" data-editable="headline" contenteditable="false">${rich(saved.headline)}</h2>
        <div class="finding-grid">
          <article class="finding"><span class="claim-chip">What the evidence strongly supports</span><h3>What the evidence strongly supports</h3><p class="editable-text" data-editable="strong" contenteditable="false">${rich(saved.strong)}</p></article>
          <article class="finding"><span class="claim-chip">What the evidence suggests</span><h3>What the evidence suggests</h3><p class="editable-text" data-editable="suggests" contenteditable="false">${rich(saved.suggests)}</p></article>
          <article class="finding"><span class="claim-chip">What the evidence cannot prove</span><h3>What the evidence cannot prove</h3><p class="editable-text" data-editable="cannot" contenteditable="false">${rich(saved.cannot)}</p></article>
        </div>
        <div class="edit-toolbar"><button type="button" class="button-secondary" data-edit-conclusion>Edit conclusion</button><button type="button" class="button-secondary" data-restore-conclusion>Restore original wording</button><span class="source-line" id="edit-status" aria-live="polite">Your edits stay in this browser.</span></div>
        ${visitorRecord()}
      </div></section>
      <section class="last-question"><div class="last-question-inner"><p class="eyebrow">The last question</p><h2>${rich(FTP.lastQuestion.q)}</h2><p>${rich(FTP.lastQuestion.a)}</p><figure class="last-question-image"><img loading="lazy" src="img/bacteria.webp" alt="Grayscale scanning electron micrograph of E. coli O157:H7 bacteria."><figcaption>${rich(COPY.imageCaptions.micrograph)}</figcaption></figure></div></section>`;
  }

  const BUILDERS = { intro: pageIntro, outbreak: pageOutbreak, evidence: pageEvidence, change: pageChange, historians: pageHistorians, conclusion: pageConclusion };
  const TITLE = Object.fromEntries(PAGES.map(item => [item.id, item.title]));

  function renderPage() {
    const main = document.getElementById('chapter-content');
    if (!main) return;
    const builder = BUILDERS[PAGE] || pageIntro;
    main.innerHTML = `${builder()}${chapterEnd(PAGE)}`;
    document.title = `FOLLOW THE PATTY — ${TITLE[PAGE] || 'Introduction'}`;
    document.querySelectorAll('[data-nav-link]').forEach(anchor => {
      if (anchor.dataset.navLink === PAGE) anchor.setAttribute('aria-current', 'page');
      else anchor.removeAttribute('aria-current');
    });
  }

  function bindPoll() {
    const form = document.getElementById('hook-poll');
    if (!form) return;
    const temp = document.querySelector('.menu-temp');
    const result = document.getElementById('poll-result');
    const vote = localStorage.getItem(STORAGE.vote);
    const showVote = selected => {
      const option = FTP.hook.choices.find(choice => choice.id === selected);
      if (temp) { temp.textContent = '155°F'; temp.classList.remove('unresolved'); temp.classList.add('resolved'); }
      if (result) result.innerHTML = option ? `${rich(COPY.afterVote)}<span class="return-answer">Your first hypothesis: ${esc(option.label)}. The interim federal recommendation was 155°F.</span>` : '';
    };
    if (vote) showVote(vote);
    form.addEventListener('submit', event => {
      event.preventDefault();
      const selected = form.querySelector('input[name="hook-vote"]:checked');
      if (!selected) { if (result) result.textContent = 'Choose a hypothesis before saving your vote.'; return; }
      localStorage.setItem(STORAGE.vote, selected.value);
      showVote(selected.value);
      document.getElementById('site-announcements').textContent = COPY.afterVote;
    });
  }

  function updateMapStep(stepIndex, prefix = 'outbreak') {
    const step = FTP.mapSteps[stepIndex];
    if (!step) return;
    const selected = step.states || [];
    document.querySelectorAll(`#${prefix}-map-svg .state-shape`).forEach(path => {
      const code = path.dataset.mapState;
      const active = selected.includes(code);
      path.classList.toggle('is-active', active);
      path.setAttribute('aria-pressed', String(active));
      const text = document.querySelector(`#${prefix}-map-svg [data-map-label="${code}"]`);
      if (text && text.textContent === code) text.classList.toggle('light', active);
    });
    document.querySelectorAll(`[data-map-step]`).forEach(button => {
      if (Number(button.dataset.mapStep) === stepIndex) button.setAttribute('aria-current', 'true');
      else button.removeAttribute('aria-current');
    });
    const trace = document.getElementById(`${prefix}-trace-lines`);
    if (trace) trace.style.visibility = step.wide ? 'visible' : 'hidden';
    document.querySelectorAll('[data-count-row]').forEach(row => {
      const code = row.dataset.countRow;
      const visible = selected.includes(code) || REDUCED;
      row.querySelectorAll('[data-count]').forEach(cell => {
        const target = Number(cell.dataset.value || 0);
        if (!visible) { cell.textContent = '—'; return; }
        if (REDUCED || !window.requestAnimationFrame) { cell.textContent = String(target); return; }
        const start = performance.now();
        const duration = 620;
        const tick = now => {
          const progress = Math.min(1, (now - start) / duration);
          cell.textContent = String(Math.round(target * (1 - Math.pow(1 - progress, 3))));
          if (progress < 1) requestAnimationFrame(tick);
        };
        cell.textContent = '0';
        requestAnimationFrame(tick);
      });
    });
  }

  function bindMap() {
    if (!document.getElementById('outbreak-map-svg')) return;
    document.querySelectorAll('[data-map-step]').forEach(button => button.addEventListener('click', () => updateMapStep(Number(button.dataset.mapStep))));
    document.querySelectorAll('#outbreak-map-svg [data-map-state]').forEach(path => {
      const choose = () => {
        const code = path.dataset.mapState;
        const index = code === 'WA' ? 1 : (['ID', 'NV', 'CA'].includes(code) ? 3 : 0);
        updateMapStep(index);
      };
      path.addEventListener('click', choose);
      path.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); choose(); } });
    });
    updateMapStep(0);
  }

  function bindEvidenceFilters() {
    const controls = [...document.querySelectorAll('[data-evidence-filter]')];
    if (!controls.length) return;
    const update = () => {
      const selected = Object.fromEntries(controls.map(control => [control.dataset.evidenceFilter, control.value]));
      let count = 0;
      document.querySelectorAll('[data-exhibit]').forEach(item => {
        const matches = (!selected.type || item.dataset.type === selected.type) && (!selected.strength || item.dataset.strength === selected.strength) && (!selected.class || item.dataset.class === selected.class);
        item.hidden = !matches;
        if (matches) count++;
      });
      const status = document.getElementById('filter-result');
      if (status) status.textContent = `${count} ${count === 1 ? 'exhibit' : 'exhibits'}`;
    };
    controls.forEach(control => control.addEventListener('change', update));
  }

  function openChain(index) {
    const link = FTP.chain.links[index];
    if (!link) return;
    const from = FTP.chain.nodes[index];
    const to = FTP.chain.nodes[index + 1];
    document.querySelectorAll('[data-chain-node]').forEach(node => node.classList.toggle('active', Number(node.dataset.chainNode) === index || Number(node.dataset.chainNode) === index + 1));
    const detail = document.getElementById('chain-detail');
    const main = document.getElementById('chain-detail-main');
    const cannot = document.getElementById('chain-cannot');
    if (!detail || !main || !cannot) return;
    detail.hidden = false;
    main.innerHTML = `<p class="eyebrow">Link ${String(index + 1).padStart(2, '0')} · ${rich(from.date)} → ${rich(to.date)}</p><h3>What evidence connects ${rich(from.label)} to ${rich(to.label)}?</h3><p>${rich(link.reading)}</p><div class="meta-line">${stamp(link.strength)} <span class="claim-chip">Causal strength</span></div><div class="chain-evidence">${link.evidence.map(evidenceRef).join('')}</div>`;
    cannot.innerHTML = `<strong>What we still cannot prove</strong><br>${rich(link.cannot)}`;
  }

  function bindChain() {
    document.querySelectorAll('[data-chain-index]').forEach(button => button.addEventListener('click', () => openChain(Number(button.dataset.chainIndex))));
  }

  function setPeriod(id, focusPanel = false) {
    const period = FTP.periods.find(item => item.id === id);
    if (!period) return;
    document.querySelectorAll('.period-tab').forEach(tab => {
      const active = tab.dataset.period === id;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    document.querySelectorAll('.period-panel').forEach(panel => { panel.hidden = !REDUCED && panel.id !== `period-${id}`; });
    if (focusPanel) document.getElementById(`period-${id}`)?.focus();
  }

  function bindPeriodTabs() {
    const tabs = [...document.querySelectorAll('.period-tab')];
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => setPeriod(tab.dataset.period));
      tab.addEventListener('keydown', event => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        let next = index;
        if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = tabs.length - 1;
        tabs[next].focus(); setPeriod(tabs[next].dataset.period);
      });
    });
    if (tabs.length) setPeriod(tabs[0].dataset.period);
  }

  function bindContinuity() {
    const guesses = getJSON(STORAGE.guesses, {});
    document.querySelectorAll('[data-continuity]').forEach(card => {
      const index = card.dataset.continuity;
      const buttons = [...card.querySelectorAll('[data-guess]')];
      buttons.forEach(button => {
        if (guesses[index] === button.dataset.guess) button.setAttribute('aria-pressed', 'true');
        button.addEventListener('click', () => {
          buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
          guesses[index] = button.dataset.guess;
          setJSON(STORAGE.guesses, guesses);
          const answer = document.getElementById(`continuity-answer-${index}`);
          if (answer) answer.hidden = false;
        });
      });
      const answer = document.getElementById(`continuity-answer-${index}`);
      if (answer) answer.hidden = !REDUCED && !guesses[index];
    });
  }

  function updateTally() {
    const holder = document.getElementById('weight-tally');
    if (!holder) return;
    const weights = getJSON(STORAGE.weights, {});
    const counts = Object.fromEntries(WEIGHT_CHOICES.map(choice => [choice, 0]));
    Object.values(weights).forEach(value => { if (counts[value] != null) counts[value]++; });
    holder.innerHTML = `<h3>Your current weight of the six forces</h3><div class="tally-bars">${WEIGHT_CHOICES.map(choice => `<div class="tally-item"><span>${esc(choice)}</span><div class="tally-bar"><span style="--tally:${(counts[choice] / Math.max(1, FTP.forces.length)).toFixed(3)}"></span></div><b>${counts[choice]}</b></div>`).join('')}</div>`;
  }

  function reorderForceCards() {
    const grid = document.getElementById('forces-grid');
    if (!grid) return;
    const cards = [...grid.querySelectorAll('.force-card')];
    const oldRects = new Map(cards.map(card => [card, card.getBoundingClientRect()]));
    const weights = getJSON(STORAGE.weights, {});
    const rank = { Major: 0, Contributing: 1, Minor: 2, "Can't tell yet": 3 };
    cards.sort((a, b) => (rank[weights[a.dataset.forceCard]] ?? 4) - (rank[weights[b.dataset.forceCard]] ?? 4));
    cards.forEach(card => grid.appendChild(card));
    if (!REDUCED) requestAnimationFrame(() => cards.forEach(card => {
      const oldRect = oldRects.get(card); const newRect = card.getBoundingClientRect();
      const dx = oldRect.left - newRect.left; const dy = oldRect.top - newRect.top;
      if (!dx && !dy) return;
      card.style.transform = `translate(${dx}px,${dy}px)`;
      requestAnimationFrame(() => { card.style.transform = ''; });
    }));
  }

  function bindForces() {
    if (!document.getElementById('forces-grid')) return;
    updateTally();
    document.querySelectorAll('[data-force][data-weight]').forEach(button => button.addEventListener('click', () => {
      const weights = getJSON(STORAGE.weights, {});
      weights[button.dataset.force] = button.dataset.weight;
      setJSON(STORAGE.weights, weights);
      document.querySelectorAll(`[data-force="${button.dataset.force}"]`).forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      updateTally(); reorderForceCards();
    }));
  }

  function bindEditableConclusion() {
    if (!document.querySelector('[data-editable]')) return;
    const editButton = document.querySelector('[data-edit-conclusion]');
    const restoreButton = document.querySelector('[data-restore-conclusion]');
    const status = document.getElementById('edit-status');
    let editing = false;
    const save = () => {
      const values = {};
      document.querySelectorAll('[data-editable]').forEach(node => { values[node.dataset.editable] = node.textContent.trim(); });
      setJSON(STORAGE.edits, values);
      if (status) status.textContent = 'Saved in this browser.';
    };
    editButton?.addEventListener('click', () => {
      editing = !editing;
      document.querySelectorAll('[data-editable]').forEach(node => { node.contentEditable = String(editing); });
      editButton.textContent = editing ? 'Finish editing' : 'Edit conclusion';
      if (!editing) save(); else { document.querySelector('[data-editable]')?.focus(); if (status) status.textContent = 'Edit the text. Changes save as you type.'; }
    });
    document.querySelectorAll('[data-editable]').forEach(node => node.addEventListener('input', save));
    restoreButton?.addEventListener('click', () => {
      try { localStorage.removeItem(STORAGE.edits); } catch (_) {}
      document.querySelectorAll('[data-editable]').forEach(node => {
        const key = node.dataset.editable;
        node.textContent = FTP.conclusion[key];
        node.contentEditable = 'false';
      });
      editing = false;
      if (editButton) editButton.textContent = 'Edit conclusion';
      if (status) status.textContent = 'Original wording restored.';
    });
    document.querySelector('[data-reveal-findings]')?.addEventListener('click', () => {
      const findings = [...document.querySelectorAll('.finding')];
      if (!REDUCED && window.gsap) window.gsap.fromTo(findings, { y: 14 }, { y: 0, stagger: .14, duration: .45, ease: 'power2.out' });
      findings[0]?.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'nearest' });
    });
  }

  function buildEvidenceIndex() {
    const topics = document.getElementById('index-topics');
    const exhibits = document.getElementById('index-exhibits');
    if (!topics || !exhibits) return;
    topics.innerHTML = FTP.index.map(item => `<a class="index-topic" href="${topicHref(item)}">${esc(item.label)} <span aria-hidden="true">→</span></a>`).join('');
    exhibits.innerHTML = FTP.evidence.map(item => `<a class="index-exhibit" href="evidence.html#ev-${esc(item.id)}"><b>${esc(item.id)}</b><span>${rich(item.title)}</span></a>`).join('');
    const search = document.getElementById('index-search');
    search?.addEventListener('input', () => {
      const query = search.value.trim().toLowerCase();
      exhibits.querySelectorAll('.index-exhibit').forEach(anchor => { anchor.hidden = !anchor.textContent.toLowerCase().includes(query); });
    });
  }

  function bindIndexPanel() {
    const panel = document.getElementById('evidence-index');
    if (!panel) return;
    const opener = document.querySelector('[data-open-index]');
    const close = () => { panel.hidden = true; panel.setAttribute('aria-hidden', 'true'); document.body.classList.remove('panel-open'); opener?.focus(); };
    opener?.addEventListener('click', () => { panel.hidden = false; panel.setAttribute('aria-hidden', 'false'); document.body.classList.add('panel-open'); document.getElementById('index-search')?.focus(); });
    panel.querySelectorAll('[data-close-index]').forEach(button => button.addEventListener('click', close));
    buildEvidenceIndex();
  }

  let lightboxReturn = null;
  function openLightbox(src, alt, caption) {
    const box = document.getElementById('lightbox');
    if (!box) return;
    lightboxReturn = document.activeElement;
    const body = box.querySelector('.lightbox-body');
    body.innerHTML = `<figure><img src="${esc(src)}" alt="${esc(alt)}"><figcaption>${rich(caption)}</figcaption></figure>`;
    box.hidden = false; box.setAttribute('aria-hidden', 'false'); document.body.classList.add('panel-open');
    box.querySelector('.lightbox-close')?.focus();
  }
  function closeLightbox() {
    const box = document.getElementById('lightbox');
    if (!box || box.hidden) return;
    box.hidden = true; box.setAttribute('aria-hidden', 'true'); document.body.classList.remove('panel-open');
    if (lightboxReturn && lightboxReturn.focus) lightboxReturn.focus();
  }
  function bindLightbox() {
    document.querySelectorAll('[data-lightbox-src]').forEach(item => item.addEventListener('click', event => {
      event.preventDefault(); openLightbox(item.dataset.lightboxSrc, item.dataset.lightboxAlt || '', item.dataset.lightboxCaption || 'Public domain.');
    }));
    document.querySelector('[data-close-lightbox]')?.addEventListener('click', closeLightbox);
    document.getElementById('lightbox')?.addEventListener('click', event => { if (event.target.id === 'lightbox') closeLightbox(); });
  }

  const SEGMENTS = [
    { id: 'hook', label: '0:00–0:45 · Hook', start: 0, end: 45 },
    { id: 'outbreak', label: '0:45–2:00 · Outbreak / map', start: 45, end: 120 },
    { id: 'chain', label: '2:00–3:30 · Cause and effect', start: 120, end: 210 },
    { id: 'then-now', label: '3:30–4:30 · Then / Now', start: 210, end: 270 },
    { id: 'conclusion', label: '4:30–5:00 · Conclusion', start: 270, end: 300 },
    { id: 'questions', label: '5:00–7:00 · Questions', start: 300, end: 420 }
  ];

  function deckSlides() {
    const vote = localStorage.getItem(STORAGE.vote);
    const voteChoice = FTP.hook.choices.find(choice => choice.id === vote);
    const map = mapSvg('deck', ['WA', 'ID', 'NV', 'CA']);
    const chain = FTP.chain.nodes.map((node, index) => `<div class="deck-chain-item"><b>${esc(node.date)}</b>${rich(node.label)}${index < FTP.chain.links.length ? `<small>${FTP.chain.links[index].strength.toUpperCase()} LINK</small>` : ''}</div>`).join('');
    const thenNowSlides = [0, 1].map((chunk, slideIndex) => {
      const start = chunk * 3;
      const items = FTP.thenNow.slice(start, start + 3);
      return { segment: 'then-now', kicker: slideIndex === 0 ? '3:30–4:00 · Then / Now' : '4:00–4:30 · Then / Now', title: slideIndex === 0 ? 'Rules and production' : 'Oversight and public health', body: `<div class="deck-then-now">${items.map(item => `<article><span class="claim-chip">${esc(item.year)} · ${rich(item.label)}</span><h3>Then</h3><p>${rich(item.then.text)}</p><h3>Now</h3><p>${rich(item.now.text)}</p></article>`).join('')}</div>` };
    });
    const findings = [
      { title: 'What the evidence strongly supports', body: FTP.conclusion.strong },
      { title: 'What the evidence suggests', body: FTP.conclusion.suggests },
      { title: 'What the evidence cannot prove', body: FTP.conclusion.cannot }
    ].map(item => ({ segment: 'conclusion', kicker: '4:30–5:00 · Finding revealed on Next', title: item.title, body: `<p>${rich(item.body)}</p>` }));
    return [
      { segment: 'hook', kicker: '0:00–0:45 · The opening question', title: 'Why is your burger cooked that way?', body: `<div class="deck-columns"><div><p class="deck-menu">${esc(COPY.menuBoard.replace('??? °F', vote ? '155°F' : '??? °F'))}</p><p>${voteChoice ? `Your saved hypothesis: ${esc(voteChoice.label)}.` : 'Class hypothesis: Restaurant policy / Federal regulation / Food science / Customer preference / All of the above.'}</p></div><div><p>${rich(COPY.hookQuestion)}</p><p class="deck-answer">${voteChoice ? 'The interim federal recommendation was 155°F.' : 'Vote on the introduction page to record your hypothesis.'}</p></div></div>` },
      { segment: 'outbreak', kicker: '0:45–2:00 · The outbreak map', title: 'One investigation. Four affected states.', body: `<div class="deck-columns"><div>${map}</div><div><p>The CDC reports 477 Washington cases, 14 in Idaho, 58 in Nevada and 34 in California under the stated case definitions.</p><div class="deck-stat-row">${['WA','ID','NV','CA'].map(code => `<div class="deck-stat"><b>${FTP.mapStates[code].cases}</b><span>${STATE_NAMES[code]}</span></div>`).join('')}</div><p class="source-line">${esc(COPY.mapSource)}</p></div></div>` },
      { segment: 'chain', kicker: '2:00–3:30 · Cause and effect', title: 'The causal links carry different weight.', body: `<div class="deck-chain">${chain}</div><p class="source-line">Each link is rated by how strongly the evidence connects the two events.</p>` },
      ...thenNowSlides,
      ...findings,
      { segment: 'questions', kicker: '5:00–7:00 · Questions', title: 'Choose a line of inquiry.', body: `<div class="deck-topic-grid">${FTP.index.map(item => `<a class="deck-topic" href="${topicHref(item)}">${esc(item.label)}</a>`).join('')}</div><p class="source-line">Every topic jump and exhibit is also available from the Evidence Index (I).</p>` },
      { segment: 'questions', kicker: '5:00–7:00 · Questions · Exhibit room', title: 'All nineteen exhibits', body: `<div class="deck-exhibit-grid">${FTP.evidence.map(item => `<a class="deck-exhibit" href="evidence.html#ev-${esc(item.id)}"><b>${esc(item.id)} · ${esc(item.strength.toUpperCase())}</b>${rich(item.title)}</a>`).join('')}</div>` }
    ];
  }

  let activeSlides = [];
  let activeSlide = 0;
  let deckStartedAt = 0;
  let deckTimerFrame = 0;
  function formatTime(seconds) { const value = Math.max(0, Math.min(420, Math.floor(seconds))); return `${Math.floor(value / 60)}:${String(value % 60).padStart(2, '0')}`; }
  function renderDeckSlide() {
    const root = document.getElementById('presentation-deck');
    if (!root || !activeSlides.length) return;
    const item = activeSlides[activeSlide];
    const segmentIndex = SEGMENTS.findIndex(segment => segment.id === item.segment);
    root.innerHTML = `<div class="deck-top"><span class="deck-brand">FOLLOW THE PATTY</span><span class="deck-timer" id="deck-timer">0:00 / 7:00</span><button class="deck-exit" type="button" data-deck-exit>Exit presentation <kbd>Esc</kbd></button></div>
      <div class="deck-segments">${SEGMENTS.map((segment, index) => `<div class="deck-segment ${index === segmentIndex ? 'active' : ''}">${esc(segment.label)}</div>`).join('')}</div>
      <div class="deck-progress" aria-label="Presentation progress"><span id="deck-progress-fill"></span></div>
      <div class="deck-slide" aria-live="polite"><div class="deck-slide-inner"><p class="deck-kicker">${esc(item.kicker)}</p><h1>${rich(item.title)}</h1>${item.body}</div></div>
      <div class="deck-controls"><button type="button" data-deck-back>Back</button><button type="button" data-deck-home>Home</button><span class="deck-counter">${activeSlide + 1} / ${activeSlides.length}</span><button type="button" class="primary" data-deck-next>Next</button></div>`;
    root.querySelector('[data-deck-exit]').addEventListener('click', closeDeck);
    root.querySelector('[data-deck-back]').addEventListener('click', () => goDeck(activeSlide - 1));
    root.querySelector('[data-deck-home]').addEventListener('click', () => goDeck(0));
    root.querySelector('[data-deck-next]').addEventListener('click', () => goDeck(activeSlide + 1));
    paintDeckTimer();
  }
  function goDeck(index) {
    activeSlide = Math.max(0, Math.min(activeSlides.length - 1, index));
    renderDeckSlide();
    const slide = document.querySelector('.deck-slide-inner');
    if (!REDUCED && window.gsap && slide) window.gsap.fromTo(slide, { y: 8, opacity: .7 }, { y: 0, opacity: 1, duration: .24, ease: 'power1.out' });
  }
  function paintDeckTimer() {
    const root = document.getElementById('presentation-deck');
    if (!root || root.hidden) return;
    const elapsed = (Date.now() - deckStartedAt) / 1000;
    const label = root.querySelector('#deck-timer');
    const bar = root.querySelector('#deck-progress-fill');
    if (label) label.textContent = `${formatTime(elapsed)} / 7:00`;
    if (bar) bar.style.transform = `scaleX(${Math.min(1, elapsed / 420)})`;
  }
  function updateDeckTimer() {
    const root = document.getElementById('presentation-deck');
    if (!root || root.hidden) { deckTimerFrame = 0; return; }
    paintDeckTimer();
    deckTimerFrame = requestAnimationFrame(updateDeckTimer);
  }
  function openDeck() {
    const root = document.getElementById('presentation-deck');
    if (!root) return;
    if (deckTimerFrame) cancelAnimationFrame(deckTimerFrame);
    activeSlides = deckSlides(); activeSlide = 0; deckStartedAt = Date.now();
    root.hidden = false; root.setAttribute('aria-hidden', 'false'); document.body.classList.add('deck-open');
    renderDeckSlide();
    deckTimerFrame = requestAnimationFrame(updateDeckTimer);
    root.querySelector('[data-deck-exit]')?.focus();
  }
  function closeDeck() {
    const root = document.getElementById('presentation-deck');
    if (!root || root.hidden) return;
    root.hidden = true; root.setAttribute('aria-hidden', 'true'); document.body.classList.remove('deck-open');
    cancelAnimationFrame(deckTimerFrame);
    deckTimerFrame = 0;
    document.querySelector('[data-open-deck]')?.focus();
  }

  function bindDeck() {
    document.querySelector('[data-open-deck]')?.addEventListener('click', openDeck);
    document.addEventListener('keydown', event => {
      const deck = document.getElementById('presentation-deck');
      if (!deck || deck.hidden) return;
      if (event.key === 'Escape') { event.preventDefault(); closeDeck(); }
      else if (event.key === 'ArrowRight') { event.preventDefault(); goDeck(activeSlide + 1); }
      else if (event.key === 'ArrowLeft') { event.preventDefault(); goDeck(activeSlide - 1); }
      else if (event.key === 'Home') { event.preventDefault(); goDeck(0); }
    });
  }

  function bindGlobalKeys() {
    document.addEventListener('keydown', event => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      const target = event.target;
      const editing = target && (target.matches('input,textarea,select') || target.isContentEditable);
      if (editing) return;
      const deck = document.getElementById('presentation-deck');
      if (deck && !deck.hidden) return;
      if (event.key.toLowerCase() === 'p') { event.preventDefault(); openDeck(); }
      if (event.key.toLowerCase() === 'i') { event.preventDefault(); document.querySelector('[data-open-index]')?.click(); }
      if (event.key === 'Escape') { closeLightbox(); const panel = document.getElementById('evidence-index'); if (panel && !panel.hidden) panel.querySelector('[data-close-index]')?.click(); }
    });
  }

  function updateProgress() {
    const bar = document.getElementById('read-progress');
    if (!bar) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = `${max <= 0 ? 0 : Math.min(100, window.scrollY / max * 100)}%`;
  }

  function bindDeepLinks() {
    if (!location.hash) return;
    const hash = decodeURIComponent(location.hash.slice(1));
    const openTarget = () => {
      if (hash.startsWith('chain-')) { const number = Number(hash.split('-')[1]); openChain(number - 1); document.getElementById(hash)?.scrollIntoView({ block: 'center' }); return; }
      if (hash.startsWith('ev-')) { const item = document.getElementById(hash); if (item) { item.open = true; item.scrollIntoView({ block: 'start' }); } return; }
      if (hash.startsWith('period-')) { const id = hash.replace('period-', ''); setPeriod(id); document.getElementById(hash)?.scrollIntoView({ block: 'start' }); return; }
      document.getElementById(hash)?.scrollIntoView({ block: 'start' });
    };
    window.setTimeout(openTarget, 60);
  }

  function runMotion() {
    if (REDUCED || !window.gsap || !window.ScrollTrigger) return;
    const gsap = window.gsap;
    gsap.registerPlugin(window.ScrollTrigger);
    document.documentElement.classList.add('animations-ready');
    const hero = document.querySelector('.hero-title span');
    if (hero) gsap.fromTo('.hero-title span', { y: 32, opacity: .55 }, { y: 0, opacity: 1, duration: .8, stagger: .15, ease: 'power3.out' });
    const heroImage = document.querySelector('.hero-art img');
    if (heroImage) gsap.to(heroImage, { yPercent: 8, scale: 1.04, ease: 'none', scrollTrigger: { trigger: '.chapter-hero', start: 'top top', end: 'bottom top', scrub: .7 } });
    const researchPrompt = document.querySelector('.research-question-inline');
    if (researchPrompt) gsap.fromTo(researchPrompt, { y: 8, opacity: .72 }, { y: 0, opacity: 1, scrollTrigger: { trigger: researchPrompt, start: 'top 88%', once: true } });
    if (window.innerWidth > 760) {
      const timeline = document.querySelector('.case-timeline');
      const track = document.querySelector('.case-track');
      if (timeline && track && track.scrollWidth > timeline.clientWidth) {
        gsap.to(track, { x: () => -(track.scrollWidth - timeline.clientWidth), ease: 'none', scrollTrigger: { trigger: timeline, start: 'top top+=180', end: () => `+=${track.scrollWidth - timeline.clientWidth}`, scrub: 1, pin: true, invalidateOnRefresh: true } });
      }
      const mapSection = document.getElementById('map');
      if (mapSection && window.innerHeight > 740) {
        window.ScrollTrigger.create({ trigger: mapSection, start: 'top top+=175', end: '+=900', pin: '.map-frame', pinSpacing: true, onUpdate: self => updateMapStep(Math.min(4, Math.floor(self.progress * 5))) });
      }
      const chainStage = document.querySelector('.chain-stage');
      if (chainStage && window.innerWidth > 1050 && window.innerHeight > 760) {
        window.ScrollTrigger.create({ trigger: chainStage, start: 'top top+=155', end: '+=420', pin: '.chain-pin', pinSpacing: true });
      }
      document.querySelectorAll('.document-plate img').forEach(image => {
        gsap.fromTo(image, { y: 12, opacity: .78 }, { y: 0, opacity: 1, duration: .7, scrollTrigger: { trigger: image, start: 'top 88%', once: true } });
      });
      gsap.utils.toArray('.document-plate:not(.curve-plate)').forEach(plate => gsap.fromTo(plate, { rotateX: 1.2, rotateY: -.9, y: 10, transformPerspective: 900 }, { rotateX: 0, rotateY: 0, y: 0, scrollTrigger: { trigger: plate, start: 'top 88%', end: 'top 52%', scrub: .5 } }));
      gsap.utils.toArray('.case-date').forEach(stampDate => gsap.fromTo(stampDate, { y: -9, rotation: -6, opacity: .68 }, { y: 0, rotation: -2, opacity: 1, duration: .3, scrollTrigger: { trigger: stampDate, start: 'top 90%', once: true } }));
      gsap.utils.toArray('.exhibit-file').forEach(file => {
        gsap.fromTo(file, { y: 9, opacity: .84 }, { y: 0, opacity: 1, duration: .45, scrollTrigger: { trigger: file, start: 'top 92%', once: true } });
        file.addEventListener('toggle', () => {
          if (!file.open) return;
          const stamps = file.querySelectorAll('.stamp');
          gsap.fromTo(stamps, { scale: .82, rotation: -8, opacity: .68 }, { scale: 1, rotation: -3, opacity: 1, duration: .28, stagger: .07, ease: 'back.out(1.5)' });
        });
      });
      const curve = document.querySelector('.curve-plate img');
      if (curve) gsap.fromTo(curve, { scaleX: .04, opacity: .72, transformOrigin: 'left center' }, { scaleX: 1, opacity: 1, ease: 'none', scrollTrigger: { trigger: curve, start: 'top 80%', end: 'bottom 48%', scrub: .65 } });
      document.querySelectorAll('.then-now-row').forEach(row => gsap.fromTo(row.querySelector('.then-now-side.now'), { x: 16 }, { x: 0, scrollTrigger: { trigger: row, start: 'top 88%', end: 'top 50%', scrub: .45 } }));
      const finalImage = document.querySelector('.last-question-image img');
      if (finalImage) gsap.to(finalImage, { yPercent: -8, ease: 'none', scrollTrigger: { trigger: '.last-question', start: 'top bottom', end: 'bottom top', scrub: .6 } });
      document.querySelectorAll('.chain-link').forEach(button => gsap.fromTo(button, { scaleX: .7 }, { scaleX: 1, scrollTrigger: { trigger: button, start: 'top 85%', once: true } }));
      gsap.utils.toArray('.conclusion-node').forEach(node => gsap.fromTo(node, { scaleX: .84, opacity: .72, transformOrigin: 'left center' }, { scaleX: 1, opacity: 1, scrollTrigger: { trigger: node, start: 'top 88%', once: true } }));
      window.ScrollTrigger.refresh();
    }
  }

  function initializePageInteractions() {
    bindPoll(); bindMap(); bindEvidenceFilters(); bindChain(); bindPeriodTabs();
    bindContinuity(); bindForces(); bindEditableConclusion(); bindLightbox();
  }

  function boot() {
    renderPage();
    initializePageInteractions();
    bindIndexPanel(); bindDeck(); bindGlobalKeys(); bindDeepLinks();
    if (!REDUCED) document.documentElement.classList.add('animations-ready');
    updateProgress(); window.addEventListener('scroll', updateProgress, { passive: true }); window.addEventListener('resize', updateProgress, { passive: true });
    runMotion();
    if (window.Lenis && !REDUCED && window.innerWidth > 760) {
      try {
        const lenis = new window.Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: .85 });
        if (window.gsap) {
          window.gsap.ticker.add(time => lenis.raf(time * 1000));
          window.gsap.ticker.lagSmoothing(0);
        } else {
          const raf = time => { lenis.raf(time); requestAnimationFrame(raf); };
          requestAnimationFrame(raf);
        }
      } catch (_) { /* Native scrolling remains the fallback. */ }
    }
  }

  try { boot(); }
  catch (error) {
    console.error('FOLLOW THE PATTY could not initialize the interactive layer.', error);
    document.getElementById('site-announcements').textContent = 'Interactive features are unavailable; the chapter text remains available.';
  }
})();
