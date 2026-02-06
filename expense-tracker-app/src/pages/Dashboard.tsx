import React, { useState, useEffect, useMemo } from 'react';
import { expensesApi } from '../lib/api';
import type { Expense } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import {
  Plus,
  LogOut,
  User,
  Eye,
  Edit2,
  Trash2,
  Search,
  TrendingUp,
  DollarSign,
  Receipt,
  Calendar,
  Sparkles,
} from 'lucide-react';
import AddExpenseModal from '../components/AddExpenseModal';
import EditExpenseModal from '../components/EditExpenseModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import ExpenseDetailModal from '../components/ExpenseDetailModal';
import ExpenseChart from '../components/ExpenseChart';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortBy, setSortBy] = useState<'date-desc' | 'date-asc' | 'amount-desc' | 'amount-asc' | 'category'>('date-desc');
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [story, setStory] = useState<string>('');
  const [loadingStory, setLoadingStory] = useState(false);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const data = await expensesApi.getAll();
      setExpenses(data);
    } catch (error: any) {
      toast.error('Failed to load expenses');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('You have been logged out successfully');
    navigate('/login');
  };

  const handleAddExpense = async (data: { amount: number; category: string; description?: string }) => {
    try {
      await expensesApi.create(data);
      toast.success('Expense added successfully!');
      setShowAddModal(false);
      fetchExpenses();
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Failed to add expense');
    }
  };

  const handleEditExpense = async (id: number, data: { amount: number; category: string; description: string }) => {
    try {
      await expensesApi.update(id, data);
      toast.success('Expense updated successfully!');
      setShowEditModal(false);
      setSelectedExpense(null);
      fetchExpenses();
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Failed to update expense');
    }
  };

  const handleDeleteExpense = async (id: number) => {
    try {
      await expensesApi.delete(id);
      toast.success('Expense deleted successfully!');
      setShowDeleteModal(false);
      setSelectedExpense(null);
      fetchExpenses();
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Failed to delete expense');
    }
  };

  const openEditModal = (expense: Expense) => {
    setSelectedExpense(expense);
    setShowEditModal(true);
  };

  const openDeleteModal = (expense: Expense) => {
    setSelectedExpense(expense);
    setShowDeleteModal(true);
  };

  const openDetailModal = (expense: Expense) => {
    setSelectedExpense(expense);
    setShowDetailModal(true);
  };

  const handleGenerateStory = async () => {
    if (expenses.length === 0) {
      toast.warning('Add some expenses first to generate a story!');
      return;
    }

    setLoadingStory(true);
    setShowStoryModal(true);
    setStory('');

    try {
      const generatedStory = await expensesApi.generateStory();
      setStory(generatedStory);
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Failed to generate story');
      setShowStoryModal(false);
    } finally {
      setLoadingStory(false);
    }
  };

  // Filter and sort expenses
  const filteredAndSortedExpenses = useMemo(() => {
    let filtered = expenses.filter((expense) => {
      const matchesSearch = expense.description?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           expense.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !categoryFilter || expense.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'date-asc':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case 'amount-desc':
          return b.amount - a.amount;
        case 'amount-asc':
          return a.amount - b.amount;
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

    return filtered;
  }, [expenses, searchTerm, categoryFilter, sortBy]);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalExpenses = expenses.length;
    const totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const monthlyExpenses = expenses.filter(exp => {
      const date = new Date(exp.created_at);
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    });
    const monthlyTotal = monthlyExpenses.reduce((sum, exp) => sum + exp.amount, 0);

    const categoriesSet = new Set(expenses.map(exp => exp.category));

    return {
      totalExpenses,
      totalAmount,
      monthlyTotal,
      categoriesCount: categoriesSet.size,
    };
  }, [expenses]);

  // Get unique categories
  const categories = useMemo(() => {
    return Array.from(new Set(expenses.map(exp => exp.category))).sort();
  }, [expenses]);

  const clearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Expense Tracker</h1>
              <p className="text-sm text-gray-600">{user?.email}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/profile"
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <User className="h-5 w-5" />
                <span>Profile</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalExpenses}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Receipt className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Amount</p>
                <p className="text-2xl font-bold text-gray-900">৳{stats.totalAmount.toFixed(2)}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">৳{stats.monthlyTotal.toFixed(2)}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Categories</p>
                <p className="text-2xl font-bold text-gray-900">{stats.categoriesCount}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        {expenses.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Spending Overview</h2>
            <ExpenseChart expenses={expenses} />
          </div>
        )}

        {/* Expenses Section */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <h2 className="text-lg font-semibold text-gray-900">Your Expenses</h2>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                <button
                  onClick={handleGenerateStory}
                  disabled={expenses.length === 0}
                  className="flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Sparkles className="h-5 w-5" />
                  <span>Generate Story</span>
                </button>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center justify-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <Plus className="h-5 w-5" />
                  <span>Add Expense</span>
                </button>
              </div>
            </div>

            {/* Filters and Search */}
            <div className="mt-4 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search expenses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="amount-desc">Highest Amount</option>
                <option value="amount-asc">Lowest Amount</option>
                <option value="category">Category (A-Z)</option>
              </select>

              {(searchTerm || categoryFilter) && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Expenses List */}
          <div className="p-6">
            {filteredAndSortedExpenses.length === 0 ? (
              <div className="text-center py-12">
                <Receipt className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No expenses yet</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {expenses.length === 0
                    ? "Start tracking your spending!"
                    : "No expenses match your filters."}
                </p>
                {expenses.length === 0 && (
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Add Your First Expense
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredAndSortedExpenses.map((expense) => (
                  <div
                    key={expense.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="px-2 py-1 text-xs font-medium text-primary-700 bg-primary-100 rounded-full">
                            {expense.category}
                          </span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">
                          ৳{expense.amount.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2" title={expense.description}>
                          {expense.description || 'No description'}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          {format(new Date(expense.created_at), 'MMM d, yyyy')}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <button
                        onClick={() => openDetailModal(expense)}
                        className="flex-1 flex items-center justify-center space-x-1 px-3 py-1.5 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                        <span>View</span>
                      </button>
                      <button
                        onClick={() => openEditModal(expense)}
                        className="flex-1 flex items-center justify-center space-x-1 px-3 py-1.5 text-sm text-blue-700 bg-blue-100 hover:bg-blue-200 rounded transition-colors"
                      >
                        <Edit2 className="h-4 w-4" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => openDeleteModal(expense)}
                        className="flex-1 flex items-center justify-center space-x-1 px-3 py-1.5 text-sm text-red-700 bg-red-100 hover:bg-red-200 rounded transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modals */}
      {showAddModal && (
        <AddExpenseModal
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddExpense}
        />
      )}

      {showEditModal && selectedExpense && (
        <EditExpenseModal
          expense={selectedExpense}
          onClose={() => {
            setShowEditModal(false);
            setSelectedExpense(null);
          }}
          onSubmit={(data: { amount: number; category: string; description: string }) => handleEditExpense(selectedExpense.id, data)}
        />
      )}

      {showDeleteModal && selectedExpense && (
        <DeleteConfirmModal
          expense={selectedExpense}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedExpense(null);
          }}
          onConfirm={() => handleDeleteExpense(selectedExpense.id)}
        />
      )}

      {showDetailModal && selectedExpense && (
        <ExpenseDetailModal
          expense={selectedExpense}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedExpense(null);
          }}
          onEdit={() => {
            setShowDetailModal(false);
            openEditModal(selectedExpense);
          }}
          onDelete={() => {
            setShowDetailModal(false);
            openDeleteModal(selectedExpense);
          }}
        />
      )}

      {/* Story Modal */}
      {showStoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                  <Sparkles className="h-6 w-6 text-purple-600" />
                  <span>Your Expense Story</span>
                </h2>
                <button
                  onClick={() => setShowStoryModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {loadingStory ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
                  <p className="text-gray-600">Crafting your unique expense story...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
                    <p className="text-lg text-gray-800 leading-relaxed whitespace-pre-wrap">
                      {story}
                    </p>
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={handleGenerateStory}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Generate New Story
                    </button>
                    <button
                      onClick={() => setShowStoryModal(false)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
