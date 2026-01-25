# Charitysun ERP Frontend Guideline

---

## 1. Technology Stack

| Area | Technology | Purpose                                                 |
| :--- | :--- |:--------------------------------------------------------|
| **Build Tool** | Vite | Fast development server and optimized production builds |
| **Framework** | React | Component-based UI development                          |
| **Language** | TypeScript | Static typing and safer refactoring                     |
| **State Management** | Redux Toolkit | Global application state management                     |
| **UI Framework** | Material UI (MUI) | Consistent, accessible UI components                    |
| **API Client** | OpenAPI Generator | Strongly typed API client from backend spec             |
| **Routing** | React Router | Client-side navigation                                  |
| **Styling** | MUI Theme System | Centralized theming                                     |

---

## 2. High-Level Architecture
The application follows a modular, feature-based architecture:

**Data Flow:**
`User Action` → `Page (Route UI)` → `Component (Reusable UI)` → `Hook (Logic)` → `Generated API Client` → `Backend`

**Key Principles:**
* **Pages** orchestrate features
* **Components** are reusable and presentation-focused
* **Hooks** encapsulate logic and data fetching
* **API access** is strictly typed and generated
* **Global concerns** live in core and shared

---

## 3. Project Structure

```text
src/
│
├── assets/
│
├── client/
│   ├── core/
│   ├── models/
│   ├── services/
│   └── index.ts
│
├── modules/
│   ├── accounting/
│   ├── auth/
│   ├── dashboard/
│   ├── hr/
│   ├── pm/
│   └── products/
│
├── shared/
│   └── layouts/
│       └── components/  # Reusable UI components (Topbar, Sidebar, Footer)
│
├── core/
│   ├── auth/            # Auth context, token handling
│   ├── rbac/            # Role & permission checks
│   ├── AppRouter.tsx    # Routing setup
│   └── theme.ts         # Centralised theme styling
│
├── main.tsx
└── App.tsx
```

---

## 4. Module Architecture
Each functional domain is implemented as a self-contained module with the same internal structure.

**Example:** `products` module

```text
products/
├── components/
│   ├── BomTree.tsx
│   ├── CreateProductForm.tsx
│   └── ProductStats.tsx
│
├── hooks/
│   └── useProducts.ts       # Bridge UI components with generated API services
│
├── pages/
│   └── ProductsDashboard.tsx
```

### Responsibilities
| Layer | Responsibility                                |
| :--- |:----------------------------------------------|
| **Pages** | Route-level views, layout composition         |
| **Components** | UI building blocks                            |
| **Hooks** | Business logic, API calls, state coordination |

---

## 5. API Client Architecture (OpenAPI)
**Overview**
* The API client is fully generated from an OpenAPI specification
* No handwritten REST calls are allowed
* All API usage is type-safe and centralized

**Location**
`src/client/`

**Usage Pattern**
`Hook` → `Generated Service` → `Backend API`

**Example Flow**
1.  `ProductListPage` uses `useProducts()`
2.  Hook calls `ProductControllerService.listProducts()`
3.  Returns typed `Products[]`

---

## 6. State Management (Redux)
Redux is used for cross-cutting and global state, such as:
* Authentication status
* User profile
* Permissions (RBAC)

**Structure**
```text
store/
├── index.ts        # Store configuration
├── authSlice.ts
├── userSlice.ts
└── uiSlice.ts
```
*Local and feature-specific state should remain inside hooks or components.*

---

## 7. Core Application Layer
* **core/auth**: Token storage, refresh logic, Login/logout flows
* **core/rbac**: Role-based access control, Permission checks
* **AppRouter**: Central routing configuration, Lazy loading of modules
* **theme**: Material UI theme configuration (Colors, typography, spacing)

---

## 8. Shared Layer
**Shared Components**
* Footer, Header, Sidebar

**Layouts**
* Main Layout, (more to be added)

---

## 9. Development Guidelines

### 9.1 Git & Version Control Strategy
We follow a **Feature Branch Workflow**. Direct commits to `dev` or `main` are prohibited.

