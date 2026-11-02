/*
 * Function 3 – Structured Feedback & Improvement Plan (spec: function3_feedback.md).
 * Grades list with "View Feedback" next to each grade, structured feedback from lecturers,
 * peers and industry mentors, and an improvement plan built from single recommendations.
 */
(function () {
  const F = HS.data.feedback;
  const esc = HS.fmt.escape;
  const TYPE_ICON = { Presentation: 'mic', Project: 'briefcase', Assignment: 'book-open', Evaluation: 'check-circle' };
  const GIVER_TYPE = {
    lecturer: { label: 'Lecturer', badge: 'badge-green' },
    peer: { label: 'Peer', badge: 'badge-purple' },
    mentor: { label: 'Industry mentor', badge: 'badge-blue' }
  };
  const STATUS = {
    planned: { label: 'Planned', badge: 'badge-gray' },
    'in-progress': { label: 'In progress', badge: 'badge-orange' },
    completed: { label: 'Completed', badge: 'badge-green' }
  };

  const state = {
    activities: F.activities.map((a) => ({ ...a })),
    actions: F.actions.map((a) => ({ ...a, reviews: [...a.reviews] })),
    giverFilter: 'all'
  };
  let root;

  // ------------------------------------------------------------------ Helpers
  const initials = (name) => name.replace(/^(Prof\. )?(Dr\. )?/, '').split(' ').map((w) => w[0]).join('').slice(0, 2);
  const activity = (id) => state.activities.find((a) => a.id === id);
  const allFeedback = () => state.activities.flatMap((a) => (a.feedback || []).map((f) => ({ ...f, activity: a })));
  const feedbackById = (id) => allFeedback().find((f) => f.id === id);
  const actionFor = (feedbackId) => state.actions.find((a) => a.feedbackId === feedbackId);
  const daysUntil = (iso) => Math.round((HS.parseDate(iso) - HS.today()) / 86400000);

  // Person behind a giver / support reference.
  function person(ref) {
    if (ref.type === 'lecturer') {
      const l = HS.find.lecturer(ref.id);
      return { name: l.name, sub: l.field, initials: initials(l.name) };
    }
    if (ref.type === 'peer') {
      const p = HS.find.person(ref.id);
      return { name: p.name, sub: p.job, initials: initials(p.name) };
    }
    const prj = HS.find.project(ref.id);
    const org = HS.find.partner(prj.partnerId);
    const role = prj.mentor.split(', ')[0];
    return { name: `${role}, ${org.name}`, sub: `Industry mentor · ${prj.title}`, initials: initials(org.name) };
  }

  function gradeClass(g) {
    if (g == null) return 'g-neutral';
    if (g <= 1.5) return 'g-top';
    if (g <= 2.5) return 'g-good';
    return 'g-ok';
  }

  function competencyAverages() {
    const sums = {};
    allFeedback().forEach((f) => Object.entries(f.ratings).forEach(([c, v]) => {
      sums[c] = sums[c] || { total: 0, n: 0, low: new Set() };
      sums[c].total += v;
      sums[c].n += 1;
      if (v <= 3) sums[c].low.add(f.activity.id);
    }));
    return F.competencies.map((c) => ({
      name: c,
      avg: sums[c] ? sums[c].total / sums[c].n : null,
      n: sums[c] ? sums[c].n : 0,
      lowIn: sums[c] ? sums[c].low.size : 0
    }));
  }

  function dots(value) {
    const v = Math.round(value);
    return `<span class="dots" aria-label="${value.toFixed(1)} of 5">${[1, 2, 3, 4, 5].map((i) => `<i class="${i <= v ? 'on' : ''}"></i>`).join('')}</span>`;
  }

  // ------------------------------------------------------------------ Layout
  function renderLayout() {
    root.innerHTML = `
      <section class="section" id="feedback-overview">
        <div class="grid grid-3 fb-stats" data-slot="stats"></div>
        <div class="fb-overview-grid">
          <div class="card card-pad" data-slot="competencies"></div>
          <div class="card card-pad focus-card" data-slot="focus"></div>
        </div>
      </section>

      <section class="section" id="grades">
        <div class="section-header">
          <div><h2>Grades &amp; Feedback</h2><p class="subline">Your academic grades – complemented by structured feedback on your professional competencies.</p></div>
        </div>
        <div class="card grades-card" data-slot="grades"></div>
      </section>

      <section class="section" id="improvement-plan">
        <div class="section-header">
          <div><h2>Improvement Plan</h2><p class="subline">Turn single recommendations into concrete actions – and review your progress.</p></div>
        </div>
        <div data-slot="plan"></div>
      </section>`;
  }

  // ------------------------------------------------------------------ Overview
  function renderStats() {
    const graded = state.activities.filter((a) => typeof a.grade === 'number');
    const avg = graded.reduce((s, a) => s + a.grade, 0) / graded.length;
    const fb = allFeedback();
    const byType = (t) => fb.filter((f) => f.giver.type === t).length;
    const active = state.actions.filter((a) => a.status !== 'completed').length;
    const done = state.actions.length - active;
    const unread = state.activities.filter((a) => a.isNew).length;

    root.querySelector('[data-slot="stats"]').innerHTML = `
      <div class="card card-pad stat-card">
        <span class="icon-circle">${HS.icon('award')}</span>
        <div><span class="label">Average grade</span><strong>${avg.toFixed(1)}</strong><small>${graded.length} graded activities</small></div>
      </div>
      <div class="card card-pad stat-card">
        <span class="icon-circle is-blue">${HS.icon('message-square')}</span>
        <div><span class="label">Feedback received</span><strong>${fb.length}${unread ? ` <span class="badge badge-orange">${unread} new</span>` : ''}</strong><small>${byType('lecturer')} from lecturers · ${byType('peer')} from peers · ${byType('mentor')} from industry mentors</small></div>
      </div>
      <div class="card card-pad stat-card">
        <span class="icon-circle is-orange">${HS.icon('target')}</span>
        <div><span class="label">Improvement actions</span><strong>${active} active</strong><small>${done} completed</small></div>
      </div>`;
  }

  function renderCompetencies() {
    const comps = competencyAverages().filter((c) => c.avg != null);
    const sorted = [...comps].sort((a, b) => b.avg - a.avg);
    const strengths = sorted.slice(0, 2).map((c) => c.name);
    const growth = sorted[sorted.length - 1].name;

    root.querySelector('[data-slot="competencies"]').innerHTML = `
      <div class="comp-head">
        <div><h3>Competency Profile</h3><p class="subline">Average rating from all feedback (1 – 5)</p></div>
        <div class="comp-legend"><span class="badge badge-green">Strength</span><span class="badge badge-orange">Growth area</span></div>
      </div>
      <div class="comp-list">
        ${comps.map((c) => {
          const tag = strengths.includes(c.name) ? 'is-strength' : c.name === growth ? 'is-growth' : '';
          return `
            <div class="comp-row ${tag}">
              <span class="comp-name">${c.name}</span>
              <div class="comp-bar"><div style="width:${(c.avg / 5) * 100}%"></div></div>
              <span class="comp-val">${c.avg.toFixed(1)}</span>
              <span class="comp-n">${c.n} ratings</span>
            </div>`;
        }).join('')}
      </div>`;

    const g = comps.find((c) => c.name === growth);
    const s = comps.find((c) => c.name === strengths[0]);
    const suggested = HS.learning && HS.learning.course('b2');
    root.querySelector('[data-slot="focus"]').innerHTML = `
      <span class="kicker">Your focus</span>
      <h3>Keep building on your strengths</h3>
      <div class="focus-item is-strength">
        ${HS.icon('trending-up')}
        <div><span class="label">Strongest competency</span><strong>${s.name} · ${s.avg.toFixed(1)} / 5</strong><small>Consistently highlighted by lecturers, peers and mentors.</small></div>
      </div>
      <div class="focus-item is-growth">
        ${HS.icon('target')}
        <div><span class="label">Biggest growth area</span><strong>${g.name} · ${g.avg.toFixed(1)} / 5</strong><small>Mentioned as an area for improvement in ${g.lowIn} activities – and already improving.</small></div>
      </div>
      ${suggested ? `
        <button class="focus-course" type="button" data-open-course="b2">
          <span class="li-thumb thumb-6">${HS.icon('mic')}</span>
          <span><span class="label">Suggested in Learning</span><strong>${suggested.title}</strong></span>
          ${HS.icon('chevron-right')}
        </button>` : ''}`;
  }

  // ------------------------------------------------------------------ Grades list
  function renderGrades() {
    const rows = [...state.activities].sort((a, b) => b.date.localeCompare(a.date)).map((a) => {
      const m = HS.find.module(a.moduleId);
      const gradeText = a.pending ? 'Pending' : a.grade != null ? a.grade.toFixed(1) : a.gradeLabel;
      let action;
      if (a.pending) action = `<span class="fb-pending">${HS.icon('clock')}Feedback after ${HS.fmt.date(a.date)}</span>`;
      else if (a.noFeedback) action = '<span class="fb-pending">Grade only</span>';
      else action = `<button class="btn btn-secondary btn-sm" type="button" data-view-feedback="${a.id}">${HS.icon('message-square')}View Feedback${a.isNew ? '<span class="new-dot">New</span>' : ''}</button>`;
      return `
        <div class="grade-row ${a.isNew ? 'is-new' : ''}">
          <span class="type-icon type-${a.type.toLowerCase()}">${HS.icon(TYPE_ICON[a.type])}</span>
          <div class="gr-main">
            <strong>${a.title}</strong>
            <small>${m.code} · ${m.title} · ${HS.fmt.date(a.date)}</small>
          </div>
          <span class="badge badge-gray gr-type">${a.type}</span>
          <div class="gr-grade">
            <span class="grade-pill ${a.pending ? 'g-neutral' : gradeClass(a.grade)}" title="Grade">${gradeText}</span>
            ${action}
          </div>
        </div>`;
    }).join('');
    root.querySelector('[data-slot="grades"]').innerHTML = `
      <div class="grade-row grade-head"><span></span><span>Activity</span><span>Type</span><span>Grade &amp; feedback</span></div>
      ${rows}`;
  }

  // ------------------------------------------------------------------ Feedback detail (side panel)
  function feedbackCard(f) {
    const p = person(f.giver);
    const t = GIVER_TYPE[f.giver.type];
    const existing = actionFor(f.id);
    const course = f.courseId && HS.learning ? HS.learning.course(f.courseId) : null;
    return `
      <article class="fb-card" data-giver-type="${f.giver.type}">
        <header class="fb-card-head">
          <span class="avatar giver-${f.giver.type}">${p.initials}</span>
          <div><strong>${p.name}</strong><small>${p.sub}</small></div>
          <span class="badge ${t.badge}">${t.label}</span>
        </header>
        <div class="fb-ratings">
          ${Object.entries(f.ratings).map(([c, v]) => `<span class="rating-chip">${c}${dots(v)}</span>`).join('')}
        </div>
        <div class="fb-block is-well">
          <span class="fb-label">${HS.icon('check-circle')}What you did well</span>
          <p>${f.wellDone}</p>
        </div>
        <div class="fb-block is-improve">
          <span class="fb-label">${HS.icon('trending-up')}What could be improved</span>
          <p>${f.improve}</p>
          <blockquote><span>Example</span>${f.example}</blockquote>
        </div>
        <div class="fb-block is-rec">
          <span class="fb-label">${HS.icon('target')}Recommendation for your next activity</span>
          <p>${f.recommendation}</p>
          <div class="fb-rec-actions">
            ${existing
              ? `<button class="btn btn-ghost btn-sm" type="button" data-goto-plan>${HS.icon('check')}Action created · view in plan</button>`
              : `<button class="btn btn-primary btn-sm" type="button" data-create-action="${f.id}">${HS.icon('plus')}Create improvement action</button>`}
            ${course ? `<button class="btn btn-ghost btn-sm" type="button" data-open-course="${course.id}">${HS.icon('book-open')}Suggested course: ${course.title}</button>` : ''}
          </div>
        </div>
      </article>`;
  }

  function feedbackView(activityId) {
    const a = activity(activityId);
    const m = HS.find.module(a.moduleId);
    const types = [...new Set(a.feedback.map((f) => f.giver.type))];
    const comps = {};
    a.feedback.forEach((f) => Object.entries(f.ratings).forEach(([c, v]) => { (comps[c] = comps[c] || []).push(v); }));

    return {
      title: 'Feedback',
      wide: true,
      html: `
        <div class="fb-hero">
          <div>
            <span class="ev-label">${a.type} · ${m.code} · ${HS.fmt.date(a.date)}</span>
            <h3>${a.title}</h3>
            <p>${m.title} · ${HS.find.lecturer(m.lecturerId).name}</p>
          </div>
          <div class="fb-grade"><span>Grade</span><strong>${a.grade != null ? a.grade.toFixed(1) : a.gradeLabel}</strong></div>
        </div>
        ${a.projectId ? `<button class="linked-project" type="button" data-open-project="${a.projectId}">
            <span class="org-logo">${initials(HS.find.partner(HS.find.project(a.projectId).partnerId).name)}</span>
            <span class="lp-text"><strong>${HS.find.project(a.projectId).title}</strong><small>Related project · ${HS.find.partner(HS.find.project(a.projectId).partnerId).name}</small></span>
            ${HS.icon('chevron-right')}
          </button>` : ''}

        <div class="fb-two">
          <div>
            <h4 class="dr-h">Evaluation criteria</h4>
            <table class="criteria-table">
              <thead><tr><th>Criterion</th><th>Weight</th><th>Result</th></tr></thead>
              <tbody>${a.criteria.map((c) => `<tr><td>${c.name}</td><td>${c.weight}</td><td><strong>${c.score}</strong></td></tr>`).join('')}</tbody>
            </table>
          </div>
          <div>
            <h4 class="dr-h">Professional competencies</h4>
            <ul class="comp-mini">
              ${Object.entries(comps).map(([c, vals]) => {
                const avg = vals.reduce((s, v) => s + v, 0) / vals.length;
                return `<li><span>${c}</span>${dots(avg)}<strong>${avg.toFixed(1)}</strong></li>`;
              }).join('')}
            </ul>
          </div>
        </div>

        <div class="fb-two">
          <div class="sw-box is-strength">
            <h4>${HS.icon('check-circle')}Strengths</h4>
            <ul>${a.strengths.map((s) => `<li>${s}</li>`).join('')}</ul>
          </div>
          <div class="sw-box is-growth">
            <h4>${HS.icon('trending-up')}Areas for improvement</h4>
            <ul>${a.improvements.map((s) => `<li>${s}</li>`).join('')}</ul>
          </div>
        </div>

        <div class="fb-list-head">
          <h4 class="dr-h">Detailed feedback · ${a.feedback.length}</h4>
          ${types.length > 1 ? `
            <div class="chip-row" role="group" aria-label="Filter feedback by giver">
              <button class="chip" type="button" data-giver="all" aria-pressed="true">All</button>
              ${types.map((t) => `<button class="chip" type="button" data-giver="${t}" aria-pressed="false">${GIVER_TYPE[t].label}</button>`).join('')}
            </div>` : ''}
        </div>
        <div class="fb-list">${a.feedback.map(feedbackCard).join('')}</div>`,
      onMount: (body) => {
        body.addEventListener('click', (e) => {
          const chip = e.target.closest('[data-giver]');
          if (chip) {
            const t = chip.dataset.giver;
            body.querySelectorAll('[data-giver]').forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
            body.querySelectorAll('.fb-card').forEach((c) => { c.hidden = t !== 'all' && c.dataset.giverType !== t; });
          }
          const create = e.target.closest('[data-create-action]');
          if (create) openCreateAction(create.dataset.createAction);
          if (e.target.closest('[data-goto-plan]')) {
            HS.ui.closeDrawer();
            HS.navigate('#improvement-plan');
          }
          const course = e.target.closest('[data-open-course]');
          if (course) {
            HS.ui.closeDrawer();
            HS.navigate('#learning');
            HS.learning.openCourse(course.dataset.openCourse);
          }
          const prj = e.target.closest('[data-open-project]');
          if (prj) HS.ui.pushDrawer(HS.calendar.projectView(prj.dataset.openProject));
        });
      }
    };
  }

  function openFeedback(activityId, push = false) {
    const a = activity(activityId);
    if (a.isNew) {
      a.isNew = false;
      renderGrades();
      renderStats();
    }
    if (push) HS.ui.pushDrawer(feedbackView(activityId));
    else HS.ui.openDrawer(feedbackView(activityId));
  }

  // ------------------------------------------------------------------ Improvement actions
  function supportOptions(selected) {
    const opt = (type, id, label) => `<option value="${type}:${id}" ${selected === `${type}:${id}` ? 'selected' : ''}>${label}</option>`;
    const mentors = HS.data.calendar.projects;
    return `
      <option value="">No support person</option>
      <optgroup label="Lecturers">${HS.data.modules.map((m) => opt('lecturer', m.lecturerId, HS.find.lecturer(m.lecturerId).name)).join('')}</optgroup>
      <optgroup label="Peers">${HS.data.calendar.peers.map((p) => opt('peer', p.id, p.name)).join('')}</optgroup>
      <optgroup label="Industry mentors">${mentors.map((p) => opt('mentor', p.id, person({ type: 'mentor', id: p.id }).name)).join('')}</optgroup>`;
  }

  function openCreateAction(feedbackId) {
    const f = feedbackById(feedbackId);
    const giver = person(f.giver);
    const followUps = HS.calendar ? HS.calendar.upcoming(8) : [];
    let modalEl;

    HS.ui.openModal({
      title: 'Create improvement action',
      subline: 'Turn this recommendation into one concrete action.',
      body: `
        <div class="rec-quote">
          <span class="label">Recommendation from ${giver.name}</span>
          <p>“${f.recommendation}”</p>
          <small>${f.activity.title}</small>
        </div>
        <div class="form-stack">
          <div class="field">
            <label for="ia-goal">Improvement goal *</label>
            <input class="input" id="ia-goal" placeholder="What do you want to improve?" autocomplete="off">
            <div class="chip-row goal-suggestions">
              ${f.activity.improvements.map((s) => `<button class="chip chip-sm" type="button" data-suggest="${esc(s)}">${s}</button>`).join('')}
            </div>
          </div>
          <div class="field">
            <label for="ia-step">Concrete next step *</label>
            <textarea class="textarea" id="ia-step">${f.recommendation}</textarea>
            <span class="hint">Make it small and specific – something you can do before the follow-up.</span>
          </div>
          <div class="field">
            <label for="ia-support">Support person <span class="optional">(optional)</span></label>
            <select class="select" id="ia-support">${supportOptions(`${f.giver.type}:${f.giver.id}`)}</select>
          </div>
          <div class="field">
            <label for="ia-follow">Follow-up opportunity to review progress *</label>
            <select class="select" id="ia-follow">
              ${followUps.map((u, i) => `<option value="${i}">${HS.fmt.date(u.date)} · ${esc(u.label)}</option>`).join('')}
              <option value="custom">Choose another date…</option>
            </select>
            <input class="input" type="date" id="ia-follow-date" min="${HS.data.today}" value="${HS.data.today}" hidden>
            <span class="hint">Picked from your calendar – the next session or project where you can apply it.</span>
          </div>
        </div>`,
      actions: [
        { label: 'Cancel', variant: 'ghost' },
        {
          label: `${HS.icon('check')}Save action`,
          variant: 'primary',
          keepOpen: true,
          onClick: (close) => {
            const goal = modalEl.querySelector('#ia-goal').value.trim();
            const step = modalEl.querySelector('#ia-step').value.trim();
            if (!goal || !step) {
              modalEl.querySelector(goal ? '#ia-step' : '#ia-goal').classList.add('is-invalid');
              HS.ui.toast('Please add a goal and a concrete next step', 'alert');
              return;
            }
            const supportVal = modalEl.querySelector('#ia-support').value;
            const followVal = modalEl.querySelector('#ia-follow').value;
            const followUp = followVal === 'custom'
              ? { date: modalEl.querySelector('#ia-follow-date').value || HS.data.today, label: 'Personal review date' }
              : followUps[Number(followVal)];
            state.actions.unshift({
              id: `ia-${Date.now()}`,
              feedbackId,
              createdAt: HS.data.today,
              status: 'planned',
              goal,
              nextStep: step,
              support: supportVal ? { type: supportVal.split(':')[0], id: supportVal.split(':')[1] } : null,
              followUp,
              reviews: []
            });
            close();
            HS.ui.toast('Improvement action added to your plan');
            renderPlan();
            renderStats();
            HS.ui.openDrawer(feedbackView(f.activity.id));
          }
        }
      ],
      onMount: (modal) => {
        modalEl = modal;
        modal.addEventListener('click', (e) => {
          const s = e.target.closest('[data-suggest]');
          if (s) {
            modal.querySelector('#ia-goal').value = s.dataset.suggest;
            modal.querySelector('#ia-goal').classList.remove('is-invalid');
          }
        });
        modal.querySelector('#ia-follow').addEventListener('change', (e) => {
          modal.querySelector('#ia-follow-date').hidden = e.target.value !== 'custom';
        });
        modal.querySelector('#ia-goal').focus();
      }
    });
  }

  function followUpText(a) {
    const d = daysUntil(a.followUp.date);
    if (a.status === 'completed') return 'Reviewed';
    if (d > 0) return `in ${d} day${d > 1 ? 's' : ''}`;
    if (d === 0) return 'today';
    return 'review due';
  }

  function renderPlan() {
    const order = { 'in-progress': 0, planned: 1, completed: 2 };
    const list = [...state.actions].sort((a, b) => order[a.status] - order[b.status]);
    const cards = list.map((a) => {
      const f = feedbackById(a.feedbackId);
      const st = STATUS[a.status];
      const sp = a.support && person(a.support);
      const due = a.status !== 'completed' && daysUntil(a.followUp.date) <= 0;
      return `
        <article class="card action-card is-${a.status}">
          <div class="ac-top">
            <span class="badge ${st.badge}">${st.label}</span>
            <small>Created ${HS.fmt.date(a.createdAt)}</small>
          </div>
          <h4>${esc(a.goal)}</h4>
          <button class="ac-source" type="button" data-view-feedback="${f.activity.id}">
            ${HS.icon('message-square')}
            <span>From feedback by <strong>${person(f.giver).name}</strong> · ${f.activity.title}</span>
          </button>
          <dl class="ac-facts">
            <div><dt>${HS.icon('arrow-right')}Next step</dt><dd>${esc(a.nextStep)}</dd></div>
            <div><dt>${HS.icon('users')}Support person</dt><dd>${sp ? `<span class="avatar avatar-sm">${sp.initials}</span>${sp.name}` : '<span class="muted">No support person</span>'}</dd></div>
            <div class="${due ? 'is-due' : ''}"><dt>${HS.icon('calendar')}Follow-up</dt><dd>${HS.fmt.date(a.followUp.date)} · ${esc(a.followUp.label)} <span class="badge ${due ? 'badge-orange' : 'badge-gray'}">${followUpText(a)}</span></dd></div>
          </dl>
          ${a.reviews.length ? `
            <div class="ac-reviews">
              ${a.reviews.map((r) => `<p><span class="badge ${r.result === 'Achieved' ? 'badge-green' : 'badge-orange'}">${r.result}</span>${HS.fmt.date(r.date)}${r.note ? ` – ${esc(r.note)}` : ''}</p>`).join('')}
            </div>` : ''}
          <div class="ac-actions">
            ${a.status === 'planned' ? `<button class="btn btn-secondary btn-sm" type="button" data-start="${a.id}">${HS.icon('play')}Start</button>` : ''}
            ${a.status !== 'completed' ? `<button class="btn btn-primary btn-sm" type="button" data-review="${a.id}">${HS.icon('check-circle')}Review progress</button>` : ''}
            <button class="btn btn-ghost btn-sm" type="button" data-delete="${a.id}">Remove</button>
          </div>
        </article>`;
    }).join('');

    root.querySelector('[data-slot="plan"]').innerHTML = `
      <div class="plan-steps">
        <div><span>1</span><strong>Read your feedback</strong><small>Open “View Feedback” next to a grade.</small></div>
        <div><span>2</span><strong>Pick one recommendation</strong><small>Create an action with a goal and a next step.</small></div>
        <div><span>3</span><strong>Review at the follow-up</strong><small>Check your progress at the next session or project.</small></div>
      </div>
      ${cards ? `<div class="grid grid-2 action-grid">${cards}</div>` : `<div class="note">${HS.icon('info')}No actions yet – open a feedback and select a recommendation.</div>`}`;
  }

  function openReview(id) {
    const a = state.actions.find((x) => x.id === id);
    let modalEl;
    HS.ui.openModal({
      title: 'Review progress',
      subline: a.goal,
      body: `
        <p class="card-meta review-step"><strong>Next step:</strong> ${esc(a.nextStep)}</p>
        <div class="field">
          <label>How did it go?</label>
          <div class="review-options">
            ${['Achieved', 'Partly achieved', 'Not yet'].map((r, i) => `
              <label class="review-option"><input type="radio" name="review" value="${r}" ${i === 0 ? 'checked' : ''}><span>${r}</span></label>`).join('')}
          </div>
        </div>
        <div class="field">
          <label for="review-note">What did you observe? <span class="optional">(optional)</span></label>
          <textarea class="textarea" id="review-note" placeholder="e.g. I proposed a time-box twice and we decided faster."></textarea>
        </div>`,
      actions: [
        { label: 'Cancel', variant: 'ghost' },
        {
          label: 'Save review',
          variant: 'primary',
          onClick: () => {
            const result = modalEl.querySelector('input[name="review"]:checked').value;
            a.reviews.push({ date: HS.data.today, result, note: modalEl.querySelector('#review-note').value.trim() });
            a.status = result === 'Achieved' ? 'completed' : 'in-progress';
            HS.ui.toast(result === 'Achieved' ? 'Great progress – action completed' : 'Review saved – keep going', result === 'Achieved' ? 'award' : 'check-circle');
            renderPlan();
            renderStats();
          }
        }
      ],
      onMount: (modal) => { modalEl = modal; }
    });
  }

  function confirmDelete(id) {
    const a = state.actions.find((x) => x.id === id);
    HS.ui.openModal({
      title: 'Remove action?',
      subline: a.goal,
      body: '<p>The action and its reviews will be removed from your improvement plan. The feedback itself stays available.</p>',
      actions: [
        { label: 'Cancel', variant: 'ghost' },
        {
          label: 'Remove action',
          variant: 'primary',
          onClick: () => {
            state.actions = state.actions.filter((x) => x.id !== id);
            HS.ui.toast('Action removed', 'info');
            renderPlan();
            renderStats();
          }
        }
      ]
    });
  }

  // ------------------------------------------------------------------ Cross-link: feedback in Function 2 project details
  HS.projectExtras = (project, el) => {
    const a = state.activities.find((x) => x.projectId === project.id);
    if (!a) return;
    if (a.pending) {
      el.innerHTML = `<div class="note dr-extra">${HS.icon('clock')}Structured feedback for this project will be available after the final presentation on ${HS.fmt.date(a.date)}.</div>`;
      return;
    }
    el.innerHTML = `
      <button class="btn btn-primary btn-block dr-extra" type="button">${HS.icon('message-square')}View feedback for this project</button>`;
    el.querySelector('button').addEventListener('click', () => openFeedback(a.id, true));
  };

  HS.feedback = { open: (id) => openFeedback(id) };

  // ------------------------------------------------------------------ Init
  HS.modules.feedback = {
    init(el) {
      root = el;
      renderLayout();
      renderStats();
      renderCompetencies();
      renderGrades();
      renderPlan();
      root.addEventListener('click', (e) => {
        const view = e.target.closest('[data-view-feedback]');
        if (view) return openFeedback(view.dataset.viewFeedback);
        const start = e.target.closest('[data-start]');
        if (start) {
          state.actions.find((x) => x.id === start.dataset.start).status = 'in-progress';
          HS.ui.toast('Action started – good luck!');
          renderPlan();
          return renderStats();
        }
        const review = e.target.closest('[data-review]');
        if (review) return openReview(review.dataset.review);
        const del = e.target.closest('[data-delete]');
        if (del) return confirmDelete(del.dataset.delete);
        const course = e.target.closest('[data-open-course]');
        if (course) {
          HS.navigate('#learning');
          HS.learning.openCourse(course.dataset.openCourse);
        }
        return undefined;
      });
    }
  };
})();
