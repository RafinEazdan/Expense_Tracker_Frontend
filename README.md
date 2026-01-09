# Expense Tracker Frontend

A complete, production-ready frontend MVP for an Expense Tracker application built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

### Authentication
- ✅ User Registration with email validation and password strength indicator
- ✅ User Login with OAuth2 form-encoded authentication
- ✅ JWT token management with automatic injection
- ✅ Protected routes with authentication guards
- ✅ User profile management
- ✅ Account deletion with confirmation

### Expense Management
- ✅ View all expenses in a responsive grid layout
- ✅ Create new expenses with validation
- ✅ Edit existing expenses
- ✅ Delete expenses with confirmation
- ✅ View detailed expense information
- ✅ Real-time filtering and searching
- ✅ Sort by date, amount, or category
- ✅ Category-based organization

### Data Visualization
- ✅ Interactive pie charts showing spending by category
- ✅ Summary cards with key statistics
- ✅ Monthly spending overview
- ✅ Category breakdown visualization

### UI/UX Features
- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Loading states and skeleton loaders
- ✅ Toast notifications for user feedback
- ✅ Form validation with inline error messages
- ✅ Modal dialogs for CRUD operations
- ✅ Empty states with helpful prompts
- ✅ Accessible design with ARIA labels

## 🛠 Tech Stack

- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **Form Handling:** React Hook Form
- **Charts:** Recharts
- **Icons:** Lucide React
- **Notifications:** React Toastify
- **Date Formatting:** date-fns

## 📋 Prerequisites

- Node.js 18+ and npm
- Backend API running on `http://localhost:5000`

## 🔧 Installation & Setup

1. The project is already set up in the `expense-tracker-app` directory

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to:
```
http://localhost:5173
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AddExpenseModal.tsx
│   ├── EditExpenseModal.tsx
│   ├── DeleteConfirmModal.tsx
│   ├── ExpenseDetailModal.tsx
│   ├── ExpenseChart.tsx
│   └── ProtectedRoute.tsx
├── contexts/           # React contexts
│   └── AuthContext.tsx
├── lib/               # Utilities and API client
│   └── api.ts
├── pages/             # Page components
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Dashboard.tsx
│   └── Profile.tsx
├── App.tsx            # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles
```

## 🔌 API Integration

The frontend integrates with the backend API at `http://localhost:5000`:

### Authentication Endpoints
- `POST /users` - Register new user
- `POST /login` - Login (OAuth2 form-encoded)
- `GET /users/profile` - Get user profile
- `DELETE /users/profile/delete` - Delete account

### Expense Endpoints
- `GET /expenses` - List all user's expenses
- `POST /expenses` - Create new expense
- `GET /expenses/{id}` - Get expense details
- `PUT /expenses/{id}` - Update expense
- `DELETE /expenses/{id}` - Delete expense

## 🎯 Usage Guide

### Getting Started
1. **Register:** Create a new account with email and password
2. **Login:** Sign in with your credentials
3. **Add Expenses:** Click "Add Expense" to create your first expense
4. **View Dashboard:** See all your expenses, charts, and statistics
5. **Manage Expenses:** Edit, view details, or delete expenses as needed
6. **Profile:** View your profile information or delete your account

### Key Features
- **Search & Filter:** Use the search bar and category filters to find specific expenses
- **Sort Options:** Sort expenses by date, amount, or category
- **Charts:** View spending patterns with interactive pie charts
- **Statistics:** Track total expenses, monthly spending, and category counts

## 🎨 Design Features

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1023px  
- Desktop: 1024px+

### Color Scheme
- Primary: Blue (customizable in tailwind.config.js)
- Success: Green
- Warning: Yellow
- Error: Red

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🔒 Security Features

- JWT token storage in localStorage
- Automatic token injection via Axios interceptors
- 401 response handling with auto-logout
- Protected routes with authentication guards
- Form validation on client and server side

## ⚡ Performance

- Lazy loading for routes
- Memoization for expensive computations
- Debounced search inputs
- Optimized re-renders with React.memo
- Efficient state management with Context API

## 🐛 Error Handling

- Global error handling
- API error messages displayed to users
- Network error handling
- Form validation errors
- 404 Not Found handling
- Loading and empty states

## 📝 Available Scripts

- `npm run dev` - Start development server on port 5173
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🤝 Integration Notes

- Backend must be running on `http://localhost:5000`
- CORS is configured on the backend
- Token expiration is handled automatically
- User data is filtered by owner_id on the backend

## 📄 License

This project is part of the Expense Tracker application suite.

---

**Note:** Make sure the backend API is running before starting the frontend application.
