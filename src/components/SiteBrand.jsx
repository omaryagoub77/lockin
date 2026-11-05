import mark from '../assets/brand/lockin-mark.png';
import TrueFocus from './TrueFocus.jsx';

export default function SiteBrand() {
  return (
    <a className="site-brand" href="#top" aria-label="Lockin home — True Focus">
      <img className="site-brand__mark" src={mark} alt="" width="34" height="44" />
      <div className="site-brand__focus">
        <TrueFocus
          sentence="True Focus"
          manualMode={false}
          focusStyle="brackets"
          easing="smooth"
          order="sequential"
          blurAmount={5}
          focusScale={1}
          unfocusedOpacity={1}
          borderColor="#78f08b"
          cornerSize={16}
          borderWidth={3}
          animationDuration={0.5}
          pauseBetweenAnimations={1}
          highlightColor="#78f08b"
        />
      </div>
    </a>
  );
}
