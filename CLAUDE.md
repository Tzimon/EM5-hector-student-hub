# CLAUDE.md – Digital Service Prototyping (KIT EM5)

## 1. Project Goal

Build **High-Fidelity Mock-Ups: HTML-Webpage created through programming/Vibe Coding** for a digital student service of a master's program (HECTOR School context).

The webpage combines **three functionalities**, each specified in its own file. These spec files are the **single source of truth** – read the relevant one completely before building anything:

| # | Functionality | Spec file | Main nav tab (suggested label) |
|---|---|---|---|
| 1 | Digital Learning Platform (catalogue, skills, budget, certifications) | [function1_knowledge.md](function1_knowledge.md) | Learning |
| 2 | Projects & Calendar (modules, project periods, course sessions) | [function2_projects.md](function2_projects.md) | Projects & Calendar |
| 3 | Structured Feedback & Improvement Plan | [function3_feedback.md](function3_feedback.md) | Feedback |

The dummy user of the whole mockup is defined in [persona_sebastian.md](persona_sebastian.md).

---

## 2. Working Mode: Build Step by Step

Work through the mock-ups **one functionality at a time, in this order**. Do not start the next step until the current one is complete and checked.

1. **Step 0 – App shell & design system**
   - Shared layout: header, main navigation with the three tabs, content area.
   - Shared CSS tokens (colors, typography, spacing, cards, buttons, badges, modals).
   - Shared dummy data module (student persona, sample "today", courses, lecturers, companies).
2. **Step 1 – Function 1: Digital Learning Platform** → `function1_knowledge.md`
3. **Step 2 – Function 2: Projects & Calendar** → `function2_projects.md`
4. **Step 3 – Function 3: Feedback & Improvement Plan** → `function3_feedback.md`
5. **Step 4 – Polish & consistency pass** across all tabs.

For each step:
- Re-read the spec file before coding.
- Turn every bullet of the spec into a checklist and implement **every** item (including items marked *[added]*).
- When done, verify in the browser (open the page, click through all interactions) and tick off the checklist.
- Briefly note what was built and what (if anything) is open, then continue with the next step. The user asked (2026-11-02) to work through all steps without asking for permission in between and to report once everything is finished.
- Update the **Progress** section at the bottom of this file.

---

## 3. Technical Constraints

- **Static HTML / CSS / vanilla JavaScript only.** No backend, no build step, no frameworks required. Must open directly in a browser (double-click `index.html`).
- External libraries only if really needed, loaded via CDN with a pinned version (e.g. an icon set or font).
- **All data is dummy data** (hard-coded JS objects). No real payment, no real login, no network calls.
- State (e.g. budget spent, added skills, improvement actions) lives in JS memory; optional `localStorage` for persistence across reloads, always wrapped in try/catch.
- Navigation between the three main tabs happens **client-side on one page** (show/hide tab sections). Within a tab, use sections, tabs, filters, anchor links or modals – **no sub-pages** (explicitly required for Function 1).
- Desktop first, but responsive.

### Suggested file structure

```
/index.html            – app shell + main nav + one <section> per tab
/css/styles.css        – design tokens + shared components
/css/learning.css      – Function 1 styles (optional split)
/css/calendar.css      – Function 2 styles (optional split)
/css/feedback.css      – Function 3 styles (optional split)
/js/data.js            – all dummy data (single place, shared across functions)
/js/app.js             – tab navigation, shared helpers (modals, toasts, formatting)
/js/learning.js        – Function 1 logic
/js/calendar.js        – Function 2 logic
/js/feedback.js        – Function 3 logic
```

---

## 4. Design Guidelines

### 4.1 Styling (HECTOR School / KIT Look) – mandatory

The page should look like part of the HECTOR School website (hectorschool.kit.edu): **academic, clean and professional, but with WAY MORE MODERN ELEMENTS**.

