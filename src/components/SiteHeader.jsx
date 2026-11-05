import { memo, useEffect, useLayoutEffect, useRef, useState } from 'react';
import SiteBrand from './SiteBrand.jsx';
import { ArrowUpRight, CloseIcon, MenuIcon } from './icons.jsx';
import {
  headerSoapBubbleConfig,
  liquidGlassConfig,
  liquidGlassTint,
} from '../config/liquidGlassConfig.js';
import SoapBubbleLink from './SoapBubbleLink.jsx';
import { SoapBubbleButton, SoapBubbleSurface } from './soap-bubble/index.js';
import './SiteHeader.css';

const links = [
  { href: '#product', label: 'Product' },
  { href: '#limits', label: 'Limits' },
  { href: '#focus', label: 'Focus' },
  { href: '#partner', label: 'Partner' },
  { href: '#stats', label: 'Stats' },
];

function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileViewport, setMobileViewport] = useState(
    () => window.matchMedia('(max-width: 900px)').matches,
  );
  const [activeLink, setActiveLink] = useState(() => {
    const hash = window.location.hash;
    return links.some((link) => link.href === hash) ? hash : links[0].href;
  });
  const [indicator, setIndicator] = useState({ x: 0, y: 0, width: 0, height: 0, ready: false });
  const toggleRef = useRef(null);
  const menuRef = useRef(null);
  const navRef = useRef(null);
  const linkRefs = useRef(new Map());
  const navigationIntentRef = useRef(null);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 900px)');
    const updateViewport = () => setMobileViewport(media.matches);
    media.addEventListener('change', updateViewport);
    return () => media.removeEventListener('change', updateViewport);
  }, []);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setScrolled(window.scrollY > 18);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const sections = links.map(({ href }) => document.querySelector(href)).filter(Boolean);
    if (sections.length === 0) return undefined;

    let frame = 0;
    const updateActiveLink = () => {
      frame = 0;
      const marker = Math.min(window.innerHeight * 0.38, 320);
      const navigationTarget = navigationIntentRef.current;
      if (navigationTarget) {
        const targetSection = sections.find((section) => `#${section.id}` === navigationTarget);
        const targetRect = targetSection?.getBoundingClientRect();
        if (targetRect && (targetRect.top > marker || targetRect.bottom < marker)) return;
        navigationIntentRef.current = null;
      }
      const measurements = sections.map((section) => {
        const rect = section.getBoundingClientRect();
        return { section, top: rect.top, bottom: rect.bottom, height: rect.height };
      });
      const containing = measurements
        .filter(({ top, bottom }) => top <= marker && bottom >= marker)
        .sort((a, b) => a.height - b.height);
      const selected =
        containing[0] ??
        measurements.reduce((nearest, current) => {
          const currentDistance = Math.min(Math.abs(current.top - marker), Math.abs(current.bottom - marker));
          const nearestDistance = Math.min(Math.abs(nearest.top - marker), Math.abs(nearest.bottom - marker));
          return currentDistance < nearestDistance ? current : nearest;
        });
      setActiveLink(`#${selected.section.id}`);
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(updateActiveLink);
    };
    const cancelNavigationIntent = () => {
      navigationIntentRef.current = null;
    };
    const cancelNavigationIntentFromKey = (event) => {
      if (['ArrowDown', 'ArrowUp', 'End', 'Home', 'PageDown', 'PageUp', ' '].includes(event.key)) {
        cancelNavigationIntent();
      }
    };
    const onScrollEnd = () => {
      cancelNavigationIntent();
      onScroll();
    };

    updateActiveLink();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('scrollend', onScrollEnd);
    window.addEventListener('resize', onScroll);
    window.addEventListener('wheel', cancelNavigationIntent, { passive: true });
    window.addEventListener('touchstart', cancelNavigationIntent, { passive: true });
    window.addEventListener('keydown', cancelNavigationIntentFromKey);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('scrollend', onScrollEnd);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('wheel', cancelNavigationIntent);
      window.removeEventListener('touchstart', cancelNavigationIntent);
      window.removeEventListener('keydown', cancelNavigationIntentFromKey);
      cancelAnimationFrame(frame);
    };
  }, []);

  useLayoutEffect(() => {
    const nav = navRef.current;
    const link = linkRefs.current.get(activeLink);
    if (!nav || !link) return undefined;

    let mounted = true;
    const updateIndicator = () => {
      if (!mounted) return;
      const navRect = nav.getBoundingClientRect();
      const linkRect = link.getBoundingClientRect();
      if (!linkRect.width || !linkRect.height) {
        setIndicator((current) => ({ ...current, width: 0, height: 0, ready: false }));
        return;
      }
      setIndicator({
        x: linkRect.left - navRect.left,
        y: linkRect.top - navRect.top,
        width: linkRect.width,
        height: linkRect.height,
        ready: true,
      });
    };

    updateIndicator();
    const frame = requestAnimationFrame(updateIndicator);
    const resizeObserver = new ResizeObserver(updateIndicator);
    resizeObserver.observe(nav);
    linkRefs.current.forEach((item) => resizeObserver.observe(item));
    window.addEventListener('resize', updateIndicator);
    document.fonts?.ready.then(() => {
      if (mounted) updateIndicator();
    });
    return () => {
      mounted = false;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateIndicator);
    };
  }, [activeLink]);

  useEffect(() => {
    if (!open) return undefined;

    const bodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusFirstLink = () => {
      const link = menuRef.current?.querySelector('a[href]');
      if (!link) return;
      link.focus({ preventScroll: true });
      if (document.activeElement !== link) {
        window.setTimeout(() => link.focus({ preventScroll: true }), 140);
      }
    };
    const focusTimer = window.setTimeout(focusFirstLink, 120);

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
        return;
      }

      if (event.key !== 'Tab') return;

      const candidates = [
        toggleRef.current,
        ...(menuRef.current?.querySelectorAll('a[href], button:not([disabled])') ?? []),
      ].filter((node) => node && node.offsetParent !== null);

      if (candidates.length === 0) return;
      const first = candidates[0];
      const last = candidates[candidates.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = bodyOverflow;
      document.removeEventListener('keydown', onKeyDown);
      window.clearTimeout(focusTimer);
      toggleRef.current?.focus({ preventScroll: true });
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;

    const media = window.matchMedia('(min-width: 901px)');
    const onChange = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <SoapBubbleSurface
        as="header"
        interactive={false}
        {...headerSoapBubbleConfig}
        className="site-header"
        data-scrolled={scrolled}
        style={{ '--liquid-glass-tint': liquidGlassTint }}
      >
        <svg className="site-header__filters" aria-hidden="true">
          <defs>
            <filter id="lockin-liquid-refraction" x="-10%" y="-30%" width="120%" height="160%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.012 0.022"
                numOctaves="2"
                seed="8"
                result="glass-ripples"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="glass-ripples"
                scale={liquidGlassConfig.refractionStrength}
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>
        <div className="site-header__inner">
          <SiteBrand />

          <nav ref={navRef} className="site-nav" aria-label="Primary">
            <span
              className="site-nav__indicator"
              aria-hidden="true"
              style={{
                width: `${indicator.width}px`,
                height: `${indicator.height}px`,
                transform: `translate3d(${indicator.x}px, ${indicator.y}px, 0)`,
                opacity: indicator.ready ? 1 : 0,
              }}
            />
            <ul>
              {links.map((link) => (
                <li key={link.href}>
                  <SoapBubbleSurface
                    as="a"
                    interactive
                    className="site-nav__link"
                    ref={(node) => {
                      if (node) linkRefs.current.set(link.href, node);
                      else linkRefs.current.delete(link.href);
                    }}
                    href={link.href}
                    aria-current={activeLink === link.href ? 'location' : undefined}
                    onClick={() => {
                      navigationIntentRef.current = link.href;
                      setActiveLink(link.href);
                    }}
                  >
                    {link.label}
                  </SoapBubbleSurface>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-header__actions">
            {!mobileViewport && (
              <SoapBubbleLink className="header-cta" href="#product">
                See the app
                <ArrowUpRight size={14} />
              </SoapBubbleLink>
            )}
            {mobileViewport && (
              <SoapBubbleButton
                ref={toggleRef}
                type="button"
                className="menu-toggle"
                aria-expanded={open}
                aria-controls="mobile-menu"
                onClick={() => setOpen((value) => !value)}
              >
                <span>{open ? 'Close' : 'Menu'}</span>
                {open ? <CloseIcon size={17} /> : <MenuIcon size={17} />}
              </SoapBubbleButton>
            )}
          </div>
        </div>
      </SoapBubbleSurface>

      <div
        ref={menuRef}
        id="mobile-menu"
        className={`mobile-menu${open ? ' is-open' : ''}`}
        role="dialog"
        aria-modal={open ? 'true' : undefined}
        aria-label="Site menu"
        aria-hidden={!open}
        inert={!open}
      >
        <div className="mobile-menu__inner container">
          <p className="mobile-menu__label">Navigate</p>
          <nav aria-label="Mobile primary">
            <ul>
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} onClick={closeMenu}>
                    <span>{link.label}</span>
                    <ArrowUpRight size={20} />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mobile-menu__foot">
            <span className="mono-label">
              <span className="dot" />
              Android / screen time control
            </span>
            <p>Limits, focus sessions, and a partner for the exceptions.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(SiteHeader);
