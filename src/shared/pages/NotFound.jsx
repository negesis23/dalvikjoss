import { h } from 'nano-jsx';

export const NotFound = () => (
  <div style={{ padding: '80px 20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
    <h1 style={{ fontSize: '64px', margin: '0', color: '#333' }}>404</h1>
    <p style={{ fontSize: '24px', color: '#666' }}>Page Not Found</p>
    <a href="/" style={{ display: 'inline-block', marginTop: '24px', color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>
      Return Home
    </a>
  </div>
);