| Aspect | Rule |
|---|---|
| Main accent | **KIT Green `#009682`** – buttons, links, progress bars |
| Secondary accent | **KIT Blue `#4664AA`** |
| Text | black / dark gray |
| Backgrounds | white and light gray |
| Font | clean sans-serif (e.g. **Source Sans 3** or Arial) |
| Headings | **bold headings**, with **bold sublines** below them |
| Tone | professional, English |

- Define these as CSS custom properties (design tokens) in `css/styles.css` and use only the tokens, never hard-coded hex values in component styles.
- All UI text, labels and dummy content are in **English**.

### 4.2 General Design Rules

- **High fidelity:** it must look like a real, polished product – not a wireframe. Realistic dummy content (names, dates, descriptions, prices), no "Lorem ipsum".
- **Visual consistency across all three tabs:** same header, nav, card style, buttons, badges, modals and color tokens.
- Modern, clean look: cards, clear section headers, generous whitespace, subtle shadows, clear hierarchy.
- Use color with meaning and keep it consistent, e.g.:
  - free vs. paid (Function 1 price badge),
  - project periods vs. course sessions (Function 2 labels + colors),
  - strengths vs. improvement areas (Function 3).
- Every clickable element gives feedback (hover state, modal, panel, toast). No dead buttons in the mockup.
- Accessible basics: sufficient contrast, real `<button>` elements, labels on inputs.

---

## 5. Shared Dummy World (keep consistent across functions)

Define these once in `js/data.js` and reuse them everywhere:

- **Current student:** **Sebastian** – full persona in [persona_sebastian.md](persona_sebastian.md) (read it before creating any dummy data). Shown in the header and in the Function 1 learner profile; all content (skills, recommendations, project roles, feedback tone) must fit him.
- **Sample "today":** one fixed date constant used by all functions (Function 2 calendar defaults to the month containing it).
- **Courses / modules & lecturers:** the 10 modules from Function 2 (5 engineer, 5 management) with lecturers – reuse them in Function 3 (feedback after presentations/projects/assignments) where it fits.
- **Companies / associations:** e.g. BMW, WHO, … – used by the projects in Function 2.
- **Teams:** project teams with members incl. the current student and their role.

Natural cross-links (nice to have, do not break the specs):
- A project in Function 2 can show a "View Feedback" link that jumps to the related feedback in Function 3.
- A Function 3 recommendation (e.g. "improve presentation skills") can point to a matching course in Function 1.

---

## 6. Rules for Agents

- **Never drop or reinterpret spec content.** If a spec item is ambiguous, pick the most sensible interpretation, implement it, and note the assumption in your report.
- Do not edit the `function*.md` spec files unless the user asks.
- Keep code readable: small functions, comments only where logic is non-obvious, consistent naming.
- Keep one functionality's code in its own JS/CSS file so steps stay independent.

---

## 7. Progress

| Step | Status |
|---|---|
| 0 – App shell & design system | ☑ done |
| 1 – Digital Learning Platform | ☑ done |
| 2 – Projects & Calendar | ☑ done |
| 3 – Feedback & Improvement Plan | ☑ done |
| 4 – Polish & consistency pass | ☑ done |

All spec items of the three function files are implemented and were verified in the browser (desktop 1440 px and mobile 375 px). Everything resets on reload (state is in memory only).

### Step 0 – what exists (reuse it, don't rebuild)

