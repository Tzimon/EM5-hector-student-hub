/*
 * Function 2 – Projects & Calendar (spec: function2_projects.md).
 * Month calendar with course sessions and project periods, filters, course/project
 * details in the side panel (with Back when navigating course → project) and a project overview.
 */
(function () {
  const C = HS.data.calendar;
  const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const TYPE_LABEL = { session: 'Course session', project: 'Project period' };

  const pad = (n) => String(n).padStart(2, '0');
  const toISO = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
  const isWeekend = (d) => d.getDay() === 0 || d.getDay() === 6;
  const initials = (name) => name.split(' ').map((w) => w[0]).join('').slice(0, 2);
  const shortDate = (iso) => HS.parseDate(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  const range = (a, b) => `${shortDate(a)} – ${HS.fmt.date(b)}`;

  const state = {
    month: new Date(HS.today().getFullYear(), HS.today().getMonth(), 1),
    course: 'all',
    types: { session: true, project: true }
  };
  let root;

  // ------------------------------------------------------------------ Events (derived from modules + projects)
  const events = [];
  HS.data.modules.forEach((m) => {
    const prj = HS.find.projectOfModule(m.id);
    const topics = C.courses[m.id].topics;
    let n = 0;
    for (let d = HS.parseDate(m.start); d <= HS.parseDate(m.end); d = addDays(d, 1)) {
      const iso = toISO(d);
      if (isWeekend(d) || (iso >= prj.start && iso <= prj.end)) continue;
      events.push({ id: `${m.id}-s${n + 1}`, type: 'session', moduleId: m.id, date: iso, n: n + 1, topic: topics[n] || 'Exam preparation & Q&A' });
      n += 1;
    }
    events.push({ id: prj.id, type: 'project', moduleId: m.id, projectId: prj.id, start: prj.start, end: prj.end });
  });
  const sessionsOf = (moduleId) => events.filter((e) => e.type === 'session' && e.moduleId === moduleId);

  function visible(e) {
    return state.types[e.type] && (state.course === 'all' || state.course === e.moduleId);
  }
  function eventsOn(iso) {
    return events.filter((e) => visible(e) && (e.type === 'session' ? e.date === iso : iso >= e.start && iso <= e.end));
  }

  function projectStatus(p) {
    if (HS.data.today < p.start) return { key: 'upcoming', label: 'Upcoming', badge: 'badge-orange' };
    if (HS.data.today > p.end) return { key: 'completed', label: 'Completed', badge: 'badge-gray' };
    return { key: 'ongoing', label: 'Ongoing', badge: 'badge-green' };
  }
  function weekdaysBetween(a, b) {
    let n = 0;
    for (let d = HS.parseDate(a); d <= HS.parseDate(b); d = addDays(d, 1)) if (!isWeekend(d)) n += 1;
    return n;
  }
  const studentMember = (p) => p.team.members.find((m) => m.id === HS.data.student.id);

  // ------------------------------------------------------------------ Layout
  function renderLayout() {
    const options = ['Engineering', 'Management'].map((track) => `
      <optgroup label="${track} modules">
        ${HS.data.modules.filter((m) => m.track === track).map((m) => `<option value="${m.id}">${m.code} · ${m.title}</option>`).join('')}
      </optgroup>`).join('');

    root.innerHTML = `
      <nav class="subnav" aria-label="Projects and Calendar sections">
        <a href="#calendar">${HS.icon('calendar')}Calendar</a>
        <a href="#project-overview">${HS.icon('briefcase')}Project Overview</a>
      </nav>

      <div class="cal-layout">
        <div class="card cal-card" id="calendar">
          <div class="cal-toolbar">
            <div class="cal-nav">
              <button class="icon-btn" type="button" data-month="-1" aria-label="Previous month">${HS.icon('chevron-left')}</button>
              <h2 data-slot="month-label" aria-live="polite"></h2>
              <button class="icon-btn" type="button" data-month="1" aria-label="Next month">${HS.icon('chevron-right')}</button>
              <button class="btn btn-secondary btn-sm" type="button" data-today>Today</button>
            </div>
            <div class="cal-filters">
              <label class="cal-select">
                <span class="sr-only">Filter by course</span>
                ${HS.icon('filter')}
                <select class="select" id="cal-course"><option value="all">All courses</option>${options}</select>
              </label>
              <div class="chip-row" role="group" aria-label="Filter by event type">
                <button class="type-chip is-session" type="button" data-type="session" aria-pressed="true"><span class="type-dot"></span>Course sessions</button>
                <button class="type-chip is-project" type="button" data-type="project" aria-pressed="true"><span class="type-dot"></span>Project periods</button>
              </div>
            </div>
          </div>
          <div class="cal-head">${WEEKDAYS.map((d) => `<span>${d}</span>`).join('')}</div>
          <div class="cal-grid" data-slot="grid"></div>
          <div data-slot="cal-empty"></div>
        </div>
        <aside class="cal-side">
          <div class="card card-pad" data-slot="current"></div>
          <div class="card card-pad">
            <h3 class="side-title">Upcoming</h3>
            <p class="side-sub">Next entries from today</p>
            <div data-slot="upcoming"></div>
          </div>
        </aside>
      </div>

      <section class="section" id="project-overview">
        <div class="section-header">
          <div><h2>Project Overview</h2><p class="subline">All company and NGO projects of your master – one per module.</p></div>
          <div class="overview-legend">
            <span class="badge badge-green">Ongoing</span><span class="badge badge-orange">Upcoming</span><span class="badge badge-gray">Completed</span>
          </div>
        </div>
        <div class="grid grid-3" data-slot="projects"></div>
      </section>`;
  }

  // ------------------------------------------------------------------ Calendar grid
  function renderGrid() {
    const first = state.month;
    root.querySelector('[data-slot="month-label"]').textContent = first.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });

    const offset = (first.getDay() + 6) % 7; // Monday-based
    const start = addDays(first, -offset);
    const lastOfMonth = new Date(first.getFullYear(), first.getMonth() + 1, 0);
    const weeks = Math.ceil((offset + lastOfMonth.getDate()) / 7);
    let visibleCount = 0;

    const cells = [];
    for (let i = 0; i < weeks * 7; i += 1) {
      const d = addDays(start, i);
      const iso = toISO(d);
      const inMonth = d.getMonth() === first.getMonth();
      const dayEvents = inMonth ? eventsOn(iso) : [];
      visibleCount += dayEvents.length;
      const col = i % 7;

      const chips = dayEvents.map((e) => {
        const m = HS.find.module(e.moduleId);
        if (e.type === 'session') {
          return `
            <button class="ev ev-session" type="button" data-event="${e.id}" title="Course session · ${m.code} · Session ${e.n}: ${e.topic}">
              <span class="ev-label">Course</span>
              <span class="ev-sub">${m.code} · S${e.n}</span>
              <span class="ev-text">${e.topic}</span>
            </button>`;
        }
        const p = HS.find.project(e.projectId);
        const org = HS.find.partner(p.partnerId).name;
        const startSeg = iso === e.start || col === 0 || d.getDate() === 1;
        const endSeg = iso === e.end || col === 6;
        return `
          <button class="ev ev-project ${startSeg ? 'is-start' : ''} ${endSeg ? 'is-end' : ''}" type="button" data-event="${e.id}" title="Project period · ${org}: ${p.title}">
            <span class="ev-label">Project</span>
            <span class="ev-sub">${org}</span>
            <span class="ev-text">${startSeg ? p.title : `Day ${weekdaysBetween(e.start, iso)} of ${weekdaysBetween(e.start, e.end)}`}</span>
          </button>`;
      }).join('');

      cells.push(`
        <div class="cal-day ${inMonth ? '' : 'is-out'} ${isWeekend(d) ? 'is-weekend' : ''} ${iso === HS.data.today ? 'is-today' : ''}">
          <span class="cal-date">${d.getDate()}${iso === HS.data.today ? '<em>Today</em>' : ''}</span>
          ${chips}
        </div>`);
    }
    root.querySelector('[data-slot="grid"]').innerHTML = cells.join('');
    root.querySelector('[data-slot="cal-empty"]').innerHTML = visibleCount ? '' : `
      <div class="note cal-note">${HS.icon('info')}No entries in this month for the selected filters.</div>`;
  }

  // ------------------------------------------------------------------ Side panel cards
  function renderCurrent() {
    const today = HS.data.today;
    const m = HS.data.modules.find((x) => today >= x.start && today <= x.end);
    const slot = root.querySelector('[data-slot="current"]');
    if (!m) {
      slot.innerHTML = '<h3 class="side-title">No module running today</h3>';
      return;
    }
    const total = weekdaysBetween(m.start, m.end);
    const done = weekdaysBetween(m.start, today);
    const todaySession = events.find((e) => e.type === 'session' && e.date === today);
    const p = HS.find.projectOfModule(m.id);
    const daysToProject = Math.round((HS.parseDate(p.start) - HS.today()) / 86400000);
    slot.innerHTML = `
      <span class="kicker">Current module</span>
      <h3 class="side-title">${m.title}</h3>
      <p class="side-sub">${m.code} · ${HS.find.lecturer(m.lecturerId).name}</p>
      <div class="progress"><div class="progress-bar" style="width:${(done / total) * 100}%"></div></div>
      <p class="side-meta">Day ${done} of ${total} · ${range(m.start, m.end)}</p>
      ${todaySession ? `
        <button class="side-event ev-session" type="button" data-event="${todaySession.id}">
          <span class="ev-label">Today · ${C.sessionTime}</span>
          <strong>Session ${todaySession.n}: ${todaySession.topic}</strong>
        </button>` : ''}
      ${daysToProject > 0 ? `
        <button class="side-event ev-project" type="button" data-event="${p.id}">
          <span class="ev-label">Project starts in ${daysToProject} days · ${HS.find.partner(p.partnerId).name}</span>
          <strong>${p.title}</strong>
        </button>` : ''}`;
  }

  function renderUpcoming() {
    const today = HS.data.today;
    const upcoming = events
      .filter((e) => visible(e) && (e.type === 'session' ? e.date >= today : e.end >= today))
      .map((e) => ({ e, sortDate: e.type === 'session' ? e.date : (e.start < today ? today : e.start) }))
      .sort((a, b) => a.sortDate.localeCompare(b.sortDate) || (a.e.type === 'project' ? -1 : 1))
      .slice(0, 6);
    root.querySelector('[data-slot="upcoming"]').innerHTML = upcoming.length ? `
      <ul class="upcoming-list">
        ${upcoming.map(({ e }) => {
          const m = HS.find.module(e.moduleId);
          const isSession = e.type === 'session';
          const p = !isSession && HS.find.project(e.projectId);
          const date = HS.parseDate(isSession ? e.date : e.start);
          return `
            <li>
              <button type="button" data-event="${e.id}" class="upcoming-item ${isSession ? 'is-session' : 'is-project'}">
                <span class="up-date"><strong>${date.getDate()}</strong>${date.toLocaleDateString('en-GB', { month: 'short' })}</span>
                <span class="up-text">
                  <span class="ev-label">${TYPE_LABEL[e.type]}${isSession ? ` · ${m.code}` : ` · ${HS.find.partner(p.partnerId).name}`}</span>
                  <strong>${isSession ? `Session ${e.n}: ${e.topic}` : p.title}</strong>
                  <small>${isSession ? C.sessionTime : range(e.start, e.end)}</small>
                </span>
              </button>
            </li>`;
        }).join('')}
      </ul>` : '<p class="side-sub">No upcoming entries for the selected filters.</p>';
  }

  // ------------------------------------------------------------------ Project overview
  function renderProjects() {
    root.querySelector('[data-slot="projects"]').innerHTML = C.projects.map((p) => {
      const org = HS.find.partner(p.partnerId);
      const m = HS.find.module(p.moduleId);
      const st = projectStatus(p);
      return `
        <article class="card card-hover project-card is-${st.key}" role="button" tabindex="0" data-project="${p.id}" aria-label="${HS.fmt.escape(p.title)}">
          <div class="pc-top">
            <span class="org-logo">${initials(org.name)}</span>
            <div><strong>${org.name}</strong><span class="badge ${org.type === 'NGO' ? 'badge-purple' : 'badge-blue'}">${org.type}</span></div>
            <span class="badge ${st.badge}">${st.label}</span>
          </div>
          <h4>${p.title}</h4>
          <p class="card-meta">${m.code} · ${m.title}</p>
          <div class="pc-foot">
            <span>${HS.icon('calendar')}${range(p.start, p.end)}</span>
            <span>${HS.icon('target')}${studentMember(p).role}</span>
          </div>
        </article>`;
    }).join('');
  }

  // ------------------------------------------------------------------ Detail views (side panel)
  function courseView(moduleId, sessionId) {
    const m = HS.find.module(moduleId);
    const course = C.courses[moduleId];
    const lecturer = HS.find.lecturer(m.lecturerId);
    const sessions = sessionsOf(moduleId);
    const selected = sessions.find((s) => s.id === sessionId);
    const p = HS.find.projectOfModule(moduleId);
    const org = HS.find.partner(p.partnerId);

    // Schedule = sessions + the project period, in date order.
    const schedule = [
      ...sessions.map((s) => ({ date: s.date, html: `
        <li class="${s.id === sessionId ? 'is-selected' : ''} ${s.date < HS.data.today ? 'is-past' : ''}">
          <span class="sl-date">${HS.parseDate(s.date).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}</span>
          <span class="sl-text">Session ${s.n}: ${s.topic}</span>
        </li>` })),
      { date: p.start, html: `
        <li class="is-project-row">
          <span class="sl-date">${shortDate(p.start)} – ${shortDate(p.end)}</span>
          <span class="sl-text">Project period · ${org.name}</span>
        </li>` }
    ].sort((a, b) => a.date.localeCompare(b.date)).map((x) => x.html).join('');

    return {
      title: 'Course details',
      html: `
        <div class="dr-hero is-course">
          <span class="ev-label">Course · ${m.code} · ${m.track}</span>
          <h3>${m.title}</h3>
        </div>
        ${selected ? `
          <div class="dr-highlight is-session">
            ${HS.icon('calendar')}
            <div>
              <span class="ev-label">Selected session</span>
              <strong>Session ${selected.n}: ${selected.topic}</strong>
              <small>${HS.fmt.dateLong(selected.date)} · ${C.sessionTime}</small>
            </div>
          </div>` : ''}
        <dl class="dr-facts">
          <div><dt>Course</dt><dd>${m.title}</dd></div>
          <div><dt>Lecturer</dt><dd>${lecturer.name}</dd></div>
          <div><dt>Module period</dt><dd>${range(m.start, m.end)}</dd></div>
          <div><dt>Sessions</dt><dd>${sessions.length} sessions · ${C.sessionTime}</dd></div>
          <div class="span-2"><dt>Location</dt><dd>${C.location}</dd></div>
        </dl>
        <h4 class="dr-h">Description</h4>
        <p class="dr-p">${course.description}</p>
        <h4 class="dr-h">Schedule</h4>
        <ol class="session-list">${schedule}</ol>
        <h4 class="dr-h">Linked company projects</h4>
        <button class="linked-project" type="button" data-open-project="${p.id}">
          <span class="org-logo">${initials(org.name)}</span>
          <span class="lp-text">
            <strong>${p.title}</strong>
            <small>${org.name} · ${range(p.start, p.end)}</small>
          </span>
          ${HS.icon('chevron-right')}
        </button>`,
      onMount: (body) => {
        body.querySelector('[data-open-project]').addEventListener('click', (e) => {
          HS.ui.pushDrawer(projectView(e.currentTarget.dataset.openProject));
        });
      }
    };
  }

  function projectView(projectId) {
    const p = HS.find.project(projectId);
    const m = HS.find.module(p.moduleId);
    const org = HS.find.partner(p.partnerId);
    const st = projectStatus(p);
    const me = studentMember(p);

    const members = p.team.members.map((mem) => {
      const person = HS.find.person(mem.id);
      const isMe = mem.id === HS.data.student.id;
      return `
        <li class="${isMe ? 'is-me' : ''}">
          <span class="avatar avatar-sm">${initials(person.name)}</span>
          <span class="tm-text">
            <strong>${person.name}${isMe ? ' <span class="badge badge-green">You</span>' : ''}</strong>
            <small>${mem.role} · ${person.job}</small>
          </span>
        </li>`;
    }).join('');

    return {
      title: 'Project details',
      html: `
        <div class="dr-hero is-project">
          <div class="dr-hero-top">
            <span class="ev-label">Project period · ${org.name}</span>
            <span class="badge ${st.badge}">${st.label}</span>
          </div>
          <h3>${p.title}</h3>
          <p class="dr-assoc"><span class="org-logo">${initials(org.name)}</span>${org.name}<span class="badge ${org.type === 'NGO' ? 'badge-purple' : 'badge-blue'}">${org.type}</span><small>${org.industry}</small></p>
        </div>
        <div class="dr-highlight is-role">
          ${HS.icon('target')}
          <div><span class="ev-label">Your role</span><strong>${me.role}</strong><small>in team ${p.team.name}</small></div>
        </div>
        <dl class="dr-facts">
          <div><dt>Association</dt><dd>${org.name} (${org.type})</dd></div>
          <div><dt>Associated course</dt><dd><button class="link-btn" type="button" data-open-course="${m.id}">${m.code} · ${m.title}</button></dd></div>
          <div><dt>Lecturer</dt><dd>${HS.find.lecturer(m.lecturerId).name}</dd></div>
          <div><dt>Industry mentor</dt><dd>${p.mentor}</dd></div>
          <div><dt>Start date</dt><dd>${HS.fmt.dateWithDay(p.start)}</dd></div>
          <div><dt>End date</dt><dd>${HS.fmt.dateWithDay(p.end)}</dd></div>
        </dl>
        <h4 class="dr-h">Brief</h4>
        <p class="dr-p">${p.brief}</p>
        <h4 class="dr-h">Expected outcome</h4>
        <p class="dr-p">${p.outcome}</p>
        <h4 class="dr-h">Team “${p.team.name}” · ${p.team.members.length} members</h4>
        <ul class="team-list">${members}</ul>
        <div data-slot="project-extra"></div>`,
      onMount: (body) => {
        body.querySelector('[data-open-course]').addEventListener('click', (e) => {
          HS.ui.pushDrawer(courseView(e.currentTarget.dataset.openCourse));
        });
        if (HS.projectExtras) HS.projectExtras(p, body.querySelector('[data-slot="project-extra"]'));
      }
    };
  }

  function openEvent(id) {
    const e = events.find((x) => x.id === id);
    if (e.type === 'session') HS.ui.openDrawer(courseView(e.moduleId, e.id));
    else HS.ui.openDrawer(projectView(e.projectId));
  }

  // ------------------------------------------------------------------ Render + events
  function renderAll() {
    renderGrid();
    renderCurrent();
    renderUpcoming();
  }

  function onClick(e) {
    const ev = e.target.closest('[data-event]');
    if (ev) return openEvent(ev.dataset.event);
    const prj = e.target.closest('[data-project]');
    if (prj) return HS.ui.openDrawer(projectView(prj.dataset.project));
    const nav = e.target.closest('[data-month]');
    if (nav) {
      state.month = new Date(state.month.getFullYear(), state.month.getMonth() + Number(nav.dataset.month), 1);
      return renderGrid();
    }
    if (e.target.closest('[data-today]')) {
      state.month = new Date(HS.today().getFullYear(), HS.today().getMonth(), 1);
      return renderGrid();
    }
    const type = e.target.closest('[data-type]');
    if (type) {
      const t = type.dataset.type;
      state.types[t] = !state.types[t];
      type.setAttribute('aria-pressed', String(state.types[t]));
      renderAll();
    }
    return undefined;
  }

  // Public: open details from other functions (e.g. Feedback → project).
  HS.calendar = {
    openProject: (id) => HS.ui.openDrawer(projectView(id)),
    openCourse: (moduleId) => HS.ui.openDrawer(courseView(moduleId)),
    projectView,
    // Upcoming calendar entries from today (used as follow-up opportunities in Function 3).
    upcoming: (limit = 8) => events
      .filter((e) => (e.type === 'session' ? e.date : e.start) >= HS.data.today)
      .sort((a, b) => (a.type === 'session' ? a.date : a.start).localeCompare(b.type === 'session' ? b.date : b.start))
      .slice(0, limit)
      .map((e) => {
        const m = HS.find.module(e.moduleId);
        if (e.type === 'session') return { date: e.date, label: `${m.code} · Session ${e.n}: ${e.topic}` };
        const p = HS.find.project(e.projectId);
        return { date: e.start, label: `Project period · ${HS.find.partner(p.partnerId).name} (${m.code})` };
      })
  };

  HS.modules.projects = {
    init(el) {
      root = el;
      renderLayout();
      renderAll();
      renderProjects();
      root.addEventListener('click', onClick);
      root.addEventListener('keydown', (e) => {
        if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('.project-card')) {
          e.preventDefault();
          e.target.click();
        }
      });
      root.querySelector('#cal-course').addEventListener('change', (e) => {
        state.course = e.target.value;
        // Jump to the module's month if the current month has no entries for it.
        if (state.course !== 'all') {
          const m = HS.find.module(state.course);
          const monthStart = toISO(state.month);
          const monthEnd = toISO(new Date(state.month.getFullYear(), state.month.getMonth() + 1, 0));
          if (m.end < monthStart || m.start > monthEnd) {
            const s = HS.parseDate(m.start);
            state.month = new Date(s.getFullYear(), s.getMonth(), 1);
          }
        }
        renderAll();
      });
    }
  };
})();
