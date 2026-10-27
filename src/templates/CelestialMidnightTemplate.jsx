'use client';

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  CalendarPlus,
  MapPin,
  Navigation,
  Clock,
  Gift,
  Volume2,
  VolumeX,
  X,
  CheckCircle2
} from 'lucide-react';
import { submitRsvp } from '@/lib/supabase';

export default function CelestialMidnightTemplate({ data, isSample = false, invitationId }) {
  const honoreeName = data?.bride_name || data?.honoree_name || "Aria Noor";
  const eventTitle = data?.event_title || "30th Birthday Gala Celebration";
  const eventDateIso = data?.event_date_iso || "2026-12-18T20:30:00";
  const eventDateDisplay = data?.event_date_display || "Friday • December 18, 2026";
  const eventTimeDisplay = data?.event_time_display || "Half Past Eight in the Evening";
  const cityDisplay = data?.city_display || "Karachi, Pakistan";
  const venueName = data?.venue_name || "The Sky Lounge & Rooftop";
  const venueAddress = data?.venue_address || "Clifton Block 4, Oceanfront, Karachi";
  const venueMapUrl = data?.venue_map_url || "https://maps.google.com/?q=Clifton+Karachi";
  const hashtag = data?.hashtag || "#ARIACHAPTER30";

  const heroImage = data?.hero_image || "/assets/couple-hero.jpg";
  const venueImage = data?.venue_image || "/assets/birthday-venue-stage.jpg";

  const schedule = data?.schedule || [
    { time: "8:30 PM", tag: "Arrival", title: "Red Carpet & Starlight Cocktails", desc: "Arrival of guests with sparkling beverages and live saxophone." },
    { time: "9:30 PM", tag: "Toast", title: "Celebration Toasts & Video Tribute", desc: "Heartwarming speeches, milestones reel, and champagne toast." },
    { time: "10:15 PM", tag: "Cake", title: "Midnight Cake Cutting & Sparklers", desc: "Gather around for the grand cake reveal and sparklers." },
    { time: "11:00 PM", tag: "Gala", title: "Midnight Gourmet Buffet & Dance Floor", desc: "Eclectic culinary feast and lively rooftop music under the stars." },
  ];

  const [timeLeft, setTimeLeft] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [rsvpForm, setRsvpForm] = useState({ name: '', guests: '1' });
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    function calculateCountdown() {
      const target = new Date(eventDateIso).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
        return;
      }

      setTimeLeft({
        days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, '0'),
        hours: String(Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0'),
        minutes: String(Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0'),
        seconds: String(Math.floor((difference % (1000 * 60)) / 1000)).padStart(2, '0'),
      });
    }

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, [eventDateIso]);

  return (
    <div className="bg-[#030611] text-gray-100 antialiased font-sans min-h-screen overflow-x-hidden relative selection:bg-champagne-500 selection:text-black">

      {isSample && (
        <div className="sticky top-0 z-40 bg-midnight-900/90 backdrop-blur-md border-b border-champagne-500/30 text-champagne-300 text-center py-2 px-4 text-xs font-cinzel tracking-wider">
          ✨ Sample Template Showcase &bull; Celestial Midnight Birthday &amp; Gala
        </div>
      )}

      <main className="relative z-10 w-full min-h-screen py-0 sm:py-10 flex justify-center items-start">
        <div className="w-full sm:max-w-[460px] bg-gradient-to-b from-[#091024] via-[#060B18] to-[#040711] text-gray-100 sm:rounded-[36px] shadow-[0_25px_90px_rgba(0,0,0,0.95)] border-0 sm:border border-champagne-500/40 overflow-hidden relative">

          {/* Starlight Border Inset */}
          <div className="absolute inset-2 sm:inset-3 border border-champagne-500/30 rounded-t-[160px] rounded-b-[28px] pointer-events-none z-10" />

          {/* HEADER */}
          <header className="relative pt-12 pb-8 px-6 text-center">
            <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-champagne-500/10 border border-champagne-500/40 text-champagne-300 text-[10px] font-cinzel uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Special Milestone Celebration
            </div>

            <p className="font-cinzel text-xs tracking-[0.25em] uppercase text-champagne-400 mb-2 font-medium">
              You are Cordially Invited to Celebrate
            </p>

            <h1 className="font-script text-5xl sm:text-6xl text-champagne-200 leading-tight my-2 drop-shadow-[0_2px_12px_rgba(212,175,55,0.4)]">
              {honoreeName}
            </h1>

            <p className="font-serif italic text-base text-gray-300 mb-4">
              {eventTitle}
            </p>

            {/* Photo (Arched Oval Silhouette Frame) */}
            {heroImage && (
              <div className="relative w-64 sm:w-72 mx-auto my-6 rounded-t-full rounded-b-2xl border-2 border-champagne-500/50 p-2 shadow-2xl bg-white/5 backdrop-blur-sm">
                <div className="w-full aspect-[4/5] rounded-t-full rounded-b-xl overflow-hidden relative">
                  <img src={heroImage} alt={honoreeName} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 rounded-t-full rounded-b-xl ring-1 ring-inset ring-champagne-500/30 pointer-events-none" />
                </div>
              </div>
            )}

            <div className="inline-block px-5 py-2 rounded-full bg-champagne-500 text-midnight-950 font-cinzel text-xs uppercase font-bold tracking-widest shadow-lg">
              {eventDateDisplay}
            </div>
            <p className="font-sans text-xs text-champagne-300/80 mt-2">
              {eventTimeDisplay} &bull; {cityDisplay}
            </p>
          </header>

          {/* COUNTDOWN */}
          <section className="py-6 px-6 text-center border-y border-champagne-500/20 bg-white/[0.02]">
            <span className="font-cinzel text-[10px] tracking-widest uppercase text-champagne-400 block mb-3">
              Counting Down To The Midnight Hour
            </span>
            <div className="grid grid-cols-4 gap-2 text-center max-w-xs mx-auto">
              <div className="bg-white/5 border border-champagne-500/30 p-3 rounded-xl">
                <span className="font-serif text-2xl font-bold text-champagne-200">{timeLeft.days}</span>
                <span className="font-cinzel text-[9px] uppercase block text-gray-400">Days</span>
              </div>
              <div className="bg-white/5 border border-champagne-500/30 p-3 rounded-xl">
                <span className="font-serif text-2xl font-bold text-champagne-200">{timeLeft.hours}</span>
                <span className="font-cinzel text-[9px] uppercase block text-gray-400">Hours</span>
              </div>
              <div className="bg-white/5 border border-champagne-500/30 p-3 rounded-xl">
                <span className="font-serif text-2xl font-bold text-champagne-200">{timeLeft.minutes}</span>
                <span className="font-cinzel text-[9px] uppercase block text-gray-400">Mins</span>
              </div>
              <div className="bg-white/5 border border-champagne-500/30 p-3 rounded-xl">
                <span className="font-serif text-2xl font-bold text-champagne-400">{timeLeft.seconds}</span>
                <span className="font-cinzel text-[9px] uppercase block text-gray-400">Secs</span>
              </div>
            </div>
          </section>

          {/* PROGRAM */}
          <section className="py-8 px-6">
            <h2 className="font-serif text-2xl text-champagne-200 text-center mb-6">Evening Itinerary</h2>
            <div className="space-y-4">
              {schedule.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white/5 border border-champagne-500/20 shadow-sm">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-cinzel text-xs font-bold text-champagne-400">{item.time}</span>
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-champagne-500/20 text-champagne-300 font-sans">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="font-serif text-base font-semibold text-gray-100">{item.title}</h3>
                  <p className="font-sans text-xs text-gray-400 mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* VENUE */}
          <section className="py-6 px-6">
            <div className="bg-white/5 rounded-2xl border border-champagne-500/30 overflow-hidden">
              {venueImage && (
                <div className="h-44 bg-black relative">
                  <img src={venueImage} alt={venueName} className="w-full h-full object-cover opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#091024] to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="font-serif text-xl text-champagne-200 font-bold">{venueName}</h3>
                  </div>
                </div>
              )}
              <div className="p-4 space-y-3">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-5 h-5 text-champagne-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-300">{venueAddress}</p>
                </div>
                <a
                  href={venueMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-champagne-500 hover:bg-champagne-400 text-midnight-950 font-cinzel text-xs font-bold uppercase tracking-wider py-3 rounded-xl transition-all"
                >
                  <Navigation className="w-4 h-4 text-midnight-950" />
                  Open in Google Maps
                </a>
              </div>
            </div>
          </section>

          {/* RSVP BANNER */}
          <section className="py-8 px-6 text-center bg-gradient-to-b from-white/5 to-white/10">
            <h2 className="font-serif text-2xl text-champagne-200 mb-1">Will You Be Joining?</h2>
            <p className="font-sans text-xs text-gray-400 mb-5">
              Please RSVP by 10th December to confirm your VIP seat.
            </p>
            <button
              onClick={() => setRsvpOpen(true)}
              className="w-full py-3 rounded-xl bg-champagne-500 hover:bg-champagne-400 text-midnight-950 font-cinzel text-xs font-bold uppercase tracking-widest shadow-xl transition-transform active:scale-95"
            >
              Confirm Attendance
            </button>
          </section>

          {/* FOOTER */}
          <footer className="py-8 px-6 text-center border-t border-champagne-500/20">
            <p className="font-script text-3xl text-champagne-300 mb-1">
              {honoreeName}
            </p>
            <p className="font-cinzel text-[10px] tracking-widest text-gray-400 uppercase">
              {hashtag}
            </p>
          </footer>
        </div>
      </main>

      {/* RSVP MODAL */}
      {rsvpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-sm bg-midnight-900 rounded-3xl border border-champagne-500/50 p-6 text-white shadow-2xl">
            <button onClick={() => setRsvpOpen(false)} className="absolute top-4 right-4 p-1 text-gray-400">
              <X className="w-5 h-5" />
            </button>
            {rsvpSubmitted ? (
              <div className="text-center py-6">
                <CheckCircle2 className="w-12 h-12 text-champagne-400 mx-auto mb-2" />
                <h3 className="font-serif text-xl text-champagne-200">You Are on the Guestlist!</h3>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-bold text-center text-champagne-200">RSVP Confirmation</h3>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={rsvpForm.name}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, name: e.target.value })}
                    placeholder="e.g. Maya Ali"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-champagne-500/40 bg-white/5 text-white focus:outline-none"
                  />
                </div>
                <button
                  onClick={async () => {
                    setRsvpSubmitted(true);
                    try {
                      if (invitationId) {
                        await submitRsvp({
                          invitation_id: invitationId,
                          guest_name: rsvpForm.name || 'Anonymous Guest',
                          attendance: 'attending',
                          guest_count: 1,
                        });
                      }
                    } catch (err) {
                      console.error('RSVP submit error:', err);
                    }
                    setTimeout(() => { setRsvpOpen(false); setRsvpSubmitted(false); }, 2000);
                  }}
                  className="w-full py-3 rounded-xl bg-champagne-500 text-midnight-950 font-cinzel text-xs font-bold uppercase tracking-wider"
                >
                  Confirm RSVP
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* AUDIO TOGGLE */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="fixed bottom-5 right-5 z-40 p-3 rounded-full bg-midnight-900 text-champagne-300 border border-champagne-500/40 shadow-xl"
      >
        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </button>

    </div>
  );
}
