import { h, Fragment, isSSR } from 'nano-jsx';

export const Layout = ({ children, currentRoute }) => {
  const path = currentRoute || (isSSR() ? (globalThis._nano && globalThis._nano.location ? globalThis._nano.location.pathname : '/') : window.location.pathname);
  
  return (
    <div>
      <header>
        <div className="nav-container">
          <a href="/" className="brand">dalvikjoss</a>
          <nav>
            <a href="/" className={`nav-link${path === '/' ? ' active' : ''}`}>Home</a>
            <a href="/about" className={`nav-link${path === '/about' ? ' active' : ''}`}>About</a>
          </nav>
        </div>
      </header>
      <main className="container">{children}</main>
      <footer>
        <p>&copy; 2026 dalvikjoss.<br/>SSR SPA running on DalvikVM + QuickJS.</p>
      </footer>
    </div>
  );
};