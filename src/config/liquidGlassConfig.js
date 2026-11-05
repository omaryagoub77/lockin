export const liquidGlassConfig = Object.freeze({
  // Keep the tint neutral charcoal. Safe range: #050705 to #121612.
  tintColor: '#080b08',
  // Alpha from 0 to 1. Keep this low for a transparent glass header.
  tintOpacity: 0.02,
  // SVG displacement-map scale in pixels. Keep between 18 and 44.
  refractionStrength: 40,
});

export const soapBubbleConfig = Object.freeze({
  radius: 9999,
  glass: 0.82,
  // Component scale 0-3; values around 0.8-1.6 keep color restrained.
  iridescence: 1.25,
  filmScale: 2.8,
  // Both are 0-1; coverage 0.35-0.75 and opacity 0.12-0.35 are subtle.
  oilCoverage: 0.62,
  oilOpacity: 0.2,
  opacity: 0.94,
  // Reflectivity is 0-6; values around 0.8-1.8 keep reflections soft.
  reflectivity: 1.35,
  // Shader refraction is 0-1; values around 0.16-0.4 suit small controls.
  refraction: 0.26,
  dispersion: 0.55,
  wobble: 0.28,
  speed: 0.55,
  maxDpr: 1.5,
  environment: 'studio',
  tint: 'rgba(7, 15, 9, 0.24)',
  soapColor: 'rgba(45, 230, 72, 0.12)',
  soapShadeColor: 'rgba(3, 10, 4, 0.42)',
  soapHighlightColor: 'rgba(189, 255, 199, 0.22)',
  soapPalette: 'custom',
  soapPaletteRed: '#d9a39a',
  soapPaletteGold: '#c9d79c',
  soapPaletteGreen: '#78f08b',
  soapPaletteCyan: '#83c9ad',
  soapPaletteBlue: '#91aaa0',
  soapPaletteViolet: '#b2a1ad',
  windowLight: true,
  // Both reflection intensities accept 0-2; 0.3-0.8 keeps the glints delicate.
  windowIntensity: 0.48,
  glintIntensity: 0.6,
});

export const headerSoapBubbleConfig = Object.freeze({
  ...soapBubbleConfig,
  glass: 0.7,
  oilCoverage: 0.52,
  oilOpacity: 0.14,
  // Use the alpha encoded in tint; a positive opacity would override it and
  // make the header body nearly opaque.
  opacity: -1,
  reflectivity: 1.15,
  refraction: 0.34,
  seeThrough: 0.9,
  seeThroughBend: 0.58,
  tint: 'rgba(7, 15, 9, 0.02)',
  soapColor: 'rgba(45, 230, 72, 0.055)',
  soapShadeColor: 'rgba(3, 10, 4, 0.02)',
  soapHighlightColor: 'rgba(189, 255, 199, 0.15)',
  windowIntensity: 0.38,
  glintIntensity: 0.45,
});

const tintChannels = liquidGlassConfig.tintColor.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);

if (!tintChannels) {
  throw new Error('liquidGlassConfig.tintColor must be a six-digit hex color.');
}

export const liquidGlassTint = `rgba(${tintChannels
  .slice(1)
  .map((channel) => Number.parseInt(channel, 16))
  .join(', ')}, ${liquidGlassConfig.tintOpacity})`;
