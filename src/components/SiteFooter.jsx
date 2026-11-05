import BrandLogo from './BrandLogo.jsx';
import { ArrowUp } from './icons.jsx';
import './SiteFooter.css';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__top">
        <div className="site-footer__brand">
          <a href="#top" aria-label="Lockin — back to top">
            <BrandLogo />
          </a>
          <p>Screen time, focus sessions, and a partner for the exceptions.</p>
          <span className="site-footer__badge">
            <span className="dot" aria-hidden="true" />
            Android
          </span>
        </div>

        <div className="site-footer__nav">
          <div>
            <p className="site-footer__heading">Explore</p>
            <ul>
              <li>
                <a href="#product">Product tour</a>
              </li>
              <li>
                <a href="#how">The approach</a>
              </li>
              <li>
                <a href="#download">Lock in</a>
              </li>
            </ul>
          </div>
          <div>
            <p className="site-footer__heading">Screens</p>
            <ul>
              <li>
                <a href="#limits">Limits</a>
              </li>
              <li>
                <a href="#focus">Focus</a>
              </li>
              <li>
                <a href="#partner">Partner</a>
              </li>
              <li>
                <a href="#stats">Stats</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container site-footer__bottom">
        <p>© 2026 Lockin</p>
        <p>Built for Android. Designed for attention.</p>
        <a href="#top">
          Back to top
          <ArrowUp size={13} />
        </a>
      </div>
    </footer>
  );
}
