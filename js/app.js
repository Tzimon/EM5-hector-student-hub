/*
 * App shell: icons, formatting helpers, shared UI (modal, drawer, toast) and tab navigation.
 * Function scripts register themselves as HS.modules.<tab> = { init(rootEl) } and are
 * initialised the first time their tab is opened.
 */
(function () {
  const HS = window.HS;

  // ------------------------------------------------------------------ Icons (Lucide-style, inline SVG)
  const ICONS = {
    'book-open': '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
    'message-square': '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
    search: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
    check: '<polyline points="20 6 9 17 4 12"/>',
    'check-circle': '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
    x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    'arrow-left': '<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>',
    'arrow-right': '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
    'chevron-left': '<polyline points="15 18 9 12 15 6"/>',
    'chevron-right': '<polyline points="9 18 15 12 9 6"/>',
    'chevron-down': '<polyline points="6 9 12 15 18 9"/>',
    info: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
    alert: '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
    layers: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
    award: '<circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>',
    play: '<polygon points="5 3 19 12 5 21 5 3"/>',
    clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    wallet: '<path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"/><path d="M4 6v12c0 1.1.9 2 2 2h14v-4"/><path d="M18 12a2 2 0 0 0 0 4h4v-4z"/>',
    plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
    filter: '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>',
    star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    'trending-up': '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
    user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    video: '<polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/>',
    pause: '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>',
    cpu: '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/>',
    mic: '<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    globe: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
    zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
    cloud: '<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>'
  };

  HS.icon = (name, cls = '') =>
    `<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ''}</svg>`;

  // Replace <i data-icon="name"> placeholders inside a container.
  HS.hydrateIcons = (root = document) => {
    root.querySelectorAll('i[data-icon]').forEach((el) => {
      el.outerHTML = HS.icon(el.dataset.icon);
    });
  };

  // ------------------------------------------------------------------ Formatting
  // ISO 'YYYY-MM-DD' → local Date (avoids UTC shift).
  HS.parseDate = (iso) => {
    const [y, m, d] = iso.split('-').map(Number);
    return new Date(y, m - 1, d);
  };
  HS.today = () => HS.parseDate(HS.data.today);

  HS.fmt = {
    date: (iso) => HS.parseDate(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    dateLong: (iso) => HS.parseDate(iso).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
    dateWithDay: (iso) => HS.parseDate(iso).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }),
    currency: (n) => new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n),
    escape: (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])
  };

  // ------------------------------------------------------------------ Modal
  const modalRoot = document.getElementById('modal-root');

  // actions: [{ label, variant: 'primary'|'secondary'|'ghost', onClick(close), keepOpen }]
  function openModal({ title, subline = '', body = '', actions = [{ label: 'Close', variant: 'secondary' }], onMount }) {
    modalRoot.innerHTML = `
      <div class="modal-backdrop" data-modal-backdrop>
        <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div class="modal-header">
            <div>
              <h2 id="modal-title">${title}</h2>
              ${subline ? `<p class="subline">${subline}</p>` : ''}
            </div>
            <button class="icon-btn" type="button" data-modal-close aria-label="Close">${HS.icon('x')}</button>
          </div>
          <div class="modal-body">${body}</div>
          <div class="modal-footer">
            ${actions.map((a, i) => `<button class="btn btn-${a.variant || 'secondary'}" type="button" data-action="${i}" ${a.disabled ? 'disabled' : ''}>${a.label}</button>`).join('')}
          </div>
        </div>
      </div>`;
    const backdrop = modalRoot.querySelector('[data-modal-backdrop]');
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop || e.target.closest('[data-modal-close]')) closeModal();
      const btn = e.target.closest('[data-action]');
      if (!btn) return;
      const action = actions[Number(btn.dataset.action)];
      if (action.onClick) action.onClick(closeModal);
      if (!action.keepOpen) closeModal();
    });
    if (onMount) onMount(backdrop.querySelector('.modal'));
    const focusTarget = backdrop.querySelector('.modal-footer .btn-primary') || backdrop.querySelector('.modal-footer .btn');
    if (focusTarget) focusTarget.focus();
  }

  function closeModal() {
    modalRoot.innerHTML = '';
  }

  // ------------------------------------------------------------------ Drawer (side panel with view stack)
  // view: { title, html, onMount(bodyEl), wide }. pushDrawer replaces the content and shows a Back control.
  const drawerRoot = document.getElementById('drawer-root');
  let drawerStack = [];

  function renderDrawer() {
    const view = drawerStack[drawerStack.length - 1];
    if (!view) {
      drawerRoot.innerHTML = '';
      return;
    }
    const canGoBack = drawerStack.length > 1;
    drawerRoot.innerHTML = `
      <div class="drawer-backdrop" data-drawer-close></div>
      <aside class="drawer ${view.wide ? 'drawer-wide' : ''}" role="dialog" aria-modal="true" aria-labelledby="drawer-title">
        <div class="drawer-header">
          ${canGoBack ? `<button class="btn btn-ghost btn-sm" type="button" data-drawer-back>${HS.icon('arrow-left')}Back</button>` : ''}
          <h2 id="drawer-title">${view.title}</h2>
          <button class="icon-btn" type="button" data-drawer-close aria-label="Close panel">${HS.icon('x')}</button>
        </div>
        <div class="drawer-body">${view.html}</div>
      </aside>`;
    // Only animate the slide-in when the drawer first opens.
    if (drawerStack.length > 1 || view.rendered) drawerRoot.querySelector('.drawer').style.animation = 'none';
    view.rendered = true;
    if (view.onMount) view.onMount(drawerRoot.querySelector('.drawer-body'));
  }

  drawerRoot.addEventListener('click', (e) => {
    if (e.target.closest('[data-drawer-close]')) closeDrawer();
    if (e.target.closest('[data-drawer-back]')) {
      drawerStack.pop();
      renderDrawer();
    }
  });

  function openDrawer(view) {
    drawerStack = [view];
    renderDrawer();
  }
  function pushDrawer(view) {
    drawerStack.push(view);
    renderDrawer();
  }
  function closeDrawer() {
    drawerStack = [];
    renderDrawer();
  }

  // ------------------------------------------------------------------ Toast
  const toastRoot = document.getElementById('toast-root');
  function toast(message, icon = 'check-circle') {
    const el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = `${HS.icon(icon)}<span>${message}</span>`;
    toastRoot.appendChild(el);
    setTimeout(() => {
      el.classList.add('is-leaving');
      setTimeout(() => el.remove(), 300);
    }, 3200);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (modalRoot.innerHTML) closeModal();
    else if (drawerStack.length) closeDrawer();
  });

  HS.ui = { openModal, closeModal, openDrawer, pushDrawer, closeDrawer, toast };

  // ------------------------------------------------------------------ Tab navigation
  // Hash = tab id (#learning) or the id of any element inside a tab (#learner-profile).
  HS.modules = HS.modules || {};
  const TABS = ['learning', 'projects', 'feedback'];

  // All modules render at boot so in-page anchors of every tab exist for routing.
  function initModules() {
    TABS.forEach((tab) => {
      if (HS.modules[tab]) HS.modules[tab].init(document.querySelector(`[data-tab-root="${tab}"]`));
    });
    document.querySelectorAll('.subnav a').forEach((a) => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        HS.navigate(a.getAttribute('href'));
      });
    });
  }

  function showTab(tab) {
    document.querySelectorAll('[data-tab-panel]').forEach((p) => { p.hidden = p.dataset.tabPanel !== tab; });
    document.querySelectorAll('[data-tab-link]').forEach((a) => {
      if (a.dataset.tabLink === tab) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
  }

  function route() {
    const id = decodeURIComponent(location.hash.slice(1)) || TABS[0];
    if (TABS.includes(id)) {
      showTab(id);
      window.scrollTo({ top: 0 });
      return;
    }
    const target = document.getElementById(id);
    const panel = target && target.closest('[data-tab-panel]');
    if (panel) {
      showTab(panel.dataset.tabPanel);
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      showTab(TABS[0]);
    }
  }

  HS.navigate = (hash) => {
    if (location.hash === hash) route();
    else location.hash = hash;
  };

  // ------------------------------------------------------------------ Header
  function renderHeader() {
    const s = HS.data.student;
    document.getElementById('today-label').textContent = `Today: ${HS.fmt.dateWithDay(HS.data.today)}`;
    document.getElementById('user-avatar').textContent = s.initials;
    document.getElementById('user-name').textContent = `${s.firstName} ${s.lastName}`;
    document.getElementById('user-program').textContent = s.program;

    document.getElementById('user-chip').addEventListener('click', () => HS.navigate('#learner-profile'));
    document.getElementById('notifications-btn').addEventListener('click', openNotifications);
  }

  function openNotifications() {
    const items = HS.data.notifications.map((n) => `
      <a class="notification ${n.unread ? 'is-unread' : ''}" href="${n.link}" data-notification="${n.id}">
        <span class="notification-icon">${HS.icon(n.icon)}</span>
        <span class="notification-text">
          <strong>${n.title}</strong>
          <span>${n.text}</span>
          <small>${n.time}</small>
        </span>
      </a>`).join('');
    openDrawer({
      title: 'Notifications',
      html: `<div class="notification-list">${items}</div>`,
      onMount: (body) => {
        body.addEventListener('click', (e) => {
          const link = e.target.closest('[data-notification]');
          if (!link) return;
          e.preventDefault();
          const n = HS.data.notifications.find((x) => x.id === link.dataset.notification);
          HS.data.notifications.forEach((x) => { x.unread = false; });
          const dot = document.querySelector('#notifications-btn .dot');
          if (dot) dot.remove();
          closeDrawer();
          HS.navigate(n.link);
          if (n.open && n.open.type === 'feedback' && HS.feedback) HS.feedback.open(n.open.id);
          if (n.open && n.open.type === 'project' && HS.calendar) HS.calendar.openProject(n.open.id);
        });
      }
    });
  }

  // ------------------------------------------------------------------ Boot
  document.addEventListener('DOMContentLoaded', () => {
    initModules();
    HS.hydrateIcons();
    renderHeader();
    window.addEventListener('hashchange', route);
    route();
  });
})();
