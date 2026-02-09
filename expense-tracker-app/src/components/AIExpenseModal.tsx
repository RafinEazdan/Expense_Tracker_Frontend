import React, { useState } from 'react';
import { X, Sparkles, Zap, Loader2 } from 'lucide-react';

interface AIExpenseModalProps {
  onClose: () => void;
  onSubmit: (query: string) => Promise<void>;
}

const AIExpenseModal: React.FC<AIExpenseModalProps> = ({ onClose, onSubmit }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const examples = [
    "I spent $50 on groceries today",
    "Paid $120 for electricity bill",
    "Bought a new laptop for $800",
    "Dinner at restaurant cost me $45",
    "Monthly gym membership $30"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) {
      return;
    }

    setLoading(true);
    try {
      await onSubmit(query.trim());
      setQuery('');
    } catch (error) {
      // Error handling is done in parent component
    } finally {
      setLoading(false);
    }
  };

  const handleExampleClick = (example: string) => {
    setQuery(example);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 bg-gradient-to-r from-purple-50 to-blue-50">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">AI Expense Assistant</h2>
              <p className="text-sm text-gray-600">Describe your expense in natural language</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-gray-400 transition-colors hover:bg-white hover:text-gray-600"
            disabled={loading}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            {/* Info Banner */}
            <div className="flex items-start space-x-3 rounded-lg bg-blue-50 p-4 border border-blue-200">
              <Zap className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Just tell me what you spent!</p>
                <p className="text-blue-700">
                  I'll automatically extract the amount, category, and description from your message.
                </p>
              </div>
            </div>

            {/* Input Field */}
            <div>
              <label htmlFor="query" className="block text-sm font-medium text-gray-700 mb-2">
                Describe your expense
              </label>
              <textarea
                id="query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="E.g., I spent $25 on lunch at a cafe"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
                rows={3}
                disabled={loading}
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                {query.length}/500 characters
              </p>
            </div>

            {/* Examples Section */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                Try these examples:
              </p>
              <div className="flex flex-wrap gap-2">
                {examples.map((example, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleExampleClick(example)}
                    className="text-sm px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 hover:bg-purple-100 hover:text-purple-700 transition-colors border border-gray-200 hover:border-purple-300"
                    disabled={loading}
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>

            {/* Note */}
            <div className="text-xs text-gray-500 bg-gray-50 rounded-lg p-3 border border-gray-200">
              <p className="font-medium text-gray-700 mb-1">💡 How it works:</p>
              <p>Our AI will analyze your message and automatically create an expense entry with the appropriate amount, category, and description.</p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center space-x-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-2 text-sm font-medium text-white transition-all hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
              disabled={loading || !query.trim()}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Create Expense with AI</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AIExpenseModal;