- **Run:** open `index.html` directly, or start the `student-hub` server from `.claude/launch.json` (`python -m http.server 8080` → http://localhost:8080). The browser preview pane needs the server (file:// renders without CSS/JS there).
- **`js/app.js` API:**
  - `HS.icon(name)` / `<i data-icon="name">` + `HS.hydrateIcons(root)` – inline SVG icons (add new ones to `ICONS`).
  - `HS.fmt.date / dateLong / dateWithDay / currency / escape`, `HS.parseDate(iso)`, `HS.today()`.
  - `HS.ui.openModal({ title, subline, body, actions, onMount })`, `HS.ui.closeModal()`.
  - `HS.ui.openDrawer(view)`, `HS.ui.pushDrawer(view)` (replaces content + Back control), `HS.ui.closeDrawer()`; `view = { title, html, onMount(bodyEl) }`.
  - `HS.ui.toast(message, icon)`.
  - `HS.navigate('#id')` – hash is a tab id (`learning`, `projects`, `feedback`) or the id of any element inside a tab (activates the tab and scrolls to it).
  - Function scripts register `HS.modules.<tab> = { init(rootEl) }`; every module's `init` runs once at page load (so anchors in all tabs exist for routing). `rootEl` is the `[data-tab-root]` container (replace its placeholder).
- **`js/data.js`:** `HS.data.today`, `student`, `lecturers`, `partners`, `modules`, `notifications`; lookups `HS.find.lecturer/partner/module(id)`. Add function-specific data in its own section.
- **Assumptions made (not in the specs):** surname "Berger", employer "Nexora IT Solutions GmbH" (fictional); sample today = Thu 12 Nov 2026; modules run back-to-back from 28 Sep 2026 in 2-week blocks, alternating engineering/management, with a Christmas break 21 Dec – 3 Jan; all lecturers are fictional.
- **Header user chip** links to `#learner-profile`.

### Steps 1–4 – what exists

- **Function 1 (`js/learning.js`, `css/learning.css`, data `HS.data.learning`):** sticky in-page sub-nav (Profile · My Learning · Recommended · Course Catalogue · Partners); profile card, €1,500 budget widget (spent €330 at start), skill profile (add via modal with level, remove, click level to cycle); In Progress (Continue → lesson player modal, "Mark as complete" advances progress, 100 % moves item to completed) and earned certificates (certificate modal); recommendations round-robin over the skills with reason "Because you have / Builds on"; catalogue A/B/C with search, category chips, sorting, horizontally scrollable rows per topic; "Buy with budget" → confirmation modal → budget deducted, cert moves to In Progress; disabled + note when budget is too low (PMP €1,250 demonstrates this); partner tiles open the partner area on the same page. Public: `HS.learning.course(id)`, `HS.learning.openCourse(id)`.
- **Function 2 (`js/calendar.js`, `css/calendar.css`, data `HS.data.calendar`):** month grid (defaults to Nov 2026), course filter (jumps to the module's month) and event-type toggles; course sessions (green, "Course") fill every module weekday outside the project period; project periods (blue, "Project" + company name) span 3–5 days in week 1 or 2. Session → course details drawer (name, lecturer, schedule, description, linked project) → project pushes into the drawer with Back. Project period / project card → project details (all spec fields + industry mentor). Side cards: current module + upcoming. Public: `HS.calendar.openProject/openCourse/projectView/upcoming`.
- **Function 3 (`js/feedback.js`, `css/feedback.css`, data `HS.data.feedback`):** stats, competency profile (averages of all ratings), focus card; grades list with "View Feedback" next to each grade (pending / grade-only rows too); wide feedback drawer with criteria table, competency ratings, strengths vs. areas for improvement and per-giver cards (did well · could be improved + example · one recommendation), filter by giver type; "Create improvement action" modal (goal, next step, optional support person, follow-up from the real calendar or custom date); plan cards with Start, Review progress (Achieved / Partly / Not yet + note) and Remove. Public: `HS.feedback.open(activityId)`; `HS.projectExtras` adds "View feedback for this project" to Function 2's project drawer.
- **Cross-links:** notifications open the exact feedback / project; feedback recommendations link to matching Function 1 courses; feedback ↔ project details push into the same drawer with Back.
- **More assumptions:** all peers and their employers are fictional and generic; industry mentors at the partner organisations are described by role only (no invented names); feedback texts, grades (German scale) and prices are dummy values.
