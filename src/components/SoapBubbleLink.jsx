import { SoapBubbleSurface } from './soap-bubble/index.js';

export default function SoapBubbleLink({ className = '', ...props }) {
  const variant = className.split(/\s+/).includes('btn--primary')
    ? 'soap-bubble-action--primary'
    : '';

  return (
    <SoapBubbleSurface as="div" interactive className={`soap-bubble-action ${variant}`}>
      <a className={className} {...props} />
    </SoapBubbleSurface>
  );
}
