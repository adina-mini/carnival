'use client';

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Heart,
  CalendarPlus,
  MapPin,
  Navigation,
  Volume2,
  VolumeX,
  X,
  CheckCircle2,
  Clock,
  Gem
} from 'lucide-react';
import { submitRsvp } from '@/lib/supabase';

export default function EngagementTemplate({ data, isSample = false, invitationId }) {
  const brideName = data?.bride_name || "Hira Tariq";
  const groomName = data?.groom_name || "Zain Qureshi";
  const coupleInitials = data?.couple_initials || "H & Z";
  const coupleNames = `${brideName} & ${groomName}`;
  const eventTitle = data?.event_title || "The Mangni & Ring Ceremony";
  const eventSubtitle = data?.event_subtitle || "Two Souls, One Sacred Promise";
  const eventDateIso = data?.event_date_iso || "2026-11-20T19:30:00";
  const eventDateDisplay = data?.event_date_display || "Friday • November 20, 2026";
  const eventTimeDisplay = data?.event_time_display || "Half Past Seven in the Evening";
  const cityDisplay = data?.city_display || "Lahore, Pakistan";
  const venueName = data?.venue_name || "The Royal Palm Golf & Country Club • Babar Hall";
  const venueAddress = data?.venue_address || "52 Canal Bank Road, Mughalpura, Lahore, Pakistan";
  const venueMapUrl = data?.venue_map_url || "https://maps.google.com/?q=Royal+Palm+Lahore";
  const hashtag = data?.hashtag || "#HIRAGOTZAINED";

  // Dedicated artwork slots
  const heroImage = data?.hero_image || "/assets/engagement-couple.jpg";
  const storyCollageImage = data?.story_collage_image || "/assets/engagement-story-collage.jpg";
  const venueImage = data?.venue_image || "/assets/venue-hall.png";

  const schedule = data?.schedule || [
    { time: "7:30 PM", tag: "Arrival", title: "Welcome & Rose Jasmine Sharbat", desc: "Arrival of families, scented rose water welcome, and fresh cardamom mocktails." },
    { time: "8:15 PM", tag: "Mangni", title: "The Ring Exchange Ceremony", desc: "The exchanging of rings, exchanging of sweet mithai, and parental prayers of barakah.", highlight: true },
    { time: "9:00 PM", tag: "Dawat", title: "Engagement Celebration Feast", desc: "Traditional banquet dinner with live BBQ sajji, mutton dum biryani, and pistachio kheer." },
    { time: "10:30 PM", tag: "Blessings", title: "Family Portraits & Parting Duas", desc: "Capturing cherished memories with close family and concluding blessings." },
  ];

  // Palette from user artwork: Emerald Green, Charcoal, Antique Gold, Blush Rose
  const dressCodeColors = [
    { name: "Emerald Green", hex: "#0D3826" },
    { name: "Charcoal Slate", hex: "#22252A" },
    { name: "Antique Gold", hex: "#C5A059" },
    { name: "Blush Rose", hex: "#DDA5A9" },
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
    const title = encodeURIComponent(`${coupleNames}'s ${eventTitle}`);
    const details = encodeURIComponent(`You are cordially invited to celebrate the Engagement of ${coupleNames}.`);
    const location = encodeURIComponent(`${venueName}, ${venueAddress}`);
    window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`, '_blank');
  };

  return (
    <div className="bg-[#0B1510] text-gray-800 antialiased font-sans min-h-screen overflow-x-hidden relative selection:bg-[#0D3826] selection:text-white">

      {isSample && (
        <div className="sticky top-0 z-40 bg-[#13231B]/95 backdrop-blur-md border-b border-[#C5A059]/40 text-[#E5D298] text-center py-2 px-4 text-xs font-cinzel tracking-wider">
          💍 Sample Template Showcase &bull; Mohabbat &amp; Noor • Engagement &amp; Mangni
        </div>
      )}

      <main className="relative z-10 w-full min-h-screen py-0 sm:py-10 flex justify-center items-start">
        <div className="w-full sm:max-w-[460px] bg-[#FAF7F2] text-[#1F121C] sm:rounded-[36px] shadow-[0_25px_90px_rgba(0,0,0,0.92)] border-0 sm:border-2 sm:border-[#C5A059]/40 overflow-hidden relative">

          {/* TOP ORNATE CORNER BORDER */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#22252A] via-[#C5A059] to-[#0D3826]" />

          {/* HEADER SECTION */}
          <header className="pt-10 pb-6 px-6 text-center relative">
            <div className="flex justify-center items-center gap-2 mb-3">
              <span className="h-[1px] w-8 bg-[#C5A059]/50"></span>
              <Gem className="w-4 h-4 text-[#C5A059]" />
              <span className="h-[1px] w-8 bg-[#C5A059]/50"></span>
            </div>

            <p className="font-arabic text-2xl text-[#0D3826] leading-loose">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>

            <p className="font-cinzel text-[10px] uppercase tracking-[0.25em] text-[#22252A] font-bold mt-1">
              Together With Their Families
            </p>

            <h1 className="font-serif text-3xl sm:text-4xl text-[#0D3826] font-bold mt-2 tracking-wide">
              {brideName}
            </h1>
            <p className="font-script text-3xl text-[#C5A059] my-1">&amp;</p>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#22252A] font-bold tracking-wide">
              {groomName}
            </h1>

            <p className="font-sans text-xs text-gray-600 mt-2">
              Cordially invite you to celebrate the joyous occasion of their
            </p>

            <div className="mt-3 inline-block px-3.5 py-1 rounded-full bg-[#EBF2ED] border border-[#C5A059]/30 text-[10px] font-cinzel uppercase tracking-widest text-[#0D3826] font-bold">
              {eventTitle}
            </div>
          </header>

          {/* HERO COUPLE ARTWORK (Royal Dome / Mehrab Arch) */}
          <section className="px-6 py-2">
            {heroImage && (
              <div className="relative w-64 sm:w-72 mx-auto my-3 rounded-t-full rounded-b-2xl border-2 border-[#C5A059]/60 p-2 shadow-2xl bg-gradient-to-b from-[#FAF7F2] via-white to-[#F2F6F3]">
                <div className="w-full aspect-[4/5] rounded-t-full rounded-b-xl overflow-hidden relative shadow-inner bg-[#F2F6F3]">
                  <img
                    src={heroImage}
                    alt={coupleNames}
                    className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 rounded-t-full rounded-b-xl ring-1 ring-inset ring-[#C5A059]/35 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1F121C]/70 via-transparent to-transparent pointer-events-none" />

                  {/* Bottom Overlay Label */}
                  <div className="absolute bottom-3 left-3 right-3 text-center text-white">
                    <p className="font-cinzel text-[10px] tracking-[0.25em] uppercase text-[#E5D298] font-bold drop-shadow">
                      The Ring Exchange
                    </p>
                    <p className="font-serif text-base font-bold text-white drop-shadow">
                      {coupleInitials} &bull; Forever Begins Today
                    </p>
                  </div>
                </div>
                <div className="mt-2 text-center">
                  <span className="font-cinzel text-[10px] tracking-[0.25em] text-[#0D3826] uppercase font-bold">
                    A Sacred Promise of Love
                  </span>
                </div>
              </div>
            )}
          </section>

          {/* DEDICATION CARD */}
          <section className="px-6 py-4 text-center">
            <div className="p-5 rounded-2xl bg-[#F2F6F3] border border-[#C5A059]/30 shadow-inner">
              <Heart className="w-5 h-5 text-[#C5A059] mx-auto mb-2 opacity-90 fill-[#C5A059]/20" />
              <p className="font-serif text-xs italic text-[#0D3826] leading-relaxed mb-1">
                &ldquo;From this day forward, as our promises are spoken and rings are exchanged, we step hand-in-hand onto the threshold of a lifetime together.&rdquo;
              </p>
              <p className="font-cinzel text-[9px] uppercase tracking-widest text-[#22252A] mt-2 font-bold">
                {hashtag}
              </p>
            </div>
          </section>

          {/* DATE & TIME CARD */}
          <section className="px-6 py-2">
            <div className="p-6 rounded-3xl bg-white border border-[#C5A059]/30 shadow-md text-center">
              <div className="flex items-center justify-center gap-2 text-[#22252A] text-xs font-cinzel uppercase tracking-widest mb-2 font-semibold">
                <Clock className="w-4 h-4 text-[#C5A059]" />
                Event Date &amp; Timings
              </div>
              <p className="font-serif text-xl font-bold text-[#1F121C]">
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
                  <div key={i} className="py-2.5 px-1 rounded-xl bg-[#F2F6F3] border border-[#C5A059]/25 text-center">
                    <p className="font-serif text-lg font-bold text-[#0D3826]">{item.val}</p>
                    <p className="text-[9px] uppercase tracking-wider text-[#22252A] font-semibold">{item.label}</p>
                  </div>
                ))}
              </div>

              {/* ADD TO CALENDAR */}
              <button
                onClick={handleAddToCalendar}
                className="mt-5 w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#0D3826] text-[#FAF7F2] font-cinzel text-xs font-semibold tracking-wider hover:bg-[#082418] transition-colors shadow-sm"
              >
                <CalendarPlus className="w-4 h-4 text-[#C5A059]" />
                Add to Google Calendar
              </button>
            </div>
          </section>

          {/* CEREMONY SCHEDULE / ITINERARY */}
          <section className="px-6 py-4">
            <div className="text-center mb-5">
              <p className="font-cinzel text-[10px] uppercase tracking-[0.25em] text-[#22252A] font-bold">
                Program Order
              </p>
              <h3 className="font-serif text-2xl font-bold text-[#1F121C] mt-1">
                The Mangni Itinerary
              </h3>
            </div>

            <div className="space-y-3">
              {schedule.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border transition-all ${
                    item.highlight
                      ? 'bg-gradient-to-r from-[#EBF2ED] to-[#FAF7F2] border-[#C5A059] shadow-md'
                      : 'bg-white border-[#C5A059]/25'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="inline-block px-2.5 py-1 rounded-md bg-[#0D3826] text-[#E5D298] text-[10px] font-cinzel font-bold tracking-wider">
                      {item.time}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest font-semibold text-[#22252A]">
                      {item.tag}
                    </span>
                  </div>
                  <h4 className="font-serif text-base font-bold text-[#1F121C] mt-2">
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
            <div className="p-5 rounded-2xl bg-[#F2F6F3] border border-[#C5A059]/30 text-center">
              <p className="font-cinzel text-[10px] uppercase tracking-[0.2em] text-[#22252A] font-bold mb-1">
                Ceremony Palette
              </p>
              <h4 className="font-serif text-base font-bold text-[#1F121C] mb-1">
                Recommended Attire Colors
              </h4>
              <p className="text-xs text-gray-600 mb-4">
                Rich emerald green shararas, charcoal slate bandhgalas, and antique gold accents.
              </p>
              <div className="grid grid-cols-4 gap-2">
                {dressCodeColors.map((col, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <span
                      className="w-10 h-10 rounded-full shadow-md border-2 border-white mb-1.5"
                      style={{ backgroundColor: col.hex }}
                    />
                    <span className="text-[9px] font-semibold text-[#1F121C] text-center leading-tight">
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
              <div className="relative h-44 w-full bg-[#EAE3D2]">
                <img
                  src={venueImage}
                  alt={venueName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <p className="font-cinzel text-[10px] uppercase tracking-widest text-[#E5D298] font-bold">
                    Celebration Venue
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
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#0D3826] hover:bg-[#082418] text-[#FAF7F2] font-cinzel text-xs font-semibold tracking-wider transition-colors shadow-sm"
                >
                  <Navigation className="w-4 h-4 text-[#C5A059]" />
                  Open in Google Maps
                </a>
              </div>
            </div>
          </section>

          {/* OUR STORY & MEMORIES COLLAGE */}
          {storyCollageImage && (
            <section className="px-6 py-6">
              <div className="text-center mb-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5ECE8] text-[#0D3826] text-[10px] font-cinzel uppercase tracking-widest font-bold">
                  <Heart className="w-3 h-3 text-[#C5A059] fill-[#C5A059]" />
                  Our Journey Together
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#1F121C] mt-2">
                  Cherished Memories
                </h3>
                <p className="text-[11px] text-gray-600 font-sans mt-0.5">
                  From shared laughter and quiet conversations to forever promises.
                </p>
              </div>

              <div className="relative rounded-3xl overflow-hidden border border-[#C5A059]/40 shadow-2xl bg-white p-2.5">
                <div className="rounded-2xl overflow-hidden">
                  <img
                    src={storyCollageImage}
                    alt="Our Journey Story Collage"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="p-3 text-center bg-[#FAF7F2]">
                  <p className="font-script text-2xl text-[#0D3826]">
                    Where It All Began &bull; Forever Ahead
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* RSVP ACTION BUTTON */}
          <section className="px-6 py-6 text-center">
            <button
              onClick={() => setRsvpOpen(true)}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C5A059] via-[#DFC270] to-[#C5A059] hover:from-[#DFC270] hover:to-[#C5A059] text-[#240B19] font-cinzel text-xs font-bold uppercase tracking-widest shadow-xl transition-transform active:scale-95"
            >
              Respond to Invitation (RSVP)
            </button>
          </section>

          {/* FOOTER */}
          <footer className="py-8 px-6 text-center bg-[#FAF7F2] border-t border-[#C5A059]/30">
            <p className="font-script text-3xl text-[#0D3826] mb-1">
              {brideName.split(' ')[0]} &amp; {groomName.split(' ')[0]}
            </p>
            <p className="font-cinzel text-[10px] tracking-widest text-gray-500 uppercase font-semibold">
              {hashtag}
            </p>
          </footer>
        </div>
      </main>

      {/* RSVP MODAL */}
      {rsvpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-sm bg-white rounded-3xl border-2 border-[#C5A059] p-6 text-[#1F121C] shadow-2xl">
            <button onClick={() => setRsvpOpen(false)} className="absolute top-4 right-4 p-1 text-gray-400 hover:text-black">
              <X className="w-5 h-5" />
            </button>
            {rsvpSubmitted ? (
              <div className="text-center py-6">
                <CheckCircle2 className="w-12 h-12 text-[#0D3826] mx-auto mb-2" />
                <h3 className="font-serif text-xl font-bold text-[#0D3826]">Attendance Confirmed!</h3>
                <p className="text-xs text-gray-600 mt-1">Your response has been recorded with delight. We look forward to celebrating together.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-bold text-center text-[#0D3826]">Engagement Ceremony RSVP</h3>
                <p className="text-xs text-center text-gray-600">Please confirm your attendance for {coupleNames}&apos;s Mangni.</p>
                <div>
                  <label className="block text-xs font-semibold mb-1">Guest / Family Name</label>
                  <input
                    type="text"
                    required
                    value={rsvpForm.name}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, name: e.target.value })}
                    placeholder="e.g. Mr. & Mrs. Tariq"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#C5A059] focus:outline-none focus:ring-1 focus:ring-[#0D3826]"
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
                  <label className="block text-xs font-semibold mb-1">Congratulations Note (Optional)</label>
                  <input
                    type="text"
                    value={rsvpForm.wish}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, wish: e.target.value })}
                    placeholder="Wishing you a blessed journey..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#C5A059] focus:outline-none focus:ring-1 focus:ring-[#0D3826]"
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
                  className="w-full py-3 rounded-xl bg-[#0D3826] text-[#FAF7F2] font-cinzel text-xs font-bold uppercase tracking-wider shadow-md hover:bg-[#082418] transition-colors"
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
        className="fixed bottom-5 right-5 z-40 p-3 rounded-full bg-[#0B1510] text-[#C5A059] border border-[#C5A059]/50 shadow-2xl"
        title={isMuted ? "Play Sitar & Flute" : "Mute Music"}
      >
        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </button>

    </div>
  );
}
