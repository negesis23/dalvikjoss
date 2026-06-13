import { h } from 'nano-jsx';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';

globalThis.h = h;
globalThis.process = { env: { NODE_ENV: 'production' } };
globalThis.window = globalThis;
globalThis.location = { pathname: '/', search: '' };
globalThis.console = {
  log: (...args) => globalThis.javaLog && globalThis.javaLog(args.join(' ')),
  error: (...args) => globalThis.javaLog && globalThis.javaLog('ERROR: ' + args.join(' '))
};

class MockNode {
  constructor(tag) {
    this.tag = tag;
    this.tagName = tag;
    this.attributes = {};
    this.children = [];
    this.nodeType = 1;
  }
  setAttribute(k, v) { this.attributes[k] = v; }
  appendChild(c) { 
    if (c) {
      this.children.push(c);
      c.parentNode = this;
    }
  }
  cloneNode(deep) {
    const n = new MockNode(this.tag);
    n.attributes = { ...this.attributes };
    if (deep) n.children = this.children.map(c => (c && c.cloneNode) ? c.cloneNode(true) : c);
    return n;
  }
  get innerHTML() {
    return this.children.map(c => (c && c.toString) ? c.toString() : String(c)).join('');
  }
  toString() {
    const attrs = Object.keys(this.attributes).map(k => {
      if (k === 'onClick') return ''; 
      return ` ${k}="${this.attributes[k]}"`;
    }).join('');
    const inner = this.innerHTML;
    const t = this.tag.toLowerCase();
    if (['meta', 'link', 'br', 'img', 'hr', 'input'].includes(t)) return `<${this.tag}${attrs} />`;
    return `<${this.tag}${attrs}>${inner}</${this.tag}>`;
  }
}

globalThis.document = {
  createElement: (tag) => new MockNode(tag),
  createTextNode: (text) => ({ 
    toString: () => text, 
    nodeType: 3, 
    cloneNode: () => ({ toString: () => text, nodeType: 3 }) 
  }),
  documentElement: new MockNode('html'),
  head: new MockNode('head'),
  body: new MockNode('body'),
  addEventListener: () => {}
};

globalThis.renderApp = (path) => {
  let stateJson = '{}';
  let appHtml = '';

  try {
    globalThis._nano = {
      isSSR: true,
      location: { pathname: path, search: '' },
      ssrTricks: {
        isWebComponent: () => false,
        renderWebComponent: () => null
      }
    };
    globalThis.location.pathname = path;

    let fetchedData = {};
    if (globalThis.javaFetch) {
      try {
        fetchedData = JSON.parse(globalThis.javaFetch(path));
      } catch (e) {
        fetchedData = { error: 'Fetch failed' };
      }
    }

    const initialState = {
      route: path,
      data: fetchedData
    };
    stateJson = JSON.stringify(initialState);

    globalThis.__NANO_CONTEXT__ = initialState; 

    const pageContent = path === '/' ? Home() : (path === '/about' ? About() : h('div', null, '404 Not Found'));
    const layoutNode = Layout({ children: [pageContent], currentRoute: path });
    
    appHtml = layoutNode.toString();
  } catch (err) {
    appHtml = '<div style="padding:20px;color:red;"><h1>SSR Error</h1><pre>' + (err.stack || err.message) + '</pre></div>';
  }

  return '<HEAD_START><HEAD_END><STATE_START>' + stateJson + '<STATE_END><HTML_START>' + appHtml + '<HTML_END>';
};