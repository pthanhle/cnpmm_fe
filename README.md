🛠 **Tech Stack**  
Core: React 18, Vite  
State Management & Data Fetching: TanStack Query (React Query)  
Styling: Tailwind CSS, Ant Design (Antd)  
Routing: React Router DOM v6  
Internationalization: i18next, react-i18next  
HTTP Client: Axios (with custom Interceptors)

📂 **Project Structure**  
The project follows a Feature-based structure, encapsulating logic within specific features to allow for easy addition or removal of modules without affecting the entire system.

```bash
src
├── api                         # SERVER COMMUNICATION LAYER (Domain-Driven)
│   ├── config                  # Axios instance config (Interceptors, BaseURL)
│   ├── employees               # Dedicated API for Employees module
│   │   ├── endpoints.js        # URL definitions (Constants)
│   │   └── index.js            # Actual API calling functions
│   └── ...                     # (Similar structure for orders, projects, students)
│
├── assets                      # Static assets (Images, Fonts, Icons)
│
├── components                  # SHARED UI COMPONENTS (Atomic Design)
│   ├── atoms                   # Smallest units (Loading, Toggle, Button...)
│   ├── molecules               # Groups of atoms (PageHeaderAction - Search + Filter)
│   ├── organisms               # Complex sections (Sidebar, Navbar)
│   └── templates               # Layout skeletons (MainLayout)
│
├── constants                   # Global constants (Config, Enums, Status Codes)
│
├── context                     # GLOBAL STATE (Theme, Auth, etc.)
│   └── ThemeContext.jsx        # Manages Dark/Light mode & Antd ConfigProvider
│
├── features                    # LOGIC HUB (Feature-Sliced Design)
│   ├── employees               # Employee Module
│   │   ├── components          # Module-specific UI (Table, Modal)
│   │   ├── hooks               # Business Logic & React Query (useEmployees)
│   │   └── index.jsx           # Entry point (Container Component)
│   └── ...                     # (Similar structure for other modules)
│
├── hooks                       # GLOBAL HOOKS (Shared across app)
│   └── useDebounce.js          # Performance optimization hook for search
│
├── i18n                        # Internationalization configuration
├── locales                     # Translation JSON files (split by feature: en/vi)
│
├── pages                       # PAGE WRAPPERS (Lazy Load Targets)
│   ├── EmployeePage.jsx        # Wrapper calling the corresponding Feature Container
│   └── ...
│
├── services                    # (Deprecated/Optional) Pure JS helper functions
│
├── styles                      # Global CSS & Tailwind directives
│
├── utils                       # UTILITY HELPERS
│   ├── format.js               # Formatters (Currency, Date: VNĐ, DD/MM/YYYY)
│   └── validate.js             # Data validation helpers
│
├── layout.jsx                  # (Legacy) Moved to components/templates
├── router.jsx                  # Route Configuration & Lazy Loading setup
└── main.jsx                    # App Entry Point & Providers setup