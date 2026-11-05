/*!
ReactDrops Component License 1.0

Copyright (c) 2026 ReactDrops

1. Scope and definitions

This license applies to ReactDrops software and associated documentation that
expressly carry this license or are distributed under a LICENSE file containing
it (the "Software"). "Licensor" means the copyright holder granting rights in
the Software, and only to the extent that holder has authority to grant them.
"You" means the individual or entity exercising these rights.

An "End Product" is a website, application, service, or other finished project
whose primary purpose is something other than providing reusable components,
source code, templates, or development assets to others.

2. Permitted uses

Subject to this license, Licensor grants You a worldwide, non-exclusive,
royalty-free license to use, copy, modify, and incorporate the Software into
unlimited personal, internal, and commercial End Products. You may charge for
End Products, subscriptions, development services, and work for clients.

You may distribute the Software as an integrated part of an End Product,
including in browser-delivered JavaScript. You may provide End Product source
code to a client, and share the Software with employees and contractors who
need it to develop or maintain End Products. Those recipients may use the
Software for those purposes subject to this license. This permission does not
authorize them to redistribute the Software as a reusable development asset.

3. Restricted redistribution

Unless You obtain separate written permission from Licensor, You may not sell,
sublicense, publish, share, or otherwise redistribute the Software, or a
substantial portion of it, whether unchanged or modified:

(a) as a standalone component, component library, UI kit, source-code bundle,
    registry, or other collection of reusable development assets;
(b) as part of a theme, template, starter project, or similar product offered
    to multiple recipients for reuse in their own projects; or
(c) through a builder or generation service that offers the Software as
    reusable blocks or source-code exports for others' projects.

These restrictions apply to paid and free redistribution. Renaming, restyling,
repackaging, translating, or modifying the Software does not remove them.
Building separate finished websites or applications for multiple clients is
permitted; offering a reusable template or kit containing the Software is not.

Public source-code hosting by Licensor is not permission to republish the
Software under another license. This license does not override any separate
rights granted directly by Licensor or applicable code-hosting terms.

4. Notices and ownership

Retain this license and applicable copyright and third-party notices in source
copies of the Software and permitted source distributions. No visible credit
or ReactDrops logo is required in an End Product's user interface.

Licensor retains ownership of its Software. You retain rights in Your own
contributions, subject to the license for any incorporated Software. No rights
to trademarks, trade names, or logos are granted by this license.

5. Third-party materials and separate grants

Dependencies, fonts, images, videos, and other third-party materials remain
subject to their respective licenses. Separately identified third-party code
is licensed under its stated terms, and these restrictions do not limit rights
granted by its copyright holders. Retain all required third-party notices.
Demo media are not licensed by this document; obtain Your own permission or
replace them with media You are entitled to use.

This license does not revoke rights granted under other valid licenses. It does
not assert ownership of third-party work or grant rights Licensor lacks.

6. Termination

The permissions granted here continue unless terminated for a material breach.
If You fail to cure a material breach within 30 days after receiving written
notice from Licensor, Your permissions terminate. On termination, cease uses
and distributions requiring this license. Rights under independently granted
licenses and rights that applicable law does not allow to be restricted remain
unaffected. Sections 3 through 7 survive termination.

7. Disclaimer

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. TO THE MAXIMUM EXTENT
PERMITTED BY APPLICABLE LAW, LICENSOR AND CONTRIBUTORS SHALL NOT BE LIABLE FOR
ANY CLAIM, DAMAGES, OR OTHER LIABILITY, WHETHER IN CONTRACT, TORT, OR OTHERWISE,
ARISING FROM, OUT OF, OR IN CONNECTION WITH THE SOFTWARE OR ITS USE.

This license does not limit rights or exceptions that applicable law makes
non-waivable. No other permissions are granted by implication.
*/

import {
  cancelSoapBubbleFrame,
  frameRect,
  isFilmFrame,
  onSoapBubbleResolution,
  requestSoapBubbleFrame,
  soapBubbleResolution,
  backdropTexture,
  coveredTexture,
  releaseSoapBubbleOwnContext,
  soapBubbleContext,
  soapBubbleOwnContext,
  subscribeBackdrop,
  wantCoveredBackdrop,
} from './soap-bubble-gl';
import { soapBubbleContactStrength, stepSoapBubblePress } from './soap-bubble-motion';

export const soapBubbleEnvironments = ['studio', 'window', 'sky', 'soft'];
/** Lighting choices, including auto: soft light on light pages, the studio on dark ones. */
export const soapBubbleLightings = [...soapBubbleEnvironments, 'auto'];
/** How the window light sits: along the edge, or as the intro's bubble window. */
export const soapBubbleWindowStyles = ['edge', 'bubble'];
/** Shapes of the glint past the window light; auto varies it per bubble. */
export const soapBubbleGlintShapes = ['auto', 'dot', 'dash', 'pair', 'none'];
/** Shapes the window light's inverted twin can take. */
export const soapBubbleTwinShapes = ['arc', 'crescent', 'streak', 'dot', 'mirror'];

