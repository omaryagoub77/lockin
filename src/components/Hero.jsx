import AcidSquares from './AcidSquares.jsx';
import EffectBoundary from './EffectBoundary.jsx';
import PhoneFrame from './PhoneFrame.jsx';
import apk from '../assets/apk/lockin.apk';
import todayScreen from '../assets/screens/today.jpg';
import { ArrowRight } from './icons.jsx';
import SoapBubbleLink from './SoapBubbleLink.jsx';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__acid" aria-hidden="true">
        <EffectBoundary fallback={null}>
          <AcidSquares
            color="#10130f"
            accentColor="#78f08b"
            secondaryColor="#268a57"
            tileSize={1}
            gap={0.12}
            roundness={0.25}
            rotation={35}
            waves={1}
            pulse={1}
            lighting="split"
            tilt={0.7}
            grain={0.12}
            intro
            mouseInteraction
            softness={0.5}
            bulge={0.3}
            gloss={0.6}
            waveScale={1}
            speed={0.6}
            shape="square"
            pulseSpeed={0.45}
            pulseSpacing={1}
            pulseWidth={1}
            pulseOrigin="center"
            brightness={1}
            zoom={1}
            depth={10}
            fade={0}
            opacity={1}
            hoverEffect="press"
            mouseStrength={1}
            mouseRadius={0.35}
            pulseOnClick
            detail="medium"
            lightMode={false}
          />
        </EffectBoundary>
      </div>
      <div className="container hero__grid">
        <div className="hero__copy">
          <h1 className="hero__title" id="hero-title" aria-label="Take back your time.">
            <span className="hero__line">
              <span>Take back</span>
            </span>{' '}
            <span className="hero__line">
              <span className="hero__accent">
                your time<span className="hero__period">.</span>
              </span>
            </span>
          </h1>

          <p className="hero__lede">
            Lockin is a screen-time and focus app for Android. Set daily limits, start
            sessions that close the apps, and give a partner the final say when you want
            to break a limit.
          </p>

          <div className="hero__actions">
            <a className="btn btn--primary" href={apk} download="lockin.apk">
              Download for Android
            </a>
            <SoapBubbleLink className="btn btn--primary" href="#product">
              Explore the app
              <ArrowRight />
            </SoapBubbleLink>
            <SoapBubbleLink className="btn btn--ghost" href="#how">
              Why Lockin
              <ArrowRight />
            </SoapBubbleLink>
          </div>

          <div className="hero__micro">
            <span>
              <b>Limits</b> per app
            </span>
            <span>
              <b>Focus</b> with the door shut
            </span>
            <span>
              <b>Partner</b> on the exceptions
            </span>
          </div>
        </div>

        <div className="hero__stage">
          <div className="hero__orbit hero__orbit--outer" aria-hidden="true" />
          <div className="hero__orbit hero__orbit--inner" aria-hidden="true" />
          <div className="hero__stage-glow" aria-hidden="true" />

          <div className="hero__device">
            <PhoneFrame
              src={todayScreen}
              alt="Lockin screen-time interface showing daily progress and limits for YouTube, Instagram and TikTok."
              priority
            />
          </div>

        </div>
      </div>
    </section>
  );
}
