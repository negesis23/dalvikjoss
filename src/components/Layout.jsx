import { isSSR, Router } from 'nano-jsx';

export const Layout = ({ children }) => {
  const currentPath = isSSR() ? globalThis._nano.location.pathname : window.location.pathname;

  return (
    <div>
      <header>
        <div className="nav-container">
          <Router.Link to="/" className="brand">dalvikjoss</Router.Link>
          <nav>
            <Router.Link to="/" className={`nav-link${currentPath === '/' ? ' active' : ''}`}>
              Home
            </Router.Link>
            <Router.Link to="/about" className={`nav-link${currentPath === '/about' ? ' active' : ''}`}>
              About
            </Router.Link>
          </nav>
        </div>
      </header>
      <main className="container">
        {children}
      </main>
      <footer>
        <p>&copy; 2026 dalvikjoss.
        <br/> SSR SPA running on DalvikVM + QuickJS.
        </p>
      </footer>
    </div>
  );
};
