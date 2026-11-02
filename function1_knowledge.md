# Function 1 – Specification: "Digital Learning Platform" Tab (HTML Mockup)

> Items marked *[added]* were added to the original concept and are part of the spec.

---

## 1. Scope & General Concept

- The Digital Learning Platform is its **own tab in the main navigation** of the HTML mockup.
- It is a **single page**: all content lives on this one page. There are **no sub-pages**.
  - Navigation within the page uses sections, tabs, filters, anchor links or modals.
- **Look & feel:** a **self-service education platform** in the style of a catalogue (comparable to Coursera / LinkedIn Learning). The user can freely scroll through and browse the offering.
- **Provider of the content:** **HECTOR School** (pre-recorded courses) plus official certification partners.
- **Data:** all data is dummy data (static HTML/JS). No backend, no real payment.

---

## 2. Page Structure (top to bottom)

### 2.1 Learner Profile

- **Profile card** with name, photo placeholder and study program.
- **Budget widget:** Master thesis education budget of **1,500 €**
  - Shows total, spent and remaining amount.
  - Includes a progress bar.
- **Skill profile** (directly below the profile): a set of skill tags the user has assigned to themselves.
  - The platform uses these skills to generate recommendations.
  - Skills can be added and removed. *[added]*
  - Optional: proficiency level per skill (Beginner / Intermediate / Advanced). *[added]*
  - **Example skills, grouped by category:**

    | Category | Skills |
    |---|---|
    | Communication & Presentation | Public Speaking, Storytelling, Body Language, Presentation Design |
    | Sales & Business | Challenger Sales, Negotiation, Stakeholder Management, Business English |
    | Organization & Leadership | Organization Skills, Time Management, Project Management, Team Leadership |
    | Technology & Data | Python, Cloud Fundamentals, AI/ML Basics, Data Analysis |
    | Methods | Agile/Scrum, Design Thinking, Problem Solving |

  - **Pre-filled for the mockup:** Public Speaking, Challenger Sales, Organization Skills, Python, Project Management.

### 2.2 My Learning

- **In Progress:** courses and certifications I am currently working on. Each item shows:
  - a progress bar (%)
  - the next lesson
  - a "Continue" button
- **Earned Certifications & Completed Courses:** badges/cards with:
  - title
  - issuer
  - date earned
  - a "View certificate" button

### 2.3 Recommended for You

- A row of recommended courses/certifications based on the skill profile.
- Each recommendation shows the reason, e.g. "Because you have: Public Speaking" or "Builds on: Project Management". *[added]*

### 2.4 Course Catalogue

- Global **search bar** plus **filter chips** for the three categories.
- Optional sorting: popularity, duration, price.
- Each category is shown as a section with **horizontally scrollable card rows per topic**.

#### Category A – Technical Topics (HECTOR School recordings, free)

- **Examples:** AI Chatbots, Multi-Agent Systems, Generative AI, Data Analytics, Cybersecurity.
- **Card content:** title, thumbnail, duration, number of videos, level.

#### Category B – Personal Skills (HECTOR School recordings, free)

- **Examples:** Presentation, Body Language, Business Language, Challenger Attitude in Sales, Negotiation, Time Management.
- **Card content:** same as Category A.

#### Category C – Official Certifications (partner programs, paid)

- **Partners:** AWS, Microsoft Azure, PRINCE2, PMP, and further partners (e.g. Scrum.org, Google Cloud).
- **Card content:** certification name, partner, level, estimated preparation time, **price**.
- **"Buy with budget" button:**
  1. Opens a confirmation modal (price, remaining budget after purchase).
  2. After confirmation, the price is deducted from the budget and the certification moves to "In Progress".
  3. If the remaining budget is too low, the button is disabled and a note is shown. *[added]*

### 2.5 Partners

- Section with **partner tiles** (logo placeholder + name).
- Clicking a partner shows that partner's area **on the same page**:
  - short description
  - all of its certifications (e.g. as an expanded section or filtered catalogue view)

---

## 3. Design Requirements

- Visually consistent with the rest of the HTML mockup.
- Modern, clean catalogue look: cards, clear category headers.
- Clear visual distinction between free courses and paid certifications (e.g. price badge).
- Responsive layout (desktop first).
