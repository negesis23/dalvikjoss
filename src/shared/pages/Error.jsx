import { h } from 'nano-jsx';

export const ErrorPage = ({ message, stack }) => (
  <div style={{ padding: '40px', color: '#e74c3c', backgroundColor: '#fdf2f2', minHeight: '100vh', fontFamily: 'sans-serif' }}>
    <h1 style={{ fontSize: '32px', marginBottom: '16px' }}>System Error</h1>
    <p style={{ fontSize: '18px', marginBottom: '24px' }}>{message}</p>
    {stack && (
      <pre style={{ padding: '20px', background: '#fff', border: '1px solid #ecc', overflow: 'auto', fontSize: '14px' }}>
        {stack}
      </pre>
    )}
  </div>
);