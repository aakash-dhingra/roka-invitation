import './style.css';
import { EVENT_CONFIG } from './config';
import { PetalRain } from './components/PetalRain';
import { GoldDivider } from './components/GoldDivider';
import { CountdownTimer } from './components/CountdownTimer';
import { ScrollReveal } from './components/ScrollReveal';
import { QuizSection } from './components/QuizSection';
import { EventDetailsSection } from './components/EventDetails';
import { RSVPForm } from './components/RSVPForm';
import { WallOfLove } from './components/WallOfLove';
import { InteractiveGoldDust } from './components/InteractiveGoldDust';
import { ScrollTextReveal } from './components/ScrollTextReveal';
import { ScrollTimelineConnector } from './components/ScrollTimelineConnector';
import { Garland } from './components/Garland';
import { AudioPlayer } from './components/AudioPlayer';
import { SwingingBells } from './components/SwingingBells';
import { DholPlayer } from './components/DholPlayer';

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
      {/* ── Background Music Player (Traditional Sitar/Flute Loop) ── */}
      <AudioPlayer />

      {/* ── Dynamic Particle Canvas (Attracts/repels to cursor, responds to scroll) ── */}
      <InteractiveGoldDust />

      {/* ── Scroll connector line on the right side of the screen ── */}
      <ScrollTimelineConnector />

      {/* ── Rose petals falling in 3D ── */}
      <PetalRain count={18} />

      {/* ══════════════════════════════════════
           HERO — Full-bleed cinematic painting with Swinging Bells
         ══════════════════════════════════════ */}
      <section id="hero" className="hero-section">
        {/* Hanging golden temple bells */}
        <SwingingBells />

        {/* Full-bleed background video, falls back to the painting */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/couple-palace.png"
          className="hero-bg-scene"
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          <img src="/couple-palace.png" alt={`${brideName} and ${groomName}`} />
        </video>

        {/* Gradient: dark top for text readability, transparent middle, dark bottom */}
        <div className="hero-overlay" />

        {/* Text — top center */}
        <div className="hero-content">
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(0.85rem, 2vw, 1.05rem)',
              color: 'var(--gold-shine)',
              fontStyle: 'italic',
              marginBottom: '1rem',
              letterSpacing: '0.05em',
              lineHeight: 1.4,
              opacity: 0.9,
            }}
          >
            With the blessings of<br />
            <strong>Shree Sardari Lal Dhingra</strong> &amp; <strong>Shri Mati Santosh Kumari</strong>
          </p>

          <p className="hero-ceremony-label">✦ &nbsp; Roka Ceremony &nbsp; ✦</p>

          <h1 className="hero-bride-name">{brideName}</h1>

          <div className="hero-amp-row">
            <span className="hero-amp-line" />
            <span className="hero-amp">&amp;</span>
            <span className="hero-amp-line" />
          </div>

          <h1 className="hero-groom-name">{groomName}</h1>

          <p className="hero-tagline">{tagline}</p>
        </div>

        {/* Countdown — bottom center */}
        <div className="hero-bottom">
          <CountdownTimer eventDate={eventDate} />
          <div className="hero-scroll-cue">
            <div className="hero-scroll-line" />
            <span className="hero-scroll-label">Scroll to Explore</span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
           EVENT DETAILS — Saffron-cream backdrop with Marigold Garland
         ══════════════════════════════════════ */}
      <section className="section-ivory">
        {/* Decorative hanging marigold garland */}
        <Garland />
        <ScrollReveal>
          <div className="section-wrapper" style={{ paddingTop: '1.5rem' }}>
            <p className="section-eyebrow">When &amp; Where</p>
            <h2 className="section-heading">
              <ScrollTextReveal text="Event Details" />
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
        <GoldDivider flip />
      </section>

      {/* ══════════════════════════════════════
           COUPLE STORY — Crimson Red with Dhol Player
         ══════════════════════════════════════ */}
      <section className="section-dark story-section">
        <ScrollReveal>
          <div className="section-wrapper story-inner">
            <div>
              <p className="section-eyebrow" style={{ color: 'var(--gold)' }}>Their Story</p>
              <h2 className="section-heading" style={{ color: 'var(--ivory-text)', fontSize: 'clamp(2.2rem,5vw,3.8rem)' }}>
                A Beautiful<br /><em style={{ color: 'var(--gold)' }}>Beginning</em>
              </h2>
              <p className="story-body">
                Two hearts, one beautiful journey. Join us as{' '}
                <strong style={{ color: 'var(--gold)' }}>{brideName} and {groomName}</strong>{' '}
                take their first step towards forever — a moment filled with love,
                blessings, and new beginnings.
              </p>
              <p className="story-quote">"Some things are simply meant to be."</p>

              {/* Dhol Player embedded here, swinging on scroll */}
              <DholPlayer isFloating={false} />
            </div>
            <div className="story-img-frame">
              <img src="/couple-palace.png" alt="Aanchal and Randeep at the palace" className="story-img" />
              <img src="/floral-frame.png" alt="" aria-hidden="true" className="story-frame-overlay" />
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ══════════════════════════════════════
           QUIZ — Saffron-cream backdrop with Marigold Garland
         ══════════════════════════════════════ */}
      <section className="section-ivory">
        <Garland />
        <ScrollReveal>
          <div className="section-wrapper" style={{ paddingTop: '1.5rem' }}>
            <p className="section-eyebrow">How Well Do You Know Them?</p>
            <h2 className="section-heading">
              <ScrollTextReveal text="Couple Quiz" />
            </h2>
            <QuizSection questions={quizQuestions} brideName={brideName} groomName={groomName} />
          </div>
        </ScrollReveal>
        <GoldDivider flip />
      </section>

      {/* ══════════════════════════════════════
           RSVP — Crimson Red
         ══════════════════════════════════════ */}
      <section className="section-dark">
        <ScrollReveal>
          <div className="section-wrapper">
            <p className="section-eyebrow" style={{ color: 'var(--gold)' }}>Will You Join Us?</p>
            <h2 className="section-heading" style={{ color: 'var(--ivory-text)' }}>RSVP</h2>
            <RSVPForm brideName={brideName} groomName={groomName} rsvpDeadline={rsvpDeadline} />
          </div>
        </ScrollReveal>
      </section>

      {/* ══════════════════════════════════════
           WALL OF LOVE — Saffron-cream backdrop with Marigold Garland
         ══════════════════════════════════════ */}
      <section className="section-ivory">
        <Garland />
        <ScrollReveal>
          <div className="section-wrapper" style={{ paddingTop: '1.5rem' }}>
            <p className="section-eyebrow">Spread the Love</p>
            <h2 className="section-heading">
              <ScrollTextReveal text="Wall of Love" />
            </h2>
            <p className="wall-subtitle">Pin your blessings for {brideName} &amp; {groomName}.</p>
            <WallOfLove />
          </div>
        </ScrollReveal>
      </section>

      {/* ══════════════════════════════════════
           FOOTER
         ══════════════════════════════════════ */}
      <footer className="site-footer">
        <img src="/gold-divider.png" alt="" aria-hidden="true" className="footer-divider-img" />
        <p className="footer-names">{brideName} &amp; {groomName}</p>
        <p className="footer-meta">21st August 2026 &nbsp;·&nbsp; Golden Apple Mansion, Pitampura</p>
        <p className="footer-sign">With love &amp; blessings ✦</p>
      </footer>
    </>
  );
}
