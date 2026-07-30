import './style.css';
import { EVENT_CONFIG } from './config';
import { LeafAccents } from './components/LeafAccents';
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
//  Section header utility
// ─────────────────────────────────────────────
function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div style={{ marginBottom: '3rem' }}>
      <div className="section-label" style={{ marginBottom: '1.25rem' }}>
        {label}
      </div>
      <h2
        className="section-title"
        style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
      >
        {title}
      </h2>
    </div>
  );
}

// ─────────────────────────────────────────────
//  Thin horizontal divider
// ─────────────────────────────────────────────
function Divider() {
  return (
    <div
      style={{
        height: '0.5px',
        background: 'linear-gradient(to right, transparent, rgba(200,177,149,0.4), transparent)',
        margin: '0 auto',
        maxWidth: '900px',
      }}
    />
  );
}

// ─────────────────────────────────────────────
//  APP
// ─────────────────────────────────────────────
export default function App() {
  return (
    <div style={{ position: 'relative', background: 'var(--canvas)', minHeight: '100dvh' }}>
      {/* Fixed floating leaf accents */}
      <LeafAccents />

      {/* ══════════════════════════════════════
           HERO
         ══════════════════════════════════════ */}
      <section id="hero" className="hero-section" style={{ minHeight: '100dvh', padding: '0', display: 'block' }}>

        {/* ── Floral border top ── */}
        <div style={{ width: '100%', overflow: 'hidden', lineHeight: 0, animation: 'fadeInHero 1.2s var(--ease-premium) both' }}>
          <img
            src="/floral-border.png"
            alt="floral ornament"
            style={{
              width: '100%',
              maxHeight: '120px',
              objectFit: 'cover',
              objectPosition: 'center top',
              opacity: 0.7,
              display: 'block',
            }}
          />
        </div>

        {/* ── Main Hero Content ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            alignItems: 'center',
            gap: '3rem',
            maxWidth: '1100px',
            margin: '0 auto',
            padding: 'clamp(2.5rem, 6vw, 5rem) clamp(1.25rem, 4vw, 3rem)',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* ── Left: Text block ── */}
          <div style={{ textAlign: 'center' }}>
            {/* Ceremony label */}
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.4em',
                textTransform: 'uppercase',
                color: 'var(--espresso)',
                marginBottom: '1.75rem',
              }}
            >
              ✦ &nbsp; {eventTitle} &nbsp; ✦
            </p>

            {/* Names */}
            <h1
              className="hero-couple-names"
              style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)', marginBottom: '0.5rem', lineHeight: 1.05 }}
            >
              {brideName}
            </h1>

            {/* Decorative & */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', margin: '0.75rem 0', animation: 'fadeInHero 1.4s 0.25s var(--ease-premium) both' }}>
              <div style={{ flex: 1, height: '0.5px', background: 'linear-gradient(to right, transparent, rgba(200,177,149,0.5))' }} />
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontStyle: 'italic', color: 'var(--taupe)', fontWeight: 300 }}>
                &amp;
              </span>
              <div style={{ flex: 1, height: '0.5px', background: 'linear-gradient(to left, transparent, rgba(200,177,149,0.5))' }} />
            </div>

            <h1
              className="hero-couple-names"
              style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)', marginBottom: '2rem', lineHeight: 1.05, animationDelay: '0.15s' }}
            >
              {groomName}
            </h1>

            {/* Tagline */}
            <p className="hero-tagline" style={{ fontSize: '0.63rem', marginBottom: '2.5rem' }}>
              {tagline}
            </p>



            {/* Countdown */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
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
                animation: 'fadeInHero 2s 1.5s var(--ease-premium) both',
              }}
            >
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.55rem',
                fontWeight: 500,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'var(--espresso-soft)',
              }}>
                Scroll to explore
              </p>
              <div style={{
                width: '1px',
                height: '36px',
                background: 'linear-gradient(to bottom, var(--taupe), transparent)',
                opacity: 0.5,
              }} />
            </div>
          </div>

          {/* ── Right: Couple image ── */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              animation: 'fadeInHero 1.6s 0.4s var(--ease-premium) both',
            }}
          >
            <div style={{ position: 'relative', display: 'inline-block', maxWidth: '480px', width: '100%' }}>
              {/* Offset decorative frame */}
              <div style={{
                position: 'absolute',
                top: '-14px',
                left: '-14px',
                right: '14px',
                bottom: '14px',
                border: '0.5px solid rgba(200,177,149,0.35)',
                borderRadius: '2px',
                pointerEvents: 'none',
                zIndex: 0,
              }} />
              <div style={{
                position: 'absolute',
                top: '14px',
                left: '14px',
                right: '-14px',
                bottom: '-14px',
                border: '0.5px solid rgba(200,177,149,0.2)',
                borderRadius: '2px',
                pointerEvents: 'none',
                zIndex: 0,
              }} />
              <img
                src="/couple.png"
                alt={`${brideName} and ${groomName}`}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  borderRadius: '2px',
                  position: 'relative',
                  zIndex: 1,
                  boxShadow: '0 20px 60px rgba(44,42,41,0.12), 0 4px 16px rgba(44,42,41,0.08)',
                }}
              />
              {/* Caption ribbon */}
              <div style={{
                position: 'absolute',
                bottom: '-1.5rem',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'var(--canvas)',
                border: '0.5px solid rgba(200,177,149,0.4)',
                padding: '0.45rem 1.5rem',
                whiteSpace: 'nowrap',
                zIndex: 2,
                borderRadius: '1px',
              }}>
                <p style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.58rem',
                  fontWeight: 500,
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: 'var(--taupe)',
                }}>
                  {brideName} &amp; {groomName}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Floral border bottom ── */}
        <div style={{ width: '100%', overflow: 'hidden', lineHeight: 0, marginTop: '3rem', animation: 'fadeInHero 1.2s var(--ease-premium) both' }}>
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

      {/* ══════════════════════════════════════
           THE STORY — QUIZ
         ══════════════════════════════════════ */}
      <Divider />
      <section id="story" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-wrapper">
          <ScrollReveal>
            <SectionHeader label="The Story" title={`How well do\nyou know them?`} />
          </ScrollReveal>

          <ScrollReveal delay={1}>
            <div className="quiz-card">
              <QuizSection
                questions={quizQuestions}
                brideName={brideName}
                groomName={groomName}
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════
           EVENT DETAILS
         ══════════════════════════════════════ */}
      <Divider />
      <section id="details" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-wrapper">
          <ScrollReveal>
            <SectionHeader label="Event Details" title="Join us to celebrate" />
          </ScrollReveal>

          <ScrollReveal delay={1}>
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
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════
           RSVP + GUESTBOOK
         ══════════════════════════════════════ */}
      <Divider />
      <section id="rsvp" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-wrapper">
          <ScrollReveal>
            <SectionHeader label="RSVP" title="Will you be joining?" />
          </ScrollReveal>

          <ScrollReveal delay={1}>
            <RSVPForm
              rsvpDeadline={rsvpDeadline}
              brideName={brideName}
              groomName={groomName}
            />
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════
           WALL OF LOVE — POLAROID GUESTBOOK
         ══════════════════════════════════════ */}
      <Divider />
      <section id="guestbook" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-wrapper">
          <ScrollReveal>
            <SectionHeader label="Wall of Love" title="Leave your mark" />
          </ScrollReveal>

          <ScrollReveal delay={1}>
            <WallOfLove />
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════
           FOOTER
         ══════════════════════════════════════ */}
      <Divider />
      <footer
        style={{
          textAlign: 'center',
          padding: '4rem 1.5rem 3rem',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <ScrollReveal>
          <p className="footer-ornament">❧</p>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'var(--espresso)',
              marginTop: '1rem',
              marginBottom: '0.75rem',
            }}
          >
            {brideName} &amp; {groomName}
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.65rem',
              fontWeight: 300,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--taupe)',
              marginBottom: '2.5rem',
            }}
          >
            {displayDate} &nbsp;·&nbsp; {venueName}
          </p>
          <div
            style={{
              width: '40px',
              height: '0.5px',
              background: 'rgba(200,177,149,0.5)',
              margin: '0 auto',
            }}
          />
          <p
            style={{
              marginTop: '2rem',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.6rem',
              fontWeight: 300,
              letterSpacing: '0.1em',
              color: 'var(--espresso-soft)',
            }}
          >
            Made with love · {new Date().getFullYear()}
          </p>
        </ScrollReveal>
      </footer>
    </div>
  );
}