export const soapBubbleDefaults = {
  radius: 9999,
  bevel: 24,
  thickness: 520,
  iridescence: 1,
  drainage: 0.6,
  swirl: 0.65,
  filmScale: 1,
  oilOpacity: 1,
  oilCoverage: 1,
  oilEdge: 0,
  oilEdgeFade: 1,
  clearCenter: 0,
  tint: '#ffffff00',
  soapColor: 'auto',
  soapPalette: 'natural',
  soapPaletteRed: '#ff6685',
  soapPaletteGold: '#f6d365',
  soapPaletteGreen: '#83e8a9',
  soapPaletteCyan: '#60dce9',
  soapPaletteBlue: '#7799ff',
  soapPaletteViolet: '#c084fc',
  soapShadeColor: 'auto',
  soapHighlightColor: 'auto',
  reflectivity: 1.6,
  mirage: 1,
  seeThrough: 0,
  seeThroughBend: 0.3,
  opacity: -1,
  floorLight: 1,
  windowLight: false,
  windowStyle: 'edge',
  windowLength: 1,
  windowMargin: 1,
  windowBend: 0.6,
  windowSize: 1,
  windowWidth: 1,
  windowGradient: 0.24,
  topFade: 0.4,
  topTail: 1,
  topLength: 1,
  windowHead: 1,
  windowTail: 1,
  glintShape: 'auto',
  glintSize: 1,
  glintIntensity: 1,
  glintDistance: 0,
  glintHeight: 0,
  windowIntensity: 1,
  windowTwin: true,
  windowTwinShape: 'mirror',
  keyLight: true,
  bottomShade: false,
  bottomShadeColor: 'auto',
  reach: 2.6,
  refraction: 0.08,
  glass: 0,
  dispersion: 1,
  environment: 'studio',
  tilt: 1,
  wobble: 1,
  speed: 1,
  paused: false,
  seed: 7,
  maxDpr: 2,
};

const clamp = (value, min, max, fallback) =>
  Math.min(max, Math.max(min, Number.isFinite(value) ? value : fallback));

const soapPaletteKeys = [
  'soapPaletteRed',
  'soapPaletteGold',
  'soapPaletteGreen',
  'soapPaletteCyan',
  'soapPaletteBlue',
  'soapPaletteViolet'
];
const soapPaletteUniforms = [
  'uSoapPaletteRed',
  'uSoapPaletteGold',
  'uSoapPaletteGreen',
  'uSoapPaletteCyan',
  'uSoapPaletteBlue',
  'uSoapPaletteViolet'
];

export function normalizeSoapBubble(value) {
  const d = soapBubbleDefaults;
  const v = { ...d, ...value };
  return {
    radius: clamp(v.radius, 0, 9999, d.radius),
    bevel: clamp(v.bevel, 2, 200, d.bevel),
    thickness: clamp(v.thickness, 0, 2400, d.thickness),
    iridescence: clamp(v.iridescence, 0, 3, d.iridescence),
    drainage: clamp(v.drainage, 0, 1, d.drainage),
    swirl: clamp(v.swirl, 0, 1, d.swirl),
    filmScale: clamp(v.filmScale, 0.2, 6, d.filmScale),
    oilOpacity: clamp(v.oilOpacity, 0, 1, d.oilOpacity),
    oilCoverage: clamp(v.oilCoverage, 0, 1, d.oilCoverage),
    oilEdge: clamp(v.oilEdge, 0, 400, d.oilEdge),
    oilEdgeFade: clamp(v.oilEdgeFade, 0, 3, d.oilEdgeFade),
    clearCenter: clamp(v.clearCenter, 0, 1, d.clearCenter),
    tint: typeof v.tint === 'string' && v.tint.trim() ? v.tint : d.tint,
    soapColor: typeof v.soapColor === 'string' && v.soapColor.trim() ? v.soapColor : d.soapColor,
    soapPalette: v.soapPalette === 'custom' ? 'custom' : 'natural',
    ...(Object.fromEntries(soapPaletteKeys.map((key) => [
      key,
      typeof v[key] === 'string' && v[key].trim() ? v[key] : d[key],
    ]))),
    soapShadeColor:
      typeof v.soapShadeColor === 'string' && v.soapShadeColor.trim()
        ? v.soapShadeColor
        : d.soapShadeColor,
    soapHighlightColor:
      typeof v.soapHighlightColor === 'string' && v.soapHighlightColor.trim()
        ? v.soapHighlightColor
        : d.soapHighlightColor,
    reflectivity: clamp(v.reflectivity, 0, 6, d.reflectivity),
    mirage: clamp(v.mirage, 0, 3, d.mirage),
    seeThrough: clamp(v.seeThrough, 0, 1, d.seeThrough),
    seeThroughBend: clamp(v.seeThroughBend, 0, 2, d.seeThroughBend),
    opacity: clamp(v.opacity, -1, 1, d.opacity),
    floorLight: clamp(v.floorLight, 0, 1, d.floorLight),
    windowLight: Boolean(v.windowLight),
    windowStyle: soapBubbleWindowStyles.includes(v.windowStyle) ? v.windowStyle : d.windowStyle,
    windowLength: clamp(v.windowLength, 0.3, 2, d.windowLength),
    windowMargin: clamp(v.windowMargin, 0.4, 2.2, d.windowMargin),
    windowBend: clamp(v.windowBend, 0, 1, d.windowBend),
    windowSize: clamp(v.windowSize, 0.4, 2, d.windowSize),
    windowWidth: clamp(v.windowWidth, 0.3, 2.5, d.windowWidth),
    windowGradient: clamp(v.windowGradient, 0, 1, d.windowGradient),
    topFade: clamp(v.topFade, 0, 1, d.topFade),
    topTail: clamp(v.topTail, 0.05, 2, d.topTail),
    topLength: clamp(v.topLength, 0.2, 2.5, d.topLength),
    windowHead: clamp(v.windowHead, 0.3, 2, d.windowHead),
    windowTail: clamp(v.windowTail, 0.05, 2.5, d.windowTail),
    glintShape: soapBubbleGlintShapes.includes(v.glintShape) ? v.glintShape : d.glintShape,
    glintSize: clamp(v.glintSize, 0, 3, d.glintSize),
    glintIntensity: clamp(v.glintIntensity, 0, 2, d.glintIntensity),
    glintDistance: clamp(v.glintDistance, -1, 2, d.glintDistance),
    glintHeight: clamp(v.glintHeight, -1.5, 1.5, d.glintHeight),
    windowIntensity: clamp(v.windowIntensity, 0, 2, d.windowIntensity),
    windowTwin: v.windowTwin !== false,
    windowTwinShape: soapBubbleTwinShapes.includes(v.windowTwinShape)
      ? v.windowTwinShape
      : d.windowTwinShape,
    keyLight: v.keyLight !== false,
    bottomShade: Boolean(v.bottomShade),
    bottomShadeColor:
      typeof v.bottomShadeColor === 'string' && v.bottomShadeColor.trim()
        ? v.bottomShadeColor
        : d.bottomShadeColor,
    reach: clamp(v.reach, 0.5, 8, d.reach),
    refraction: clamp(v.refraction, 0, 1, d.refraction),
    glass: clamp(v.glass, 0, 1, d.glass),
    dispersion: clamp(v.dispersion, 0, 3, d.dispersion),
    environment: soapBubbleEnvironments.includes(v.environment) ? v.environment : d.environment,
    tilt: clamp(v.tilt, 0, 2, d.tilt),
    wobble: clamp(v.wobble, 0, 3, d.wobble),
    speed: clamp(v.speed, 0, 4, d.speed),
    paused: Boolean(v.paused),
    seed: clamp(v.seed, 0, 9999, d.seed),
    maxDpr: clamp(v.maxDpr, 0.5, 3, d.maxDpr),
  };
}

