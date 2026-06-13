import { h, useContext } from 'nano-jsx';
import { StoreContext } from '../context/StoreContext';

export const Test = () => {
  const store = useContext(StoreContext);
  
  if (typeof document !== 'undefined') {
    document.title = 'Advanced SSR Dashboard';
  }

  return (
    <div>
      <section className="hero">
        <h1>Advanced SSR Dashboard</h1>
        <p>Proving the power of isomorphic architecture in legacy environments.</p>
      </section>

      <div className="grid">
        <section className="card">
          <h3>Request Metadata</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><strong>Path:</strong> {store.route}</li>
            <li><strong>Query:</strong> {store.query || '(none)'}</li>
            <li><strong>Hydrated:</strong> {typeof window !== 'undefined' ? 'Yes' : 'No (SSR)'}</li>
          </ul>
        </section>

        <section className="card">
          <h3>Server Runtime</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><strong>Java:</strong> {store.serverInfo?.javaVersion || 'N/A'}</li>
            <li><strong>Uptime:</strong> {Number(store.serverInfo?.uptime) ? Math.floor(Number(store.serverInfo.uptime) / 1000) : 0}s</li>
            <li><strong>Free RAM:</strong> {Number(store.serverInfo?.freeMemory) ? Math.floor(Number(store.serverInfo.freeMemory) / 1024 / 1024) : 0}MB</li>
          </ul>
        </section>
      </div>

      <section className="card" style={{ marginTop: '2rem' }}>
        <h2>Dynamic State Rehydration</h2>
        <p>This data was fetched on the server and preserved during hydration:</p>
        <pre style={{ backgroundColor: '#e5e7eb', padding: '1rem', borderRadius: '4px', marginTop: '1rem' }}>
          {JSON.stringify(store.data, null, 2)}
        </pre>
      </section>
      
      <section className="grid" style={{ marginTop: '2rem' }}>
        <div className="grid-item">
          <h3>SEO Capability</h3>
          <p>The page title is dynamically set in the component and extracted during SSR.</p>
        </div>
        <div className="grid-item">
          <h3>Contextual Data</h3>
          <p>Query parameters are parsed and made available via StoreContext.</p>
        </div>
      </section>
    </div>
  );
};