import React from 'react';
import type { Quote } from '../types';

interface QuoteCardProps {
  quote: Quote;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote }) => {
  return (
    <div className="bg-white rounded-[2.5rem] p-10 max-w-md w-full h-full flex flex-col shadow-[0_8px_40px_rgba(0,0,0,0.04)] font-sans mx-auto transition-all hover:shadow-[0_12px_50px_rgba(0,0,0,0.08)]">
      <div className="grow">
        <h2 className="text-[1.8rem] font-medium text-[#1A1A1A] leading-[1.3] tracking-tight">
          {quote.content}
        </h2>
      </div>

      <div className="mt-auto pt-6 mb-2">
        <p className="text-[1.35rem] text-[#888888] font-normal">
          {quote.author}
        </p>
      </div>
    </div>
  );
};

export default QuoteCard;