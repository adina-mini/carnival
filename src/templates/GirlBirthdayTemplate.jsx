'use client';

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Cake,
  CalendarPlus,
  MapPin,
  Navigation,
  Heart,
  Volume2,
  VolumeX,
  X,
  CheckCircle2,
  Gift,
  Camera
} from 'lucide-react';
import { submitRsvp } from '@/lib/supabase';

export default function GirlBirthdayTemplate({ data, isSample = false, invitationId }) {
  const honoreeName = data?.bride_name || data?.honoree_name || "Dua Fatima";
  const eventTitle = data?.event_title || "21st Birthday Soirée & High Tea";
  const eventSubtitle = data?.event_subtitle || "A Year Older, A Year Lovelier";
  const eventDateIso = data?.event_date_iso || "2026-11-20T17:00:00";
  const eventDateDisplay = data?.event_date_display || "Friday • November 20, 2026";
  const eventTimeDisplay = data?.event_time_display || "Five O'Clock in the Evening";
  const cityDisplay = data?.city_display || "Lahore, Pakistan";
  const venueName = data?.venue_name || "The Glasshouse Garden Lounge";
  const venueAddress = data?.venue_address || "Block H, Gulberg III, Lahore, Pakistan";
  const venueMapUrl = data?.venue_map_url || "https://maps.google.com/?q=Gulberg+Lahore";
  const hashtag = data?.hashtag || "#DUATURNS21";

  // Dedicated artwork slot
  const heroImage = data?.hero_image || "/assets/girl-birthday.jpg";
  const venueImage = data?.venue_image || "/assets/birthday-venue-stage.jpg";

  const schedule = data?.schedule || [
    { time: "5:00 PM", tag: "Arrival", title: "Pink Blossom Mocktails & Polaroids", desc: "Arrive and grab sparkling berry spritzers, snap vintage polaroids at the flower wall." },
    { time: "6:00 PM", tag: "Make a Wish", title: "Cake Cutting & Fairy Sparklers", desc: "Gather around as the candles are lit, make a heartfelt wish, and ignite golden sparklers." },
    { time: "6:45 PM", tag: "High Tea", title: "Gourmet Grazing & Sweet Delights", desc: "French macarons, artisanal finger sandwiches, strawberry tarts, and pink lemonade." },
    { time: "8:00 PM", tag: "Celebration", title: "Music, Birthday Toasts & Dancing", desc: "Celebratory speeches, memory book signing, and dancing to favorite indie acoustic tracks." },
  ];

  // Palette from user artwork: Dusty Rose, Vanilla Cream, Sage Leaf, Pale Champagne
  const dressCodeColors = [
    { name: "Blush Rose", hex: "#D97089" },
    { name: "Vanilla Cream", hex: "#FAF3E8" },
    { name: "Sage Leaf", hex: "#7B9277" },
    { name: "Pale Gold", hex: "#D6B875" },
  ];

  const [timeLeft, setTimeLeft] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [rsvpForm, setRsvpForm] = useState({ name: '', guests: '1', wish: '' });
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

  const handleAddToCalendar = () => {
    const title = encodeURIComponent(`${honoreeName}'s ${eventTitle}`);
    const details = encodeURIComponent(`You are invited to celebrate ${honoreeName}'s birthday! ${eventSubtitle}`);
    const location = encodeURIComponent(`${venueName}, ${venueAddress}`);
    window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`, '_blank');
  };

  return (
    <div className="bg-[#1C1014] text-gray-800 antialiased font-sans min-h-screen overflow-x-hidden relative selection:bg-[#D97089] selection:text-white">

      {isSample && (
        <div className="sticky top-0 z-40 bg-[#2D161E]/95 backdrop-blur-md border-b border-[#D97089]/40 text-[#F5C2CD] text-center py-2 px-4 text-xs font-cinzel tracking-wider">
          🎂 Sample Template Showcase &bull; Aesthetic Blossom Birthday Soirée
        </div>
      )}

      <main className="relative z-10 w-full min-h-screen py-0 sm:py-10 flex justify-center items-start">
        <div className="w-full sm:max-w-[460px] bg-[#FFFBF7] text-[#2F1B22] sm:rounded-[36px] shadow-[0_25px_90px_rgba(0,0,0,0.9)] border-0 sm:border-2 sm:border-[#D97089]/40 overflow-hidden relative">

          {/* Delicate Floral Inset Arched Border */}
          <div className="absolute inset-2 sm:inset-3 border-2 border-dashed border-[#D97089]/30 rounded-t-[170px] rounded-b-[28px] pointer-events-none z-10" />

          {/* HEADER & INVITATION CALLOUT */}
          <header className="relative pt-12 pb-8 px-6 text-center bg-gradient-to-b from-[#FCEEEF] via-[#FFFBF7] to-[#FFFBF7]">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#3D1A25] text-[#F9C9D4] font-cinzel text-[10px] uppercase font-bold tracking-widest shadow-md mb-3 border border-[#D97089]/40">
              <Sparkles className="w-3.5 h-3.5 text-[#F9C9D4]" />
              <span>A Special Birthday Celebration</span>
            </div>

            <p className="font-cinzel text-xs tracking-[0.25em] uppercase text-[#9E3953] font-bold mb-1">
              You are warmly invited to celebrate
            </p>

            <h1 className="font-script text-5xl sm:text-6xl text-[#8E2842] leading-tight my-2 drop-shadow-sm">
              {honoreeName}
            </h1>

            <p className="font-serif italic text-base text-[#4E2733] font-medium mb-1">
              {eventTitle}
            </p>
            <p className="font-sans text-xs text-[#9E3953] tracking-wider uppercase font-semibold mb-4">
              &ldquo;{eventSubtitle}&rdquo;
            </p>

            {/* BIRTHDAY HERO (Proper Geometric Circular Cameo) */}
            {heroImage && (
              <div className="flex flex-col items-center justify-center my-4">
                <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full border-2 border-[#D97089]/70 p-1.5 shadow-xl bg-gradient-to-b from-white via-[#FFF8FA] to-[#FCEEEF]">
                  <div className="w-full h-full rounded-full overflow-hidden relative shadow-inner bg-[#FBF3F4]">
                    <img
                      src={heroImage}
                      alt={`${honoreeName} Birthday`}
                      className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 rounded-full ring-2 ring-inset ring-[#D97089]/40 pointer-events-none" />
                  </div>
                </div>
                <div className="mt-3 text-center">
                  <span className="font-cinzel text-[10px] tracking-[0.2em] text-[#8E2842] uppercase font-bold flex items-center justify-center gap-1.5">
                    <Cake className="w-3.5 h-3.5 text-[#D97089]" />
                    <span>Candles, Confetti &amp; Sweet Wishes</span>
                  </span>
                </div>
              </div>
            )}

            {/* Date Pill */}
            <div className="mt-2 inline-block px-5 py-2 rounded-full bg-[#3D1A25] text-[#F9C9D4] border border-[#D97089]/40 shadow-md">
              <p className="font-cinzel text-xs tracking-widest font-bold uppercase">
                {eventDateDisplay}
              </p>
            </div>
            <p className="font-serif italic text-sm text-[#8E2842] mt-2 font-semibold">
              {eventTimeDisplay} &bull; {cityDisplay}
            </p>
          </header>

          {/* COUNTDOWN TIMER */}
          <section className="py-6 px-6 text-center bg-gradient-to-b from-[#FFFBF7] to-[#FCEEEF]">
            <span className="font-cinzel text-[10px] tracking-widest uppercase text-[#9E3953] font-bold block mb-3">
              Counting Down To The Sweet Moments
            </span>
            <div className="grid grid-cols-4 gap-2 text-center max-w-xs mx-auto">
              <div className="bg-white p-3 rounded-xl border border-[#D97089]/30 shadow-sm">
                <span className="font-serif text-2xl font-bold text-[#8E2842]">{timeLeft.days}</span>
                <span className="font-cinzel text-[9px] uppercase block text-[#4E2733]/70">Days</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-[#D97089]/30 shadow-sm">
                <span className="font-serif text-2xl font-bold text-[#8E2842]">{timeLeft.hours}</span>
                <span className="font-cinzel text-[9px] uppercase block text-[#4E2733]/70">Hours</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-[#D97089]/30 shadow-sm">
                <span className="font-serif text-2xl font-bold text-[#8E2842]">{timeLeft.minutes}</span>
                <span className="font-cinzel text-[9px] uppercase block text-[#4E2733]/70">Mins</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-[#D97089]/30 shadow-sm">
                <span className="font-serif text-2xl font-bold text-[#D97089]">{timeLeft.seconds}</span>
                <span className="font-cinzel text-[9px] uppercase block text-[#4E2733]/70">Secs</span>
              </div>
            </div>

            <div className="mt-4">
              <button
                onClick={handleAddToCalendar}
                className="inline-flex items-center gap-1.5 text-xs font-cinzel text-[#8E2842] hover:text-[#B33959] uppercase font-semibold"
              >
                <CalendarPlus className="w-3.5 h-3.5 text-[#D97089]" />
                Add to Google Calendar
              </button>
            </div>
          </section>

          {/* DRESS CODE PALETTE */}
          <section className="py-6 px-6 text-center bg-white border-y border-[#D97089]/20">
            <span className="font-cinzel text-[10px] tracking-widest uppercase text-[#9E3953] font-bold">
              Party Moodboard &amp; Attire
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#8E2842] mb-1">Pastel &amp; Floral Chic</h2>
            <p className="font-sans text-xs text-[#4E2733]/70 mb-4 max-w-xs mx-auto">
              Soft florals, pastel silks, and dreamy creams are encouraged to complement the garden party setting.
            </p>

            <div className="flex items-center justify-center gap-4">
              {dressCodeColors.map((c, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div
                    className="w-10 h-10 rounded-full shadow-md border-2 border-white ring-1 ring-black/10"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span className="text-[9px] font-sans font-medium text-[#2F1B22] mt-1 max-w-[50px] leading-tight">
                    {c.name}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* PARTY ITINERARY */}
          <section className="py-6 px-6 bg-[#FFFBF7]">
            <h2 className="font-serif text-2xl font-bold text-[#8E2842] text-center mb-5">
              Celebration Lineup
            </h2>
            <div className="space-y-4">
              {schedule.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white border border-[#D97089]/30 shadow-sm">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-cinzel text-xs font-bold text-[#8E2842]">{item.time}</span>
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#FCEEEF] text-[#8E2842] font-medium font-sans">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="font-serif text-base font-semibold text-[#2F1B22]">{item.title}</h3>
                  <p className="font-sans text-xs text-[#4E2733]/70 mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* VENUE CARD */}
          <section className="py-6 px-6 bg-white">
            <div className="bg-[#FFFBF7] rounded-2xl border border-[#D97089]/40 overflow-hidden shadow-md">
              {venueImage && (
                <div className="h-44 bg-[#2F1B22] relative overflow-hidden">
                  <img src={venueImage} alt={venueName} className="w-full h-full object-cover opacity-90" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2F1B22] via-[#2F1B22]/40 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="font-serif text-xl text-white font-bold">{venueName}</h3>
                  </div>
                </div>
              )}
              <div className="p-4 space-y-3">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-5 h-5 text-[#9E3953] flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-[#2F1B22]">{venueAddress}</p>
                </div>
                <a
                  href={venueMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#8E2842] hover:bg-[#A33451] text-white font-cinzel text-xs font-bold uppercase tracking-wider py-3 rounded-xl shadow-sm transition-all"
                >
                  <Navigation className="w-4 h-4 text-[#F9C9D4]" />
                  Open in Google Maps
                </a>
              </div>
            </div>
          </section>

          {/* RSVP TRIGGER BANNER */}
          <section className="py-8 px-6 text-center bg-[#3D1A25] text-[#FAF5EE]">
            <h2 className="font-serif text-2xl font-bold mb-1 text-[#F9C9D4]">Will You Celebrate With Her?</h2>
            <p className="font-sans text-xs text-[#FAF5EE]/80 mb-5">
              Please let us know by 14th November so we can reserve your sweet dessert seat and party favors.
            </p>
            <button
              onClick={() => setRsvpOpen(true)}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D97089] via-[#E88A9F] to-[#D97089] hover:from-[#E88A9F] hover:to-[#D97089] text-[#2D161E] font-cinzel text-xs font-bold uppercase tracking-widest shadow-xl transition-transform active:scale-95"
            >
              Send Birthday RSVP &amp; Wishes
            </button>
          </section>

          {/* FOOTER */}
          <footer className="py-8 px-6 text-center bg-[#FFFBF7] border-t border-[#D97089]/20">
            <p className="font-script text-4xl text-[#8E2842] mb-1">
              {honoreeName.split(' ')[0]}
            </p>
            <p className="font-cinzel text-[10px] tracking-widest text-[#4E2733]/70 uppercase font-semibold">
              {hashtag}
            </p>
          </footer>
        </div>
      </main>

      {/* RSVP & WISH MODAL */}
      {rsvpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-sm bg-white rounded-3xl border-2 border-[#D97089] p-6 text-[#2F1B22] shadow-2xl">
            <button onClick={() => setRsvpOpen(false)} className="absolute top-4 right-4 p-1 text-gray-400 hover:text-black">
              <X className="w-5 h-5" />
            </button>
            {rsvpSubmitted ? (
              <div className="text-center py-6">
                <CheckCircle2 className="w-12 h-12 text-[#8E2842] mx-auto mb-2" />
                <h3 className="font-serif text-xl font-bold text-[#8E2842]">You&apos;re on the Guestlist!</h3>
                <p className="text-xs text-gray-600 mt-1">Thank you for your warm wishes! Dua can&apos;t wait to celebrate with you.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-bold text-center text-[#8E2842]">Birthday RSVP &amp; Wishes</h3>
                <div>
                  <label className="block text-xs font-semibold mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={rsvpForm.name}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, name: e.target.value })}
                    placeholder="e.g. Aimen Khan"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#D97089] focus:outline-none focus:ring-1 focus:ring-[#8E2842]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Leave a Sweet Birthday Message</label>
                  <textarea
                    rows={3}
                    value={rsvpForm.wish}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, wish: e.target.value })}
                    placeholder="Wishing you a year filled with magic, laughter, and happiness..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#D97089] focus:outline-none focus:ring-1 focus:ring-[#8E2842]"
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
                          notes: rsvpForm.wish || null,
                        });
                      }
                    } catch (err) {
                      console.error('RSVP submit error:', err);
                    }
                    setTimeout(() => { setRsvpOpen(false); setRsvpSubmitted(false); }, 2200);
                  }}
                  className="w-full py-3 rounded-xl bg-[#8E2842] text-white font-cinzel text-xs font-bold uppercase tracking-wider shadow-md"
                >
                  Send RSVP &amp; Wishes
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* AMBIENT AUDIO TOGGLE */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="fixed bottom-5 right-5 z-40 p-3 rounded-full bg-[#3D1A25] text-[#F9C9D4] border border-[#D97089]/40 shadow-2xl"
        title={isMuted ? "Play Ambient Acoustic Music" : "Mute Music"}
      >
        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </button>

    </div>
  );
}
