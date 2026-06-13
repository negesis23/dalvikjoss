import { h } from 'nano-jsx';
import { setupEnv } from './shim';
import { render, assemble } from './engine';

setupEnv(h);
globalThis.h = h;

globalThis.renderApp = (context) => {
  let path = '/';
  try {
    const ctx = typeof context === 'string' ? JSON.parse(context) : context;
    path = ctx.path || '/';
    const result = render(ctx);
    return assemble(result);
  } catch (err) {
    const errorHtml = '<div style="padding:20px;background:#fee2e2;color:#991b1b;border:2px solid #ef4444;border-radius:8px;font-family:monospace;">' +
      '<h3>SSR Execution Error</h3>' +
      '<pre>' + (err.message || 'Unknown error') + '\n' + (err.stack || '') + '</pre>' +
      '</div>';
    
    return assemble({ 
      html: errorHtml, 
      state: JSON.stringify({ route: path }), 
      title: 'Execution Error' 
    });
  }
};