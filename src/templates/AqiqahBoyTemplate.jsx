'use client';

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  CalendarPlus,
  MapPin,
  Navigation,
  Heart,
  Volume2,
  VolumeX,
  X,
  CheckCircle2,
  Moon,
  Baby,
  Clock
} from 'lucide-react';
import { submitRsvp } from '@/lib/supabase';

export default function AqiqahBoyTemplate({ data, isSample = false, invitationId }) {
  const babyName = data?.bride_name || data?.baby_name || "Muhammad Ibrahim";
  const parentsName = data?.parents_name || "Hamza & Ayesha Siddiqui";
  const eventTitle = data?.event_title || "Aqiqah Ceremony & Sunnah Feast";
  const eventSubtitle = data?.event_subtitle || "Celebrating The Blessed Arrival of Our Beloved Son";
  const eventDateIso = data?.event_date_iso || "2026-11-22T13:00:00";
  const eventDateDisplay = data?.event_date_display || "Sunday • November 22, 2026";
  const eventTimeDisplay = data?.event_time_display || "One O'Clock in the Afternoon";
  const cityDisplay = data?.city_display || "Lahore, Pakistan";
  const venueName = data?.venue_name || "The Ivory Courtyard • Heritage Banquet";
  const venueAddress = data?.venue_address || "Gulberg III, Near Ghalib Market, Lahore, Pakistan";
  const venueMapUrl = data?.venue_map_url || "https://maps.google.com/?q=Gulberg+III+Lahore";
  const hashtag = data?.hashtag || "#BABYIBRAHIM2026";

  // Dedicated artwork slots
  const heroImage = data?.hero_image || "/assets/aqiqah-boy.jpg";
  const venueImage = data?.venue_image || "/assets/venue-hall.png";

  const schedule = data?.schedule || [
    { time: "1:00 PM", tag: "Arrival", title: "Welcome & Rose Sharbat", desc: "Gracious gathering of loved ones, rose water welcome, and fresh mint lemonade." },
    { time: "1:45 PM", tag: "Sunnah", title: "Dua-e-Khair & Parental Tahneek", desc: "Recitation of Quranic verses, heartfelt prayers for health and righteous upbringing.", highlight: true },
    { time: "2:30 PM", tag: "Aqiqah Dawat", title: "Traditional Aqiqah Luncheon Feast", desc: "Mutton Dum Biryani, Korma, Sheermal, Live Jalebi & Kashmiri Chai." },
    { time: "4:00 PM", tag: "Blessings", title: "Family Photography & Duas", desc: "Cherished moments, family pictures with baby Ibrahim, and parting blessings." },
  ];

  // Palette from user artwork: Powder Blue, Soft Linen Cream, Antique Gold, Soft Sage
  const dressCodeColors = [
    { name: "Powder Blue", hex: "#7E9CB9" },
    { name: "Linen Cream", hex: "#FAF6EE" },
    { name: "Antique Gold", hex: "#C5A059" },
    { name: "Soft Sage", hex: "#94A396" },
  ];

  const [timeLeft, setTimeLeft] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [rsvpForm, setRsvpForm] = useState({ name: '', guests: '2', wish: '' });
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
    const title = encodeURIComponent(`${babyName}'s ${eventTitle}`);
    const details = encodeURIComponent(`You are cordially invited to celebrate the Aqiqah of ${babyName}. Hosted by ${parentsName}.`);
    const location = encodeURIComponent(`${venueName}, ${venueAddress}`);
    window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`, '_blank');
  };

  return (
    <div className="bg-[#0B121A] text-gray-800 antialiased font-sans min-h-screen overflow-x-hidden relative selection:bg-[#4A6FA5] selection:text-white">

      {isSample && (
        <div className="sticky top-0 z-40 bg-[#121E2C]/95 backdrop-blur-md border-b border-[#C5A059]/40 text-[#E5D298] text-center py-2 px-4 text-xs font-cinzel tracking-wider">
          👶 Sample Template Showcase &bull; Barakah Little Prince • Aqiqah Ceremony
        </div>
      )}

      <main className="relative z-10 w-full min-h-screen py-0 sm:py-10 flex justify-center items-start">
        <div className="w-full sm:max-w-[460px] bg-[#FAF8F3] text-[#1E293B] sm:rounded-[36px] shadow-[0_25px_90px_rgba(0,0,0,0.92)] border-0 sm:border-2 sm:border-[#C5A059]/40 overflow-hidden relative">

          {/* TOP ORNATE CORNER BORDER */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#7E9CB9] via-[#C5A059] to-[#7E9CB9]" />

          {/* HEADER SECTION */}
          <header className="pt-10 pb-6 px-6 text-center relative">
            <div className="flex justify-center items-center gap-2 mb-3">
              <span className="h-[1px] w-8 bg-[#C5A059]/50"></span>
              <Moon className="w-4 h-4 text-[#C5A059]" />
              <span className="h-[1px] w-8 bg-[#C5A059]/50"></span>
            </div>

            <p className="font-arabic text-2xl text-[#1E3A5F] leading-loose">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>

            <p className="font-cinzel text-[10px] uppercase tracking-[0.25em] text-[#4A6FA5] font-semibold mt-1">
              {eventSubtitle}
            </p>

            <h1 className="font-serif text-3xl sm:text-4xl text-[#0F2038] font-bold mt-2 tracking-wide">
              {babyName}
            </h1>

            <p className="font-sans text-xs text-gray-600 mt-1">
              With the Grace of Almighty Allah, {parentsName} invite you to celebrate the
            </p>

            <div className="mt-3 inline-block px-3.5 py-1 rounded-full bg-[#EBF1F7] border border-[#C5A059]/30 text-[10px] font-cinzel uppercase tracking-widest text-[#1E3A5F] font-bold">
              {eventTitle}
            </div>
          </header>

          {/* HERO SEATED BABY ARTWORK (Proper Geometric Circular Cameo) */}
          <section className="px-6 py-2">
            {heroImage && (
              <div className="flex flex-col items-center justify-center my-3">
                <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full border-2 border-[#C5A059]/70 p-1.5 shadow-2xl bg-gradient-to-b from-[#EBF1F7] via-white to-[#EFF4FA]">
                  <div className="w-full h-full rounded-full overflow-hidden relative shadow-inner bg-[#EFF4FA]">
                    <img
                      src={heroImage}
                      alt={babyName}
                      className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 rounded-full ring-2 ring-inset ring-[#C5A059]/40 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1522]/50 via-transparent to-transparent pointer-events-none" />

                    {/* Bottom In-Circle Overlay Label */}
                    <div className="absolute bottom-3 left-2 right-2 text-center text-white">
                      <p className="font-cinzel text-[9px] tracking-[0.25em] uppercase text-[#E5D298] font-bold drop-shadow">
                        Little Prince
                      </p>
                      <p className="font-serif text-xs font-bold text-white drop-shadow">
                        {babyName}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-3 text-center">
                  <span className="font-cinzel text-[10px] tracking-[0.25em] text-[#1E3A5F] uppercase font-bold">
                    Gift from Almighty Allah
                  </span>
                </div>
              </div>
            )}
          </section>

          {/* DUA CARD */}
          <section className="px-6 py-4 text-center">
            <div className="p-5 rounded-2xl bg-[#EFF4FA] border border-[#C5A059]/30 shadow-inner">
              <Heart className="w-5 h-5 text-[#C5A059] mx-auto mb-2 opacity-80" />
              <p className="font-arabic text-base text-[#122842] leading-relaxed mb-2 font-medium">
                &ldquo;بَارَكَ اللَّهُ لَكَ فِي المَوهُوبِ لَكَ، وَشَكَرْتَ الوَاهِبَ، وَبَلَغَ أَشُدَّهُ، وَرُزِقْتَ بِرَّهُ&rdquo;
              </p>
              <p className="font-serif text-xs italic text-[#2A3F5B] leading-relaxed">
                &ldquo;May Allah bless you in His gift to you, may you give thanks to the Giver, may he reach the age of strength, and may you be granted his righteousness.&rdquo;
              </p>
            </div>
          </section>

          {/* DATE & TIME CARD */}
          <section className="px-6 py-2">
            <div className="p-6 rounded-3xl bg-white border border-[#C5A059]/30 shadow-md text-center">
              <div className="flex items-center justify-center gap-2 text-[#4A6FA5] text-xs font-cinzel uppercase tracking-widest mb-2 font-semibold">
                <Clock className="w-4 h-4 text-[#C5A059]" />
                Ceremony Date &amp; Time
              </div>
              <p className="font-serif text-xl font-bold text-[#0F2038]">
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
                  <div key={i} className="py-2.5 px-1 rounded-xl bg-[#EFF4FA] border border-[#C5A059]/25 text-center">
                    <p className="font-serif text-lg font-bold text-[#1E3A5F]">{item.val}</p>
                    <p className="text-[9px] uppercase tracking-wider text-[#4A6FA5] font-semibold">{item.label}</p>
                  </div>
                ))}
              </div>

              {/* ADD TO CALENDAR */}
              <button
                onClick={handleAddToCalendar}
                className="mt-5 w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#1E3A5F] text-[#FAF8F3] font-cinzel text-xs font-semibold tracking-wider hover:bg-[#152B46] transition-colors shadow-sm"
              >
                <CalendarPlus className="w-4 h-4 text-[#C5A059]" />
                Add to Google Calendar
              </button>
            </div>
          </section>

          {/* CEREMONY SCHEDULE / ITINERARY */}
          <section className="px-6 py-4">
            <div className="text-center mb-5">
              <p className="font-cinzel text-[10px] uppercase tracking-[0.25em] text-[#4A6FA5] font-bold">
                Program Order
              </p>
              <h3 className="font-serif text-2xl font-bold text-[#0F2038] mt-1">
                The Sunnah Itinerary
              </h3>
            </div>

            <div className="space-y-3">
              {schedule.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border transition-all ${
                    item.highlight
                      ? 'bg-gradient-to-r from-[#EFF4FA] to-[#FAF8F3] border-[#C5A059] shadow-md'
                      : 'bg-white border-[#C5A059]/25'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="inline-block px-2.5 py-1 rounded-md bg-[#1E3A5F] text-[#E5D298] text-[10px] font-cinzel font-bold tracking-wider">
                      {item.time}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest font-semibold text-[#4A6FA5]">
                      {item.tag}
                    </span>
                  </div>
                  <h4 className="font-serif text-base font-bold text-[#0F2038] mt-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* PALETTE */}
          <section className="px-6 py-4">
            <div className="p-5 rounded-2xl bg-[#EFF4FA] border border-[#C5A059]/30 text-center">
              <p className="font-cinzel text-[10px] uppercase tracking-[0.2em] text-[#4A6FA5] font-bold mb-1">
                Celebration Colors
              </p>
              <h4 className="font-serif text-base font-bold text-[#0F2038] mb-4">
                Recommended Attire Palette
              </h4>
              <div className="grid grid-cols-4 gap-2">
                {dressCodeColors.map((col, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <span
                      className="w-10 h-10 rounded-full shadow-md border-2 border-white mb-1.5"
                      style={{ backgroundColor: col.hex }}
                    />
                    <span className="text-[9px] font-semibold text-[#1E293B] text-center leading-tight">
                      {col.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* VENUE & MAP */}
          <section className="px-6 py-4">
            <div className="rounded-3xl overflow-hidden bg-white border border-[#C5A059]/30 shadow-md">
              <div className="relative h-44 w-full bg-[#EBF1F7]">
                <img
                  src={venueImage}
                  alt={venueName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <p className="font-cinzel text-[10px] uppercase tracking-widest text-[#E5D298] font-bold">
                    Dawat Venue
                  </p>
                  <p className="font-serif text-sm font-bold truncate">
                    {venueName}
                  </p>
                </div>
              </div>

              <div className="p-5 text-center">
                <div className="flex items-center justify-center gap-1.5 text-xs text-gray-700 font-sans mb-4">
                  <MapPin className="w-4 h-4 text-[#C5A059] shrink-0" />
                  <span className="text-xs leading-relaxed">{venueAddress}</span>
                </div>

                <a
                  href={venueMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#1E3A5F] hover:bg-[#152B46] text-[#FAF8F3] font-cinzel text-xs font-semibold tracking-wider transition-colors shadow-sm"
                >
                  <Navigation className="w-4 h-4 text-[#C5A059]" />
                  Open in Google Maps
                </a>
              </div>
            </div>
          </section>

          {/* RSVP ACTION BUTTON */}
          <section className="px-6 py-6 text-center">
            <button
              onClick={() => setRsvpOpen(true)}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C5A059] via-[#DFC270] to-[#C5A059] hover:from-[#DFC270] hover:to-[#C5A059] text-[#0F2038] font-cinzel text-xs font-bold uppercase tracking-widest shadow-xl transition-transform active:scale-95"
            >
              Respond to Invitation (RSVP)
            </button>
          </section>

          {/* FOOTER */}
          <footer className="py-8 px-6 text-center bg-[#FAF8F3] border-t border-[#C5A059]/30">
            <p className="font-serif text-2xl text-[#1E3A5F] font-bold mb-1">
              {babyName}
            </p>
            <p className="font-cinzel text-[10px] tracking-widest text-[#4A6FA5] uppercase font-semibold">
              {hashtag}
            </p>
          </footer>
        </div>
      </main>

      {/* RSVP MODAL */}
      {rsvpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-sm bg-white rounded-3xl border-2 border-[#C5A059] p-6 text-[#1E293B] shadow-2xl">
            <button onClick={() => setRsvpOpen(false)} className="absolute top-4 right-4 p-1 text-gray-400 hover:text-black">
              <X className="w-5 h-5" />
            </button>
            {rsvpSubmitted ? (
              <div className="text-center py-6">
                <CheckCircle2 className="w-12 h-12 text-[#1E3A5F] mx-auto mb-2" />
                <h3 className="font-serif text-xl font-bold text-[#1E3A5F]">JazakAllah Khair!</h3>
                <p className="text-xs text-gray-600 mt-1">Your attendance &amp; blessed prayers have been warmly received. We look forward to seeing you.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-bold text-center text-[#1E3A5F]">Aqiqah Ceremony RSVP</h3>
                <p className="text-xs text-center text-gray-600">Please confirm your attendance for {babyName}&apos;s Aqiqah Dawat.</p>
                <div>
                  <label className="block text-xs font-semibold mb-1">Guest / Family Name</label>
                  <input
                    type="text"
                    required
                    value={rsvpForm.name}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, name: e.target.value })}
                    placeholder="e.g. Dr. & Mrs. Farhan"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#C5A059] focus:outline-none focus:ring-1 focus:ring-[#1E3A5F]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Total Attending</label>
                  <select
                    value={rsvpForm.guests}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, guests: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#C5A059] bg-white focus:outline-none"
                  >
                    <option value="1">1 Person</option>
                    <option value="2">2 Persons</option>
                    <option value="3">3 Persons</option>
                    <option value="4+">Family (4+ Persons)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Dua / Blessing for Baby (Optional)</label>
                  <input
                    type="text"
                    value={rsvpForm.wish}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, wish: e.target.value })}
                    placeholder="May Allah grant him long life..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#C5A059] focus:outline-none focus:ring-1 focus:ring-[#1E3A5F]"
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
                  className="w-full py-3 rounded-xl bg-[#1E3A5F] text-[#FAF8F3] font-cinzel text-xs font-bold uppercase tracking-wider shadow-md"
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
        className="fixed bottom-5 right-5 z-40 p-3 rounded-full bg-[#121E2C] text-[#C5A059] border border-[#C5A059]/50 shadow-2xl"
        title={isMuted ? "Play Soothing Ambient Oud" : "Mute Music"}
      >
        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </button>

    </div>
  );
}
