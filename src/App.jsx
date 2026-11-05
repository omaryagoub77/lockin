import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import SiteHeader from './components/SiteHeader.jsx';
import Hero from './components/Hero.jsx';
import { SoapBubbleMaterial } from './components/soap-bubble/index.js';
import { soapBubbleConfig } from './config/liquidGlassConfig.js';
import './App.css';

const ProductTour = lazy(() => import('./components/ProductTour.jsx'));
const Principles = lazy(() => import('./components/Principles.jsx'));
const Closing = lazy(() => import('./components/Closing.jsx'));
const SiteFooter = lazy(() => import('./components/SiteFooter.jsx'));

export default function App() {
  const backdropRef = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateReducedMotion = () => setReducedMotion(query.matches);
    query.addEventListener('change', updateReducedMotion);
    return () => query.removeEventListener('change', updateReducedMotion);
  }, []);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll('[data-reveal]'));
    if (nodes.length === 0) return undefined;

    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('is-revealed'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={backdropRef}>
      <SoapBubbleMaterial {...soapBubbleConfig} backdrop={backdropRef} paused={reducedMotion}>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1}>
          <Hero />
          <Suspense fallback={null}>
            <ProductTour />
          </Suspense>
          <Suspense fallback={null}>
            <Principles />
          </Suspense>
          <Suspense fallback={null}>
            <Closing />
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <SiteFooter />
        </Suspense>
      </SoapBubbleMaterial>
    </div>
  );
}
