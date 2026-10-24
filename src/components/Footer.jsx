'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Heart } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith('/invite/')) {
    return null;
  }

  return (
    <footer className="bg-sand-100/80 border-t border-sand-300 text-espresso/80 py-14 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        <div>
          <div className="flex items-center justify-center md:justify-start gap-2.5 mb-2">
            <div className="w-6 h-6 rounded-full bg-sand-200 border border-sand-300 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-olive" />
            </div>
            <span className="font-serif font-bold text-base text-espresso tracking-tight">
              DAWATNAMA ATELIER
            </span>
          </div>
          <p className="font-sans text-xs text-espresso/70 max-w-md leading-relaxed">
            A contemporary digital invitation studio celebrating weddings, Nikkahs, Mehndis, birthdays, anniversaries, and cherished occasions.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-sans uppercase tracking-wider text-espresso/80">
          <Link href="/templates" className="hover:text-espresso font-medium transition-colors">
            Template Catalog
          </Link>
          <Link href="/create" className="hover:text-espresso font-medium transition-colors">
            Create Studio
          </Link>
          <Link href="/dashboard" className="hover:text-espresso font-medium transition-colors">
            My Invitations
          </Link>
        </div>

        <div className="text-center md:text-right">
          <p className="text-[12px] font-sans text-espresso/70 flex items-center justify-center md:justify-end gap-1.5">
            Designed for unforgettable life celebrations
          </p>
          <p className="text-[11px] font-sans text-espresso/50 uppercase tracking-widest mt-1">
            © {new Date().getFullYear()} Dawatnama Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
