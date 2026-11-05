import { memo, useEffect, useRef, useState } from 'react';
import PhoneFrame from './PhoneFrame.jsx';
import limitsScreen from '../assets/screens/limits.jpg';
import focusScreen from '../assets/screens/focus.jpg';
import approvalsScreen from '../assets/screens/approvals.jpg';
import statsScreen from '../assets/screens/stats.jpg';
import './ProductTour.css';

const steps = [
  {
    id: 'limits',
    kicker: 'App limits',
    title: 'Your apps. Your limits.',
    copy: 'Choose the apps that cost you the most, set a daily allowance, and decide what stays unlimited. Lockin tracks the clock and shows exactly what is left.',
    tags: ['Daily allowance', 'Limited / unlimited', 'Per-app usage'],
    screen: limitsScreen,
    alt: 'Lockin App Limits screen showing YouTube with a 3 hour 30 minute daily limit, Instagram at 1 hour 30 minutes, and TikTok at 2 hours.',
    chrome: 'Limits / active',
  },
  {
    id: 'focus',
    kicker: 'Focus sessions',
    title: '25 minutes. No exits.',
    copy: 'Start a session and the apps you have locked stay closed until the timer runs out. Need to leave early? That takes a partner’s approval.',
    tags: ['Adjustable timer', 'Apps locked', 'Approval to end early'],
    screen: focusScreen,
    alt: 'Lockin Focus screen with a 25 minute timer and a Start Focus button.',
    chrome: 'Focus / ready',
  },
  {
    id: 'partner',
    kicker: 'Accountability',
    title: 'A partner holds the key.',
    copy: 'Change a limit, unlock an app, or end a focus session early and it becomes a request. Your accountability partner approves it — or leaves it locked.',
    tags: ['Incoming requests', 'My requests', 'Approved / cancelled'],
    screen: approvalsScreen,
    alt: 'Lockin Approvals screen showing an accountability partner and a list of incoming requests with Approved and Cancelled statuses.',
    chrome: 'Partner / linked',
  },
  {
    id: 'stats',
    kicker: 'Usage history',
    title: 'See the pattern, not just the number.',
    copy: 'Screen time, focus time, sessions, and active limits. Review today, the last 7 days, or the last 30 days and see where the hours actually went.',
    tags: ['Today / 7 / 30 days', 'Hourly usage', 'Focus totals'],
    screen: statsScreen,
    alt: 'Lockin Stats screen showing screen time, limited app usage, focus time, active limits, and an hourly usage chart.',
    chrome: 'Stats / today',
  },
];

function ProductTour() {
  const [active, setActive] = useState(0);
  const stepRefs = useRef([]);

  useEffect(() => {
    const nodes = stepRefs.current.filter(Boolean);
    if (nodes.length === 0) return undefined;

    let frame = 0;
    const update = () => {
      frame = 0;
      const viewportLine = window.innerHeight * 0.48;
      let bestIndex = 0;
      let bestDistance = Number.POSITIVE_INFINITY;

      nodes.forEach((node, index) => {
        const rect = node.getBoundingClientRect();
        if (rect.bottom < 80 || rect.top > window.innerHeight - 80) return;
        const center = rect.top + rect.height / 2;
        const distance = Math.abs(center - viewportLine);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestIndex = index;
        }
      });

      setActive(bestIndex);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const activeStep = steps[active];

  return (
    <section className="section tour" id="product" aria-labelledby="tour-title">
      <div className="container tour-intro">
        <p className="eyebrow" data-reveal="fade">
          <span className="dot" />
          The system
        </p>
        <div className="tour-intro__grid">
          <h2 id="tour-title" data-reveal>
            A closed loop
            <br />
            for your <span className="accent-text">attention.</span>
          </h2>
          <div className="tour-intro__aside" data-reveal style={{ '--reveal-delay': '120ms' }}>
            <p>
              Four screens, one system. Intention becomes a limit. The limit becomes a
              focus session. A partner holds the exceptions. Then the history shows what
              actually happened.
            </p>
            <span className="tour-intro__cue">
              <span className="tour-intro__cue-line" aria-hidden="true" />
              Scroll to walk the loop
            </span>
          </div>
        </div>
      </div>

      <div className="container tour-grid">
        <div className="tour-visual" aria-hidden="true">
          <div className="tour-panel">
            <div className="tour-panel__bar">
              <span className="mono-label">
                <span className="dot" />
                {activeStep.kicker}
              </span>
            </div>

            <div className="tour-panel__stage">
              <div className="tour-panel__glow" />
              {steps.map((step, index) => (
                <div
                  className={`tour-screen${index === active ? ' is-active' : ''}`}
                  key={step.id}
                >
                  <PhoneFrame src={step.screen} alt="" />
                </div>
              ))}
            </div>

            <div className="tour-panel__foot">
              <span>{activeStep.chrome}</span>
              <div className="tour-panel__ticks">
                {steps.map((step, index) => (
                  <span className={index === active ? 'is-active' : ''} key={step.id} />
                ))}
              </div>
            </div>
          </div>
          <p className="tour-visual__note">The real Lockin interface on Android.</p>
        </div>

        <div className="tour-steps">
          {steps.map((step, index) => (
            <article
              className={`tour-step${index === active ? ' is-active' : ''}`}
              id={step.id}
              key={step.id}
              ref={(node) => {
                stepRefs.current[index] = node;
              }}
              aria-labelledby={`${step.id}-title`}
            >
              <div className="tour-step__meta">
                <span className="tour-step__kicker">{step.kicker}</span>
                <span className="tour-step__rule" aria-hidden="true" />
              </div>

              <div className="tour-step__body">
                <div className="tour-step__copy">
                  <h3 id={`${step.id}-title`}>{step.title}</h3>
                  <p>{step.copy}</p>
                  <ul className="tour-step__tags" aria-label={`${step.kicker} details`}>
                    {step.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>

                <div className="tour-step__mobile-screen">
                  <PhoneFrame src={step.screen} alt={step.alt} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(ProductTour);
