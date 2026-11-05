import './Principles.css';

const principles = [
  {
    title: 'Decide in daylight.',
    copy: 'Set the allowance before the feed is open. A limit chosen in a calm moment is worth more than a promise made at midnight.',
  },
  {
    title: 'Put a person at the edge.',
    copy: 'When you want an exception, the request goes to your accountability partner. A person is harder to negotiate with than a settings toggle.',
  },
  {
    title: 'Measure, don’t moralize.',
    copy: 'Usage history shows hours, sessions, and patterns — not a red warning label. See clearly first. Adjust second.',
  },
];

export default function Principles() {
  return (
    <section className="section principles" id="how" aria-labelledby="principles-title">
      <div className="container">
        <div className="principles__grid">
          <div className="principles__intro">
            <p className="eyebrow" data-reveal="fade">
              <span className="dot" />
              The position
            </p>
            <h2 id="principles-title" data-reveal>
              Willpower is a bad <span className="accent-text">interface.</span>
            </h2>
            <p className="principles__lede" data-reveal>
              Lockin is built around a simple sequence: decide before the urge, add
              friction at the moment it matters, and look at what happened without
              judgment.
            </p>
          </div>

          <ul className="principles__list">
            {principles.map((item, index) => (
              <li key={item.title} data-reveal style={{ '--reveal-delay': `${index * 90}ms` }}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="principles__statement" data-reveal>
          <p className="eyebrow">The short version</p>
          <p className="principles__statement-text">
            No red alerts. No lectures. Just a lock, a timer, and a person who has to say
            yes.
          </p>
        </div>
      </div>
    </section>
  );
}
