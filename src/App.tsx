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

export default function App() {
  return (
    <>
      <PetalRain count={22} />
      <LeafAccents />

      {/* ══════════════════════════════════════
           HERO — Cinematic Palace Scene
         ══════════════════════════════════════ */}
      <section id="hero" className="hero-section">

        {/* Layer 1 — Palace gate background, slow Ken Burns zoom */}
        <img
          src="/palace-gate.png"
          alt=""
          aria-hidden="true"
          className="hero-palace-bg"
        />

        {/* Layer 2 — Gradient overlays for text readability */}
        <div className="hero-gradient-overlay" />

        {/* Layer 3 — Couple emerging animation */}
        <div className="hero-couple-wrapper">
          <img
            src="/couple-palace.png"
            alt={`${brideName} and ${groomName}`}
            className="hero-couple-img"
          />
        </div>

        {/* Layer 4 — Text content */}
        <div className="hero-content">
          <p className="hero-ceremony-label">✦ &nbsp; Roka Ceremony &nbsp; ✦</p>

          <h1 className="hero-couple-names hero-name-bride">{brideName}</h1>

          <div className="hero-ampersand-row">
            <span className="hero-line" />
            <span className="hero-ampersand">&amp;</span>
            <span className="hero-line" />
          </div>

          <h1 className="hero-couple-names hero-name-groom">{groomName}</h1>

          <p className="hero-tagline">{tagline}</p>

          <div className="hero-countdown-wrap">
            <CountdownTimer eventDate={eventDate} />
          </div>

          {/* Scroll cue */}
          <div className="hero-scroll-cue">
            <div className="hero-scroll-line" />
            <span className="hero-scroll-text">Scroll to Explore</span>
          </div>
        </div>

        {/* Bottom floral strip */}
        <img src="/floral-border.png" alt="" aria-hidden="true" className="hero-floral-strip" />
      </section>

      {/* ══════════════════════════════════════
           THEIR STORY — Dark
         ══════════════════════════════════════ */}
      <section className="section-dark">
        <GoldDivider opacity={0.6} />
        <ScrollReveal>
          <div className="section-wrapper story-grid">
            {/* Left: text */}
            <div className="story-text">
              <p className="section-label">✦ Their Story</p>
              <h2 className="section-title story-heading">
                A Beautiful<br /><em>Beginning</em>
              </h2>
              <p className="story-body">
                Two hearts, one beautiful journey. Join us as{' '}
                <strong style={{ color: 'var(--gold)' }}>{brideName} and {groomName}</strong> take
                their first step towards forever — a moment filled with love,
                blessings, and new beginnings.
              </p>
              <p className="story-body" style={{ marginTop: '1rem', fontStyle: 'italic' }}>
                "Some things are simply meant to be."
              </p>
            </div>
            {/* Right: couple image in ornate frame */}
            <div className="story-image-wrap">
              <img src="/floral-frame.png" alt="" aria-hidden="true" className="story-floral-frame" />
              <img src="/couple-palace.png" alt="Aanchal and Randeep" className="story-couple-photo" />
            </div>
          </div>
        </ScrollReveal>
        <GoldDivider flip opacity={0.6} />
      </section>

      {/* ══════════════════════════════════════
           EVENT DETAILS — Light Ivory
         ══════════════════════════════════════ */}
      <section className="section-light">
        <ScrollReveal>
          <div className="section-wrapper">
            <p className="section-label" style={{ color: 'var(--gold-dark)' }}>✦ When &amp; Where</p>
            <h2 className="section-title" style={{ fontSize: 'clamp(2rem,4vw,3rem)', marginBottom: '2rem' }}>
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

      {/* ══════════════════════════════════════
           QUIZ — Dark
         ══════════════════════════════════════ */}
      <section className="section-dark">
        <GoldDivider opacity={0.6} />
        <ScrollReveal>
          <div className="section-wrapper">
            <p className="section-label">✦ How Well Do You Know Them?</p>
            <h2 className="section-title" style={{ color: 'var(--ivory-text)', fontSize: 'clamp(2rem,4vw,3rem)', marginBottom: '2rem' }}>
              The Couple Quiz
            </h2>
            <QuizSection questions={quizQuestions} brideName={brideName} groomName={groomName} />
          </div>
        </ScrollReveal>
        <GoldDivider flip opacity={0.6} />
      </section>

      {/* ══════════════════════════════════════
           RSVP — Light Ivory
         ══════════════════════════════════════ */}
      <section className="section-light">
        <ScrollReveal>
          <div className="section-wrapper">
            <p className="section-label" style={{ color: 'var(--gold-dark)' }}>✦ Will You Join Us?</p>
            <h2 className="section-title" style={{ fontSize: 'clamp(2rem,4vw,3rem)', marginBottom: '0.5rem' }}>
              RSVP
            </h2>
            <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--espresso-mid)', marginBottom: '2rem' }}>
              Kindly respond by {rsvpDeadline}.
            </p>
            <RSVPForm
              brideName={brideName}
              groomName={groomName}
              rsvpDeadline={rsvpDeadline}
            />
          </div>
        </ScrollReveal>
      </section>

      {/* ══════════════════════════════════════
           WALL OF LOVE — Dark
         ══════════════════════════════════════ */}
      <section className="section-dark">
        <GoldDivider opacity={0.6} />
        <ScrollReveal>
          <div className="section-wrapper">
            <p className="section-label">✦ Spread the Love</p>
            <h2 className="section-title" style={{ color: 'var(--ivory-text)', fontSize: 'clamp(2rem,4vw,3rem)', marginBottom: '0.5rem' }}>
              Wall of Love
            </h2>
            <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--ivory-muted)', marginBottom: '2rem' }}>
              Pin your blessings for {brideName} &amp; {groomName}.
            </p>
            <WallOfLove />
          </div>
        </ScrollReveal>
      </section>

      {/* ══════════════════════════════════════
           FOOTER
         ══════════════════════════════════════ */}
      <footer className="site-footer">
        <img src="/gold-divider.png" alt="" aria-hidden="true" className="footer-divider" />
        <p className="footer-names">{brideName} &amp; {groomName}</p>
        <p className="footer-date">21st August, 2026 &nbsp;·&nbsp; Golden Apple Mansion, Pritampura</p>
        <p className="footer-tagline">With love &amp; blessings ✦</p>
      </footer>
    </>
  );
}
