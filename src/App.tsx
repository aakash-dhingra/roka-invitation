import './style.css';
import { EVENT_CONFIG } from './config';
import { LeafAccents } from './components/LeafAccents';
import { PetalRain } from './components/PetalRain';
import { GoldDivider } from './components/GoldDivider';
import { CountdownTimer } from './components/CountdownTimer';
import { ScrollReveal } from './components/ScrollReveal';
import { QuizSection } from './components/QuizSection';
import { EventDetailsSection } from './components/EventDetails';
import { RSVPForm } from './components/RSVPForm';
import { WallOfLove } from './components/WallOfLove';

const {
  brideName,
  groomName,
  tagline,
  eventTitle,
  eventDate,
  displayDate,
  displayDay,
  startTime,
  endTime,
  venueName,
  venueAddress,
  googleMapsUrl,
  rsvpDeadline,
  quizQuestions,
} = EVENT_CONFIG;

// ─────────────────────────────────────────────
//  APP
// ─────────────────────────────────────────────
export default function App() {
  return (
    <>
      {/* ── Falling rose petals overlay ── */}
      <PetalRain count={22} />

      {/* ── Floating leaf accents ── */}
      <LeafAccents />

      {/* ══════════════════════════════════════
           HERO SECTION
         ══════════════════════════════════════ */}
      <section id="hero" className="hero-section">
        {/* Mandala background overlay */}
        <img
          src="/mandala-bg.png"
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.15,
            mixBlendMode: 'screen',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {/* Radial gradient depth overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(139,0,32,0.3) 0%, rgba(28,5,0,0.85) 100%)',
          zIndex: 0,
          pointerEvents: 'none',
        }} />

        {/* Main hero content grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            alignItems: 'center',
            gap: '3.5rem',
            maxWidth: '1100px',
            width: '100%',
            padding: 'clamp(2.5rem, 6vw, 5rem) clamp(1.25rem, 4vw, 3rem)',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* ── LEFT: Text block ── */}
          <div style={{ textAlign: 'center' }}>
            {/* Ceremony label */}
            <p
              className="hero-connector"
              style={{ marginBottom: '1.5rem', animation: 'fadeInHero 1s 0s var(--ease-premium) both' }}
            >
              ✦ &nbsp; {eventTitle} &nbsp; ✦
            </p>

            {/* Bride name */}
            <h1
              className="hero-couple-names"
              style={{ animation: 'fadeInHero 1.2s 0.15s var(--ease-premium) both' }}
            >
              {brideName}
            </h1>

            {/* Decorative & divider */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                margin: '0.75rem 0',
                animation: 'fadeInHero 1.2s 0.25s var(--ease-premium) both',
              }}
            >
              <div style={{ flex: 1, height: '0.5px', background: 'linear-gradient(to right, transparent, rgba(201,149,42,0.5))' }} />
              <span style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                fontStyle: 'italic',
                color: 'var(--gold)',
                fontWeight: 300,
              }}>
                &amp;
              </span>
              <div style={{ flex: 1, height: '0.5px', background: 'linear-gradient(to left, transparent, rgba(201,149,42,0.5))' }} />
            </div>

            {/* Groom name */}
            <h1
              className="hero-couple-names"
              style={{ animation: 'fadeInHero 1.2s 0.35s var(--ease-premium) both' }}
            >
              {groomName}
            </h1>

            {/* Tagline */}
            <p
              className="hero-tagline"
              style={{
                marginTop: '1.25rem',
                marginBottom: '2.5rem',
                animation: 'fadeInHero 1.2s 0.5s var(--ease-premium) both',
              }}
            >
              {tagline}
            </p>

            {/* Countdown */}
            <div style={{ display: 'flex', justifyContent: 'center', animation: 'fadeInHero 1.2s 0.65s var(--ease-premium) both' }}>
              <CountdownTimer eventDate={eventDate} />
            </div>

            {/* Scroll cue */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                marginTop: '3rem',
                animation: 'fadeInHero 1.5s 1.5s var(--ease-premium) both',
              }}
            >
              <p style={{
                fontFamily: 'var(--font-cinzel)',
                fontSize: '0.52rem',
                fontWeight: 500,
                letterSpacing: '0.4em',
                textTransform: 'uppercase',
                color: 'var(--ivory-muted)',
              }}>
                Scroll to explore
              </p>
              <div style={{
                width: '1px',
                height: '40px',
                background: 'linear-gradient(to bottom, var(--gold), transparent)',
                opacity: 0.7,
                animation: 'scrollLine 1.5s ease-in-out infinite',
              }} />
            </div>
          </div>

          {/* ── RIGHT: Couple image with ornate frame ── */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              animation: 'fadeInHero 1.4s 0.4s var(--ease-premium) both',
            }}
          >
            <div style={{ position: 'relative', maxWidth: '460px', width: '100%' }}>
              {/* Floral frame overlay */}
              <img
                src="/floral-frame.png"
                alt=""
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: '-5%',
                  width: '110%',
                  height: '110%',
                  objectFit: 'contain',
                  zIndex: 2,
                  pointerEvents: 'none',
                  mixBlendMode: 'multiply',
                  opacity: 0.85,
                }}
              />
              {/* Main couple photo */}
              <img
                src="/couple.png"
                alt={`${brideName} and ${groomName}`}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '2px',
                  position: 'relative',
                  zIndex: 1,
                  boxShadow: '0 24px 60px rgba(28,5,0,0.5), 0 4px 16px rgba(28,5,0,0.3)',
                }}
              />
            </div>
          </div>
        </div>

        {/* Floral border bottom */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 2,
          overflow: 'hidden',
          lineHeight: 0,
        }}>
          <img
            src="/floral-border.png"
            alt=""
            aria-hidden="true"
            style={{
              width: '100%',
              maxHeight: '100px',
              objectFit: 'cover',
              objectPosition: 'center bottom',
              opacity: 0.5,
              display: 'block',
              transform: 'scaleY(-1)',
            }}
          />
        </div>
      </section>

      {/* ── Gold Divider ── */}
      <GoldDivider />

      {/* ══════════════════════════════════════
           STORY / ABOUT — DARK
         ══════════════════════════════════════ */}
      <section id="story" className="section-dark">
        <ScrollReveal>
          <div className="section-wrapper">
            <p className="section-label" style={{ color: 'var(--gold)' }}>Their Story</p>
            <h2
              className="section-title"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--ivory-text)' }}
            >
              A beautiful beginning
            </h2>
            <p style={{
              color: 'var(--ivory-muted)',
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.05rem, 2vw, 1.2rem)',
              lineHeight: 1.8,
              marginTop: '1.5rem',
              maxWidth: '680px',
            }}>
              Two hearts, one beautiful journey. Join us as {brideName} and {groomName} take
              their first step towards forever — a moment filled with love, blessings, and new beginnings.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* ── Gold Divider (flipped) ── */}
      <GoldDivider flip />

      {/* ══════════════════════════════════════
           EVENT DETAILS — LIGHT
         ══════════════════════════════════════ */}
      <section id="details" className="section-light">
        <ScrollReveal>
          <div className="section-wrapper">
            <p className="section-label">When &amp; Where</p>
            <h2
              className="section-title"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '2.5rem' }}
            >
              Event Details
            </h2>
            <EventDetailsSection
              displayDate={displayDate}
              displayDay={displayDay}
              startTime={startTime}
              endTime={endTime}
              venueName={venueName}
              venueAddress={venueAddress}
              googleMapsUrl={googleMapsUrl}
              eventDate={eventDate}
            />
          </div>
        </ScrollReveal>
      </section>

      {/* ── Gold Divider ── */}
      <GoldDivider />

      {/* ══════════════════════════════════════
           QUIZ — DARK
         ══════════════════════════════════════ */}
      <section id="quiz" className="section-dark">
        <ScrollReveal>
          <div className="section-wrapper">
            <p className="section-label" style={{ color: 'var(--gold)' }}>How Well Do You Know Them?</p>
            <h2
              className="section-title"
              style={{
                color: 'var(--ivory-text)',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                marginBottom: '2.5rem',
              }}
            >
              The Couple Quiz
            </h2>
            <div className="quiz-card">
              <QuizSection
                questions={quizQuestions}
                brideName={brideName}
                groomName={groomName}
              />
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── Gold Divider (flipped) ── */}
      <GoldDivider flip />

      {/* ══════════════════════════════════════
           RSVP — LIGHT
         ══════════════════════════════════════ */}
      <section id="rsvp" className="section-light">
        <ScrollReveal>
          <div className="section-wrapper">
            <p className="section-label">Will You Join Us?</p>
            <h2
              className="section-title"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '0.75rem' }}
            >
              RSVP
            </h2>
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              color: 'var(--espresso-mid)',
              marginBottom: '2.5rem',
              fontSize: '1.05rem',
            }}>
              Kindly respond by {rsvpDeadline}.
            </p>
            <RSVPForm
              rsvpDeadline={rsvpDeadline}
              brideName={brideName}
              groomName={groomName}
            />
          </div>
        </ScrollReveal>
      </section>

      {/* ── Gold Divider ── */}
      <GoldDivider />

      {/* ══════════════════════════════════════
           WALL OF LOVE — DARK
         ══════════════════════════════════════ */}
      <section id="guestbook" className="section-dark">
        <ScrollReveal>
          <div className="section-wrapper">
            <p className="section-label" style={{ color: 'var(--gold)' }}>Spread the Love</p>
            <h2
              className="section-title"
              style={{
                color: 'var(--ivory-text)',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                marginBottom: '0.5rem',
              }}
            >
              Wall of Love
            </h2>
            <p style={{
              color: 'var(--ivory-muted)',
              fontStyle: 'italic',
              fontFamily: 'var(--font-serif)',
              marginBottom: '2.5rem',
              fontSize: '1.05rem',
            }}>
              Pin your blessings for {brideName} &amp; {groomName}.
            </p>
            <WallOfLove />
          </div>
        </ScrollReveal>
      </section>

      {/* ══════════════════════════════════════
           FOOTER
         ══════════════════════════════════════ */}
      <footer style={{
        background: '#0F0200',
        padding: '3rem 2rem 2.5rem',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
      }}>
        <p style={{
          fontFamily: 'var(--font-script)',
          color: 'var(--gold)',
          fontSize: '2.5rem',
          marginBottom: '0.5rem',
          lineHeight: 1.2,
        }}>
          {brideName} &amp; {groomName}
        </p>
        <p style={{
          fontFamily: 'var(--font-cinzel)',
          color: 'var(--ivory-muted)',
          fontSize: '0.6rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
        }}>
          {displayDate} &nbsp;·&nbsp; {venueName}
        </p>
        <img
          src="/gold-divider.png"
          alt=""
          aria-hidden="true"
          style={{
            width: '200px',
            opacity: 0.4,
            margin: '1.5rem auto 0',
            mixBlendMode: 'screen',
          }}
        />
        <p style={{
          fontFamily: 'var(--font-cinzel)',
          fontSize: '0.52rem',
          color: 'var(--ivory-muted)',
          letterSpacing: '0.2em',
          marginTop: '1.5rem',
          opacity: 0.5,
        }}>
          Made with love · {new Date().getFullYear()}
        </p>
      </footer>
    </>
  );
}
