import { h, Fragment, useContext } from 'nano-jsx';
import { StoreContext } from '../context/StoreContext';
import { Counter } from '../components/Counter';

export const Home = () => {
  const store = useContext(StoreContext);
  return (
    <div>
      <section className="hero">
        <h1>DalvikJoss Enterprise</h1>
        <p>SSR SPA running inside DalvikVM + QuickJS</p>
      </section>
      <section className="card">
        <h2>Server Data Rehydrated</h2>
        <pre>{JSON.stringify(store.data, null, 2)}</pre>
      </section>
      <section className="card">
        <h2>Interactive Counter</h2>
        <Counter />
      </section>
    </div>
  );
};