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
  Flame,
  Award
} from 'lucide-react';
import { submitRsvp } from '@/lib/supabase';

export default function BoyBirthdayTemplate({ data, isSample = false, invitationId }) {
  const honoreeName = data?.bride_name || data?.honoree_name || "Ayaan Tariq";
  const eventTitle = data?.event_title || "Chapter 25 • Obsidian Birthday Soirée";
  const eventSubtitle = data?.event_subtitle || "Celebrating A Milestone Year With Good Company";
  const eventDateIso = data?.event_date_iso || "2026-11-21T20:00:00";
  const eventDateDisplay = data?.event_date_display || "Saturday • November 21, 2026";
  const eventTimeDisplay = data?.event_time_display || "Eight O'Clock in the Evening";
  const cityDisplay = data?.city_display || "Lahore, Pakistan";
  const venueName = data?.venue_name || "The Charcoal & Amber Rooftop";
  const venueAddress = data?.venue_address || "MM Alam Road, Gulberg II, Lahore, Pakistan";
  const venueMapUrl = data?.venue_map_url || "https://maps.google.com/?q=MM+Alam+Road+Lahore";
  const hashtag = data?.hashtag || "#AYAANCHAPTER25";

  // Dedicated artwork slot
  const heroImage = data?.hero_image || "/assets/boy-birthday-noir.jpg";
  const venueImage = data?.venue_image || "/assets/birthday-venue-stage.jpg";

  const schedule = data?.schedule || [
    { time: "8:00 PM", tag: "Arrival", title: "Welcome & Amber Mocktails", desc: "Arrival of guests, iced smoked vanilla mocktails, and terrace lounge music." },
    { time: "9:00 PM", tag: "Tribute", title: "Milestone Toast & Storytime", desc: "Short celebratory toasts and catching up with friends & family." },
    { time: "9:45 PM", tag: "Make a Wish", title: "Noir Cake Cutting & Golden Sparks", desc: "Gather around for the cake cutting, candle blow, and group photography." },
    { time: "10:30 PM", tag: "Feast", title: "Rooftop Charcoal BBQ & Desserts", desc: "Artisanal grilled steaks, live BBQ sliders, gourmet fries, and Belgian waffle bar." },
  ];

  // Palette from user artwork: Obsidian Black, Slate Charcoal, Warm Amber Gold, Crisp Parchment
  const dressCodeColors = [
    { name: "Obsidian Black", hex: "#0B0C10" },
    { name: "Deep Charcoal", hex: "#1F2833" },
    { name: "Amber Gold", hex: "#C5A059" },
    { name: "Crisp Cream", hex: "#F0E6D2" },
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
    const details = encodeURIComponent(`You are cordially invited to celebrate ${honoreeName}'s birthday!`);
    const location = encodeURIComponent(`${venueName}, ${venueAddress}`);
    window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`, '_blank');
  };

  return (
    <div className="bg-[#07080A] text-gray-100 antialiased font-sans min-h-screen overflow-x-hidden relative selection:bg-[#C5A059] selection:text-black">

      {isSample && (
        <div className="sticky top-0 z-40 bg-[#12161E]/95 backdrop-blur-md border-b border-[#C5A059]/40 text-[#E5C778] text-center py-2 px-4 text-xs font-cinzel tracking-wider">
          🎂 Sample Template Showcase &bull; Obsidian &amp; Gold • Boy&apos;s Birthday Soirée
        </div>
      )}

      <main className="relative z-10 w-full min-h-screen py-0 sm:py-10 flex justify-center items-start">
        <div className="w-full sm:max-w-[460px] bg-[#0E1116] text-[#F3F4F6] sm:rounded-[36px] shadow-[0_25px_90px_rgba(0,0,0,0.98)] border-0 sm:border-2 sm:border-[#C5A059]/40 overflow-hidden relative">

          {/* TOP ACCENT LINE */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />

          {/* HEADER SECTION */}
          <header className="pt-10 pb-4 px-6 text-center relative">
            <div className="flex justify-center items-center gap-2 mb-3">
              <span className="h-[1px] w-8 bg-[#C5A059]/50"></span>
              <Flame className="w-4 h-4 text-[#C5A059]" />
              <span className="h-[1px] w-8 bg-[#C5A059]/50"></span>
            </div>

            <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-semibold">
              Join Us In Celebrating
            </p>

            <h1 className="font-serif text-3xl sm:text-4xl text-white font-bold mt-2 tracking-wide">
              {honoreeName}
            </h1>

            <p className="font-sans text-xs tracking-wider text-gray-300 uppercase mt-1">
              {eventSubtitle}
            </p>

            <div className="mt-3 inline-block px-3.5 py-1 rounded-full bg-[#181D26] border border-[#C5A059]/30 text-[10px] font-cinzel uppercase tracking-widest text-[#E5C778] font-bold">
              {eventTitle}
            </div>
          </header>

          {/* HERO ARTWORK (Proper Geometric Circular Frame) */}
          <section className="px-6 py-3">
            {heroImage && (
              <div className="flex flex-col items-center justify-center my-3">
                <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full border-2 border-[#C5A059]/70 p-1.5 shadow-2xl bg-gradient-to-b from-[#181D26] via-[#12161E] to-[#0E1116]">
                  <div className="w-full h-full rounded-full overflow-hidden relative shadow-inner bg-[#12161E]">
                    <img
                      src={heroImage}
                      alt={honoreeName}
                      className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 rounded-full ring-2 ring-inset ring-[#C5A059]/40 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E1116]/60 via-transparent to-transparent pointer-events-none" />

                    <div className="absolute bottom-3 left-2 right-2 text-center">
                      <p className="font-cinzel text-[9px] tracking-[0.3em] uppercase text-[#C5A059] font-bold drop-shadow">
                        Milestone Chapter
                      </p>
                      <p className="font-serif text-sm font-bold text-white drop-shadow">
                        #CHAPTER25
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-3 text-center">
                  <span className="font-cinzel text-[10px] tracking-[0.25em] text-[#E5C778] uppercase font-bold">
                    Celebration Gala
                  </span>
                </div>
              </div>
            )}
          </section>

          {/* COUNTDOWN & DATE */}
          <section className="px-6 py-4">
            <div className="p-6 rounded-3xl bg-[#141922] border border-[#C5A059]/30 shadow-xl text-center">
              <div className="flex items-center justify-center gap-2 text-[#C5A059] text-xs font-cinzel uppercase tracking-widest mb-2 font-semibold">
                <Cake className="w-4 h-4 text-[#C5A059]" />
                Event Details &amp; Countdown
              </div>
              <p className="font-serif text-xl font-bold text-white">
                {eventDateDisplay}
              </p>
              <p className="text-xs text-gray-300 font-sans mt-1">
                {eventTimeDisplay}
              </p>

              <div className="grid grid-cols-4 gap-2 mt-5">
                {[
                  { val: timeLeft.days, label: 'Days' },
                  { val: timeLeft.hours, label: 'Hours' },
                  { val: timeLeft.minutes, label: 'Mins' },
                  { val: timeLeft.seconds, label: 'Secs' },
                ].map((item, i) => (
                  <div key={i} className="py-2.5 px-1 rounded-xl bg-[#0A0D12] border border-[#C5A059]/25 text-center">
                    <p className="font-serif text-lg font-bold text-[#E5C778]">{item.val}</p>
                    <p className="text-[9px] uppercase tracking-wider text-gray-400 font-semibold">{item.label}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={handleAddToCalendar}
                className="mt-5 w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#C5A059] via-[#DFC270] to-[#C5A059] hover:from-[#DFC270] hover:to-[#C5A059] text-black font-cinzel text-xs font-bold tracking-wider transition-all shadow-md active:scale-95"
              >
                <CalendarPlus className="w-4 h-4 text-black" />
                Add to Calendar
              </button>
            </div>
          </section>

          {/* ITINERARY */}
          <section className="px-6 py-4">
            <div className="text-center mb-5">
              <p className="font-cinzel text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-bold">
                Program Order
              </p>
              <h3 className="font-serif text-2xl font-bold text-white mt-1">
                The Celebration Schedule
              </h3>
            </div>

            <div className="space-y-3">
              {schedule.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#141922] border border-[#C5A059]/20 shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="inline-block px-2.5 py-1 rounded-md bg-[#202735] text-[#E5C778] text-[10px] font-cinzel font-bold tracking-wider">
                      {item.time}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest font-semibold text-[#C5A059]">
                      {item.tag}
                    </span>
                  </div>
                  <h4 className="font-serif text-base font-bold text-white mt-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* DRESS CODE PALETTE */}
          <section className="px-6 py-4">
            <div className="p-5 rounded-2xl bg-[#141922] border border-[#C5A059]/30 text-center">
              <p className="font-cinzel text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-bold mb-1">
                Attire Guidance
              </p>
              <h4 className="font-serif text-base font-bold text-white mb-1">
                Smart Casual &bull; Dark Monochrome
              </h4>
              <p className="text-xs text-gray-400 mb-4">
                Tailored shirts, sharp dark tones, and effortless evening style.
              </p>
              <div className="grid grid-cols-4 gap-2">
                {dressCodeColors.map((col, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <span
                      className="w-10 h-10 rounded-full shadow-lg border-2 border-white/20 mb-1.5"
                      style={{ backgroundColor: col.hex }}
                    />
                    <span className="text-[9px] font-semibold text-gray-300 text-center leading-tight">
                      {col.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* VENUE & LOCATION */}
          <section className="px-6 py-4">
            <div className="rounded-3xl overflow-hidden bg-[#141922] border border-[#C5A059]/30 shadow-md">
              <div className="relative h-44 w-full bg-[#0A0D12]">
                <img
                  src={venueImage}
                  alt={venueName}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1116] via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <p className="font-cinzel text-[10px] uppercase tracking-widest text-[#C5A059] font-bold">
                    Venue Details
                  </p>
                  <p className="font-serif text-sm font-bold truncate">
                    {venueName}
                  </p>
                </div>
              </div>

              <div className="p-5 text-center">
                <div className="flex items-center justify-center gap-1.5 text-xs text-gray-300 font-sans mb-4">
                  <MapPin className="w-4 h-4 text-[#C5A059] shrink-0" />
                  <span className="text-xs leading-relaxed">{venueAddress}</span>
                </div>

                <a
                  href={venueMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#202735] hover:bg-[#2A3445] text-white font-cinzel text-xs font-semibold tracking-wider transition-colors shadow-sm"
                >
                  <Navigation className="w-4 h-4 text-[#C5A059]" />
                  Open in Google Maps
                </a>
              </div>
            </div>
          </section>

          {/* RSVP BUTTON */}
          <section className="px-6 py-6 text-center">
            <button
              onClick={() => setRsvpOpen(true)}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C5A059] via-[#DFC270] to-[#C5A059] hover:from-[#DFC270] hover:to-[#C5A059] text-black font-cinzel text-xs font-bold uppercase tracking-widest shadow-2xl transition-transform active:scale-95"
            >
              Confirm Attendance (RSVP)
            </button>
          </section>

          {/* FOOTER */}
          <footer className="py-8 px-6 text-center bg-[#090C10] border-t border-[#C5A059]/20">
            <p className="font-serif text-2xl text-[#E5C778] font-bold mb-1">
              {honoreeName}
            </p>
            <p className="font-cinzel text-[10px] tracking-widest text-gray-400 uppercase font-semibold">
              {hashtag}
            </p>
          </footer>
        </div>
      </main>

      {/* RSVP MODAL */}
      {rsvpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-sm bg-[#141922] rounded-3xl border-2 border-[#C5A059] p-6 text-white shadow-2xl">
            <button onClick={() => setRsvpOpen(false)} className="absolute top-4 right-4 p-1 text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            {rsvpSubmitted ? (
              <div className="text-center py-6">
                <CheckCircle2 className="w-12 h-12 text-[#C5A059] mx-auto mb-2" />
                <h3 className="font-serif text-xl font-bold text-[#E5C778]">RSVP Confirmed!</h3>
                <p className="text-xs text-gray-300 mt-1">Thanks for confirming! We look forward to catching up and celebrating.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-bold text-center text-[#E5C778]">Confirm Attendance</h3>
                <p className="text-xs text-center text-gray-400">Let {honoreeName} know if you&apos;ll be there.</p>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-gray-300">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={rsvpForm.name}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, name: e.target.value })}
                    placeholder="e.g. Usman Malik"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[#0A0D12] border border-[#C5A059]/60 text-white focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-gray-300">Attending Party Size</label>
                  <select
                    value={rsvpForm.guests}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, guests: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[#0A0D12] border border-[#C5A059]/60 text-white focus:outline-none"
                  >
                    <option value="1">Solo (Just Me)</option>
                    <option value="2">+1 Guest (2 Total)</option>
                    <option value="3">3 Guests</option>
                    <option value="4+">Group (4+)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-gray-300">Birthday Message (Optional)</label>
                  <input
                    type="text"
                    value={rsvpForm.wish}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, wish: e.target.value })}
                    placeholder="Leave a quick note..."
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[#0A0D12] border border-[#C5A059]/60 text-white focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
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
                          guest_count: rsvpForm.guests,
                        });
                      }
                    } catch (err) {
                      console.error('RSVP submit error:', err);
                    }
                    setTimeout(() => { setRsvpOpen(false); setRsvpSubmitted(false); }, 2200);
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#DFC270] text-black font-cinzel text-xs font-bold uppercase tracking-wider shadow-lg"
                >
                  Confirm My Spot
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* AMBIENT AUDIO TOGGLE */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="fixed bottom-5 right-5 z-40 p-3 rounded-full bg-[#141922] text-[#C5A059] border border-[#C5A059]/50 shadow-2xl"
        title={isMuted ? "Play Ambient Track" : "Mute Music"}
      >
        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </button>

    </div>
  );
}
