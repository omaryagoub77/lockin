import { memo } from 'react';
import './PhoneFrame.css';

function PhoneFrame({ src, alt, className = '', priority = false, style }) {
  return (
    <figure className={`phone ${className}`.trim()} style={style}>
      <div className="phone__screen">
        <img
          src={src}
          alt={alt}
          width="720"
          height="1560"
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          draggable="false"
        />
        <span className="phone__glare" aria-hidden="true" />
        <span className="phone__camera" aria-hidden="true" />
      </div>
    </figure>
  );
}

export default memo(PhoneFrame);
