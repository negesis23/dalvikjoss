import { h, Component } from 'nano-jsx';
import { StoreContext } from './context/StoreContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { NotFound } from './pages/NotFound';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { route: props.initialState.route || '/' };
  }

  didMount() {
    const handlePopState = () => this.setState({ route: window.location.pathname }, true);
    window.addEventListener('popstate', handlePopState);
    
    const handleClick = (e) => {
      const link = e.target.closest('a');
      if (link && link.getAttribute('href')?.startsWith('/')) {
        e.preventDefault();
        const href = link.getAttribute('href');
        window.history.pushState({}, '', href);
        this.setState({ route: href }, true);
      }
    };
    document.addEventListener('click', handleClick);

    this._cleanup = () => {
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('click', handleClick);
    };
  }

  didUnmount() {
    if (this._cleanup) this._cleanup();
  }

  render() {
    const { route } = this.state;
    const { initialState } = this.props;

    let Content = NotFound;
    if (route === '/') Content = Home;
    else if (route === '/about') Content = About;

    return (
      <StoreContext.Provider value={initialState || {}}>
        <Layout currentRoute={route}>
          <Content />
        </Layout>
      </StoreContext.Provider>
    );
  }
}