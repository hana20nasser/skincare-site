# 📋 SCRUM MEETING SUMMARIES
## Project: Skin Analysis & Product Recommendation System
> **Team Size:** 3 Members &nbsp;|&nbsp; **Methodology:** Scrum &nbsp;|&nbsp; **Sprint Duration:** 2 Weeks

---

## 👥 Team Members

| Role | Responsibilities |
|------|-----------------|
| 🎨 **Frontend Developer** | UI/UX, HTML/CSS/JS, Image Upload, Results Display |
| ⚙️ **Backend Developer** | server.js, REST APIs, DB Integration, Deployment |
| 🤖 **AI/ML Engineer** | analyzer.js, Claude API Integration, Skin Logic |

---

## 🗓️ SPRINT 1 — Project Setup & Core Infrastructure
**Duration:** Week 1–2 &nbsp;|&nbsp; **Dates:** \_\_\_\_\_\_ → \_\_\_\_\_\_  
**Sprint Goal:** Set up the project structure, basic UI, and server skeleton.

---

### 📌 Sprint Planning Meeting

| | Details |
|--|---------|
| **Date** | \_\_\_\_\_\_ |
| **Attendees** | Frontend Dev, Backend Dev, AI/ML Engineer |
| **Scrum Master** | *(rotating)* |

**🎯 Sprint Backlog — Sprint 1:**

| # | Task | Assigned To | Story Points | Status |
|---|------|-------------|:---:|--------|
| 1 | Initialize project repo & folder structure | Backend Dev | 2 | ✅ Done |
| 2 | Create `server.js` with Express setup | Backend Dev | 3 | ✅ Done |
| 3 | Build basic HTML upload page (Frontend) | Frontend Dev | 3 | ✅ Done |
| 4 | Design UI wireframe (Mobile-first) | Frontend Dev | 2 | ✅ Done |
| 5 | Set up `analyzer.js` skeleton + Claude API key | AI/ML Engineer | 3 | ✅ Done |
| 6 | Configure `.env` and dependencies (`package.json`) | Backend Dev | 1 | ✅ Done |
| 7 | Connect Frontend → Backend (basic POST /api/analyze) | Backend Dev | 3 | ✅ Done |
| **Total** | | | **17** | |

---

### 📅 Daily Standups — Sprint 1

#### Day 3
| Member | Yesterday ✅ | Today 🎯 | Blockers 🚧 |
|--------|-------------|---------|------------|
| Frontend Dev | Set up HTML structure & upload form | Style the upload page (CSS) | None |
| Backend Dev | Initialized repo, installed Express | Build POST /api/analyze route | Deciding on multer vs formidable |
| AI/ML Engineer | Researched Claude Vision API | Write analyzer.js base function | Need API key access |

#### Day 7
| Member | Yesterday ✅ | Today 🎯 | Blockers 🚧 |
|--------|-------------|---------|------------|
| Frontend Dev | Completed upload UI + preview | Connect form to backend fetch() | CORS issue with localhost |
| Backend Dev | Built API route, file handling with multer | Test end-to-end image send | CORS issue — fixing now |
| AI/ML Engineer | analyzer.js reads image buffer | Test Claude API call with sample image | Rate limits on free tier |

#### Day 10
| Member | Yesterday ✅ | Today 🎯 | Blockers 🚧 |
|--------|-------------|---------|------------|
| Frontend Dev | Fixed CORS, form submits correctly | Show loading spinner during analysis | None |
| Backend Dev | CORS resolved, route working | Clean up error handling | None |
| AI/ML Engineer | Claude API returns basic response | Parse and structure the JSON output | Response format inconsistent |

---

### ✅ Sprint 1 Review

**Completed:**
- ✅ Project repo initialized with clean structure
- ✅ `server.js` running with Express + multer
- ✅ Frontend upload page built and connected to backend
- ✅ `analyzer.js` successfully calls Claude API
- ✅ Basic end-to-end flow: Image upload → API → AI response

**Not Completed / Carried Over:**
- ⏳ Structured JSON output from AI (moved to Sprint 2)
- ⏳ Product DB schema (moved to Sprint 2)

**Demo:** Basic image upload → raw AI text response shown in browser ✅

---

### 🔁 Sprint 1 Retrospective

| 👍 What Went Well | 👎 What Didn't Work | 💡 Improvements |
|-------------------|---------------------|-----------------|
| Team setup fast, repo ready Day 1 | CORS wasted 2 days | Add CORS config to project template |
| Claude API integrated quickly | AI response format inconsistent | Define strict output schema upfront |
| Good communication daily | No clear task ownership at start | Use GitHub Issues for task tracking |

---
---

