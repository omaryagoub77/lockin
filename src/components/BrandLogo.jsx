import logo from '../assets/brand/lockin-logo.png';

export default function BrandLogo({ className = '', decorative = false, ...props }) {
  return (
    <img
      src={logo}
      alt={decorative ? '' : 'Lockin'}
      width="407"
      height="210"
      className={`brand-logo ${className}`.trim()}
      {...props}
    />
  );
}
