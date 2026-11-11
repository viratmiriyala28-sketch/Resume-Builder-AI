'use client';

import React, { useState, KeyboardEvent } from 'react';
import { X, Plus } from 'lucide-react';

interface TagInputProps {
  label: string;
  placeholder?: string;
  tags: string[];
  onChange: (tags: string[]) => void;
  helperText?: string;
}

export default function TagInput({
  label,
  placeholder = 'Type and press Enter...',
  tags,
  onChange,
  helperText,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed]);
      setInputValue('');
    }
  };

  const removeTag = (indexToRemove: number) => {
    onChange(tags.filter((_, i) => i !== indexToRemove));
  };

  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-slate-700">{label}</label>
      <div className="flex flex-wrap items-center gap-1.5 p-2 bg-white border border-slate-200 rounded-lg focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 min-h-[42px] transition-all">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200/60 rounded-md"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(idx)}
              className="text-indigo-400 hover:text-indigo-800 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addTag}
          placeholder={tags.length === 0 ? placeholder : ''}
          className="flex-grow min-w-[120px] text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none bg-transparent"
        />
      </div>
      {helperText && <p className="text-[11px] text-slate-500">{helperText}</p>}
    </div>
  );
}
