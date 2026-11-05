import { ArrowRight, ArrowUp } from './icons.jsx';
import apk from '../assets/apk/lockin.apk';
import SoapBubbleLink from './SoapBubbleLink.jsx';
import './Closing.css';

export default function Closing() {
  return (
    <section className="closing" id="download" aria-labelledby="closing-title">
      <div className="closing__glow" aria-hidden="true" />

      <div className="container closing__grid">
        <div className="closing__copy" data-reveal>
          <p className="eyebrow">
            <span className="dot" />
            Lock in
          </p>
          <h2 id="closing-title">
            Your time.
            <br />
            <span className="accent-text">Locked in.</span>
          </h2>
          <p className="closing__lede">
            One limit is enough to start. Pick the app that takes the most, set
            tomorrow’s allowance tonight, and let Lockin hold the line.
          </p>
          <div className="closing__actions">
            <a className="btn btn--primary" href={apk} download="lockin.apk">
              Download for Android
            </a>
            <SoapBubbleLink className="btn btn--primary" href="#product">
              Walk through Lockin
              <ArrowRight />
            </SoapBubbleLink>
            <SoapBubbleLink className="btn btn--ghost" href="#top">
              Back to top
              <ArrowUp />
            </SoapBubbleLink>
          </div>
        </div>
      </div>
    </section>
  );
}
