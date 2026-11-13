import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const title = searchParams.get('title') || 'Fatima Hafeez & Rao Sharjeel';
    const event = searchParams.get('event') || 'The Royal Barat & Reception';
    const date = searchParams.get('date') || 'Saturday, 7 November 2026';
    const time = searchParams.get('time') || "One O'Clock in the Afternoon";
    const venue = searchParams.get('venue') || 'The Grand Palm Royale, Lahore';
    const initials = searchParams.get('initials') || 'F & S';
    const hashtag = searchParams.get('hashtag') || '#FATIMAANDSHARJEEL2026';
    const link = searchParams.get('link') || 'vesna.vercel.app/invite/fatima-sharjeel';
    const theme = searchParams.get('theme') || 'burgundy';

    // Theme color definitions
    const themes = {
      burgundy: {
        bg: 'linear-gradient(180deg, #180306 0%, #2A060C 40%, #1A0307 80%, #100204 100%)',
        accent: '#D4AF37',
        accentGlow: 'rgba(212, 175, 55, 0.28)',
        border: '#8E6F27',
        badgeBg: 'rgba(212, 175, 55, 0.15)',
        badgeText: '#FDE68A',
      },
      emerald: {
        bg: 'linear-gradient(180deg, #03140C 0%, #092618 40%, #04160E 80%, #020C07 100%)',
        accent: '#5CE1A6',
        accentGlow: 'rgba(92, 225, 166, 0.28)',
        border: '#1E7E52',
        badgeBg: 'rgba(92, 225, 166, 0.15)',
        badgeText: '#A7F3D0',
      },
      noir: {
        bg: 'linear-gradient(180deg, #0A0A0C 0%, #17171C 40%, #0D0D10 80%, #050507 100%)',
        accent: '#E5C07B',
        accentGlow: 'rgba(229, 192, 123, 0.28)',
        border: '#7D6331',
        badgeBg: 'rgba(229, 192, 123, 0.15)',
        badgeText: '#F7E3AF',
      },
    };

    const currentTheme = themes[theme] || themes.burgundy;

    // Split title into bride and groom if joined with '&'
    let bride = 'Fatima Hafeez';
    let groom = 'Rao Sharjeel';
    if (title.includes('&')) {
      const parts = title.split('&');
      bride = parts[0].trim();
      groom = parts[1].trim();
    } else {
      bride = title;
      groom = '';
    }

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: currentTheme.bg,
            padding: '70px 60px',
            fontFamily: 'serif',
            position: 'relative',
            color: '#FAF5EF',
          }}
        >
          {/* Double Ornate Gold Border */}
          <div
            style={{
              position: 'absolute',
              top: '32px',
              left: '32px',
              right: '32px',
              bottom: '32px',
              border: `2px solid ${currentTheme.border}`,
              borderRadius: '40px',
              display: 'flex',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '42px',
              left: '42px',
              right: '42px',
              bottom: '42px',
              border: '1px dashed rgba(212, 175, 55, 0.4)',
              borderRadius: '32px',
              display: 'flex',
            }}
          />

          {/* Corner Flourishes */}
          <div style={{ position: 'absolute', top: '56px', left: '60px', color: currentTheme.accent, fontSize: '30px' }}>✦</div>
          <div style={{ position: 'absolute', top: '56px', right: '60px', color: currentTheme.accent, fontSize: '30px' }}>✦</div>
          <div style={{ position: 'absolute', bottom: '56px', left: '60px', color: currentTheme.accent, fontSize: '30px' }}>✦</div>
          <div style={{ position: 'absolute', bottom: '56px', right: '60px', color: currentTheme.accent, fontSize: '30px' }}>✦</div>

          {/* SECTION 1: HEADER & BISMILLAH */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              marginTop: '10px',
            }}
          >
            {/* Atelier Crest Badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                marginBottom: '16px',
              }}
            >
              <div style={{ width: '40px', height: '1px', background: currentTheme.accent }} />
              <div
                style={{
                  fontSize: '15px',
                  letterSpacing: '0.35em',
                  textTransform: 'uppercase',
                  color: '#ECD88C',
                  fontFamily: 'sans-serif',
                  fontWeight: 600,
                }}
              >
                VESNA ATELIER • ROYAL INVITATION
              </div>
              <div style={{ width: '40px', height: '1px', background: currentTheme.accent }} />
            </div>

            {/* Bismillah Calligraphy */}
            <div
              style={{
                fontSize: '38px',
                color: currentTheme.accent,
                fontWeight: 700,
                marginBottom: '20px',
                textShadow: '0 2px 10px rgba(0,0,0,0.5)',
              }}
            >
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </div>

            {/* Monogram Seal */}
            <div
              style={{
                width: '94px',
                height: '94px',
                borderRadius: '50%',
                border: `2px solid ${currentTheme.accent}`,
                background: 'rgba(0,0,0,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                fontWeight: 700,
                color: '#FAF5EF',
                letterSpacing: '0.15em',
                boxShadow: '0 6px 20px rgba(0,0,0,0.5)',
                marginBottom: '18px',
              }}
            >
              {initials}
            </div>

            <div
              style={{
                fontSize: '15px',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: '#D5BEA6',
                fontFamily: 'sans-serif',
                fontWeight: 600,
                marginBottom: '4px',
              }}
            >
              TOGETHER WITH THEIR FAMILIES
            </div>
            <div
              style={{
                fontSize: '19px',
                fontStyle: 'italic',
                color: '#ECD88C',
                marginBottom: '10px',
              }}
            >
              cordially request the honour of your presence at
            </div>
          </div>

          {/* SECTION 2: CEREMONY & COUPLE NAMES */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              margin: '10px 0',
            }}
          >
            {/* Event Title Pill */}
            <div
              style={{
                display: 'flex',
                padding: '8px 28px',
                borderRadius: '9999px',
                background: currentTheme.badgeBg,
                border: `1px solid ${currentTheme.accent}`,
                color: currentTheme.badgeText,
                fontSize: '17px',
                fontFamily: 'sans-serif',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                fontWeight: 700,
                marginBottom: '24px',
              }}
            >
              {event}
            </div>

            {/* Bride Name */}
            <div
              style={{
                fontSize: '66px',
                fontWeight: 700,
                color: '#FAF5EF',
                textAlign: 'center',
                lineHeight: 1.1,
                textShadow: '0 4px 20px rgba(0,0,0,0.7)',
              }}
            >
              {bride}
            </div>

            {/* Ampersand Filigree */}
            {groom && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  margin: '12px 0',
                }}
              >
                <div style={{ width: '80px', height: '1px', background: currentTheme.accent }} />
                <div style={{ fontSize: '32px', color: currentTheme.accent, fontStyle: 'italic' }}>&</div>
                <div style={{ width: '80px', height: '1px', background: currentTheme.accent }} />
              </div>
            )}

            {/* Groom Name */}
            {groom && (
              <div
                style={{
                  fontSize: '66px',
                  fontWeight: 700,
                  color: '#FAF5EF',
                  textAlign: 'center',
                  lineHeight: 1.1,
                  textShadow: '0 4px 20px rgba(0,0,0,0.7)',
                }}
              >
                {groom}
              </div>
            )}
          </div>

          {/* SECTION 3: DATE, TIME & VENUE DETAILS */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              padding: '24px 30px',
              borderRadius: '24px',
              background: 'rgba(0,0,0,0.35)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              margin: '15px 0',
            }}
          >
            {/* Date Ribbon */}
            <div
              style={{
                fontSize: '24px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                color: '#FAF5EF',
                marginBottom: '8px',
              }}
            >
              🗓 {date}
            </div>

            {/* Time */}
            <div
              style={{
                fontSize: '18px',
                fontFamily: 'sans-serif',
                color: '#ECD88C',
                letterSpacing: '0.05em',
                marginBottom: '14px',
              }}
            >
              ⏰ {time}
            </div>

            <div style={{ width: '200px', height: '1px', background: 'rgba(212, 175, 55, 0.35)', marginBottom: '14px' }} />

            {/* Venue */}
            <div
              style={{
                fontSize: '20px',
                fontWeight: 600,
                color: '#FAF5EF',
                textAlign: 'center',
                lineHeight: 1.3,
              }}
            >
              📍 {venue}
            </div>
          </div>

          {/* SECTION 4: INTERACTIVE QR CODE & RSVP */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              marginBottom: '10px',
            }}
          >
            {/* Elegant Golden QR Code Box */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '18px 24px',
                borderRadius: '22px',
                background: '#FAF5EF',
                border: `2px solid ${currentTheme.accent}`,
                boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
                marginBottom: '18px',
              }}
            >
              {/* Pure SVG Stylized QR Symbol */}
              <svg width="150" height="150" viewBox="0 0 100 100" fill="none">
                {/* Top-Left Finder */}
                <rect x="5" y="5" width="28" height="28" rx="4" fill="#26060A" />
                <rect x="9" y="9" width="20" height="20" rx="2" fill="#FAF5EF" />
                <rect x="13" y="13" width="12" height="12" rx="2" fill="#D4AF37" />

                {/* Top-Right Finder */}
                <rect x="67" y="5" width="28" height="28" rx="4" fill="#26060A" />
                <rect x="71" y="9" width="20" height="20" rx="2" fill="#FAF5EF" />
                <rect x="75" y="13" width="12" height="12" rx="2" fill="#D4AF37" />

                {/* Bottom-Left Finder */}
                <rect x="5" y="67" width="28" height="28" rx="4" fill="#26060A" />
                <rect x="9" y="71" width="20" height="20" rx="2" fill="#FAF5EF" />
                <rect x="13" y="75" width="12" height="12" rx="2" fill="#D4AF37" />

                {/* Data Modules Grid */}
                <rect x="40" y="8" width="6" height="6" rx="1" fill="#26060A" />
                <rect x="52" y="8" width="6" height="6" rx="1" fill="#26060A" />
                <rect x="40" y="20" width="6" height="6" rx="1" fill="#26060A" />
                <rect x="52" y="20" width="6" height="6" rx="1" fill="#D4AF37" />
                
                <rect x="8" y="42" width="6" height="6" rx="1" fill="#26060A" />
                <rect x="20" y="42" width="6" height="6" rx="1" fill="#D4AF37" />
                <rect x="8" y="54" width="6" height="6" rx="1" fill="#26060A" />
                <rect x="20" y="54" width="6" height="6" rx="1" fill="#26060A" />

                <rect x="72" y="42" width="6" height="6" rx="1" fill="#26060A" />
                <rect x="84" y="42" width="6" height="6" rx="1" fill="#26060A" />
                <rect x="72" y="54" width="6" height="6" rx="1" fill="#D4AF37" />
                <rect x="84" y="54" width="6" height="6" rx="1" fill="#26060A" />

                <rect x="40" y="72" width="6" height="6" rx="1" fill="#26060A" />
                <rect x="52" y="72" width="6" height="6" rx="1" fill="#26060A" />
                <rect x="40" y="84" width="6" height="6" rx="1" fill="#D4AF37" />
                <rect x="52" y="84" width="6" height="6" rx="1" fill="#26060A" />

                {/* Center Core Emblem */}
                <rect x="38" y="38" width="24" height="24" rx="4" fill="#26060A" />
                <rect x="42" y="42" width="16" height="16" rx="3" fill="#D4AF37" />
                <circle cx="50" cy="50" r="4" fill="#FAF5EF" />
              </svg>

              <div
                style={{
                  fontSize: '11px',
                  fontFamily: 'sans-serif',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#26060A',
                  marginTop: '8px',
                }}
              >
                Scan Camera for Live Card & RSVP
              </div>
            </div>

            {/* Direct Link & Hashtag */}
            <div
              style={{
                fontSize: '16px',
                fontFamily: 'sans-serif',
                color: '#ECD88C',
                letterSpacing: '0.08em',
                marginBottom: '6px',
              }}
            >
              🌐 {link}
            </div>

            <div
              style={{
                fontSize: '14px',
                fontFamily: 'sans-serif',
                color: currentTheme.accent,
                letterSpacing: '0.15em',
                fontWeight: 600,
              }}
            >
              {hashtag}
            </div>
          </div>
        </div>
      ),
      {
        width: 1080,
        height: 1920,
      }
    );
  } catch (e) {
    return new Response(`Failed to generate story image: ${e.message}`, { status: 500 });
  }
}


