import React from 'react';
import { X, Edit2, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import type { Expense } from '../lib/api';

interface ExpenseDetailModalProps {
  expense: Expense;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const ExpenseDetailModal: React.FC<ExpenseDetailModalProps> = ({
  expense,
  onClose,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Expense Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Amount */}
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Amount</p>
            <p className="text-4xl font-bold text-gray-900">
              ৳{expense.amount.toFixed(2)}
            </p>
          </div>

          {/* Category */}
          <div>
            <p className="text-sm text-gray-600 mb-2">Category</p>
            <span className="inline-block px-3 py-1.5 text-sm font-medium text-primary-700 bg-primary-100 rounded-full">
              {expense.category}
            </span>
          </div>

          {/* Description */}
          {expense.description && (
            <div>
              <p className="text-sm text-gray-600 mb-2">Description</p>
              <p className="text-gray-900 whitespace-pre-wrap">
                {expense.description}
              </p>
            </div>
          )}

          {/* Date */}
          <div>
            <p className="text-sm text-gray-600 mb-2">Date</p>
            <p className="text-gray-900">
              {format(new Date(expense.created_at), 'EEEE, MMMM d, yyyy')}
            </p>
            <p className="text-sm text-gray-500">
              {format(new Date(expense.created_at), 'h:mm a')}
            </p>
          </div>

          {/* ID */}
          <div>
            <p className="text-sm text-gray-600 mb-2">Expense ID</p>
            <p className="text-sm text-gray-500">#{expense.id}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4 border-t border-gray-200">
            <button
              onClick={onEdit}
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Edit2 className="h-4 w-4" />
              <span>Edit</span>
            </button>
            <button
              onClick={onDelete}
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              <span>Delete</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseDetailModal;
