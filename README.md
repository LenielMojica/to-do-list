#  Vanilla JavaScript To-Do App

A robust, object-oriented To-Do application built from scratch with vanilla JavaScript, HTML5, and CSS3. Designed with a clean separation of concerns, it features dynamic project containers, priority tracking, modal-based editing, and full state persistence using `localStorage`.



---

##  Key Features

- **Project Containers:** Group and organize your tasks into custom projects.
- **Persistent Storage:** Seamlessly syncs your projects and todos with browser `localStorage`.
- **Object Rehydration:** Custom factory functions restore closures and methods (`toggleCompleted`, etc.) upon page reload.
- **Detailed Task Modals:** Click on any task to open an expanded view where you can edit titles, descriptions, due dates, and priority levels on the fly.
- **Priority Badging & Status:** Visually distinguish tasks by priority (Low, Medium, High) and track completion status with ease.

---

##  Tech Stack

- **JavaScript (ES6+):** Factory functions, closures, getters, module imports/exports, and DOM manipulation.
- **HTML5:** Semantic structure and modal overlays.
- **CSS3:** Custom layouts, badges, and responsive design.
- **Storage:** Browser `localStorage` API with multi-key mapping.

---

##  Architectural Highlights

This application implements a **memory-first state pattern**:
1. **Factories & Closures:** `createTodo` and `createProject` encapsulate private states while exposing clean public getters and mutation methods.
2. **Rehydration Layer:** On application boot, raw JSON data retrieved from `localStorage` is mapped back into fully functional object instances with active methods intact.
3. **Storage Synchronization:** Individual project todos are indexed using their parent project title as a unique `localStorage` key, ensuring fast lookups and clean data separation.

---

##  Getting Started

To run this project locally, follow these simple steps:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
