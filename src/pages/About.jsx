export const About = () => {
  return (
    <div>
      <section className="hero">
        <h1>About the Technology</h1>
        <p>
          DalvikJoss showcases how modern Javascript UI frameworks can run in resource-constrained, 
          older environments like Android 6 with DalvikVM using high-efficiency embeddable technologies.
        </p>
      </section>

      <div className="grid">
        <div className="grid-item">
          <h3>Dalvik VM (Android 6)</h3>
          <p>
            The runtime environment running Java 7 bytecode. Optimized for mobile, it has extremely 
            low memory requirements and boots instantly.
          </p>
        </div>

        <div className="grid-item">
          <h3>NanoHTTPD</h3>
          <p>
            A tiny, light-footprint HTTP server written in Java. It serves the client bundle, static 
            assets, and handles SSR execution pathways on incoming requests.
          </p>
        </div>

        <div className="grid-item">
          <h3>QuickJS</h3>
          <p>
            An embeddable JavaScript engine written in C. It supports the ES2020 specification and features 
            near-instant startup time and exceptionally low RAM usage.
          </p>
        </div>

        <div className="grid-item">
          <h3>NanoJSX</h3>
          <p>
            A 1kB JSX-based frontend framework designed for SSR-first and lightweight client hydration. It avoids 
            Virtual DOM overhead.
          </p>
        </div>
      </div>
    </div>
  );
};
