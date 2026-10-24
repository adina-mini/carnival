'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Layers } from 'lucide-react';
import { getAllTemplates, getCategories } from '@/templates/registry';

export default function TemplatesDirectoryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const allTemplates = getAllTemplates();
  const categories = getCategories();

  const filteredTemplates = selectedCategory === 'all'
    ? allTemplates
    : allTemplates.filter((t) => t.category === selectedCategory);

  return (
    <div className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="text-center mb-14">
        <span className="font-sans text-xs tracking-[0.25em] uppercase text-olive font-semibold block mb-2">
          Design Directory
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-normal text-espresso mb-4">
          All Invitation Suites
        </h1>
        <p className="font-sans text-sm sm:text-base text-espresso/70 max-w-lg mx-auto leading-relaxed">
          Choose a handcrafted suite that captures the emotion, mood, and elegance of your celebration.
        </p>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2 rounded-full font-sans text-xs tracking-wider uppercase transition-all ${
                selectedCategory === cat.id
                  ? 'bg-espresso text-paper font-semibold shadow-xs'
                  : 'bg-paper text-espresso/70 hover:text-espresso hover:bg-sand-100 border border-sand-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="group rounded-3xl bg-paper border border-sand-300/80 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between h-full"
          >
            <div>
              <div className="relative h-72 sm:h-80 overflow-hidden bg-sand-200/50">
                <img
                  src={template.thumbnail}
                  alt={template.name}
                  className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent opacity-30" />
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1 rounded-full bg-paper/95 backdrop-blur-md border border-sand-300 text-[11px] font-sans uppercase tracking-wider text-espresso font-semibold shadow-xs">
                    {template.categoryLabel}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-serif text-xl font-bold text-espresso mb-2 group-hover:text-burgundy transition-colors">
                  {template.name}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-espresso/70 line-clamp-3 leading-relaxed mb-4">
                  {template.description}
                </p>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-sans uppercase tracking-wider text-espresso/60 font-medium">
                    Palette:
                  </span>
                  <div className="flex items-center gap-1.5">
                    {template.palette.map((hex, i) => (
                      <span
                        key={i}
                        className="w-3.5 h-3.5 rounded-full border border-sand-300 shadow-2xs"
                        style={{ backgroundColor: hex }}
                        title={`Color ${hex}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 space-y-2.5">
              <Link
                href={`/create?template=${template.id}`}
                className="w-full py-2.5 rounded-xl bg-espresso hover:bg-espresso-dark text-paper font-sans text-xs font-semibold uppercase tracking-wider text-center block shadow-xs transition-all active:scale-98"
              >
                Customize This Design
              </Link>
              <Link
                href={`/create?template=${template.id}#sample`}
                className="w-full py-2 rounded-xl bg-sand-100 hover:bg-sand-200 border border-sand-300 text-espresso font-sans text-xs font-medium uppercase tracking-wider text-center block transition-all"
              >
                View Sample Showcase
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
