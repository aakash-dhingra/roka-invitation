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
           HERO — Split Layout: Couple Photo + Invitation Card
         ══════════════════════════════════════ */}
      <section id="hero" className="hero-section">
        {/* Hanging golden temple bells */}
        <SwingingBells />

        {/* Soft pink-purple background */}
        <div className="hero-bg-gradient" />

        {/* String lights top */}
        <div className="hero-string-lights">
          {Array.from({ length: 14 }).map((_, i) => (
            <span key={i} className="hero-light-bulb" style={{ animationDelay: `${i * 0.18}s` }} />
          ))}
        </div>

        {/* Floral top-left corner */}
        <img src="/floral-frame.png" aria-hidden="true" className="hero-corner hero-corner-tl" />
        {/* Floral top-right corner */}
        <img src="/floral-frame.png" aria-hidden="true" className="hero-corner hero-corner-tr" />
        {/* Floral bottom-left corner */}
        <img src="/floral-frame.png" aria-hidden="true" className="hero-corner hero-corner-bl" />
        {/* Floral bottom-right corner */}
        <img src="/floral-frame.png" aria-hidden="true" className="hero-corner hero-corner-br" />

        {/* Main split layout */}
        <div className="hero-split">
          {/* LEFT — Couple image */}
          <div className="hero-photo-side">
            <img
              src="/couple-bouquet.png"
              alt={`${brideName} and ${groomName}`}
              className="hero-couple-photo"
            />
            {/* Lanterns */}
            <div className="hero-lanterns">
              <span className="hero-lantern hero-lantern-l">🪔</span>
              <span className="hero-lantern hero-lantern-r">🪔</span>
            </div>
          </div>

          {/* RIGHT — Invitation card */}
          <div className="hero-card-side">
            <div className="hero-invite-card">
              {/* Top floral accent */}
              <div className="hero-card-floral-top">🌸 🌿 🌸</div>

              <p className="hero-card-blessing">
                With the blessings of<br />
                <strong>Shree Sardari Lal Dhingra</strong><br />
                <span style={{ fontSize: '0.8em' }}>&amp;</span><br />
                <strong>Shri Mati Santosh Kumari</strong>
              </p>

              <p className="hero-card-ceremony">✦ &nbsp; ROKA CEREMONY &nbsp; ✦</p>

              <div className="hero-card-divider" />

              <h1 className="hero-card-bride">{brideName}</h1>
              <p className="hero-card-amp">&amp;</p>
              <h1 className="hero-card-groom">{groomName}</h1>

              <div className="hero-card-divider" style={{ marginTop: '0.75rem' }} />

              <p className="hero-card-meta">
                {displayDate} &nbsp;·&nbsp; {displayDay}<br />
                {startTime} onwards<br />
                <span style={{ fontSize: '0.85em' }}>{venueName}, {venueAddress}</span>
              </p>

              {/* Bottom floral accent */}
              <div className="hero-card-floral-bottom">🌸 💕 🌸</div>
            </div>

            {/* Candles row below card */}
            <div className="hero-candles">
              {['🕯️','🕯️','🕯️','🕯️','🕯️'].map((c, i) => (
                <span key={i} className="hero-candle" style={{ animationDelay: `${i * 0.3}s` }}>{c}</span>
              ))}
            </div>
          </div>
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
              <img src="/couple-story.jpg" alt="Dr Aanchal Dhingra and Randeep Singh" className="story-img" />

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
