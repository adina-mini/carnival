'use client';

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Clock,
  MapPin,
  CalendarPlus,
  Navigation,
  Heart,
  Volume2,
  VolumeX,
  X,
  CheckCircle2,
  Users
} from 'lucide-react';
import { submitRsvp } from '@/lib/supabase';

export default function IvorySageBaratTemplate({ data, isSample = false, invitationId }) {
  const brideName = data?.bride_name || "Aaminah Tariq";
  const groomName = data?.groom_name || "Farhan Qureshi";
  const coupleInitials = data?.couple_initials || "A & F";
  const eventDateIso = data?.event_date_iso || "2026-11-15T12:30:00";
  const eventDateDisplay = data?.event_date_display || "Sunday • November 15, 2026";
  const eventTimeDisplay = data?.event_time_display || "Half Past Twelve in the Afternoon";
  const cityDisplay = data?.city_display || "Islamabad, Pakistan";
  const venueName = data?.venue_name || "The Monal Marquee • Grand Ballroom";
  const venueAddress = data?.venue_address || "Club Road, Shakarparian Hills, Islamabad, Pakistan";
  const venueMapUrl = data?.venue_map_url || "https://maps.google.com/?q=The+Monal+Marquee+Islamabad";
  const hashtag = data?.hashtag || "#AAMINAHANDFARHAN2026";

  // Dedicated artwork slots (Standing pair for Barat)
  const heroImage = data?.hero_image || "/assets/ivory-barat-couple.jpg";
  const familyImage = data?.family_image || "/assets/ivory-barat-family.jpg";
  const venueImage = data?.venue_image || "/assets/barat-stage-venue.jpg";

  const schedule = data?.schedule || [
    { time: "12:30 PM", tag: "Reception", title: "Arrival & Pistachio Sharbat", desc: "Gracious gathering of loved ones with iced almond and cardamom sherbet." },
    { time: "1:15 PM", tag: "Barat Arrival", title: "Grand Barat Entourage", desc: "Welcoming Farhan & family with white jasmine and soft blush rose showers." },
    { time: "2:00 PM", tag: "Nikah", title: "Sacred Nikah Ceremony", desc: "Solemnization of marriage vows, Ijab-o-Qubool, and Quranic supplications.", highlight: true },
    { time: "2:45 PM", tag: "Dawat", title: "Royal Wedding Dawat", desc: "Exquisite Mughlai luncheon featuring Dum Mutton Biryani, Zafrani Korma & Gulab Jamun." },
    { time: "4:30 PM", tag: "Rukhsati", title: "Rukhsati & Duas", desc: "Farewell under the Holy Quran with cherished family prayers and tears of joy." },
  ];

  // Palette from user artwork: Ivory, Sage, Pale Champagne Gold, Soft Blush
  const dressCodeColors = [
    { name: "Pristine Ivory", hex: "#FFFDF5" },
    { name: "Sage Eucalyptus", hex: "#8B9E82" },
    { name: "Pale Champagne", hex: "#C9A84C" },
    { name: "Blush Rose", hex: "#D4A0A0" },
  ];

  const [timeLeft, setTimeLeft] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [rsvpForm, setRsvpForm] = useState({ name: '', guests: '2', phone: '' });
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
    const title = encodeURIComponent(`${brideName} & ${groomName}'s Barat & Nikah Ceremony`);
    const details = encodeURIComponent(`You are cordially invited to celebrate the Barat and Nikah of ${brideName} and ${groomName}.`);
    const location = encodeURIComponent(`${venueName}, ${venueAddress}`);
    window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`, '_blank');
  };

  return (
    <div className="bg-[#0C140E] text-gray-800 antialiased font-sans min-h-screen overflow-x-hidden relative selection:bg-[#4A5D43] selection:text-white">

      {isSample && (
        <div className="sticky top-0 z-40 bg-[#142217]/95 backdrop-blur-md border-b border-[#C9A84C]/40 text-[#E5D298] text-center py-2 px-4 text-xs font-cinzel tracking-wider">
          🌿 Sample Template Showcase &bull; Noor-e-Aroosi • Ivory &amp; Sage Barat
        </div>
      )}

      <main className="relative z-10 w-full min-h-screen py-0 sm:py-10 flex justify-center items-start">
        <div className="w-full sm:max-w-[460px] bg-[#FAF7F0] text-[#1C261D] sm:rounded-[36px] shadow-[0_25px_90px_rgba(0,0,0,0.92)] border-0 sm:border-2 sm:border-[#C9A84C]/50 overflow-hidden relative">

          {/* TOP ORNATE CORNER BORDER */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#8B9E82] via-[#C9A84C] to-[#8B9E82]" />

          {/* HEADER SECTION */}
          <header className="pt-10 pb-6 px-6 text-center relative">
            <div className="flex justify-center items-center gap-2 mb-3">
              <span className="h-[1px] w-10 bg-[#C9A84C]/60"></span>
              <Sparkles className="w-4 h-4 text-[#C9A84C]" />
              <span className="h-[1px] w-10 bg-[#C9A84C]/60"></span>
            </div>

            <p className="font-arabic text-2xl text-[#2B3E29] leading-loose">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>

            <p className="font-cinzel text-[11px] uppercase tracking-[0.25em] text-[#556B52] font-semibold mt-2">
              The Barat &amp; Nikah Ceremony of
            </p>

            <h1 className="font-serif text-3xl sm:text-4xl text-[#18261A] font-bold mt-2 tracking-wide">
              {brideName}
            </h1>
            <p className="font-script text-3xl text-[#C9A84C] my-1">&amp;</p>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#18261A] font-bold tracking-wide">
              {groomName}
            </h1>

            <p className="font-cinzel text-[10px] uppercase tracking-widest text-[#556B52] mt-3">
              {cityDisplay}
            </p>
          </header>

          {/* HERO COUPLE ARTWORK (Royal Dome / Mehrab Arch) */}
          <section className="px-6 py-2">
            {heroImage && (
              <div className="relative w-64 sm:w-72 mx-auto my-3 rounded-t-full rounded-b-2xl border-2 border-[#C9A84C]/60 p-2 shadow-2xl bg-gradient-to-b from-[#FAF7F0] via-white to-[#F0EBE1]">
                <div className="w-full aspect-[4/5] rounded-t-full rounded-b-xl overflow-hidden relative shadow-inner bg-[#F4EFE6]">
                  <img
                    src={heroImage}
                    alt={`${brideName} & ${groomName}`}
                    className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 rounded-t-full rounded-b-xl ring-1 ring-inset ring-[#C9A84C]/35 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C261D]/70 via-transparent to-transparent pointer-events-none" />

                  {/* Bottom Overlay Label */}
                  <div className="absolute bottom-3 left-3 right-3 text-center text-white">
                    <p className="font-cinzel text-[10px] tracking-[0.25em] uppercase text-[#E5D298] font-bold drop-shadow">
                      Sacred Union
                    </p>
                    <p className="font-serif text-base font-bold text-white drop-shadow">
                      {coupleInitials}
                    </p>
                  </div>
                </div>
                <div className="mt-2 text-center">
                  <span className="font-cinzel text-[10px] tracking-[0.25em] text-[#324530] uppercase font-bold">
                    Together in Sacred Barakah
                  </span>
                </div>
              </div>
            )}
          </section>

          {/* QURANIC AYAH DEDICATION */}
          <section className="px-8 py-6 text-center">
            <div className="relative p-6 rounded-2xl bg-[#F0EBE1] border border-[#C9A84C]/30 shadow-inner">
              <Heart className="w-5 h-5 text-[#C9A84C] mx-auto mb-2 opacity-80" />
              <p className="font-arabic text-lg text-[#203021] leading-relaxed mb-3">
                &ldquo;وَخَلَقْنَاكُمْ أَزْوَاجًا&rdquo;
              </p>
              <p className="font-serif text-xs italic text-[#384839] leading-relaxed">
                &ldquo;And We created you in pairs.&rdquo;
              </p>
              <p className="font-cinzel text-[9px] uppercase tracking-widest text-[#556B52] mt-2">
                — Surah An-Naba &bull; 78:8
              </p>
            </div>
          </section>

          {/* DATE & TIME CARD */}
          <section className="px-6 py-2">
            <div className="p-6 rounded-3xl bg-white border border-[#C9A84C]/30 shadow-md text-center">
              <div className="flex items-center justify-center gap-2 text-[#556B52] text-xs font-cinzel uppercase tracking-widest mb-2 font-semibold">
                <Clock className="w-4 h-4 text-[#C9A84C]" />
                Event Timings
              </div>
              <p className="font-serif text-xl font-bold text-[#1C261D]">
                {eventDateDisplay}
              </p>
              <p className="text-xs text-gray-600 font-sans mt-1">
                {eventTimeDisplay}
              </p>

              {/* COUNTDOWN TILES */}
              <div className="grid grid-cols-4 gap-2 mt-5">
                {[
                  { val: timeLeft.days, label: 'Days' },
                  { val: timeLeft.hours, label: 'Hours' },
                  { val: timeLeft.minutes, label: 'Mins' },
                  { val: timeLeft.seconds, label: 'Secs' },
                ].map((item, i) => (
                  <div key={i} className="py-2.5 px-1 rounded-xl bg-[#F4EFE6] border border-[#C9A84C]/25 text-center">
                    <p className="font-serif text-lg font-bold text-[#1C261D]">{item.val}</p>
                    <p className="text-[9px] uppercase tracking-wider text-[#556B52] font-semibold">{item.label}</p>
                  </div>
                ))}
              </div>

              {/* ADD TO CALENDAR */}
              <button
                onClick={handleAddToCalendar}
                className="mt-5 w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#324530] text-[#FAF7F0] font-cinzel text-xs font-semibold tracking-wider hover:bg-[#253523] transition-colors shadow-sm"
              >
                <CalendarPlus className="w-4 h-4 text-[#C9A84C]" />
                Add to Google Calendar
              </button>
            </div>
          </section>

          {/* CHERISHED FAMILY PORTRAIT SECTION */}
          {familyImage && (
            <section className="px-6 py-6">
              <div className="text-center mb-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAE3D2] text-[#324530] text-[10px] font-cinzel uppercase tracking-widest font-bold">
                  <Users className="w-3 h-3 text-[#C9A84C]" />
                  With Family Blessings
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1C261D] mt-2">
                  The Extended Families
                </h3>
                <p className="text-[11px] text-gray-600 font-sans mt-0.5">
                  Tariq Siddiqui &amp; Farhan Qureshi Families cordially request your gracious presence.
                </p>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-[#C9A84C]/40 shadow-xl bg-white">
                <img
                  src={familyImage}
                  alt="Cherished Family Portrait"
                  className="w-full h-auto object-cover"
                />
                <div className="p-3 text-center bg-[#FAF7F0] border-t border-[#C9A84C]/20">
                  <p className="font-cinzel text-[10px] uppercase tracking-widest text-[#324530] font-bold">
                    Gathered in Love &amp; Gratitude
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* CEREMONY SCHEDULE / ITINERARY */}
          <section className="px-6 py-4">
            <div className="text-center mb-5">
              <p className="font-cinzel text-[10px] uppercase tracking-[0.25em] text-[#556B52] font-bold">
                Program Order
              </p>
              <h3 className="font-serif text-2xl font-bold text-[#1C261D] mt-1">
                The Shahi Itinerary
              </h3>
            </div>

            <div className="space-y-3">
              {schedule.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border transition-all ${
                    item.highlight
                      ? 'bg-gradient-to-r from-[#EAE3D2] to-[#FAF7F0] border-[#C9A84C] shadow-md'
                      : 'bg-white border-[#C9A84C]/25'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="inline-block px-2.5 py-1 rounded-md bg-[#324530] text-[#E5D298] text-[10px] font-cinzel font-bold tracking-wider">
                      {item.time}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest font-semibold text-[#8B9E82]">
                      {item.tag}
                    </span>
                  </div>
                  <h4 className="font-serif text-base font-bold text-[#1C261D] mt-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* DRESS CODE PALETTE */}
          <section className="px-6 py-4">
            <div className="p-5 rounded-2xl bg-[#F4EFE6] border border-[#C9A84C]/30 text-center">
              <p className="font-cinzel text-[10px] uppercase tracking-[0.2em] text-[#556B52] font-bold mb-1">
                Aesthetic Palette
              </p>
              <h4 className="font-serif text-base font-bold text-[#1C261D] mb-4">
                Recommended Attire Colors
              </h4>
              <div className="grid grid-cols-4 gap-2">
                {dressCodeColors.map((col, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <span
                      className="w-10 h-10 rounded-full shadow-md border-2 border-white mb-1.5"
                      style={{ backgroundColor: col.hex }}
                    />
                    <span className="text-[9px] font-semibold text-[#1C261D] text-center leading-tight">
                      {col.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* VENUE & MAP */}
          <section className="px-6 py-4">
            <div className="rounded-3xl overflow-hidden bg-white border border-[#C9A84C]/30 shadow-md">
              <div className="relative h-44 w-full bg-[#EAE3D2]">
                <img
                  src={venueImage}
                  alt={venueName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <p className="font-cinzel text-[10px] uppercase tracking-widest text-[#E5D298] font-bold">
                    Reception Venue
                  </p>
                  <p className="font-serif text-sm font-bold truncate">
                    {venueName}
                  </p>
                </div>
              </div>

              <div className="p-5 text-center">
                <div className="flex items-center justify-center gap-1.5 text-xs text-gray-700 font-sans mb-4">
                  <MapPin className="w-4 h-4 text-[#C9A84C] shrink-0" />
                  <span className="text-xs leading-relaxed">{venueAddress}</span>
                </div>

                <a
                  href={venueMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#324530] hover:bg-[#253523] text-[#FAF7F0] font-cinzel text-xs font-semibold tracking-wider transition-colors shadow-sm"
                >
                  <Navigation className="w-4 h-4 text-[#C9A84C]" />
                  Open in Google Maps
                </a>
              </div>
            </div>
          </section>

          {/* RSVP ACTION BUTTON */}
          <section className="px-6 py-6 text-center">
            <button
              onClick={() => setRsvpOpen(true)}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C9A84C] via-[#DFC270] to-[#C9A84C] hover:from-[#DFC270] hover:to-[#C9A84C] text-[#142217] font-cinzel text-xs font-bold uppercase tracking-widest shadow-xl transition-transform active:scale-95"
            >
              Respond to Invitation (RSVP)
            </button>
          </section>

          {/* FOOTER */}
          <footer className="py-8 px-6 text-center bg-[#FAF7F0] border-t border-[#C9A84C]/30">
            <p className="font-script text-4xl text-[#324530] mb-2">
              {brideName.split(' ')[0]} &amp; {groomName.split(' ')[0]}
            </p>
            <p className="font-cinzel text-[10px] tracking-widest text-[#556B52] uppercase font-semibold">
              {hashtag}
            </p>
          </footer>
        </div>
      </main>

      {/* RSVP MODAL */}
      {rsvpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-sm bg-white rounded-3xl border-2 border-[#C9A84C] p-6 text-[#1C261D] shadow-2xl">
            <button onClick={() => setRsvpOpen(false)} className="absolute top-4 right-4 p-1 text-gray-400 hover:text-black">
              <X className="w-5 h-5" />
            </button>
            {rsvpSubmitted ? (
              <div className="text-center py-6">
                <CheckCircle2 className="w-12 h-12 text-[#324530] mx-auto mb-2" />
                <h3 className="font-serif text-xl font-bold text-[#324530]">Graciously Received</h3>
                <p className="text-xs text-gray-600 mt-1">Your attendance has been recorded with joy. We look forward to celebrating together.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-bold text-center text-[#324530]">Barat Ceremony RSVP</h3>
                <p className="text-xs text-center text-gray-600">Please confirm your attendance for {brideName} &amp; {groomName}&apos;s Barat.</p>
                <div>
                  <label className="block text-xs font-semibold mb-1">Guest / Family Name</label>
                  <input
                    type="text"
                    required
                    value={rsvpForm.name}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, name: e.target.value })}
                    placeholder="e.g. Mr. & Mrs. Qureshi"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#C9A84C] focus:outline-none focus:ring-1 focus:ring-[#324530]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Total Attending Guests</label>
                  <select
                    value={rsvpForm.guests}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, guests: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#C9A84C] bg-white focus:outline-none"
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5+">Family (5+ Guests)</option>
                  </select>
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
                  className="w-full py-3 rounded-xl bg-[#324530] text-[#E5D298] font-cinzel text-xs font-bold uppercase tracking-wider shadow-md"
                >
                  Confirm Attendance
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* AMBIENT AUDIO TOGGLE */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="fixed bottom-5 right-5 z-40 p-3 rounded-full bg-[#142217] text-[#C9A84C] border border-[#C9A84C]/50 shadow-2xl"
        title={isMuted ? "Play Ambient Sitar Music" : "Mute Music"}
      >
        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </button>

    </div>
  );
}
