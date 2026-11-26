'use client';

import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

export default function FamilyContactBar({ contacts = [] }) {
  if (!contacts || contacts.length === 0) return null;

  return (
    <section className="py-10 px-4 sm:px-6 bg-[#f7f2ea] text-espresso border-t border-sand-300">
      <div className="max-w-md mx-auto text-center">
        <span className="font-sans text-[11px] tracking-[0.25em] uppercase text-olive font-semibold block mb-1">
          Direct Inquiries &amp; Coordination
        </span>
        <h3 className="font-serif text-2xl font-bold text-espresso mb-6">
          Family Contacts
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {contacts.map((c, idx) => {
            if (!c?.phone) return null;
            const rawPhone = c.phone.replace(/[^0-9+]/g, '');
            const waNumber = rawPhone.startsWith('0') ? `92${rawPhone.slice(1)}` : rawPhone.replace(/^\+/, '');

            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-paper border border-sand-300 shadow-xs flex flex-col items-center justify-between"
              >
                <div className="mb-3 text-center">
                  <p className="font-serif text-lg font-bold text-espresso">
                    {c.phone}
                  </p>
                  <p className="font-sans text-xs text-espresso/60 italic mt-0.5">
                    {c.name || 'Family Contact'}
                  </p>
                </div>

                <div className="flex items-center gap-2 w-full">
                  <a
                    href={`tel:${rawPhone}`}
                    className="flex-1 py-2 rounded-xl bg-espresso hover:bg-espresso-dark text-paper text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call</span>
                  </a>

                  <a
                    href={`https://wa.me/${waNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-current" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
