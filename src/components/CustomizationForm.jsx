'use client';

import React, { useState } from 'react';
import {
  Upload,
  Calendar,
  MapPin,
  Clock,
  Plus,
  Trash2,
  Sparkles,
  Check,
  Image as ImageIcon,
  Save,
  Send,
  HelpCircle,
  AlertCircle
} from 'lucide-react';

export default function CustomizationForm({
  template,
  formData,
  setFormData,
  mediaUploads,
  setMediaUploads,
  onSaveDraft,
  onPublish,
  isPublishing = false,
  isSavingDraft = false,
}) {
  const [activeTab, setActiveTab] = useState('names'); // 'names' | 'datetime' | 'venue' | 'schedule' | 'photos'
  const [uploadError, setUploadError] = useState('');

  // Handle generic text change
  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Schedule management
  const handleScheduleChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...(prev.schedule || [])];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, schedule: updated };
    });
  };

  const addScheduleItem = () => {
    setFormData((prev) => ({
      ...prev,
      schedule: [
        ...(prev.schedule || []),
        { time: '1:00 PM', tag: 'Ceremony', title: 'Special Moment', desc: 'Family and friends gather.' },
      ],
    }));
  };

  const removeScheduleItem = (index) => {
    setFormData((prev) => {
      const updated = (prev.schedule || []).filter((_, i) => i !== index);
      return { ...prev, schedule: updated };
    });
  };

  // File upload handler (reads to base64 data URL with client-side compression or passes to storage)
  const handleFileUpload = (slotKey, e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Please upload an image file (PNG, JPG, or WebP).');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setUploadError('Image size exceeds 8MB. Please choose a smaller photo.');
      return;
    }

    setUploadError('');
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result;
      setMediaUploads((prev) => ({
        ...prev,
        [slotKey]: {
          name: file.name,
          dataUrl: dataUrl,
          size: file.size,
          lastModified: file.lastModified,
        },
      }));
      // Also update formData reference
      setFormData((prev) => ({
        ...prev,
        [slotKey]: dataUrl,
      }));
    };
    reader.readAsDataURL(file);
  };

  const clearSlot = (slotKey) => {
    setMediaUploads((prev) => {
      const updated = { ...prev };
      delete updated[slotKey];
      return updated;
    });
    setFormData((prev) => ({
      ...prev,
      [slotKey]: null,
    }));
  };

  const slots = template.slots || {};

  return (
    <div className="bg-paper rounded-3xl border border-sand-300 p-5 sm:p-7 text-espresso shadow-xs">
      {/* Form Tabs */}
      <div className="flex flex-wrap gap-2 pb-4 mb-6 border-b border-sand-200">
        {[
          { id: 'names', label: '1. Names & Details' },
          { id: 'datetime', label: '2. Date & Time' },
          { id: 'venue', label: '3. Venue & Maps' },
          { id: 'schedule', label: '4. Schedule' },
          { id: 'photos', label: '5. Photos & Media' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-3.5 py-1.5 rounded-full font-sans text-xs font-medium tracking-wide uppercase transition-all ${
              activeTab === tab.id
                ? 'bg-espresso text-paper shadow-xs font-semibold'
                : 'bg-sand-100 text-espresso/70 hover:text-espresso hover:bg-sand-200 border border-sand-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {uploadError && (
        <div className="mb-4 p-3 rounded-xl bg-burgundy/10 border border-burgundy/30 text-burgundy text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{uploadError}</span>
        </div>
      )}

      {/* TAB 1: NAMES & ESSENTIAL DETAILS */}
      {activeTab === 'names' && (
        <div className="space-y-4">
          <h3 className="font-serif text-lg font-bold text-espresso flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-olive" />
            Names &amp; Invitation Headers
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-espresso mb-1">
                Bride&apos;s Full Name / Honoree
              </label>
              <input
                type="text"
                value={formData.bride_name || ''}
                onChange={(e) => handleChange('bride_name', e.target.value)}
                placeholder="e.g. Fatima Hafeez"
                className="w-full px-3.5 py-2.5 rounded-xl bg-sand-50 border border-sand-300 text-espresso placeholder-espresso/40 text-xs focus:outline-none focus:ring-2 focus:ring-espresso focus:border-espresso"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-espresso mb-1">
                Groom&apos;s Full Name (Optional)
              </label>
              <input
                type="text"
                value={formData.groom_name || ''}
                onChange={(e) => handleChange('groom_name', e.target.value)}
                placeholder="e.g. Rao Sharjeel"
                className="w-full px-3.5 py-2.5 rounded-xl bg-sand-50 border border-sand-300 text-espresso placeholder-espresso/40 text-xs focus:outline-none focus:ring-2 focus:ring-espresso focus:border-espresso"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-espresso mb-1">
                Couple Monogram / Initials
              </label>
              <input
                type="text"
                value={formData.couple_initials || ''}
                onChange={(e) => handleChange('couple_initials', e.target.value)}
                placeholder="e.g. F & S"
                className="w-full px-3.5 py-2.5 rounded-xl bg-sand-50 border border-sand-300 text-espresso placeholder-espresso/40 text-xs focus:outline-none focus:ring-2 focus:ring-espresso focus:border-espresso"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-espresso mb-1">
                Celebration Hashtag
              </label>
              <input
                type="text"
                value={formData.hashtag || ''}
                onChange={(e) => handleChange('hashtag', e.target.value)}
                placeholder="e.g. #FATIMAANDSHARJEEL2026"
                className="w-full px-3.5 py-2.5 rounded-xl bg-sand-50 border border-sand-300 text-espresso placeholder-espresso/40 text-xs focus:outline-none focus:ring-2 focus:ring-espresso focus:border-espresso"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={() => setActiveTab('datetime')}
              className="px-4 py-2 rounded-xl bg-sand-100 hover:bg-sand-200 border border-sand-300 text-espresso font-sans text-xs font-semibold uppercase tracking-wider transition-all"
            >
              Continue to Date &amp; Time &rarr;
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: DATE & TIME */}
      {activeTab === 'datetime' && (
        <div className="space-y-4">
          <h3 className="font-serif text-lg font-bold text-espresso flex items-center gap-2">
            <Calendar className="w-4 h-4 text-olive" />
            Date &amp; Countdown Target
          </h3>

          <div>
            <label className="block text-xs font-semibold text-espresso mb-1">
              Exact Event Date &amp; Time (For Live Countdown &amp; Calendar)
            </label>
            <input
              type="datetime-local"
              value={formData.event_date_iso ? formData.event_date_iso.substring(0, 16) : ''}
              onChange={(e) => handleChange('event_date_iso', e.target.value ? `${e.target.value}:00` : '')}
              className="w-full px-3.5 py-2.5 rounded-xl bg-sand-50 border border-sand-300 text-espresso text-xs focus:outline-none focus:ring-2 focus:ring-espresso focus:border-espresso"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-espresso mb-1">
                Display Date (Printed on Card)
              </label>
              <input
                type="text"
                value={formData.event_date_display || ''}
                onChange={(e) => handleChange('event_date_display', e.target.value)}
                placeholder="e.g. Saturday • November 7, 2026"
                className="w-full px-3.5 py-2.5 rounded-xl bg-sand-50 border border-sand-300 text-espresso placeholder-espresso/40 text-xs focus:outline-none focus:ring-2 focus:ring-espresso focus:border-espresso"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-espresso mb-1">
                Display Time
              </label>
              <input
                type="text"
                value={formData.event_time_display || ''}
                onChange={(e) => handleChange('event_time_display', e.target.value)}
                placeholder="e.g. Twelve O'Clock in the Afternoon"
                className="w-full px-3.5 py-2.5 rounded-xl bg-sand-50 border border-sand-300 text-espresso placeholder-espresso/40 text-xs focus:outline-none focus:ring-2 focus:ring-espresso focus:border-espresso"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-espresso mb-1">
              City &amp; Country
            </label>
            <input
              type="text"
              value={formData.city_display || ''}
              onChange={(e) => handleChange('city_display', e.target.value)}
              placeholder="e.g. Bahawalpur, Pakistan"
              className="w-full px-3.5 py-2.5 rounded-xl bg-sand-50 border border-sand-300 text-espresso placeholder-espresso/40 text-xs focus:outline-none focus:ring-2 focus:ring-espresso focus:border-espresso"
            />
          </div>

          <div className="pt-2 flex justify-between">
            <button
              type="button"
              onClick={() => setActiveTab('names')}
              className="px-3.5 py-1.5 rounded-xl bg-sand-100 hover:bg-sand-200 text-espresso font-sans text-xs font-medium uppercase"
            >
              &larr; Back
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('venue')}
              className="px-4 py-2 rounded-xl bg-sand-100 hover:bg-sand-200 border border-sand-300 text-espresso font-sans text-xs font-semibold uppercase tracking-wider transition-all"
            >
              Continue to Venue &rarr;
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: VENUE & MAPS */}
      {activeTab === 'venue' && (
        <div className="space-y-4">
          <h3 className="font-serif text-lg font-bold text-espresso flex items-center gap-2">
            <MapPin className="w-4 h-4 text-olive" />
            Venue &amp; Location Navigation
          </h3>

          <div>
            <label className="block text-xs font-semibold text-espresso mb-1">
              Venue / Hall Name
            </label>
            <input
              type="text"
              value={formData.venue_name || ''}
              onChange={(e) => handleChange('venue_name', e.target.value)}
              placeholder="e.g. Rashid Banquet Hall"
              className="w-full px-3.5 py-2.5 rounded-xl bg-sand-50 border border-sand-300 text-espresso placeholder-espresso/40 text-xs focus:outline-none focus:ring-2 focus:ring-espresso focus:border-espresso"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-espresso mb-1">
              Full Venue Address
            </label>
            <input
              type="text"
              value={formData.venue_address || ''}
              onChange={(e) => handleChange('venue_address', e.target.value)}
              placeholder="e.g. Ahmadpur Bypass, Sharifabad Chowk, Bahawalpur, Pakistan"
              className="w-full px-3.5 py-2.5 rounded-xl bg-sand-50 border border-sand-300 text-espresso placeholder-espresso/40 text-xs focus:outline-none focus:ring-2 focus:ring-espresso focus:border-espresso"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-espresso mb-1">
              Google Maps Location Link
            </label>
            <input
              type="url"
              value={formData.venue_map_url || ''}
              onChange={(e) => handleChange('venue_map_url', e.target.value)}
              placeholder="e.g. https://maps.google.com/?q=Rashid+Banquet+Hall"
              className="w-full px-3.5 py-2.5 rounded-xl bg-sand-50 border border-sand-300 text-espresso placeholder-espresso/40 text-xs focus:outline-none focus:ring-2 focus:ring-espresso focus:border-espresso"
            />
            <p className="text-[11px] text-espresso/60 mt-1">
              Guests will be able to click &apos;Open in Google Maps&apos; to navigate straight to the venue.
            </p>
          </div>

          <div className="pt-2 flex justify-between">
            <button
              type="button"
              onClick={() => setActiveTab('datetime')}
              className="px-3.5 py-1.5 rounded-xl bg-sand-100 hover:bg-sand-200 text-espresso font-sans text-xs font-medium uppercase"
            >
              &larr; Back
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('schedule')}
              className="px-4 py-2 rounded-xl bg-sand-100 hover:bg-sand-200 border border-sand-300 text-espresso font-sans text-xs font-semibold uppercase tracking-wider transition-all"
            >
              Continue to Schedule &rarr;
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: SCHEDULE OF EVENTS */}
      {activeTab === 'schedule' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-espresso flex items-center gap-2">
              <Clock className="w-4 h-4 text-olive" />
              Event Timeline &amp; Itinerary
            </h3>
            <button
              type="button"
              onClick={addScheduleItem}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-espresso text-paper font-sans text-[11px] font-semibold uppercase tracking-wider hover:bg-espresso-dark transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-sand-300" />
              Add Function
            </button>
          </div>

          <div className="space-y-3">
            {(formData.schedule || []).map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-sand-50 border border-sand-300 space-y-2 relative"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={item.time || ''}
                    onChange={(e) => handleScheduleChange(idx, 'time', e.target.value)}
                    placeholder="e.g. 1:00 PM"
                    className="w-24 px-2 py-1 rounded-lg bg-paper border border-sand-300 text-espresso text-xs"
                  />
                  <input
                    type="text"
                    value={item.tag || ''}
                    onChange={(e) => handleScheduleChange(idx, 'tag', e.target.value)}
                    placeholder="Tag (e.g. Ceremony)"
                    className="w-32 px-2 py-1 rounded-lg bg-paper border border-sand-300 text-espresso text-xs"
                  />
                  <input
                    type="text"
                    value={item.title || ''}
                    onChange={(e) => handleScheduleChange(idx, 'title', e.target.value)}
                    placeholder="Function Title (e.g. Ceremony)"
                    className="flex-grow px-2 py-1 rounded-lg bg-paper border border-sand-300 text-espresso text-xs font-semibold"
                  />
                  <button
                    type="button"
                    onClick={() => removeScheduleItem(idx)}
                    className="p-1 text-burgundy hover:text-burgundy-light"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <input
                  type="text"
                  value={item.desc || ''}
                  onChange={(e) => handleScheduleChange(idx, 'desc', e.target.value)}
                  placeholder="Short description or details for this function..."
                  className="w-full px-2 py-1 rounded-lg bg-paper border border-sand-300 text-espresso text-xs"
                />
              </div>
            ))}
          </div>

          <div className="pt-2 flex justify-between">
            <button
              type="button"
              onClick={() => setActiveTab('venue')}
              className="px-3.5 py-1.5 rounded-xl bg-sand-100 hover:bg-sand-200 text-espresso font-sans text-xs font-medium uppercase"
            >
              &larr; Back
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('photos')}
              className="px-4 py-2 rounded-xl bg-sand-100 hover:bg-sand-200 border border-sand-300 text-espresso font-sans text-xs font-semibold uppercase tracking-wider transition-all"
            >
              Continue to Photos &rarr;
            </button>
          </div>
        </div>
      )}

      {/* TAB 5: PHOTO UPLOAD SLOTS */}
      {activeTab === 'photos' && (
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-serif text-lg font-bold text-espresso flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-olive" />
                Upload Personal Photos
              </h3>
              <p className="font-sans text-xs text-espresso/70 mt-0.5">
                Upload your high-resolution photos into designated template slots.
              </p>
            </div>
          </div>

          {/* Educational notice regarding thumbnails vs preview */}
          <div className="p-3.5 rounded-xl bg-sand-100 border border-sand-300 text-[11px] text-espresso/80 flex items-start gap-2.5">
            <HelpCircle className="w-4 h-4 text-olive flex-shrink-0 mt-0.5" />
            <span>
              <strong>Thumbnail Notice:</strong> Your uploaded photos appear in the slots below for verification. In accordance with platform design, they will be compiled into your live invitation <strong>after you click Publish</strong>.
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(slots).map(([slotKey, slotConfig]) => {
              const currentMedia = mediaUploads[slotKey] || (formData[slotKey] ? { dataUrl: formData[slotKey], name: 'Saved Photo' } : null);

              return (
                <div
                  key={slotKey}
                  className="p-4 rounded-2xl bg-sand-50 border border-sand-300 flex flex-col justify-between"
                >
                  <div className="mb-2">
                    <span className="font-serif text-xs font-bold text-espresso block">
                      {slotConfig.label}
                    </span>
                    <span className="text-[10px] font-sans text-espresso/60 block mt-0.5">
                      Slot: {slotKey}
                    </span>
                  </div>

                  {currentMedia ? (
                    <div className="relative rounded-xl overflow-hidden border border-sand-300 bg-sand-100 h-36 flex items-center justify-center group">
                      <img
                        src={currentMedia.dataUrl}
                        alt={slotConfig.label}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-espresso/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => clearSlot(slotKey)}
                          className="px-3 py-1 rounded-lg bg-burgundy text-white text-xs font-semibold"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="absolute bottom-1 right-1 bg-paper/90 px-2 py-0.5 rounded text-[10px] text-espresso font-medium border border-sand-300">
                        Uploaded
                      </div>
                    </div>
                  ) : (
                    <label className="h-36 rounded-xl border-2 border-dashed border-sand-300 hover:border-olive bg-paper hover:bg-sand-100 transition-all flex flex-col items-center justify-center cursor-pointer p-4 text-center">
                      <Upload className="w-6 h-6 text-olive mb-1.5" />
                      <span className="font-sans text-[11px] font-semibold text-espresso">
                        Choose Photo
                      </span>
                      <span className="text-[9px] text-espresso/60 mt-0.5">
                        PNG, JPG or WebP (up to 8MB)
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(slotKey, e)}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* FORM ACTION FOOTER */}
      <div className="mt-8 pt-6 border-t border-sand-300 flex flex-col sm:flex-row items-center justify-between gap-3">
        <button
          id="save-draft-btn"
          type="button"
          onClick={onSaveDraft}
          disabled={isSavingDraft || isPublishing}
          className="w-full sm:w-auto px-6 py-3 rounded-full bg-sand-100 hover:bg-sand-200 border border-sand-300 text-espresso font-sans text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <Save className="w-4 h-4 text-olive" />
          <span>{isSavingDraft ? 'Saving Draft...' : 'Save As Draft'}</span>
        </button>

        <button
          id="publish-invitation-btn"
          type="button"
          onClick={onPublish}
          disabled={isPublishing}
          className="w-full sm:w-auto px-8 py-3 rounded-full bg-espresso hover:bg-espresso-dark text-paper font-sans text-xs font-semibold uppercase tracking-wider shadow-sm flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer"
        >
          <Send className="w-4 h-4 text-sand-300" />
          <span>{isPublishing ? 'Publishing Invitation...' : 'Publish & Generate Link'}</span>
        </button>
      </div>
    </div>
  );
}
