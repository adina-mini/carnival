'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Copy,
  Check,
  Share2,
  ExternalLink,
  MessageCircle,
  X,
  Sparkles
} from 'lucide-react';

export default function PublishModal({ isOpen, onClose, invitationId, invitationTitle }) {
  const [copied, setCopied] = useState(false);
  const [inviteUrl, setInviteUrl] = useState('');

  useEffect(() => {
    if (isOpen && typeof window !== 'undefined') {
      const origin = window.location.origin;
      const url = `${origin}/invite/${invitationId}`;
      setInviteUrl(url);

      // Trigger celebratory confetti burst
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#7E1727', '#FAF5EF', '#CE2672'],
        });
      } catch (e) {}
    }
  }, [isOpen, invitationId]);

  if (!isOpen) return null;

  const handleCopy = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(inviteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `✨ You are cordially invited to celebrate with us!\n\nView our personalized digital invitation here:\n${inviteUrl}`
  );
  const whatsappUrl = `https://wa.me/?text=${whatsappMessage}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg bg-paper border border-sand-300 rounded-3xl shadow-2xl p-6 sm:p-8 text-espresso text-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-espresso/60 hover:text-espresso hover:bg-sand-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Celebration Badge */}
        <div className="w-14 h-14 rounded-full bg-sand-100 border border-sand-300 text-olive flex items-center justify-center mx-auto mb-4 shadow-xs">
          <Sparkles className="w-7 h-7" />
        </div>

        <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-olive block mb-1">
          Published Successfully
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-espresso mb-2">
          Your Digital Invitation Is Live
        </h2>
        <p className="font-sans text-xs sm:text-sm text-espresso/70 max-w-sm mx-auto mb-6 leading-relaxed">
          Your personalized invitation has been published and is ready to be shared with family and guests.
        </p>

        {/* Shareable Link Box */}
        <div className="p-3.5 rounded-2xl bg-sand-50 border border-sand-300 flex items-center justify-between gap-2 mb-5">
          <span className="font-mono text-xs text-espresso/90 truncate select-all text-left">
            {inviteUrl}
          </span>
          <button
            onClick={handleCopy}
            className="flex-shrink-0 px-3 py-1.5 rounded-xl bg-espresso hover:bg-espresso-dark text-paper font-sans text-xs font-medium uppercase tracking-wider flex items-center gap-1.5 shadow-xs transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* Share on WhatsApp */}
          <a
            id="publish-whatsapp-btn"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white font-sans text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-98"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Share on WhatsApp</span>
          </a>

          {/* Open Live Invitation */}
          <a
            id="publish-open-live-btn"
            href={inviteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 rounded-xl bg-sand-100 hover:bg-sand-200 border border-sand-300 text-espresso font-sans text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
          >
            <ExternalLink className="w-4 h-4 text-olive" />
            <span>Open Live Invitation</span>
          </a>
        </div>

        <div className="mt-6 pt-4 border-t border-sand-200">
          <p className="text-[11px] font-sans text-espresso/60">
            You can return to edit or manage your invitation anytime from your dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}
