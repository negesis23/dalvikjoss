import { Router } from 'nano-jsx';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';

export const App = () => {
  return (
    <Router.Switch>
      <Router.Route path="/" exact={true}>
        <Layout>
          <Home />
        </Layout>
      </Router.Route>
      <Router.Route path="/about">
        <Layout>
          <About />
        </Layout>
      </Router.Route>
    </Router.Switch>
  );
};