const buttonSurfaces = new Map();

let colourProbe = null;
const colourCache = new Map();
// Straight RGBA in 0–1 for any CSS colour.
function cssColour(value) {
  const cached = colourCache.get(value);
  if (cached) return cached;
  colourProbe ??= document.createElement('canvas').getContext('2d', { willReadFrequently: true });
  if (!colourProbe) return [0, 0, 0, 0];
  colourProbe.clearRect(0, 0, 1, 1);
  colourProbe.fillStyle = '#000';
  colourProbe.fillStyle = value;
  colourProbe.fillRect(0, 0, 1, 1);
  const [r, g, b, a] = colourProbe.getImageData(0, 0, 1, 1).data;
  const result = [r / 255, g / 255, b / 255, a / 255];
  colourCache.set(value, result);
  return result;
}

const noColour = [0, 0, 0, 0];

// A colour's hue at full strength, kept even when it is transparent: the
// canvas serialises the style it is given, whatever its alpha.
function cssHue(value) {
  colourProbe ??= document.createElement('canvas').getContext('2d', { willReadFrequently: true });
  if (!colourProbe) return [1, 1, 1];
  colourProbe.fillStyle = '#000';
  colourProbe.fillStyle = value;
  const style = String(colourProbe.fillStyle);
  const hex = style.match(/^#([\da-f]{2})([\da-f]{2})([\da-f]{2})/i);
  if (hex) return [1, 2, 3].map((i) => parseInt(hex[i], 16) / 255);
  const parts = style.match(/[\d.]+/g)?.map(Number) ?? [255, 255, 255];
  return [parts[0] / 255, parts[1] / 255, parts[2] / 255];
}

/**
 * Draws one bubble. host is the element whose box is the bubble; canvas may
 * be larger (a margin for wobble, or a whole control with its track) and is
 * where the result lands.
 */
export function createSoapBubbleRenderer(canvas, host, initial, onReady) {
  const own = soapBubbleOwnContext(canvas);
  const context = own ?? soapBubbleContext();
  // Drawing in its own canvas, the surface has nothing handed to it.
  const target = own ? null : canvas.getContext('2d');
  if (!context || (!own && !target)) return null;
  const { gl, u, set } = context;

  let tuning = initial;
  // The tint fills the body; Opacity, when set, is its strength. The film's
  // colours keep their own settings, so a tint never recolours the oil.
  // Auto is the page's own: white on light pages, black on dark ones.
  const tintOf = (next) => {
    if (next.tint.trim().toLowerCase() === 'auto')
      return [...(lightTheme ? [1, 1, 1] : [0, 0, 0]), Math.max(0, next.opacity)];
    return next.opacity < 0 ? cssColour(next.tint) : [...cssHue(next.tint), next.opacity];
  };
  const paletteColour = (value) =>
    value.trim().toLowerCase() === 'auto' ? noColour : cssColour(value);
  let soapColor = paletteColour(initial.soapColor);
  let soapShadeColor = paletteColour(initial.soapShadeColor);
  let soapHighlightColor = paletteColour(initial.soapHighlightColor);
  let soapPaletteColors = soapPaletteKeys.map((key) => cssColour(initial[key]));
  // Everything else the shader takes from the tuning alone, worked out when
  // the tuning changes rather than on every draw.
  const choicesOf = (next) => ({
    glintShape: soapBubbleGlintShapes.indexOf(next.glintShape),
    windowStyle: soapBubbleWindowStyles.indexOf(next.windowStyle),
    twinShape: soapBubbleTwinShapes.indexOf(next.windowTwinShape),
    environment: soapBubbleEnvironments.indexOf(next.environment),
  });
  const shadeColorOf = next => next.bottomShadeColor.trim().toLowerCase() === 'auto'
    ? [0, 0, 0, -1]
    : cssColour(next.bottomShadeColor);
  let choices = choicesOf(initial);
  let shadeColor = shadeColorOf(initial);
  const pageTheme = host.closest('[data-theme]')?.getAttribute('data-theme');
  let lightTheme =
    pageTheme === 'light' ||
    (pageTheme !== 'dark' && !matchMedia('(prefers-color-scheme: dark)').matches);
  let tint = tintOf(initial);
  let disposed = false;
  let frame = false;
  let dirtyFrame = true;
  let last = 0;
  let time = 0;
  let flow = 0;
  // Each bubble picks its own glint for the window light.
  let spark = Math.random();
  let visible = true;
  let painted = false;
  let dpr = 1;
  let width = 1;
  let height = 1;
  let layer = null;
  // The bubble's size: the host's layout box, unless a shape stands in.
  let hostWidth = 1;
  let boxWidth = 1;
  let boxHeight = 1;
  let shape = null;
  // Bevel and corner sizes are in pixels at a 16 px font and grow with the
  // component's text, so a larger control looks the same, only bigger.
  let em = 1;
  let hostHeight = 1;
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)');
  // Read once and on change: the media query is asked every frame otherwise.
  let still = reduced?.matches ?? false;

  // Shape modes of a vibrating bubble: l=2 (oval) and l=3 (pear), each as two
  // orthogonal components so they can point in any direction, plus the press
  // squash. Natural frequencies follow the l(l-1)(l+2) Rayleigh–Lamb ratio.
  const modes = Array.from({ length: 4 }, () => ({ value: 0, velocity: 0 }));
  const squash = { value: 0, velocity: 0 };
  let pressed = false;
  const pressure = { value: 0, velocity: 0 };
  const isButton = host.classList.contains('soap-bubble-button');
  const pressStrength = () =>
    isButton && !still ? pressure.value * Math.min(1.6, tuning.wobble / 0.4) : 0;
  const pressScale = () => 1 + 0.36 * pressStrength();
  const tiltTarget = [0, 0];
  const tiltValue = [0, 0];
  const pointerAt = { x: 0, y: 0, inside: false, time: 0 };

  // The bubble's box in radii of its short side.
  const extent = () => {
    const short = Math.min(hostWidth, hostHeight);
    return [hostWidth / short, hostHeight / short];
  };

  const stepPhysics = (dt) => {
    const omega2 = 2 * Math.PI * 2.1;
    const omega3 = omega2 * Math.sqrt(30 / 12);
    const damping = 0.09;
    modes.forEach((mode, index) => {
      const omega = index < 2 ? omega2 : omega3;
      mode.velocity += (-omega * omega * mode.value - 2 * damping * omega * mode.velocity) * dt;
      mode.value += mode.velocity * dt;
    });
    const squashOmega = 2 * Math.PI * 3.2;
    const target = pressed && !isButton ? 0.075 * tuning.wobble : 0;
    squash.velocity +=
      (-squashOmega * squashOmega * (squash.value - target) -
        2 * 0.22 * squashOmega * squash.velocity) *
      dt;
    squash.value += squash.velocity * dt;
    for (let axis = 0; axis < 2; axis++) {
      tiltValue[axis] += (tiltTarget[axis] - tiltValue[axis]) * Math.min(1, dt * 4);
    }
  };

  const rotation = new Float32Array(9);
  let backdrop = null;
  let backdropElement = null;
  let releaseBackdrop = () => {};
  // The surface whose element a covered view leaves out, so that it does
  // not see itself.
  const self = canvas.closest('[data-soap-bubble]') ?? host;
  // Which view of the bubbles it covers this surface shows, if it covers
  // any: the shared one when it floats in a group (a menu's panel), else one
  // without itself. Covering nothing, it shows none and costs nothing.
  let covering;
  const overlapsAnother = (page) => {
    const own = self.getBoundingClientRect();
    for (const other of page.querySelectorAll('[data-soap-bubble]')) {
      // Only drawn bubbles count, not a burst's droplets.
      if (other === self || other.contains(self) || self.contains(other)) continue;
      if (!other.querySelector('canvas')) continue;
      const box = other.getBoundingClientRect();
      const left = Math.max(own.left, box.left);
      const right = Math.min(own.right, box.right);
      const top = Math.max(own.top, box.top);
      const bottom = Math.min(own.bottom, box.bottom);
      if (left >= right || top >= bottom) continue;
      // Only a bubble below this one is seen through it: whichever the page
      // hit-tests first in the overlap lies on top.
      const stack = document.elementsFromPoint((left + right) / 2, (top + bottom) / 2);
      const mine = stack.findIndex((element) => self.contains(element));
      const theirs = stack.findIndex((element) => other.contains(element));
      if (mine >= 0 && (theirs < 0 || mine < theirs)) return true;
    }
    return false;
  };
  let coveringShown = false;
  const showCovered = () => {
    let next;
    // A solid body hides what lies behind: nothing to show then. A floating
    // surface (a menu's panel) keeps the shared view while it is hidden, so
    // that it is ready the moment it opens; on screen, a surface shows a
    // view only while it lies over another bubble.
    const shownNow = visible && !document.hidden;
    if (backdrop && tuning.seeThrough > 0 && tint[3] < 1) {
      const floating = self.closest('[data-soap-bubble-group]') != null;
      if (floating && !shownNow) next = null;
      else if (overlapsAnother(backdrop.element)) next = floating ? null : self;
    }
    const shownNext = next !== undefined && shownNow;
    if (next === covering && shownNext === coveringShown) return;
    if (backdrop && covering !== undefined)
      wantCoveredBackdrop(backdrop, covering, -1, coveringShown ? -1 : 0);
    covering = next;
    coveringShown = shownNext;
    if (backdrop && covering !== undefined)
      wantCoveredBackdrop(backdrop, covering, 1, coveringShown ? 1 : 0);
  };

  /**
   * filmOnly: only the film has moved since the last draw, so the bubble's
   * outline and everything around it (bleed, track, fill) are unchanged and
   * just the bubble's box is shaded again.
   */
  const draw = (filmOnly = false) => {
    if (disposed) return false;
    if (!context.ready()) {
      // Asked again each frame until the driver has linked the program.
      request();
      return false;
    }
    const [ex, ey] = extent();
    const cssRadius = Math.min(hostWidth, hostHeight) / 2;
    const radius = cssRadius * dpr;
    // The bubble may move inside its canvas (a sliding thumb), so its centre
    // is measured every frame.
    const area = canvas.getBoundingClientRect();
    const box = host.getBoundingClientRect();
    const scale = area.width ? width / area.width : 1;
    // Screen pixels per layout pixel, should the host be transformed.
    const zoomX = box.width / boxWidth;
    const zoomY = box.height / boxHeight;
    const middleX = shape ? shape.x + shape.width / 2 : boxWidth / 2;
    const middleY = shape ? shape.y + shape.height / 2 : boxHeight / 2;
    const centerX = (box.left + middleX * zoomX - area.left) * scale;
    const centerY = (box.top + middleY * zoomY - area.top) * scale;
    let part = null;
    if (filmOnly) {
      // The resting outline sits in the host's box; two pixels more for its
      // anti-aliased edge.
      const pad = 2 * dpr;
      const left = Math.max(0, Math.floor((centerX - hostWidth / 2) * dpr - pad));
      const top = Math.max(0, Math.floor((centerY - hostHeight / 2) * dpr - pad));
      const right = Math.min(canvas.width, Math.ceil((centerX + hostWidth / 2) * dpr + pad));
      const bottom = Math.min(canvas.height, Math.ceil((centerY + hostHeight / 2) * dpr + pad));
      if (right > left && bottom > top)
        part = { x: left, y: top, width: right - left, height: bottom - top };
    }
    const [offsetX, offsetY] = context.begin(canvas.width, canvas.height, part);
    set.f2(u.uCenter, offsetX + centerX * dpr, offsetY + canvas.height - centerY * dpr);
    set.f1(u.uRadius, radius);
    set.f2(u.uExtent, ex, ey);
    set.f1(u.uPressScale, pressScale());
    const joins = [];
    if (isButton && !still && !host.parentElement?.matches('.soap-bubble-menu[data-open]')) {
      for (const [other, entry] of buttonSurfaces) {
        if (other === host || !other.isConnected || entry.scope() !== backdropElement) continue;
        if (other.parentElement?.matches('.soap-bubble-menu[data-open]')) continue;
        if (Math.max(pressStrength(), entry.strength()) <= 0.001) continue;
        const rect = frameRect(other);
        if (!rect.width || !rect.height) continue;
        const spacing = soapBubbleContactStrength(
          {
            x: box.left + box.width / 2,
            y: box.top + box.height / 2,
            width: box.width,
            height: box.height,
            radius: tuning.radius * em * Math.min(zoomX, zoomY),
          },
          {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
            width: rect.width,
            height: rect.height,
            radius: entry.corner() * Math.min(zoomX, zoomY),
          },
        );
        if (spacing === 0) continue;
        const dx = Math.abs(box.left + box.width / 2 - rect.left - rect.width / 2);
        const dy = Math.abs(box.top + box.height / 2 - rect.top - rect.height / 2);
        const gap = Math.hypot(
          Math.max(
            0,
            dx -
              (box.width + rect.width) / 2 -
              (Math.min(box.width, box.height) / 2) * (pressScale() - 1) -
              (Math.min(rect.width, rect.height) / 2) * (entry.scale() - 1),
          ),
          Math.max(
            0,
            dy -
              (box.height + rect.height) / 2 -
              (Math.min(box.width, box.height) / 2) * (pressScale() - 1) -
              (Math.min(rect.width, rect.height) / 2) * (entry.scale() - 1),
          ),
        );
        if (gap < Math.min(box.width, box.height, rect.width, rect.height) * 0.4)
          joins.push({ box: rect, entry, distance: gap, spacing });
      }
      joins.sort((a, b) => a.distance - b.distance);
    }
    const corners = [0, 0, 0, 0],
      amounts = [0, 0, 0, 0];
    const shapes = [u.uJoin0, u.uJoin1, u.uJoin2, u.uJoin3];
    const colours = [u.uJoinTint0, u.uJoinTint1, u.uJoinTint2, u.uJoinTint3];
    for (let index = 0; index < 4; index++) {
      const peer = joins[index];
      if (!peer) continue;
      const { box: other, entry } = peer;
      const otherRadius = Math.min(other.width / zoomX, other.height / zoomY) / 2;
      const size = entry.scale();
      set.f4(
        shapes[index],
        (other.left + other.width / 2 - box.left - box.width / 2) / zoomX / cssRadius,
        -(other.top + other.height / 2 - box.top - box.height / 2) / zoomY / cssRadius,
        (other.width / zoomX / 2 + otherRadius * (size - 1)) / cssRadius,
        (other.height / zoomY / 2 + otherRadius * (size - 1)) / cssRadius,
      );
      corners[index] = (Math.min(otherRadius, entry.corner()) * size) / cssRadius;
      amounts[index] =
        0.8 *
        Math.min(1, otherRadius / cssRadius) *
        Math.min(1, Math.max(pressStrength(), entry.strength())) *
        peer.spacing;
      set.v4(colours[index], entry.tint());
    }
    set.v4(u.uJoinCorners, corners);
    set.v4(u.uJoinAmounts, amounts);
    set.f1(u.uCorner, Math.min(1, (tuning.radius * em) / cssRadius));
    set.f1(u.uBevel, (tuning.bevel * em) / cssRadius);
    set.f1(u.uFilmScale, tuning.filmScale);
    set.f1(u.uOilOpacity, tuning.oilOpacity);
    set.f1(u.uOilCoverage, tuning.oilCoverage);
    set.f1(u.uOilEdge, tuning.oilEdge * em * dpr);
    set.f1(u.uOilFade, tuning.oilEdgeFade);
    set.f1(u.uClearCenter, tuning.clearCenter);
    set.v4(u.uTint, tint);
    set.v4(u.uSoapColor, soapColor);
    set.v4(u.uSoapShadeColor, soapShadeColor);
    set.v4(u.uSoapHighlightColor, soapHighlightColor);
    set.i1(u.uCustomSoapPalette, tuning.soapPalette === 'custom' ? 1 : 0);
    for (let index = 0; index < soapPaletteUniforms.length; index++)
      set.v4(u[soapPaletteUniforms[index]], soapPaletteColors[index]);
    set.i1(u.uLightTheme, lightTheme ? 1 : 0);
    set.i1(u.uWindowLight, tuning.windowLight ? 1 : 0);
    set.i1(u.uKeyLight, tuning.keyLight ? 1 : 0);
    set.i1(u.uWindowTwin, tuning.windowTwin ? 1 : 0);
    set.f1(u.uWindowSize, tuning.windowSize);
    set.f1(u.uWindowWidth, tuning.windowWidth);
    set.f1(u.uWindowGradient, tuning.windowGradient);
    set.f1(u.uTopFade, tuning.topFade);
    set.f1(u.uTopTail, tuning.topTail);
    set.f1(u.uTopLength, tuning.topLength);
    set.f1(u.uWindowHead, tuning.windowHead);
    set.f1(u.uWindowTail, tuning.windowTail);
    set.i1(u.uGlintShape, choices.glintShape);
    set.f1(u.uGlintSize, tuning.glintSize);
    set.f1(u.uGlintIntensity, tuning.glintIntensity);
    set.f2(u.uGlintOffset, tuning.glintDistance, tuning.glintHeight);
    set.i1(u.uWindowStyle, choices.windowStyle);
    set.f1(u.uWindowLength, tuning.windowLength);
    set.f1(u.uWindowMargin, tuning.windowMargin);
    set.f1(u.uWindowBend, tuning.windowBend);
    set.f1(u.uWindowIntensity, tuning.windowIntensity);
    set.i1(u.uTwinShape, choices.twinShape);
    set.f1(u.uSpark, spark);
    set.i1(u.uBottomShade, tuning.bottomShade ? 1 : 0);
    // A negative alpha tells the shader to take the theme's shade.
    set.v4(u.uShadeColor, shadeColor);
    // Past 8 em on its long side a surface starts to count as a panel or bar
    // (a menu or a segmented control), fully from 14 em.
    const long = Math.max(hostWidth, hostHeight) / (16 * em);
    const large = Math.min(1, Math.max(0, (long - 8) / 6));
    set.f1(u.uOilLarge, large * large * (3 - 2 * large));
    // Each pair of modes as amplitude times the cosine and sine of its
    // multiple angle: the shader then needs no trigonometry to wobble.
    const amplitude2 = Math.hypot(modes[0].value, modes[1].value);
    const amplitude3 = Math.hypot(modes[2].value, modes[3].value);
    const limit2 = amplitude2 > 0 ? Math.min(0.12, amplitude2) / amplitude2 : 0;
    const limit3 = amplitude3 > 0 ? Math.min(0.08, amplitude3) / amplitude3 : 0;
    set.f4(
      u.uModeBasis,
      modes[0].value * limit2,
      modes[1].value * limit2,
      modes[2].value * limit3,
      modes[3].value * limit3,
    );
    // Volume is roughly conserved: a vertical squash bulges sideways.
    const s = squash.value;
    set.f2(u.uSquash, 1 + s * 0.7, 1 - s);
    set.f1(u.uTime, time);
    set.f1(u.uFlow, flow);
    set.f1(u.uThickness, tuning.thickness);
    set.f1(u.uIridescence, tuning.iridescence);
    set.f1(u.uDrainage, tuning.drainage);
    set.f1(u.uSwirl, tuning.swirl);
    set.f1(u.uReflectivity, tuning.reflectivity);
    set.f1(u.uMirage, tuning.mirage);
    set.f1(u.uSeeThrough, tuning.seeThrough);
    set.f1(u.uFloorLight, tuning.floorLight);
    set.f1(u.uReach, tuning.reach);
    set.f1(u.uRefraction, tuning.refraction);
    set.f1(u.uGlass, tuning.glass);
    set.f1(u.uDispersion, tuning.dispersion);
    set.f1(u.uSeed, (tuning.seed % 97) * 0.731);
    set.i1(u.uEnvironment, choices.environment);
    // Turning the room with the pointer moves every reflection the way a real
    // bubble does when you walk around it.
    const yaw = (tiltValue[0] * 0.35 + Math.sin(time * 0.13) * 0.05) * tuning.tilt;
    const pitch = (tiltValue[1] * 0.25 + Math.cos(time * 0.11) * 0.03) * tuning.tilt;
    const cy = Math.cos(yaw),
      sy = Math.sin(yaw),
      cp = Math.cos(pitch),
      sp = Math.sin(pitch);
    rotation[0] = cy;
    rotation[1] = sy * sp;
    rotation[2] = -sy * cp;
    rotation[3] = 0;
    rotation[4] = cp;
    rotation[5] = sp;
    rotation[6] = sy;
    rotation[7] = -cy * sp;
    rotation[8] = cy * cp;
    set.m3(u.uEnvRotation, rotation);
    const captured = backdrop?.size ? backdrop : null;
    set.i1(u.uHasBackdrop, captured ? 1 : 0);
    // Uploaded before the backdrop is bound, as an upload binds unit 0.
    const covered =
      captured && covering !== undefined ? coveredTexture(gl, captured, covering) : null;
    set.i1(u.uHasCovered, covered ? 1 : 0);
    if (covered) {
      set.f1(u.uCoveredBend, tuning.seeThroughBend);
      gl.activeTexture(gl.TEXTURE3);
      gl.bindTexture(gl.TEXTURE_2D, covered);
    }
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, captured ? backdropTexture(gl, captured) : context.emptyTexture);
    if (captured) {
      const page = frameRect(captured.element);
      set.f2(
        u.uBackdropOrigin,
        // From the shape's own centre: a menu growing or shrinking inside its
        // box sees what lies behind it move with it.
        (box.left + middleX * zoomX - page.left) / Math.max(1, page.width),
        (box.top + middleY * zoomY - page.top) / Math.max(1, page.height),
      );
      set.f2(u.uBackdropSize, captured.size[0], captured.size[1]);
      set.f2(
        u.uBackdropScale,
        cssRadius / Math.max(1, page.width),
        cssRadius / Math.max(1, page.height),
      );
    }
    set.i1(u.uHasLayer, layer ? 1 : 0);
    if (layer) {
      // Layer geometry in bubble radii around the bubble centre, y up.
      set.f4(
        u.uLayerRect,
        (layer.x + layer.width / 2 - centerX) / cssRadius,
        -(layer.y + layer.height / 2 - centerY) / cssRadius,
        layer.width / 2 / cssRadius,
        layer.height / 2 / cssRadius,
      );
      set.f1(u.uLayerCorner, layer.radius / cssRadius);
      set.f1(
        u.uLayerFill,
        (layer.x + layer.width * Math.min(1, Math.max(0, layer.fill)) - centerX) / cssRadius,
      );
      set.v4(u.uLayerTrack, cssColour(layer.track));
      set.v4(u.uLayerFrom, cssColour(layer.from));
      set.v4(u.uLayerTo, cssColour(layer.to ?? layer.from));
    }
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    context.present(target);
    if (!painted) {
      painted = true;
      onReady?.();
    }
    return true;
  };

  const shown = () => visible && !still && !document.hidden;
  const moving = () => !tuning.paused && shown();
  // A paused bubble still answers the pointer until its film settles.
  const jiggling = () =>
    shown() &&
    (pressed ||
      Math.abs(pressure.value) + Math.abs(pressure.velocity) > 1e-4 ||
      Math.abs(squash.value) + Math.abs(squash.velocity) > 1e-4 ||
      modes.some((mode) => Math.abs(mode.value) + Math.abs(mode.velocity) * 0.1 > 1e-4) ||
      tiltValue.some((value, axis) => Math.abs(value - tiltTarget[axis]) > 1e-3));
  const tick = (now) => {
    frame = false;
    const drifting = moving();
    const wobbling = jiggling();
    // While only the film drifts, 30 frames a second is plenty, and every
    // surface takes the same ones: the page then repaints 30 times a second,
    // not on every frame some surface happens to fall due. The skipped time
    // is caught up on the next film frame.
    if (drifting && !wobbling && !dirtyFrame && !isFilmFrame()) {
      request();
      return;
    }
    const dt = last ? Math.min(1 / 20, (now - last) / 1000) : 1 / 60;
    last = now;
    if (isButton && !still) {
      const before = pressure.value;
      stepSoapBubblePress(pressure, pressed, dt);
      if (before !== pressure.value) {
        host.style.setProperty('--soap-bubble-press', String(Math.max(0, pressure.value)));
        dirtyFrame = true;
        for (const [other, entry] of buttonSurfaces) if (other !== host) entry.invalidate();
      }
    }
    if (drifting) {
      time += dt * tuning.speed;
      flow += dt * tuning.speed;
    }
    // Settled modes need no stepping.
    if (wobbling) {
      const steps = Math.max(1, Math.ceil(dt * 240));
      const rate = tuning.paused ? 1 : Math.max(0.25, tuning.speed);
      for (let i = 0; i < steps; i++) stepPhysics((dt * rate) / steps);
    }
    // Settled modes leave the outline where the last whole draw put it.
    // The first draw after the program links shades the whole canvas.
    if (draw(drifting && !wobbling && !dirtyFrame)) dirtyFrame = false;
    if (drifting || jiggling()) request();
    else last = 0;
  };
  function request() {
    if (frame || disposed) return;
    frame = true;
    requestSoapBubbleFrame(tick);
  }

  const resize = () => {
    const style = getComputedStyle(canvas);
    width = Math.max(1, Number.parseFloat(style.width) || canvas.clientWidth);
    height = Math.max(1, Number.parseFloat(style.height) || canvas.clientHeight);
    boxWidth = Math.max(1, host.clientWidth);
    boxHeight = Math.max(1, host.clientHeight);
    hostWidth = shape ? shape.width : boxWidth;
    hostHeight = shape ? shape.height : boxHeight;
    em = (Number.parseFloat(getComputedStyle(host).fontSize) || 16) / 16;
    const density = Math.min(window.devicePixelRatio || 1, tuning.maxDpr);
    // Fewer pixels when the GPU cannot keep up, but never under one per CSS pixel.
    dpr = Math.max(Math.min(1, density), density * soapBubbleResolution());
    // Large surfaces are soft at their centre anyway; cap the buffer near 0.8 MP.
    dpr = Math.min(dpr, Math.sqrt(800_000 / (width * height)));
    const pixelWidth = Math.max(1, Math.round(width * dpr));
    const pixelHeight = Math.max(1, Math.round(height * dpr));
    if (canvas.width !== pixelWidth) canvas.width = pixelWidth;
    if (canvas.height !== pixelHeight) canvas.height = pixelHeight;
    showCovered();
    draw();
    request();
  };

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);
  // A thumb can change size on its own (it swells while dragged), and a
  // growing menu keeps a fixed canvas while its box grows inside it.
  resizeObserver.observe(host);
  const visibility = new IntersectionObserver(([entry]) => {
    visible = entry?.isIntersecting ?? true;
    showCovered();
    last = 0;
    if (visible) request();
  });
  visibility.observe(canvas);
  const releaseResolution = onSoapBubbleResolution(resize);
  const onMotion = () => {
    still = reduced?.matches ?? false;
    showCovered();
    if (still) {
      pressure.value = pressure.velocity = 0;
      host.style.removeProperty('--soap-bubble-press');
    }
    last = 0;
    request();
  };
  // Backdrop pixels are matched to its box; moving either needs a redraw.
  const onScroll = () => {
    if (backdrop?.size || layer) request();
  };
  reduced?.addEventListener?.('change', onMotion);
  document.addEventListener('visibilitychange', onMotion);
  window.addEventListener('scroll', onScroll, { passive: true, capture: true });
  if (isButton)
    buttonSurfaces.set(host, {
      scale: pressScale,
      strength: pressStrength,
      corner: () => tuning.radius * em,
      tint: () => tint,
      scope: () => backdropElement,
      invalidate: () => {
        dirtyFrame = true;
        request();
      },
    });
  resize();

  const kick = (strength, angle) => {
    if (still) return;
    const amount = strength * tuning.wobble;
    modes[0].velocity += Math.cos(angle * 2) * amount;
    modes[1].velocity += Math.sin(angle * 2) * amount;
    modes[2].velocity += Math.cos(angle * 3) * amount * 0.5;
    modes[3].velocity += Math.sin(angle * 3) * amount * 0.5;
    request();
  };

  return {
    update(next) {
      tuning = next;
      tint = tintOf(next);
      showCovered();
      soapColor = paletteColour(next.soapColor);
      soapShadeColor = paletteColour(next.soapShadeColor);
      soapHighlightColor = paletteColour(next.soapHighlightColor);
      soapPaletteColors = soapPaletteKeys.map((key) => cssColour(next[key]));
      choices = choicesOf(next);
      shadeColor = shadeColorOf(next);
      last = 0;
      resize();
    },
    setBackdrop(element) {
      if (element === backdropElement) return;
      if (backdrop && covering !== undefined)
        wantCoveredBackdrop(backdrop, covering, -1, coveringShown ? -1 : 0);
      covering = undefined;
      coveringShown = false;
      releaseBackdrop();
      backdropElement = element;
      backdrop = null;
      delete canvas.dataset.backdrop;
      releaseBackdrop = element
        ? subscribeBackdrop(element, (next) => {
            backdrop = next;
            showCovered();
            const state = next.size ? 'captured' : 'failed';
            if (canvas.dataset.backdrop !== state) canvas.dataset.backdrop = state;
            draw();
            request();
          })
        : () => {};
      draw();
      request();
    },
    setLightTheme(light) {
      if (lightTheme === light) return;
      lightTheme = light;
      tint = tintOf(tuning);
      showCovered();
      dirtyFrame = true;
      request();
    },
    setLayer(next) {
      layer = next;
      draw();
    },
    invalidate() {
      // Batched into the shared frame: a sliding bubble carries its canvas
      // along, so only the backdrop lookup needs the new position.
      dirtyFrame = true;
      request();
    },
    pointer(x, y, inside) {
      const now = performance.now();
      if (inside) {
        const dt = Math.max(16, now - pointerAt.time) / 1000;
        const vx = pointerAt.inside ? (x - pointerAt.x) / dt : 0;
        const vy = pointerAt.inside ? (y - pointerAt.y) / dt : 0;
        if (!pointerAt.inside) kick(0.35, Math.atan2(y, x));
        else {
          const speed = Math.min(6, Math.hypot(vx, vy));
          if (speed > 0.2) kick(speed * 0.02, Math.atan2(vy, vx));
        }
        tiltTarget[0] = x;
        tiltTarget[1] = y;
      } else {
        if (pointerAt.inside) kick(0.25, Math.atan2(pointerAt.y, pointerAt.x));
        tiltTarget[0] = 0;
        tiltTarget[1] = 0;
      }
      pointerAt.x = x;
      pointerAt.y = y;
      pointerAt.inside = inside;
      pointerAt.time = now;
      request();
    },
    motion() {
      return {
        pressScale: pressScale(),
        time,
        spark,
        flow,
        modes: modes.map((mode) => ({ ...mode })),
        squash: { ...squash },
        tilt: [tiltValue[0], tiltValue[1]],
      };
    },
    adopt(next) {
      time = next.time;
      spark = next.spark;
      flow = next.flow;
      next.modes.forEach((mode, index) => Object.assign(modes[index], mode));
      Object.assign(squash, next.squash);
      tiltValue[0] = next.tilt[0];
      tiltValue[1] = next.tilt[1];
      dirtyFrame = true;
      request();
    },
    setShape(next) {
      shape = next;
      hostWidth = Math.max(1, next ? next.width : boxWidth);
      hostHeight = Math.max(1, next ? next.height : boxHeight);
      draw();
      request();
    },
    rebound() {
      if (still) return;
      kick(1.4, Math.PI / 5);
      squash.velocity -= 0.7 * tuning.wobble;
      request();
    },
    press(next) {
      if (next === pressed) return;
      pressed = next;
      if (!next) kick(0.6, Math.PI / 2);
      request();
    },
    dispose() {
      disposed = true;
      if (isButton) {
        buttonSurfaces.delete(host);
        host.style.removeProperty('--soap-bubble-press');
        for (const entry of buttonSurfaces.values()) entry.invalidate();
      }
      if (own) releaseSoapBubbleOwnContext(canvas);
      cancelSoapBubbleFrame(tick);
      if (backdrop && covering !== undefined)
        wantCoveredBackdrop(backdrop, covering, -1, coveringShown ? -1 : 0);
      releaseBackdrop();
      resizeObserver.disconnect();
      visibility.disconnect();
      releaseResolution();
      reduced?.removeEventListener?.('change', onMotion);
      document.removeEventListener('visibilitychange', onMotion);
      window.removeEventListener('scroll', onScroll, { capture: true });
    },
  };
}
