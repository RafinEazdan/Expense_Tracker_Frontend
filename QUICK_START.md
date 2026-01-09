# Quick Start Guide - Expense Tracker Frontend

## 🚀 Start the Application

### Step 1: Ensure Backend is Running
Make sure your backend API is running on `http://localhost:5000`

### Step 2: Start Frontend Development Server
```bash
cd expense-tracker-app
npm run dev
```

### Step 3: Open in Browser
Navigate to: **http://localhost:5173**

---

## 📖 First Time Setup

### Create Your First Account
1. Click "Sign up" on the login page
2. Enter your email and password
3. Click "Create account"
4. You'll be redirected to login

### Login
1. Enter your credentials
2. Click "Sign in"
3. You'll see the dashboard

### Add Your First Expense
1. Click "Add Expense" button
2. Fill in:
   - Amount (e.g., 45.99)
   - Category (e.g., "Food & Dining")
   - Description (optional)
3. Click "Save Expense"
4. Your expense appears on the dashboard!

---

## 🎯 Key Features to Try

### Dashboard Features
- ✅ View statistics cards at the top
- ✅ See spending breakdown in pie chart
- ✅ Use search bar to find expenses
- ✅ Filter by category
- ✅ Sort by date, amount, or category
- ✅ Click View/Edit/Delete on any expense

### Profile Management
- ✅ Click "Profile" in header
- ✅ View your account information
- ✅ Delete account if needed (careful - permanent!)

### Logout
- ✅ Click "Logout" in header
- ✅ You'll be redirected to login page

---

## 💡 Tips

1. **Multiple Categories**: Try different expense categories to see the chart update
2. **Search**: Type any word to search descriptions and categories
3. **Responsive**: Resize your browser to see mobile/tablet/desktop views
4. **Empty State**: Delete all expenses to see the empty state
5. **Validation**: Try submitting forms with invalid data to see validation

---

## 🐛 Troubleshooting

### Backend Not Running
**Error**: Network errors or "Failed to load expenses"
**Solution**: Start your backend API on port 5000

### Port Already in Use
**Error**: "Port 5173 is already in use"
**Solution**: Stop other Vite processes or use a different port:
```bash
npm run dev -- --port 5174
```

### Tailwind Styles Not Loading
**Solution**: The app uses Tailwind CSS v4, ensure all packages are installed:
```bash
npm install
```

---

## 📂 Project Location

```
/Users/eazdanmostafarafin/All Work/Expense_Tracker_Frontend/expense-tracker-app/
```

---

## ✅ Verification Checklist

Test these features to verify everything works:

- [ ] Register a new account
- [ ] Login with credentials
- [ ] View empty dashboard
- [ ] Add a new expense
- [ ] View expense details
- [ ] Edit an expense
- [ ] Delete an expense
- [ ] Use search and filters
- [ ] View profile page
- [ ] Logout

---

## 🎉 Ready to Use!

The application is fully functional and ready for use. All features from the requirements document have been implemented.

**Happy Expense Tracking! 💰**