**Branching Naming Convention**
* `feat/feature-name` (e.g., `feat/product-search`)
* `fix/bug-description` (e.g., `fix/login-error`)
* `refactor/component-name`

**Commit Message Structure (Conventional Commits)**
Format: `type(scope): subject`
* **chore**: Changes that involve setup and none-feature configurations
* **ci**: Changes to CI/CD operations
* **feat**: A new feature
* **fix**: A bug fix
* **docs**: Documentation only changes
* **style**: Changes that do not affect the meaning of the code (white-space, formatting)
* **refactor**: A code change that neither fixes a bug nor adds a feature

**Push & Merge Rules**
1.  **Never push broken code.** Ensure the app builds locally before pushing.
2.  **Test locally.** Verify your changes manually or via unit tests.
3.  **Pull Request (PR).** Push to your origin feature branch and open a PR to `dev`.
4.  **Code Review.** At least one peer review is required before merging.

---

### 9.2 Implementation Patterns

**A. Routing & Navigation**
* **Centralized Config:** All routes are defined in `src/core/AppRouter.tsx`.
* **Lazy Loading:** Use `React.lazy()` for all page-level components to optimize bundle size.
* **Guards:** Routes are wrapped in `<RequireAuth>` or `<RequireRole>` to enforce security (RBAC).
* **Definition:**
    ```typescript
    // Example in AppRouter.tsx
    {
      path: 'products',
      element: <RequireRole roles={['ADMIN']}><ProductListPage /></RequireRole>
    }
    ```

**B. Data Flow**
* **Unidirectional:** Data flows down (Props), Actions flow up (Events/Callbacks).
* **Server State:** Handled by **Hooks** calling generated Services. We do not store API data in Redux unless it is needed globally (e.g., User Profile).
* **Global State:** Reserved for "Session" data (Theme, Auth Token, Notifications).
* **Pattern:**
  `Page` (Calls Hook) -> `Hook` (Calls Service) -> `Service` (Returns Data) -> `Page` (Passes Data to Component).

**C. UI & Component Design**
* **Atomic Design:** Build small, dumb components first (Tables, Cards), then assemble them into complex Features.
* **Styling:** Use **MUI `sx` prop** components. No `.css` files whatsoever.
* **Theming:** Always use values from the `theme` object (spacing, colors) to ensure consistency.
    ```typescript
    // Correct
    <Box sx={{ p: 2, color: 'primary.main' }}>
    // Incorrect
    <div style={{ padding: '16px', color: 'blue' }}>
    ```

**D. Business Logic**
* **Separation of Concerns:** UI components should only handle *appearance*.
* **Custom Hooks:** All logic (form validation, API calls, data transformation) must live in a custom hook (e.g., `useProducts.ts`).
* **Services:** Logic hooks must delegate actual HTTP requests to the generated API client.

---

### 9.3 Workflow: Adding a New Feature
1.  **Identify the Module:** Determine if this belongs in an existing module or requires a new folder in `src/modules/`.
2.  **API Integration:** Check `src/client/services`. If the endpoint is missing, regenerate the client from Swagger.
3.  **Logic Layer:** Create a hook (e.g., `use[Feature].ts`).
    * Implement state (`loading`, `data`, `error`).
    * Implement functions (`fetch`, `create`, `update`).
4.  **UI Layer:**
    * Create reusable components in `components/`.
    * Create the main view in `pages/`.
5.  **Assembly:** Connect the Hook to the Page.
6.  **Registration:** Add the route to `AppRouter.tsx`.

### 9.4 Strict Rules
> 1. **Pages must not call APIs directly.** Always go through a hook.
> 2. **Components must be "dumb".** They accept data via props and emit events via callbacks.
> 3. **Hooks must be reusable.** Avoid hardcoding UI-specific logic inside data hooks.
> 4. **No manual fetch/axios.** All API communication must use the generated OpenAPI classes.

## 10. Swagger / API Documentation
All backend endpoints used by this frontend are documented in Swagger:

**Swagger UI:** `https://erp-backend-798680211888.us-east1.run.app/swagger-ui.html`
