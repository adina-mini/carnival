'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sparkles,
  Layers,
  PlusCircle,
  BookmarkCheck,
  User,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const pathname = usePathname();
  const { user, openAuthModal, signOut } = useAuth();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const isInvitePage = pathname?.startsWith('/invite/');

  // Don't clutter the clean immersive guest invitation view with the platform navbar
  if (isInvitePage) {
    return null;
  }

  const userDisplayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Host';
  const userInitial = userDisplayName.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur-md border-b border-sand-300 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 py-3 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-full bg-sand-100 border border-sand-300 flex items-center justify-center shadow-xs group-hover:border-olive transition-colors">
            <Sparkles className="w-4 h-4 text-olive" />
          </div>
          <div>
            <span className="font-serif font-bold text-lg text-espresso tracking-tight block leading-tight">
              DAWATNAMA
            </span>
            <span className="text-[10px] font-sans uppercase tracking-[0.18em] text-olive font-medium block">
              Invitation Studio
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/templates"
            className={`text-xs font-sans tracking-wide uppercase transition-colors flex items-center gap-1.5 ${
              pathname === '/templates'
                ? 'text-espresso font-semibold border-b border-espresso pb-0.5'
                : 'text-espresso/70 hover:text-espresso font-medium'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-olive" />
            Template Gallery
          </Link>
          <Link
            href="/create"
            className={`text-xs font-sans tracking-wide uppercase transition-colors flex items-center gap-1.5 ${
              pathname === '/create'
                ? 'text-espresso font-semibold border-b border-espresso pb-0.5'
                : 'text-espresso/70 hover:text-espresso font-medium'
            }`}
          >
            <PlusCircle className="w-3.5 h-3.5 text-olive" />
            Create Studio
          </Link>
          <Link
            href="/dashboard"
            className={`text-xs font-sans tracking-wide uppercase transition-colors flex items-center gap-1.5 ${
              pathname === '/dashboard'
                ? 'text-espresso font-semibold border-b border-espresso pb-0.5'
                : 'text-espresso/70 hover:text-espresso font-medium'
            }`}
          >
            <BookmarkCheck className="w-3.5 h-3.5 text-olive" />
            My Invitations
          </Link>
        </nav>

        {/* Right Action & Auth Controls */}
        <div className="flex items-center gap-3">
          {user ? (
            /* User Signed In Dropdown */
            <div className="relative">
              <button
                id="nav-user-dropdown-btn"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 py-1.5 px-3 rounded-full bg-sand-100 border border-sand-300 hover:border-olive transition-colors text-espresso text-xs font-medium cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-olive text-paper flex items-center justify-center font-bold text-[11px]">
                  {userInitial}
                </div>
                <span className="hidden sm:inline max-w-[110px] truncate">
                  {userDisplayName}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-espresso/60" />
              </button>

              {userDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setUserDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-paper border border-sand-300 shadow-xl py-2 z-50 text-espresso animate-in fade-in zoom-in-95 duration-100">
                    <div className="px-4 py-2 border-b border-sand-200">
                      <p className="font-serif text-xs font-bold text-espresso truncate">
                        {userDisplayName}
                      </p>
                      <p className="font-sans text-[11px] text-espresso/60 truncate">
                        {user.email}
                      </p>
                    </div>

                    <Link
                      id="nav-dropdown-dashboard-link"
                      href="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-espresso hover:bg-sand-100 transition-colors font-medium"
                    >
                      <BookmarkCheck className="w-4 h-4 text-olive" />
                      <span>My Invitations & RSVPs</span>
                    </Link>

                    <Link
                      id="nav-dropdown-create-link"
                      href="/create"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-espresso hover:bg-sand-100 transition-colors font-medium"
                    >
                      <PlusCircle className="w-4 h-4 text-olive" />
                      <span>Create New Invitation</span>
                    </Link>

                    <div className="border-t border-sand-200 my-1" />

                    <button
                      id="nav-signout-btn"
                      onClick={() => {
                        setUserDropdownOpen(false);
                        signOut();
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-red-700 hover:bg-red-50 transition-colors font-medium text-left cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 text-red-600" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            /* User Signed Out: Sign In Trigger */
            <button
              id="nav-signin-btn"
              onClick={() => openAuthModal({ title: 'Sign In to Dawatnama' })}
              className="px-4 py-2 rounded-full border border-sand-300 bg-sand-50 hover:bg-sand-100 text-espresso font-sans text-xs font-medium transition-colors cursor-pointer"
            >
              Sign In
            </button>
          )}

          {/* Primary Create Button */}
          <Link
            id="nav-create-btn"
            href="/create"
            className="px-4 sm:px-5 py-2.5 rounded-full bg-espresso hover:bg-espresso-dark text-paper font-sans text-xs font-medium tracking-wide shadow-sm hover:shadow transition-all active:scale-98 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-sand-300" />
            <span className="hidden sm:inline">Create Invitation</span>
            <span className="sm:hidden">Create</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