## 🗓️ SPRINT 2 — AI Analysis Engine & Product DB
**Duration:** Week 3–4 &nbsp;|&nbsp; **Dates:** \_\_\_\_\_\_ → \_\_\_\_\_\_  
**Sprint Goal:** Complete skin analysis logic, build Product DB, and connect recommendation engine.

---

### 📌 Sprint Planning Meeting

| | Details |
|--|---------|
| **Date** | \_\_\_\_\_\_ |
| **Attendees** | Frontend Dev, Backend Dev, AI/ML Engineer |
| **Carry Over from Sprint 1** | Structured AI output, Product DB schema |

**🎯 Sprint Backlog — Sprint 2:**

| # | Task | Assigned To | Story Points | Status |
|---|------|-------------|:---:|--------|
| 1 | Define AI output JSON schema (skinType, issues, tips) | AI/ML Engineer | 2 | ✅ Done |
| 2 | Update `analyzer.js` to return structured JSON | AI/ML Engineer | 4 | ✅ Done |
| 3 | Design Product DB schema (SQLite / JSON file) | Backend Dev | 3 | ✅ Done |
| 4 | Seed Product DB with 20+ skincare products | Backend Dev | 2 | ✅ Done |
| 5 | Build `GET /api/recommend` endpoint | Backend Dev | 4 | ✅ Done |
| 6 | Build product recommendation logic (filter by skinType) | Backend Dev + AI/ML | 5 | ✅ Done |
| 7 | Display analysis results on Frontend (skinType card) | Frontend Dev | 3 | ✅ Done |
| 8 | Display recommended products as cards | Frontend Dev | 4 | ✅ Done |
| 9 | Add loading states & error handling in UI | Frontend Dev | 2 | ✅ Done |
| **Total** | | | **29** | |

---

### 📅 Daily Standups — Sprint 2

#### Day 3
| Member | Yesterday ✅ | Today 🎯 | Blockers 🚧 |
|--------|-------------|---------|------------|
| Frontend Dev | Started result display components | Build skinType result card UI | Waiting for AI JSON schema |
| Backend Dev | Designed DB schema | Create products table + seed data | Which DB: SQLite or JSON? |
| AI/ML Engineer | Defined JSON output schema | Update analyzer.js prompt for structured output | Prompt engineering takes time |

#### Day 7
| Member | Yesterday ✅ | Today 🎯 | Blockers 🚧 |
|--------|-------------|---------|------------|
| Frontend Dev | SkinType card done | Build product recommendation cards | Need API response format |
| Backend Dev | DB seeded with 25 products | Build /api/recommend filter logic | None |
| AI/ML Engineer | analyzer.js returns clean JSON | Test with 10 different skin images | Accuracy varies by image quality |

#### Day 10
| Member | Yesterday ✅ | Today 🎯 | Blockers 🚧 |
|--------|-------------|---------|------------|
| Frontend Dev | Product cards UI complete | Polish UI, add animations | None |
| Backend Dev | /api/recommend working with filters | Add sorting by rating | None |
| AI/ML Engineer | Tested 10 images — 85% accuracy | Improve prompt for edge cases | Low-light photos give poor results |

---

### ✅ Sprint 2 Review

**Completed:**
- ✅ `analyzer.js` returns structured JSON: `{ skinType, issues, recommendations, confidence }`
- ✅ Product DB with 25 products, filterable by skinType
- ✅ `/api/recommend` endpoint live and tested
- ✅ Frontend shows analysis result card + product recommendation cards
- ✅ Full flow working: Upload → Analyze → Recommend → Display

**Not Completed / Carried Over:**
- ⏳ Low-light image handling (moved to Sprint 3)
- ⏳ User authentication (moved to Sprint 3)

**Demo:** Full skin analysis + product recommendation flow working end-to-end ✅

---

### 🔁 Sprint 2 Retrospective

| 👍 What Went Well | 👎 What Didn't Work | 💡 Improvements |
|-------------------|---------------------|-----------------|
| AI JSON output clean and consistent | DB choice debate cost 1 day | Decide tech stack before sprint starts |
| Frontend cards look great | Low-light images hurt accuracy | Add image quality check before analysis |
| Recommendation logic accurate | No unit tests written yet | Add Jest tests in Sprint 3 |

---
---

## 🗓️ SPRINT 3 — Polish, Auth & Deployment
**Duration:** Week 5–6 &nbsp;|&nbsp; **Dates:** \_\_\_\_\_\_ → \_\_\_\_\_\_  
**Sprint Goal:** Add authentication, improve AI accuracy, write tests, and deploy to production.

---

### 📌 Sprint Planning Meeting

| | Details |
|--|---------|
| **Date** | \_\_\_\_\_\_ |
| **Attendees** | Frontend Dev, Backend Dev, AI/ML Engineer |
| **Carry Over from Sprint 2** | Low-light handling, User auth |

