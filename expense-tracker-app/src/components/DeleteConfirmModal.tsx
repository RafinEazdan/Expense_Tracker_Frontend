import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import type { Expense } from '../lib/api';

interface DeleteConfirmModalProps {
  expense: Expense;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ expense, onClose, onConfirm }) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="bg-red-100 rounded-full p-3">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Delete Expense
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to delete this expense?
            </p>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xl font-bold text-gray-900">
                  ৳{expense.amount.toFixed(2)}
                </span>
                <span className="px-2 py-1 text-xs font-medium text-primary-700 bg-primary-100 rounded-full">
                  {expense.category}
                </span>
              </div>
              {expense.description && (
                <p className="text-sm text-gray-600 line-clamp-2">
                  {expense.description}
                </p>
              )}
            </div>

            <p className="text-sm text-red-600 mb-6">
              This action cannot be undone.
            </p>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
