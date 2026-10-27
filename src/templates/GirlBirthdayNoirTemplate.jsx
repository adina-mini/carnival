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
  Camera,
  Music
} from 'lucide-react';
import { submitRsvp } from '@/lib/supabase';

export default function GirlBirthdayNoirTemplate({ data, isSample = false, invitationId }) {
  const honoreeName = data?.bride_name || data?.honoree_name || "Zara Khan";
  const eventTitle = data?.event_title || "Midnight Noir • 22nd Birthday Soirée";
  const eventSubtitle = data?.event_subtitle || "A Year Older, A Hundred Times Bolder";
  const eventDateIso = data?.event_date_iso || "2026-11-28T20:30:00";
  const eventDateDisplay = data?.event_date_display || "Saturday • November 28, 2026";
  const eventTimeDisplay = data?.event_time_display || "Half Past Eight in the Evening";
  const cityDisplay = data?.city_display || "Karachi, Pakistan";
  const venueName = data?.venue_name || "The Obsidian Rooftop & Sky Lounge";
  const venueAddress = data?.venue_address || "Creek Vista Penthouse, DHA Phase VIII, Karachi, Pakistan";
  const venueMapUrl = data?.venue_map_url || "https://maps.google.com/?q=DHA+Phase+8+Karachi";
  const hashtag = data?.hashtag || "#ZARACHAPTER22";

  // Dedicated artwork slot
  const heroImage = data?.hero_image || "/assets/girl-birthday-noir.jpg";
  const venueImage = data?.venue_image || "/assets/birthday-venue-stage.jpg";

  const schedule = data?.schedule || [
    { time: "8:30 PM", tag: "Arrival", title: "Midnight Mocktails & Red Carpet", desc: "Arrival of guests, chilled blackberry spritzers, and VIP photo call." },
    { time: "9:30 PM", tag: "Glam Booth", title: "Noir Flash Photobooth", desc: "Monochrome studio portraits and Polaroid memory book captures." },
    { time: "10:15 PM", tag: "Make a Wish", title: "Noir Cake Reveal & Golden Sparklers", desc: "Gather around for the tiered cake reveal, make a wish, and champagne toast." },
    { time: "11:00 PM", tag: "Party", title: "Rooftop Beats & Gourmet Bites", desc: "Gourmet slider bar, artisanal sushi, dessert bar, and live DJ set." },
  ];

  // Noir dress code palette
  const dressCodeColors = [
    { name: "Obsidian Noir", hex: "#0E0E12" },
    { name: "Charcoal Slate", hex: "#282830" },
    { name: "Metallic Gold", hex: "#D4AF37" },
    { name: "Champagne Pearl", hex: "#F5EFE6" },
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
    <div className="bg-[#08080B] text-gray-100 antialiased font-sans min-h-screen overflow-x-hidden relative selection:bg-[#D4AF37] selection:text-black">

      {isSample && (
        <div className="sticky top-0 z-40 bg-[#14141A]/95 backdrop-blur-md border-b border-[#D4AF37]/40 text-[#E5C778] text-center py-2 px-4 text-xs font-cinzel tracking-wider">
          🖤 Sample Template Showcase &bull; Midnight Glamour • Birthday Noir
        </div>
      )}

      <main className="relative z-10 w-full min-h-screen py-0 sm:py-10 flex justify-center items-start">
        <div className="w-full sm:max-w-[460px] bg-[#101015] text-[#F3F4F6] sm:rounded-[36px] shadow-[0_25px_90px_rgba(0,0,0,0.98)] border-0 sm:border-2 sm:border-[#D4AF37]/40 overflow-hidden relative">

          {/* TOP GOLD ACCENT LINE */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

          {/* HEADER SECTION */}
          <header className="pt-10 pb-4 px-6 text-center relative">
            <div className="flex justify-center items-center gap-2 mb-3">
              <span className="h-[1px] w-8 bg-[#D4AF37]/50"></span>
              <Sparkles className="w-4 h-4 text-[#D4AF37] animate-pulse" />
              <span className="h-[1px] w-8 bg-[#D4AF37]/50"></span>
            </div>

            <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
              You Are Invited To Celebrate
            </p>

            <h1 className="font-serif text-3xl sm:text-4xl text-white font-bold mt-2 tracking-wide">
              {honoreeName}
            </h1>

            <p className="font-script text-2xl text-[#E5C778] mt-1">
              {eventSubtitle}
            </p>

            <div className="mt-3 inline-block px-3 py-1 rounded-full bg-[#1C1C24] border border-[#D4AF37]/30 text-[10px] font-cinzel uppercase tracking-widest text-[#E5C778] font-bold">
              {eventTitle}
            </div>
          </header>

          {/* HERO ARTWORK (Proper Geometric Circular Cameo) */}
          <section className="px-6 py-3">
            {heroImage && (
              <div className="flex flex-col items-center justify-center my-3">
                <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full border-2 border-[#D4AF37]/70 p-1.5 shadow-2xl bg-gradient-to-b from-[#1C1C24] via-[#14141A] to-[#101015]">
                  <div className="w-full h-full rounded-full overflow-hidden relative shadow-inner bg-[#16161D]">
                    <img
                      src={heroImage}
                      alt={honoreeName}
                      className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 rounded-full ring-2 ring-inset ring-[#D4AF37]/40 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#101015]/60 via-transparent to-transparent pointer-events-none" />

                    <div className="absolute bottom-3 left-2 right-2 text-center">
                      <p className="font-cinzel text-[9px] tracking-[0.3em] uppercase text-[#D4AF37] font-bold drop-shadow">
                        Make A Wish
                      </p>
                      <p className="font-serif text-sm font-bold text-white drop-shadow">
                        #CHAPTER22
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-3 text-center">
                  <span className="font-cinzel text-[10px] tracking-[0.25em] text-[#E5C778] uppercase font-bold">
                    Midnight Velvet Soirée
                  </span>
                </div>
              </div>
            )}
          </section>

          {/* COUNTDOWN & DATE */}
          <section className="px-6 py-4">
            <div className="p-6 rounded-3xl bg-[#171720] border border-[#D4AF37]/30 shadow-xl text-center">
              <div className="flex items-center justify-center gap-2 text-[#D4AF37] text-xs font-cinzel uppercase tracking-widest mb-2 font-semibold">
                <Cake className="w-4 h-4 text-[#D4AF37]" />
                Countdown To The Midnight Hour
              </div>
              <p className="font-serif text-xl font-bold text-white">
                {eventDateDisplay}
              </p>
              <p className="text-xs text-gray-400 font-sans mt-1">
                {eventTimeDisplay}
              </p>

              <div className="grid grid-cols-4 gap-2 mt-5">
                {[
                  { val: timeLeft.days, label: 'Days' },
                  { val: timeLeft.hours, label: 'Hours' },
                  { val: timeLeft.minutes, label: 'Mins' },
                  { val: timeLeft.seconds, label: 'Secs' },
                ].map((item, i) => (
                  <div key={i} className="py-2.5 px-1 rounded-xl bg-[#0D0D12] border border-[#D4AF37]/25 text-center">
                    <p className="font-serif text-lg font-bold text-[#E5C778]">{item.val}</p>
                    <p className="text-[9px] uppercase tracking-wider text-gray-400 font-semibold">{item.label}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={handleAddToCalendar}
                className="mt-5 w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5C778] to-[#D4AF37] hover:from-[#E5C778] hover:to-[#D4AF37] text-black font-cinzel text-xs font-bold tracking-wider transition-all shadow-md active:scale-95"
              >
                <CalendarPlus className="w-4 h-4 text-black" />
                Add to Calendar
              </button>
            </div>
          </section>

          {/* ITINERARY */}
          <section className="px-6 py-4">
            <div className="text-center mb-5">
              <p className="font-cinzel text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-bold">
                The Soirée Flow
              </p>
              <h3 className="font-serif text-2xl font-bold text-white mt-1">
                Evening Program
              </h3>
            </div>

            <div className="space-y-3">
              {schedule.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#171720] border border-[#D4AF37]/20 shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="inline-block px-2.5 py-1 rounded-md bg-[#252532] text-[#E5C778] text-[10px] font-cinzel font-bold tracking-wider">
                      {item.time}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest font-semibold text-[#D4AF37]">
                      {item.tag}
                    </span>
                  </div>
                  <h4 className="font-serif text-base font-bold text-white mt-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* DRESS CODE PALETTE */}
          <section className="px-6 py-4">
            <div className="p-5 rounded-2xl bg-[#171720] border border-[#D4AF37]/30 text-center">
              <p className="font-cinzel text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-bold mb-1">
                Dress Code
              </p>
              <h4 className="font-serif text-base font-bold text-white mb-1">
                All-Black Chic &amp; Glam
              </h4>
              <p className="text-xs text-gray-400 mb-4">
                Channel your boldest noir cocktail attire with subtle metallic touches.
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
            <div className="rounded-3xl overflow-hidden bg-[#171720] border border-[#D4AF37]/30 shadow-md">
              <div className="relative h-44 w-full bg-[#0E0E14]">
                <img
                  src={venueImage}
                  alt={venueName}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101015] via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <p className="font-cinzel text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">
                    Party Location
                  </p>
                  <p className="font-serif text-sm font-bold truncate">
                    {venueName}
                  </p>
                </div>
              </div>

              <div className="p-5 text-center">
                <div className="flex items-center justify-center gap-1.5 text-xs text-gray-300 font-sans mb-4">
                  <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span className="text-xs leading-relaxed">{venueAddress}</span>
                </div>

                <a
                  href={venueMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#252532] hover:bg-[#303040] text-white font-cinzel text-xs font-semibold tracking-wider transition-colors shadow-sm"
                >
                  <Navigation className="w-4 h-4 text-[#D4AF37]" />
                  Open in Google Maps
                </a>
              </div>
            </div>
          </section>

          {/* RSVP BUTTON */}
          <section className="px-6 py-6 text-center">
            <button
              onClick={() => setRsvpOpen(true)}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5C778] to-[#D4AF37] hover:from-[#E5C778] hover:to-[#D4AF37] text-black font-cinzel text-xs font-bold uppercase tracking-widest shadow-2xl transition-transform active:scale-95"
            >
              Confirm Your Spot (RSVP)
            </button>
          </section>

          {/* FOOTER */}
          <footer className="py-8 px-6 text-center bg-[#0D0D12] border-t border-[#D4AF37]/20">
            <p className="font-script text-3xl text-[#E5C778] mb-1">
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
          <div className="relative w-full max-w-sm bg-[#181822] rounded-3xl border-2 border-[#D4AF37] p-6 text-white shadow-2xl">
            <button onClick={() => setRsvpOpen(false)} className="absolute top-4 right-4 p-1 text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            {rsvpSubmitted ? (
              <div className="text-center py-6">
                <CheckCircle2 className="w-12 h-12 text-[#D4AF37] mx-auto mb-2" />
                <h3 className="font-serif text-xl font-bold text-[#E5C778]">You&apos;re On The Guestlist!</h3>
                <p className="text-xs text-gray-300 mt-1">Get ready for an unforgettable night. See you there in your best noir glam.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-bold text-center text-[#E5C778]">RSVP &bull; VIP Guestlist</h3>
                <p className="text-xs text-center text-gray-400">Please confirm your attendance for {honoreeName}&apos;s birthday soirée.</p>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-gray-300">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={rsvpForm.name}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, name: e.target.value })}
                    placeholder="e.g. Maya Ali"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[#101016] border border-[#D4AF37]/60 text-white focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-gray-300">Attending Party Size</label>
                  <select
                    value={rsvpForm.guests}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, guests: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[#101016] border border-[#D4AF37]/60 text-white focus:outline-none"
                  >
                    <option value="1">Solo (Just Me)</option>
                    <option value="2">+1 Guest (2 Total)</option>
                    <option value="3">Crew of 3</option>
                    <option value="4">VIP Group (4+)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-gray-300">Birthday Wish (Optional)</label>
                  <input
                    type="text"
                    value={rsvpForm.wish}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, wish: e.target.value })}
                    placeholder="Drop a wish or hype message..."
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[#101016] border border-[#D4AF37]/60 text-white focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
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
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E5C778] text-black font-cinzel text-xs font-bold uppercase tracking-wider shadow-lg"
                >
                  Join The Party
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* AMBIENT AUDIO TOGGLE */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="fixed bottom-5 right-5 z-40 p-3 rounded-full bg-[#181822] text-[#D4AF37] border border-[#D4AF37]/50 shadow-2xl"
        title={isMuted ? "Play Lounge Beats" : "Mute Music"}
      >
        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </button>

    </div>
  );
}