**🎯 Sprint Backlog — Sprint 3:**

| # | Task | Assigned To | Story Points | Status |
|---|------|-------------|:---:|--------|
| 1 | Add image quality check before analysis | AI/ML Engineer | 3 | ✅ Done |
| 2 | Improve Claude prompt for edge cases | AI/ML Engineer | 4 | ✅ Done |
| 3 | Implement JWT user authentication | Backend Dev | 5 | ✅ Done |
| 4 | Add user history (save past analyses) | Backend Dev | 4 | ✅ Done |
| 5 | Write unit tests (Jest) for API routes | Backend Dev | 3 | ✅ Done |
| 6 | Write integration tests for analyzer.js | AI/ML Engineer | 3 | ✅ Done |
| 7 | Add login/register UI | Frontend Dev | 4 | ✅ Done |
| 8 | Add history page (past analyses) | Frontend Dev | 3 | ✅ Done |
| 9 | Set up CI/CD pipeline (GitHub Actions) | Backend Dev | 3 | ✅ Done |
| 10 | Deploy to production server | Backend Dev | 3 | ✅ Done |
| 11 | Final UI polish & responsiveness | Frontend Dev | 2 | ✅ Done |
| **Total** | | | **37** | |

---

### 📅 Daily Standups — Sprint 3

#### Day 3
| Member | Yesterday ✅ | Today 🎯 | Blockers 🚧 |
|--------|-------------|---------|------------|
| Frontend Dev | Started login/register UI | Complete auth forms + validation | None |
| Backend Dev | JWT setup done | Build user history endpoints | None |
| AI/ML Engineer | Image quality check added | Rework prompt for low-light cases | Testing takes time |

#### Day 7
| Member | Yesterday ✅ | Today 🎯 | Blockers 🚧 |
|--------|-------------|---------|------------|
| Frontend Dev | Auth UI done, login working | Build history page | Token storage (localStorage vs cookie?) |
| Backend Dev | History endpoints ready | Write Jest tests for all routes | None |
| AI/ML Engineer | Prompt improved — 92% accuracy | Write integration tests | None |

#### Day 10
| Member | Yesterday ✅ | Today 🎯 | Blockers 🚧 |
|--------|-------------|---------|------------|
| Frontend Dev | History page done, full UI polished | Final responsive testing on mobile | None |
| Backend Dev | All tests passing, CI/CD pipeline live | Deploy to production | Env vars on server |
| AI/ML Engineer | All tests written | Final accuracy review with 20 images | None |

---

### ✅ Sprint 3 Review

**Completed:**
- ✅ Image quality pre-check before sending to AI
- ✅ Improved AI accuracy: **85% → 92%** on test dataset
- ✅ JWT authentication (register / login / protected routes)
- ✅ User history — save & view past analyses
- ✅ 28 unit + integration tests — all passing ✅
- ✅ CI/CD pipeline with GitHub Actions
- ✅ **Deployed to production** 🚀

**Not Completed:**
- ⏳ Push notifications (out of scope — future feature)
- ⏳ Multi-language support (future feature)

**Demo:** Full production-ready app deployed and live ✅

---

### 🔁 Sprint 3 Retrospective

| 👍 What Went Well | 👎 What Didn't Work | 💡 Improvements |
|-------------------|---------------------|-----------------|
| AI accuracy jumped to 92% | Auth took longer than estimated | Estimate auth tasks with +50% buffer |
| CI/CD pipeline smooth | No tests in Sprint 1 & 2 — catching up was hard | Write tests from Sprint 1 onwards |
| Team communication excellent | Env vars on server caused deploy delay | Document all env vars in README upfront |
| Deployed on time | History page scope grew mid-sprint | Lock scope before sprint starts |

---
---

## 📊 Project Summary

| Sprint | Goal | Story Points | Status |
|--------|------|:---:|--------|
| Sprint 1 | Setup & Infrastructure | 17 | ✅ Complete |
| Sprint 2 | AI Engine & Product DB | 29 | ✅ Complete |
| Sprint 3 | Polish, Auth & Deployment | 37 | ✅ Complete |
| **Total** | | **83** | ✅ **Shipped** 🚀 |

---

## 🏁 Final Notes

- **Total Duration:** 6 Weeks (3 Sprints × 2 Weeks)
- **Team Velocity:** Sprint 1: 17 pts → Sprint 2: 29 pts → Sprint 3: 37 pts *(improving each sprint)*
- **AI Accuracy:** Final model accuracy: **92%** on skin type classification
- **Tests Written:** 28 unit + integration tests, all passing
- **Deployment:** Live on production ✅

---
*Last updated: Sprint 3 — End of Project*
