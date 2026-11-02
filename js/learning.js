/*
 * Function 1 – Digital Learning Platform (spec: function1_knowledge.md).
 * Single page inside the "Learning" tab: profile + budget + skills, My Learning,
 * recommendations, catalogue (A/B/C) and partners. State lives in memory only.
 */
(function () {
  const L = HS.data.learning;
  const LEVELS = ['Beginner', 'Intermediate', 'Advanced'];
  const ITEM_LEVEL = { Beginner: 1, Intermediate: 2, Advanced: 3, Foundational: 1, Associate: 2, Professional: 3 };
  const CATEGORIES = {
    tech:     { letter: 'A', label: 'Technical Topics',        sub: 'HECTOR School recordings · Free' },
    personal: { letter: 'B', label: 'Personal Skills',         sub: 'HECTOR School recordings · Free' },
    cert:     { letter: 'C', label: 'Official Certifications', sub: 'Partner programs · Paid with your education budget' }
  };
  const CERT_TOPICS = ['Cloud & Development', 'Project Management', 'Agile'];
  const CERT_MODULES = ['Exam overview & study plan', 'Exam domain 1', 'Exam domain 2', 'Exam domain 3', 'Exam domain 4', 'Hands-on labs', 'Practice exam', 'Final review & exam booking'];
  const TOPIC_ICON = {
    'AI Chatbots': 'message-square', 'Multi-Agent Systems': 'cpu', 'Generative AI': 'zap', 'Data Analytics': 'trending-up',
    Cybersecurity: 'shield', Presentation: 'mic', 'Body Language': 'user', 'Business Language': 'globe',
    'Challenger Attitude in Sales': 'target', Negotiation: 'briefcase', 'Time Management': 'clock',
    'Cloud & Development': 'cloud', 'Project Management': 'layers', Agile: 'trending-up'
  };

  const items = [
    ...L.courses.map((c) => ({ ...c, kind: 'course', category: L.topics[c.topic].category })),
    ...L.certifications.map((c) => ({ ...c, kind: 'cert', category: 'cert' }))
  ];

  const state = {
    skills: L.initialSkills.map((s) => ({ ...s })),
    purchases: L.purchases.map((p) => ({ ...p })),
    inProgress: L.inProgress.map((e) => ({ ...e })),
    completed: L.completed.map((e) => ({ ...e })),
    filter: 'all',
    query: '',
    sort: 'popularity',
    activePartner: null
  };

  let root;
  const esc = HS.fmt.escape;
  const money = HS.fmt.currency;

  // ------------------------------------------------------------------ Helpers
  const item = (id) => items.find((i) => i.id === id);
  const certPartner = (id) => L.certPartners.find((p) => p.id === id);
  const lecturerName = (i) => HS.find.lecturer(L.topics[i.topic].lecturerId).name;
  const issuer = (i) => (i.kind === 'cert' ? certPartner(i.partnerId).name : 'HECTOR School');

  const spent = () => state.purchases.reduce((sum, p) => sum + p.amount, 0);
  const remaining = () => L.budgetTotal - spent();

  function status(id) {
    if (state.completed.some((e) => e.itemId === id)) return 'completed';
    if (state.inProgress.some((e) => e.itemId === id)) return 'in-progress';
    return null;
  }

  const minutes = (i) => (i.kind === 'course' ? i.duration : i.prepHours * 60);
  function fmtDuration(min) {
    const h = Math.floor(min / 60);
    const m = min % 60;
    return h ? `${h}h${m ? ` ${m}m` : ''}` : `${m}m`;
  }
  const pct = (e) => Math.round((e.done / e.total) * 100);
  const unit = (i) => (i.kind === 'cert' ? 'Module' : 'Lesson');

  function nextLesson(entry) {
    const i = item(entry.itemId);
    const n = entry.done + 1;
    const title = entry.lessons ? entry.lessons[entry.done] : null;
    return `${unit(i)} ${n} of ${entry.total}${title ? `: ${title}` : ''}`;
  }

  const slot = (name) => root.querySelector(`[data-slot="${name}"]`);

  // ------------------------------------------------------------------ Layout (rendered once)
  function renderLayout() {
    root.innerHTML = `
      <nav class="subnav" aria-label="Learning sections">
        <a href="#learner-profile">${HS.icon('user')}Profile</a>
        <a href="#my-learning">${HS.icon('play')}My Learning</a>
        <a href="#recommended">${HS.icon('star')}Recommended</a>
        <a href="#catalogue">${HS.icon('book-open')}Course Catalogue</a>
        <a href="#partners">${HS.icon('award')}Partners</a>
      </nav>

      <section class="section" id="learner-profile">
        <div class="section-header">
          <div><h2>Learner Profile</h2><p class="subline">Your profile, education budget and skills in one place.</p></div>
        </div>
        <div class="profile-grid">
          <div class="card card-pad profile-card" data-slot="profile"></div>
          <div class="card card-pad budget-card" data-slot="budget"></div>
        </div>
        <div class="card card-pad skills-card" id="skill-profile" data-slot="skills"></div>
      </section>

      <section class="section" id="my-learning">
        <div class="section-header">
          <div><h2>My Learning</h2><p class="subline">Pick up where you left off and keep track of what you have achieved.</p></div>
        </div>
        <div data-slot="my-learning"></div>
      </section>

      <section class="section" id="recommended">
        <div class="section-header">
          <div><h2>Recommended for You</h2><p class="subline" data-slot="recs-sub"></p></div>
          <div class="row-arrows" data-row-target="recs-row">
            <button class="icon-btn" type="button" data-scroll="-1" aria-label="Scroll left">${HS.icon('chevron-left')}</button>
            <button class="icon-btn" type="button" data-scroll="1" aria-label="Scroll right">${HS.icon('chevron-right')}</button>
          </div>
        </div>
        <div data-slot="recs"></div>
      </section>

      <section class="section" id="catalogue">
        <div class="section-header">
          <div><h2>Course Catalogue</h2><p class="subline">Browse free HECTOR School recordings and official partner certifications.</p></div>
        </div>
        <div class="card card-pad catalogue-controls">
          <label class="search">
            ${HS.icon('search')}
            <span class="sr-only">Search the catalogue</span>
            <input class="input" type="search" id="catalogue-search" placeholder="Search courses, certifications, partners or skills…" autocomplete="off">
          </label>
          <div class="controls-row">
            <div class="chip-row" role="group" aria-label="Filter by category" data-slot="filters"></div>
            <label class="sort-control">
              <span>Sort by</span>
              <select class="select" id="catalogue-sort">
                <option value="popularity">Popularity</option>
                <option value="duration">Duration (shortest first)</option>
                <option value="price">Price (lowest first)</option>
              </select>
            </label>
          </div>
        </div>
        <div data-slot="catalogue"></div>
      </section>

      <section class="section" id="partners">
        <div class="section-header">
          <div><h2>Partners</h2><p class="subline">Official certification partners – select a partner to see all of its certifications.</p></div>
        </div>
        <div data-slot="partners"></div>
      </section>`;
  }

  // ------------------------------------------------------------------ 2.1 Learner profile
  function renderProfile() {
    const s = HS.data.student;
    const certsEarned = state.completed.filter((e) => item(e.itemId).kind === 'cert').length;
    const coursesDone = state.completed.length - certsEarned;
    const hours = Math.round(
      (state.completed.reduce((sum, e) => sum + minutes(item(e.itemId)), 0) +
        state.inProgress.reduce((sum, e) => sum + minutes(item(e.itemId)) * (e.done / e.total), 0)) / 60
    );

    slot('profile').innerHTML = `
      <div class="profile-head">
        <div class="photo-placeholder" title="Profile photo placeholder">${HS.icon('user')}</div>
        <div>
          <p class="kicker">Welcome back</p>
          <h3 class="profile-name">${s.firstName} ${s.lastName}</h3>
          <p class="profile-program">${s.program}</p>
          <p class="card-meta">${s.school} · ${s.cohort} · ${s.studyMode}</p>
        </div>
      </div>
      <p class="profile-job">${HS.icon('briefcase')}${s.jobTitle} at ${s.employer}</p>
      <div class="profile-stats">
        <div><strong>${state.inProgress.length}</strong><span>In progress</span></div>
        <div><strong>${coursesDone}</strong><span>Courses completed</span></div>
        <div><strong>${certsEarned}</strong><span>Certifications</span></div>
        <div><strong>${hours} h</strong><span>Learning time</span></div>
      </div>
      <div class="profile-interests">
        <span class="label">Career interests</span>
        <div class="chip-row">${s.careerInterests.map((c) => `<span class="badge badge-blue">${c}</span>`).join('')}</div>
      </div>`;
  }

  function renderBudget() {
    const total = L.budgetTotal;
    const used = spent();
    const left = remaining();
    const recent = [...state.purchases].reverse().slice(0, 3);
    slot('budget').innerHTML = `
      <div class="budget-head">
        <span class="icon-circle">${HS.icon('wallet')}</span>
        <div><h3>Education Budget</h3><p class="subline">Master thesis education budget</p></div>
      </div>
      <div class="budget-amount">
        <strong data-testid="budget-remaining">${money(left)}</strong>
        <span>remaining of ${money(total)}</span>
      </div>
      <div class="progress" role="progressbar" aria-label="Budget spent" aria-valuenow="${Math.round((used / total) * 100)}" aria-valuemin="0" aria-valuemax="100">
        <div class="progress-bar" style="width:${(used / total) * 100}%"></div>
      </div>
      <dl class="budget-rows">
        <div><dt>Total</dt><dd>${money(total)}</dd></div>
        <div><dt>Spent</dt><dd>${money(used)}</dd></div>
        <div class="is-remaining"><dt>Remaining</dt><dd>${money(left)}</dd></div>
      </dl>
      <div class="budget-history">
        <span class="label">Recent purchases</span>
        ${recent.length ? recent.map((p) => `
          <div class="purchase">
            <span>${item(p.itemId).title}<small>${HS.fmt.date(p.date)}</small></span>
            <strong>−${money(p.amount)}</strong>
          </div>`).join('') : '<p class="card-meta">No purchases yet.</p>'}
      </div>`;
  }

  function skillCategoryIndex(name) {
    return L.skillCatalog.findIndex((g) => g.skills.includes(name));
  }

  function renderSkills() {
    const tags = state.skills.map((s) => `
      <span class="skill-tag">
        <span class="skill-dot cat-${skillCategoryIndex(s.name)}"></span>
        ${esc(s.name)}
        <button class="level-pill level-${LEVELS.indexOf(s.level) + 1}" type="button" data-action="cycle-level" data-skill="${esc(s.name)}" title="Change proficiency level">${s.level}</button>
        <button class="skill-remove" type="button" data-action="remove-skill" data-skill="${esc(s.name)}" aria-label="Remove ${esc(s.name)}">${HS.icon('x')}</button>
      </span>`).join('');

    slot('skills').innerHTML = `
      <div class="skills-head">
        <div>
          <h3>Skill Profile</h3>
          <p class="subline">Your self-assessed skills – the platform uses them to personalise your recommendations.</p>
        </div>
        <button class="btn btn-secondary btn-sm" type="button" data-action="add-skill">${HS.icon('plus')}Add skill</button>
      </div>
      ${state.skills.length
        ? `<div class="skill-tags">${tags}</div>
           <p class="skills-hint">${HS.icon('info')}Click a level to change it (Beginner → Intermediate → Advanced).</p>`
        : `<div class="note">${HS.icon('info')}Add skills to get personalised recommendations.</div>`}`;
  }

  function openAddSkill() {
    const owned = new Set(state.skills.map((s) => s.name));
    const selected = new Set();
    let level = 'Beginner';
    const groups = L.skillCatalog.map((g, gi) => {
      const free = g.skills.filter((s) => !owned.has(s));
      if (!free.length) return '';
      return `
        <div class="skill-group">
          <p class="label"><span class="skill-dot cat-${gi}"></span>${g.category}</p>
          <div class="chip-row">${free.map((s) => `<button class="chip" type="button" aria-pressed="false" data-pick="${esc(s)}">${esc(s)}</button>`).join('')}</div>
        </div>`;
    }).join('');

    HS.ui.openModal({
      title: 'Add skills',
      subline: 'Select the skills you already have and your proficiency level.',
      body: groups
        ? `${groups}
           <div class="skill-group">
             <p class="label">Proficiency level</p>
             <div class="segmented" role="group" aria-label="Proficiency level">
               ${LEVELS.map((l) => `<button type="button" class="${l === level ? 'is-active' : ''}" data-level="${l}">${l}</button>`).join('')}
             </div>
           </div>`
        : '<div class="note">You have already added all available skills.</div>',
      actions: [
        { label: 'Cancel', variant: 'ghost' },
        {
          label: 'Add selected skills',
          variant: 'primary',
          keepOpen: true,
          onClick: (close) => {
            if (!selected.size) {
              HS.ui.toast('Select at least one skill', 'info');
              return;
            }
            selected.forEach((name) => state.skills.push({ name, level }));
            close();
            HS.ui.toast(`${selected.size} skill${selected.size > 1 ? 's' : ''} added – recommendations updated`);
            renderAll();
          }
        }
      ],
      onMount: (modal) => {
        modal.addEventListener('click', (e) => {
          const chip = e.target.closest('[data-pick]');
          if (chip) {
            const name = chip.dataset.pick;
            if (selected.has(name)) selected.delete(name); else selected.add(name);
            chip.setAttribute('aria-pressed', String(selected.has(name)));
          }
          const lv = e.target.closest('[data-level]');
          if (lv) {
            level = lv.dataset.level;
            modal.querySelectorAll('[data-level]').forEach((b) => b.classList.toggle('is-active', b === lv));
          }
        });
      }
    });
  }

  // ------------------------------------------------------------------ 2.2 My learning
  function renderMyLearning() {
    const progressCards = state.inProgress.map((e) => {
      const i = item(e.itemId);
      return `
        <article class="card learning-item">
          ${thumbSmall(i)}
          <div class="li-body">
            <div class="li-top">
              ${i.kind === 'cert' ? '<span class="badge badge-blue">Certification</span>' : `<span class="badge badge-green">${CATEGORIES[i.category].label}</span>`}
              <span class="li-pct">${pct(e)}%</span>
            </div>
            <h4>${i.title}</h4>
            <p class="card-meta">${i.kind === 'cert' ? certPartner(i.partnerId).name : `HECTOR School · ${lecturerName(i)}`}</p>
            <div class="progress"><div class="progress-bar" style="width:${pct(e)}%"></div></div>
            <p class="li-next"><span>Next:</span> ${nextLesson(e)}</p>
            <button class="btn btn-primary btn-sm" type="button" data-action="continue" data-id="${i.id}">${HS.icon('play')}Continue</button>
          </div>
        </article>`;
    }).join('');

    const done = [...state.completed].sort((a, b) => b.date.localeCompare(a.date)).map((e) => {
      const i = item(e.itemId);
      return `
        <article class="card earned-card">
          <span class="earned-badge ${i.kind === 'cert' ? 'is-cert' : ''}">${HS.icon('award')}</span>
          <span class="badge ${i.kind === 'cert' ? 'badge-blue' : 'badge-green'}">${i.kind === 'cert' ? 'Certification' : 'Course'}</span>
          <h4>${i.title}</h4>
          <p class="card-meta">Issued by <strong>${issuer(i)}</strong></p>
          <p class="card-meta">Earned ${HS.fmt.date(e.date)}</p>
          <button class="btn btn-secondary btn-sm" type="button" data-action="view-certificate" data-id="${i.id}">View certificate</button>
        </article>`;
    }).join('');

    slot('my-learning').innerHTML = `
      <div class="subsection">
        <h3 class="subsection-title">In Progress <span class="count">${state.inProgress.length}</span></h3>
        ${progressCards ? `<div class="grid grid-3">${progressCards}</div>` : '<div class="note">Nothing in progress – start a course from the catalogue below.</div>'}
      </div>
      <div class="subsection">
        <h3 class="subsection-title">Earned Certifications &amp; Completed Courses <span class="count">${state.completed.length}</span></h3>
        ${done ? `<div class="grid grid-3">${done}</div>` : '<div class="note">Your certificates will appear here.</div>'}
      </div>`;
  }

  function thumbSmall(i) {
    if (i.kind === 'cert') return `<div class="li-thumb is-cert"><span class="partner-logo">${certPartner(i.partnerId).logo}</span></div>`;
    return `<div class="li-thumb thumb-${L.topics[i.topic].thumb}">${HS.icon(TOPIC_ICON[i.topic])}</div>`;
  }

  function openPlayer(id) {
    const entry = state.inProgress.find((e) => e.itemId === id);
    const i = item(id);
    const thumb = i.kind === 'cert' ? 'is-cert' : `thumb-${L.topics[i.topic].thumb}`;
    HS.ui.openModal({
      title: i.title,
      subline: nextLesson(entry),
      body: `
        <div class="player">
          <div class="player-screen ${thumb}">
            <button class="player-play" type="button" data-play aria-label="Play lesson">${HS.icon('play')}</button>
            <span class="player-caption" data-caption>Ready to play</span>
          </div>
          <div class="player-progress">
            <div class="progress"><div class="progress-bar" style="width:${pct(entry)}%"></div></div>
            <span>${entry.done} of ${entry.total} ${unit(i).toLowerCase()}s completed · ${pct(entry)}%</span>
          </div>
          <p class="card-meta">${i.kind === 'cert' ? `Official preparation material · ${certPartner(i.partnerId).name}` : `Recorded by ${lecturerName(i)} · HECTOR School`}</p>
        </div>`,
      actions: [
        { label: 'Close', variant: 'ghost' },
        { label: `${HS.icon('check')}Mark ${unit(i).toLowerCase()} as complete`, variant: 'primary', onClick: () => completeLesson(id) }
      ],
      onMount: (modal) => {
        let playing = false;
        modal.querySelector('[data-play]').addEventListener('click', (e) => {
          playing = !playing;
          e.currentTarget.innerHTML = HS.icon(playing ? 'pause' : 'play');
          e.currentTarget.closest('.player-screen').classList.toggle('is-playing', playing);
          modal.querySelector('[data-caption]').textContent = playing ? 'Playing…' : 'Paused';
        });
      }
    });
  }

  function completeLesson(id) {
    const entry = state.inProgress.find((e) => e.itemId === id);
    const i = item(id);
    entry.done += 1;
    if (entry.done >= entry.total) {
      state.inProgress = state.inProgress.filter((e) => e !== entry);
      state.completed.push({ itemId: id, date: HS.data.today, credentialId: `HS-${id.toUpperCase()}-2026-${String(Math.floor(Math.random() * 90000) + 10000)}` });
      HS.ui.toast(`Completed: ${i.title} – certificate added`, 'award');
    } else {
      HS.ui.toast(`${unit(i)} completed – next: ${nextLesson(entry)}`);
    }
    renderAll();
  }

  function openCertificate(id) {
    const entry = state.completed.find((e) => e.itemId === id);
    const i = item(id);
    const s = HS.data.student;
    HS.ui.openModal({
      title: 'Certificate',
      subline: i.title,
      body: `
        <div class="certificate ${i.kind === 'cert' ? 'is-cert' : ''}">
          <div class="certificate-top">
            ${i.kind === 'cert' ? `<span class="partner-logo">${certPartner(i.partnerId).logo}</span>` : '<span class="brand-mark">KIT</span>'}
            <strong>${i.kind === 'cert' ? certPartner(i.partnerId).fullName : 'KIT HECTOR School'}</strong>
          </div>
          <p class="certificate-kicker">${i.kind === 'cert' ? 'Official Certification' : 'Certificate of Completion'}</p>
          <p class="certificate-small">This certifies that</p>
          <p class="certificate-name">${s.firstName} ${s.lastName}</p>
          <p class="certificate-small">has successfully ${i.kind === 'cert' ? 'earned the certification' : 'completed the course'}</p>
          <p class="certificate-title">${i.title}</p>
          <div class="certificate-foot">
            <div><span>Issued by</span><strong>${issuer(i)}</strong></div>
            <div><span>Date earned</span><strong>${HS.fmt.date(entry.date)}</strong></div>
            <div><span>Credential ID</span><strong>${entry.credentialId}</strong></div>
          </div>
        </div>`,
      actions: [
        {
          label: `${HS.icon('copy')}Copy credential ID`,
          variant: 'secondary',
          keepOpen: true,
          onClick: () => {
            try { navigator.clipboard.writeText(entry.credentialId); } catch (err) { /* clipboard unavailable */ }
            HS.ui.toast('Credential ID copied');
          }
        },
        { label: 'Close', variant: 'primary' }
      ]
    });
  }

  // ------------------------------------------------------------------ Cards (shared by recommendations, catalogue, partners)
  function courseCard(i, reason = '') {
    const st = status(i.id);
    const entry = state.inProgress.find((e) => e.itemId === i.id);
    return `
      <article class="card card-hover course-card" role="button" tabindex="0" data-action="view-course" data-id="${i.id}" aria-label="${esc(i.title)}">
        <div class="thumb thumb-${L.topics[i.topic].thumb}">
          <span class="thumb-icon">${HS.icon(TOPIC_ICON[i.topic])}</span>
          <span class="thumb-topic">${i.topic}</span>
          <span class="badge badge-free price-badge">Free</span>
        </div>
        <div class="cc-body">
          ${reason}
          <div class="cc-tags"><span class="badge badge-gray">${i.level}</span>${st === 'completed' ? '<span class="badge badge-green">' + HS.icon('check') + 'Completed</span>' : ''}</div>
          <h4 class="cc-title">${i.title}</h4>
          <p class="cc-meta">${HS.icon('clock')}${fmtDuration(i.duration)}<span class="sep"></span>${HS.icon('video')}${i.videos} videos</p>
          <p class="cc-meta">${HS.icon('star')}${i.rating.toFixed(1)} · ${i.learners.toLocaleString('en-GB')} learners</p>
          ${entry ? `<div class="cc-progress"><div class="progress"><div class="progress-bar" style="width:${pct(entry)}%"></div></div><span>${pct(entry)}%</span></div>` : ''}
        </div>
      </article>`;
  }

  function certAction(i) {
    const st = status(i.id);
    if (st === 'completed') return `<button class="btn btn-secondary btn-sm btn-block" type="button" data-action="view-certificate" data-id="${i.id}">${HS.icon('award')}View certificate</button>`;
    if (st === 'in-progress') return `<button class="btn btn-secondary btn-sm btn-block" type="button" data-action="continue" data-id="${i.id}">${HS.icon('play')}Continue preparation</button>`;
    if (i.price > remaining()) {
      return `
        <button class="btn btn-sm btn-block" type="button" disabled>${HS.icon('lock')}Buy with budget</button>
        <p class="card-note">${HS.icon('alert')}Not enough budget – ${money(i.price - remaining())} missing</p>`;
    }
    return `<button class="btn btn-blue btn-sm btn-block" type="button" data-action="buy" data-id="${i.id}">${HS.icon('wallet')}Buy with budget</button>`;
  }

  function certCard(i, reason = '') {
    const p = certPartner(i.partnerId);
    const st = status(i.id);
    return `
      <article class="card card-hover cert-card">
        <div class="cert-head">
          <span class="partner-logo">${p.logo}</span>
          <span class="badge badge-price price-badge">${money(i.price)}</span>
        </div>
        <div class="cc-body">
          ${reason}
          <button class="cc-partner" type="button" data-action="partner" data-partner="${p.id}">${p.name}</button>
          <h4 class="cc-title"><button type="button" class="title-btn" data-action="view-cert" data-id="${i.id}">${i.title}</button></h4>
          <div class="cc-tags">
            <span class="badge badge-blue">${i.level}</span>
            ${st === 'completed' ? `<span class="badge badge-green">${HS.icon('check')}Earned</span>` : ''}
            ${st === 'in-progress' ? '<span class="badge badge-orange">In progress</span>' : ''}
          </div>
          <p class="cc-meta">${HS.icon('clock')}~${i.prepHours} h preparation</p>
          <div class="cc-footer">${certAction(i)}</div>
        </div>
      </article>`;
  }

  const card = (i, reason) => (i.kind === 'cert' ? certCard(i, reason) : courseCard(i, reason));

  function openCourse(id) {
    const i = item(id);
    const st = status(id);
    const actions = [{ label: 'Close', variant: 'ghost' }];
    if (st === 'completed') actions.push({ label: 'View certificate', variant: 'primary', onClick: () => setTimeout(() => openCertificate(id)) });
    else if (st === 'in-progress') actions.push({ label: `${HS.icon('play')}Continue`, variant: 'primary', onClick: () => setTimeout(() => openPlayer(id)) });
    else actions.push({ label: `${HS.icon('play')}Start course`, variant: 'primary', onClick: () => startCourse(id) });

    HS.ui.openModal({
      title: i.title,
      subline: `${CATEGORIES[i.category].label} · ${i.topic}`,
      body: `
        <div class="detail-thumb thumb-${L.topics[i.topic].thumb}">${HS.icon(TOPIC_ICON[i.topic])}<span class="badge badge-free">Free</span></div>
        <p class="detail-summary">${i.summary}</p>
        <dl class="detail-grid">
          <div><dt>Duration</dt><dd>${fmtDuration(i.duration)}</dd></div>
          <div><dt>Videos</dt><dd>${i.videos}</dd></div>
          <div><dt>Level</dt><dd>${i.level}</dd></div>
          <div><dt>Rating</dt><dd>${i.rating.toFixed(1)} (${i.learners.toLocaleString('en-GB')})</dd></div>
          <div class="span-2"><dt>Lecturer</dt><dd>${lecturerName(i)} · HECTOR School</dd></div>
        </dl>
        <p class="label">Skills you build</p>
        <div class="chip-row">${i.skills.map((s) => `<span class="tag">${s}</span>`).join('')}</div>`,
      actions
    });
  }

  function startCourse(id) {
    const i = item(id);
    state.inProgress.unshift({ itemId: id, done: 0, total: i.videos });
    HS.ui.toast(`"${i.title}" added to My Learning`);
    renderAll();
  }

  function openCertDetails(id) {
    const i = item(id);
    const p = certPartner(i.partnerId);
    const st = status(id);
    const canBuy = !st && i.price <= remaining();
    const actions = [{ label: 'Close', variant: 'ghost' }];
    if (canBuy) actions.push({ label: `${HS.icon('wallet')}Buy with budget`, variant: 'blue', onClick: () => setTimeout(() => openBuy(id)) });
    if (st === 'in-progress') actions.push({ label: `${HS.icon('play')}Continue preparation`, variant: 'primary', onClick: () => setTimeout(() => openPlayer(id)) });
    if (st === 'completed') actions.push({ label: 'View certificate', variant: 'primary', onClick: () => setTimeout(() => openCertificate(id)) });

    HS.ui.openModal({
      title: i.title,
      subline: `Official Certification · ${p.name}`,
      body: `
        <div class="detail-thumb is-cert"><span class="partner-logo lg">${p.logo}</span><span class="badge badge-price">${money(i.price)}</span></div>
        <p class="detail-summary">${i.summary}</p>
        <dl class="detail-grid">
          <div><dt>Partner</dt><dd>${p.name}</dd></div>
          <div><dt>Level</dt><dd>${i.level}</dd></div>
          <div><dt>Est. preparation</dt><dd>~${i.prepHours} hours</dd></div>
          <div><dt>Price</dt><dd>${money(i.price)}</dd></div>
        </dl>
        <p class="label">Skills you build</p>
        <div class="chip-row">${i.skills.map((s) => `<span class="tag">${s}</span>`).join('')}</div>
        ${!st && !canBuy ? `<div class="note note-warning detail-note">${HS.icon('alert')}Your remaining budget (${money(remaining())}) is too low for this certification.</div>` : ''}`,
      actions
    });
  }

  function openBuy(id) {
    const i = item(id);
    const p = certPartner(i.partnerId);
    const before = remaining();
    HS.ui.openModal({
      title: 'Buy with budget',
      subline: 'Please confirm your purchase.',
      body: `
        <div class="buy-item">
          <span class="partner-logo">${p.logo}</span>
          <div><strong>${i.title}</strong><span class="card-meta">${p.name} · ${i.level} · ~${i.prepHours} h preparation</span></div>
        </div>
        <dl class="buy-rows">
          <div><dt>Price</dt><dd>${money(i.price)}</dd></div>
          <div><dt>Current remaining budget</dt><dd>${money(before)}</dd></div>
          <div class="is-total"><dt>Remaining budget after purchase</dt><dd>${money(before - i.price)}</dd></div>
        </dl>
        <div class="note">${HS.icon('info')}Includes official preparation material and one exam voucher. The amount is charged to your master thesis education budget.</div>`,
      actions: [
        { label: 'Cancel', variant: 'ghost' },
        { label: `Confirm purchase · ${money(i.price)}`, variant: 'primary', onClick: () => buy(id) }
      ]
    });
  }

  function buy(id) {
    const i = item(id);
    if (status(id) || i.price > remaining()) return;
    state.purchases.push({ itemId: id, date: HS.data.today, amount: i.price });
    state.inProgress.unshift({ itemId: id, done: 0, total: CERT_MODULES.length, lessons: CERT_MODULES });
    HS.ui.toast(`Purchased "${i.title}" – moved to In Progress`);
    renderAll();
  }

  // ------------------------------------------------------------------ 2.3 Recommendations
  // Round-robin over the user's skills so every skill contributes; reason = matched skill.
  function recommendations(limit = 10) {
    const perSkill = state.skills.map((s) => {
      const userLevel = LEVELS.indexOf(s.level) + 1;
      const candidates = items
        .filter((i) => !status(i.id) && i.skills.includes(s.name))
        .map((i) => ({ i, score: i.rating + i.learners / 10000 - Math.abs(ITEM_LEVEL[i.level] - (userLevel + 1)) * 0.6 }))
        .sort((a, b) => b.score - a.score);
      return { skill: s, userLevel, candidates };
    });

    const picked = [];
    const used = new Set();
    let round = 0;
    while (picked.length < limit && perSkill.some((p) => p.candidates.length > round)) {
      perSkill.forEach((p) => {
        const c = p.candidates[round];
        if (!c || used.has(c.i.id) || picked.length >= limit) return;
        used.add(c.i.id);
        const builds = c.i.kind === 'cert' || ITEM_LEVEL[c.i.level] > p.userLevel;
        picked.push({ item: c.i, reason: builds ? `Builds on: ${p.skill.name}` : `Because you have: ${p.skill.name}` });
      });
      round += 1;
    }
    return picked;
  }

  function renderRecs() {
    const recs = recommendations();
    slot('recs-sub').textContent = state.skills.length
      ? `Based on your skill profile: ${state.skills.map((s) => s.name).join(', ')}.`
      : 'Add skills to your profile to get personalised recommendations.';
    slot('recs').innerHTML = recs.length
      ? `<div class="card-row" id="recs-row">${recs.map((r) => card(r.item, `<p class="rec-reason">${HS.icon('star')}${esc(r.reason)}</p>`)).join('')}</div>`
      : `<div class="note">${HS.icon('info')}No recommendations yet – add skills to your <a href="#skill-profile">skill profile</a>.</div>`;
  }

  // ------------------------------------------------------------------ 2.4 Catalogue
  function matchesQuery(i, q) {
    if (!q) return true;
    const hay = [i.title, i.topic, i.level, i.summary, ...i.skills, i.kind === 'cert' ? certPartner(i.partnerId).name : 'HECTOR School']
      .join(' ')
      .toLowerCase();
    return q.split(/\s+/).every((word) => hay.includes(word));
  }

  function sortItems(list) {
    const by = {
      popularity: (a, b) => b.learners - a.learners,
      duration: (a, b) => minutes(a) - minutes(b),
      price: (a, b) => (a.price || 0) - (b.price || 0) || b.learners - a.learners
    };
    return [...list].sort(by[state.sort]);
  }

  function renderFilters() {
    const count = (cat) => items.filter((i) => (cat === 'all' || i.category === cat) && matchesQuery(i, state.query.toLowerCase())).length;
    const chips = [['all', 'All'], ['tech', 'A · Technical Topics'], ['personal', 'B · Personal Skills'], ['cert', 'C · Official Certifications']];
    slot('filters').innerHTML = chips.map(([key, label]) => `
      <button class="chip" type="button" data-action="filter" data-filter="${key}" aria-pressed="${state.filter === key}">${label}<span class="chip-count">${count(key)}</span></button>`).join('');
  }

  function topicsOf(cat) {
    return cat === 'cert' ? CERT_TOPICS : Object.keys(L.topics).filter((t) => L.topics[t].category === cat);
  }

  function renderCatalogue() {
    renderFilters();
    const q = state.query.trim().toLowerCase();
    const cats = state.filter === 'all' ? Object.keys(CATEGORIES) : [state.filter];
    let total = 0;

    const sections = cats.map((cat) => {
      const meta = CATEGORIES[cat];
      const rows = topicsOf(cat).map((topic) => {
        const list = sortItems(items.filter((i) => i.category === cat && i.topic === topic && matchesQuery(i, q)));
        if (!list.length) return '';
        total += list.length;
        const rowId = `row-${cat}-${topic.replace(/\W+/g, '-').toLowerCase()}`;
        return `
          <div class="topic-row">
            <div class="row-head">
              <h4>${HS.icon(TOPIC_ICON[topic])}${topic}</h4>
              <span class="card-meta">${list.length} ${cat === 'cert' ? 'certification' : 'course'}${list.length > 1 ? 's' : ''}</span>
              <div class="row-arrows" data-row-target="${rowId}">
                <button class="icon-btn" type="button" data-scroll="-1" aria-label="Scroll ${topic} left">${HS.icon('chevron-left')}</button>
                <button class="icon-btn" type="button" data-scroll="1" aria-label="Scroll ${topic} right">${HS.icon('chevron-right')}</button>
              </div>
            </div>
            <div class="card-row" id="${rowId}">${list.map((i) => card(i)).join('')}</div>
          </div>`;
      }).join('');
      if (!rows) return '';
      return `
        <div class="cat-section cat-${cat}" id="category-${cat}">
          <div class="cat-header">
            <span class="cat-letter">${meta.letter}</span>
            <div><h3>${meta.label}</h3><p class="subline">${meta.sub}</p></div>
            <span class="badge ${cat === 'cert' ? 'badge-blue' : 'badge-green'}">${cat === 'cert' ? 'Paid' : 'Free'}</span>
          </div>
          ${rows}
        </div>`;
    }).join('');

    slot('catalogue').innerHTML = `
      ${q ? `<p class="results-line">${total} result${total === 1 ? '' : 's'} for “${esc(state.query.trim())}”</p>` : ''}
      ${sections || `
        <div class="placeholder">
          ${HS.icon('search')}
          <h3>No results found</h3>
          <p>Try another search term or category.</p>
          <button class="btn btn-secondary btn-sm" type="button" data-action="clear-search">Clear search &amp; filters</button>
        </div>`}`;
  }

  // ------------------------------------------------------------------ 2.5 Partners
  function renderPartners() {
    const tiles = L.certPartners.map((p) => {
      const n = L.certifications.filter((c) => c.partnerId === p.id).length;
      return `
        <button class="partner-tile ${state.activePartner === p.id ? 'is-active' : ''}" type="button" data-action="partner" data-partner="${p.id}" aria-expanded="${state.activePartner === p.id}">
          <span class="partner-logo lg">${p.logo}</span>
          <strong>${p.name}</strong>
          <span class="card-meta">${n} certification${n > 1 ? 's' : ''}</span>
        </button>`;
    }).join('');

    const p = state.activePartner && certPartner(state.activePartner);
    const area = p ? `
      <div class="card partner-area" id="partner-area">
        <div class="partner-area-head">
          <span class="partner-logo xl">${p.logo}</span>
          <div>
            <h3>${p.name}</h3>
            <p class="subline">${p.fullName} · Official certification partner</p>
            <p class="partner-desc">${p.description}</p>
          </div>
          <button class="icon-btn" type="button" data-action="partner" data-partner="${p.id}" aria-label="Close partner area">${HS.icon('x')}</button>
        </div>
        <div class="partner-certs">${L.certifications.filter((c) => c.partnerId === p.id).map((c) => certCard(item(c.id))).join('')}</div>
      </div>` : '';

    slot('partners').innerHTML = `<div class="partner-grid">${tiles}</div>${area}`;
  }

  function togglePartner(id, scroll) {
    state.activePartner = state.activePartner === id ? null : id;
    renderPartners();
    const area = root.querySelector('#partner-area');
    if (area && scroll) area.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // ------------------------------------------------------------------ Render + events
  function renderAll() {
    renderProfile();
    renderBudget();
    renderSkills();
    renderMyLearning();
    renderRecs();
    renderCatalogue();
    renderPartners();
  }

  function onClick(e) {
    const scrollBtn = e.target.closest('[data-scroll]');
    if (scrollBtn) {
      const row = root.querySelector(`#${scrollBtn.closest('[data-row-target]').dataset.rowTarget}`);
      if (row) row.scrollBy({ left: Number(scrollBtn.dataset.scroll) * row.clientWidth * 0.8, behavior: 'smooth' });
      return;
    }
    const el = e.target.closest('[data-action]');
    if (!el || el.disabled) return;
    const { action, id } = el.dataset;
    switch (action) {
      case 'add-skill': openAddSkill(); break;
      case 'remove-skill':
        state.skills = state.skills.filter((s) => s.name !== el.dataset.skill);
        HS.ui.toast(`Removed "${el.dataset.skill}" – recommendations updated`, 'info');
        renderAll();
        break;
      case 'cycle-level': {
        const s = state.skills.find((x) => x.name === el.dataset.skill);
        s.level = LEVELS[(LEVELS.indexOf(s.level) + 1) % LEVELS.length];
        renderSkills();
        renderRecs();
        break;
      }
      case 'continue': openPlayer(id); break;
      case 'view-certificate': openCertificate(id); break;
      case 'view-course': openCourse(id); break;
      case 'view-cert': openCertDetails(id); break;
      case 'buy': openBuy(id); break;
      case 'partner': {
        // From a card outside the partner section: open that partner and jump there.
        const fromCard = !el.closest('#partners');
        if (fromCard) {
          state.activePartner = null;
          togglePartner(el.dataset.partner, true);
        } else {
          togglePartner(el.dataset.partner, false);
        }
        break;
      }
      case 'filter':
        state.filter = el.dataset.filter;
        renderCatalogue();
        break;
      case 'clear-search':
        state.query = '';
        state.filter = 'all';
        root.querySelector('#catalogue-search').value = '';
        renderCatalogue();
        break;
      default:
    }
  }

  // Public: used by Function 3 to suggest a matching course.
  HS.learning = {
    course: (id) => item(id),
    openCourse: (id) => openCourse(id)
  };

  HS.modules.learning = {
    init(el) {
      root = el;
      renderLayout();
      renderAll();
      root.addEventListener('click', onClick);
      root.addEventListener('keydown', (e) => {
        if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('.course-card')) {
          e.preventDefault();
          e.target.click();
        }
      });
      root.querySelector('#catalogue-search').addEventListener('input', (e) => {
        state.query = e.target.value;
        renderCatalogue();
      });
      root.querySelector('#catalogue-sort').addEventListener('change', (e) => {
        state.sort = e.target.value;
        renderCatalogue();
      });
      root.querySelectorAll('.subnav a').forEach((a) => {
        a.addEventListener('click', (e) => {
          e.preventDefault();
          HS.navigate(a.getAttribute('href'));
        });
      });
    }
  };
})();
