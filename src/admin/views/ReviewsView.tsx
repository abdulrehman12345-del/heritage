import React, { useState } from 'react';
import { Star, Check, Trash2, ShieldCheck } from 'lucide-react';
import { Review } from '../types';

interface ReviewsViewProps {
  reviews: Review[];
  onApproveReview: (id: string) => void;
  onDeleteReview: (id: string) => void;
}

export const ReviewsView: React.FC<ReviewsViewProps> = ({ reviews, onApproveReview, onDeleteReview }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-[#FFFDF8] p-6 rounded-[24px] border border-[#B68D40]/20 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#2B2622] flex items-center gap-2">
            <Star className="w-6 h-6 text-[#B68D40]" />
            Collector Endorsements & Reviews
          </h1>
          <p className="text-xs text-[#6A6158]">
            Moderate verified buyer feedback, museum curator statements, and auction endorsements
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((r) => (
          <div key={r.id} className="bg-[#FFFDF8] p-6 rounded-[24px] border border-[#B68D40]/20 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-serif font-bold text-base text-[#2B2622]">{r.authorName}</h3>
                <p className="text-xs text-[#6A6158]">{r.authorTitle} • {r.artifactTitle}</p>
              </div>

              <div className="flex items-center gap-1 text-[#B68D40]">
                {[...Array(r.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#B68D40]" />
                ))}
              </div>
            </div>

            <p className="text-xs text-[#2B2622] italic font-serif leading-relaxed">"{r.comment}"</p>

            <div className="flex items-center justify-between text-xs pt-2 border-t border-[#B68D40]/15">
              <span className="text-[10px] text-[#6A6158] font-mono">{r.date}</span>

              <div className="flex items-center gap-2">
                {r.status === 'Pending' && (
                  <button
                    onClick={() => onApproveReview(r.id)}
                    className="px-3 py-1 rounded-full bg-[#2F855A] text-white text-[10px] font-bold uppercase"
                  >
                    Approve & Publish
                  </button>
                )}
                <button
                  onClick={() => onDeleteReview(r.id)}
                  className="p-1.5 text-[#B83A3A] hover:bg-[#B83A3A] hover:text-white rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
