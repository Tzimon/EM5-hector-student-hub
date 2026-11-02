# HECTOR School Student Hub – High-Fidelity Mock-Ups

High-fidelity mock-ups of a digital student service for the **Master in Engineering and Management** at KIT HECTOR School, built as an HTML webpage through programming / vibe coding (KIT EM5 – Digital Service Prototyping).

The page combines three functionalities, each in its own tab:

| Tab | Functionality | Spec |
|---|---|---|
| Learning | Digital Learning Platform – learner profile, €1,500 education budget, skill profile, recommendations, course catalogue (free HECTOR School recordings + paid partner certifications), partners | [function1_knowledge.md](function1_knowledge.md) |
| Projects & Calendar | Month calendar with course sessions and company/NGO project periods, filters, course and project details, project overview | [function2_projects.md](function2_projects.md) |
| Feedback | Structured feedback next to each grade (lecturers, peers, industry mentors) and an improvement plan built from recommendations | [function3_feedback.md](function3_feedback.md) |

The dummy user is **Sebastian**, an early-career full-stack developer – see [persona_sebastian.md](persona_sebastian.md).

> All data is dummy data. There is no backend, no login and no real payment. Everything resets on page reload.

## Run it locally

No build step and no dependencies – it is plain HTML, CSS and JavaScript.

**Option 1 – open the file:** clone the repository and double-click `index.html` (works in any modern browser).

**Option 2 – local web server** (recommended):

```bash
git clone https://github.com/Tzimon/EM5-hector-student-hub.git
cd EM5-hector-student-hub
python -m http.server 8080
```

Then open http://localhost:8080. Any other static server works too, e.g. `npx serve`.

An internet connection is only needed for the web font (Source Sans 3 from Google Fonts); without it the page falls back to Arial.

## Project structure

```
index.html            app shell: header, main navigation, one section per tab
css/styles.css        design tokens (KIT Green #009682, KIT Blue #4664AA) + shared components
css/learning.css      Function 1 styles
css/calendar.css      Function 2 styles
css/feedback.css      Function 3 styles
js/data.js            all dummy data (persona, modules, courses, projects, feedback)
js/app.js             tab routing, icons, formatting, modal / side panel / toast helpers
js/learning.js        Function 1 – Digital Learning Platform
js/calendar.js        Function 2 – Projects & Calendar
js/feedback.js        Function 3 – Feedback & Improvement Plan
CLAUDE.md             build instructions, design rules and progress notes for AI coding agents
```

## Notes

- Lecturers, students and the employer are fictional. Company and NGO names are used only as example project partners; their contacts are described by role only.
- Grades use the German scale (1.0 = best).
