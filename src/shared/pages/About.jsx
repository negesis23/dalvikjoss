import { h, Fragment } from 'nano-jsx';

export const About = () => {
  return (
    <div>
      <section className="card">
        <h2>About DalvikJoss</h2>
        <p>This project demonstrates a production-ready SSR architecture using Java 7 and NanoJSX.</p>
        <ul>
          <li>Separation of Concerns</li>
          <li>Data Fetching via Java-JS Bridge</li>
          <li>SEO Ready</li>
          <li>Isomorphic State Hydration</li>
        </ul>
      </section>
    </div>
  );
};