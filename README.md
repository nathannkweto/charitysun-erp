# Charitysun Engineering ERP Frontend

A modern, enterprise-grade ERP frontend for Charitysun Engineering, featuring a Ford-style public website and a protected management platform.

## 🚀 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type-safe development
- **Vite** - Build tool and dev server
- **Material UI (MUI)** - Component library and design system
- **Redux Toolkit** - Global state management
- **React Router** - Client-side routing
- **OpenAPI Generator** - Type-safe API client

## 🏗️ Architecture

### Route Structure

The application uses a dual-architecture pattern:

**Public Routes** (No authentication required):
```
/                  - HomePage (company introduction)
/services          - ServicesPage (service offerings)
/projects          - ProjectsPage (project portfolio)
/about             - AboutPage (company information)
/contact           - ContactPage (contact form)
/login             - LoginPage (authentication)
```

**Protected ERP Routes** (Authentication required):
```
/app/dashboard     - Dashboard (ERP overview)
/app/services      - Services Management (products)
```

### Layout System

- **PublicLayout** - Used for all public routes
  - Scroll-responsive header (transparent → white)
  - Public navigation menu
  - Company footer
  - No authentication UI

- **MainLayout** - Used for all `/app/*` routes
  - Fixed sidebar navigation
  - User profile header
  - Logout functionality
  - Only accessible when authenticated

### Module Structure

```
src/
├── core/                   # Core application logic
│   ├── auth/              # Authentication context & guards
│   ├── theme.ts           # MUI theme configuration
│   └── AppRouter.tsx      # Route definitions
├── shared/                # Shared components & utilities
│   └── layouts/          
│       ├── PublicLayout.tsx   # Public site layout
│       └── MainLayout.tsx     # ERP platform layout
├── modules/               # Feature modules
│   ├── public/           # Public marketing pages
│   │   └── pages/
│   │       ├── HomePage.tsx
│   │       ├── ServicesPage.tsx
│   │       ├── ProjectsPage.tsx
│   │       ├── AboutPage.tsx
│   │       └── ContactPage.tsx
│   ├── auth/             # Authentication module
│   │   ├── pages/LoginPage.tsx
│   │   └── components/LoginForm.tsx
│   ├── dashboard/        # Dashboard module
│   │   └── pages/DashboardPage.tsx
│   └── products/         # Products/Services module
│       └── pages/ProductsPage.tsx
├── store/                # Redux store configuration
│   └── authSlice.ts      # Authentication state
├── client/               # API client (OpenAPI generated)
└── assets/               # Static assets (images, etc.)
```

## ✨ Features Implemented

### Public Website
- ✅ Professional landing page with company introduction
- ✅ Services showcase page
- ✅ Project portfolio page
- ✅ About page with company stats
- ✅ Contact form with business info
- ✅ Ford-style design with premium aesthetics
- ✅ Fully responsive across devices
- ✅ Scroll-responsive navigation

### Authentication System
- ✅ Login page with enterprise design
- ✅ Redux-based auth state management
- ✅ Token-based authentication
- ✅ Protected route guards
- ✅ Automatic redirect to login for unauthorized access

### ERP Platform
- ✅ Dashboard with overview
- ✅ Products/Services management
- ✅ Sidebar navigation
- ✅ User profile display
- ✅ Logout functionality

### Design System
- ✅ Custom MUI theme
- ✅ Consistent color palette (Blue/Slate)
- ✅ Typography system
- ✅ Component styling via `sx` prop (no CSS files)
- ✅ Smooth animations and transitions

## 📦 Setup Instructions

### Prerequisites

- **Node.js** 18.x or higher
- **npm** 9.x or higher

### Installation

1. **Clone the repository**
   ```bash
   cd d:\Desktop\charitysun-erp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

   The application will start at `http://localhost:5173` (or another port if 5173 is in use).

### Environment Variables

Create a `.env` file in the project root if you need custom configuration:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

## 🎯 Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run TypeScript type checking
npm run type-check

# Lint code
npm run lint
```

## 🧭 Navigation Guide

### For Visitors (Public Access)

1. Visit `http://localhost:5173/`
2. Browse public pages without login:
   - Home - Company introduction
   - VEHICLES - Service offerings (linked as /services)
   - PROJECTS - Project portfolio
   - ABOUT - Company information
   - CONTACT - Contact form
3. Click "SIGN IN" to access the ERP platform

### For Staff (Authenticated Access)

1. Click "SIGN IN" in the header
2. Login with credentials:
   - **Username**: `admin`
   - **Password**: `password123`
3. Access protected routes:
   - Navigate to `/app/dashboard` for overview
   - Navigate to `/app/services` for service management
4. Use sidebar for navigation between ERP features

## 🎨 Design Principles

1. **No CSS Files** - All styling via MUI `sx` prop
2. **Type-Safe** - Full TypeScript coverage
3. **Component Isolation** - Presentation-only components
4. **Hook-Based Logic** - Business logic in custom hooks
5. **Redux for Global State** - Auth state, user info
6. **MUI Theme Tokens** - Consistent design system

## 🔒 Authentication Flow

```
User visits /app/dashboard
    ┌─> Authenticated? ────> Yes ─────> Show Dashboard
    └─> Authenticated? ────> No ──────> Redirect to /login
                                             │
                                             ▼
                                        User logs in
                                             │
                                             ▼
                                    Redirect to /app/dashboard
```

## 📁 Key Files

| File | Purpose |
|------|---------|
| `src/core/AppRouter.tsx` | Root routing configuration |
| `src/core/auth/AuthContext.tsx` | Authentication context & guards |
| `src/core/theme.ts` | MUI theme configuration |
| `src/shared/layouts/PublicLayout.tsx` | Public site layout |
| `src/shared/layouts/MainLayout.tsx` | ERP platform layout |
| `src/store/authSlice.ts` | Authentication state management |

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Development Guidelines

### Adding a New Public Page

1. Create page in `src/modules/public/pages/`
2. Add route to `AppRouter.tsx` under public routes
3. Use `PublicLayout` wrapper
4. Style with MUI `sx` prop only

### Adding a New Protected Page

1. Create page in appropriate module folder
2. Add route to `AppRouter.tsx` under `/app/*` routes
3. Wrap with `RequireAuth` component
4. Use `MainLayout` wrapper

### Styling Rules

```tsx
// ✅ GOOD - Use MUI sx prop
<Box sx={{ p: 4, bgcolor: 'primary.main' }}>
  Content
</Box>

// ❌ BAD - Don't use CSS files
import './styles.css';
```

## 🚧 Future Enhancements

- [ ] HR Management module
- [ ] Accounting module
- [ ] Real-time notifications
- [ ] Advanced reporting dashboard
- [ ] Mobile app integration
- [ ] Multi-language support

## 📄 License

Proprietary - Charitysun Engineering © 2026

## 📧 Support

For technical support, contact: dev@charitysun.com

---

**Built with ❤️ by the Charitysun Engineering Team**
