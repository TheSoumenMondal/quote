import { useState, useEffect, type ChangeEvent } from 'react';
import axios from 'axios';
import QuoteCard from './components/QuoteCard';
import type { Quote, QuotesApiResponse } from './types';

const App = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(9);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const loadQuotes = async () => {
      setLoading(true);
      try {
        const response = await axios.get<QuotesApiResponse>('https://api.freeapi.app/api/v1/public/quotes', {
          params: { page, limit },
        });
        if (response.data && response.data.success) {
          setQuotes(response.data.data.data || []);
          setTotalPages(response.data.data.totalPages || 0);
        } else {
          setError('Failed to fetch quotes');
        }
      } catch (err) {
        setError('Error connecting to the API');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadQuotes();
  }, [page, limit]);

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages || p + 1, p + 1));
  const handleLimitChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] p-8 md:p-16">
      <div className="max-w-350 mx-auto">
        {loading ? (
          <div className="flex justify-center items-center h-[50vh]">
            <div className="text-xl text-gray-500 font-medium animate-pulse">Loading quotes...</div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-[50vh]">
            <div className="text-xl text-red-500 font-medium">{error}</div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {quotes.map((quote) => (
                <QuoteCard 
                  key={quote.id}
                  quote={quote} 
                />
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600">Quotes per page:</label>
                <select value={limit} onChange={handleLimitChange} className="border rounded px-2 py-1">
                  <option value={6}>6</option>
                  <option value={9}>9</option>
                  <option value={12}>12</option>
                  <option value={18}>18</option>
                </select>
              </div>

              <div className="flex items-center gap-3">
                <button onClick={handlePrev} disabled={page <= 1} className="px-3 py-1 bg-white rounded shadow disabled:opacity-50">
                  Prev
                </button>

                <div className="text-sm text-gray-700">Page {page} of {totalPages || 1}</div>

                <button onClick={handleNext} disabled={totalPages ? page >= totalPages : false} className="px-3 py-1 bg-white rounded shadow disabled:opacity-50">
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;