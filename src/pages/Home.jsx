import { Counter } from '../components/Counter';

export const Home = () => {
  return (
    <div>
      <section className="hero">
        <h1>Welcome to DalvikJoss</h1>
        <p>
          A high-performance, lightweight SSR SPA environment running inside a 
          Dalvik VM on Android. Powered by Java, NanoHTTPD, QuickJS, and NanoJSX.
        </p>
      </section>

      <section className="card">
        <h2>Interactive Counter</h2>
        <p>This component is rendered on the server with initial state and hydrated interactively on the client side.</p>
        <Counter />
      </section>
    </div>
  );
};
